import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import quotes from './modules/quotes';
import login from './modules/login';
import movies from './modules/movies';
import calendar from './modules/calendar';


export default new Vuex.Store({
    mutations: {
        resetState(state, moduleState) {
            if (moduleState !== "" && typeof moduleState != 'undefined') {
                if (moduleState.initialState && typeof moduleState.initialState === 'function') {
                    const initState = moduleState.initialState();
                    for (const key in initState) {
                        moduleState[key] = initState[key];
                    }
                }
            }
        },
        resetAllStates(state) {
            for (const module in state) {
                if (module != 'common') {
                    const initState = state[module].initialState();
                    for (const key in initState) {
                        state[module][key] = initState[key];
                    }
                }
            }
        },
    },
    actions: {
        resetStates({
            commit
        }, {
            pageName,
            module
        }) {
            if (pageName == 'Login') {
                commit('resetAllStates');
            } else {
                commit('resetState', this.state[module]);
            }
        }
    },
    modules: {
        quotes,
        login,
        movies,
        calendar
    }
});