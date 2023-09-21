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
          <div class="flex items-center ml-4">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="ml-2 font-medium">Tạo mới loại phụ cấp</p>
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
    <div class="home w-full">
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
      <div class="flex justify-end p-4">
        <select
          name=""
          id=""
          class="items-center px-2 py-2 rounded-md mr-2 border border-gray-300 bg-white trext-sm font-medium text-gray-500 hover:bg-gray-50 outline-none"
          v-model="perPage"
          @change="ChangePerPage"
        >
          <option value="5">5 bản ghi</option>
          <option value="10">10 bản ghi</option>
          <option value="15">15 bản ghi</option>
          <option value="20">20 bản ghi</option>
          <option value="25">25 bản ghi</option>
          <option value="50" selected>50 bản ghi</option>
        </select>
        <pagination-view
          :listPagination="listPagination"
          :NextPage="NextPage"
          :PrevPage="PrevPage"
        ></pagination-view>
      </div>
    </div>
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
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Tiền phụ cấp"
                v-model="allowance.money"
                style="display: none"
              />
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Tiền phụ cấp"
                @input="formatPriceInput($event)"
                v-model="maskMoney"
              />
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
  </teleport>
  <teleport to="#app">
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
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Tiền phụ cấp"
                v-model="allowanceDetail.money"
              />
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
          <button
            class="button-modal"
            @click="updateAllowanceDetail(allowanceDetail)"
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
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="updateAllowance()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="deleteAllowance(allowanceDetail.ID)">
          <i class="fal fa-trash-alt"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <loading-page
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="fullPage"
  >
  </loading-page>
</template>

<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPerson from "@/components/sidebar/SidebarPerson.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { FormatPrice } from "@/constants/FormatAll";
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
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const checkAllowance = ref([]);
    const checkedAll = ref(false);
    const allowanceDetail = ref({});
    const isActive = ref(false);
    const perPage = ref(50);
    const maskMoney = ref();
    const isLoading = ref(true);
    const fullPage = ref(true);
    const allowance = reactive({
      title: "",
      money: null,
      is_tax: 0,
      type: null,
      active: 0,
    });
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    store.dispatch("allowances/getAllAllowancesAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("allowances/getAllAllowancesAction", perPage.value);
    };
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
        perPage: perPage.value,
      };
      store.dispatch("allowances/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("allowances/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, allowance) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        allowanceDetail.value = allowance;
      }
    };
    const handleSearch = (index) => {
      isLoading.value = true;
      store.dispatch("allowances/SearchAllowancesAction", index);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const CreateAllowance = () => {
      const data = {
        title: allowance.title,
        money: allowance.money.replaceAll(",", ""),
        is_tax: allowance.is_tax,
        type: allowance.type,
        active: allowance.active,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("allowances/createAllowanceAction", dataUrl);
      toast.success("Tạo bản ghi mới thành công", { timeout: 1500 });
      handleCloseDetail();
    };
    const updateAllowanceDetail = (data) => {
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("allowances/updateAllowanceAction", dataUrl);
      toast.success("Cập nhật bản ghi mới thành công", { timeout: 1500 });
      isOpenUpdate.value = false;
    };
    const CheckedBox = (index) => {
      if (index == checkAllowance.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const RemoveAllowance = () => {
      for (var i = 0; i < checkAllowance.value.length; i++) {
        let dataUrl = {
          dataID: checkAllowance.value[i],
          perPage: perPage.value,
        };
        store.dispatch("allowances/deleteAllowanceAction", dataUrl);
      }
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
    const deleteAllowance = (id) => {
      const dataUrl = {
        dataID: id,
        perPage: perPage.value,
      };
      store.dispatch("allowances/deleteAllowanceAction", dataUrl);
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
      fullPage,
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
      ChangePerPage,
    };
  },
};
</script>

<style></style>
