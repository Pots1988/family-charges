import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coindesk.com/v1/bpi",
  withCreadentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getProducts() {
    console.log(apiClient.defaults)
    return apiClient.get("/currentprice.json");
  }
}