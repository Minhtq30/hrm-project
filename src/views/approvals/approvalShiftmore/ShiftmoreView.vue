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
                / Đơn tăng ca
              </p>
              <div class="icon-filter-approval relative group">
                <i class="fal fa-angle-double-down"></i>
                <button-extend-approval></button-extend-approval>
              </div>
            </div>
          </div></div
      ></navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex items-center justify-between w-full">
          <div>
            <navbar-shiftmore></navbar-shiftmore>
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
        <div v-if="listApprovalShiftmore?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="shiftmore in listApprovalShiftmore"
              :key="shiftmore.ID"
              @contextmenu.prevent="rightClick($event, shiftmore)"
              :class="{
                isCheck: CheckedBox(shiftmore.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkShiftmore"
                    :value="shiftmore.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                <avatar-created :Approval="shiftmore"></avatar-created>
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetail(shiftmore.ID)"
              >
                {{ shiftmore.data?.personnel_code }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetail(shiftmore.ID)"
              >
                {{ shiftmore.data?.personnel_name }}
              </td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(shiftmore.app_approval_status)"
                >
                  {{ formatStatus(shiftmore.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">{{ shiftmore.data?.desc }}</td>
              <td class="cellTable">
                {{ formatDateShiftmore(shiftmore.details) }}
              </td>
              <td class="cellTable"></td>
              <td class="cellTable">
                {{ formatShiftMore(shiftmore.details) }}
              </td>
              <td class="cellTable">
                {{ formatAttendance(shiftmore.details) }}
              </td>
              <td class="cellTable">
                {{ formatDate(shiftmore.created_at) }}
              </td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="p-2 text-left text-sm">
          Không tìm thấy kết quả nào
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalShiftmore?.length">
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
        <li @click.prevent="updateApprovalShiftmore()" v-if="isCreated">
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
      :ConfirmDelete="deleteApprovalShiftmore"
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
import NavbarShiftmore from "@/views/approvals/approvalShiftmore/NavbarShiftmore.vue";
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
  FormatTrueFalse,
  HideShowFunctionContextmenu,
  ShowRevertApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalShiftmore } from "@/store/modules/approval/ApprovalShiftmore";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarShiftmore,
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
        "Ngày tăng ca",
        "Ca được phân",
        "Ca tăng",
        "Chốt vân tay",
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
    formatDate(date) {
      return FormatDate(date);
    },
    formatDateShiftmore(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return this.formatDate(arr[i].date);
      }
    },
    formatShift(id) {
      return FormatTitle(id, this.listShifts);
    },
    formatShiftMore(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return this.formatShift(arr[i].shift_ids);
      }
    },
    formatAttendance(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return FormatTrueFalse(arr[i].is_attendance);
      }
    },
    formatReason(arr) {
      for (let i = 0; i <= arr.length; i++) {
        return arr[i].reason;
      }
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkShiftmore = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const shiftmoreDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isApproved = ref(true);
    const isCreated = ref(false);
    const isOpenConfirm = ref(false);
    const showRevert = ref(true);
    const shiftmore = useApprovalShiftmore();
    const profile = useUserProfile();
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const { userProfile } = storeToRefs(profile);
    const { listApprovalShiftmore, listPagination } = storeToRefs(shiftmore);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    tk_shift.GetAllShiftsAction();
    shiftmore.GetAllApprovalShiftmoreAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-shiftmore-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        shiftmore.GetAllApprovalShiftmoreAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading,
        });
      }
    });
    const rightClick = (e, shiftmore) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        shiftmoreDetail.value = shiftmore;
        isCreated.value = CheckUserCreateApproval(shiftmore, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          shiftmore,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(shiftmore, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkShiftmore.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalShiftmore.value) {
          checkShiftmore.value.push(listApprovalShiftmore.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkShiftmore.value.splice(0, checkShiftmore.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      shiftmore.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      shiftmore.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deleteApprovalShiftmore = () => {
      shiftmore.deleteApprovalShiftmoreAction({
        id: shiftmoreDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const updateApprovalShiftmore = () => {
      router.push(`/approval-shiftmore-edit/${shiftmoreDetail.value.ID}`);
    };
    const showDetail = (id) => {
      router.push(`/approval-shiftmore-view/detail=${id}`);
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: shiftmoreDetail.value.ID,
        data: data,
      };
      shiftmore.ConfirmApprovalAction({
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
        id: shiftmoreDetail.value.ID,
        data: data,
      };
      shiftmore.ConfirmApprovalAction({
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
        id: shiftmoreDetail.value.ID,
        data: data,
      };
      shiftmore.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listApprovalShiftmore,
      listPagination,
      checkShiftmore,
      checkedAll,
      listShifts,
      isActive,
      shiftmoreDetail,
      isLoading,
      isApproved,
      isOpenConfirm,
      isLoadingShow,
      isCreated,
      userProfile,
      showRevert,
      CheckedBox,
      checkedAllItem,
      NextPage,
      PrevPage,
      rightClick,
      deleteApprovalShiftmore,
      updateApprovalShiftmore,
      showDetail,
      EndTimeLoading,
      EndTimeLoadingShow,
      handleCloseConfirm,
      handleOpenConfirm,
      ConfirmApproval,
      UnconfirmApproval,
      ReturnApproval,
    };
  },
};
</script>

<style></style>
