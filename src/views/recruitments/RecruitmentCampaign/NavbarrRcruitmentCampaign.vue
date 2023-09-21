<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-1"
      :class="{ activeRouter: checkRoute('/recruitment-campaign/all') }"
    >
      <router-link to="/recruitment-campaign/all">Tất cả </router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-collaborator">Đang thực hiện</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-sixmonth">Lên kế hoạch</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-apprenticeship">Hoàn thành</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-indefinite">Tạm dừng</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-twelvemonth">Hủy bỏ</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-twelvemonth">Quá hạn</router-link>
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
