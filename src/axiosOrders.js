import axios from "axios";

const instance = axios.create({
  baseURL: "https://web-gurus-media--1492326682375.firebaseio.com/",
});

export default instance;
