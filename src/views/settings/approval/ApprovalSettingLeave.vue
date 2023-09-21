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
              title="Tạo mới lý do xin nghỉ"
            ></div>
            <p class="longText">Danh sách lý do xin nghỉ</p>
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
            @click="RemoveLeave"
            v-if="checkLeave.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listLeaves?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="leave in listLeaves"
              :key="leave.ID"
              @contextmenu.prevent="rightClick($event, leave)"
              :class="{
                isCheck: CheckedBox(leave.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkLeave"
                    :value="leave.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ leave.title }}
              </td>
              <td class="cellTable">
                {{ formatType(leave.max_day, leave.type_day) }}
              </td>
              <td class="cellTable">
                {{ formatTrueFalse(leave.has_attendance) }}
              </td>
              <td class="cellTable">
                {{ formatActive(leave.active) }}
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">Tạo mới lý do xin nghỉ</h1>
        <div class="text-left p-4">
          <div class="form-small">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="leave.title"
              />
            </div>
          </div>
          <div class="form-small grid grid-cols-2 gap-2">
            <div>
              <label for="">Ký hiệu</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Ký hiệu"
                  v-model="leave.sign"
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
                  placeholder="Ký hiệu"
                  v-model="leave.max_day"
                />
              </div>
            </div>
          </div>
          <div class="form-small grid grid-cols-2 gap-2">
            <div>
              <label for="">Đơn vị</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="leave.type_day"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option
                    v-for="(item, index) in typeDay"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label for="">Tính công</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="leave.has_attendance"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option value="0">Không</option>
                  <option value="1">Có</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="leave.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="leave.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createLeave()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div>
        <h1 class="header-modal">Cập nhật lý do xin nghỉ</h1>
        <div class="text-left p-4">
          <div class="form-small">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="leaveDetail.title"
              />
            </div>
          </div>
          <div class="form-small grid grid-cols-2 gap-2">
            <div>
              <label for="">Ký hiệu</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Ký hiệu"
                  v-model="leaveDetail.sign"
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
                  placeholder="Ký hiệu"
                  v-model="leaveDetail.max_day"
                />
              </div>
            </div>
          </div>
          <div class="form-small grid grid-cols-2 gap-2">
            <div>
              <label for="">Đơn vị</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="leaveDetail.type_day"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option
                    v-for="(item, index) in typeDay"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label for="">Tính công</label>
              <div class="mt-1">
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="leaveDetail.has_attendance"
                >
                  <option value="" disabled selected>Chọn</option>
                  <option value="0">Không</option>
                  <option value="1">Có</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="leaveDetail.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="leaveDetail.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateLeave()">Cập nhật</button>
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
      :ConfirmDelete="deleteLeave"
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
import {
  FormatModalX,
  FormatModalY,
  FormatStatus,
  FormatTrueFalse,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
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
      header: ["Lý do", "Tối đa", "Tính công", "Trạng thái"],
    };
  },
  setup() {
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkLeave = ref([]);
    const leaveDetail = ref({});
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const reasonLeave = useReasonLeave();
    const { listLeaves, typeDay } = storeToRefs(reasonLeave);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    reasonLeave.GetAllLeavesEndTimeLoadingAction({
      EndTimeLoading,
    });
    const leave = reactive({
      title: "",
      sign: "",
      max_day: null,
      type_day: "",
      has_attendance: 0,
      active: 0,
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      leave.title = "";
      leave.sign = "";
      leave.max_day = null;
      leave.type_day = "";
      leave.has_attendance = 0;
      leave.active = 0;
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
    const rightClick = (e, leave) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        leaveDetail.value = leave;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkLeave.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listLeaves.value) {
          checkLeave.value.push(listLeaves.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkLeave.value.splice(0, checkLeave.value.length);
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      reasonLeave.SearchLeavesAction(dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const createLeave = () => {
      const data = {
        title: leave.title,
        sign: leave.sign,
        max_day: leave.max_day,
        type_day: leave.type_day,
        has_attendance: leave.has_attendance,
        active: leave.active,
      };
      if (leave.title.length > 0) {
        reasonLeave.createLeaveAction({
          data,
          toast,
          handleCloseDetail,
          EndTimeLoading,
        });
      } else {
        toast.error("Vui lòng nhập lý do xin nghỉ");
      }
    };
    const updateLeave = () => {
      reasonLeave.updateLeaveAction({
        data: leaveDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteLeave = () => {
      reasonLeave.deleteLeaveAction({
        id: leaveDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkLeave.value.length = 0;
    };
    const RemoveLeave = () => {
      for (var i = 0; i < checkLeave.value.length; i++) {
        reasonLeave.deleteLeaveAction({
          id: checkLeave.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkLeave.value.length = 0;
    };
    // Start format all
    const formatActive = (status) => {
      return FormatStatus(status);
    };
    const formatTrueFalse = (status) => {
      return FormatTrueFalse(status);
    };
    const formatType = (day, type) => {
      const arr = typeDay.value.find((item) => item.value == type);
      if (day == null) {
        return "Không giới hạn";
      } else {
        return day + " " + arr.name;
      }
    };
    // End format all
    return {
      checkLeave,
      checkedAll,
      listLeaves,
      typeDay,
      leave,
      isOpenDetail,
      isOpenUpdate,
      isActive,
      isLoading,
      leaveDetail,
      isOpenConfirm,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      CheckedBox,
      formatActive,
      formatTrueFalse,
      formatType,
      createLeave,
      updateLeave,
      deleteLeave,
      RemoveLeave,
      checkedAllItem,
      rightClick,
      handleSearch,
      EndTimeLoading,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
