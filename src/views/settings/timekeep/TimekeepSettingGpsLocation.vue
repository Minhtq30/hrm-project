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
              @click="handleOpenDetail"
              title="Tạo mới địa điểm chấm công"
            ></div>
            <div class="longText">Danh sách địa điểm chấm công GPS</div>
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
            @click="RemoveGpsLocation()"
            v-if="checkLocation.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="location in listGPSLocation"
            :key="location.ID"
            @contextmenu.prevent="rightClick($event, location)"
            :class="{
              isCheck: CheckedBox(location.ID),
            }"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkLocation"
                  :value="location.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable w-80 whitespace-normal">
              {{ location.title }}
            </td>
            <td class="cellTable w-20">
              {{ location.longitude }}
            </td>
            <td class="cellTable w-20">{{ location.latitude }}</td>
            <td class="cellTable text-center w-16">{{ location.radius }}</td>
            <td class="cellTable whitespace-normal w-96">
              {{ location.note }}
            </td>
          </tr>
        </table-responsive>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">Tạo mới địa điểm</h1>
        <div class="text-left p-4">
          <div class="form-large grid grid-cols-12 gap-2">
            <div class="col-span-2">
              <label for="" class="form-group-label"
                >Mã địa điểm<span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập mã địa điểm"
                  v-model="location.code"
                />
              </div>
            </div>
            <div class="col-span-10">
              <label for="" class="form-group-label"
                >Tên địa điểm <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập tên địa điểm"
                  v-model="location.title"
                />
              </div>
            </div>
          </div>
          <div class="form-large grid grid-cols-12 gap-2">
            <div class="col-span-2">
              <label for="" class="form-group-label"
                >Bán kính <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập bán kính"
                  v-model="location.radius"
                />
              </div>
            </div>
            <div class="col-span-5">
              <label for="" class="form-group-label"
                >Kinh độ <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập kinh độ"
                  v-model="location.longitude"
                />
              </div>
            </div>
            <div class="col-span-5">
              <label for="" class="form-group-label"
                >Vĩ độ <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập vĩ độ"
                  v-model="location.latitude"
                />
              </div>
            </div>
          </div>
          <div class="form-large">
            <div>
              <label for="" class="form-group-label">Ghi chú</label>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="5"
                  class="form-control-input"
                  v-model="location.note"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createGpsLocation()">
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
          <div class="form-large grid grid-cols-12 gap-2">
            <div class="col-span-2">
              <label for="" class="form-group-label"
                >Mã địa điểm<span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập mã"
                  v-model="locationDetail.code"
                />
              </div>
            </div>
            <div class="col-span-10">
              <label for="" class="form-group-label"
                >Tên địa điểm <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập tên địa điểm"
                  v-model="locationDetail.title"
                />
              </div>
            </div>
          </div>
          <div class="form-large grid grid-cols-12 gap-2">
            <div class="col-span-2">
              <label for="" class="form-group-label"
                >Bán kính <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập bán kính"
                  v-model="locationDetail.radius"
                />
              </div>
            </div>
            <div class="col-span-5">
              <label for="" class="form-group-label"
                >Kinh độ <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập kinh độ"
                  v-model="locationDetail.longitude"
                />
              </div>
            </div>
            <div class="col-span-5">
              <label for="" class="form-group-label"
                >Vĩ độ <span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập vĩ độ"
                  v-model="locationDetail.latitude"
                />
              </div>
            </div>
          </div>
          <div class="form-large">
            <div>
              <label for="" class="form-group-label">Ghi chú</label>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="5"
                  class="form-control-input"
                  v-model="locationDetail.note"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateGpsLocation()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate()">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteGpsLocation"
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
import SidebarSettingTimekeep from "@/components/sidebar/SidebarSettingTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import { reactive, ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { FormatModalX, FormatModalY } from "@/constants/FormatAll";
import { useGpsLocation } from "@/store/modules/settingTimekeep/gpslocation";
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
        "Địa điểm",
        "Kinh độ",
        "Vĩ độ",
        "Bán kính cho phép(m)",
        "Ghi chú",
      ],
    };
  },
  setup() {
    const toast = useToast();
    const isLoading = ref(true);
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkLocation = ref([]);
    const locationDetail = ref({});
    const isOpenConfirm = ref(false);
    const gps = useGpsLocation();
    const { listGPSLocation } = storeToRefs(gps);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    gps.GetAllGPSLocationEndTimeLoadingAction({ EndTimeLoading });
    const location = reactive({
      code: "",
      title: "",
      latitude: "",
      longitude: "",
      radius: "",
      note: "",
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      location.title = "";
      location.latitude = "";
      location.longitude = "";
      location.radius = "";
      location.note = "";
      location.code = "";
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
    const rightClick = (e, location) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        locationDetail.value = location;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkLocation.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listGPSLocation.value) {
          checkLocation.value.push(listGPSLocation.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkLocation.value.splice(0, checkLocation.value.length);
      }
    };
    const createGpsLocation = () => {
      const data = {
        title: location.title,
        latitude: location.latitude,
        longitude: location.longitude,
        radius: location.radius,
        note: location.note,
        code: location.code,
      };
      if (location.title.length > 0) {
        if (location.latitude.length > 0 && location.longitude.length > 0) {
          gps.createGPSLocationAction({
            data: data,
            toast,
            handleCloseDetail,
            EndTimeLoading,
          });
        } else {
          toast.error("Vui lòng nhập kinh độ và vĩ độ");
        }
      } else {
        toast.error("Vui lòng nhập địa điểm chấm công");
      }
    };
    const updateGpsLocation = () => {
      gps.updateGPSLocationAction({
        data: locationDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteGpsLocation = () => {
      gps.deleteGPSLocationAction({
        id: locationDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkLocation.value.length = 0;
    };
    const RemoveGpsLocation = () => {
      for (var i = 0; i < checkLocation.value.length; i++) {
        gps.deleteGPSLocationAction({
          id: checkLocation.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkLocation.value.length = 0;
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      gps.searchGPSAction({ search: dataSearch.wordSearch, EndTimeLoading });
    };
    return {
      checkLocation,
      checkedAll,
      listGPSLocation,
      location,
      isOpenDetail,
      isOpenUpdate,
      isActive,
      locationDetail,
      isOpenConfirm,
      isLoading,
      EndTimeLoading,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      CheckedBox,
      createGpsLocation,
      updateGpsLocation,
      deleteGpsLocation,
      RemoveGpsLocation,
      checkedAllItem,
      rightClick,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
