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
                / Đơn check in/out
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
            <navbar-inout></navbar-inout>
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
        <div v-if="listApprovalCheckinout?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="inout in listApprovalCheckinout"
              :key="inout.ID"
              @contextmenu.prevent="rightClick($event, inout)"
              :class="{
                isCheck: CheckedBox(inout.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkInout"
                    :value="inout.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                <avatar-created :Approval="inout"></avatar-created>
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetail(inout.ID)"
              >
                {{ inout.data?.personnel_code }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetail(inout.ID)"
              >
                {{ inout.data?.personnel_name }}
              </td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(inout.app_approval_status)"
                >
                  {{ formatStatus(inout.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">
                {{ formatDate(inout.details[0]?.date) }}
              </td>
              <td class="cellTable">{{ inout.details[0]?.time }}</td>
              <td class="cellTable">
                {{ formatInout(inout.details[0]?.reason) }}
              </td>
              <td class="cellTable">{{ inout.department_title }}</td>
              <td class="cellTable">{{ inout.position_title }}</td>
              <td class="cellTable">
                {{ formatDate(inout.data?.created_at) }}
              </td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="p-2 text-left text-sm">
          Không tìm thấy kết quả nào
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalCheckinout?.length">
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
        <li @click.prevent="updateApprovalCheckinout()" v-if="isCreated">
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
      :ConfirmDelete="deleteApprovalCheckinout"
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
import NavbarInout from "@/views/approvals/approvalCheckinout/NavbarCheckinout.vue";
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
import { useApprovalCheckinout } from "@/store/modules/approval/ApprovalCheckinout";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useReasonInout } from "@/store/modules/settingApproval/ReasonInout";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarInout,
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
        "Ngày check in/out",
        "Thời gian(h)",
        "Lý do",
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
    formatInout(id) {
      return FormatTitle(id, this.ReasonInoutActive);
    },
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkInout = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const inoutDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isApproved = ref(true);
    const isCreated = ref(false);
    const isOpenConfirm = ref(false);
    const showRevert = ref(true);
    const checkinout = useApprovalCheckinout();
    const profile = useUserProfile();
    const reasonInout = useReasonInout();
    const { ReasonInoutActive } = storeToRefs(reasonInout);
    const { userProfile } = storeToRefs(profile);
    const { listApprovalCheckinout, listPagination } = storeToRefs(checkinout);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    checkinout.GetAllApprovalCheckinoutAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-inout-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        checkinout.GetAllApprovalCheckinoutAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading,
        });
      }
    });
    if (ReasonInoutActive.value.length == 0) {
      reasonInout.GetAllInoutAction();
    }
    const rightClick = (e, inout) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        inoutDetail.value = inout;
        isCreated.value = CheckUserCreateApproval(inout, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          inout,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(inout, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkInout.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalCheckinout.value) {
          checkInout.value.push(listApprovalCheckinout.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkInout.value.splice(0, checkInout.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      checkinout.GetNextPageAction({ data: dataUrl, EndTimeLoading });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      checkinout.GetPrevPageAction({ data: dataUrl, EndTimeLoading });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deleteApprovalCheckinout = () => {
      checkinout.deleteApprovalCheckinoutAction({
        id: inoutDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const updateApprovalCheckinout = () => {
      router.push(`/approval-inout-edit/${inoutDetail.value.ID}`);
    };
    const showDetail = (id) => {
      router.push(`/approval-inout-view/detail=${id}`);
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: inoutDetail.value.ID,
        data: data,
      };
      checkinout.ConfirmApprovalAction({
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
        id: inoutDetail.value.ID,
        data: data,
      };
      checkinout.ConfirmApprovalAction({
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
        id: inoutDetail.value.ID,
        data: data,
      };
      checkinout.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listApprovalCheckinout,
      listPagination,
      checkInout,
      checkedAll,
      ReasonInoutActive,
      isActive,
      inoutDetail,
      isLoading,
      isLoadingShow,
      isApproved,
      isOpenConfirm,
      isCreated,
      userProfile,
      showRevert,
      CheckedBox,
      checkedAllItem,
      NextPage,
      PrevPage,
      rightClick,
      deleteApprovalCheckinout,
      updateApprovalCheckinout,
      showDetail,
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
