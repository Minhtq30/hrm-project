<template>
  <ul class="flex text-gray-400 py-3">
    <li class="px-4 py-1" :class="{ activeRouter: checkRoute('ALL') }">
      <router-link
        :to="
          '/approval-worktime-view/type=' +
          this.$route.params.type +
          '&menu=ALL'
        "
        >Tất cả {{ formatCount(CountTab?.ALL) }}</router-link
      >
    </li>
    <li class="px-4 py-1" :class="{ activeRouter: checkRoute('WAITING') }">
      <router-link
        :to="
          '/approval-worktime-view/type=' +
          this.$route.params.type +
          '&menu=WAITING'
        "
        >Chờ duyệt {{ formatCount(CountTab?.WAITING) }}</router-link
      >
    </li>
    <li class="px-4 py-1" :class="{ activeRouter: checkRoute('APPROVING') }">
      <router-link
        :to="
          '/approval-worktime-view/type=' +
          this.$route.params.type +
          '&menu=APPROVING'
        "
        >Đang duyệt {{ formatCount(CountTab?.APPROVING) }}</router-link
      >
    </li>
    <li class="px-4 py-1" :class="{ activeRouter: checkRoute('APPROVED') }">
      <router-link
        :to="
          '/approval-worktime-view/type=' +
          this.$route.params.type +
          '&menu=APPROVED'
        "
        >Đã duyệt {{ formatCount(CountTab?.APPROVED) }}</router-link
      >
    </li>
    <li
      class="px-4 py-1"
      :class="{
        activeRouter: checkRoute('NO_APPROVED'),
      }"
    >
      <router-link
        :to="
          '/approval-worktime-view/type=' +
          this.$route.params.type +
          '&menu=NO_APPROVED'
        "
        >Không duyệt {{ formatCount(CountTab?.NO_APPROVED) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
import { useApprovalWorktime } from "@/store/modules/approval/ApprovalWorktime";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const route = useRoute();
    const regime = useApprovalWorktime();
    const { CountTab } = storeToRefs(regime);
    const checkRoute = (index) => {
      if (index == route.params.menu) {
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
