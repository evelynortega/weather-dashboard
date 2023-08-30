// code for search button

document.querySelector("#searchButton").addEventListener("click", () => {
  let city = document.querySelector("#citySearch").value;
  let state = document.querySelector("#stateSearch").value;
  console.log(city, state);
});
