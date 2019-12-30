<template>
  <div class="calendar-page">
    <div class="calendar-auth-buttons">
      <button class="btn btn-primary" v-if="!authorized" @click="signIn">
        <font-awesome-icon :icon="['fab', 'google']" size="lg" />&nbsp;&nbsp;| Sign in
      </button>
      <button class="btn btn-danger" v-if="authorized" @click="signOut">
        <font-awesome-icon :icon="['fab', 'google']" size="lg" />&nbsp;&nbsp;| Sign out
      </button>
      <div class="form-group tip" v-show="authorized">
        <i class="fa fa-info-circle"></i>
        You are log in with google account.
      </div>
    </div>
    <hr />
    <div class="form-group form-inline" v-show="authorized">
      <label style="margin-right:20px;">Calendars:</label>
      <select class="form-control" @change="changeCalendar" v-model="calendarData">
        <option
          v-for="(calendar,c) in calendars"
          :key="c"
          :value="calendar"
          :selected="c===0"
        >{{ calendar.summary }}</option>
      </select>
    </div>
    <br />
    <full-calendar ref="calendar" :events="events" :config="config"></full-calendar>
  </div>
</template>
<script>
import apiConfig from "../../config/credentials";
import { FullCalendar } from "vue-full-calendar";

export default {
  components: { FullCalendar },
  data() {
    return {
      authorized: false,
      items: undefined,
      api: undefined,
      auth: undefined,
      calendarView: "",
      calendarData: null,
      calendars: [],
      config: {
        allDaySlot: false,
        navLinks: true,
        firstDay: 1,
        buttonText: {
          today: "TODAY",
          month: "Month",
          week: "Week",
          day: "Day"
        }
      },
      events: [],
      moment: this.moment,
      todayEvents: []
    };
  },
  mounted() {
    let script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    // script.src = "https://apis.google.com/js/client.js";
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    document.getElementsByTagName("head")[0].appendChild(script);
    this.$nextTick(() => {
      this.api = window.gapi;
      this.loadInitClient();
    });
  },
  methods: {
    loadInitClient() {
      this.api.load("client", this.initClient);
    },
    initClient() {
      let vm = this;
      vm.api.client
        .init({
          apiKey: apiConfig.apiKey,
          clientId: apiConfig.clientId,
          discoveryDocs: apiConfig.discoveryDocs,
          scope: apiConfig.scope
        })
        .then(() => {
          this.auth = vm.api.auth2.getAuthInstance();
        });

      vm.api.auth2.authorize(
        {
          apiKey: apiConfig.apiKey,
          clientId: apiConfig.clientId,
          discoveryDocs: apiConfig.discoveryDocs,
          scope: apiConfig.scope
        },
        response => {
          let config2 = apiConfig.discoveryDocs; // only of google calendar
          vm.api.client.init(config2).then(function() {});
        }
      );
    },
    signIn(event) {
      this.auth.signIn().then(GoogleUser => {
        console.log(GoogleUser);
        this.authorized = true;
        this.getCalendars();
        this.getUpcomingEvents();
      });
    },
    signOut(event) {
      this.auth.signOut().then(GoogleUser => {
        this.authorized = false;
      });
    },
    getCalendars() {
      let vm = this;
      let timeZone = "";

      vm.api.client.calendar.calendars
        .get({ calendarId: "primary" })
        .then(response => {
          timeZone = response.result.timeZone;

          vm.api.client.calendar.calendarList
            .list({
              calendarId: "primary",
              maxResults: 100,
              minAccessRole: "reader"
            })
            .then(calendarListResponse => {
              this.calendars = this._.cloneDeep(
                calendarListResponse.result.items
              );
              this.calendarData = this.calendars[0];
              vm.api.client.calendar.events
                .list({
                  calendarId: this.calendarData.id,
                  timeMin: new Date().toISOString(),
                  showDeleted: false,
                  singleEvents: true,
                  maxResults: 20,
                  orderBy: "startTime"
                })
                .then(response => {
                  let event = response.result.items;
                  vm.events = this._.map(event, e => {
                    return {
                      title: e.summary,
                      start: this.moment(e.start.date || e.start.dateTime),
                      end: this.moment(e.end.date || e.end.dateTime),
                      backgroundColor: this.calendarData.backgroundColor,
                      editable: false,
                      textColor: "#333"
                    };
                  });
                });
            });
        });
    },
    changeCalendar() {
      let vm = this;
      let calendar = this.calendarData;

      vm.api.client.calendar.events
        .list({
          calendarId: calendar.id || "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 20,
          orderBy: "startTime"
        })
        .then(response => {
          let event = response.result.items;
          vm.events = this._.map(event, e => {
            return {
              title: e.summary,
              start: this.moment(e.start.date || e.start.dateTime),
              end: this.moment(e.end.date || e.end.dateTime),
              backgroundColor: calendar.backgroundColor,
              editable: false,
              textColor: "#333"
            };
          });
        });
    },
    getUpcomingEvents() {
      let vm = this;
      vm.api.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 20,
          orderBy: "startTime"
        })
        .then(response => {
          let event = response.result.items;
          vm.todayEvents = this._.filter(event, e => {
            return this.moment(e.start.date || e.start.dateTime).isSame(
              this.moment(),
              "day"
            );
          });

          this.$store.dispatch("setTodayEvents", vm.todayEvents.length);
        });
    }
  },
  computed: {}
};
</script>

<style scoped>
.calendar-page {
  font-family: "Avenir", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei", "PingFang TC";
}

.calendar-auth-buttons {
  display: inline-block;
}

</style>
