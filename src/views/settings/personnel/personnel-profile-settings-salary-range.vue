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
              title="Tạo mới ngạch bậc"
            ></div>
            <p class="longText">Danh sách ngạch bậc</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex h-full">
          <div
            class="btn-icon"
            title="Import"
            v-if="checkAllSalary.length == 0"
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkAllSalary.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveSalary"
            v-if="checkAllSalary.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listSalryRange?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="salaryRange in listSalryRange"
              :key="salaryRange.ID"
              @contextmenu.prevent="rightClick($event, salaryRange)"
              :class="{
                isCheck: CheckedBox(salaryRange.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkAllSalary"
                    :value="salaryRange.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ salaryRange.title }}
              </td>
              <td class="cellTable">
                {{ formatPrice(salaryRange.daily_wage) }}
              </td>
              <td class="cellTable">
                {{ formatActive(salaryRange.is_active) }}
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listSalryRange?.length">
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
  <!-- Start modal add salary -->
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới ngạch lương</h1>
        <div class="text-left p-2">
          <div class="col-span-2">
            <label for="">Tên mức lương</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên phụ cấp"
                v-model="salaryRange.title"
              />
            </div>
          </div>
          <div class="col-span-1 mt-2">
            <label for="">Số tiền</label>
            <div class="mt-1">
              <CurrencyInput v-model="salaryRange.daily_wage" />
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="salaryRange.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="salaryRange.is_active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createSalaryRange()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add salary -->
    <!-- Start modal update salary -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">cập nhật ngạch lương</h1>
        <div class="text-left p-2">
          <div class="col-span-2">
            <label for="">Tên mức lương</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên phụ cấp"
                v-model="salaryRangeDetail.title"
              />
            </div>
          </div>
          <div class="col-span-1 mt-2">
            <label for="">Số tiền</label>
            <div class="mt-1">
              <CurrencyInput v-model="salaryRangeDetail.daily_wage" />
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="salaryRangeDetail.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="salaryRangeDetail.is_active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateSalaryDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update salary -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteSalaryRange"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <!-- Start right click -->
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="updateSalary()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <!-- End right click -->
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
import CurrencyInput from "@/components/CurrencyInput.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import {
  FormatModalX,
  FormatModalY,
  FormatPrice,
  FormatStatus,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      header: ["Tên mức lương", "Số tiền/Đơn vị", "Trạng thái"],
    };
  },
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    SearchView,
    CurrencyInput,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const checkAllSalary = ref([]);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const salaryRangeDetail = ref({});
    const isActive = ref(false);
    const perPage = ref(50);
    const isLoading = ref(true);
    const fullPage = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("salaryRange/getAllSalaryRangeEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listSalryRange = computed(
      () => store.state.salaryRange.listSalryRange
    );
    const listPagination = computed(
      () => store.state.salaryRange.listPagination
    );
    const salaryRange = reactive({
      title: "",
      daily_wage: null,
      is_active: 0,
    });
    const formatPrice = (price) => {
      return FormatPrice(price);
    };
    const formatActive = (active) => {
      return FormatStatus(active);
    };
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      salaryRange.title = "";
      salaryRange.daily_wage = null;
      salaryRange.is_active = 0;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updateSalary = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("salaryRange/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("salaryRange/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const CheckedBox = (index) => {
      if (index == checkAllSalary.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listSalryRange.value) {
          checkAllSalary.value.push(listSalryRange.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAllSalary.value.splice(0, checkAllSalary.value.length);
      }
    };
    const rightClick = (e, salaryRange) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        salaryRangeDetail.value = salaryRange;
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("salaryRange/SearchSalaryRangeAction", {
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const createSalaryRange = () => {
      const data = {
        title: salaryRange.title,
        daily_wage: salaryRange.daily_wage,
        is_active: salaryRange.is_active,
      };
      store.dispatch("salaryRange/createSalaryRangeAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const updateSalaryDetail = () => {
      store.dispatch("salaryRange/updateSalaryRangeAction", {
        data: salaryRangeDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const RemoveSalary = () => {
      for (var i = 0; i < checkAllSalary.value.length; i++) {
        store.dispatch("salaryRange/deleteSalaryRangeAction", {
          id: checkAllSalary.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
    };
    const deleteSalaryRange = () => {
      store.dispatch("salaryRange/deleteSalaryRangeAction", {
        id: salaryRangeDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    // const formatPriceInput = (price) => {
    //   allowance.money = price
    //     .replace(/\D/g, "")
    //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // };

    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      salaryRange: salaryRange,
      listSalryRange: listSalryRange,
      checkAllSalary: checkAllSalary,
      checkedAll: checkedAll,
      salaryRangeDetail: salaryRangeDetail,
      listPagination: listPagination,
      isActive: isActive,
      perPage: perPage,
      isLoading,
      fullPage,
      isOpenConfirm,
      handleSearch,
      createSalaryRange,
      deleteSalaryRange,
      handleOpenDetail,
      handleCloseDetail,
      //   formatPriceInput,
      formatActive,
      formatPrice,
      handleOpenUpdate,
      handleCloseUpdate,
      updateSalary,
      CheckedBox,
      checkedAllItem,
      rightClick,
      updateSalaryDetail,
      RemoveSalary,
      NextPage,
      PrevPage,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
