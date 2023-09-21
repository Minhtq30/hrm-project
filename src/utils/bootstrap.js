// window._ = require("lodash");

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// window.axios = require("axios");

// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// window.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from "laravel-echo";
import Pusher from "pusher-js";

// window.Pusher = require("pusher-js");
window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: process.env.VUE_APP_BROADCAST_DRIVER,
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  wssPort: 6001,
  cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
  forceTLS: true,
  disableStats: true,
  authEndpoint: process.env.VUE_APP_PUSHER_APP_AUTH_URL,
  enabledTransports: ["ws", "wss"],
  transports: ["websocket", "polling", "flashsocket"],
  auth: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      "Content-Type": "application/json",
    },
  },
});
