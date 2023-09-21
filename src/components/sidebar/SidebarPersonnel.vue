<template>
  <div
    class="sidebarChange"
    :style="{ width: sidebarWidth }"
    style="background-color: var(--color-primary)"
  >
    <div
      class="flex-column w-full"
      style="background-color: var(--color-primary)"
    >
      <div
        class="flex justify-between px-6 mt-4"
        :class="{ isToogle: collapsed }"
      >
        <button
          @click="toggleSidebar"
          class="text-white flex items-center"
          :class="{ isToogle: collapsed }"
        >
          <i class="fal fa-align-left text-2xl" v-if="collapsed === false"></i>
          <i class="fal fa-bars text-2xl" v-else></i>
        </button>
        <a
          href=""
          class="flex items-center space-x-2"
          @click.prevent="handleToSocial"
          v-show="collapsed === false"
        >
          <img :src="logo" alt="" class="w-10 h-10" />
        </a>
      </div>
      <!--   sidebar-->
      <div class="primary-sidebar">
        <div class="menu flex-col overflow-hidden">
          <menu-item
            class="hover:bg-white/20 text-white py-2"
            v-for="(item, index) in menuTree"
            :key="index"
            :label="item.label"
            :depth="0"
            :data="item.children"
            :to="item.to"
            :icon="item.icon"
            :permission="item.permission"
            :smallLabel="item.smallLabel"
          />
        </div>
      </div>
      <!--   main-->
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { toggleSidebar } from "@/components/sidebar/state";
import { collapsed } from "@/components/sidebar/state";
import { sidebarWidth } from "@/components/sidebar/state";
import MenuItem from "@/components/sidebar/MenuItem.vue";
import { useRouter } from "vue-router";
import { LOGO_CTY } from "@/constants/ApiUrl";
export default {
  components: {
    MenuItem,
  },
  setup() {
    const router = useRouter();
    const showMenu = ref(false);
    const logo = ref(LOGO_CTY);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const toggleShowMenu = () => (showMenu.value = !showMenu.value);
    const handleToSocial = () => {
      router.push({ path: "/social", name: "Social" });
    };
    return {
      showMenu,
      logo,
      date,
      year,
      month,
      toggleShowMenu,
      toggleSidebar,
      collapsed,
      sidebarWidth,
      handleToSocial,
    };
  },
  data() {
    return {
      menuTree: [
        {
          label: "Hồ sơ nhân sự",
          icon: "fal fa-address-card",
          to: "",
          smallLabel: "Nhân sự",
          permission: ["PERSONNEL_PROFILE"],
          children: [
            {
              icon: "",
              label: "Tất cả",
              to: "/personnel/type=ALL",
              permission: ["PERSONNEL_PROFILE"],
            },
            {
              icon: "",
              label: "Đang làm việc",
              to: "/personnel/type=WORKING",
              permission: ["PERSONNEL_PROFILE"],
            },
            // {
            //   icon: "",
            //   label: "Cập nhật thông tin",
            //   to: "/personne",
            //   permission: ["PERSONNEL_PROFILE"],
            // },
            {
              icon: "",
              label: "Chờ nhận việc",
              to: "/personnel/type=WAITING",
              permission: ["PERSONNEL_PROFILE"],
            },
            {
              icon: "",
              label: "Nghỉ việc",
              to: "/personnel/type=STOP_WORKING",
              permission: ["PERSONNEL_PROFILE"],
            },
            {
              icon: "",
              label: "Nghỉ thai sản",
              to: "/personnel/type=LEAVING",
              permission: ["PERSONNEL_PROFILE"],
            },
          ],
        },
        {
          label: "Hợp đồng",
          icon: "fal fa-file-signature",
          to: "/contract-personnel/contract_type=ALL",
          smallLabel: "Hợp đồng",
          permission: ["PERSONNEL_CONTRACT"],
        },
        {
          label: "Bảo hiểm",
          icon: "fal fa-first-aid",
          to: "",
          smallLabel: "Bảo hiểm",
          permission: ["PERSONNEL_INSURANCE"],
          children: [
            {
              icon: "",
              label: "Tất cả",
              to: `/personnel-insurance/month=${this.month}&year=${this.year}`,
              permission: ["PERSONNEL_INSURANCE"],
            },
            {
              icon: "",
              label: "Dự kiến tăng",
              to: `/personnel-insurance-increase/month=${this.month}&year=${this.year}`,
              permission: ["PERSONNEL_INSURANCE"],
            },
            {
              icon: "",
              label: "Dự kiến giảm",
              to: `/personnel-insurance-reduced/month=${this.month}&year=${this.year}`,
              permission: ["PERSONNEL_INSURANCE"],
            },
          ],
        },
        // {
        //   label: "Đánh giá nhân sự",
        //   icon: "fal fa-tasks",
        //   to: "/person",
        //   permission: "PERSONNEL_INSU",
        //   children: [
        //     {
        //       icon: "",
        //       label: "Phiếu đánh giá",
        //       to: "/person",
        //     },
        //   ],
        // },
        // {
        //   label: "Quyết định",
        //   icon: "fal fa-gift",
        //   to: "/person",
        //   permission: "PERSONNEL_INSE",
        //   children: [
        //     {
        //       label: "level 1.1",
        //       to: "/perso",
        //     },
        //   ],
        // },
        // {
        //   label: "Báo cáo",
        //   icon: "fal fa-chart-pie-alt",
        //   to: "/person",
        //   children: [
        //     {
        //       label: "level 1.1",
        //       to: "/perso",
        //     },
        //   ],
        // },
      ],
    };
  },
};
</script>
<style scoped></style>
