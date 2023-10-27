import css from "./style.css";

function createWeatherApp() {
  //initialize global variables
  const {
    location,
    temperature,
    search,
    condition,
    minmax,
    loading,
    tbody_forecast,
    table_forecast,
  } = init();

  function init() {
    const search = document.querySelector("#search"); //search bar
    //main weather display
    const location = document.querySelector("#location");
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const minmax = document.querySelector("#minmax");
    //end
    const loading = document.querySelector(".loading"); //loading animation
    const tbody_forecast = document.querySelector(
      "#dayForecast > table > tbody"
    );
    const table_forecast = document.querySelector("#dayForecast > table");

    return {
      location,
      temperature,
      search,
      condition,
      minmax,
      loading,
      tbody_forecast,
      table_forecast,
    };
  }
  //end

  //search city to get weather data from
  function searchCity() {
    search.addEventListener("keypress", function (e) {
      if (e.code === "Enter") {
        getWeatherData();
      }
    });
  }
  //end

  //set a loading progress when fetching data
  function loadingTrue() {
    loading.setAttribute("aria-busy", true);
  }

  function loadingFalse() {
    loading.setAttribute("aria-busy", false);
  }
  //end

  //fetch data from WeatherAPI
  async function getWeatherData() {
    const searchQuery = search.value;
    const forecastDays = 8;
    const apiKey = "05769b947394471b9cb145605231710";
    const weatherAPI = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchQuery}&days=${forecastDays}&aqi=no&alerts=no`;

    loadingTrue();

    try {
      const response = await fetch(weatherAPI);

      if (response.ok === true) {
        const data = await response.json();
        toProcessData(data);
        toProcessForecastData(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingFalse();
    }
  }
  //end

  //process the promised JSON file, display to browser
  function toProcessData(JSONdata) {
    const weatherData = JSONdata;

    location.textContent = `${JSONdata.location.name},\n${JSONdata.location.country}`;
    temperature.textContent = `${JSONdata.current.temp_c}℃`;
    condition.textContent = `${JSONdata.forecast.forecastday[0].day.condition.text}`;
    minmax.textContent = `H: ${JSONdata.forecast.forecastday[0].day.maxtemp_c}℃\u00A0\u00A0\u00A0\u00A0L: ${JSONdata.forecast.forecastday[0].day.mintemp_c}℃`;

    console.log(weatherData);
  }
  //end

  //process forecast data
  function toProcessForecastData(JSONdata) {
    //check if <caption> has been created or not
    if (
      table_forecast.querySelector("#dayForecast > table > caption") === null
    ) {
      const caption = document.createElement("caption");
      caption.textContent = "7-day forecast";
      table_forecast.appendChild(caption);
    }
    //end

    //remove the table data when searching for a new location
    while (tbody_forecast.firstChild) {
      tbody_forecast.removeChild(tbody_forecast.firstChild);
    }
    //end

    const forecastArray = JSONdata.forecast.forecastday;

    forecastArray.forEach(function (day, index) {
      const tr = document.createElement("tr");
      const td_day = document.createElement("td");
      const td_tempHI = document.createElement("td");
      const td_tempLo = document.createElement("td");

      const date = new Date(day.date);
      const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      if (index === 0) {
        td_day.textContent = "Today";
      } else if (index === 1) {
        td_day.textContent = "Tomorrow";
      } else {
        td_day.textContent = daysOfTheWeek[date.getDay()];
      }
      td_tempHI.textContent = `H: ${day.day.maxtemp_c}℃`;
      td_tempLo.textContent = `L: ${day.day.mintemp_c}℃`;
      tr.appendChild(td_day);
      tr.appendChild(td_tempHI);
      tr.appendChild(td_tempLo);
      tbody_forecast.appendChild(tr);
    });
  }
  //end

  searchCity();
}
createWeatherApp();
