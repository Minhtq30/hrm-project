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
                / Đơn đăng ký ca
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
            <navbar-shiftregister></navbar-shiftregister>
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
    <div class="w-full" v-if="isLoading == false">
      <div v-if="listApprovalShiftresgister?.length">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="shift in listApprovalShiftresgister"
            :key="shift.ID"
            @contextmenu.prevent="rightClick($event, shift)"
            :class="{
              isCheck: CheckedBox(shift.ID),
            }"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkShiftregister"
                  :value="shift.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable">
              <avatar-created :Approval="shift"></avatar-created>
            </td>
            <td class="cellTable cursor-pointer" @click="showDetail(shift.ID)">
              {{ shift.personnel_code }}
            </td>
            <td class="cellTable cursor-pointer" @click="showDetail(shift.ID)">
              {{ shift.personnel_name }}
            </td>
            <td class="cellTable">
              <div
                class="beacon"
                :class="formatColor(shift.app_approval_status)"
              >
                {{ formatStatus(shift.app_approval_status) }}
              </div>
            </td>
            <td class="cellTable">{{ formatTypeShift(shift.repeat_type) }}</td>
            <td class="cellTable">{{ formatDateStart(shift) }}</td>
            <td class="cellTable">{{ formatDateEnd(shift) }}</td>
            <td class="cellTable">{{ shift.department_title }}</td>
            <td class="cellTable">{{ shift.position_title }}</td>
            <td class="cellTable">{{ formatDate(shift.created_at) }}</td>
          </tr></table-responsive
        >
      </div>
      <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
    </div>
    <template v-slot:sub_footer v-if="listApprovalShiftresgister?.length">
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
        <li @click.prevent="updateApprovalShiftresgister()" v-if="isCreated">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()" v-if="isCreated">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
        <li @click.prevent="ConfirmApproval()" v-if="isApproved">
          <i class="fal fa-check"></i><a href="#">Duyệt đơn</a>
        </li>
        <li @click.prevent="ReturnApproval()" v-if="showRevert">
          <i class="fal fa-undo"></i> <a href="#">Hoàn duyệt</a>
        </li>
        <li @click.prevent="UnconfirmApproval()" v-if="isApproved">
          <i class="fal fa-ban"></i><a href="#">Không duyệt</a>
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
      :ConfirmDelete="deleteApprovalShiftresgister"
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
import NavbarShiftregister from "@/views/approvals/approvalShiftregister/NavbarShiftregister.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import ButtonExtendApproval from "@/views/approvals/AllButton/ButtonExtendApproval.vue";
import AvatarCreated from "@/components/constant/AvatarCreated.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import {
  CheckUserCreateApproval,
  FormatColorApproval,
  FormatDate,
  FormatStatusApproval,
  HideShowFunctionContextmenu,
  ShowRevertApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalShiftresgister } from "@/store/modules/approval/ApprovalShiftresgister";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarShiftregister,
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
        "Kiểu ca",
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
    formatDate(date) {
      return FormatDate(date);
    },
    formatTypeShift(shift) {
      if (shift == "RANGE") {
        return "Theo khoảng ngày";
      } else {
        return "Theo ngày cố định";
      }
    },
    formatDateStart(shift) {
      return FormatDate(shift.details[0].date_start);
    },
    formatDateEnd(shift) {
      if (shift.repeat_type == "RANGE") {
        return FormatDate(shift.details[shift.details.length - 1].date_start);
      } else {
        return "";
      }
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkShiftregister = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const shiftregisterDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isApproved = ref(true);
    const isCreated = ref(false);
    const isOpenConfirm = ref(false);
    const showRevert = ref(true);
    const shiftresgister = useApprovalShiftresgister();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listApprovalShiftresgister, listPagination } =
      storeToRefs(shiftresgister);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    shiftresgister.GetAllApprovalShiftresgisterAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-shiftresgister-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        shiftresgister.GetAllApprovalShiftresgisterAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading,
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
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        shiftregisterDetail.value = absence;
        isCreated.value = CheckUserCreateApproval(absence, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          absence,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(absence, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkShiftregister.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalShiftresgister.value) {
          checkShiftregister.value.push(
            listApprovalShiftresgister.value[item].ID
          );
        }
      } else {
        checkedAll.value = false;
        checkShiftregister.value.splice(0, checkShiftregister.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      shiftresgister.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      shiftresgister.GetPrevPageAction({
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
    const deleteApprovalShiftresgister = () => {
      shiftresgister.deleteApprovalShiftresgisterAction({
        id: shiftregisterDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const updateApprovalShiftresgister = () => {
      router.push(
        `/approval-shiftresgister-edit/${shiftregisterDetail.value.ID}`
      );
    };
    const showDetail = (id) => {
      router.push(`/approval-shiftresgister-view/detail=${id}`);
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: shiftregisterDetail.value.ID,
        data: data,
      };
      shiftresgister.ConfirmApprovalAction({
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
        id: shiftregisterDetail.value.ID,
        data: data,
      };
      shiftresgister.ConfirmApprovalAction({
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
        id: shiftregisterDetail.value.ID,
        data: data,
      };
      shiftresgister.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listApprovalShiftresgister,
      listPagination,
      checkShiftregister,
      checkedAll,
      isActive,
      shiftregisterDetail,
      isLoading,
      isLoadingShow,
      isOpenConfirm,
      isApproved,
      isCreated,
      userProfile,
      showRevert,
      EndTimeLoading,
      EndTimeLoadingShow,
      CheckedBox,
      checkedAllItem,
      NextPage,
      PrevPage,
      rightClick,
      deleteApprovalShiftresgister,
      updateApprovalShiftresgister,
      showDetail,
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
