<template>
  <ul class="flex text-gray-400 py-3">
    <li class="px-4 py-[2px]" :class="{ activeRouter: checkRoute('ALL') }">
      <router-link to="/timekeep-attendance-assign/type=ALL"
        >Tất cả {{ formatCount(CountTab?.ALL) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px]"
      :class="{
        activeRouter: checkRoute('GROUP'),
      }"
    >
      <router-link to="/timekeep-attendance-assign/type=GROUP"
        >Phân ca cho phòng ban, vị trí
        {{ formatCount(CountTab?.GROUP) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px]"
      :class="{
        activeRouter: checkRoute('PERSON'),
      }"
    >
      <router-link to="/timekeep-attendance-assign/type=PERSON"
        >Phân ca cho cá nhân {{ formatCount(CountTab?.PERSON) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
import { useShiftAssign } from "@/store/modules/timekeep/shiftAssign";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const route = useRoute();
    const assign = useShiftAssign();
    const { CountTab } = storeToRefs(assign);
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
      CountTab,
      formatCount,
    };
  },
};
</script>

<style></style>
