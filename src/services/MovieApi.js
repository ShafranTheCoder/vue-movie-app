import axios from "axios";

export default {
  fetchMovies(page) {
    return axios.get("&page=" + page).then(response => {
      return response.data;
    });
  },

  fetchSingleMovie(id) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3605be09777fa4898a8cd239c9eff79a&language=en-US`
      )
      .then(response => {
        return response.data;
      });
  },
  fetchSimilarFilms(id) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=3605be09777fa4898a8cd239c9eff79a&language=en-US`
      )
      .then(response => {
        return response.data;
      });
  },
  searchMovies(name) {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3605be09777fa4898a8cd239c9eff79a&language=en-US&query=${name}`
      )
      .then(response => {
        return response.data;
      });
  }
};
