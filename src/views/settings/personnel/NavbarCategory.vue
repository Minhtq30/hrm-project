<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute('/personnel-profile-settings-category-bonus'),
      }"
    >
      <router-link to="/personnel-profile-settings-category-bonus"
        >Khen thưởng</router-link
      >
    </li>
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute(
          '/personnel-profile-settings-category-discipline'
        ),
      }"
    >
      <router-link to="/personnel-profile-settings-category-discipline"
        >Kỷ luật</router-link
      >
    </li>
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute(''),
      }"
    >
      <router-link to="">Điều chuyển</router-link>
    </li>
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute(
          '/personnel-profile-settings-category-receive'
        ),
      }"
    >
      <router-link to="/personnel-profile-settings-category-receive"
        >Tiếp nhận</router-link
      >
    </li>
    <li class="px-4 hoverRouter">
      <router-link to="">Bổ nhiệm</router-link>
    </li>
    <li class="px-4 hoverRouter">
      <router-link to="">Miễn nhiệm</router-link>
    </li>
    <li class="px-4 hoverRouter">
      <router-link to="">Chấm dứt HĐLĐ</router-link>
    </li>
    <li
      class="px-4 hoverRouter"
      :class="{
        activeRouter: checkRoute('/personnel-profile-settings-category-quit'),
      }"
    >
      <router-link to="/personnel-profile-settings-category-quit"
        >Thôi việc</router-link
      >
    </li>
  </ul>
  <hr />
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
