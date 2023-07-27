"use strict";

import { apiKey } from "./api.js";

// ! v0.1 => aktuelles Wetter/Temperatur einer von mir bestimmten Stadt anzeigen lassen

// ! v0.2 => Inputfeld für Usereingabe

// ! v0.2.1 => Icon fürs Wetter

// ? v0.3 => Wettervorschau 5 Tage

// # Globale Variablen
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let userInp = document.querySelector("#user_pick");
let btn = document.querySelector(".btn");
let icon = document.querySelector("#icon");

const checkWeather = () => {
  let lat;
  let lon;

  const userInpVal = userInp.value.toLowerCase();

  // # API Geo
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${userInpVal}&lang=de&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      city.textContent = `
      ${data[0].local_names.de}
      `;
      lat = data[0].lat;
      lon = data[0].lon;
      return { lat, lon };
    })

    // # API Weather
    .then((weatherData) => {
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${weatherData.lat}&lon=${weatherData.lon}&units=metric&lang=de&appid=${apiKey}`
      );
    })

    .then((response) => response.json())
    .then((data) => {
      temp.textContent = `
        ${Math.round(data.main.temp)} C°
        `;

      // # Icon
      let iconVal = data.weather[0].icon;
      let mainVal = data.weather[0].description;
      icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconVal}@2x.png"/>`;
      main.innerHTML = `${mainVal}`;
    });
};

// #
btn.addEventListener("click", checkWeather);
userInp.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather();
  }
});
