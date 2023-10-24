import css from "./style.css";

function createWeatherApp() {
  const { location, temperature, search, condition, minmax, loading } = init();

  function init() {
    const location = document.querySelector("#location");
    const temperature = document.querySelector("#temperature");
    const search = document.querySelector("#search");
    const condition = document.querySelector("#condition");
    const minmax = document.querySelector("#minmax");
    const loading = document.querySelector(".loading");

    search.addEventListener("keypress", function (e) {
      if (e.code === "Enter") {
        getWeatherData();
      }
    });

    return {
      location,
      temperature,
      search,
      condition,
      minmax,
      loading,
    };
  }

  //set a loading progress when fetching data
  function loadingTrue() {
    loading.setAttribute("aria-busy", true);
  }

  function loadingFalse() {
    loading.setAttribute("aria-busy", false);
  }

  function toProcessData(data) {
    const weatherData = data;

    location.textContent = `${data.location.name},\n${data.location.country}`;
    temperature.textContent = `${data.current.temp_c}℃`;
    condition.textContent = `${data.forecast.forecastday[0].day.condition.text}`;
    minmax.textContent = `H: ${data.forecast.forecastday[0].day.maxtemp_c}℃\u00A0\u00A0\u00A0\u00A0L: ${data.forecast.forecastday[0].day.mintemp_c}℃`;

    console.log(weatherData);
  }

  async function getWeatherData() {
    const searchQuery = search.value;
    const forecastDays = 1;
    const apiKey = "05769b947394471b9cb145605231710";
    const weatherAPI = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchQuery}&days=${forecastDays}&aqi=no&alerts=no`;

    loadingTrue();

    try {
      const response = await fetch(weatherAPI);

      if (response.ok === true) {
        const data = await response.json();
        toProcessData(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingFalse();
    }
  }
}
createWeatherApp();
