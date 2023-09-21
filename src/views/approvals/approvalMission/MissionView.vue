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
                / Đơn công tác
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
            <navbar-mission></navbar-mission>
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
        <div v-if="listApprovalMission?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="mission in listApprovalMission"
              :key="mission.ID"
              @contextmenu.prevent="rightClick($event, mission)"
              :class="{
                isCheck: CheckedBox(mission.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkMission"
                    :value="mission.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                <avatar-created :Approval="mission"></avatar-created>
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetail(mission.ID)"
              >
                {{ mission.personnel_code }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetail(mission.ID)"
              >
                {{ mission.personnel_name }}
              </td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(mission.app_approval_status)"
                >
                  {{ formatStatus(mission.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">
                {{
                  formatDateMission(
                    mission.data?.time_start,
                    mission.data?.date_from
                  )
                }}
              </td>
              <td class="cellTable">
                {{
                  formatDateMission(
                    mission.data?.time_end,
                    mission.data?.date_to
                  )
                }}
              </td>
              <td class="cellTable">{{ mission.data?.address }}</td>
              <td class="cellTable">{{ mission?.department_title }}</td>
              <td class="cellTable">{{ mission?.position_title }}</td>
              <td class="cellTable">{{ formatDate(mission.created_at) }}</td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="p-2 text-left text-sm">
          Không tìm thấy kết quả nào
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalMission?.length">
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
        <li @click.prevent="updateApprovalMission()" v-if="isCreated">
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
      :ConfirmDelete="deleteApprovalMission"
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
import NavbarMission from "@/views/approvals/approvalMission/NavbarMission.vue";
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
  HideShowFunctionContextmenu,
  ShowRevertApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalMission } from "@/store/modules/approval/ApprovalMission";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarMission,
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
        "Từ ngày",
        "Đến ngày",
        "Địa điểm",
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
    formatDateMission(time, date) {
      if (time) {
        return time + " - " + FormatDate(date);
      } else {
        return "";
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkMission = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const missionDetail = ref();
    const isLoading = ref(true);
    const isApproved = ref(true);
    const isOpenConfirm = ref(false);
    const isCreated = ref(false);
    const isLoadingShow = ref(false);
    const showRevert = ref(true);
    const mission = useApprovalMission();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listApprovalMission, listPagination } = storeToRefs(mission);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    mission.GetAllApprovalMissionAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-mission-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        mission.GetAllApprovalMissionAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading,
        });
      }
    });
    const rightClick = (e, mission) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        missionDetail.value = mission;
        isCreated.value = CheckUserCreateApproval(mission, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          mission,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(mission, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkMission.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalMission.value) {
          checkMission.value.push(listApprovalMission.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkMission.value.splice(0, checkMission.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      mission.GetNextPageAction({ data: dataUrl, EndTimeLoading });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      mission.GetPrevPageAction({ data: dataUrl, EndTimeLoading });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deleteApprovalMission = () => {
      mission.deleteApprovalMissionAction({
        id: missionDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const updateApprovalMission = () => {
      router.push(`/approval-mission-edit/${missionDetail.value.ID}`);
    };
    const showDetail = (id) => {
      router.push(`/approval-mission-view/detail=${id}`);
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: missionDetail.value.ID,
        data: data,
      };
      mission.ConfirmApprovalAction({
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
        id: missionDetail.value.ID,
        data: data,
      };
      mission.ConfirmApprovalAction({
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
        id: missionDetail.value.ID,
        data: data,
      };
      mission.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listApprovalMission,
      listPagination,
      checkMission,
      checkedAll,
      isActive,
      missionDetail,
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
      deleteApprovalMission,
      updateApprovalMission,
      showDetail,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
      EndTimeLoadingShow,
      ConfirmApproval,
      UnconfirmApproval,
      ReturnApproval,
    };
  },
};
</script>

<style></style>
