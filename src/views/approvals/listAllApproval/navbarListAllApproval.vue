<template>
  <ul class="flex text-gray-400 py-3">
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('ALL') }"
    >
      <router-link to="/approval-approval-all/type=ALL"
        >Tất cả {{ formatCount(CountTab?.ALL) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('WAITING') }"
    >
      <router-link to="/approval-approval-all/type=WAITING"
        >Chờ duyệt {{ formatCount(CountTab?.WAITING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVING') }"
    >
      <router-link to="/approval-approval-all/type=APPROVING"
        >Đang duyệt {{ formatCount(CountTab?.APPROVING) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('APPROVED') }"
    >
      <router-link to="/approval-approval-all/type=APPROVED"
        >Đã duyệt {{ formatCount(CountTab?.APPROVED) }}</router-link
      >
    </li>
    <li
      class="px-4 py-[2px] hoverRouter"
      :class="{ activeRouter: checkRoute('NO_APPROVED') }"
    >
      <router-link to="/approval-approval-all/type=NO_APPROVED"
        >Không duyệt {{ formatCount(CountTab?.NO_APPROVED) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
import { useListAllApproval } from "@/store/modules/approval/ListAllApproval";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const route = useRoute();
    const listall = useListAllApproval();
    const { CountTab } = storeToRefs(listall);
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
