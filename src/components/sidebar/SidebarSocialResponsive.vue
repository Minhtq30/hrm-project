<template>
  <div
    class="sidebarChange overflow-y-auto sidebar"
    :style="{ width: sidebarResponsiveWidth }"
    style="background-color: var(--color-primary)"
  >
    <div
      class="flex-column w-full"
      style="background-color: var(--color-primary)"
    >
      <div
        class="flex justify-between px-6 mt-4"
        :class="{ isToogle: collapsedResponsive }"
      >
        <button
          @click="toggleSidebarResponsive"
          class="text-white flex items-center"
          :class="{ isToogle: collapsedResponsive }"
        >
          <i
            class="fal fa-align-left text-2xl"
            v-if="collapsedResponsive === false"
          ></i>
          <i class="fal fa-bars text-2xl" v-else></i>
        </button>
        <a
          href=""
          class="flex items-center space-x-2"
          @click.prevent="handleToSocial"
          v-show="collapsedResponsive === false"
        >
          <img :src="logo" alt="" class="w-10 h-10" />
        </a>
      </div>
      <!--   sidebar-->
      <div class="primary-sidebar">
        <div class="menu flex-col overflow-hidden">
          <menu-item-responsive
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
        <div class="menu flex-col w-full">
          <div class="flex pt-4 pb-2">LỐI TẮT</div>
          <menu-item-responsive
            class="rounded hover:bg-[#ffffff33]"
            v-for="(item, index) in menuTreeShortcut"
            :key="index"
            :label="item.label"
            :src="item.icon"
            :icon="item.icon"
            :depth="0"
            :data="item.children"
            :to="item.to"
            :permission="item.permission"
          />
        </div>
      </div>
      <!--   main-->
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { toggleSidebarResponsive } from "@/components/sidebar/state";
import { collapsedResponsive } from "@/components/sidebar/state";
import { sidebarResponsiveWidth } from "@/components/sidebar/state";
import MenuItemResponsive from "@/components/sidebar/MenuItemResponsive";
import { useRouter } from "vue-router";
import { LOGO_CTY } from "@/constants/ApiUrl";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    MenuItemResponsive,
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
        label: "Bảng tin",
        icon: "fal fa-poll-h",
        to: "/social",
        permission: ["PROFILE"],
      },
      {
        label: "Tường công ty",
        icon: "fal fa-building",
        to: "/social/company/1",
        permission: ["PROFILE"],
      },
      {
        label: "Tường cá nhân",
        icon: "fal fa-user",
        to: `/social/user/${userProfile.value.ID}`,
        permission: ["PROFILE"],
      },
      {
        label: "Nhóm thảo luận",
        icon: "fal fa-users",
        to: "/social/groups",
        permission: ["PROFILE"],
      },
    ]);
    const menuTreeShortcut = reactive([
      {
        label: "Chấm công",
        icon: "icon_chamcong",
        to: `/user/attendance/month=${month}&year=${year}`,
        permission: ["PROFILE"],
      },
      {
        label: "Bảng lương",
        icon: "icon_bangluong",
        to: `/user/salary/${localStorage.getItem(
          "personnelID"
        )}&month=${month}&year=${year}`,
        permission: ["PROFILE"],
      },
      {
        label: "Sinh nhật",
        icon: "icon_sinhnhat",
        to: "/social/birthday",
        permission: ["PROFILE"],
      },
      {
        label: "Điện thoại",
        icon: "icon_mobile",
        to: "/social/mobile",
        permission: ["PROFILE"],
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
      menuTreeShortcut,
      toggleShowMenu,
      toggleSidebarResponsive,
      collapsedResponsive,
      sidebarResponsiveWidth,
      handleToSocial,
    };
  },
  data() {
    return {};
  },
  mounted() {
    this.collapsedResponsive = true;
  },
};
</script>
<style scoped></style>
