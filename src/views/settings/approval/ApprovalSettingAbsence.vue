<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-approval></sidebar-setting-approval>
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
              @click="handleOpenDetail"
              title="Tạo mới lý do vắng mặt"
            ></div>
            <p class="longText">Danh sách lý do vắng mặt</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex">
          <div class="btn-icon" title="Import">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveAbsence"
            v-if="checkAbsence.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listAbsences?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="absence in listAbsences"
              :key="absence.ID"
              @contextmenu.prevent="rightClick($event, absence)"
              :class="{
                isCheck: CheckedBox(absence.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkAbsence"
                    :value="absence.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ absence.title }}
              </td>
              <td class="cellTable">
                {{ formatType(absence.max_time, absence.unit) }}
              </td>
              <td class="cellTable">
                {{ formatTrueFalse(absence.has_attendance) }}
              </td>
              <td class="cellTable">
                {{ formatTrueFalse(absence.required_finger) }}
              </td>
              <td class="cellTable">
                {{ formatTrueFalse(absence.has_attendance) }}
              </td>
              <td class="cellTable">
                {{ formatActive(absence.active) }}
              </td>
            </tr>
          </table-responsive>
        </div>
        <div class="text-left p-4" v-else>Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">cập nhật lý do</h1>
        <div class="text-left p-4">
          <div class="form-large">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="absence.title"
              />
            </div>
          </div>
          <div class="form-large grid grid-cols-4 gap-2">
            <div>
              <label for="">Ký hiệu</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Ký hiệu"
                  v-model="absence.sign"
                />
              </div>
            </div>
            <div>
              <label for="">Tối đa</label>
              <div class="mt-1">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số lần"
                  v-model="absence.max_time"
                />
              </div>
            </div>
            <div class="col-span-2">
              <label for="">Đơn vị</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="absence.unit"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option
                    v-for="(item, index) in typeInout"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-large grid grid-cols-3 gap-2">
            <div>
              <label for="">Hạn làm đơn</label>
              <div class="mt-1">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số ngày"
                  v-model="absence.max_day"
                />
              </div>
            </div>
            <div>
              <label for="">Tính công</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="absence.has_attendance"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option value="0">Không</option>
                  <option value="1">Có</option>
                </select>
              </div>
            </div>
            <div>
              <label for="">Yêu cầu chốt vân tay</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="absence.required_finger"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option value="0">Không</option>
                  <option value="1">Có</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-large flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="absence.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="absence.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createAbsence()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div>
        <h1 class="header-modal">tạo mới loại phụ cấp</h1>
        <div class="text-left p-4">
          <div class="form-large">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="absenceDetail.title"
              />
            </div>
          </div>
          <div class="form-large grid grid-cols-4 gap-2">
            <div>
              <label for="">Ký hiệu</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Ký hiệu"
                  v-model="absenceDetail.sign"
                />
              </div>
            </div>
            <div>
              <label for="">Tối đa</label>
              <div class="mt-1">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số lần"
                  v-model="absenceDetail.max_time"
                />
              </div>
            </div>
            <div class="col-span-2">
              <label for="">Đơn vị</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="absenceDetail.unit"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option
                    v-for="(item, index) in typeInout"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-large grid grid-cols-3 gap-2">
            <div>
              <label for="">Hạn làm đơn</label>
              <div class="mt-1">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số ngày"
                  v-model="absenceDetail.max_day"
                />
              </div>
            </div>
            <div>
              <label for="">Tính công</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="absenceDetail.has_attendance"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option value="0">Không</option>
                  <option value="1">Có</option>
                </select>
              </div>
            </div>
            <div>
              <label for="">Yêu cầu chốt vân tay</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="absenceDetail.required_finger"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option value="0">Có</option>
                  <option value="1">Không</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-large flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="absenceDetail.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="absenceDetail.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateAbsence()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteAbsence"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="handleOpenUpdate()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingApproval from "@/components/sidebar/SidebarSettingApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import { reactive, ref } from "@vue/reactivity";
import { FormatStatus, FormatTrueFalse } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useReasonAbsences } from "@/store/modules/settingApproval/ReasonAbsences";
import { useReasonInout } from "@/store/modules/settingApproval/ReasonInout";
import { storeToRefs } from "pinia";
export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingApproval,
    NavbarSocial,
    SearchView,
  },
  data() {
    return {
      header: [
        "Lý do",
        "Tối đa",
        "Tính công",
        "Chốt vân tay",
        "Phạt tiền",
        "Trạng thái",
      ],
    };
  },
  setup() {
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkAbsence = ref([]);
    const absenceDetail = ref({});
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const reason_absence = useReasonAbsences();
    const reasonInout = useReasonInout();
    const { typeInout } = storeToRefs(reasonInout);
    const { listAbsences } = storeToRefs(reason_absence);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    reason_absence.GetAllAbsencesEndTimeLoadingAction({
      EndTimeLoading,
    });
    const absence = reactive({
      title: "",
      sign: "",
      max_time: null,
      max_day: null,
      unit: "",
      has_attendance: 0,
      required_finger: 0,
      active: 0,
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      absence.title = "";
      absence.sign = "";
      absence.max_time = null;
      absence.max_day = null;
      absence.unit = "";
      absence.has_attendance = 0;
      absence.required_finger = 0;
      absence.active = 0;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const rightClick = (e, absence) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        absenceDetail.value = absence;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAbsence.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAbsences.value) {
          checkAbsence.value.push(listAbsences.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAbsence.value.splice(0, checkAbsence.value.length);
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      reason_absence.SearchAbsencesAction(dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const createAbsence = () => {
      const data = {
        title: absence.title,
        sign: absence.sign,
        max_day: absence.max_day,
        max_time: absence.max_time,
        unit: absence.unit,
        has_attendance: absence.has_attendance,
        required_finger: absence.required_finger,
        active: absence.active,
      };
      if (absence.title?.length > 0) {
        reason_absence.createAbsenceAction({
          data: data,
          toast,
          handleCloseDetail,
          EndTimeLoading,
        });
      } else {
        toast.error("Vui lòng nhập lý do vắng mặt");
      }
    };
    const updateAbsence = () => {
      reason_absence.updateAbsenceAction({
        data: absenceDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteAbsence = () => {
      reason_absence.deleteAbsenceAction({
        id: absenceDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkAbsence.value.length = 0;
    };
    const RemoveAbsence = () => {
      for (var i = 0; i < checkAbsence.value.length; i++) {
        reason_absence.deleteAbsenceAction({
          id: checkAbsence.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkAbsence.value.length = 0;
    };
    // Start format all
    const formatActive = (status) => {
      return FormatStatus(status);
    };
    const formatTrueFalse = (status) => {
      return FormatTrueFalse(status);
    };
    const formatType = (time, type) => {
      const arr = typeInout.value.find((item) => item.value == type);
      if (time == null) {
        return "Không giới hạn";
      } else {
        return "Tối đa" + " " + time + " lần / " + arr.name;
      }
    };
    // End format all
    return {
      checkAbsence,
      checkedAll,
      listAbsences,
      typeInout,
      absence,
      isOpenDetail,
      isOpenUpdate,
      isActive,
      isLoading,
      absenceDetail,
      isOpenConfirm,
      EndTimeLoading,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      CheckedBox,
      formatActive,
      formatTrueFalse,
      formatType,
      createAbsence,
      updateAbsence,
      deleteAbsence,
      RemoveAbsence,
      checkedAllItem,
      rightClick,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
