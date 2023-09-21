<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-person></sidebar-person>
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
              title="Tạo mới nơi làm việc"
            ></div>
            <p class="longText">Danh sách nơi làm việc</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex h-full">
          <div
            class="btn-icon"
            title="Import"
            v-if="checkWorkplace.length == 0"
            @click="
              this.$router.push(
                '/personnel-profile-settings-workplace/import-data'
              )
            "
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkWorkplace.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveWorkplace"
            v-if="checkWorkplace.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listWorkplace?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="workplace in listWorkplace"
              :key="workplace.ID"
              @contextmenu.prevent="rightClick($event, workplace)"
              :class="{
                isCheck: CheckedBox(workplace.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkWorkplace"
                    :value="workplace.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ workplace.title }}
              </td>
              <td class="cellTable">
                {{ formatDepartment(workplace.department_ids) }}
              </td>
              <td class="cellTable">
                {{ formatStatus(workplace.status) }}
              </td>
              <td class="cellTable">
                {{ formatDate(workplace.created_at) }}
              </td>
              <td class="cellTable">
                <img
                  :src="workplace.personCreate"
                  alt=""
                  class="w-8 h-8 rounded-full"
                />
              </td>
              <td class="cellTable">
                {{ formatDate(workplace.updated_at) }}
              </td>
              <td class="cellTable">
                <img
                  :src="workplace.personUpdate"
                  alt=""
                  class="w-8 h-8 rounded-full"
                />
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listWorkplace?.length">
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
  <teleport to="#app">
    <!-- Start modal add workplace -->
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[800px]">
        <h1 class="header-modal">tạo mới cài đặt nơi làm việc</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Nơi làm việc:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập nơi làm việc"
                v-model="workplace.title"
              />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-2">
            <div>
              <label for="">Thành phố:</label>
              <div>
                <v-select
                  label="title"
                  :options="listCity"
                  :reduce="(city) => city.ID"
                  v-model="citySelected"
                  @input="loadCity($event)"
                  @option:selected="changeCity($event)"
                  placeholder="Chọn thành phố"
                ></v-select>
              </div>
            </div>
            <div>
              <label for="">Quận/ Huyện:</label>
              <div>
                <v-select
                  label="title"
                  :options="listDistricts"
                  :reduce="(district) => district.ID"
                  v-model="districtSelected"
                  @option:selected="changeDistrict($event)"
                  placeholder="Chọn thành phố"
                ></v-select>
              </div>
            </div>
            <div>
              <label for="">Xã/ Phường:</label>
              <div>
                <v-select
                  label="title"
                  :options="listWards"
                  :reduce="(ward) => ward.ID"
                  v-model="wardSelected"
                  placeholder="Chọn thành phố"
                ></v-select>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <label for="">Phòng ban:</label>
            <div>
              <v-select
                label="title"
                :options="listDepartments"
                :reduce="(department) => department.ID"
                v-model="workplace.department_ids"
                placeholder="Chọn phòng ban"
              ></v-select>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="workplace.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="CreateWorkplace()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add workplace -->
    <!-- Start modal update workplace -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[800px]">
        <h1 class="header-modal">cập nhật cài đặt nơi làm việc</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Nơi làm việc:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập nơi làm việc"
                v-model="workplaceDetail.title"
              />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-2">
            <div>
              <label for="">Thành phố:</label>
              <div>
                <v-select
                  label="title"
                  :options="listCity"
                  :reduce="(city) => city.ID"
                  v-model="workplaceDetail.country_id"
                  @input="loadCity($event)"
                  @option:selected="changeCity($event)"
                  placeholder="Chọn thành phố"
                ></v-select>
              </div>
            </div>
            <div>
              <label for="">Quận/ Huyện:</label>
              <div>
                <v-select
                  label="title"
                  :options="listDistricts"
                  :reduce="(district) => district.ID"
                  v-model="workplaceDetail.district_id"
                  @option:selected="changeDistrict($event)"
                  placeholder="Chọn quận/huyện"
                ></v-select>
              </div>
            </div>
            <div>
              <label for="">Xã/ Phường:</label>
              <div>
                <v-select
                  label="title"
                  :options="listWards"
                  :reduce="(ward) => ward.ID"
                  v-model="workplaceDetail.ward_id"
                  placeholder="Chọn xã/phường"
                ></v-select>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <label for="">Phòng ban:</label>
            <div>
              <v-select
                label="title"
                :options="listDepartments"
                :reduce="(department) => department.ID"
                v-model="workplaceDetail.department_ids"
                placeholder="Chọn phòng ban"
              ></v-select>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="workplaceDetail.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updatePlace()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update workplace -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteWorkplace"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>

  <!-- Start right click -->
  <div>
    <context-menu :isActive="isActive"
      ><ul>
        <li @click.prevent="updateWorkplace(workplaceDetail)">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- End right click -->
  <loading-overlay :isLoading="isLoading"></loading-overlay>
  <loading-overlay :isLoading="isLoadingShow"></loading-overlay>
</template>

<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPerson from "@/components/sidebar/SidebarPerson.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatStatus,
} from "@/constants/FormatAll";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      header: [
        "Nơi làm việc",
        "Phòng ban",
        "Trạng thái",
        "Ngày tạo",
        "Người tạo",
        "Ngày sửa",
        "Người sửa",
      ],
    };
  },
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    SearchView,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const citySelected = ref();
    const districtSelected = ref();
    const wardSelected = ref();
    const isOpenDetail = ref(false);
    const checkWorkplace = ref([]);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const workplaceDetail = ref({});
    const isActive = ref(false);
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("departments/getAllDepartmentsAction");
    store.dispatch("workplace/getAllWorkplaceEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const rightClick = (e, workplace) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        workplaceDetail.value = workplace;
      }
    };
    const loadCity = (event) => {
      store.dispatch("places/SearchCityAction", event.target.value);
    };
    const changeCity = (event) => {
      store.dispatch("places/getAllDistrictsAction", event.ID);
    };
    const changeDistrict = (event) => {
      store.dispatch("places/getAllWardsAction", event.ID);
    };
    const listWorkplace = computed(() => store.state.workplace.listWorkplace);
    const listPagination = computed(() => store.state.workplace.listPagination);
    const listCity = computed(() => store.state.places.listCity);
    const listDistricts = computed(() => store.state.places.listDistricts);
    const listWards = computed(() => store.state.places.listWards);
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      workplace.title = "";
      workplace.department_ids = "";
      workplace.country_id = "";
      workplace.district_id = "";
      workplace.ward_id = "";
      isOpenDetail.value = false;
    };
    const handleOpenUpdate = () => {
      isLoadingShow.value = true;
      setTimeout(() => {
        isOpenUpdate.value = true;
        isLoadingShow.value = false;
      }, 600);
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("workplace/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("workplace/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const CheckedBox = (index) => {
      if (index == checkWorkplace.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listWorkplace.value) {
          checkWorkplace.value.push(listWorkplace.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkWorkplace.value.splice(0, checkWorkplace.value.length);
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("workplace/SearchWorkplaceAction", {
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const workplace = reactive({
      title: "",
      department_ids: 1,
      country_id: citySelected,
      district_id: districtSelected,
      ward_id: wardSelected,
    });
    const selectedCity = () => {
      store.dispatch("places/getAllDistrictsAction", citySelected.value);
      districtSelected.value = "";
      wardSelected.value = "";
    };
    const selectedDistrict = () => {
      store.dispatch("places/getAllWardsAction", districtSelected.value);
    };
    const CreateWorkplace = () => {
      const data = {
        title: workplace.title,
        department_ids: workplace.department_ids,
        country_id: workplace.country_id,
        district_id: workplace.district_id,
        ward_id: workplace.ward_id,
      };
      store.dispatch("workplace/createWorkplaceAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const updatePlace = () => {
      store.dispatch("workplace/updateWorkplaceAction", {
        data: workplaceDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const RemoveWorkplace = () => {
      for (var i = 0; i < checkWorkplace.value.length; i++) {
        store.dispatch("workplace/deleteWorkplaceAction", {
          id: checkWorkplace.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkWorkplace.value.length = 0;
    };
    const deleteWorkplace = () => {
      store.dispatch("workplace/deleteWorkplaceAction", {
        id: workplaceDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkWorkplace.value.length = 0;
    };
    return {
      listWorkplace,
      listPagination,
      listCity,
      listDistricts,
      listWards,
      citySelected,
      districtSelected,
      wardSelected,
      workplace,
      checkWorkplace,
      checkedAll,
      isOpenDetail,
      isOpenUpdate,
      workplaceDetail,
      isActive,
      listDepartments,
      isOpenConfirm,
      selectedCity,
      selectedDistrict,
      changeCity,
      CreateWorkplace,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      CheckedBox,
      checkedAllItem,
      RemoveWorkplace,
      updatePlace,
      deleteWorkplace,
      NextPage,
      PrevPage,
      loadCity,
      changeDistrict,
      rightClick,
      isLoading,
      isLoadingShow,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
  methods: {
    formatDate(dateTime) {
      return FormatDate(dateTime);
    },
    formatStatus(status) {
      return FormatStatus(status);
    },
    updateWorkplace(place) {
      this.handleOpenUpdate();
      this.$store.dispatch("places/getAllCityAction");
      this.$store.dispatch("places/getAllDistrictsAction", place.country_id);
      this.$store.dispatch("places/getAllWardsAction", place.district_id);
    },
    updatedCity() {
      this.$store.dispatch(
        "places/getUpdateDistrictsAction",
        this.workplaceDetail.country_id
      );
      this.workplaceDetail.ward_id = 0;
    },
    updatedDistrict() {
      this.$store.dispatch(
        "places/getUpdateWardsAction",
        this.workplaceDetail.district_id
      );
    },
    formatDepartment(index) {
      if (index) {
        const arr = this.listDepartments.find((item) => item.ID == index);
        if (arr) {
          return arr.title;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
  },
};
</script>
