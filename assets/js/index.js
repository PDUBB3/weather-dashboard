const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData
  }
}

const onSubmit = (Event) => {
  Event.preventDefault();

  const cityName = $("city-input").val();
  const cities = getFromLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", cities);
}

$(#search-by-city-form").on("submit", onSubmit)
