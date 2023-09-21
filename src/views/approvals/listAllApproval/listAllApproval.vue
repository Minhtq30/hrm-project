<template>
  <!-- 1 -->
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearchAll"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-approval></button-create-approval>
            <div class="flex items-center">
              <p class="longText">Danh sách đơn từ</p>
              <div class="icon-filter-approval relative group">
                <i class="fal fa-angle-double-down"></i>
                <button-extend-all-approval></button-extend-all-approval>
              </div>
            </div>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex items-center justify-between w-full">
          <div>
            <navbar-approval-list-all></navbar-approval-list-all>
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
                <li class="w-44 sub-item" @click="ExportAll()">Xuất tất cả</li>
                <li class="w-44 sub-item">Chọn trường để export</li>
              </ul>
            </div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
          v-if="listAllApproval?.length"
        >
          <tr
            class="bg-white border-b"
            v-for="total in listAllApproval"
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
                class="w-[150px] whitespace-normal overflow-hidden longContent text-[14px]"
                v-html="formatDesc(total)"
              ></div>
            </td>
            <td class="cellTable">{{ formatDate(total.created_at) }}</td>
          </tr>
        </table-responsive>
        <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listAllApproval?.length">
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
        </div>
      </div>
    </template>
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
  <loading-overlay
    :isLoading="LoadingExport"
    :handleEndLoading="EndLoadingExport"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarApproval from "@/components/sidebar/SidebarApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
import NavbarApprovalListAll from "./navbarListAllApproval.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
import ButtonExtendAllApproval from "../AllButton/ButtonExtendAllApproval.vue";
import AvatarCreated from "@/components/constant/AvatarCreated.vue";
import SearchView from "@/components/search/SearchView.vue";
import noData from "@/assets/images/noData.png";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
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
import { useListAllApproval } from "@/store/modules/approval/ListAllApproval";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
import { utils, writeFileXLSX } from "xlsx";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    NavbarApprovalListAll,
    TableResponsive,
    PaginationView,
    ButtonExtendAllApproval,
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
      imgNoData: noData,
      LoadingExport: false,
    };
  },
  methods: {
    ExportAll() {
      this.LoadingExport = true;
      this.total.ExportAllApprovalAction({
        exportFunction: this.exportFile,
        EndTimeLoading: this.EndLoadingExport,
        toast: useToast(),
      });
    },
    formatDesc(total) {
      if (!total.data.desc) {
        return total.data.content;
      } else {
        return total.data.desc;
      }
    },
    EndLoadingExport() {
      this.LoadingExport = false;
    },
    exportFile() {
      let Heading = [
        [
          "Họ và tên",
          "Trạng thái",
          "Danh sách người duyệt",
          "Phòng ban",
          "Vị trí",
          "Chức vụ",
          "Mã NV",
          "Người tạo",
          "Thời gian tạo",
          "Ngày bắt đầu",
          "Ngày kết thúc",
          "Ngày áp dụng",
          "Lý do",
          "Loại đơn",
          "Chi tiết ngày",
          "Mô tả",
        ],
      ];

      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      // if (!ws["!merges"]) ws["!merges"] = [];
      // ws["!merges"].push(utils.decode_range("A1:E1"));
      ws["!cols"] = [
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 40 },
        { width: 30 },
      ];
      const edata = this.exportData.map(function (obj) {
        return {
          personnel_name: obj.personnel_name,
          app_approval_status: obj.app_approval_status,
          user_approval: obj.user_approval,
          department_title: obj.department_title,
          position_title: obj.position_title,
          job_title: obj.job_title,
          personnel_code: obj.personnel_code,
          user_created: obj.user_created,
          created_at: obj.created_at,
          time_start: obj.data ? obj.data.date_start : "",
          time_end: obj.data ? obj.data.date_end : "",
          apply_date: obj.data ? obj.data.date : "",
          reason: obj.data ? obj.data.reason : "",
          app_sub_object: obj.app_sub_object ? obj.app_sub_object : "",
          approval_detail: obj.data ? obj.data.approval_detail : "",
          desc: obj.desc.length < 30000 ? obj.desc : "Mô tả quá dài",
        };
      });
      // console.log(typeof edata[0].desc);
      for (let item of Object.keys(edata)) {
        if (edata[item].app_sub_object == "approval-leave") {
          edata[item].app_sub_object = "Đơn xin nghỉ";
        } else if (edata[item].app_sub_object == "approval-meeting") {
          edata[item].app_sub_object = "Đơn vắng mặt";
        } else if (
          edata[item].app_sub_object == "approval-overtime-application"
        ) {
          edata[item].app_sub_object = "Đơn làm thêm";
        } else if (edata[item].app_sub_object == "approval-shift-register") {
          edata[item].app_sub_object = "Đơn đăng ký ca";
        } else if (edata[item].app_sub_object == "approval-shift-more") {
          edata[item].app_sub_object = "Đơn tăng ca";
        } else if (edata[item].app_sub_object == "approval-shift-change") {
          edata[item].app_sub_object = "Đơn đổi ca";
        } else if (edata[item].app_sub_object == "approval-private-mission") {
          edata[item].app_sub_object = "Đơn công tác";
        } else if (edata[item].app_sub_object == "approval-checkinout") {
          edata[item].app_sub_object = "Đơn check in/out";
        } else if (
          edata[item].app_sub_object == "approval-privilege-application"
        ) {
          edata[item].app_sub_object = "Đơn làm theo chế độ";
        } else if (edata[item].app_sub_object == "approval-leave-application") {
          edata[item].app_sub_object = "Đơn thôi việc";
        }
        if (edata[item].app_approval_status == "WAITING") {
          edata[item].app_approval_status = "Chờ duyệt";
        } else if (edata[item].app_approval_status == "APPROVING") {
          edata[item].app_approval_status = "Đang duyệt";
        } else if (edata[item].app_approval_status == "APPROVED") {
          edata[item].app_approval_status = "Đã duyệt";
        }
      }
      utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, edata, {
        origin: "A2",
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, "Data");
      // const max_width = edata.reduce((w, r) => Math.max(w, r.name.length), 10);
      // ws["!cols"] = [{ wch: max_width }];
      writeFileXLSX(wb, "Approval.xlsx");
    },
    formatApproval(title) {
      const arr = this.listApproval.find((item) => item.code == title);
      return arr ? arr.title : "Upload POSM";
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatReason(total) {
      if (total.app_sub_object == "approval-leave-application") {
        const arr = this.listLeaves.find(
          (item) => item.ID == total.data.reason
        );
        return arr.title;
      } else {
        return "";
      }
    },
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
  },
  setup() {
    const store = useStore();
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
    const isApproved = ref(true);
    const isCreated = ref(false);
    const showRevert = ref(true);
    const isOpenConfirm = ref(false);
    const total = useApprovalTotal();
    const listall = useListAllApproval();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listApproval, exportData } = storeToRefs(total);
    const { listAllApproval, listPagination } = storeToRefs(listall);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    listall.GetListAllApprovalAction({
      key: route.params.key,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/approval-approval-all/type=${to.params.key}`) {
        listall.GetListAllApprovalAction({
          key: to.params.key,
          EndTimeLoading,
        });
      }
    });
    const listLeaves = computed(() => store.state.leaves.listLeaves);
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
      listall.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      listall.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAllApproval.value) {
          checkTotal.value.push(listAllApproval.value[item].ID);
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
      console.log(listApproval);
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
      listall.ConfirmApprovalAction({
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
      listall.ConfirmApprovalAction({
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
      listall.RevertApprovalAction({
        dataApproval,
        toast,
        key: route.params.key,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const handleDeleteApproval = () => {
      listall.DeleteApprovalAction({
        id: totalDetail.value.ID,
        route,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const removeDeleteApproval = () => {
      for (let i = 0; i < checkTotal.value?.length; i++) {
        listall.DeleteApprovalAction({
          id: checkTotal.value[i],
          route,
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkTotal.value.length = 0;
    };
    const handleSearchAll = (dataSearch) => {
      isLoading.value = true;
      listall.SearchAllApprovalAction({
        key: route.params.key,
        search: dataSearch.wordSearch,
        department_ids: dataSearch.department_ids,
        position_ids: dataSearch.position_ids,
        EndTimeLoading,
      });
    };
    return {
      listPagination,
      listAllApproval,
      listApproval,
      exportData,
      isActive,
      checkedAll,
      checkTotal,
      total,
      listLeaves,
      totalDetail,
      isLoading,
      isLoadingShow,
      isOpenQuickView,
      isApproved,
      userProfile,
      isCreated,
      showRevert,
      isOpenConfirm,
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
      ConfirmApproval,
      UnconfirmApproval,
      ReturnApproval,
      EndTimeLoadingShow,
      handleOpenConfirm,
      handleCloseConfirm,
      handleDeleteApproval,
      removeDeleteApproval,
      handleSearchAll,
    };
  },
};
</script>

<style></style>
