import { fetchAirQuality, fetchAutocomplete } from "./fetch";



export async function autocomplete(string) {


    if (string !== "") {
        return fetchAutocomplete(string).then((result) => {
            result = result.results.map((item) => {
                return {
                    formatted_name: item.formatted,
                    lat: item.lat,
                    lon: item.lon,
                    result_type: item.result_type,
                };
            });
            return result;
        });
    }
    return [];
}



export function extractCoords(key, autocompleteList, element) {



    let item = autocompleteList.find((item) => item.formatted_name === key);




    if (item) {
        return {
            found:true,
            original_place:key,
            lat: item.lat,
            lon: item.lon,
            result: fetchAirQuality(item.lat, item.lon)
        };
    }
    else {
        if (autocompleteList[0]) {
            element.current.value = autocompleteList[0].formatted_name;
            return {
                found:false,
                original_place:key,
                search_place:autocompleteList[0].formatted_name,
                lat: autocompleteList[0].lat,
                lon: autocompleteList[0].lon,
                result: fetchAirQuality(autocompleteList[0].lat, autocompleteList[0].lon)
            };
        }
        else {
            alert("please search a legit city");
        }
    }
}



export async function onKeyDown(e,setAutoCompleteList,setIsLoadingAutocomplete){
              if (e.key !== "Unidentified") {
                console.log("setting values", e);
                setIsLoadingAutocomplete(true);
                let result = await autocomplete(e.target.value);
                console.log(result);
                setAutoCompleteList(result);
                setIsLoadingAutocomplete(false);
              }
            }

export async function onClick(autocompleteList,setAirQualityIndex,routeChange,inputElement){
    let airQualityIndex = extractCoords(
      inputElement.current.value,
      autocompleteList,
      inputElement
    );
    let result = await airQualityIndex.result;
    console.warn(result);
    setAirQualityIndex({
      data: result.data,
      found: airQualityIndex.found,
      original_place: airQualityIndex.original_place,
      search_place: airQualityIndex.search_place,
    });
    routeChange(airQualityIndex.lat, airQualityIndex.lon);

  }