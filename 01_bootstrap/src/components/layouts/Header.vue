<template>
  <div>
    <nav
      class="main-header navbar navbar-expand navbar-light bg-light shadow-sm fixed-top"
    >
      <div class="navbar-collapse collapse w-100 order-1 order-md-0">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item w-120">
            <router-link
              class="nav-link"
              :to="{ name: 'calendar' }"
              :class="{ active: nowRoute == 'calendar' }"
            >
              <font-awesome-icon
                icon="calendar-day"
                size="lg"
              />&nbsp;&nbsp;Calendar
            </router-link>
          </li>
          <li class="nav-item w-120">
            <router-link
              class="nav-link"
              :to="{ name: 'notes' }"
              :class="{ active: nowRoute == 'notes' }"
            >
              <font-awesome-icon
                icon="sticky-note"
                size="lg"
              />&nbsp;&nbsp;Notes
            </router-link>
          </li>
          <li class="nav-item w-120">
            <router-link
              class="nav-link"
              :to="{ name: 'quotes' }"
              :class="{ active: nowRoute == 'quotes' }"
            >
              <font-awesome-icon
                icon="quote-left"
                size="lg"
              />&nbsp;&nbsp;Quotes
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mx-auto order-0">
        <router-link class="navbar-brand mx-auto" :to="{ name: 'home' }"
          >My Diary</router-link
        >
      </div>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'calendar' }">
              <font-awesome-icon icon="bell" size="lg" />
              <span
                class="badge badge-pill badge-danger badge-notify"
                v-show="todayEvents > 0"
                >{{ todayEvents }}</span
              >
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="javascript:;">
              <font-awesome-icon icon="cat" />
              {{ greeting }}, {{ userName }}!
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">
              <font-awesome-icon icon="sign-out-alt" />&nbsp;&nbsp;Close
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    nowRoute() {
      return this.$route.name;
    },
    todayEvents() {
      return this.$store.getters.todayEvents;
    },
    userName() {
      return this.$store.getters.userName || localStorage.getItem("user");
    },
    greeting() {
      let time = this.moment();
      let g = null; //return g

      if (!time || !time.isValid()) {
        return;
      } //if we can't find a valid or filled moment, we return.

      let split_afternoon = 12; //24hr time to split the afternoon
      let split_evening = 17; //24hr time to split the evening
      let currentHour = parseFloat(time.format("HH"));

      if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "Afternoon";
      } else if (currentHour >= split_evening) {
        g = "Evening";
      } else {
        g = "Morning";
      }

      return g;
    }
  },
  created() {}
};
</script>
