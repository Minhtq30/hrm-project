<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-asset></sidebar-setting-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center ml-4">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="ml-2 font-medium">Danh mục đơn vị tiền tệ</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkCurrency.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div
              class="btn-icon"
              v-if="checkCurrency.length > 0"
              @click="RemoveTax"
            >
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkCurrency.length == 0">
              <div class="cx">
                <i class="fal fa-file-import"></i>
              </div>
              <div class="action-label">Import</div>
            </div>
          </div>
        </nav-feature>
      </div></template
    >
    <div class="w-full">
      <table-responsive
        :header="header"
        :checkAll="checkedAllItem"
        :isCheck="checkedAll"
        ><tr
          class="bg-white border-b text-left"
          v-for="(currency, index) in listCurrencies"
          :key="index"
          :class="{ isCheck: CheckedBox(currency.ID) }"
          @contextmenu.prevent="rightClick($event, currency)"
        >
          <td class="w-4 px-6 py-3">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="checkCurrency"
                :value="currency.ID"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td>
          <!-- <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {{ currency.ID }}
        </th> -->
          <td class="p-3">{{ currency.code }}</td>
          <td class="p-3">{{ currency.title }}</td>
          <td class="p-3">{{ currency.rate }}</td>
          <td class="p-3">{{ currency.is_main }}</td>
        </tr></table-responsive
      >
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
          <option value="50">50 bản ghi</option>
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
      <div style="width: 500px">
        <h1 class="header-modal">Thêm mới</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã tiền tệ<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="currency.code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tên<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="currency.title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tỷ lệ<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name="rate"
                id="rate"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="currency.rate"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tiền tệ chính<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="currency.is_main"
                title="Là đơn vị tiền tệ sử dụng chính"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createCurrency()">
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
      <div style="width: 500px">
        <h1 class="header-modal">Sửa dữ liệu</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã tiền tệ<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="currencyDetail.code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tên<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="currencyDetail.title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tỷ lệ<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name="rate"
                id="rate"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="currencyDetail.rate"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tiền tệ chính<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="currencyDetail.is_main"
                title="Là đơn vị tiền tệ sử dụng chính"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button
            class="button-modal"
            @click="UpdateCurrencyDetail(currencyDetail)"
          >
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <div>
    <context-menu :isActive="isActiveCurrency"
      ><ul>
        <li @click.prevent="updateCurrency()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="deleteCurrency(currencyDetail)">
          <a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
</template>
<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingAsset from "@/components/sidebar/SidebarSettingAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";

export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingAsset,
    NavbarSocial,
  },
  setup() {
    const store = useStore();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveCurrency = ref(false);
    const currencyDetail = ref({});
    const checkedAll = ref(false);
    const checkCurrency = ref([]);
    const perPage = ref(25);
    store.dispatch("currencies/getAllCurrenciesAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("currencies/getAllCurrenciesAction", perPage.value);
    };
    const currency = reactive({
      code: "",
      title: "",
      is_main: null,
      rate: null,
    });
    const listCurrencies = computed(
      () => store.state.currencies.listCurrencies
    );
    const listPagination = computed(
      () => store.state.currencies.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("currencies/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("currencies/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, currency) => {
      if (isActiveCurrency.value === true) {
        isActiveCurrency.value = false;
      } else {
        isActiveCurrency.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        currencyDetail.value = currency;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listCurrencies.value) {
          checkCurrency.value.push(listCurrencies.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkCurrency.value.splice(0, checkCurrency.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkCurrency.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updateCurrency = () => {
      isOpenUpdate.value = true;
    };
    const createCurrency = () => {
      const data = {
        code: currency.code,
        title: currency.title,
        is_main: currency.is_main,
        rate: currency.rate,
      };
      store.dispatch("currencies/createCurrencyAction", data);
      handleCloseDetail();
      (currency.code = ""),
        (currency.title = ""),
        (currency.is_main = null),
        (currency.rate = null);
    };
    const UpdateCurrencyDetail = (currencyDetail) => {
      store.dispatch("currencies/UpdateCurrencyAction", currencyDetail);
      isOpenUpdate.value = false;
    };
    const deleteCurrency = (currencyDetail) => {
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " + currencyDetail.code + " ?"
        )
      ) {
        store.dispatch("currencies/DeleteCurrencyAction", currencyDetail.ID);
      }
    };
    const RemoveCurrency = () => {
      for (var i = 0; i < checkCurrency.value.length; i++) {
        store.dispatch(
          "currencies/DeleteCurrencyAction",
          checkCurrency.value[i]
        );
      }
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveCurrency: isActiveCurrency,
      currencyDetail: currencyDetail,
      checkedAll: checkedAll,
      checkCurrency: checkCurrency,
      perPage: perPage,
      listPagination: listPagination,
      currency: currency,
      listCurrencies: listCurrencies,
      ChangePerPage,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      updateCurrency,
      createCurrency,
      UpdateCurrencyDetail,
      deleteCurrency,
      RemoveCurrency,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Tỷ lệ", "Is_main"],
    };
  },
  methods: {
    abc(data) {
      alert(data.name);
    },

    // buttonClick(currency) {
    //   if (this.isActiveCurrency === true) {
    //     this.isActiveCurrency = false;
    //   } else {
    //     this.isActiveCurrency === true;
    //     this.currencyDetail = currency;
    //     this.updateCurrency();
    //   }
    // },
  },
};
</script>
<style></style>
