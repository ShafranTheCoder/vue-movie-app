<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else grid-list-xs fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <v-img :src="'http://image.tmdb.org/t/p/original/' + singleMovie.poster_path"></v-img>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <v-card-title primary-title>
          <div>
            <h1 class="headline mb-0">{{singleMovie.title}}</h1>
            <p>{{ singleMovie.tagline}}</p>
            <h3>Release Date:</h3>
            <p>{{singleMovie.release_date}}</p>
            <h3>Budget:</h3>
            <p>{{singleMovie.budget}} $</p>
            <h3>Revenue:</h3>
            <p>{{singleMovie.revenue}} $</p>
            <h3>Runtime:</h3>
            <p>{{singleMovie.runtime}} min.</p>
            <h3>Overview:</h3>
            <p>{{singleMovie.overview}}</p>
            <h3>Rank:</h3>
            <p>{{singleMovie.vote_average}}</p>
            <h3>Similar Films</h3>
            <div class="similar-block" v-if="similarFilms">
              <v-layout wrap>
                <v-flex xs3 v-for="(item, index) in similarFilms.slice(0,8)" :key="index" mb-2>
                  <v-img
                    :src="'http://image.tmdb.org/t/p/w342/' + item.poster_path"
                    @click="nextSingleMovie(item.id)"
                  ></v-img>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn outline color="primary" @click="$router.go(-1)">back</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
    <div class="copyright">
      <div>
        Made with ❤️ by
        <a href="https://github.com/ShafranTheCoder" class="link">Dmitry Bogutskii</a>
      </div>
    </div>
  </v-container>
</template>

<script>
import movieApi from "@/services/MovieApi";

export default {
  props: ["id"],

  data() {
    return {
      singleMovie: "",
      loading: true,
      similarFilms: []
    };
  },

  mounted() {
    movieApi
      .fetchSingleMovie(this.id)
      .then(response => {
        this.singleMovie = response;
        this.genres = this.singleMovie.genres;
        this.loading = false;
      })
      .catch(error => {
        console.warn(error);
      });
    movieApi.fetchSimilarFilms(this.id).then(response => {
      this.similarFilms = response.results;
    });
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    nextSingleMovie(id) {
      this.$router.push("/movie/" + id);
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}

.copyright {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.link {
  color: black;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
  font-weight: bold;
}
</style>
