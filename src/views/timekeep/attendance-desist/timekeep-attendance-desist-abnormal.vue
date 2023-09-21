<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="longText">Danh sách ngày nghỉ bất thường</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature
        ><div class="flex items-center">
          <div></div>
          <div>
            <navbar-desist></navbar-desist>
          </div>
        </div>
        <div class="flex"></div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <!-- <table-responsive :header="headerPerson"> </table-responsive> -->
        <div class="text-left p-2">Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="EditAssign()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="DeleteAssign()">
          <i class="fal fa-trash-alt"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import navbarDesist from "@/views/timekeep/attendance-desist/navbar-attendance-desist.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
// import TableResponsive from "@/components/table/TableResponsive.vue";
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    navbarDesist,
    NavFeature,
    // TableResponsive,
  },
  data() {
    return {
      headerPerson: [
        "Tiêu đề",
        "Từ ngày",
        "Đến ngày",
        "Trạng thái",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatTypeShift(index) {
      if (index == "PERSON") {
        return "Phân ca cho cá nhân";
      } else {
        return "Phân ca cho phòng ban, vị trí";
      }
    },
    formatStatus(status) {
      if (status == 0) {
        return "Chờ duyệt";
      } else if (status == 1) {
        return "Đã duyệt";
      }
    },
    formatColor(status) {
      if (status == 0) {
        return "beacon-wait";
      } else if (status == 1) {
        return "beacon-success";
      }
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);
    const isActive = ref(false);
    const checkAssign = ref([]);
    const checkedAll = ref(false);
    const assignDetailID = ref();
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const listShiftAssign = computed(
      () => store.state.shiftAssign.listShiftAssign
    );
    const CheckedBox = (index) => {
      if (index == checkAssign.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listShiftAssign.value) {
          checkAssign.value.push(listShiftAssign.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAssign.value.splice(0, checkAssign.value.length);
      }
    };
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, assign) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        assignDetailID.value = assign.ID;
      }
    };
    const EditAssign = () => {
      isLoading.value = true;
      setTimeout(() => {
        router.push(`/timekeep-attendance-assign-edit/${assignDetailID.value}`);
        isLoading.value = false;
      }, 1500);
    };
    const DeleteAssign = () => {};
    return {
      listShiftAssign,
      assignDetailID,
      checkAssign,
      isActive,
      isLoading,
      checkedAll,
      CheckedBox,
      checkRoute,
      rightClick,
      EditAssign,
      checkedAllItem,
      DeleteAssign,
    };
  },
};
</script>

<style></style>
