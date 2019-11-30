<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-pagination v-model="pagination.page" :length="pagination.total" @input="next"></v-pagination>
      <v-flex xs12 sm6 md4 lg3 xl3 v-for="(item, index) in wholeResponse" :key="index" mb-2>
        <v-card>
          <v-img :src="'http://image.tmdb.org/t/p/w342/' + item.poster_path" aspect-ratio="1"></v-img>

          <v-card-title primary-title>
            <div>
              <h2>{{item.title.length >= 20 ? item.title.slice(0,20) + '...' : item.title}}</h2>
              <div>Year: {{item.release_date}}</div>
              <div>Rank: {{item.vote_average}}</div>
              <div>IMDB-id: {{item.id}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn outline color="primary" @click="singleMovie(item.id)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-pagination v-model="pagination.page" :length="pagination.total" @input="next"></v-pagination>
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
  data() {
    return {
      generalResponse: [],
      wholeResponse: [],
      loading: true,
      pagination: {
        page: 1,
        total: 30
      }
    };
  },
  mounted() {
    movieApi
      .fetchMovies()
      .then(response => {
        this.generalResponse = response;
        this.pagination.total = response.total_pages;
        this.wholeResponse = response.results;
        this.loading = false;
      })
      .catch(error => {
        console.warn(error);
      });
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    },
    next(page) {
      movieApi
        .fetchMovies(page)
        .then(response => {
          this.wholeResponse = response.results;
        })
        .catch(error => {
          console.warn(error);
        });
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
