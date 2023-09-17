import axios from "axios";

export const apiOpenWeather = axios.create({
  baseURL: "https://api.openweathermap.org/",
});
