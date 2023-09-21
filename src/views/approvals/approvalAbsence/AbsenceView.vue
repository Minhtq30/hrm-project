<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-approval></button-create-approval>
            <div class="flex items-center">
              <p class="longText">
                <span
                  class="sub-item-active cursor-pointer"
                  @click="
                    this.$router.push('/approval-approval-private/type=ALL')
                  "
                  style="color: var(--color-primary)"
                  >Danh sách đơn từ</span
                >
                / Đơn vắng mặt
              </p>
              <div class="icon-filter-approval relative group">
                <i class="fal fa-angle-double-down"></i>
                <button-extend-approval></button-extend-approval>
              </div>
            </div>
          </div></div
      ></navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center justify-between w-full">
          <div>
            <navbar-absence></navbar-absence>
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-10 right-0 top-full invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-44 sub-item">Xuất tất cả</li>
                <li class="w-44 sub-item">Chọn trường để export</li>
              </ul>
            </div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listApprovalAbsence?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="absence in listApprovalAbsence"
              :key="absence.ID"
              @contextmenu.prevent="rightClick($event, absence)"
              :class="{
                isCheck: CheckedBox(absence.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkAbsence"
                    :value="absence.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                <avatar-created :Approval="absence"></avatar-created>
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="ShowDetail(absence.ID)"
              >
                {{ absence.personnel_code }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="ShowDetail(absence.ID)"
              >
                {{ absence.personnel_name }}
              </td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(absence.app_approval_status)"
                >
                  {{ formatStatus(absence.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">{{ formatAbsence(absence.details) }}</td>
              <td class="cellTable">
                {{ formatDateAbsence(absence.details) }}
              </td>
              <td class="cellTable">{{ formatHourFrom(absence.details) }}</td>
              <td class="cellTable">{{ formatHourTo(absence.details) }}</td>
              <td class="cellTable">{{ absence.department_title }}</td>
              <td class="cellTable">{{ absence.position_title }}</td>
              <td class="cellTable">{{ formatDate(absence.created_at) }}</td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="p-2 text-left text-sm">
          Không tìm thấy kết quả nào
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalAbsence?.length">
      <div class="flex justify-between items-center">
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
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="updateApprovalAbsence()" v-if="isCreated">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()" v-if="isCreated">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
        <li @click.prevent="ConfirmApproval()" v-if="isApproved">
          <hr />
          <i class="fal fa-check"></i><a href="#">Duyệt đơn</a>
        </li>
        <li @click.prevent="ReturnApproval()" v-if="showRevert">
          <i class="fal fa-undo"></i> <a href="#">Hoàn duyệt</a>
        </li>
        <li @click.prevent="UnconfirmApproval()" v-if="isApproved">
          <i class="fal fa-ban"></i><a href="#">Không duyệt</a>
          <hr />
        </li>
        <li><i class="fal fa-paste"></i><a href="#">Biểu mẫu</a></li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteApprovalAbsence"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay :isLoading="isLoadingShow"></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarApproval from "@/components/sidebar/SidebarApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
import NavbarAbsence from "@/views/approvals/approvalAbsence/NavbarAbsence.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import ButtonExtendApproval from "@/views/approvals/AllButton/ButtonExtendApproval.vue";
import AvatarCreated from "@/components/constant/AvatarCreated.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import {
  CheckUserCreateApproval,
  FormatColorApproval,
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatStatusApproval,
  FormatTitle,
  HideShowFunctionContextmenu,
  ShowRevertApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalAbsence } from "@/store/modules/approval/ApprovalAbsence";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useReasonAbsences } from "@/store/modules/settingApproval/ReasonAbsences";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarAbsence,
    TableResponsive,
    ButtonExtendApproval,
    AvatarCreated,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Mã NV",
        "Họ và tên",
        "Trạng thái",
        "Lý do",
        "Ngày vắng mặt",
        "Từ (h)",
        "Đến (h)",
        "Phòng ban",
        "Vị trí",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
    formatAbsences(id) {
      return FormatTitle(id, this.ReasonAbsencesActive);
    },
    formatAbsence(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return this.formatAbsences(arr[i].reason);
      }
    },
    formatDateAbsence(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return this.formatDate(arr[i].date_start);
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatHourFrom(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return arr[i].time_start;
      }
    },
    formatHourTo(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return arr[i].time_end;
      }
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkAbsence = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const absenceDetail = ref({});
    const isApproved = ref(true);
    const isCreated = ref(false);
    const isOpenConfirm = ref(false);
    const showRevert = ref(true);
    const absences = useApprovalAbsence();
    const profile = useUserProfile();
    const reasonAbsence = useReasonAbsences();
    const { ReasonAbsencesActive } = storeToRefs(reasonAbsence);
    const { userProfile } = storeToRefs(profile);
    const { listApprovalAbsence, listPagination } = storeToRefs(absences);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeReload = () => {
      isLoadingShow.value = false;
    };
    reasonAbsence.GetAllAbsencesAction();
    absences.GetAllApprovalAbsenceAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading: EndTimeLoading,
    });

    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-absence-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        absences.GetAllApprovalAbsenceAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading: EndTimeLoading,
        });
      }
    });
    const rightClick = (e, absence) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        absenceDetail.value = absence;
        isCreated.value = CheckUserCreateApproval(absence, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          absence,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(absence, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAbsence.value.find((item) => item == index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalAbsence.value) {
          checkAbsence.value.push(listApprovalAbsence.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAbsence.value.splice(0, checkAbsence.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      absences.GetNextPageAction({ data: dataUrl, EndTimeLoading });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      absences.GetPrevPageAction({ data: dataUrl, EndTimeLoading });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deleteApprovalAbsence = () => {
      isLoadingShow.value = true;
      absences.deleteApprovalAbsenceAction({
        id: absenceDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading: EndTimeReload,
        handleCloseConfirm,
      });
    };
    const updateApprovalAbsence = () => {
      router.push(`/approval-absence-edit/${absenceDetail.value.ID}`);
    };
    const ShowDetail = (id) => {
      router.push(`/approval-absence-view/detail=${id}`);
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: absenceDetail.value.ID,
        data: data,
      };
      absences.ConfirmApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeReload,
      });
    };
    const UnconfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "NO_APPROVED",
      };
      const dataApproval = {
        id: absenceDetail.value.ID,
        data: data,
      };
      absences.ConfirmApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeReload,
      });
    };
    const ReturnApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "REVERT",
      };
      const dataApproval = {
        id: absenceDetail.value.ID,
        data: data,
      };
      absences.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeReload,
      });
    };
    return {
      listApprovalAbsence,
      listPagination,
      checkAbsence,
      checkedAll,
      ReasonAbsencesActive,
      isActive,
      absenceDetail,
      isLoading,
      isLoadingShow,
      isApproved,
      isOpenConfirm,
      isCreated,
      showRevert,
      CheckedBox,
      checkedAllItem,
      NextPage,
      PrevPage,
      rightClick,
      deleteApprovalAbsence,
      updateApprovalAbsence,
      ShowDetail,
      EndTimeLoading,
      EndTimeReload,
      handleCloseConfirm,
      handleOpenConfirm,
      userProfile,
      ConfirmApproval,
      UnconfirmApproval,
      ReturnApproval,
    };
  },
};
</script>

<style></style>
