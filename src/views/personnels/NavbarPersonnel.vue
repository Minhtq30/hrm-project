<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('ALL') }"
    >
      <router-link to="/personnel/type=ALL"
        >Tất cả {{ formatCount(CountTab?.ALL) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('WORKING') }"
    >
      <router-link to="/personnel/type=WORKING"
        >Đang làm việc {{ formatCount(CountTab?.WORKING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('WAITING') }"
    >
      <router-link to="/personnel/type=WAITING"
        >Chờ nhận việc {{ formatCount(CountTab?.WAITING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('STOP_WORKING') }"
    >
      <router-link to="/personnel/type=STOP_WORKING"
        >Nghỉ việc {{ formatCount(CountTab?.STOP_WORKING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('LEAVING') }"
    >
      <router-link to="/personnel/type=LEAVING"
        >Nghỉ thai sản {{ formatCount(CountTab?.LEAVING) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const listPagination = computed(
      () => store.state.personnels.listPagination
    );
    const CountTab = computed(() => store.state.personnels.CountTab);
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
      listPagination,
      CountTab,
      formatCount,
      checkRoute,
    };
  },
};
</script>

<style></style>
