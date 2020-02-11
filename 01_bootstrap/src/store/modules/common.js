import axios from "axios";
import moment from "moment";
const helper = "https://cors-anywhere.herokuapp.com/";

const initialState = {
    aqi: 0,
    aqiList: [{
        min: 0,
        max: 50,
        text: '良好(Good)',
        color: '#bfff00'
    }, {
        min: 51,
        max: 100,
        text: '普通(Moderate)',
        color: '#fdea00'
    }, {
        min: 101,
        max: 150,
        text: '對敏感族群不健康(Unhealthy for Sensitive Groups)',
        color: '#ff8000'
    }, {
        min: 151,
        max: 200,
        text: '對所有族群不健康(Unhealthy)',
        color: '#ff0040'
    }, {
        min: 201,
        max: 300,
        text: '非常不健康(Very Unhealthy)',
        color: '#8000ff'
    }, {
        min: 301,
        max: 500,
        text: '危害(Hazardous)',
        color: '#99002b'
    }],
    exRateList: []
}

const state = {
    ...initialState,
    initialState() {
        return initialState;
    }
};

const mutations = {
    setAQI(state, aqi) {
        state.aqi = aqi;
    },
    setAQIList(state, aqiList) {
        state.aqiList = aqiList;
    },
    setExRateList(state, exRateList) {
        state.exRateList = exRateList;
    }
}

const getters = {
    aqi: state => state.aqi,
    aqiList: state => state.aqiList,
    exRateList: state => state.exRateList
}

const actions = {
    getAQI({
        commit
    }) {
        axios
            .get(helper + "http://opendata.epa.gov.tw/webapi/Data/REWIQA/?$filter=County%20eq%20%27%E5%9F%BA%E9%9A%86%E5%B8%82%27%20and%20SiteName%20eq%20%27%E5%9F%BA%E9%9A%86%27&$orderby=SiteName&$skip=0&$top=1000&format=json", {
                timeout: 30000
            })
            .then(response => {
                commit("setAQI", response.data[0].AQI);
            })
            .catch(error => {
                console.log(error);
            });

    },
    getExRate({
        commit
    }, cur) {
        let today = moment().format("YYYY-MM-DD");
        axios
            .get("https://api.coinbase.com/v2/exchange-rates", {
                header: {
                    "CB-VERSION": today
                },
                params: {
                    currency: cur
                },
                timeout: 30000
            }).then(response => {
                commit('setExRateList', response.data.data.rates);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};