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
              title="Tạo mới lý do check in/out"
            ></div>
            <p class="longText">Danh sách lý do checkin/out</p>
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
            @click="RemoveInout"
            v-if="checkInout.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listInout?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="inout in listInout"
              :key="inout.ID"
              @contextmenu.prevent="rightClick($event, inout)"
              :class="{
                isCheck: CheckedBox(inout.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkInout"
                    :value="inout.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ inout.title }}
              </td>
              <td class="cellTable">
                {{ formatType(inout.max_time, inout.unit) }}
              </td>
              <td class="cellTable">
                {{ formatTrueFalse(inout.has_attendance) }}
              </td>
              <td class="cellTable">
                {{ formatActive(inout.active) }}
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
                v-model="inout.title"
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
                  v-model="inout.sign"
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
                  v-model="inout.max_time"
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
                  v-model="inout.unit"
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
          <div class="form-large grid grid-cols-2 gap-2">
            <div>
              <label for="">Hạn làm đơn</label>
              <div class="mt-1">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số ngày"
                  v-model="inout.max_day"
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
                  v-model="inout.has_attendance"
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
                v-model="inout.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="inout.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createInout()">Cập nhật</button>
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
                v-model="inoutDetail.title"
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
                  v-model="inoutDetail.sign"
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
                  v-model="inoutDetail.max_time"
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
                  v-model="inoutDetail.unit"
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
          <div class="form-large grid grid-cols-2 gap-2">
            <div>
              <label for="">Hạn làm đơn</label>
              <div class="mt-1">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số ngày"
                  v-model="inoutDetail.max_day"
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
                  v-model="inoutDetail.has_attendance"
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
                v-model="inoutDetail.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="inoutDetail.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateInout()">Cập nhật</button>
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
      :ConfirmDelete="deleteInout"
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
      header: ["Lý do", "Tối đa", "Tính công", "Trạng thái"],
    };
  },
  setup() {
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkInout = ref([]);
    const inoutDetail = ref({});
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const reasonInout = useReasonInout();
    const { listInout, typeInout } = storeToRefs(reasonInout);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    reasonInout.GetAllInoutEndTimeLoadingAction({ EndTimeLoading });
    const inout = reactive({
      title: "",
      sign: "",
      max_time: null,
      max_day: null,
      unit: "month",
      has_attendance: 0,
      active: 0,
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      inout.title = "";
      inout.sign = "";
      inout.max_time = null;
      inout.max_day = null;
      inout.unit = "month";
      inout.has_attendance = 0;
      inout.active = 0;
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
    const rightClick = (e, inout) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        inoutDetail.value = inout;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkInout.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listInout.value) {
          checkInout.value.push(listInout.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkInout.value.splice(0, checkInout.value.length);
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      reasonInout.SearchInoutAction(dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const createInout = () => {
      const data = {
        title: inout.title,
        sign: inout.sign,
        max_day: inout.max_day,
        max_time: inout.max_time,
        unit: inout.unit,
        has_attendance: inout.has_attendance,
        active: inout.active,
      };
      if (inout.title.length > 0) {
        reasonInout.createInoutAction({
          data: data,
          toast,
          handleCloseDetail,
          EndTimeLoading,
        });
      } else {
        toast.error("Vui lòng nhập lý do check in/out");
      }
    };
    const updateInout = () => {
      reasonInout.updateInoutAction({
        data: inoutDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteInout = () => {
      reasonInout.deleteInoutAction({
        id: inoutDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkInout.value.length = 0;
    };
    const RemoveInout = () => {
      for (var i = 0; i < checkInout.value.length; i++) {
        reasonInout.deleteInoutAction({
          id: checkInout.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkInout.value.length = 0;
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
      if (arr) {
        if (time == null) {
          return "Không giới hạn";
        } else {
          return "Tối đa" + " " + time + " lần / " + arr.name;
        }
      } else {
        return "";
      }
    };
    // End format all
    return {
      checkInout,
      checkedAll,
      listInout,
      typeInout,
      inout,
      isOpenDetail,
      isOpenUpdate,
      isActive,
      inoutDetail,
      isLoading,
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
      createInout,
      updateInout,
      deleteInout,
      RemoveInout,
      checkedAllItem,
      rightClick,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
