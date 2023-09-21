<template>
  <div
    class="sidebarChange overflow-y-auto sidebar"
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
import { reactive, ref } from "vue";
import { toggleSidebar } from "@/components/sidebar/state";
import { collapsed } from "@/components/sidebar/state";
import { sidebarWidth } from "@/components/sidebar/state";
import MenuItem from "@/components/sidebar/MenuItem.vue";
import { useRouter } from "vue-router";
import { LOGO_CTY } from "@/constants/ApiUrl";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    MenuItem,
  },
  setup() {
    const router = useRouter();
    const showMenu = ref(false);
    const logo = ref(LOGO_CTY);
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const menuTree = reactive([
      {
        label: "Chấm công",
        icon: "fal fa-alarm-clock",
        to: "/user-manual/timekeep",
        permission: ["PROFILE"],
        smallLabel: "Chấm công",
        children: [
          {
            icon: "",
            label: "Tổng quan",
            to: "/user-manual/timekeep/tab=1",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Bảng phân ca",
            to: "/user-manual/timekeep/tab=2",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Phân ca làm việc",
            to: "/user-manual/timekeep/tab=3",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Bảng chấm công",
            to: "/user-manual/timekeep/tab=4",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Bảng đăng ký ca",
            to: "/user-manual/timekeep/tab=5",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Bảng chấm công ăn",
            to: "/user-manual/timekeep/tab=6",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Quản lý ngày nghỉ",
            to: "/user-manual/timekeep/tab=7",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Tự động chấm công",
            to: "/user-manual/timekeep/tab=8",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Quản lý phép bù",
            to: "/user-manual/timekeep/tab=9",
            permission: ["PROFILE"],
          },
          {
            icon: "",
            label: "Báo cáo",
            to: "/user-manual/timekeep/tab=10",
            permission: ["PROFILE"],
          },
        ],
      },
      {
        label: "Đơn từ",
        icon: "fal fa-file-alt",
        to: `/user/salary/${userProfile.value.personnel_id}`,
        permission: ["PROFILE"],
        smallLabel: "Đơn từ",
      },
      {
        label: "Nhân sự",
        icon: "fal fa-id-card",
        to: `/user/profile/${userProfile.value.personnel_id}`,
        permission: ["PROFILE"],
        smallLabel: "HSNS",
      },
      {
        label: "Tuyển dụng",
        icon: "fal fa-user-plus",
        to: `/user/furlough/${userProfile.value.personnel_id}`,
        permission: ["PROFILE"],
        smallLabel: "Tuyển dụng",
      },
      {
        label: "Tài sản",
        icon: "fal fa-business-time",
        to: `/user/compensatory/${userProfile.value.personnel_id}`,
        permission: ["PROFILE"],
        smallLabel: "Tài sản",
      },
      {
        label: "Bảng lương",
        icon: "fal fa-envelope-open-dollar",
        to: "/user",
        permission: ["PROFILE"],
        smallLabel: "Bảng lương",
      },
    ]);
    const toggleShowMenu = () => (showMenu.value = !showMenu.value);
    const handleToSocial = () => {
      router.push({ path: "/social", name: "Social" });
    };
    return {
      showMenu,
      logo,
      userProfile,
      menuTree,
      toggleShowMenu,
      toggleSidebar,
      collapsed,
      sidebarWidth,
      handleToSocial,
    };
  },
  data() {
    return {};
  },
};
</script>
<style scoped></style>
