<script setup>
import { weatherIconURL } from '@/helpers';

const props = defineProps({
    weather: {
        type: Object,
        default: () => null,
        required: true
    }
})
</script>
<template>
    <div v-if="weather" class="bg-white shadow-2xl p-4 rounded-2xl border-2 border-gray-50">
        <div class="flex flex-col gap-8">
            <div class="flex flex-row justify-start items-center gap-4">
                <span class="font-bold text-gray-600 text-start text-3xl">{{ weather.name }}</span>

                <img :src="`${weatherIconURL}${weather.weather[0].icon}.png`" :alt="weather.weather[0].description"
                    loading="lazy">
            </div>

            <div class="flex flex-row justify-center items-start">
                <span class="text-8xl font-black text-black ">{{ Math.ceil(weather.main.temp) }}
                </span>
                <span class="text-2xl text-black">
                    &deg;C
                </span>
            </div>

            <span class="font-bold text-gray-600 text-start text-xl capitalize">{{ weather.weather[0].description
                }}</span>
        </div>
    </div>
</template>
<style scoped lang="scss"></style>
