import axios from "axios";
const parseString = require("xml2js").parseString;
const helper = "https://cors-anywhere.herokuapp.com/";
//https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json;

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
                        console.log("parse citylist error", err);
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
                console.log(error);
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
                            console.log("parse arealist error", err);
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
                    console.log(error);
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
                    console.log(error);
                    reject();
                });
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