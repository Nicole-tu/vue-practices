<template>
  <section>
    <el-container>
      <el-row>
        <el-col :xl="12">
          <div class="grid-content">Today is :{{ today }}</div>
        </el-col>
      </el-row>
    </el-container>
    <el-container class="main-container">
      <el-aside>
        <div class="search-box">
          <el-select
            v-model="params.city"
            placeholder="選擇城市"
            :clearable="true"
            :filterable="true"
            @change="getAreaList"
            @clear="clearCityList"
          >
            <el-option
              v-for="city in cityList"
              :key="city.value"
              :label="city.name"
              :value="city.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="params.area"
            placeholder="選擇區域"
            :clearable="true"
            :filterable="true"
            @clear="clearAreaList"
          >
            <el-option
              v-for="area in areaList"
              :key="area.value"
              :label="area.name"
              :value="area.name"
            ></el-option>
          </el-select>
          <el-button type="primary" round style="width:100%" @click="searchMask"
            >搜尋</el-button
          >
        </div>
        <div class="info-box"></div>
      </el-aside>
      <el-main>
        <l-map
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          :options="{ zoomControl: false }"
        >
          <l-tile-layer
            :url="url"
            :attribution="attribution"
            min-zoom="8"
            max-zoom="15"
          ></l-tile-layer>
          <!-- <l-marker :lat-lng="getCoords">
          <l-icon :icon-url="icon" :icon-size="iconSize"></l-icon>
          <l-popup
            :content="popup"
            :options="{ autoClose: false, closeOnClick: false }"
          ></l-popup>
          </l-marker>-->
          <l-control-zoom position="bottomright"></l-control-zoom>
        </l-map>
      </el-main>
    </el-container>
  </section>
</template>

<script>
// import { latLng } from "leaflet";
import { LMap, LTileLayer, LControlZoom } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom
  },
  data() {
    return {
      params: {
        city: "",
        area: ""
      },
      selectedCity: "",
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      zoom: 10,
      center: [23.9738, 120.9797],
      view: [23.9738, 120.9797],
      bounds: {},
      location: null,
      gettingLocation: false,
      today: this.moment().format("YYYY-MM-DD")
    };
  },
  computed: {
    cityList() {
      return this.$store.getters.cityList;
    },
    areaList: {
      get() {
        return this.$store.getters.areaList;
      },
      set(newValue) {
        return newValue;
      }
    },
    latlng() {
      return this.$store.getters.latlng;
    }
  },
  methods: {
    getLocation() {
      const getPosition = options =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });

      getPosition({ timeout: 5000 })
        .then(position => {
          const { latitude, longitude } = position.coords;
          this.center = [latitude, longitude];
        })
        .catch(() => {
          // can not get location
        });
    },
    getCityList() {
      this.$store.dispatch("getCityList");
    },
    getAreaList(city) {
      if (city != "") {
        this.selectedCity = this._.find(this.cityList, c => {
          return c.value == city;
        }).name;
        this.$store.dispatch("getAreaList", city);
      }
    },
    clearCityList() {
      this.selectedCity = "";
      this.areaList = [];
    },
    clearAreaList() {},
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      console.log(this.latlng);
      this.center = center;
    },
    searchMask() {
      this.$store.dispatch("getLatLngs", {
        city: this.selectedCity,
        area: this.params.area
      });
      console.log(this.latlng);
      this.centerUpdated(this.latlng);
      // this.$store.dispatch("getSupplyList");
    }
  },
  created() {
    this.getCityList();
  },
  mounted() {
    // this.getLocation();
  }
};
</script>

<style>
.main-container {
  color: #333;
  line-height: 60px;
  height: 80%;
}

.el-aside {
  width: 30%;
  padding: 0 20px;
  position: absolute;
  z-index: 1000;
  left: 30px;
  top: 100px;
}

.el-main {
  width: 100%;
  height: 800px;
  z-index: 1;
}

.search-box {
  margin: 8px 0 8px 8px;
  border-radius: 10px;
  background-color: #e9f1fc;
  padding: 10px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row :last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  padding: 10px 30px;
}
</style>
