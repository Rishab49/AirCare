import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { onClick, onKeyDown } from "../methods/autocomplete";
import { fetchInitialAirQuality } from "../methods/fetch";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/search.png";
import GoIcon from "../assets/icons/go.png";

export function Home({ setAirQualityIndex }) {
  const [autocompleteList, setAutoCompleteList] = useState([]);
  const [initialAirQualityIndices, setInitialAirQualityIndices] = useState([]);
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);

  const inputElement = useRef();
  const searchButton = useRef();
  const navigate = useNavigate();

  const routeChange = (latitude, longitude) => {
    console.warn("chaning route");
    let path = `particular?lat=${latitude}&lon=${longitude}`;
    navigate(path);
  };

  useEffect(() => {
    searchButton.current.disabled = isLoadingAutocomplete;
    if (initialAirQualityIndices.length === 0) {
      fetchInitialAirQuality([
        "Delhi",
        "Shanghai",
        "Los%20Angeles",
        "Tokyo",
        "London",
      ]).then((result) => setInitialAirQualityIndices(result));
    }
  });

  return (
    <>
      <div className="flex row h-[calc(100vh_-_50px)] w-full p-4 gap-4 items-center justify-center">
        <div className="flex row h-[50px] w-[80vw] md:w-[50vw] bg-blue-100 rounded overflow-hidden">
          <div className="flex row flex-1">
            <img src={SearchIcon} className="h-full w-auto p-4"></img>
            <input
              placeholder="Search"
              className="w-[calc(100%_-_50px)] w-100 p-4 bg-transparent font-medium focus-visible:outline-none"
              autoComplete="off"
              type="text"
              list="autocomplete"
              onKeyDown={(e) =>
                onKeyDown(e, setAutoCompleteList, setIsLoadingAutocomplete)
              }
              ref={inputElement}
            ></input>
            <datalist id="autocomplete">
              {autocompleteList.map((item, index) => (
                <option value={item.formatted_name} key={index}></option>
              ))}
            </datalist>
          </div>
          <button
            className="h-[50px] w-[50px] p-3 bg-green-500"
            ref={searchButton}
            type="button"
            onClick={() =>
              onClick(
                autocompleteList,
                setAirQualityIndex,
                routeChange,
                inputElement
              )
            }
          >
            <img src={GoIcon} className="h-full w-auto filter"></img>
          </button>
        </div>
      </div>
      <div className="h-[50px] w-full flex flex-row items-center justify-end  pr-5">
        <p>&copy; all rights reserved to Rishab Raj</p>
      </div>
    </>
  );
}
