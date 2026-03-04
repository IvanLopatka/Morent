import { createClient } from "@/utils/supabase/client";

export interface Car {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
  gallery: string[];
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

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(finalPath);
    return data.publicUrl;
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
      // Resolve thumbnail URL (check both thumbnail and image columns)
      thumbnail: this.getPhotoUrl(car.thumbnail || car.image, 'thumbnails'),
      // Resolve all gallery URLs (matching 'galleries' folder in Supabase)
      // Resolve all gallery URLs
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
  }
};
