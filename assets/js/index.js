const API_KEY = "60b4fb66103f9e3c6f93920a7d7f1377";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCurrentDayData = (response, cityName) => {
  return {
    cityName: cityName,
    temperature: response.current.temp,
    humidity: response.current.humidity,
    windSpeed: response.current.wind_speed,
    date: moment.unix(response.current.dt).format("MM/DD/YYYY"),
    iconURL: `http://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`,
    uvi: response.current.uvi,
  };
};

const renderCurrentDayCard = (data) => {
  const parentContainer = $("#weather-cards");

  const currentDayCard = `<div class="row">
  <div class="col-12 p-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          ${data.cityName} (${data.date})
          <img
            src="${data.iconURL}"
            class="weather-icon-image"
          />
        </h5>
        <p class="card-text">Temperature: ${data.temperature} &deg; F</p>
        <p class="card-text">Humidity: ${data.humidity}%</p>
        <p class="card-text">Wind Speed: ${data.windSpeed} MPH</p>
        <p class="card-text">
          UV Index:
          <span class="bg-danger p-2 rounded text-white">${data.uvi}</span>
        </p>
      </div>
    </div>
  </div>
</div>`;

  parentContainer.append(currentDayCard);
};

const renderAllCards = async (cityName) => {
  const currentDayUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
  const currentDayResponse = await fetchData(currentDayUrl);

  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentDayResponse.coord.lat}&lon=${currentDayResponse.coord.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;
  const forecastResponse = await fetchData(forecastUrl);

  const currentDayData = getCurrentDayData(
    forecastResponse,
    currentDayResponse.name
  );
  renderCurrentDayCard(currentDayData);
};

const onReady = () => {};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#city-input").val();

  renderAllCards(cityName);
};

$("#search-form").on("submit", onSubmit);
$(document).ready(onReady);
