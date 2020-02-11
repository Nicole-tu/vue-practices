<template>
  <el-container class="main-container">
    <el-aside
      ><div class="search-box">
        <el-select
          v-model="params.city"
          placeholder="選擇城市"
          :clearable="true"
          :filterable="true"
          @change="getAreaList"
        >
          <el-option
            v-for="item in cityList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="params.area"
          placeholder="選擇區域"
          :clearable="true"
          :filterable="true"
        >
          <el-option
            v-for="item in areaList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select></div
    ></el-aside>
    <el-main>
      <l-map
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="center"></l-marker>
        <!-- <l-marker :lat-lng="getCoords">
          <l-icon :icon-url="icon" :icon-size="iconSize"></l-icon>
          <l-popup
            :content="popup"
            :options="{ autoClose: false, closeOnClick: false }"
          ></l-popup>
        </l-marker> -->
      </l-map>
    </el-main>
  </el-container>
</template>

<script>
import { LMap, LTileLayer , LMarker/*, LIcon, LPopup*/ } from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LIcon,
    // LPopup
  },
  data() {
    return {
      params: {
        city: "",
        area: ""
      },
      areaList: "",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 13,
      center: [23.9738, 120.9797],
      location: null,
      gettingLocation: false
    };
  },
  computed: {
    cityList() {
      return this.$store.getters.cityList;
    }
  },
  methods: {
    getCityList() {
      this.$store.dispatch("getCityList");
    },
    getAreaList(city) {
      if (city != "") {
        this.areaList = this._.find(this.cityList, c => {
          return c.name == city;
        }).areas;
      }
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
  },
  created() {},
  mounted() {
    
  }
};
</script>

<style>
.main-container {
  color: #333;
  line-height: 60px;
  height: 80%;
}

.el-header {
  background-color: #3781e1;
  border-radius: 20px 20px 0 0;
  text-align: center;
  color: white;
  font-size: 25px;
}

.el-aside {
  width: 30%;
  padding: 0 20px;
  position: absolute;
  z-index: 1000;
  left: 50px;
  top: 50px;
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
</style>
