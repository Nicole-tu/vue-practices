<template>
  <div>
    <weather-widget />
    <movie-widget />
  </div>
</template>
<script>
import WeatherWidget from "@/components/layouts/_weather";
import MovieWidget from "@/components/layouts/_movieTracker";

export default {
  name: "rightSide",
  components: { WeatherWidget, MovieWidget }
};
</script>
