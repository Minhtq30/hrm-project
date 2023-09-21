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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const menuTree = reactive([
      {
        label: "Chấm công",
        icon: "fal fa-calendar-day",
        to: `/user/attendance/month=${month}&year=${year}`,
        permission: ["PROFILE"],
        smallLabel: "Chấm công",
      },
      {
        label: "Bảng lương",
        icon: "fal fa-file-invoice-dollar",
        to: `/user/salary/${localStorage.getItem(
          "personnelID"
        )}&month=${month}&year=${year}`,
        permission: ["PROFILE"],
        smallLabel: "Bảng lương",
      },
      {
        label: "Hồ sơ nhân sự",
        icon: "fal fa-id-card",
        to: `/user/profile/${localStorage.getItem("personnelID")}`,
        permission: ["PROFILE"],
        smallLabel: "Hồ sơ NS",
      },
      {
        label: "Thông tin phép",
        icon: "fal fa-umbrella",
        to: `/user/furlough/${localStorage.getItem("personnelID")}`,
        permission: ["PROFILE"],
        smallLabel: "Nghỉ phép",
      },
      {
        label: "Thông tin nghỉ bù",
        icon: "fal fa-business-time",
        to: `/user/compensatory/${localStorage.getItem("personnelID")}`,
        permission: ["PROFILE"],
        smallLabel: "Nghỉ bù",
      },
      {
        label: "Tài khoản",
        icon: "fal fa-user-cog",
        to: "/user",
        permission: ["PROFILE"],
        smallLabel: "Tài khoản",
      },
      {
        label: "Email gửi đi",
        icon: "fal fa-envelope",
        to: "",
        permission: ["PROFILE"],
        smallLabel: "Email",
      },
      {
        label: "Lịch sử truy cập",
        icon: "fal fa-history",
        to: "/user/history",
        permission: ["PROFILE"],
        smallLabel: "Lịch sử",
      },
      {
        label: "Danh sách thiết bị",
        icon: "fal fa-phone-laptop",
        to: "/user-device",
        permission: ["PROFILE"],
        smallLabel: "Thiết bị",
      },
    ]);
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
