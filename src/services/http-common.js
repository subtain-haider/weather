
import { useGlobalLoading } from "@/composables";
import {
  EnvironmentEnum,
} from "@/data";
import { useCounter } from "@vueuse/core";
import axios from "axios";

const baseURL = import.meta.env[EnvironmentEnum.BaseURL];
const APIKey = import.meta.env[EnvironmentEnum.WeatherAPIKey];

const basicOptions = {
  baseURL,
  headers: {
    Accept: "application/json",
  },
};

const dataInstance = axios.create({
  ...basicOptions,
  baseURL: `${basicOptions.baseURL}/data/2.5/`
});

const geoInstance = axios.create({
  ...basicOptions,
  baseURL: `${basicOptions.baseURL}/geo/1.0/`
});

const { count, inc, dec } = useCounter(0, { min: 0 });

/* Use global state because it's 
quicker than pinia changes */

function increaseCount() {
  const { setLoading } = useGlobalLoading();
  inc();
  setLoading(true);
}

function decreaseCount() {
  const { setLoading } = useGlobalLoading();
  dec();
  if (count.value == 0) {
    setLoading(false);
  }
}

// Request interceptor
const requestInterceptor = (
  config,
  loading = true,
) => {

  if (loading) {
    increaseCount();
  }

  // Inject API Key to all API requests
  config.params = {
    ...config.params,
    appid: APIKey
  }

  // Return the config object
  return config;
};

const requestErrorInterceptor = (error, loading = true) => {
  if (loading) decreaseCount();

  return Promise.reject(error);
};

dataInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
geoInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// Response interceptor
const responseInterceptor = (
  response,
  loading = true,
) => {
  if (loading) decreaseCount();

  return response;
};

const responseErrorInterceptor = (error, loading = true) => {
  if (loading) decreaseCount();

  return Promise.reject(error);
};

dataInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);
geoInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

export { dataInstance, geoInstance };
