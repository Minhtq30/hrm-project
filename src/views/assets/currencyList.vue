<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-qlts></sidebar-qlts>
    </template>
    <template v-slot:navbar>
      <navbar-social></navbar-social>
    </template>
    <div class="w-full p-2 items-left px-3">
      <div>
        <h1 class="text-2xl text-left">Danh mục đơn vị tiền tệ</h1>
      </div>
      <div class="text-left px-3 py-2 p-1">
        <button
          type="button"
          @click="handleOpenDetail"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Thêm mới
        </button>
      </div>
      <table-responsive :header="header" :units="currency"
        ><tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(currency, index) in listCurrencies"
          :key="index"
          :class="{ isCheck: currency.ID }"
          @contextmenu.prevent="rightClick($event, currency)"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="currency.ID"
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
          <td class="px-6 py-2">{{ currency.code }}</td>
          <td class="px-6 py-2">{{ currency.title }}</td>
          <td class="px-6 py-2">{{ currency.rate }}</td>
          <td class="px-6 py-2">{{ currency.is_main }}</td>
          <td class="px-6 py-2 text-center w-48">
            <button
              type="button"
              @click.prevent="buttonClick(currency)"
              class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
            >
              Sửa
            </button>
            <button
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Xóa
            </button>
          </td>
        </tr></table-responsive
      >
    </div>
  </person-layout>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div style="width: 500px">
        <h1 class="text-left uppercase text-white bg-red-600 p-3">Thêm mới</h1>
        <div class="text-left">
          <div class="grid grid-cols-1 px-4 py-2">
            <div class="flex-inline">
              <label for=""
                >Mã tiền tệ<span class="text-red-600">*</span></label
              >
              <div class="mt-1">
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
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Tên<span class="text-red-600">*</span></label>
              <div class="mt-1">
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
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Tỷ lệ<span class="text-red-600">*</span></label>
              <div class="mt-1">
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
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for=""
                >Tiền tệ chính<span class="text-red-600">*</span></label
              >
              <div class="mt-1">
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
        </div>
        <div class="bg-slate-100 p-4 text-right">
          <button
            class="py-2 px-4 bg-red-600 text-white rounded-lg"
            @click="createCurrency()"
          >
            Cập nhật
          </button>
          <button
            class="py-2 px-4 text-red-500 rounded-lg ml-2"
            style="border: 1px solid #dc2626"
            @click="handleCloseDetail"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div style="width: 500px">
        <h1 class="text-left uppercase text-white bg-red-600 p-3">
          Sửa dữ liệu
        </h1>
        <div class="text-left">
          <div class="grid grid-cols-1 px-4 py-2">
            <div class="flex-inline">
              <label for=""
                >Mã tiền tệ<span class="text-red-600">*</span></label
              >
              <div class="mt-1">
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
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Tên<span class="text-red-600">*</span></label>
              <div class="mt-1">
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
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Tỷ lệ<span class="text-red-600">*</span></label>
              <div class="mt-1">
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
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for=""
                >Tiền tệ chính<span class="text-red-600">*</span></label
              >
              <div class="mt-1">
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
        </div>
        <div class="bg-slate-100 p-4 text-right">
          <button
            class="py-2 px-4 bg-red-600 text-white rounded-lg"
            @click="UpdateCurrencyDetail(currencyDetail)"
          >
            Cập nhật
          </button>
          <button
            class="py-2 px-4 text-red-500 rounded-lg ml-2"
            style="border: 1px solid #dc2626"
            @click="handleCloseDetail"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
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
</template>
<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarQlts from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
export default {
  components: {
    TableResponsive,
    PersonLayout,
    SidebarQlts,
    NavbarSocial,
  },
  setup() {
    const store = useStore();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveCurrency = ref(false);
    const currencyDetail = ref({});
    store.dispatch("currencies/getAllCurrenciesAction");
    const currency = reactive({
      code: "",
      title: "",
      is_main: null,
      rate: null,
    });
    const listCurrencies = computed(
      () => store.state.currencies.listCurrencies
    );
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
          "Bạn có chắc chắn muốn xóa dữ liệu " + currencyDetail.code + " ?"
        )
      ) {
        store.dispatch("currencies/DeleteCurrencyAction", currencyDetail.ID);
      }
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveCurrency: isActiveCurrency,
      currencyDetail: currencyDetail,
      currency: currency,
      listCurrencies: listCurrencies,
      rightClick,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      updateCurrency,
      createCurrency,
      UpdateCurrencyDetail,
      deleteCurrency,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Tỷ lệ", "Diễn giải", "Hành động"],
      hideShow: false,
    };
  },
  methods: {
    abc(data) {
      alert(data.name);
    },

    buttonClick(currency) {
      if (this.isActiveCurrency === true) {
        this.isActiveCurrency = false;
      } else {
        this.isActiveCurrency === true;
        this.currencyDetail = currency;
        this.updateCurrency();
      }
    },
  },
};
</script>
<style></style>
