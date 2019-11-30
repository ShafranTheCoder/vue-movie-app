<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else-if="noData">
    <div class="text-xs-center">
      <h2>No Movie in API with {{this.name}}</h2>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex
        xs4
        v-for="(item, index) in movieResponse.filter(function(movie) { return movie.poster_path})"
        :key="index"
        mb-2
      >
        <v-card>
          <v-img :src="'http://image.tmdb.org/t/p/original/' + item.poster_path" aspect-ratio="0.7"></v-img>
          <v-card-title primary-title>
            <div>
              <h2>{{item.title.length >= 20 ? item.title.slice(0,20) + '...' : item.title}}</h2>
              <div>Year: {{item.release_date.slice(0,4)}}</div>
              <div>IMDB-id: {{item.id}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn outline color="primary" @click="singleMovie(item.id)">View</v-btn>
          </v-card-actions>
        </v-card>
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
  props: ["name"],
  data() {
    return {
      movieResponse: [],
      loading: true,
      noData: false
    };
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    },
    fetchResult(value) {
      movieApi
        .searchMovies(value)
        .then(response => {
          if (response.total_results) {
            this.movieResponse = response.results;
            this.loading = false;
            this.noData = false;
          } else {
            this.noData = true;
            this.loading = false;
          }
        })
        .catch(error => {
          console.warn(error);
        });
    }
  },
  mounted() {
    this.fetchResult(this.name);
  },
  watch: {
    name(value) {
      this.fetchResult(value);
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
