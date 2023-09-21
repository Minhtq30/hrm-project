<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-1 hoverRouter"
      :class="{ activeRouter: checkRoute('ALL') }"
    >
      <router-link to="/approval-approval-created/type=ALL"
        >Tất cả {{ formatCount(CountTab?.ALL) }}</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{ activeRouter: checkRoute('WAITING') }"
    >
      <router-link to="/approval-approval-created/type=WAITING"
        >Chờ duyệt {{ formatCount(CountTab?.WAITING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVING') }"
    >
      <router-link to="/approval-approval-created/type=APPROVING"
        >Đang duyệt {{ formatCount(CountTab?.APPROVING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVED') }"
    >
      <router-link to="/approval-approval-created/type=APPROVED"
        >Đã duyệt {{ formatCount(CountTab?.APPROVED) }}</router-link
      >
    </li>
    <li
      class="px-4 py-1 hoverRouter"
      :class="{ activeRouter: checkRoute('NO_APPROVED') }"
    >
      <router-link to="/approval-approval-created/type=NO_APPROVED"
        >Không duyệt {{ formatCount(CountTab?.NO_APPROVED) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
import { useApprovalCreated } from "@/store/modules/approval/ApprovalCreated";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const route = useRoute();
    const created = useApprovalCreated();
    const { CountTab } = storeToRefs(created);
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
