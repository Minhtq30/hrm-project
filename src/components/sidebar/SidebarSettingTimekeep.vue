<template>
  <div
    class="sidebarChange"
    :style="{ width: sidebarWidth }"
    style="background-color: var(--color-primary)"
  >
    <div
      class="flex-column w-full sidebar"
      style="background-color: var(--color-primary)"
    >
      <div
        class="flex justify-between px-4 mt-4"
        :class="{ isToogle: collapsed }"
      >
        <button
          @click="toggleSidebar"
          class="text-white flex items-center px-2"
          :class="{ isToogle: collapsed }"
        >
          <i class="fal fa-align-left text-2xl" v-if="collapsed === false"></i>
          <i class="fal fa-bars text-2xl" v-else></i>
        </button>
        <a
          href=""
          class="flex items-center"
          @click.prevent="handleToSocial"
          v-if="collapsed == false"
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
          label: "Cài đặt chấm công",
          to: "/timekeep-setting-attendance",
          smallLabel: "Chấm công",
          permission: [
            "TIMEKEEP_TIMEKEEP_MANAGE_ALL",
            "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY",
            "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH",
            'TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT"',
          ],
        },
        {
          label: "Địa điểm chấm công GPS",
          to: "/timekeep-setting-gpslocation",
          smallLabel: "GPS",
          permission: [
            "TIMEKEEP_TIMEKEEP_MANAGE_ALL",
            "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY",
            "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH",
            'TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT"',
          ],
        },
        {
          label: "Công thức chấm công",
          to: "/timekeeping-formula",
          smallLabel: "Công thức",
          permission: [
            "TIMEKEEP_TIMEKEEP_MANAGE_ALL",
            "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY",
            "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH",
            'TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT"',
          ],
        },
        {
          label: "Cài đặt ca làm việc",
          to: "/timekeep-setting-shift",
          smallLabel: "Ca làm việc",
          permission: [
            "TIMEKEEP_TIMEKEEP_MANAGE_ALL",
            "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY",
            "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH",
            'TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT"',
          ],
        },
        {
          label: "Cài đặt nghỉ phép",
          to: "/timekeep-setting-furlough",
          smallLabel: "Nghỉ phép",
          permission: [
            "TIMEKEEP_TIMEKEEP_MANAGE_ALL",
            "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY",
            "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH",
            'TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT"',
          ],
        },
        {
          label: "Cài đặt nghỉ bù",
          to: "/timekeep-setting-compensatory",
          smallLabel: "Nghỉ bù",
          permission: [
            "TIMEKEEP_TIMEKEEP_MANAGE_ALL",
            "TIMEKEEP_TIMEKEEP_MANAGE_COMPANY",
            "TIMEKEEP_TIMEKEEP_MANAGE_BRANCH",
            'TIMEKEEP_TIMEKEEP_MANAGE_DEPARTMENT"',
          ],
        },
      ],
    };
  },
};
</script>
<style scoped></style>
