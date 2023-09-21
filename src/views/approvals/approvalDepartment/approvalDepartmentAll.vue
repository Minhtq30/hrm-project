<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-approval></button-create-approval>
            <div class="flex items-center">
              <p class="longText">Danh sách đơn từ theo phòng ban</p>
              <div class="icon-filter-approval relative group">
                <i class="fal fa-angle-double-down"></i>
                <button-extend-department-approval></button-extend-department-approval>
              </div>
            </div>
          </div></div
      ></navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex items-center justify-between w-full">
          <div>
            <navbar-approval-department></navbar-approval-department>
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
        <div v-if="listApprovalDepartment?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
            ><tr
              class="bg-white border-b"
              v-for="total in listApprovalDepartment"
              :key="total.ID"
              @contextmenu.prevent="rightClick($event, total)"
              :class="{
                isCheck: CheckedBox(total.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkTotal"
                    :value="total.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                <avatar-created :Approval="total"></avatar-created>
              </td>
              <td class="cellTable cursor-pointer" @click="showDetail(total)">
                {{ total.personnel_code }}
              </td>
              <td class="cellTable cursor-pointer" @click="showDetail(total)">
                {{ total.personnel_name }}
              </td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(total.app_approval_status)"
                >
                  {{ formatStatus(total.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">
                {{ formatApproval(total.app_sub_object) }}
              </td>
              <td class="cellTable">{{ total.department_title }}</td>
              <td class="cellTable">{{ total.position_title }}</td>
              <td class="cellTable">{{ total.reason }}</td>
              <td class="cellTable">
                <div
                  class="w-[150px] whitespace-normal overflow-hidden longContent !text-[14px]"
                >
                  {{ total.data.desc }}
                </div>
              </td>
              <td class="cellTable">{{ formatDate(total.created_at) }}</td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listApprovalDepartment?.length">
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
        <li v-if="isApproved" @click.prevent="UnconfirmApproval()">
          <i class="fal fa-ban"></i><a href="#">Không duyệt</a>
        </li>
        <li @click.prevent="EditApproval()" v-if="isCreated">
          <i class="fal fa-edit"></i> <a href="#">Sửa</a>
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
      v-if="checkTotal?.length == 0"
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="handleDeleteApproval"
    >
    </modal-delete>
    <modal-delete
      v-else
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="removeDeleteApproval"
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
import NavbarApprovalDepartment from "./NavbarApprovalDepartment.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
import ButtonExtendDepartmentApproval from "../AllButton/ButtonExtendDepartmentApproval.vue";
import AvatarCreated from "@/components/constant/AvatarCreated.vue";
import SearchView from "@/components/search/SearchView.vue";
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
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalDepartment } from "@/store/modules/approval/ApprovalDepartment";
import { useUserProfile } from "@/store/modules/user/userProfile";
// import { useListAllApproval } from "@/store/modules/approval/ListAllApproval";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarApprovalDepartment,
    TableResponsive,
    PaginationView,
    ButtonExtendDepartmentApproval,
    AvatarCreated,
    SearchView,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Mã NV",
        "Họ và tên",
        "Trạng thái",
        "Loại đơn",
        "Phòng ban",
        "Vị trí",
        "Lý do",
        "Mô tả",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatApproval(title) {
      const arr = this.listApproval.find((item) => item.code == title);
      return arr ? arr.title : "Upload POSM";
    },
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
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkTotal = ref([]);
    const totalDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isOpenQuickView = ref(false);
    const isApproved = ref(false);
    const isCreated = ref(true);
    const showRevert = ref(true);
    const isOpenConfirm = ref(false);
    const total = useApprovalTotal();
    const depart = useApprovalDepartment();
    // const listall = useListAllApproval();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listApproval } = storeToRefs(total);
    const { listApprovalDepartment, listPagination } = storeToRefs(depart);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    depart.GetAllApprovalDepartmentAction({
      key: route.params.key,
      search: "",
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/approval-approval-department/type=${to.params.key}`) {
        depart.GetAllApprovalDepartmentAction({
          key: to.params.key,
          search: "",
          EndTimeLoading,
        });
      }
    });
    const handleOpenQuickView = () => {
      isOpenQuickView.value = true;
    };
    const handleCloseQuickView = () => {
      isOpenQuickView.value = false;
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      depart.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      depart.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      depart.GetAllApprovalDepartmentAction({
        key: route.params.key,
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprovalDepartment.value) {
          checkTotal.value.push(listApprovalDepartment.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkTotal.value.splice(0, checkTotal.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkTotal.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, total) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        totalDetail.value = total;
        isCreated.value = CheckUserCreateApproval(total, userProfile.value);
        isApproved.value = HideShowFunctionContextmenu(
          total,
          userProfile.value
        );
        showRevert.value = ShowRevertApproval(total, userProfile.value);
      }
    };
    const formatUrlDetail = (obj) => {
      const arr = listApproval.value.find(
        (item) => item.code == obj.app_sub_object
      );
      return arr.urlDetail;
    };
    const FormatUrlEdit = (obj) => {
      const arr = listApproval.value.find(
        (item) => item.code == obj.app_sub_object
      );
      return arr.urlEdit;
    };
    const showDetail = (obj) => {
      router.push(`${formatUrlDetail(obj)}` + `${obj.ID}`);
    };
    const EditApproval = () => {
      router.push(
        `${FormatUrlEdit(totalDetail.value)}` + `${totalDetail.value.ID}`
      );
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const ConfirmApproval = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: totalDetail.value.ID,
        data: data,
      };
      depart.ConfirmApprovalAction({
        dataApproval,
        toast,
        key: route.params.key,
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
        id: totalDetail.value.ID,
        data: data,
      };
      depart.ConfirmApprovalAction({
        dataApproval,
        toast,
        key: route.params.key,
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
        id: totalDetail.value.ID,
        data: data,
      };
      depart.RevertApprovalAction({
        dataApproval,
        toast,
        key: route.params.key,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const handleDeleteApproval = () => {
      depart.DeleteApprovalAction({
        id: totalDetail.value.ID,
        route,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const removeDeleteApproval = () => {
      for (let i = 0; i < checkTotal.value?.length; i++) {
        depart.DeleteApprovalAction({
          id: checkTotal.value[i],
          route,
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkTotal.value.length = 0;
    };
    return {
      listPagination,
      listApprovalDepartment,
      listApproval,
      isActive,
      checkedAll,
      checkTotal,
      totalDetail,
      isLoading,
      isOpenQuickView,
      isApproved,
      isCreated,
      userProfile,
      isLoadingShow,
      showRevert,
      isOpenConfirm,
      handleSearch,
      handleOpenConfirm,
      handleCloseConfirm,
      NextPage,
      PrevPage,
      checkedAllItem,
      CheckedBox,
      rightClick,
      EditApproval,
      handleOpenQuickView,
      handleCloseQuickView,
      formatUrlDetail,
      showDetail,
      FormatUrlEdit,
      EndTimeLoading,
      EndTimeLoadingShow,
      ConfirmApproval,
      UnconfirmApproval,
      ReturnApproval,
      handleDeleteApproval,
      removeDeleteApproval,
    };
  },
};
</script>

<style></style>
