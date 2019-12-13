import axios from "axios";
const cheerio = require("cheerio");
const movieUrl = "http://www.atmovies.com.tw";
const helper = "https://cors-anywhere.herokuapp.com/";

const initialState = {
    moviesList: []
};

const state = Object.assign({}, initialState);

const mutations = {
    setMoviesList(state, moviesList) {
        state.moviesList = moviesList;
    }
};

const getters = {
    moviesList: state => state.moviesList
};

const actions = {
    getMovies({
        commit
    }) {
        axios.get(helper + movieUrl + "/movie/new/").then(response => {
            var $ = cheerio.load(response.data);
            let articles = [];

            $("article").each((i, e) => {
                let title = $(e)
                    .find(".filmTitle > a")
                    .text();
                let img = $(e)
                    .find(".filmListPoster > img")
                    .attr("src");
                let link = $(e).find(".filmListPoster").attr("href");
                let runtime = $(e)
                    .find(".runtime")
                    .text();
                articles.push({
                    title,
                    img,
                    link: movieUrl + link,
                    runtime
                });
            });

            commit("setMoviesList", articles);
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};