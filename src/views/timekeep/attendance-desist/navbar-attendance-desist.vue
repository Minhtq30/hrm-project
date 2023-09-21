<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-1"
      :class="{
        activeRouter: checkRoute('/timekeep-attendance-desist/holiday'),
      }"
    >
      <router-link to="/timekeep-attendance-desist/holiday"
        >Nghỉ lễ</router-link
      >
    </li>
    <li
      class="px-4 py-1"
      :class="{
        activeRouter: checkRoute('/timekeep-attendance-desist/event'),
      }"
    >
      <router-link to="/timekeep-attendance-desist/event"
        >Nghỉ sự kiện, nghỉ bù</router-link
      >
    </li>
    <li
      class="px-4 py-1"
      :class="{
        activeRouter: checkRoute('/timekeep-attendance-desist/abnormal'),
      }"
    >
      <router-link to="/timekeep-attendance-desist/abnormal"
        >Nghỉ bất thường</router-link
      >
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    return {
      checkRoute,
    };
  },
};
</script>

<style></style>
