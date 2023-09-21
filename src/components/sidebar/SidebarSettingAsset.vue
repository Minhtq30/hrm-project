<template>
  <div
    class="sidebarChange overflow-y-auto format-scroll"
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
          label: "Cài đặt",
          icon: "fal fa-cog",
          to: "/asset-settings-category-currency",
          smallLabel: "Cài đặt",
          permission: [
            "ASSET_ASSET_MANAGE_ALL",
            "ASSET_ASSET_MANAGE_COMPANY",
            "ASSET_ASSET_MANAGE_BRANCH",
            "ASSET_ASSET_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Danh mục",
          icon: "fal fa-tasks",
          to: "",
          smallLabel: "Danh mục",
          permission: [
            "ASSET_ASSET_MANAGE_ALL",
            "ASSET_ASSET_MANAGE_COMPANY",
            "ASSET_ASSET_MANAGE_BRANCH",
            "ASSET_ASSET_MANAGE_DEPARTMENT",
          ],
          children: [
            {
              icon: "",
              label: "Đơn vị",
              to: "/asset-settings-category-unit",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Tiền tệ",
              to: "/asset-settings-category-currency",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Kho",
              to: "/asset-settings-category-inventory",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Nhóm kho",
              to: "/asset-settings-category-inventory-group",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Thuế",
              to: "/asset-settings-category-tax",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Loại tài sản",
              to: "/asset-settings-category-asset-type",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Nhóm tài sản",
              to: "/asset-settings-category-asset-group",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Trạng thái",
              to: "/asset-settings-category-asset-status",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
            {
              icon: "",
              label: "Nguồn gốc",
              to: "/asset-settings-category-asset-origin",
              permission: [
                "ASSET_ASSET_MANAGE_ALL",
                "ASSET_ASSET_MANAGE_COMPANY",
                "ASSET_ASSET_MANAGE_BRANCH",
                "ASSET_ASSET_MANAGE_DEPARTMENT",
              ],
            },
          ],
        },
        {
          label: "Báo cáo",
          icon: "fal fa-chart-pie-alt",
          to: "/asset-settings-category",
          smallLabel: "Báo cáo",
          permission: [
            "ASSET_ASSET_MANAGE_ALL",
            "ASSET_ASSET_MANAGE_COMPANY",
            "ASSET_ASSET_MANAGE_BRANCH",
            "ASSET_ASSET_MANAGE_DEPARTMENT",
          ],
        },
      ],
    };
  },
};
</script>
<style scoped></style>
