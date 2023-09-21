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
          label: "Email",
          icon: "fal fa-envelope",
          to: "/wage-wage",
        },
        {
          label: "SMS",
          icon: "fal fa-sms",
          to: "/wage-template",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
