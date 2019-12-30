<template>
  <div class="calendar-page">
    <div class="calendar-auth-buttons">
      <button class="btn btn-primary" v-if="!authorized" @click="signIn">
        <font-awesome-icon :icon="['fab', 'google']" size="lg" />| Sign in
      </button>
      <button class="btn btn-danger" v-if="authorized" @click="signOut">
        <font-awesome-icon :icon="['fab', 'google']" size="lg" />| Sign out
      </button>
    </div>
    <div ref="calendar-table" v-html="calendarView"></div>
  </div>
</template>
<script>
import apiConfig from "../../config/credentials";

export default {
  components: {},
  data() {
    return {
      authorized: false,
      items: undefined,
      api: undefined,
      auth: undefined,
      calendarView: ""
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
    this.api = window.gapi;
    this.loadInitClient();
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
          scope: apiConfig.scopes
        },
        response => {
          let config2 = apiConfig.discoveryDocs; // only of google calendar
          vm.api.client.init(config2).then(function() {});
        }
      );
    },
    signIn(event) {
      this.auth.signIn().then(GoogleUser => {
        this.authorized = true;
        this.getData();
      });
    },
    signOut(event) {
      this.auth.signOut().then(GoogleUser => {
        this.authorized = false;
      });
    },
    getData() {
      let vm = this;
      let moment = this.moment;
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
              console.log(calendarListResponse.result);
              let calendars = calendarListResponse.result.items;
              console.log(calendars.map(cal => cal.summary));
            });
        });

      /*
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
          vm.items = this.syntaxHighlight(response.result.items);
          if (response.result.items) {
            let calendarRows = ['<table class="wellness-calendar"><tbody>'];
            response.result.items.forEach(function(entry) {
              var startsAt =
                moment(entry.start.dateTime).format("L") +
                " " +
                moment(entry.start.dateTime).format("LT");
              var endsAt = moment(entry.end.dateTime).format("LT");
              calendarRows.push(
                `<tr><td>${startsAt} - ${endsAt}</td><td>${entry.summary}</td></tr>`
              );
            });
            calendarRows.push("</tbody></table>");
            this.calendarView = calendarRows.join("");
          }
        });
        */
    }
  },
  computed: {
    week() {
      return this.moment(this.selectedDate).isoWeek();
    },
    weekRange() {
      return {
        from: this.startWeek.toISOString(),
        to: this.endWeek.toISOString()
      };
    },
    startWeek() {
      return this.moment()
        .isoWeek(this.week)
        .startOf("isoWeek");
    },
    endWeek() {
      return this.moment()
        .isoWeek(this.week)
        .endOf("isoWeek");
    }
  }
};
</script>

<style scoped>
.calendar-auth-buttons {
  text-align: justify;
  display: inline-block;
}
</style>
