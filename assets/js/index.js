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

const renderForecastCards = (data) => {
  const h5 = $("<h5>").text("5-Day Forecast");
  const container = $("<div>").addClass(
    "d-flex flex-wrap justify-content-between"
  );
  const col = $("<div>").addClass("col-12");
  const row = $("<div>").addClass("row");

  h5.appendTo(col);
  container.appendTo(col);
  col.appendTo(row);

  $("#weather-cards").append(row);

  const renderForecastCard = (data) => {
    console.log(data);
    const date = moment.unix(data.dt).format("MM/DD/YYYY");
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temperature = data.temp.day;
    const humidity = data.humidity;

    const forecastCard = $(`<div class="card text-white text-center forecast-card">
    <div class="card-body">
      <h6 class="card-title">${date}</h6>
      <div>
        <img
          src="${iconUrl}"
          class="weather-icon-image"
        />
      </div>
      <p class="card-text">Temp: ${temperature} &deg; F</p>
      <p class="card-text">Humidity: ${humidity}%</p>
    </div>
  </div>`);

    forecastCard.appendTo(container);
  };

  data.forEach(renderForecastCard);
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

  $("#weather-cards").empty();

  renderCurrentDayCard(currentDayData);
  renderForecastCards(forecastResponse.daily);
};

const onReady = () => {};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#city-input").val();

  renderAllCards(cityName);
};

$("#search-form").on("submit", onSubmit);
$(document).ready(onReady);
