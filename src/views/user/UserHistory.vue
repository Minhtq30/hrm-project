<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="longText uppercase">Lịch sử truy cập</p>
          </div>
        </div></navbar-social
      >
    </template>
  </person-layout>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarUser from "@/components/sidebar/SidebarUser.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
export default {
  components: {
    PersonLayout,
    SidebarUser,
    NavbarSocial,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
