import axios from "axios";

const API_BASE_URL = "http://api.weatherstack.com/current";
const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

export const getWeather = async (location) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        access_key: API_KEY,
        query: location,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados de clima:", error);
    throw error;
  }
};
