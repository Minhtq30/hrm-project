<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-1"
      :class="{ activeRouter: checkRoute('/candidate-profile/all') }"
    >
      <router-link to="/contract-personnel">Tất cả </router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-collaborator">Ứng tuyển</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-sixmonth">PV lần 1</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-apprenticeship">PV lần 2</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-indefinite">Không tham gia PV</router-link>
    </li>
    <li class="px-4 py-1">
      <router-link to="/contract-twelvemonth">Từ chối nhân việc</router-link>
    </li>
    <li
      class="px-6 py-1 hover:bg-red-200 relative mr-2 rounded-lg cursor-pointer group"
    >
      <i class="fas fa-angle-down text-lg"></i>
      <div
        class="absolute z-10 right-0 top-8 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
      >
        <ul class="bg-white p-3 rounded-md">
          <li
            class="sub-item w-44"
            @click="this.$router.push('/contract-apprenticeship')"
          >
            Đạt
          </li>
          <li
            class="sub-item w-44"
            @click="this.$router.push('/contract-sixmonth')"
          >
            Đồng ý nhận việc
          </li>
          <li
            class="sub-item w-44"
            @click="this.$router.push('/contract-indefinite')"
          >
            Không đạt
          </li>
          <li
            class="sub-item w-44"
            @click="this.$router.push('/contract-twelvemonth')"
          >
            Đã chuyển HSNS
          </li>
        </ul>
      </div>
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
