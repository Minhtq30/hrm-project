<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social
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
                / Đơn xin nghỉ
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
            <navbar-leave></navbar-leave>
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
    <Transition duration="550" name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listApprovalLeave?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="leave in listApprovalLeave"
              :key="leave.ID"
              @contextmenu.prevent="rightClick($event, leave)"
              :class="{
                isCheck: CheckedBox(leave.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkLeave"
                    :value="leave.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                <avatar-created :Approval="leave"></avatar-created>
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="ShowDetail(leave.ID)"
              >
                {{ leave.data?.personnel_code }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="ShowDetail(leave.ID)"
              >
                {{ leave.data?.personnel_name }}
              </td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(leave.app_approval_status)"
                >
                  {{ formatStatus(leave.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">{{ formatLeaves(leave.data?.reason) }}</td>
              <td class="cellTable">{{ formatDateFrom(leave.details) }}</td>
              <td class="cellTable">{{ formatDateTo(leave.details) }}</td>
              <td class="cellTable">{{ leave.department_title }}</td>
              <td class="cellTable">{{ leave.position_title }}</td>
              <td class="cellTable">
                {{ formatDate(leave.data?.created_at) }}
              </td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="p-2 text-left text-sm">
          Không tìm thấy kết quả nào
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalLeave?.length">
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
        <li @click.prevent="updateApprovalLeave()" v-if="isCreated">
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
      :ConfirmDelete="deleteApprovalLeave"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
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
import SidebarApproval from "@/components/sidebar/SidebarApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
import NavbarLeave from "@/views/approvals/approvalLeave/NavbarLeave.vue";
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
import { useApprovalLeave } from "@/store/modules/approval/ApprovalLeaves";
import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarLeave,
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
        "Từ ngày",
        "Đến ngày",
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
    formatLeaves(id) {
      return FormatTitle(id, this.ReasonLeavesActive);
    },
    formatShift(index) {
      if (index == 0) {
        return "Nửa ca đầu";
      } else {
        return "Nửa ca sau";
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatDateFrom(arr) {
      for (let i = 0; i < arr.length; i++) {
        return (
          this.formatShift(arr[i].shifts_start) +
          "  " +
          this.formatDate(arr[i].date_start)
        );
      }
    },
    formatDateTo(arr) {
      for (let i = 0; i < arr.length; i++) {
        return (
          this.formatShift(arr[arr.length - 1].shifts_end) +
          "  " +
          this.formatDate(arr[arr.length - 1].date_end)
        );
      }
    },
    rangeDay(leave) {
      let start = new Date(leave.date_start);
      let end = new Date(leave.date_end);
      if (leave.shifts_start == leave.shifts_end) {
        return (
          Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) +
          0.5
        );
      } else {
        return (
          Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) +
          1
        );
      }
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkLeave = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const leaveDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isApproved = ref(true);
    const isOpenConfirm = ref(false);
    const isCreated = ref(false);
    const showRevert = ref(true);
    const leave = useApprovalLeave();
    const reasonLeave = useReasonLeave();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { ReasonLeavesActive } = storeToRefs(reasonLeave);
    const { listApprovalLeave, listPagination } = storeToRefs(leave);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    leave.GetAllApprovalLeaveAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-leave-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        leave.GetAllApprovalLeaveAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading,
        });
      }
    });
    if (ReasonLeavesActive.value.length == 0) {
      reasonLeave.GetAllLeavesAction();
    }
    const rightClick = (e, leave) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        leaveDetail.value = leave;
        isCreated.value = CheckUserCreateApproval(leave, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          leave,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(leave, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkLeave.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalLeave.value) {
          checkLeave.value.push(listApprovalLeave.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkLeave.value.splice(0, checkLeave.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      leave.GetNextPageAction({ data: dataUrl, EndTimeLoading });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      leave.GetPrevPageAction({ data: dataUrl, EndTimeLoading });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deleteApprovalLeave = () => {
      leave.deleteApprovalLeaveAction({
        id: leaveDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const updateApprovalLeave = () => {
      router.push({
        params: { idApproval: leaveDetail.value.ID },
        name: "Approval Leave Edit",
      });
    };
    const ShowDetail = (id) => {
      router.push({
        params: { idApproval: id },
        name: "Chi tiết đơn xin nghỉ",
      });
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: leaveDetail.value.ID,
        data: data,
      };
      leave.ConfirmApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const UnconfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "NO_APPROVED",
      };
      const dataApproval = {
        id: leaveDetail.value.ID,
        data: data,
      };
      leave.ConfirmApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const ReturnApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "REVERT",
      };
      const dataApproval = {
        id: leaveDetail.value.ID,
        data: data,
      };
      leave.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listApprovalLeave,
      listPagination,
      checkLeave,
      checkedAll,
      ReasonLeavesActive,
      isActive,
      leaveDetail,
      isLoading,
      isLoadingShow,
      isApproved,
      isOpenConfirm,
      userProfile,
      isCreated,
      showRevert,
      CheckedBox,
      checkedAllItem,
      NextPage,
      PrevPage,
      rightClick,
      deleteApprovalLeave,
      updateApprovalLeave,
      ShowDetail,
      EndTimeLoading,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoadingShow,
      ConfirmApproval,
      UnconfirmApproval,
      ReturnApproval,
    };
  },
};
</script>

<style></style>
