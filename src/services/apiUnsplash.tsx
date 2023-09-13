import axios from "axios";

export const apiUnsplash = axios.create({
  baseURL: "https://api.unsplash.com/",
});
