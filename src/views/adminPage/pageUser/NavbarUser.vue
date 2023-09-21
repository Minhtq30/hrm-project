<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute('ACTIVE'),
      }"
    >
      <router-link to="/page-user/type=ACTIVE"
        >Đang hoạt động {{ formatCount(count?.ACTIVE) }}</router-link
      >
    </li>
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute('BLOCK'),
      }"
    >
      <router-link to="/page-user/type=BLOCK"
        >Đã khóa{{ formatCount(count?.BLOCK) }}</router-link
      >
    </li>
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute('INACTIVE'),
      }"
    >
      <router-link to="/page-user/type=INACTIVE"
        >Chưa kích hoạt{{ formatCount(count?.INACTIVE) }}</router-link
      >
    </li>
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute('DEVICES'),
      }"
    >
      <router-link to="/user-devices/type=DEVICES"
        >Xác thực thiết bị</router-link
      >
    </li>
  </ul>
  <hr />
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  props: {
    countUser: Object,
  },
  setup(props) {
    const route = useRoute();
    const count = computed(() => props.countUser);
    const checkRoute = (index) => {
      if (index == route.params.key) {
        return true;
      } else {
        return false;
      }
    };
    const formatCount = (index) => {
      if (index) {
        return "(" + index + ")";
      } else {
        return "";
      }
    };
    return {
      checkRoute,
      formatCount,
      count,
    };
  },
};
</script>

<style></style>
