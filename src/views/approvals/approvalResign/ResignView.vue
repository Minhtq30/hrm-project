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
                / Đơn thôi việc
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
        <div class="flex items-center">
          <div></div>
          <div>
            <navbar-resign></navbar-resign>
          </div>
        </div>
      </nav-feature>
    </template>
    <div class="w-full">
      <Transition duration="550" name="slide-fade">
        <div class="w-full" v-if="isLoading == false">
          <div v-if="listApprovalResign?.length">
            <table-responsive
              :header="header"
              :checkAll="checkedAllItem"
              :isCheck="checkedAll"
            >
              <tr
                class="bg-white border-b"
                v-for="resign in listApprovalResign"
                :key="resign.ID"
                @contextmenu.prevent="rightClick($event, resign)"
                :class="{
                  isCheck: CheckedBox(resign.ID),
                }"
              >
                <td class="w-4 px-6 py-3">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      v-model="checkResign"
                      :value="resign.ID"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>
                <td class="cellTable">
                  <avatar-created :Approval="resign"></avatar-created>
                </td>
                <td
                  class="cellTable cursor-pointer"
                  @click="showDetail(resign.ID)"
                >
                  {{ resign.personnel_code }}
                </td>
                <td
                  class="cellTable cursor-pointer"
                  @click="showDetail(resign.ID)"
                >
                  {{ resign.personnel_name }}
                </td>
                <td class="cellTable">
                  <div
                    class="beacon"
                    :class="formatColor(resign.app_approval_status)"
                  >
                    {{ formatStatus(resign.app_approval_status) }}
                  </div>
                </td>
                <td class="cellTable">{{ resign?.department_title }}</td>
                <td class="cellTable">{{ resign?.position_title }}</td>
                <td class="cellTable">{{ formatDate(resign.created_at) }}</td>
              </tr></table-responsive
            >
          </div>
          <div v-else class="p-2 text-left text-sm">
            Không tìm thấy kết quả nào
          </div>
        </div>
      </Transition>
    </div>
    <template v-slot:sub_footer v-if="listApprovalResign?.length">
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
        <li @click.prevent="updateApprovalResign()" v-if="isCreated">
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
      :ConfirmDelete="deleteApprovalResign"
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
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavbarResign from "@/views/approvals/approvalResign/NavbarResign.vue";
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
import { useApprovalResign } from "@/store/modules/approval/ApprovalResign";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    TableResponsive,
    NavbarResign,
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
        "Phòng ban",
        "Vị trí",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const checkResign = ref([]);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const resignDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isApproved = ref(true);
    const isOpenConfirm = ref(false);
    const isCreated = ref(false);
    const showRevert = ref(true);
    const resign = useApprovalResign();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listApprovalResign, listPagination } = storeToRefs(resign);
    console.log(listApprovalResign);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    resign.GetAllApprovalResignAction({
      type: route.params.type,
      menu: route.params.menu,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (
        to.path ==
        `/approval-resign-view/type=${to.params.type}&menu=${to.params.menu}`
      ) {
        resign.GetAllApprovalResignAction({
          type: to.params.type,
          menu: to.params.menu,
          EndTimeLoading,
        });
      }
    });
    const rightClick = (e, resign) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        resignDetail.value = resign;
        isCreated.value = CheckUserCreateApproval(resign, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          resign,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(resign, userProfile.value);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkResign.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalResign.value) {
          checkResign.value.push(listApprovalResign.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkResign.value.splice(0, checkResign.value.length);
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      resign.GetNextPageAction(dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      resign.GetPrevPageAction(dataUrl);
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deleteApprovalResign = () => {
      isLoadingShow.value = true;
      resign.deleteApprovalResignAction({
        id: resignDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading: EndTimeLoadingShow,
        handleCloseConfirm,
      });
    };
    const updateApprovalResign = () => {
      router.push(`/approval-resign-edit/${resignDetail.value.ID}`);
    };
    const showDetail = (id) => {
      router.push(`/approval-resign-view/detail=${id}`);
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: resignDetail.value.ID,
        data: data,
      };
      resign.ConfirmApprovalAction({
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
        id: resignDetail.value.ID,
        data: data,
      };
      resign.ConfirmApprovalAction({
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
        id: resignDetail.value.ID,
        data: data,
      };
      resign.RevertApprovalAction({
        dataApproval,
        toast,
        type: route.params.type,
        menu: route.params.menu,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      EndTimeLoading,
      EndTimeLoadingShow,
      listApprovalResign,
      listPagination,
      checkResign,
      checkedAll,
      isActive,
      resignDetail,
      isLoading,
      isLoadingShow,
      userProfile,
      isApproved,
      isOpenConfirm,
      isCreated,
      showRevert,
      CheckedBox,
      checkedAllItem,
      NextPage,
      PrevPage,
      rightClick,
      deleteApprovalResign,
      updateApprovalResign,
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
