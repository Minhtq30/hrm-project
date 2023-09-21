<template>
  <div class="card-body" v-if="notifications">
    <div
      class="alert alert-info alert-dismissible fade show"
      id="redAlert"
      role="alert"
      v-for="notify in notifications"
      :key="notify"
    >
      <strong>{{ notify.data.user_name }}</strong> Liked your post
      <b>{{ notify.data.post_title }}</b>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import { DebugGetNotifications } from "@/api/debug/debug";

export default {
  props: ["user", "user_notifications"],
  setup() {
    //let users = ref([]);
    let notifications = ref([]);

    onMounted(() => {
      // notifications.value = props.user_notifications;
      //
      let s = DebugGetNotifications();
      // s.then(function (result) {
      //   notifications.value = result;
      // });
      console.log("Noti", s);
    });

    window.Echo.channel("public").listen("Hello", (e) => {
      console.log("Go public");
      //code for displaying the serve data
      console.log(e); // the data from the server
    });

    window.Echo.channel("user." + localStorage.getItem("userID")).listen(
      "PrivateTest",
      (e) => {
        //code for displaying the serve data
        console.log(e); // the data from the server
      }
    );
    return {
      notifications,
    };
  },
};
</script>
