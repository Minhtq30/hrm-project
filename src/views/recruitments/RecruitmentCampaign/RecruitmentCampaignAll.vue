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
            <p class="longText">Chiến dịch tuyển dụng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full flex justify-between items-center w-full">
          <navbarr-rcruitment-campaign></navbarr-rcruitment-campaign>
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
      <div v-if="isLoading == false">
        <div class="w-full" v-if="listRecruitmentCampaign?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="campaign in listRecruitmentCampaign"
              :key="campaign.ID"
              @contextmenu.prevent="rightClick($event, campaign)"
              :class="{
                isCheck: CheckedBox(campaign.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkRecruitments"
                    :value="campaign.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">{{ campaign.created_by_id }}</td>
              <td
                class="cellTable cursor-pointer"
                @click="handleToShowDetail(campaign.ID)"
              >
                TD.{{ campaign.ID }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="handleToShowDetail(campaign.ID)"
              >
                {{ campaign.title }}
              </td>
              <td class="cellTable"></td>
              <td class="cellTable">
                {{ formatPosition(campaign.position_id) }}
              </td>
              <td class="cellTable">{{ formatDate(campaign.date_start) }}</td>
              <td class="cellTable">{{ formatDate(campaign.date_end) }}</td>
              <td class="cellTable text-center">
                {{ campaign.amount_candidate }}
              </td>
              <td class="cellTable text-center"></td>
              <td class="cellTable text-center"></td>
              <td class="cellTable text-center"></td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listRecruitmentCampaign?.length"
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
        <i class="fal fa-history"></i><a href="#">Gia hạn</a>
      </li>
      <li @click.prevent="handleOpenExtend()" class="relative sub-dropdown">
        <i class="fal fa-comment-lines"></i><a href="#">Trạng thái</a>
        <ul
          class="absolute z-[999] opacity-0 invisible top-0 right-0 bg-white w-1/2 sub-dropdown-content p-2 drop-shadow-xl"
        >
          <li class="sub-item">Đang thực hiện</li>
          <li class="sub-item">Hoàn thành</li>
          <li class="sub-item">Hủy</li>
          <li class="sub-item">Tạm dừng</li>
        </ul>
      </li>
      <li @click.prevent="handleOpenInterview()" title="Tạo lịch phỏng vấn">
        <i class="fal fa-calendar-day"></i><a href="#">Phỏng vấn</a>
      </li>
      <li @click.prevent="EditRecruitmentCampaign()">
        <i class="fal fa-edit"></i><a href="#">Sửa</a>
      </li>
      <li @click.prevent="handleOpenConfirm()">
        <i class="fal fa-trash-alt"></i><a href="#">Xóa</a>
      </li>
    </ul>
  </context-menu>
  <teleport to="#app">
    <!-- Start Gia hạn tuyển -->
    <modal-view :isOpen="isOpenExtend" :handleCloseDetail="handleCloseExtend">
      <extend-date
        :CampaignDetail="campaignDetail"
        :CloseExtend="handleCloseExtend"
      ></extend-date>
    </modal-view>
    <!-- End Gia hạn tuyển -->
    <!-- Start phỏng vấn -->
    <modal-view
      :isOpen="isOpenInterview"
      :handleCloseDetail="handleCloseInterview"
    >
      <interview-date-vue
        :InterviewDetail="campaignDetail"
        :closeInterview="handleCloseInterview"
      ></interview-date-vue>
    </modal-view>
    <!-- End phỏng vấn -->
    <!-- Start Xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteRecruitmentCampaign"
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
import NavbarrRcruitmentCampaign from "./NavbarrRcruitmentCampaign.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import SearchView from "@/components/search/SearchView.vue";
import ExtendDate from "./ExtendDate.vue";
import InterviewDateVue from "./InterviewDate.vue";
import { ref } from "@vue/reactivity";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatTitle,
} from "@/constants/FormatAll";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    NavFeature,
    ButttonCreateRecruitment,
    NavbarrRcruitmentCampaign,
    TableResponsive,
    SearchView,
    ExtendDate,
    InterviewDateVue,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Mã chiến dịch",
        "Tên chiến dịch",
        "Trạng thái",
        "Vị trí",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Số lượng tuyển",
        "Tổng số CV",
        "Trúng tuyển",
        "Còn lại",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatPosition(id) {
      return FormatTitle(id, this.listPositions);
    },
    formatStatus(index) {
      if (index == 1) {
        return "Lên kế hoạch";
      } else if (index == 2) {
        return "Tạm dừng";
      } else if (index == 3) {
        return "Quá hạn";
      }
    },
    formatColor(index) {
      if (index == 1) {
        return "beacon-warning";
      } else if (index == 2) {
        return "beacon-pause";
      } else if (index == 3) {
        return "beacon-wait";
      } else {
        return "";
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const route = useToast();
    const checkedAll = ref(false);
    const checkRecruitments = ref([]);
    const isLoading = ref(true);
    const isActive = ref(false);
    const campaignDetail = ref();
    const isOpenExtend = ref(false);
    const isOpenInterview = ref(false);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("recruitmentCampaign/getAllRecruitmentCampaignAction", {
      EndTimeLoading,
    });
    const listRecruitmentCampaign = computed(
      () => store.state.recruitmentCampaign.listRecruitmentCampaign
    );
    const listPagination = computed(
      () => store.state.recruitmentCampaign.listPagination
    );
    const listPositions = computed(() => store.state.positions.listPositions);
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listRecruitmentCampaign.value) {
          checkRecruitments.value.push(listRecruitmentCampaign.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkRecruitments.value.splice(0, checkRecruitments.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkRecruitments.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, campaign) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        campaignDetail.value = campaign;
      }
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("recruitmentCampaign/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("recruitmentCampaign/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const handleToShowDetail = (id) => {
      router.push(`/recruitment-campaign/detail/${id}`);
    };
    const EditRecruitmentCampaign = () => {
      router.push(`/recruitment-campaign/edit/${campaignDetail.value.ID}`);
    };
    const handleSearch = (index) => {
      isLoading.value = true;
      store.dispatch("recruitmentCampaign/SearchRecruitmentCampaignAction", {
        search: index,
        EndTimeLoading,
      });
    };
    const handleOpenExtend = () => {
      isOpenExtend.value = true;
    };
    const handleCloseExtend = () => {
      isOpenExtend.value = false;
    };
    const handleOpenInterview = () => {
      isOpenInterview.value = true;
    };
    const handleCloseInterview = () => {
      isOpenInterview.value = false;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const DeleteRecruitmentCampaign = () => {
      store.dispatch("recruitmentCampaign/DeleteRecruitmentCampaignAction", {
        data: campaignDetail.value.ID,
        route,
        router,
        toast,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    return {
      isLoading,
      listRecruitmentCampaign,
      listPagination,
      checkedAll,
      checkRecruitments,
      isActive,
      campaignDetail,
      isOpenExtend,
      isOpenInterview,
      isOpenConfirm,
      listPositions,
      checkedAllItem,
      CheckedBox,
      handleToShowDetail,
      rightClick,
      EndTimeLoading,
      NextPage,
      PrevPage,
      EditRecruitmentCampaign,
      DeleteRecruitmentCampaign,
      handleSearch,
      handleOpenExtend,
      handleCloseExtend,
      handleOpenInterview,
      handleCloseInterview,
      handleOpenConfirm,
      handleCloseConfirm,
    };
  },
};
</script>

<style></style>
