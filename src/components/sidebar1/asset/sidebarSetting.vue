<template>
  <div
    class="sidebarChange overflow-y-auto format-scroll"
    :style="{ width: sidebarWidth }"
    style="background-color: var(--color-primary)"
  >
    <div class="flex-column w-full">
      <div
        class="flex justify-between px-4 mt-4"
        :class="{ isToogle: collapsed }"
      >
        <button @click="toggleSidebar" class="text-white flex items-center">
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
        <div class="menu flex-col overflow-hidden py-4">
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
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { toggleSidebar } from "@/components/sidebar/state";
import { collapsed } from "@/components/sidebar/state";
import { sidebarWidth } from "@/components/sidebar/state";
import MenuItem from "@/components/sidebar/MenuItem.vue";
import { LOGO_CTY } from "@/constants/ApiUrl";
export default {
  components: {
    MenuItem,
  },
  setup() {
    const showMenu = ref(false);
    const logo = ref(LOGO_CTY);
    const toggleShowMenu = () => (showMenu.value = !showMenu.value);
    return {
      showMenu,
      logo,
      toggleShowMenu,
      toggleSidebar,
      collapsed,
      sidebarWidth,
    };
  },
  data() {
    return {
      menuTree: [
        {
          label: "Cài đặt",
          icon: "fal fa-cog",
          to: "/asset-settings-category-currency",
          permission: ["ASSET_ASSET"],
        },
        {
          label: "Danh mục",
          icon: "fal fa-tasks",
          to: "",
          permission: ["ASSET_ASSET"],
          children: [
            {
              icon: "",
              label: "Đơn vị",
              to: "/asset-settings-category-unit",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Tiền tệ",
              to: "/asset-settings-category-currency",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Kho",
              to: "/asset-settings-category-inventory",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Nhóm kho",
              to: "/asset-settings-category-inventory-group",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Thuế",
              permission: ["ASSET_ASSET"],
              to: "/asset-settings-category-tax",
            },
            {
              icon: "",
              label: "Loại tài sản",
              to: "/asset-settings-category-asset-type",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Nhóm tài sản",
              to: "/asset-settings-category-asset-group",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Trạng thái",
              to: "/asset-settings-category-asset-status",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Nguồn gốc",
              to: "/asset-settings-category-asset-origin",
              permission: ["ASSET_ASSET"],
            },
          ],
        },
        {
          label: "Báo cáo",
          icon: "fal fa-chart-pie-alt",
          to: "/asset-settings-category-currency",
          permission: ["ASSET_ASSET"],
        },
      ],
    };
  },
};
</script>
<style scoped></style>
