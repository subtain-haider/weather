import { dataInstance, geoInstance } from "@/services";
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  persist: {
    key: "weather-v1",
    paths: ["oldQueries"],
  },
  state: () => ({
    oldQueries: [],
  }),
  actions: {
    async getWeather(lat, lon) {
      const response = await dataInstance.get("weather", {
        params: {
          lat,
          lon,
          units: "metric"
        }
      });

      return response.data;
    },
    async getGeoInformation(q, limit = 5) {
      const response = await geoInstance.get("direct", {
        params: {
          q,
          limit
        }
      });

      return response.data;
    },
  },
});
