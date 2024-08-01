<script setup>
import { useWeatherStore } from "@/stores";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import AutoComplete from "primevue/autocomplete";

import { computed, reactive, ref } from "vue";
import WeatherCard from "./components/WeatherCard.vue";
import { storeToRefs } from "pinia";

const { getGeoInformation, getWeather } = useWeatherStore();
const { oldQueries } = storeToRefs(useWeatherStore());

// Initial suggestions are historical searches
const suggestions = ref(oldQueries.value);
const selectedWeather = ref(null);
const autoCompleteRef = ref(null);

const state = reactive({
  form: {
    location: "",
  },
});

const rules = computed(() => ({
  form: {
    location: {
      required
    },
  },
}));

const v$ = useVuelidate(rules, state);

async function search({ query }) {
  // show history if less than 3 letters
  if (query.length < 3) {
    suggestions.value = oldQueries.value;

    // Workaround to component not showing overlay
    autoCompleteRef.value?.show();
  } else {
    try {
      suggestions.value = await getGeoInformation(query);
    } catch (error) {
      console.error("Error fetching cities", error)
    }
  }
}


const getCityWeather = async ({ value }) => {
  const { lat, lon } = value;
  try {
    selectedWeather.value = await getWeather(lat, lon);

    // If item is fetched successfully, we add it to history

    pushToHistory(value);

    clearForm();
  } catch (error) {
    console.error("Error fetching weather", error)
  }
}

function pushToHistory(value) {
  // Only add if unique
  if (oldQueries.value.indexOf(value) === -1) {
    /* We push this value to be saved in localstorage
      and show it as history. Unshift to insert at start of array
    */
    oldQueries.value.unshift(value)

    // Limit size of array
    oldQueries.value.splice(5);
  }
}

function extractOptionLabel({ country, name, state }) {
  return name ? `${country} - ${name}` : "";
}

// Ready form for new input
function clearForm() {
  v$.value.form.location.$model = null;
}
</script>
<template>
  <div class="flex flex-col justify-start items-start sm:items-center flex-1 p-4 gap-4 py-8 sm:px-20">
    <span class="text-6xl font-extrabold">Simple Weather App</span>

    <div class="flex flex-row justify-center items-center gap-2">
      <AutoComplete ref="autoCompleteRef" inputClass="min-w-64 text-black" @option-select="getCityWeather"
        placeholder="Search for a city..." v-model="v$.form.location.$model" :suggestions="suggestions"
        :optionLabel="extractOptionLabel" forceSelection @complete="search" variant="filled" dropdown />
    </div>

    <WeatherCard class="xs:self-center w-full sm:w-72" :weather="selectedWeather" />
  </div>
</template>
<style scoped lang="scss"></style>
