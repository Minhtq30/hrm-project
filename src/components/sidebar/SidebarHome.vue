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
            :smallLabel="item.smallLabel"
            :permission="item.permission"
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
    const toggleShowMenu = () => (showMenu.value = !showMenu.value);
    const handleToSocial = () => {
      router.push({ path: "/social", name: "Social" });
    };
    return {
      showMenu,
      logo,
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
          label: "Tài khoản người dùng",
          to: "/page-user/type=ACTIVE",
          icon: "fal fa-user-cog",
          smallLabel: "Tài khoản",
          permission: ["PERSONNEL_PROFILE_MANAGE_DEPARTMENT"],
        },
        {
          label: "Phòng ban, chi nhánh",
          to: "/page-department/type=ACTIVE",
          icon: "fal fa-project-diagram",
          smallLabel: "Phòng ban",
          permission: ["PERSONNEL_PROFILE_MANAGE_DEPARTMENT"],
        },
        {
          label: "Nhóm người dùng",
          to: "/admin-group",
          icon: "fal fa-users",
          smallLabel: "Nhóm người",
          permission: ["PERSONNEL_PROFILE_MANAGE_DEPARTMENT"],
        },
        // {
        //   label: "Thanh toán, đối soát",
        //   to: "/page-404",
        //   icon: "fal fa-file-invoice-dollar",
        //   smallLabel: "Quyết toán",
        //   permission: ["PERSONNEL_PROFILE_MANAGE_DEPARTMENT"],
        // },
        // {
        //   label: "Quản lý tiền tệ",
        //   to: "/page-404",
        //   icon: "fal fa-comment-dollar",
        //   smallLabel: "Tiền tệ",
        //   permission: ["PERSONNEL_PROFILE_MANAGE_DEPARTMENT"],
        // },
        // {
        //   label: "Lịch sử hành động",
        //   to: "/page-404",
        //   icon: "fal fa-history",
        //   smallLabel: "Lịch sử",
        //   permission: ["PERSONNEL_PROFILE_MANAGE_DEPARTMENT"],
        // },
        // {
        //   label: "Cấu hình SSO",
        //   to: "/page-404",
        //   icon: "fab fa-squarespace",
        //   smallLabel: "SSO",
        //   permission: ["PERSONNEL_PROFILE_MANAGE_DEPARTMENT"],
        // },
      ],
    };
  },
};
</script>
<style scoped></style>
