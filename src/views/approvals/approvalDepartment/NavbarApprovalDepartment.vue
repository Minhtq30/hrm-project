<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('ALL') }"
    >
      <router-link to="/approval-approval-department/type=ALL"
        >Tất cả {{ formatCount(CountTab?.ALL) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('WAITING') }"
    >
      <router-link to="/approval-approval-department/type=WAITING"
        >Chờ duyệt {{ formatCount(CountTab?.WAITING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVING') }"
    >
      <router-link to="/approval-approval-department/type=APPROVING"
        >Đang duyệt {{ formatCount(CountTab?.APPROVING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVED') }"
    >
      <router-link to="/approval-approval-department/type=APPROVED"
        >Đã duyệt {{ formatCount(CountTab?.APPROVED) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('NO_APPROVED') }"
    >
      <router-link to="/approval-approval-department/type=NO_APPROVED"
        >Không duyệt {{ formatCount(CountTab?.NO_APPROVED) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
import { useApprovalDepartment } from "@/store/modules/approval/ApprovalDepartment";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const route = useRoute();
    const depart = useApprovalDepartment();
    const { CountTab } = storeToRefs(depart);
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
