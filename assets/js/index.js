const renderCurrentDayCard = () => {
  const parentContainer = $("#weather-cards");

  const currentDayCard = `<div class="row">
  <div class="col-12 p-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Leicester (8/15/2019)
          <img
            src="http://openweathermap.org/img/wn/03n@2x.png"
            class="weather-icon-image"
          />
        </h5>
        <p class="card-text">Temperature: 90.9 &deg; F</p>
        <p class="card-text">Humidity: 41%</p>
        <p class="card-text">Wind Speed: 4.7 MPH</p>
        <p class="card-text">
          UV Index:
          <span class="bg-danger p-2 rounded text-white">9.49</span>
        </p>
      </div>
    </div>
  </div>
</div>`;

  parentContainer.append(currentDayCard);
};

const onReady = () => {
  renderCurrentDayCard();
};

$(document).ready(onReady);
