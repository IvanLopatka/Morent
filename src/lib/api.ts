export const getCities = async (): Promise<string[]> => {
  const response = await fetch("http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&l&maxRows=50&username=vanish13", {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
   const city_names: string[] = data.geonames.map((city: { name: string }) => city.name);
  return city_names;
};
    
  




