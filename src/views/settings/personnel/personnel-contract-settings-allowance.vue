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
              title="Tạo mới loại phụ cấp"
            ></div>
            <p class="longText">Danh sách loại phụ cấp</p>
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
            v-if="checkAllowance.length == 0"
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkAllowance.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveAllowance"
            v-if="checkAllowance.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listAllowance?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="allowance in listAllowance"
              :key="allowance.ID"
              @contextmenu.prevent="rightClick($event, allowance)"
              :class="{
                isCheck: CheckedBox(allowance.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkAllowance"
                    :value="allowance.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ allowance.title }}
              </td>
              <td class="cellTable">{{ formatTax(allowance.is_tax) }}</td>
              <td class="cellTable">
                {{ formatPrice(allowance.money) }}
              </td>
              <td class="cellTable">
                {{ formatActive(allowance.active) }}
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listAllowance?.length">
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
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">tạo mới loại phụ cấp</h1>
        <div class="text-left p-4">
          <div class="form-large">
            <label for="">Tên phụ cấp</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên phụ cấp"
                v-model="allowance.title"
              />
            </div>
          </div>
          <div class="form-large">
            <label for="">Số tiền</label>
            <div class="mt-1">
              <CurrencyInput v-model="allowance.money" />
            </div>
          </div>
          <div class="form-large">
            <label for="">Chịu thuế</label>
            <div class="mt-1">
              <select
                name=""
                id=""
                class="form-control-select"
                v-model="allowance.is_tax"
              >
                <option value="" disabled selected>Chọn</option>
                <option value="1">Có</option>
                <option value="0">Không</option>
              </select>
            </div>
          </div>
          <div class="form-large">
            <label for="">Đơn vị</label>
            <div class="mt-1">
              <select
                name=""
                id=""
                class="form-control-select"
                v-model="allowance.type"
              >
                <option value="" disabled selected>Chọn</option>
                <option value="DAY">Ngày</option>
                <option value="MONTH">Tháng</option>
              </select>
            </div>
          </div>
          <div class="form-large flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="allowance.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="allowance.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="CreateAllowance()">
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
            <label for="">Tên phụ cấp</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên phụ cấp"
                v-model="allowanceDetail.title"
              />
            </div>
          </div>
          <div class="form-large">
            <label for="">Số tiền</label>
            <div class="mt-1">
              <CurrencyInput v-model="allowanceDetail.money" />
            </div>
          </div>
          <div class="form-large">
            <label for="">Chịu thuế</label>
            <div class="mt-1">
              <select
                name=""
                id=""
                class="form-control-select"
                v-model="allowanceDetail.is_tax"
              >
                <option value="" disabled selected>Chọn</option>
                <option value="1">Có</option>
                <option value="0">Không</option>
              </select>
            </div>
          </div>
          <div class="form-large">
            <label for="">Đơn vị</label>
            <div class="mt-1">
              <select
                name=""
                id=""
                class="form-control-select"
                v-model="allowanceDetail.type"
              >
                <option value="" disabled selected>Chọn</option>
                <option value="DAY">Ngày</option>
                <option value="MONTH">Tháng</option>
              </select>
            </div>
          </div>
          <div class="form-large flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="allowanceDetail.active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="allowanceDetail.active == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateAllowanceDetail()">
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
      :ConfirmDelete="deleteAllowance"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="updateAllowance()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
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
import CurrencyInput from "@/components/CurrencyInput.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { FormatModalX, FormatModalY, FormatPrice } from "@/constants/FormatAll";
export default {
  data() {
    return {
      header: ["Tên phụ cấp", "Chịu thuế", "Số tiền/Đơn vị", "Trạng thái"],
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
    const isOpenUpdate = ref(false);
    const checkAllowance = ref([]);
    const checkedAll = ref(false);
    const allowanceDetail = ref();
    const isActive = ref(false);
    const perPage = ref(50);
    const maskMoney = ref();
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const allowance = reactive({
      title: "",
      money: null,
      is_tax: 0,
      type: null,
      active: 0,
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("allowances/getAllAllowancesEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listAllowance = computed(() => store.state.allowances.listAllowance);
    const listPagination = computed(
      () => store.state.allowances.listPagination
    );
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      allowance.title = "";
      allowance.money = null;
      allowance.is_tax = 0;
      allowance.type = null;
      allowance.active = 0;
      maskMoney.value = 0;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updateAllowance = () => {
      isOpenUpdate.value = true;
    };
    const formatPriceInput = (price) => {
      allowance.money = price.target.value;
      maskMoney.value = price.target.value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const formatActive = (active) => {
      if (active == 0) {
        return "Không hoạt động";
      } else {
        return "Hoạt động";
      }
    };
    const formatTax = (tax) => {
      if (tax == 0) {
        return "Không chịu thuế";
      } else {
        return "Chịu thuế";
      }
    };
    const formatPrice = (price) => {
      return FormatPrice(price);
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("allowances/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("allowances/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, allowance) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        allowanceDetail.value = allowance;
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;

      store.dispatch("allowances/SearchAllowancesAction", {
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const CreateAllowance = () => {
      const data = {
        title: allowance.title,
        money: allowance.money.replaceAll(",", ""),
        is_tax: allowance.is_tax,
        type: allowance.type,
        active: allowance.active,
      };
      store.dispatch("allowances/createAllowanceAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const updateAllowanceDetail = () => {
      store.dispatch("allowances/updateAllowanceAction", {
        data: allowanceDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const CheckedBox = (index) => {
      if (index == checkAllowance.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const ClearArrayChecked = () => {
      checkAllowance.value.length = 0;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const RemoveAllowance = () => {
      for (var i = 0; i < checkAllowance.value.length; i++) {
        store.dispatch("allowances/deleteAllowanceAction", {
          id: checkAllowance.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      ClearArrayChecked();
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAllowance.value) {
          checkAllowance.value.push(listAllowance.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAllowance.value.splice(0, checkAllowance.value.length);
      }
    };
    const deleteAllowance = () => {
      store.dispatch("allowances/deleteAllowanceAction", {
        id: allowanceDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      ClearArrayChecked();
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      allowance: allowance,
      checkAllowance: checkAllowance,
      listAllowance: listAllowance,
      checkedAll: checkedAll,
      allowanceDetail: allowanceDetail,
      isActive: isActive,
      listPagination: listPagination,
      perPage: perPage,
      maskMoney: maskMoney,
      isLoading,
      isOpenConfirm,
      handleSearch,
      CreateAllowance,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      updateAllowance,
      NextPage,
      PrevPage,
      rightClick,
      formatPriceInput,
      formatActive,
      formatTax,
      formatPrice,
      updateAllowanceDetail,
      RemoveAllowance,
      checkedAllItem,
      CheckedBox,
      deleteAllowance,
      ClearArrayChecked,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
