let API_key = "e3aa39b4bc08dc9683afc9b0ca16f00a";

function convertBody(data) {
  return data.json();
}

async function getLocation(city, state) {
  let lat;
  let lon;
  let request = new Request(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=5&appid=${API_key}`
  );
  await fetch(request).then(async (requestedData) => {
    console.log(requestedData);
    await convertBody(requestedData).then((jsonData) => {
      lat = jsonData[0].lat;
      lon = jsonData[0].lon;
    });
  });
  return { lat, lon };
}

async function getForecast(lon, lat) {
  let json;
  let request = new Request(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`
  );
  await fetch(request).then(async (requestedData) => {
    console.log(requestedData);
    await convertBody(requestedData).then((jsonData) => {
      json = jsonData;
    });
  });
  return json;
}

async function getWeather() {
  let json;
  let request = new Request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
  );
  await fetch(request).then(async (requestedData) => {
    console.log(requestedData);
    await convertBody(requestedData).then((jsonData) => {
      json = jsonData;
    });
  });
  return json;
}

function populateDays(json) {
  json.list.map((data) => {
    data.main.temp =
      Math.floor(((data.main.temp * 9) / 5 - 459.67) * 100) / 100;
  });
  document.querySelector("#dayContainer").innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let container = document.createElement("span");
    let dateSpan = document.createElement("span");
    let temperatureSpan = document.createElement("span");
    let humiditySpan = document.createElement("span");
    let windSpan = document.createElement("span");
    let dateTitleSpan = document.createElement("span");
    let temperatureTitleSpan = document.createElement("span");
    let humidityTitleSpan = document.createElement("span");
    let windTitleSpan = document.createElement("span");

    container.appendChild(dateTitleSpan);
    container.appendChild(dateSpan);
    container.appendChild(temperatureTitleSpan);
    container.appendChild(temperatureSpan);
    container.appendChild(humidityTitleSpan);
    container.appendChild(humiditySpan);
    container.appendChild(windTitleSpan);
    container.appendChild(windSpan);
    container.className = "weatherStats";
    document.querySelector("#dayContainer").appendChild(container);

    let data = json.list[i * 8];
    var m_names = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    );

    var currentDate = new Date(data.dt * 1000);
    var curr_date = currentDate.getDate();
    var curr_month = currentDate.getMonth();
    var curr_year = currentDate.getFullYear();
    var mydatestr =
      "" +
      curr_year +
      " " +
      m_names[curr_month] +
      " " +
      curr_date +
      " " +
      (currentDate.getHours() + "").padStart(2, "0") +
      ":" +
      (currentDate.getMinutes() + "").padStart(2, "0") +
      ":" +
      (currentDate.getSeconds() + "").padStart(2, "0");
    dateSpan.textContent = mydatestr;
    temperatureSpan.textContent = data.main.temp;
    humiditySpan.textContent = data.main.humidity + "%";
    windSpan.textContent = data.wind.speed;
    dateTitleSpan.textContent = "Day";
    temperatureTitleSpan.textContent = "Temperature";
    humidityTitleSpan.textContent = "Humidity";
    windTitleSpan.textContent = "Wind Speed";
  }
}

document.querySelector("#searchButton").addEventListener("click", async () => {
  let city = document.querySelector("#citySearch").value;
  let state = document.querySelector("#stateSearch").value;
  console.log(city, state);
  const { lon, lat } = await getLocation(city, state);
  console.log(lon, lat);
  const json = await getForecast(lon, lat);
  populateDays(json);
  console.log(json);
});
