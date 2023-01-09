export async function fetchAirQuality(lat,lon) {
  //https://aqicn.org/
  let endpoint = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${import.meta.env.VITE_PRIVATE_KEY}`;
  return fetch(endpoint).then((response) =>
    response.json().then((result) => result
  ));
}

export async function fetchInitialAirQuality(cities) {
  cities = cities.map((city) =>
    fetch(
      `https://api.waqi.info/feed/${city}/?token=${import.meta.env.VITE_PRIVATE_KEY}`
    )
  );
  return Promise.all(cities).then((response) =>
    Promise.all(response.map((res) => res.json())).then((result) =>result)
  );
}


export async function fetchAutocomplete(string){

  // https://apidocs.geoapify.com/
    return fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${string}&limit=20&format=json&apiKey=${import.meta.env.VITE_API_KEY}`).then(response => response.json().then(result => result));

}

