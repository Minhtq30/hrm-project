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
              title="Tạo mới loại hợp đồng"
            ></div>
            <p class="longText">Danh sách loại hợp đồng</p>
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
            v-if="checkContractType.length == 0"
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Export"
            v-if="checkContractType.length > 0"
          >
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="deleteAllContractType"
            v-if="checkContractType.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listContractTypes?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="contractType in listContractTypes"
              :key="contractType.ID"
              @contextmenu.prevent="rightClick($event, contractType)"
              :class="{
                isCheck: CheckedBox(contractType.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkContractType"
                    :value="contractType.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ contractType.title }}
              </td>
              <td class="cellTable">
                {{ formatWorkType(contractType.work_type) }}
              </td>
              <td class="cellTable">
                {{ formatStatus(contractType.status) }}
              </td>
              <td class="cellTable">
                {{ formatDate(contractType.created_at) }}
              </td>
              <td class="cellTable">
                <img
                  :src="contractType.personCreate"
                  alt=""
                  class="w-8 h-8 rounded-full"
                />
              </td>
              <td class="cellTable">
                {{ formatDate(contractType.updated_at) }}
              </td>
              <td class="cellTable">
                <img
                  :src="contractType.personUpdate"
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
    <template v-slot:sub_footer v-if="listContractTypes?.length"
      ><div class="flex justify-between items-center">
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
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">tạo mới loại hợp đồng</h1>
        <div class="text-left cellTable">
          <div class="form-large">
            <label for="" class="form-group-label">Loại hợp đồng:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập loại hợp đồng"
                v-model="contractType.title"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 mt-2 gap-x-2">
            <div>
              <label for="" class="form-group-label">Thời gian</label>
              <div>
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập thời gian"
                  v-model="contractType.count"
                />
              </div>
            </div>
            <div>
              <label for="" class="form-group-label">Đơn vị thời gian:</label>
              <div>
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="contractType.unit"
                >
                  <option value="" disabled selected>Chọn thời gian</option>
                  <option value="DAY">DAY</option>
                  <option value="WEEK">WEEK</option>
                  <option value="MONTH">MONTH</option>
                  <option value="YEAR">YEAR</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="form-group-label">Hình thức làm việc:</label>
            <div>
              <v-select
                label="title"
                :options="listWorkTypes"
                :reduce="(workType) => workType.ID"
                v-model="contractType.work_type"
                placeholder="Chọn thời gian"
              ></v-select>
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="form-group-label"
              >Phụ cấp<span class="text-red-600"
                ><i
                  class="bi bi-question-circle"
                  style="font-size: 10px"
                ></i></span
            ></label>
            <div class="">
              <v-select
                label="title"
                :options="listAllowance"
                :reduce="(allowance) => allowance.ID"
                multiple
                v-model="contractType.json_allowances"
              ></v-select>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="contractType.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="contractType.status == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createContractType()">
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
        <h1 class="header-modal">cập nhật loại hợp đồng</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Loại hợp đồng:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã chức vụ"
                v-model="contractTypeDetail.title"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 mt-2 gap-x-2">
            <div>
              <label for="">Thời gian</label>
              <div>
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập thời gian"
                  v-model="contractTypeDetail.count"
                />
              </div>
            </div>
            <div>
              <label for="">Đơn vị thời gian:</label>
              <div>
                <select
                  name=""
                  id=""
                  class="form-control-select"
                  v-model="contractTypeDetail.unit"
                >
                  <option value="" disabled selected>Chọn thời gian</option>
                  <option value="DAY">DAY</option>
                  <option value="WEEK">WEEK</option>
                  <option value="MONTH">MONTH</option>
                  <option value="YEAR">YEAR</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <label for="">Hình thức làm việc:</label>
            <div>
              <v-select
                label="title"
                :options="listWorkTypes"
                :reduce="(workType) => workType.ID"
                v-model="contractTypeDetail.work_type"
                placeholder="Chọn thời gian"
              ></v-select>
            </div>
          </div>
          <div class="mt-2">
            <label for="" class="text-sm"
              >Phụ cấp<span class="text-red-600"
                ><i
                  class="bi bi-question-circle"
                  style="font-size: 10px"
                ></i></span
            ></label>
            <div class="">
              <v-select
                label="title"
                :options="listAllowance"
                :reduce="(allowance) => allowance.ID"
                multiple
                v-model="contractTypeDetail.json_allowances"
              ></v-select>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="contractTypeDetail.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="contractTypeDetail.status == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button
            class="button-modal"
            @click="updateContractDetail(contractTypeDetail)"
          >
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <!-- Start xác nhận xóa -->
  <modal-delete
    :isOpen="isOpenConfirm"
    :handleCloseDetail="handleCloseConfirm"
    :ConfirmDelete="deleteContractType"
  >
  </modal-delete>
  <!-- End xác nhận xóa -->
  <div>
    <context-menu :isActive="isActive"
      ><ul>
        <li @click.prevent="updateContract()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>

  <loading-overlay :isLoading="isLoading"></loading-overlay>
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
        "Tên hợp đồng",
        "Hình thức làm việc",
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
    const isOpenDetail = ref(false);
    const itemAllowance = ref({});
    const checkContractType = ref([]);
    const itemAllowanceDetail = ref("");
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const perPage = ref(50);
    const contractTypeID = ref();
    const isLoading = ref(true);
    const fullPage = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("contractTypes/GetAllContractTypeEndTimeLoadingAction", {
      EndTimeLoading,
    });
    store.dispatch("workTypes/GetAllWorkTypeAction", 100);
    store.dispatch("allowances/getAllAllowancesAction", 100);
    const listContractTypes = computed(
      () => store.state.contractTypes.listContractTypes
    );
    const listWorkTypes = computed(() => store.state.workTypes.listWorkTypes);
    const listAllowance = computed(
      () => store.getters["allowances/getAllAllowancesActive"]
    );
    const listPagination = computed(
      () => store.state.contractTypes.listPagination
    );
    const contractType = reactive({
      title: "",
      count: "",
      unit: "",
      work_type: null,
      json_allowances: [],
      has_insurance: "0",
      status: 0,
    });
    const rightClick = (e, contractType) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        contractTypeID.value = contractType.ID;
      }
    };
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      contractType.title = "";
      contractType.count = "";
      contractType.unit = "";
      contractType.work_type = null;
      contractType.json_allowances = [];
      contractType.has_insurance = "0";
      contractType.status = 0;
      isOpenDetail.value = false;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updateContract = () => {
      store.dispatch(
        "contractTypes/GetShowContractTypeAction",
        contractTypeID.value
      );
      isOpenUpdate.value = true;
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("contractTypes/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("contractTypes/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const formatDate = (dateTime) => {
      return FormatDate(dateTime);
    };
    const formatStatus = (status) => {
      return FormatStatus(status);
    };
    const contractTypeDetail = computed(
      () => store.state.contractTypes.contractTypeDetail
    );
    const CheckedBox = (index) => {
      if (index == checkContractType.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listContractTypes.value) {
          checkContractType.value.push(listContractTypes.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkContractType.value.splice(0, checkContractType.value.length);
      }
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch(
        "contractTypes/SearchContractTypeAction",
        dataSearch.wordSearch
      );
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const createContractType = () => {
      const data = {
        title: contractType.title,
        count: contractType.count,
        unit: contractType.unit,
        work_type: contractType.work_type,
        json_allowances: contractType.json_allowances,
        has_insurance: contractType.has_insurance,
        status: contractType.status,
      };
      store.dispatch("contractTypes/createContractTypeAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const updateContractDetail = (data) => {
      const dataUpdate = {
        ID: data.ID,
        title: data.title,
        count: data.count,
        unit: data.unit,
        work_type: data.work_type,
        json_allowances: data.allowances,
        has_insurance: data.has_insurance,
        status: data.status,
      };
      store.dispatch("contractTypes/updateContractTypeAction", {
        data: dataUpdate,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteContractType = () => {
      store.dispatch("contractTypes/deleteContractTypeAction", {
        id: contractTypeID.value,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkContractType.value.length = 0;
    };
    const deleteAllContractType = () => {
      for (var i = 0; i < checkContractType.value.length; i++) {
        store.dispatch("contractTypes/deleteContractTypeAction", {
          id: checkContractType.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkContractType.value.length = 0;
    };
    return {
      isOpenDetail: isOpenDetail,
      contractType: contractType,
      listContractTypes: listContractTypes,
      listWorkTypes: listWorkTypes,
      listAllowance: listAllowance,
      itemAllowance: itemAllowance,
      checkContractType: checkContractType,
      itemAllowanceDetail: itemAllowanceDetail,
      isOpenUpdate: isOpenUpdate,
      checkedAll: checkedAll,
      isActive: isActive,
      contractTypeDetail: contractTypeDetail,
      listPagination: listPagination,
      perPage: perPage,
      contractTypeID: contractTypeID,
      isLoading: isLoading,
      fullPage: fullPage,
      isOpenConfirm,
      handleSearch,
      rightClick,
      handleOpenDetail,
      handleCloseDetail,
      createContractType,
      handleOpenUpdate,
      handleCloseUpdate,
      updateContract,
      updateContractDetail,
      deleteContractType,
      deleteAllContractType,
      checkedAllItem,
      CheckedBox,
      formatDate,
      formatStatus,
      NextPage,
      PrevPage,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
  methods: {
    formatWorkType(id) {
      if (id) {
        const arr = this.listWorkTypes.find((item) => item.ID === id);
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

<style></style>
