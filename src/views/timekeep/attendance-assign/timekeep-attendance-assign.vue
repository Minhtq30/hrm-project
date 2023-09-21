<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="sm:longText max-sm:hidden">Danh sách phân ca làm việc</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature class="max-sm:!min-h-fit"
        ><div class="flex items-center">
          <div>
            <navbar-assign></navbar-assign>
          </div>
        </div>
        <div class="flex">
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-import"></i>
            </div>
            <div class="action-label">Import</div>
            <div
              class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-3 rounded-md">
                <li
                  class="w-64 sub-item"
                  @click="
                    this.$router.push('/timekeep-attendance-assign-import')
                  "
                >
                  Import phân ca cá nhân theo ngày
                </li>
              </ul>
            </div>
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-40 sub-item">Xuất tất cả</li>
                <li class="w-40 sub-item">Chọn trường để xuất</li>
              </ul>
            </div>
          </div>
          <div
            class="btn-icon"
            @click="this.$router.push('/timekeep-setting-shift')"
          >
            <div class="cx">
              <i class="fal fa-cog"></i>
            </div>
            <div class="action-label">Cài đặt</div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listShiftAssign?.length">
          <table-responsive
            :header="headerAll"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="assign in listShiftAssign"
              :key="assign.ID"
              @contextmenu.prevent="rightClick($event, assign)"
              :class="{
                isCheck: CheckedBox(assign.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkAssign"
                    :value="assign.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td
                class="cellTable w-[420px] whitespace-normal cursor-pointer"
                @click="showDetail(assign.ID)"
              >
                {{ assign.title }}
              </td>
              <td class="cellTable">{{ formatTypeShift(assign.type) }}</td>
              <td class="cellTable">{{ formatDate(assign.date_start) }}</td>
              <td class="cellTable">{{ formatDate(assign.date_end) }}</td>
              <td class="cellTable">
                <div
                  class="beacon"
                  :class="formatColor(assign.app_approval_status)"
                >
                  {{ formatStatus(assign.app_approval_status) }}
                </div>
              </td>
              <td class="cellTable">{{ formatDate(assign.created_at) }}</td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div
        class="flex justify-between items-center"
        v-if="listShiftAssign?.length"
      >
        <div class="p-4 text-sm max-sm:w-[160px]">
          Hiển thị {{ listPagination.from }} - {{ listPagination.to }} trong số
          {{ listPagination.total }} bản ghi
        </div>
        <div class="flex justify-end p-4 max-sm:mr-[60px]">
          <pagination-view
            :listPagination="listPagination"
            :NextPage="NextPageAll"
            :PrevPage="PrevPageAll"
          ></pagination-view>
        </div>
      </div>
    </template>
  </person-layout>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="EditAssign()" v-if="isCreated">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()" v-if="isCreated">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
        <li @click.prevent="ConfirmAssign()" v-if="activeFunction">
          <i class="fal fa-check"></i><a href="#">Duyệt phân ca</a>
        </li>
        <li @click.prevent="ReturnAssign()" v-if="showRevert">
          <i class="fal fa-undo"></i> <a href="#">Hoàn duyệt</a>
        </li>
        <li @click.prevent="UnconfirmAssign()" v-if="activeFunction">
          <i class="fal fa-ban"></i><a href="#">Không duyệt</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteAssign"
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
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import navbarAssign from "@/views/timekeep/attendance-assign/navbar-attendance-assign.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import SearchView from "@/components/search/SearchView.vue";
import { ref, watch } from "@vue/runtime-core";
import {
  CheckUserCreateApproval,
  FormatColorApproval,
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatStatusApproval,
  HideShowFunctionAssignContextmenu,
  ShowRevertAssignApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useShiftAssign } from "@/store/modules/timekeep/shiftAssign";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    navbarAssign,
    NavFeature,
    TableResponsive,
    SearchView,
  },
  data() {
    return {
      headerAll: [
        "Tiêu đề",
        "Kiểu phân ca",
        "Từ ngày",
        "Đến ngày",
        "Trạng thái",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatTypeShift(index) {
      if (index == "PERSON") {
        return "Phân ca cho cá nhân";
      } else {
        return "Phân ca cho phòng ban, vị trí";
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
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isActive = ref(false);
    const checkAssign = ref([]);
    const checkedAll = ref(false);
    const assignDetailID = ref();
    const activeFunction = ref(true);
    const showRevert = ref(true);
    const isCreated = ref(false);
    const isOpenConfirm = ref(false);
    const assign = useShiftAssign();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listShiftAssign, listPagination } = storeToRefs(assign);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    assign.GetAllShiftAssignAction({
      key: route.params.key,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/timekeep-attendance-assign/type=${to.params.key}`) {
        assign.GetAllShiftAssignAction({
          key: to.params.key,
          EndTimeLoading,
        });
      }
    });
    const CheckedBox = (index) => {
      if (index == checkAssign.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listShiftAssign.value) {
          checkAssign.value.push(listShiftAssign.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAssign.value.splice(0, checkAssign.value.length);
      }
    };
    const rightClick = (e, assign) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        assignDetailID.value = assign.ID;
        activeFunction.value = HideShowFunctionAssignContextmenu(
          assign,
          userProfile.value
        );
        showRevert.value = ShowRevertAssignApproval(assign, userProfile.value);
        isCreated.value = CheckUserCreateApproval(assign, userProfile.value);
      }
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const EditAssign = () => {
      router.push(`/timekeep-attendance-assign-edit/${assignDetailID.value}`);
    };
    const DeleteAssign = () => {
      assign.deleteShiftAssignAction({
        data: assignDetailID.value,
        route,
        router,
        toast,
        EndTimeLoading: EndTimeLoadingShow,
        handleCloseConfirm,
      });
    };
    const NextPageAll = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      assign.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPageAll = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      assign.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const showDetail = (id) => {
      router.push(`/timekeep-attendance-assign-detail/${id}`);
    };
    const ConfirmAssign = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataAssign = {
        id: assignDetailID.value,
        data: data,
      };
      assign.ConfirmAttendanceAssignListAction({
        dataAssign,
        toast,
        key: route.params.key,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const UnconfirmAssign = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "NO_APPROVED",
      };
      const dataAssign = {
        id: assignDetailID.value,
        data: data,
      };
      assign.ConfirmAttendanceAssignListAction({
        dataAssign,
        toast,
        key: route.params.key,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const ReturnAssign = () => {
      isLoadingShow.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "REVERT",
      };
      const dataAssign = {
        id: assignDetailID.value,
        data: data,
      };
      assign.RevertAttendanceAssignListAction({
        dataAssign,
        toast,
        key: route.params.key,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      const data = {
        key: route.params.key,
        search: dataSearch.wordSearch,
      };
      assign.SearchAllShiftAssignAction({
        data: data,
        EndTimeLoading,
      });
    };
    return {
      listShiftAssign,
      assignDetailID,
      checkAssign,
      isActive,
      isLoading,
      isLoadingShow,
      checkedAll,
      listPagination,
      activeFunction,
      userProfile,
      showRevert,
      isCreated,
      CheckedBox,
      rightClick,
      EditAssign,
      checkedAllItem,
      DeleteAssign,
      NextPageAll,
      PrevPageAll,
      showDetail,
      EndTimeLoading,
      EndTimeLoadingShow,
      ConfirmAssign,
      UnconfirmAssign,
      ReturnAssign,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
      isOpenConfirm,
    };
  },
};
</script>

<style></style>
