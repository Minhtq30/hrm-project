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
                / Đơn làm theo chế độ
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
            <navbar-worktime></navbar-worktime>
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
        <div v-if="listApprovalWorktime?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="worktime in listApprovalWorktime"
              :key="worktime.ID"
              @contextmenu.prevent="rightClick($event, worktime)"
              :class="{
                isCheck: CheckedBox(worktime.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkWorktime"
                    :value="worktime.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                <avatar-created :Approval="worktime"></avatar-created>
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="ShowDetail(worktime.ID)"
              >
                {{ worktime.personnel_code }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="ShowDetail(worktime.ID)"
              >
                {{ worktime.personnel_name }}
              </td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(worktime.app_approval_status)"
                >
                  {{ formatStatus(worktime.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">
                {{ formatReason(worktime.data?.reason) }}
              </td>
              <td class="cellTable">
                {{ formatDate(worktime.data?.date_start) }}
              </td>
              <td class="cellTable">
                {{ formatDate(worktime.data?.date_end) }}
              </td>
              <td class="cellTable">{{ worktime.data?.late }}</td>
              <td class="cellTable">{{ worktime.data?.early }}</td>
              <td class="cellTable">{{ worktime?.department_title }}</td>
              <td class="cellTable">{{ worktime?.position_title }}</td>
              <td class="cellTable">{{ formatDate(worktime.created_at) }}</td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="p-2 text-left text-sm">
          Không tìm thấy kết quả nào
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalWorktime?.length">
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
        <li @click.prevent="ConfirmApproval()" v-if="isApproved">
          <i class="fal fa-check"></i><a href="#">Duyệt đơn</a>
        </li>
        <li @click.prevent="ReturnApproval()" v-if="showRevert">
          <i class="fal fa-undo"></i> <a href="#">Hoàn duyệt</a>
        </li>
        <li @click.prevent="UnconfirmApproval()" v-if="isApproved">
          <i class="fal fa-ban"></i><a href="#">Không duyệt</a>
        </li>
        <li @click.prevent="updateApprovalWorktime()" v-if="isCreated">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()" v-if="isCreated">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
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
      :ConfirmDelete="deleteApprovalWorktime"
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
import NavbarWorktime from "@/views/approvals/approvalWorktime/NavbarWorktime.vue";
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
import { useApprovalWorktime } from "@/store/modules/approval/ApprovalWorktime";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useReasonWorktime } from "@/store/modules/settingApproval/ReasonWorktime";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarWorktime,
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
        "Đi muộn (h)",
        "Về sớm (h)",
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
    formatReason(id) {
      return FormatTitle(id, this.listWorktimes);
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkWorktime = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const worktimeDetail = ref();
    const isLoading = ref(true);
    const isApproved = ref(true);
    const isOpenConfirm = ref(false);
    const isCreated = ref(false);
    const showRevert = ref(true);
    const isLoadingShow = ref(false);
    const regime = useApprovalWorktime();
    const profile = useUserProfile();
    const reasonWorktime = useReasonWorktime();
    const { listWorktimes } = storeToRefs(reasonWorktime);
    const { userProfile } = storeToRefs(profile);
    const { listApprovalWorktime, listPagination } = storeToRefs(regime);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    regime.GetAllApprovalWorktimeAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-worktime-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        regime.GetAllApprovalWorktimeAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading,
        });
      }
    });
    reasonWorktime.GetAllWorktimesAction();
    const rightClick = (e, worktime) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        worktimeDetail.value = worktime;
        isCreated.value = CheckUserCreateApproval(worktime, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          worktime,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(worktime, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkWorktime.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalWorktime.value) {
          checkWorktime.value.push(listApprovalWorktime.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkWorktime.value.splice(0, checkWorktime.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      regime.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      regime.GetPrevPageAction({
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
    const deleteApprovalWorktime = () => {
      regime.deleteApprovalWorktimeAction({
        id: worktimeDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const updateApprovalWorktime = () => {
      router.push(`/approval-worktime-edit/${worktimeDetail.value.ID}`);
    };
    const ShowDetail = (id) => {
      router.push(`/approval-worktime-view/detail=${id}`);
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: worktimeDetail.value.ID,
        data: data,
      };
      regime.ConfirmApprovalAction({
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
        id: worktimeDetail.value.ID,
        data: data,
      };
      regime.ConfirmApprovalAction({
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
        id: worktimeDetail.value.ID,
        data: data,
      };
      regime.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listApprovalWorktime,
      listPagination,
      checkWorktime,
      checkedAll,
      isActive,
      worktimeDetail,
      listWorktimes,
      isLoading,
      isApproved,
      isOpenConfirm,
      showRevert,
      isCreated,
      userProfile,
      isLoadingShow,
      CheckedBox,
      checkedAllItem,
      NextPage,
      PrevPage,
      rightClick,
      deleteApprovalWorktime,
      updateApprovalWorktime,
      ShowDetail,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
      UnconfirmApproval,
      ReturnApproval,
      ConfirmApproval,
      EndTimeLoadingShow,
    };
  },
};
</script>

<style></style>
