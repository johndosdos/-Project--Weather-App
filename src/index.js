import css from "./style.css";

function createWeatherApp() {
  const { location, temperature, search } = init();

  function init() {
    const location = document.querySelector("#location");
    const temperature = document.querySelector("#temperature");
    const search = document.querySelector("#search");

    search.addEventListener("keypress", function (e) {
      if (e.code === "Enter") {
        getWeatherData();
      }
    });

    return {
      location,
      temperature,
      search,
    };
  }

  function toProcessData(data) {
    const weatherData = data;

    location.textContent = `${data.location.name}, ${data.location.country}`;
    temperature.textContent = `${data.current.temp_c}°C`;
    console.log(weatherData);
  }

  async function getWeatherData() {
    const searchQuery = search.value;
    const apiKey = "05769b947394471b9cb145605231710";
    const weatherAPI = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchQuery}&aqi=no`;

    try {
      const response = await fetch(weatherAPI);

      if (response.ok === true) {
        const data = await response.json();
        toProcessData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
createWeatherApp();
