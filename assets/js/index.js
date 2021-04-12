const onSubmit = (event) => {
  event.preventDefault();
  console.log("onsubmit");
};

$("#search-by-city-form").on("submit", onSubmit);
