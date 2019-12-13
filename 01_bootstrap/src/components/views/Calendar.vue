<template>
  <div></div>
</template>
<script>
// import credentials from "@/config/credentials.json";
// const { google } = require("googleapis");
// let client = credentials.installed;

// Client ID and API key from the Developer Console
// const CLIENT_ID = client.client_id;
// const API_KEY = client.api_key;
// Array of API discovery doc URLs for APIs used by the quickstart
// const DISCOVERY_DOCS = [
//   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
// ];
// // Authorization scopes required by the API; multiple scopes can be
// // included, separated by spaces.
// const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default {
  data() {
    return {
      items: undefined,
      api: undefined,
      authorized: false
    };
  }

  //   created() {
  //     this.api = google;
  //     this.handleClientLoad();
  //   },

  //   methods: {
  //     /**
  //      *  On load, called to load the auth2 library and API client library.
  //      */
  //     handleClientLoad() {
  //       this.api.load("client:auth2", this.initClient);
  //     },

  //     /**
  //      *  Initializes the API client library and sets up sign-in state
  //      *  listeners.
  //      */
  //     initClient() {
  //       let vm = this;

  //       vm.api.client
  //         .init({
  //           apiKey: API_KEY,
  //           clientId: CLIENT_ID,
  //           discoveryDocs: DISCOVERY_DOCS,
  //           scope: SCOPES
  //         })
  //         .then(() => {
  //           // Listen for sign-in state changes.
  //           vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
  //         });
  //     },

  //     /**
  //      *  Sign in the user upon button click.
  //      */
  //     handleAuthClick(event) {
  //       console.log(event);
  //       Promise.resolve(this.api.auth2.getAuthInstance().signIn()).then(() => {
  //         this.authorized = true;
  //       });
  //     },

  //     /**
  //      *  Sign out the user upon button click.
  //      */
  //     handleSignoutClick(event) {
  //       console.log(event);
  //       Promise.resolve(this.api.auth2.getAuthInstance().signOut()).then(() => {
  //         this.authorized = false;
  //       });
  //     },

  //     /**
  //      * Print the summary and start datetime/date of the next ten events in
  //      * the authorized user's calendar. If no events are found an
  //      * appropriate message is printed.
  //      */
  //     getData() {
  //       let vm = this;

  //       vm.api.client.calendar.events
  //         .list({
  //           calendarId: "primary",
  //           timeMin: new Date().toISOString(),
  //           showDeleted: false,
  //           singleEvents: true,
  //           maxResults: 10,
  //           orderBy: "startTime"
  //         })
  //         .then(response => {
  //           vm.items = this.syntaxHighlight(response.result.items);
  //           console.log(vm.items);
  //         });
  //     },
  //     syntaxHighlight(json) {
  //       if (typeof json != "string") {
  //         json = JSON.stringify(json, undefined, 2);
  //       }
  //       json = json
  //         .replace(/&/g, "&amp;")
  //         .replace(/</g, "&lt;")
  //         .replace(/>/g, "&gt;");
  //       return json.replace(
  //         /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
  //         match => {
  //           var cls = "number";
  //           if (/^"/.test(match)) {
  //             if (/:$/.test(match)) {
  //               cls = "key";
  //             } else {
  //               cls = "string";
  //             }
  //           } else if (/true|false/.test(match)) {
  //             cls = "boolean";
  //           } else if (/null/.test(match)) {
  //             cls = "null";
  //           }
  //           return '<span class="' + cls + '">' + match + "</span>";
  //         }
  //       );
  //     }
  //   }
};
</script>
