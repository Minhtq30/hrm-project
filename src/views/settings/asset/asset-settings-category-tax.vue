<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-asset></sidebar-setting-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="text-base">Danh mục thuế</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkTax.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div class="btn-icon" v-if="checkTax.length > 0" @click="RemoveTax">
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkTax.length == 0">
              <div class="cx">
                <i class="fal fa-file-import"></i>
              </div>
              <div class="action-label">Import</div>
            </div>
          </div>
        </nav-feature>
      </div></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
          ><tr
            class="bg-white border-b text-left"
            v-for="(tax, index) in listTaxs"
            :key="index"
            :class="{ isCheck: CheckedBox(tax.ID) }"
            @contextmenu.prevent="rightClick($event, tax)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkTax"
                  :value="tax.ID"
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
          {{ tax.ID }}
        </th> -->
            <td class="p-3">{{ tax.code }}</td>
            <td class="p-3">{{ tax.title }}</td>
            <td class="p-3">{{ tax.value }}</td>
            <td class="p-3">{{ tax.desc }}</td>
            <td class="p-3">{{ formatActive(tax.is_active) }}</td>
          </tr></table-responsive
        >
      </div>
    </Transition>
    <template v-slot:sub_footer>
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
      <div style="width: 520px">
        <h1 class="header-modal">Thêm mới</h1>
        <div class="p-2 text-left">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="tax.code"
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
                placeholder="Nhập tên"
                v-model="tax.title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Giá trị<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="tax.value"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mô tả<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="tax.desc"
                title=""
              />
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="tax.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="tax.is_active == 1">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createTax()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div style="width: 520px">
        <h1 class="header-modal">Sửa dữ liệu</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="taxDetail.code"
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
                v-model="taxDetail.title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Giá trị (%)</label>
            <div>
              <input
                type="text"
                name="rate"
                id="rate"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="taxDetail.value"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Mô tả</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="taxDetail.desc"
                title="Là đơn vị tiền tệ sử dụng chính"
              />
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="taxDetail.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="taxDetail.is_active == 1">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateTaxDetail(taxDetail)">
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
    <context-menu :isActive="isActivetax"
      ><ul>
        <li @click.prevent="updateTax()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="deleteTax(taxDetail)">
          <a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <loading-page
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="true"
  >
  </loading-page>
</template>
<script>
import "@/assets/checkBox.css";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingAsset from "@/components/sidebar/SidebarSettingAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import {
  FormatModalX,
  FormatModalY,
  FormatStatus,
} from "@/constants/FormatAll";
export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingAsset,
    NavbarSocial,
  },
  data() {
    return {
      header: ["Mã", "Tên", "Giá trị (%)", "Diễn giải", "Trạng thái"],
    };
  },
  methods: {
    formatActive(status) {
      return FormatStatus(status);
    },
  },
  setup() {
    const store = useStore();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActivetax = ref(false);
    const taxDetail = ref({});
    const checkedAll = ref(false);
    const checkTax = ref([]);
    const perPage = ref(50);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    store.dispatch("taxs/getAllTaxsAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("taxs/getAllTaxsAction", perPage.value);
    };
    const tax = reactive({
      code: "",
      title: "",
      value: "",
      is_active: 1,
      desc: "",
    });
    const listTaxs = computed(() => store.state.taxs.listTaxs);
    const listPagination = computed(() => store.state.taxs.listPagination);
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("taxs/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("taxs/GetPrevPageAction", dataUrl);
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listTaxs.value) {
          checkTax.value.push(listTaxs.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkTax.value.splice(0, checkTax.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkTax.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, tax) => {
      if (isActivetax.value === true) {
        isActivetax.value = false;
      } else {
        isActivetax.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e, 300);
        FormatModalY(menu, e);
        taxDetail.value = tax;
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
    const updateTax = () => {
      isOpenUpdate.value = true;
    };
    const createTax = () => {
      const data = {
        code: tax.code,
        title: tax.title,
        value: tax.value,
        is_active: tax.is_active,
        desc: tax.desc,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("taxs/createTaxAction", dataUrl);
      isOpenDetail.value = false;
      (tax.code = ""), (tax.title = ""), (tax.value = null);
      (tax.desc = ""), (tax.is_active = null);
    };
    const UpdateTaxDetail = (taxDetail) => {
      const dataUrl = {
        data: taxDetail,
        perPage: perPage.value,
      };
      store.dispatch("taxs/UpdateTaxAction", dataUrl);
      isOpenUpdate.value = false;
    };
    const deleteTax = (taxDetail) => {
      const dataUrl = {
        dataID: taxDetail.ID,
        perPage: perPage.value,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " + taxDetail.code + " ?"
        )
      ) {
        store.dispatch("taxs/DeleteTaxAction", dataUrl);
      }
    };
    const RemoveTax = () => {
      for (var i = 0; i < checkTax.value.length; i++) {
        let dataUrl = {
          dataID: checkTax.value[i],
          perPage: perPage.value,
        };
        store.dispatch("taxs/DeleteTaxAction", dataUrl);
      }
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      listTaxs: listTaxs,
      isActivetax: isActivetax,
      taxDetail: taxDetail,
      checkedAll: checkedAll,
      checkTax: checkTax,
      listPagination: listPagination,
      perPage: perPage,
      isLoading,
      ChangePerPage,
      NextPage,
      PrevPage,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      updateTax,
      rightClick,
      checkedAllItem,
      CheckedBox,
      UpdateTaxDetail,
      deleteTax,
      RemoveTax,
      tax: tax,
      createTax,
    };
  },
};
</script>
<style></style>
