<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-1 hoverRouter"
      :class="{
        activeRouter: checkRoute('/asset'),
      }"
    >
      <router-link to="/asset"
        >Tất cả ({{ countAssetByStatus.TOTAL }})</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{
        activeRouter: checkRoute('/asset-using'),
      }"
    >
      <router-link to="/asset-using"
        >Đang sử dụng ({{ countAssetByStatus.USING }})</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{
        activeRouter: checkRoute('/asset-unused'),
      }"
    >
      <router-link to="/asset-unused"
        >Chưa sử dụng ({{ countAssetByStatus.UNUSED }})</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{
        activeRouter: checkRoute('/asset-repair'),
      }"
    >
      <router-link to="/asset-repair"
        >Sửa chữa, bảo dưỡng ({{ countAssetByStatus.REPAIR }})</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{
        activeRouter: checkRoute('/asset-broken'),
      }"
    >
      <router-link to="/asset-broken"
        >Hỏng ({{ countAssetByStatus.BROKEN }})</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{
        activeRouter: checkRoute('/asset-lost'),
      }"
    >
      <router-link to="/asset-lost"
        >Mất, hủy, thanh lý ({{ countAssetByStatus.NOT_EXIST }})</router-link
      >
    </li>
  </ul>
  <hr />
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const perPage = ref(25);
    const isLoading = ref(true);
    const EndLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("asset/countAssetByStatusAction");
    const countAssetByStatus = computed(
      () => store.state.asset.countAssetByStatus
    );
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    return {
      checkRoute,
      countAssetByStatus,
      perPage,
      isLoading,
      EndLoading,
    };
  },
};
</script>
<style></style>
