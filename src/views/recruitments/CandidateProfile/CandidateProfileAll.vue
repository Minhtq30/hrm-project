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
            <p class="longText">Hồ sơ ứng viên</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full flex justify-between items-center w-full">
          <navbar-candidate-profile></navbar-candidate-profile>
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
        <div v-if="listRecruitmentCandidate?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="candidate in listRecruitmentCandidate"
              :key="candidate.ID"
              @contextmenu.prevent="rightClick($event, candidate)"
              :class="{
                isCheck: CheckedBox(candidate.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkCandidates"
                    :value="candidate.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable"></td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetailCandidate(candidate.ID)"
              >
                {{ candidate.name }}
              </td>
              <td class="cellTable">
                <div class="beacon" :class="formatColor(candidate.status)">
                  {{ formatStatus(candidate.status) }}
                </div>
              </td>
              <td class="cellTable text-center"></td>
              <td class="cellTable text-center">
                {{ formatEmail(candidate.email) }}
              </td>
              <td class="cellTable text-center">
                {{ formatPhone(candidate.phone) }}
              </td>
              <td class="cellTable text-center">
                {{ formatDate(candidate.birthday) }}
              </td>
              <td class="cellTable">
                {{ candidate.campaign_current_id }}
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listRecruitmentCandidate?.length"
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
      <li @click.prevent="EditCandidate()">
        <i class="fal fa-edit"></i><a href="#">Sửa</a>
      </li>
      <li @click.prevent="handleOpenConfirm()">
        <i class="fal fa-trash-alt"></i><a href="#">Xóa</a>
      </li>
    </ul>
  </context-menu>
  <teleport to="#app">
    <!-- Start Xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteRecruitmentCandidate"
    >
    </modal-delete>
    <!-- End Xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import NavbarCandidateProfile from "./NavbarCandidateProfile.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
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
    ButttonCreateRecruitment,
    NavbarCandidateProfile,
    TableResponsive,
  },
  data() {
    return {
      header: [
        "Ảnh",
        "Họ và tên",
        "Trạng thái",
        "Đánh giá",
        "Email",
        "Điện thoại",
        "Ngày sinh",
        "Chiến dịch",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatPhone(arr) {
      for (let i = 0; i < arr?.length; i++) {
        return arr[i] + ", ";
      }
    },
    formatEmail(arr) {
      for (let i = 0; i < arr?.length; i++) {
        return arr[i] + ", ";
      }
    },
    formatStatus(index) {
      if (index == 1) {
        return "Không tham gia";
      } else if (index == 2) {
        return "Từ chối nhận";
      } else if (index == 3) {
        return "Đạt";
      }
    },
    formatColor(index) {
      if (index == 1) {
        return "beacon-liquidation";
      } else if (index == 2) {
        return "beacon-wait";
      } else if (index == 3) {
        return "beacon-success";
      } else {
        return "";
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkedAll = ref(false);
    const checkCandidates = ref([]);
    const isLoading = ref(true);
    const isActive = ref(false);
    const candidateDetail = ref();
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("recruitmentCandidate/getAllRecruitmentCandidateAction", {
      EndTimeLoading,
    });
    const listRecruitmentCandidate = computed(
      () => store.state.recruitmentCandidate.listRecruitmentCandidate
    );
    const listPagination = computed(
      () => store.state.recruitmentCandidate.listPagination
    );
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listRecruitmentCandidate.value) {
          checkCandidates.value.push(listRecruitmentCandidate.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkCandidates.value.splice(0, checkCandidates.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkCandidates.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, candidate) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        candidateDetail.value = candidate;
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("recruitmentCandidate/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("recruitmentCandidate/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const showDetailCandidate = (id) => {
      router.push(`/candidate-profile/detail/${id}`);
    };
    const EditCandidate = () => {
      router.push(`/recruitment-candidate/edit/${candidateDetail.value.ID}`);
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const DeleteRecruitmentCandidate = () => {
      store.dispatch("recruitmentCandidate/DeleteRecruitmentCandidateAction", {
        id: candidateDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    return {
      isLoading,
      checkedAll,
      checkCandidates,
      listRecruitmentCandidate,
      listPagination,
      isOpenConfirm,
      isActive,
      checkedAllItem,
      CheckedBox,
      showDetailCandidate,
      EndTimeLoading,
      NextPage,
      PrevPage,
      rightClick,
      EditCandidate,
      handleOpenConfirm,
      handleCloseConfirm,
      DeleteRecruitmentCandidate,
    };
  },
};
</script>

<style></style>
