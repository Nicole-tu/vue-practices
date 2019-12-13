import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import quotes from './modules/quotes';
import login from './modules/login';
import movies from './modules/movies';

export default new Vuex.Store({
    modules: {
        quotes,
        login,
        movies
    }
});