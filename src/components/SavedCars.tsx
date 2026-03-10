import { createClient } from "@/utils/supabase/server";
import { CarService, Car } from "@/lib/car.service";
import { CarCard } from "./CarCard";

interface SavedCarsProps {
  userId: string;
}

export const SavedCars = async ({ userId }: SavedCarsProps) => {
  const supabase = await createClient();
  const savedCars = await CarService.getSavedCars(userId, supabase);

  return (
    <div className="px-5 md:px-16 mt-8 mb-12 md:mb-16 w-full max-w-7xl mx-auto">
      <div className="flex px-2 justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Saved Cars
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {savedCars.length}
          </span>
        </h2>
      </div>

      {savedCars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-slate-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium font-geist">You haven't saved any cars yet.</p>
          <p className="text-slate-400 text-sm mt-1">Start exploring our catalog and save your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {savedCars.map((car: Car) => (
            <div key={car.id} className="flex justify-center h-full">
              <CarCard
                id={car.id}
                name={car.name}
                type={car.type}
                image={car.thumbnail}
                price={car.price}
                seats={car.seats}
                spending={car.spending}
                className="w-full h-full shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
