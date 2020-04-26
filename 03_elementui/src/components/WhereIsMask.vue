<template>
  <section>
    <i class="el-icon-map-location"></i>   口罩地圖
    <el-container class="main-container">
      <el-aside>
        <div class="search-box">
          <el-row justify="center">
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
          </el-row>
          <el-row :gutter="6">
            <el-col :span="12">
              <el-button type="secondary" round style="width:100%" @click="clearSearch">清除</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" round style="width:100%" @click="searchMask">搜尋</el-button>
            </el-col>
          </el-row>
        </div>
      </el-aside>
      <el-main>
        <l-map
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          :options="{ zoomControl: false }"
        >
          <l-tile-layer :url="url" :attribution="attribution" min-zoom="8" max-zoom="20"></l-tile-layer>
          <l-marker :lat-lng="marker.latLng" v-for="(marker,m) in markers" :key="m">
            <l-popup :content="marker.popup" :options="{ autoClose: false, closeOnClick: false }"></l-popup>
          </l-marker>
          <l-control-zoom position="bottomright"></l-control-zoom>
        </l-map>
      </el-main>
    </el-container>
  </section>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControlZoom, LMarker, LPopup } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom,
    LMarker,
    LPopup
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
      zoom: 13,
      center: [23.9738, 120.9797],
      markers: []
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
    supplyList() {
      return this.$store.getters.supplyList;
    },
    pharmacies() {
      return this.supplyList.filter(pharmacy => {
        if (!this.params.area) {
          return pharmacy.properties.county === this.params.city;
        }
        return pharmacy.properties.town === this.params.area;
      });
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
          this.center = latLng(latitude, longitude);
        })
        .catch(error => {
          console.log("Can not get location",error);
          this.center= [23.9738, 120.9797];
        });
    },
    getCityList() {
      this.$store.dispatch("getCityList");
    },
    getAreaList(city) {
      if (city != "") {        
      this.params.area= "";
        this.areaList=[];
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
    clearAreaList(){
      this.params.area= "";
    },
    clearSearch() {
      this.selectedCity = "";
      this.areaList = [];
      this.params={
        city: "",
        area: ""
      };
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    getSupplyList() {
      return this.$store.dispatch("getSupply");
    },
    searchMask() {
      this.markers=[];
      this.pharmacies.forEach(pharmacy => {
        this.markers.push({
          latLng: latLng(
            pharmacy.geometry.coordinates[1],
            pharmacy.geometry.coordinates[0]
          ),
          popup: `<p><strong style="font-size: 20px;">${
            pharmacy.properties.name
          }</strong></p>
          <strong style="font-size: 16px; color: #d45345;">口罩剩餘數量<br>成人 ： ${
            pharmacy.properties.mask_adult
              ? `${pharmacy.properties.mask_adult} 個`
              : "目前無法取得資料"
          }<br>兒童 ： ${
            pharmacy.properties.mask_child
              ? `${pharmacy.properties.mask_child} 個`
              : "目前無法取得資料"
          }</strong><br>
          地址: <a href="https://www.google.com/maps/search/?api=1&query=${pharmacy.geometry.coordinates[1]},${
            pharmacy.geometry.coordinates[0]}" target=”_blank”>${pharmacy.properties.address}</a><br>
          電話: <a href="tel:${pharmacy.properties.phone}">${pharmacy.properties.phone}</a><br>
          <small>最後更新時間: ${pharmacy.properties.updated}</small>`
        });
        this.center = latLng(
          pharmacy.geometry.coordinates[1],
          pharmacy.geometry.coordinates[0]
        );
      });
    }
  },
  created() {
    this.getCityList();
    this.getSupplyList();
  },
  mounted() {
    this.getLocation();
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
  background-color:rgba(255,255,255,0.4);
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

.el-select{
  width:100%;
}

.grid-content {
  min-height: 36px;
  padding: 10px 30px;
}
</style>
