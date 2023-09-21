<template>
  <div
    class="sidebarChange sidebar"
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
          label: "Hồ sơ nhân sự",
          to: "/personnel-profile-settings-general",
          smallLabel: "HS nhân sự",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Hợp đồng lao động",
          to: "/personnel-profile-settings-contract-type",
          smallLabel: "HĐ lao động",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt bảo hiểm",
          to: "/personnel-insurance-settings-general",
          smallLabel: "CĐ bảo hiểm",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt hình thức làm việc",
          to: "/personnel-profile-settings-work-type",
          smallLabel: "CĐHT làm việc",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt vị trí công việc",
          to: "/personnel-profile-settings-position",
          smallLabel: "CĐ vị trí",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt chức vụ",
          to: "/personnel-profile-settings-positiontitle",
          smallLabel: "CĐ chức vụ",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt nơi làm việc",
          to: "/personnel-profile-settings-workplace",
          smallLabel: "CĐ nơi làm việc",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt quy định phạt 5s",
          to: "/page-404",
          smallLabel: "CĐ phạt",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt loại phụ cấp",
          to: "/personnel-contract-settings-allowance",
          smallLabel: "CĐ phục cấp",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt ngạch bậc",
          to: "/personnel-profile-settings-salary-range",
          smallLabel: "CĐ ngạch bậc",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Cài đặt đánh giá nhân sự",
          to: "/page-404",
          smallLabel: "CĐ đánh giá",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
        {
          label: "Danh mục",
          to: "/personnel-profile-settings-category-bonus",
          smallLabel: "Danh mục",
          permission: [
            "PERSONNEL_PROFILE_MANAGE_ALL",
            "PERSONNEL_PROFILE_MANAGE_COMPANY",
            "PERSONNEL_PROFILE_MANAGE_DEPARTMENT",
          ],
        },
      ],
    };
  },
};
</script>
<style scoped></style>
