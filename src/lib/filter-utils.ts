
export interface CarFilters {
  types: string[];
  capacities: string[];
  maxPrice: number;
}

export const filterCars = (cars: any[], filters: CarFilters) => {
  return cars.filter((car) => {
    // Check type
    const matchesType =
      filters.types.length === 0 || filters.types.includes(car.type);

    // Check capacity (seats)
    const matchesCapacity =
      filters.capacities.length === 0 ||
      filters.capacities.some(cap => {
        if (cap === "8") return parseInt(car.seats) >= 8;
        return car.seats === cap;
      });

    // Check price
    const matchesPrice = parseFloat(car.price) <= filters.maxPrice;

    return matchesType && matchesCapacity && matchesPrice;
  });
};
