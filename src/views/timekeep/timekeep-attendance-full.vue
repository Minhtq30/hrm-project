<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="longText">Danh sách nhân sự được tự động chấm công</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature
        ><div class="flex items-center"></div>
        <div class="flex">
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-10 right-0 top-12 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-52 sub-item">Xuất tất cả</li>
                <li class="w-52 sub-item">Chọn trường để export</li>
              </ul>
            </div>
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-import"></i>
            </div>
            <div class="action-label">Import</div>
            <div
              class="absolute z-10 right-0 top-12 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-52 sub-item">Import tự động chấm công</li>
                <li class="w-52 sub-item">Xem lịch sử import</li>
              </ul>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <table-responsive
          :header="headerAll"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            v-for="person in listAttendanceFull"
            :key="person.ID"
            :class="{
              isCheck: CheckedBox(person.ID),
            }"
            @contextmenu.prevent="rightClick($event, person)"
            class="bg-white border-b"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkAttendance"
                  :value="person.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td
              class="cellTable cursor-pointer"
              @click="showDetailPersonnel(person.personnel_id)"
            >
              {{ person.personnel_code }}
            </td>
            <td
              class="cellTable cursor-pointer"
              @click="showDetailPersonnel(person.personnel_id)"
            >
              {{ person.personnel_name }}
            </td>
            <td class="cellTable">{{ formatDate(person.date_start) }}</td>
            <td class="cellTable">{{ formatDate(person.date_end) }}</td>
            <td class="cellTable">{{ person.department_title }}</td>
            <td class="cellTable">{{ person.position_title }}</td>
            <td class="cellTable">{{ person.job_title }}</td>
          </tr>
        </table-responsive>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listAttendanceFull?.length">
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
        <li @click.prevent="handleOpenEdit()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <modal-view :isOpen="isOpenEdit" :handleCloseDetail="handleCloseEdit">
      <div>
        <h1 class="header-modal">cập nhật tự động chấm công</h1>
        <div class="text-left p-4">
          <div class="form-small">
            <label for="" class="form-group-label col-span-3">Nhân sự</label>
            <div>
              <v-select
                label="name"
                :options="listPersonnelsAttendanceFull"
                :reduce="(personnel) => personnel.ID"
                @search="loadPersonnel"
                @option:selected="changeInputPersonnel($event)"
                :filterable="false"
                placeholder="Tìm mã, họ tên"
                class="rounded-3xl"
                v-model="assignDetailID.personnel_id"
              >
                <template #option="{ code, name }">
                  <div style="display: flex; align-items: baseline">
                    <strong>{{ code }}</strong>
                    <em style="margin-left: 0.5rem">- {{ name }}</em>
                  </div>
                </template>
              </v-select>
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Mã NV</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Mã NV"
                v-model="assignDetailID.personnel_code"
              />
            </div>
          </div>
          <div class="form-small grid grid-cols-2 gap-2">
            <div>
              <label for="" class="form-group-label col-span-1">Từ ngày</label>
              <div>
                <date-picker v-model="assignDetailID.date_start"></date-picker>
              </div>
            </div>
            <div>
              <label for="" class="form-group-label col-span-1">Đến ngày</label>
              <div>
                <date-picker v-model="assignDetailID.date_end"></date-picker>
              </div>
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Phòng ban</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Phòng ban"
                :value="assignDetailID.department_title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Vị trí</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Vị trí"
                :value="assignDetailID.position_title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Chức vụ</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="disabledInput p-3 w-full"
                disabled
                placeholder="Chức vụ"
                :value="assignDetailID.job_title"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateAttendance()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseEdit">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteAttendance"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import _ from "lodash";
import { ref } from "@vue/runtime-core";
import { FormatDate, FormatModalX, FormatModalY } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAttendanceFull } from "@/store/modules/timekeep/attendanceFull";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    NavFeature,
    TableResponsive,
    datePicker,
  },
  data() {
    return {
      headerAll: [
        "Mã NV",
        "Họ và tên",
        "Bắt đầu",
        "Kết thúc",
        "Phòng ban",
        "Vị trí",
        "Chức vụ",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(true);
    const isActive = ref(false);
    const checkAttendance = ref([]);
    const checkedAll = ref(false);
    const assignDetailID = ref();
    const isOpenConfirm = ref(false);
    const isOpenEdit = ref(false);
    const attendanceFull = useAttendanceFull();
    const { listAttendanceFull, listPagination, listPersonnelsAttendanceFull } =
      storeToRefs(attendanceFull);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    attendanceFull.GetAllAttendanceFullAction({
      EndTimeLoading,
    });
    const CheckedBox = (index) => {
      if (index == checkAttendance.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAttendanceFull.value) {
          checkAttendance.value.push(listAttendanceFull.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAttendance.value.splice(0, checkAttendance.value.length);
      }
    };
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
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
        assignDetailID.value = assign;
      }
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      attendanceFull.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      attendanceFull.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const showDetailPersonnel = (id) => {
      router.push(`/personnelDetail/${id}`);
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleCloseEdit = () => {
      isOpenEdit.value = false;
    };
    const handleOpenEdit = () => {
      isOpenEdit.value = true;
      const data = {
        search: assignDetailID.value.personnel_code,
        key: "WORKING",
      };
      attendanceFull.SearchAttendanceFullAction(data);
    };
    const loadPersonnel = _.debounce((search, loading) => {
      if (search.length > 0) {
        loading(true);
        const data = {
          search: search,
          key: "WORKING",
        };
        attendanceFull.SearchPersonnelsAttendanceFullAction({
          data,
          loading,
        });
      }
    }, 300);
    const changeInputPersonnel = (e) => {
      assignDetailID.value.personnel_code = e.code;
      assignDetailID.value.department_title = e.department;
      assignDetailID.value.position_title = e.position;
      assignDetailID.value.job_title = e.job_title_current;
    };
    const DeleteAttendance = () => {
      attendanceFull.DeleteAttendanceFullAction({
        id: assignDetailID.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const UpdateAttendance = () => {
      const data = {
        ID: assignDetailID.value.ID,
        data: {
          personnel_id: assignDetailID.value.personnel_id,
          date_start: assignDetailID.value.date_start,
          date_end: assignDetailID.value.date_end,
        },
      };
      if (assignDetailID.value.personnel_id != null) {
        if (assignDetailID.value.date_start == null) {
          toast.warning("Vui lòng chọn ngày bắt đầu");
        } else {
          attendanceFull.UpdateAttendanceFullAction({
            data: data,
            toast,
            EndTimeLoading,
            handleCloseEdit,
          });
        }
      } else {
        toast.error("Vui lòng chọn nhân sự");
      }
    };
    return {
      listAttendanceFull,
      isOpenConfirm,
      assignDetailID,
      checkAttendance,
      isActive,
      isLoading,
      checkedAll,
      listPagination,
      isOpenEdit,
      listPersonnelsAttendanceFull,
      CheckedBox,
      checkRoute,
      rightClick,
      checkedAllItem,
      EndTimeLoading,
      NextPage,
      PrevPage,
      showDetailPersonnel,
      handleCloseConfirm,
      handleOpenConfirm,
      DeleteAttendance,
      handleCloseEdit,
      handleOpenEdit,
      loadPersonnel,
      changeInputPersonnel,
      UpdateAttendance,
    };
  },
};
</script>

<style></style>
