import axios from "axios";


//https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json;

const initialState = {
    cityList: [],
    supplyList: []
}

const state = {
    ...initialState,
    initialState() {
        return initialState;
    }
};

const mutations = {
    setCityList(state, cityList) {
        state.cityList = cityList;
    },
    setSupplyList(state, supplyList) {
        state.supplyList = supplyList;
    },
}

const getters = {
    cityList: state => state.cityList,
    supplyList: state => state.supplyList
}

const actions = {
    getCityList({
        commit
    }) {
        axios.get("https://api.maskhelp.info/api/city").then(response => {
            commit("setCityList", response.data);
        });
    },
    getSupply({
        commit
    }, params) {
        // curl -X GET "https://api.maskhelp.info/api/supply?area=%E5%A4%A7%E5%AE%89%E5%8D%80&childrenMaskStatus=AVAILABLE&city=%E5%8F%B0%E5%8C%97%E5%B8%82&lat=25.043907&lng=121.5448803&maskStatus=AVAILABLE&page=0&radius=500&size=10" -H "accept: application/json"
        axios.get("https://api.maskhelp.info/api/supply", params).then(response => {
            commit("setSupplyList", response.data);
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};