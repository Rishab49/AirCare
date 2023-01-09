import { BumpChart } from "../components/BumpChart";
import BackIcon from "../assets/icons/back.png";
import { Attribute } from "../components/Attribute";


export function Particular({ airQualityIndex,navigate }) {
  let graphData = [];
  let attributes = [];
  let aqi = airQualityIndex.data.aqi;
  let color;
  switch (true) {
    case aqi >= 0 && aqi <= 50:
      color = "[green]";
      break;
    case aqi >= 51 && aqi <= 100:
      color = "[yellow]";
      break;
    case aqi >= 101 && aqi <= 150:
      color = "[darkorange]";
      break;
    case aqi >= 151 && aqi <= 200:
      color = "blue-500";
      break;
    case aqi >= 201 && aqi <= 300:
      color = "cornflowerblue";
      break;
    case aqi >= 300:
      color = "[red]";
      break;
  }

  for (let parameter in airQualityIndex.data.forecast.daily) {
    let data = [];
    airQualityIndex.data.forecast.daily[parameter].forEach((element, index) => {
      index < 5 ? data.push({ x: element.day, y: element.avg }) : null;
    });
    graphData.push({ id: parameter, data: data });
  }

  for (let attribute in airQualityIndex.data.iaqi) {

    let attr;

    switch(attribute){
      case 't':
      attr = "Temprature";
      break;
      case 'p':
        attr = "Pressure";
        break;
      case 'h':
        attr = "Humidity";
        break;
      case 'w':
        attr = "Wind";
        break;
      default:
        attr = attribute
    }
    attributes.push({
      key: attr,
      value: airQualityIndex.data.iaqi[attribute].v,
    });
  }
  return (
    <>
    <div className="h-fit flex flex-col">
      <div className="flex row items-center justify-start h-fit md:h-[50px] p-4 gap-2 sticky top-0 bg-white z-50">
        <button type="button" className="h-[35px] w-auto p-2 aspect-square" onClick={() => navigate(-1)}>
          <img src={BackIcon} className="h-full w-auto"></img>
        </button>
        <p className="">
          {!airQualityIndex.found
            ? `Your place ${airQualityIndex.original_place} not found search instead for ${airQualityIndex.search_place}`
            : `Searched for ${airQualityIndex.original_place}`}
        </p>
      </div>
      <div className="flex flex-col h-fit xl:h-[calc(100vh_-_100px)] w-full p-4 gap-4 lg:flex-row">
        <div className="flex-1 flex row flex-wrap justify-center items-start md:justify-start gap-4">
          <pre
            className={`h-[50px] w-full p-4 rounded flex items-center justify-start bg-${color}`}
          >
            <p>Air Quality Index score</p>
            <p className="font-bold text-lg">{" " + aqi}</p>
          </pre>

          {attributes.map((attribute,index) => (
            <Attribute
            key={index}
              attribute={attribute.key}
              value={attribute.value}
            ></Attribute>
          ))}
        </div>
        <div className="flex-1  rounded-lg min-h-screen lg:min-h-max lg:h-[100%] overflow-x-auto">
          <div className="h-screen lg:h-[100%] w-auto aspect-video lg:w-[100%]  lg:aspect-auto bg-[#fff8b8]">
          <BumpChart data={graphData}></BumpChart>
          </div>
        </div>
      </div>
      </div>
      <div className="h-[50px] w-full flex flex-row items-center justify-end pr-5">
      <p>&copy; all rights reserved to Rishab Raj</p>
        </div>
   </>
  );
}
