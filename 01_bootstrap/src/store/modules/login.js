const initialState = {
    userName: "",
}

const state = Object.assign({}, initialState);

const mutations = {
    setUserName(state, userName) {
        state.userName = userName;
    },
}

const getters = {
    userName: state => state.userName
}

const actions = {
    setUserName({
        commit
    }, userName) {
        commit("setUserName", userName);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};