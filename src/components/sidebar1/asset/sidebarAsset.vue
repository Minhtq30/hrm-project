<template>
  <div
    class="sidebarChange format-scroll"
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
          class="text-white font-extrabold flex items-center"
          :class="{ isToogle: collapsed }"
        >
          <i class="fal fa-bars text-2xl"></i>
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
      <div class="">
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
          label: "Danh sách tài sản",
          icon: "fal fa-clipboard-list-check",
          to: "/asset",
          permission: ["ASSET_ASSET"],
          smallLabel: "DS tài sản",
        },
        {
          label: "Phiếu tài sản",
          icon: "fal fa-file-signature",
          to: "",
          permission: ["ASSET_ASSET"],
          smallLabel: "Phiếu tài sản",
          children: [
            {
              icon: "",
              label: "Tất cả",
              to: "/asset-ticket",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Cấp phát",
              to: "/asset-ticket-assign",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Thu hồi",
              to: "/asset-ticket-recall",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Điều chuyển",
              to: "/asset-ticket-transfer",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Báo hỏng",
              to: "/asset-ticket-broken",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Báo mất",
              to: "/asset-ticket-lost",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Hủy tài sản",
              to: "/asset-ticket-destroy",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Thanh lý",
              to: "/asset-ticket-liquidated",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Sửa chữa/nâng cấp",
              to: "/asset-ticket-repair",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Hoàn thành sửa chữa",
              to: "/asset-ticket-reused",
              permission: ["ASSET_ASSET"],
            },
          ],
        },
        {
          label: "Khấu hao",
          icon: "fal fa-hourglass-half",
          to: "/asset-reduction",
          permission: ["ASSET_ASSET"],
          smallLabel: "Khấu hao",
        },
        {
          label: "Danh mục",
          icon: "fal fa-folder-open",
          to: "",
          permission: ["ASSET_ASSET"],
          smallLabel: "Danh mục",
          children: [
            {
              icon: "",
              label: "Nhà cung cấp",
              to: "/asset-suppliers",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Nhóm tài sản",
              to: "/asset-groups",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Nguồn gốc",
              to: "/asset-origins",
              permission: ["ASSET_ASSET"],
            },
            {
              icon: "",
              label: "Vị trí",
              to: "/asset-inventories",
              permission: ["ASSET_ASSET"],
            },
          ],
        },
      ],
    };
  },
};
</script>
<style></style>
