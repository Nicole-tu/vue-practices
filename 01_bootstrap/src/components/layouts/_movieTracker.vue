<template>
  <div class="card my-4">
    <h5 class="card-header">
      // RECENTLY MOVIES <font-awesome-icon icon="film" size="lg" />
    </h5>
    <div class="card-body bg-light">
      <carousel>
        <slide v-for="(movie, m) in moviesList" :key="m">
          <div class="card movie-card">
            <a :href="movie.link" target="_blank">
              <img
                class="card-img-top movie-img"
                :src="movie.img"
                alt="Card image cap"
              />
            </a>
            <div class="card-body movie-info">
              <h6 class="card-text">{{ movie.title }}</h6>
              <p class="card-text movie-text">
                <small class="text-muted">{{ movie.runtime }}</small>
              </p>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  },
  computed: {
    moviesList() {
      return this.$store.getters.moviesList;
    }
  },
  methods: {
    getmovies() {
      this.$store.dispatch("getMovies");
    }
  },
  created() {
    this.getmovies();
  }
};
</script>
