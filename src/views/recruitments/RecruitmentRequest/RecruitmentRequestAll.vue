<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-recruitment></sidebar-recruitment>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <buttton-create-recruitment></buttton-create-recruitment>
            <p class="longText">Đề xuất tuyển dụng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full flex justify-between items-center w-full">
          <navbar-recruitment-request></navbar-recruitment-request>
          <div class="flex">
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-file-import"></i>
              </div>
              <div class="action-label">Import</div>
            </div>
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-cog"></i>
              </div>
              <div class="action-label">Cài đặt</div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="request in listRecruitmentRequest"
            :key="request.ID"
            @contextmenu.prevent="rightClick($event, request)"
            :class="{
              isCheck: CheckedBox(request.ID),
            }"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkRequests"
                  :value="request.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable"></td>
            <td
              class="cellTable cursor-pointer"
              @click="showDetailRequest(request.ID)"
            >
              {{ request.title }}
            </td>
            <td class="cellTable">{{ request.position?.title }}</td>
            <td class="cellTable text-center">{{ request.recruits }}</td>
            <td class="cellTable text-center">{{ request.totalCV }}</td>
            <td class="cellTable text-center">{{ request.elect }}</td>
            <td class="cellTable text-center">{{ request.remaining }}</td>
            <td class="cellTable">{{ formatDate(request.deadline) }}</td>
            <td class="cellTable"></td>
          </tr>
        </table-responsive>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="flex justify-between items-center">
        <div class="p-4 text-sm">
          Hiển thị {{ listPagination.from }} - {{ listPagination.to }} trong số
          {{ listPagination.total }} bản ghi
        </div>
        <div class="flex justify-end p-4">
          <pagination-view
            :listPagination="listPagination"
            :NextPage="NextPage"
            :PrevPage="PrevPage"
          ></pagination-view>
        </div></div
    ></template>
  </person-layout>
  <context-menu :isActive="isActive">
    <ul>
      <li @click.prevent="handleOpenExtend()">
        <i class="fal fa-stopwatch"></i><a href="#">Gia hạn</a>
      </li>
      <li @click.prevent="handleEditRecruitmentRequest()">
        <i class="fal fa-edit"></i><a href="#">Sửa</a>
      </li>
      <li @click.prevent="handleOpenConfirm()">
        <i class="fal fa-trash-alt"></i><a href="#">Xóa</a>
      </li>
    </ul>
  </context-menu>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="handleDeleteRecruitmentRequest"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
    <!-- Start gia hạn -->
    <modal-view :isOpen="isOpenExtend" :handleCloseDetail="handleCloseExtend">
      <extend-date-request
        :RequestDetail="requestDetail"
        :CloseExtend="handleCloseExtend"
      ></extend-date-request>
    </modal-view>
    <!-- End gia hạn -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingShow"
    :handleEndLoading="EndTimeLoadingShow"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import NavbarRecruitmentRequest from "./NavbarRecruitmentRequest.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import SearchView from "@/components/search/SearchView.vue";
import ExtendDateRequest from "./ExtendDateRequest.vue";
import { ref } from "@vue/reactivity";
import { FormatDate, FormatModalX, FormatModalY } from "@/constants/FormatAll";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    NavFeature,
    TableResponsive,
    ButttonCreateRecruitment,
    NavbarRecruitmentRequest,
    SearchView,
    ExtendDateRequest,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Tên đề xuất",
        "Vị trí",
        "Số lượng",
        "Ứng tuyển",
        "Trúng tuyển",
        "Còn tuyển",
        "Hạn tuyển",
        "Trạng thái",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkedAll = ref(false);
    const checkRequests = ref([]);
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isActive = ref(false);
    const requestDetail = ref();
    const isOpenConfirm = ref(false);
    const isOpenExtend = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    store.dispatch("recruitmentRequest/getAllRecruitmentRequestAction", {
      EndTimeLoading: EndTimeLoading,
    });
    const listRecruitmentRequest = computed(
      () => store.state.recruitmentRequest.listRecruitmentRequest
    );
    const listPagination = computed(
      () => store.state.recruitmentRequest.listPagination
    );
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listRecruitmentRequest.value) {
          checkRequests.value.push(listRecruitmentRequest.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkRequests.value.splice(0, checkRequests.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkRequests.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("contracts/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("contracts/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, request) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        requestDetail.value = request;
      }
    };
    const handleEditRecruitmentRequest = () => {
      router.push(`/recruitment-request/edit/${requestDetail.value.ID}`);
    };
    const showDetailRequest = (id) => {
      router.push(`/recruitment-request/detail/${id}`);
    };
    const handleSearch = (search) => {
      isLoading.value = true;
      store.dispatch(
        "recruitmentRequest/SearchRecruitmentRequestAction",
        search
      );
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleOpenExtend = () => {
      isOpenExtend.value = true;
    };
    const handleCloseExtend = () => {
      isOpenExtend.value = false;
    };
    const handleDeleteRecruitmentRequest = () => {
      store.dispatch("recruitmentRequest/DeleteRecruitmentRequestAction", {
        id: requestDetail.value.ID,
        route,
        router,
        toast,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    return {
      isLoading,
      isLoadingShow,
      listRecruitmentRequest,
      checkedAll,
      checkRequests,
      listPagination,
      isActive,
      requestDetail,
      isOpenConfirm,
      isOpenExtend,
      EndTimeLoadingShow,
      checkedAllItem,
      CheckedBox,
      showDetailRequest,
      NextPage,
      PrevPage,
      rightClick,
      handleSearch,
      handleDeleteRecruitmentRequest,
      handleEditRecruitmentRequest,
      EndTimeLoading,
      handleOpenConfirm,
      handleCloseConfirm,
      handleOpenExtend,
      handleCloseExtend,
    };
  },
};
</script>

<style></style>
