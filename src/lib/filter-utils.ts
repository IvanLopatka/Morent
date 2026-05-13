
export interface CarFilters {
  types: string[];
  capacities: string[];
  maxPrice: number;
  pickUpDate?: string;
  dropOffDate?: string;
}

export const filterCars = (cars: any[], filters: CarFilters) => {
  if (!cars) return [];

  return cars.filter((car) => {
    // 1. Date Filtering (Strict if dates are selected)
    let matchesDates = true;
    if (filters.pickUpDate && filters.dropOffDate) {
      const requestedStart = filters.pickUpDate;
      const requestedEnd = filters.dropOffDate;
      
      const avFrom = car.availableFrom || car.available_from;
      const avTo = car.availableTo || car.available_to;

      if (avFrom && avTo) {
        // String comparison for YYYY-MM-DD
        matchesDates = requestedStart >= avFrom && requestedEnd <= avTo;
      } else {
        // If dates are selected but car has no availability data, hide it
        matchesDates = false; 
      }
    }

    // 2. Type Filter
    const carType = car.type || "";
    const matchesType =
      filters.types.length === 0 || 
      filters.types.some(t => t.toLowerCase() === carType.toLowerCase());

    // 3. Capacity Filter
    const carSeats = car.seats || "0";
    const matchesCapacity =
      filters.capacities.length === 0 ||
      filters.capacities.some(cap => {
        if (cap === "8") return parseInt(carSeats) >= 8;
        return carSeats === cap;
      });

    // 4. Price Filter
    const carPrice = parseFloat(car.price || "0");
    const maxPrice = filters.maxPrice || 1000;
    const matchesPrice = carPrice <= maxPrice;

    return matchesDates && matchesType && matchesCapacity && matchesPrice;
  });
};
