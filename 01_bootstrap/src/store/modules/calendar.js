const initialState = {
    todayEvents: 0,
}

const state = Object.assign({}, initialState);

const mutations = {
    setTodayEvents(state, todayEvents) {
        state.todayEvents = todayEvents;
    },
}

const getters = {
    todayEvents: state => state.todayEvents
}

const actions = {
    setTodayEvents({
        commit
    }, todayEvents) {
        commit("setTodayEvents", todayEvents);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};