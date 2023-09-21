<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('ALL') }"
    >
      <router-link to="/approval-approval-private/type=ALL"
        >Tất cả {{ formatCount(CountTab?.ALL) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('WAITING') }"
    >
      <router-link to="/approval-approval-private/type=WAITING"
        >Chờ duyệt {{ formatCount(CountTab?.WAITING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVING') }"
    >
      <router-link to="/approval-approval-private/type=APPROVING"
        >Đang duyệt {{ formatCount(CountTab?.APPROVING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVED') }"
    >
      <router-link to="/approval-approval-private/type=APPROVED"
        >Đã duyệt {{ formatCount(CountTab?.APPROVED) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('NO_APPROVED') }"
    >
      <router-link to="/approval-approval-private/type=NO_APPROVED"
        >Không duyệt {{ formatCount(CountTab?.NO_APPROVED) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const total = useApprovalTotal();
    const { CountTab } = storeToRefs(total);
    const route = useRoute();
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
      CountTab,
    };
  },
};
</script>

<style></style>
