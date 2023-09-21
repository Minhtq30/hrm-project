<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-person></sidebar-person>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex items-center">
            <div
              class="button-create"
              @click="handleOpenDetail"
              title="Tạo mới nơi làm việc"
            ></div>
            <p class="longText">Import danh sách nơi làm việc</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><nav-feature> <div class="flex h-full"></div> </nav-feature
    ></template>
    <Transition name="slide-fade">
      <div v-if="isLoading == false" class="px-4 py-2 text-left">
        <import-data-vue :Rows="rows"></import-data-vue>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="importWorkPlace()">
            Cập nhật
          </button>
          <button class="button-close-modal">Hủy bỏ</button>
        </div>
      </div></template
    >
  </person-layout>
  <!-- End right click -->
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import "@/assets/checkBox.css";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPerson from "@/components/sidebar/SidebarPerson.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ImportDataVue from "@/components/constant/ImportData.vue";
import { ref } from "@vue/reactivity";
export default {
  data() {
    return {
      header: [
        "Nơi làm việc",
        "Phòng ban",
        "Trạng thái",
        "Ngày tạo",
        "Người tạo",
        "Ngày sửa",
        "Người sửa",
      ],
    };
  },
  components: {
    NavFeature,
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    ImportDataVue,
  },
  setup() {
    const isLoading = ref(true);
    const rows = ref([]);
    const fileSelected = ref();
    setTimeout(() => {
      isLoading.value = false;
    }, 600);
    const importWorkPlace = () => {
      console.log(rows.value);
    };
    return { isLoading, rows, fileSelected, importWorkPlace };
  },
};
</script>
