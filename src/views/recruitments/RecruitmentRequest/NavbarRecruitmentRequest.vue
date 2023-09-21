<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-1"
      :class="{ activeRouter: checkRoute('/recruitment-request/all') }"
    >
      <router-link to="/recruitment-request/all">Tất cả </router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-twelvemonth">Đang tuyển</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-collaborator">Chờ duyệt</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-sixmonth">Đã duyệt</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-apprenticeship">Hoàn thành</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-indefinite">Hết hạn</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-twelvemonth">Hủy bỏ</router-link>
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
