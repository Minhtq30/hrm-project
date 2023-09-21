<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-recruitment></sidebar-recruitment>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <buttton-create-recruitment></buttton-create-recruitment>
            <p class="text-base">Danh sách mẫu đánh giá ứng viên</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full flex justify-between items-center w-full">
          <div></div>
          <div class="flex">
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition duration="550" name="nested">
      <div class="w-full" v-if="isLoading == false"></div>
    </Transition>
  </person-layout>
  <loading-page
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="true"
  >
  </loading-page>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import { ref } from "@vue/reactivity";

export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    NavFeature,
    ButttonCreateRecruitment,
  },
  data() {
    return {};
  },
  methods: {},
  setup() {
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    return {
      isLoading,
    };
  },
};
</script>

<style></style>
