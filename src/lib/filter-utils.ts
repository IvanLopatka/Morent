import moment from "moment";

export interface CarFilters {
  types: string[];
  capacities: string[];
  maxPrice: number;
  pickUpDate?: string;
  dropOffDate?: string;
  pickUpTime?: string;
  dropOffTime?: string;
}

export const filterCars = (cars: any[], filters: CarFilters) => {
  if (!cars) return [];

  const filtered = cars.filter((car) => {
    // 1. Date & Time Filtering (Strict if dates are selected) using Moment.js
    let matchesDates = true;
    if (filters.pickUpDate && filters.dropOffDate) {
      const avFromDate = car.availableFrom || car.available_from;
      const avToDate = car.availableTo || car.available_to;

      if (avFromDate && avToDate) {
        // 1. Verify requested date range is valid (start before or same as end)
        const reqStart = moment(`${filters.pickUpDate} ${filters.pickUpTime || "00:00"}`, "YYYY-MM-DD HH:mm");
        const reqEnd = moment(`${filters.dropOffDate} ${filters.dropOffTime || "23:59"}`, "YYYY-MM-DD HH:mm");

        if (reqStart.isAfter(reqEnd)) {
          matchesDates = false;
        } else {
          // 2. Verify requested date range is within the car's available dates
          const matchesDateRange = filters.pickUpDate >= avFromDate && filters.dropOffDate <= avToDate;

          // 3. Verify requested times are within the car's daily available/operating hours (if provided)
          let matchesTimeRange = true;

          const carStartVal = car.availableFromTime || car.available_from_time;
          const carEndVal = car.availableToTime || car.available_to_time;

          if (carStartVal && carEndVal) {
            const carStart = carStartVal.slice(0, 5); // "HH:mm"
            const carEnd = carEndVal.slice(0, 5);     // "HH:mm"

            if (filters.pickUpTime) {
              const reqPickTime = filters.pickUpTime.slice(0, 5);
              if (reqPickTime < carStart || reqPickTime > carEnd) {
                matchesTimeRange = false;
              }
            }

            if (filters.dropOffTime) {
              const reqDropTime = filters.dropOffTime.slice(0, 5);
              if (reqDropTime < carStart || reqDropTime > carEnd) {
                matchesTimeRange = false;
              }
            }
          }

          matchesDates = matchesDateRange && matchesTimeRange;
        }
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

  // Sort by availability start timestamp if dates are provided
  if (filters.pickUpDate) {
    filtered.sort((a, b) => {
      const aTime = (a.availableFromTime || a.available_from_time || "00:00").slice(0, 5);
      const bTime = (b.availableFromTime || b.available_from_time || "00:00").slice(0, 5);

      const aStartStr = `${a.availableFrom || a.available_from || "9999-12-31"} ${aTime}`;
      const bStartStr = `${b.availableFrom || b.available_from || "9999-12-31"} ${bTime}`;

      const aStart = moment(aStartStr, "YYYY-MM-DD HH:mm").valueOf();
      const bStart = moment(bStartStr, "YYYY-MM-DD HH:mm").valueOf();

      return aStart - bStart;
    });
  }

  return filtered;
};
