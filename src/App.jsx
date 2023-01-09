import { useState } from "react";
import { Particular } from "./pages/Particular";

import { BrowserRouter, Route,Routes, useNavigate} 
        from "react-router-dom";
import { Home } from "./pages/Home";
import AirCare from "../src/assets/icons/AirCare.png";
function App() {
  const [airQualityIndex, setAirQualityIndex] = useState({});
  const navigate = useNavigate();

  console.log(airQualityIndex);


  return (
    <div className="App">
      <div className="h-[50px] w-full p-4">
        <img src={AirCare} className="h-full w-auto"></img>
      </div>
      <Routes>
          <Route path="/" index element={<Home setAirQualityIndex={setAirQualityIndex}/>} />
          <Route path="/particular" element={<Particular airQualityIndex={airQualityIndex} navigate={navigate}/>} />
      </Routes>
    </div>
  );
}

export default App;
