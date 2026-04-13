import { createClient } from "@/utils/supabase/client";
import { getPublicUrlByTable } from "supa-transfer";

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
}

const supabase = createClient();
const BUCKET_NAME = 'car-photos';

export const CarService = {
  // Helper to get the full URL for a photo in storage
  getPhotoUrl(path: string, folder: string = '') {
    if (!path) return "/koenig.png";
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) return path; // Keep local paths as is

    // Ensure path has the folder prefix if provided
    let finalPath = path;
    if (folder && !path.startsWith(`${folder}/`)) {
      finalPath = `${folder}/${path}`;
    }

    return getPublicUrlByTable(supabase, 'cars', 'thumbnail', finalPath, { 
      bucket: BUCKET_NAME 
    });
  },

  async getAllCars(): Promise<Car[]> {
    const { data, error } = await supabase
      .from('cars')
      .select('*');

    if (error) {
      console.error('Error fetching cars:', error);
      return [];
    }

    return data.map((car: any) => ({
      ...car,

      thumbnail: this.getPhotoUrl(car.thumbnail || car.image, 'thumbnails'),

      gallery: (car.gallery || []).map((path: string) => this.getPhotoUrl(path, 'galleries')),
      spending: car.fuel_capacity || car.spending,
      price: car.price.toString()
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
      price: data.price.toString()
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
      .filter((item: any) => item.cars !== null) // Filter out any broken links
      .map((item: any) => {
        const car = item.cars;
        return {
          ...car,
          thumbnail: this.getPhotoUrl(car.thumbnail || car.image, 'thumbnails'),
          gallery: (car.gallery || []).map((path: string) => this.getPhotoUrl(path, 'galleries')),
          spending: car.fuel_capacity || car.spending,
          price: car.price ? car.price.toString() : "0"
        };
      });
  }
};
