import axios from "axios";
const parseString = require("xml2js").parseString;
const helper = "https://cors-anywhere.herokuapp.com/";

const initialState = {
    cityList: [],
    areaList: [],
    latlng: [],
    supplyList: []
};

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
    setAreaList(state, areaList) {
        state.areaList = areaList;
    },
    setLatLng(state, latlng) {
        state.latLng = latlng;
    },
    setSupplyList(state, supplyList) {
        state.supplyList = supplyList;
    }
};

const getters = {
    cityList: state => state.cityList,
    areaList: state => state.areaList,
    latLng: state => state.latLng,
    supplyList: state => state.supplyList
};

const actions = {
    getCityList({
        commit
    }) {
        return new Promise((resolve, reject) => {
            axios.get("https://api.nlsc.gov.tw/other/ListCounty").then(response => {
                let data = '<?xml version="1.0" encoding="UTF-8" ?>' + response.data;
                parseString(data, function (err, result) {
                    if (err) {
                        console.error("parse citylist error", err);
                    }
                    let list = [];
                    if (data) {
                        result.countyItems.countyItem.forEach(c => {
                            list.push({
                                value: c.countycode[0],
                                name: c.countyname[0]
                            });
                        });
                    }
                    commit("setCityList", list);
                });
                resolve();
            }).catch(error => {
                console.error(error);
                reject();
            });
        });
    },
    getAreaList({
        commit
    }, cityCode) {
        return new Promise((resolve, reject) => {
            axios
                .get("https://api.nlsc.gov.tw/other/ListTown/" + cityCode)
                .then(response => {
                    let data = '<?xml version="1.0" encoding="UTF-8" ?>' + response.data;
                    parseString(data, function (err, result) {
                        if (err) {
                            console.error("parse arealist error", err);
                        }
                        let list = [];
                        if (data) {
                            result.townItems.townItem.forEach(c => {
                                list.push({
                                    value: c.towncode[0],
                                    name: c.townname[0]
                                });
                            });
                        }
                        commit("setAreaList", list);
                    });
                    resolve();
                }).catch(error => {
                    console.error(error);
                    reject();
                });
        });
    },
    getLatLngs({
        commit
    }, {
        city,
        area
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(helper + "http://api.opencube.tw/twzipcode", {
                    params: {
                        city: city,
                        district: area
                    }
                })
                .then(response => {
                    if (response.data.data) {
                        const {
                            lat,
                            lng
                        } = response.data.data[0];
                        let arr = [lat, lng];
                        commit("setLatLng", arr);
                    }
                    resolve();
                }).catch(error => {
                    console.error(error);
                    reject();
                });
        });
    },
    getSupply({
        commit
    }) {
        axios.get("https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json").then(response => {
            commit("setSupplyList", response.data.features);
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};