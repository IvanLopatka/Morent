import { createClient } from "@/utils/supabase/client";
import { getPublicUrlByTable } from "supa-transfer";
import { CarFilters } from "./filter-utils";

export interface Car {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
  gallery?: string[] | null;
  price: string;
  seats: string;
  spending: string;
  description: string;
  availableFrom?: string;
  availableTo?: string;
  availableFromTime?: string;
  availableToTime?: string;
}

const supabase = createClient();
const BUCKET_NAME = 'car-photos';

export const CarService = {

  getPhotoUrl(path: string, folder: string = '') {
    if (!path) return "/koenig.png";
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) return path;


    let finalPath = path;
    if (folder && !path.startsWith(`${folder}/`)) {
      finalPath = `${folder}/${path}`;
    }

    return getPublicUrlByTable(supabase, 'cars', 'thumbnail', finalPath, {
      bucket: BUCKET_NAME
    });
  },

  async getAllCars(filters?: Partial<CarFilters> & { pickUpLocation?: string }): Promise<Car[]> {
    let query = supabase.from('cars').select('*');

    if (filters) {
      if (filters.pickUpLocation) {
        query = query.eq('location', filters.pickUpLocation);
      }

      // Filter by type
      const activeTypes = filters.types?.filter(Boolean) || [];
      if (activeTypes.length > 0) {
        const mappedTypes = activeTypes.map((t) => (t === "Sportscar" ? "Sport" : t));
        query = query.in('type', mappedTypes);
      }

      // Filter by capacity
      const activeCapacities = filters.capacities?.filter(Boolean) || [];
      if (activeCapacities.length > 0) {
        const exactValues = activeCapacities.filter((c) => c !== "8");
        if (activeCapacities.includes("8")) {
          const seatsGte8 = Array.from({ length: 20 }, (_, i) => (i + 8).toString());
          query = query.or(`seats.in.(${[...exactValues, ...seatsGte8].join(",")})`);
        } else {
          query = query.in('seats', exactValues);
        }
      }

      // Filter by max price
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      // Filter by availability dates
      if (filters.pickUpDate && filters.dropOffDate) {
        query = query
          .gte('available_to', filters.dropOffDate)
          .lte('available_from', filters.pickUpDate);
      }

      // Filter by availability times (daily window)
      if (filters.pickUpTime) {
        query = query
          .lte('available_from_time', filters.pickUpTime)
          .gte('available_to_time', filters.pickUpTime);
      }

      if (filters.dropOffTime) {
        query = query
          .lte('available_from_time', filters.dropOffTime)
          .gte('available_to_time', filters.dropOffTime);
      }

      // Sort by availability start timestamp if dates are provided
      if (filters.pickUpDate) {
        query = query
          .order('available_from', { ascending: true })
          .order('available_from_time', { ascending: true });
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching cars:', error);
      return [];
    }

    return data.map((car: any) => ({
      ...car,
      thumbnail: this.getPhotoUrl(car.thumbnail || car.image, 'thumbnails'),
      gallery: (car.gallery || []).map((path: string) => this.getPhotoUrl(path, 'galleries')),
      spending: car.fuel_capacity || car.spending,
      price: car.price.toString(),
      availableFrom: car.available_from || car.availableFrom,
      availableTo: car.available_to || car.availableTo,
      availableFromTime: car.available_from_time || car.availableFromTime,
      availableToTime: car.available_to_time || car.availableToTime,
    }));
  },

  async getCarById(id: string): Promise<Car | null> {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      ...data,
      thumbnail: this.getPhotoUrl(data.thumbnail || data.image, 'thumbnails'),
      gallery: (data.gallery || []).map((path: string) => this.getPhotoUrl(path, 'galleries')),
      spending: data.fuel_capacity || data.spending,
      price: data.price.toString(),
      availableFrom: data.available_from || data.availableFrom,
      availableTo: data.available_to || data.availableTo,
      availableFromTime: data.available_from_time || data.availableFromTime,
      availableToTime: data.available_to_time || data.availableToTime,
    };
  },

  async isCarSaved(carId: string, userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('saved_cars')
      .select('id')
      .eq('user_id', userId)
      .eq('car_id', carId)
      .single();

    return !!data && !error;
  },

  async toggleSaveCar(carId: string, userId: string): Promise<{ saved: boolean }> {
    const isSaved = await this.isCarSaved(carId, userId);

    if (isSaved) {
      await supabase
        .from('saved_cars')
        .delete()
        .eq('user_id', userId)
        .eq('car_id', carId);
      return { saved: false };
    } else {
      await supabase
        .from('saved_cars')
        .insert({ user_id: userId, car_id: carId });
      return { saved: true };
    }
  },

  async getSavedCars(userId: string, customClient?: any): Promise<Car[]> {
    const client = customClient || supabase;
    const { data, error } = await client
      .from('saved_cars')
      .select('car_id, cars(*)')
      .eq('user_id', userId);

    if (error || !data) return [];

    return data
      .filter((item: any) => item.cars !== null)
      .map((item: any) => {
        const car = item.cars;
        return {
          ...car,
          thumbnail: this.getPhotoUrl(car.thumbnail || car.image, 'thumbnails'),
          gallery: (car.gallery || []).map((path: string) => this.getPhotoUrl(path, 'galleries')),
          spending: car.fuel_capacity || car.spending,
          price: car.price ? car.price.toString() : "0",
          availableFrom: car.available_from || car.availableFrom,
          availableTo: car.available_to || car.availableTo,
          availableFromTime: car.available_from_time || car.availableFromTime,
          availableToTime: car.available_to_time || car.availableToTime,
        };
      });
  }
};
