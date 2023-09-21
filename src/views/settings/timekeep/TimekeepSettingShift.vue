<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-timekeep></sidebar-setting-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <div
              class="button-create"
              @click="this.$router.push('/timekeep-setting-shift/add')"
              title="Tạo mới ca làm việc"
            ></div>
            <p class="longText">Danh sách ca làm việc</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex">
          <div class="btn-icon" title="Import">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveShift"
            v-if="checkShift.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-down">
      <div class="home w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="shift in listShifts"
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
                  v-model="checkShift"
                  :value="shift.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable">
              {{ shift.code }}
            </td>
            <td class="cellTable">
              {{ shift.title }}
            </td>
            <td class="cellTable"></td>
            <td class="cellTable">{{ shift.time_start }}</td>
            <td class="cellTable">{{ shift.time_end }}</td>
            <td class="cellTable">{{ shift.time_break_start }}</td>
            <td class="cellTable">{{ shift.time_break_end }}</td>
            <td class="cellTable">{{ shift.total_hour }}</td>
            <td class="cellTable">{{ shift.number_work }}</td>
            <td class="cellTable">{{ shift.number_work }}</td>
          </tr>
        </table-responsive>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteShift"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li
          @click.prevent="
            this.$router.push(`/timekeep-setting-shift/edit=${shiftDetail.ID}`)
          "
        >
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
        <li @click.prevent="ReplicationShift()">
          <i class="fal fa-window-restore"></i><a href="#">Nhân bản</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingReload"
    :handleEndLoading="EndTimeLoadingReload"
  ></loading-overlay>
</template>
<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingTimekeep from "@/components/sidebar/SidebarSettingTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
import {
  FormatModalX,
  FormatModalY,
  FormatStatus,
  FormatTrueFalse,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import SearchView from "@/components/search/SearchView.vue";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { storeToRefs } from "pinia";
export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingTimekeep,
    NavbarSocial,
    SearchView,
  },
  data() {
    return {
      header: [
        "Mã ca",
        "Tên ca",
        "Giờ linh hoạt",
        "Giờ vào",
        "Giờ ra",
        "Giờ nghỉ",
        "Giờ kết thúc nghỉ",
        "Tổng giờ",
        "Tổng công",
        "Tính công",
      ],
    };
  },
  setup() {
    const toast = useToast();
    const isLoading = ref(true);
    const isLoadingReload = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkShift = ref([]);
    const shiftDetail = ref({});
    const isOpenConfirm = ref(false);
    const time = ref("00:00");
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingReload = () => {
      isLoadingReload.value = false;
    };
    tk_shift.GetAllShiftsEndTimeLoadingAction({ EndTimeLoading });
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const rightClick = (e, shift) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        shiftDetail.value = shift;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkShift.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listShifts.value) {
          checkShift.value.push(listShifts.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkShift.value.splice(0, checkShift.value.length);
      }
    };
    const deleteShift = () => {
      tk_shift.deleteShiftAction({
        id: shiftDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkShift.value.length = 0;
    };
    const RemoveShift = () => {
      for (var i = 0; i < checkShift.value.length; i++) {
        tk_shift.deleteShiftAction({
          id: checkShift.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkShift.value.length = 0;
    };
    const ReplicationShift = () => {
      isLoadingReload.value = true;
      tk_shift.ReplicationShiftAction({
        id: shiftDetail.value.ID,
        toast,
        EndTimeLoading: EndTimeLoadingReload,
      });
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      tk_shift.SearchShiftAction({
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    // Start format all
    const formatActive = (status) => {
      return FormatStatus(status);
    };
    const formatTrueFalse = (status) => {
      return FormatTrueFalse(status);
    };
    // End format all
    return {
      time,
      checkShift,
      checkedAll,
      listShifts,
      isActive,
      shiftDetail,
      isLoading,
      isOpenConfirm,
      EndTimeLoading,
      CheckedBox,
      formatActive,
      formatTrueFalse,
      deleteShift,
      RemoveShift,
      checkedAllItem,
      rightClick,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
      ReplicationShift,
      isLoadingReload,
      EndTimeLoadingReload,
    };
  },
};
</script>
