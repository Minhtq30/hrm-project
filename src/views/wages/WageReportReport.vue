<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-wage></sidebar-wage>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-wage></button-create-wage>
            <p class="text-base">Danh sách báo cáo</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div></div>
        <div class="flex">
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-10 right-0 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-52 sub-item">Xuất tất cả</li>
                <li class="w-52 sub-item">Chọn trường để export</li>
              </ul>
            </div>
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-import"></i>
            </div>
            <div class="action-label">Import</div>
            <div
              class="absolute z-10 right-0 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-52 sub-item">Import bảng lương</li>
              </ul>
            </div>
          </div>
          <div class="btn-icon">
            <div class="cx">
              <i class="fal fa-cog"></i>
            </div>
            <div class="action-label">Cài đặt</div>
          </div>
        </div></nav-feature
      ></template
    >
    <div class="home w-full"></div>
  </person-layout>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarWage from "@/components/sidebar/SidebarWage.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateWage from "@/views/wages/ButtonCreateWage.vue";
export default {
  components: {
    PersonLayout,
    SidebarWage,
    NavbarSocial,
    ButtonCreateWage,
    NavFeature,
  },
  methods: {},
};
</script>

<style></style>
