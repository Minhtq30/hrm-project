<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center ml-4">
            <div class="icon-slider button-create relative group">
              <div
                class="text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul>
                  <li class="sub-item" @click="showModal">
                    <span class="ml-4">Thêm nhà cung cấp</span>
                  </li>
                </ul>
              </div>
            </div>
            <p class="ml-2 font-medium">Danh sách nhà cung cấp/ sửa chữa</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <nav-feature>
          <div class="flex">
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon">
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
          v-for="(supplier, index) in listSuppliers"
          :key="index"
          :class="{ isCheck: CheckedBox(supplier.id) }"
          @contextmenu.prevent="rightClick($event, supplier)"
        >
          <td class="w-4 px-6 py-3">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="checkAsset"
                :value="supplier.id"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td>
          <td class="cellTable">{{ supplier.code }}</td>
          <td class="cellTable">{{ supplier.name }}</td>
          <td class="cellTable">{{ formatType(supplier?.type) }}</td>
          <td class="cellTable">{{ supplier?.address }}</td>
          <td class="cellTable">{{ supplier?.desc }}</td>
          <td class="cellTable">{{ supplier?.phone }}</td>
          <td class="cellTable">{{ supplier?.email }}</td>
          <td class="cellTable">
            {{ supplier?.createdBy?.name }}
          </td>
          <td class="cellTable text-center">
            {{ formatDate(supplier?.updated_at) }}
          </td>
        </tr>
      </table-responsive>
    </div>
    <template v-slot:sub_footer v-if="listSuppliers?.length"
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
  <div class="Modal">
    <ModalView1 v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <div class="p-1">{{ headerModal }}</div>
      </template>
      <template v-slot:body>
        <div class="w-[480px] pt-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Mã nhà cung cấp <span class="p-1 text-red-600">*</span></label
              >
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.code"
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Nhóm <span class="p-1 text-red-600">*</span></label
              >
              <div class="">
                <select
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.type"
                >
                  <option value="0">Nhà cung cấp</option>
                  <option value="1">Đơn vị sửa chữa</option>
                </select>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label"
                >Tên nhà cung cấp <span class="p-1 text-red-600">*</span></label
              >
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Địa chỉ</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.address"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Người liên hệ</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.desc"
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Điện thoại</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                  v-model="supplier.phone"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Chức vụ</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder=""
                  title=""
                />
              </div>
            </div>
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Email</label>
              <div class="">
                <input
                  type="text"
                  class="form-control-input"
                  placeholder="abc@company.com"
                  title=""
                  v-model="supplier.email"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="mt-2 text-left">
              <label for="" class="form-group-label">Ghi chú</label>
              <div class="">
                <textarea
                  class="form-control-input"
                  placeholder=""
                  title=""
                  rows="3"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="w-full text-right">
          <button
            type="button"
            class="btn-green"
            style="background-color: var(--color-primary)"
            @click="SaveData()"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModal()"
            aria-label="Đóng"
          >
            Đóng
          </button>
        </div>
      </template>
    </ModalView1>
  </div>
  <div>
    <context-menu :isActive="isActiveAsset"
      ><ul>
        <li @click.prevent="UpdateSupplier()">
          <a href="#"><i class="fal fa-edit mr-4"></i>Sửa thông tin</a>
        </li>
        <li @click.prevent="showModalDelete()">
          <a href="#"><i class="fal fa-trash-alt mr-4"></i>Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <div class="">
    <ModalView1 v-show="isModalVisibleDelete" @close="closeModalDelete">
      <template v-slot:header> {{ headerModal }} </template>
      <template v-slot:body
        ><div class="grid grid-cols-12 gap-1 p-4">
          <div class="col-span-1">
            <i class="fal fa-trash-alt fa-1x"></i>
          </div>
          <div class="col-span-11">
            <a class="mx-2"
              >Bạn có chắc chắn muốn xóa nhà cung cấp mã:
              <span class="px-1 font-bold"> {{ supplierDetail.code }}</span
              >?</a
            >
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="w-full text-right">
          <button
            type="button"
            class="btn-green"
            style="background-color: var(--color-primary)"
            @click="deleteData(supplierDetail)"
          >
            Đồng ý
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalDelete()"
            aria-label="Đóng"
          >
            Hủy bỏ
          </button>
        </div>
      </template>
    </ModalView1>
  </div>
</template>

<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { utils, writeFileXLSX } from "xlsx";
// import { useRouter } from "vue-router";
import { FormatDate } from "@/constants/FormatAll";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import ModalView1 from "@/components/modal/ModalView1.vue";
import { useToast } from "vue-toastification";
export default {
  components: {
    TableResponsive,
    PersonLayout,
    NavbarSocial,
    SidebarAsset,
    ModalView1,
  },
  setup() {
    const store = useStore();
    // const router = useRouter();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isModalVisible = ref(false);
    const isModalVisibleDelete = ref(false);
    const isActiveAsset = ref(false);
    const supplierDetail = ref({});
    const checkedAll = ref(false);
    const checkAsset = ref([]);
    const perPage = ref(25);
    const headerModal = ref("Thêm mới nhà cung cấp");
    store.dispatch("assetSupplier/getAllSuppliersAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("assetSupplier/getAllSuppliersAction", perPage.value);
    };

    const supplier = reactive({
      id: "",
      code: "",
      name: "",
      type: "",
      desc: "",
      email: "",
      address: "",
      phone: "",
    });
    const listSuppliers = computed(
      () => store.state.assetSupplier.listSuppliers
    );
    const listPagination = computed(
      () => store.state.assetSupplier.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("supplier/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("supplier/GetPrevPageAction", dataUrl);
      toast.error("abc");
    };
    const rightClick = (e, supplier) => {
      if (isActiveAsset.value === true) {
        isActiveAsset.value = false;
      } else {
        isActiveAsset.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        supplierDetail.value = supplier;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listSuppliers.value) {
          checkAsset.value.push(listSuppliers.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkAsset.value.splice(0, checkAsset.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAsset.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const createSupplier = () => {
      const dataUrl = {
        data: supplier,
        perPage: "1",
      };
      store.dispatch("assetSupplier/CreateSupplierAction", { dataUrl, toast });
      isModalVisible.value = false;
      supplier.code = "";
      supplier.name = "";
      supplier.type = 0;
      supplier.desc = "";
      supplier.address = "";
      supplier.phone = "";
      supplier.email = 0;
    };
    const SaveData = () => {
      if (supplier.id == "") {
        createSupplier();
      } else {
        const dataUrl = {
          data: supplier,
          perPage: "1",
        };
        store.dispatch("assetSupplier/UpdateSupplierAction", dataUrl);
        isModalVisible.value = false;
        supplier.id = "";
        supplier.code = "";
        supplier.name = "";
        supplier.type = 0;
        supplier.desc = "";
        supplier.address = "";
        supplier.phone = "";
        supplier.email = "";
      }
    };

    const UpdateSupplier = () => {
      headerModal.value = "Cập nhật thông tin nhà cung cấp";
      supplier.id = supplierDetail.value.id;
      supplier.code = supplierDetail.value.code;
      supplier.name = supplierDetail.value.name;
      supplier.type = supplierDetail.value.type;
      supplier.desc = supplierDetail.value.desc;
      supplier.address = supplierDetail.value.address;
      supplier.phone = supplierDetail.value.phone;
      supplier.email = supplierDetail.value.email;
      isModalVisible.value = true;
    };
    // const DeleteSupplier = (supplierDetail) => {
    //   const dataUrl = {
    //     dataID: supplierDetail.id,
    //     perPage: perPage.value,
    //   };
    //   if (
    //     confirm(
    //       "Bạn có chắc chắn muốn xóa nhà cung cấp mã: " +
    //         supplierDetail.code +
    //         " ?"
    //     )
    //   ) {
    //     store.dispatch("assetSupplier/DeleteSupplierAction", dataUrl);
    //   }
    // };
    const RemoveAsset = () => {
      for (var i = 0; i < checkAsset.value.length; i++) {
        let dataUrl = {
          dataID: checkAsset.value[i],
          perPage: perPage.value,
        };
        store.dispatch("supplier/DeleteAssetAction", dataUrl);
      }
    };
    return {
      isModalVisible,
      isModalVisibleDelete,
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveAsset: isActiveAsset,
      supplierDetail: supplierDetail,
      checkedAll: checkedAll,
      checkAsset: checkAsset,
      listSuppliers,
      supplier,
      createSupplier,
      UpdateSupplier,
      // DeleteSupplier,
      SaveData,
      perPage: perPage,
      listPagination: listPagination,
      ChangePerPage,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      RemoveAsset,
      headerModal,
    };
  },
  data() {
    return {
      header: [
        "Mã",
        "Tên",
        "Loại",
        "Địa chỉ",
        "Người liên hệ",
        "Số điện thoại",
        "Email",
        "Người tạo",
        "Thời điểm",
      ],
      files: [],
    };
  },
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
    },
    formatType(value) {
      if (value == null) {
        return "";
      } else if (value == 0) {
        return "Nhà cung cấp";
      } else {
        return "Đơn vị sửa chữa";
      }
    },
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showModal() {
      if (this.supplier.id == "") {
        this.headerModal = "Thêm mới nhà cung cấp";
      } else {
        this.headerModal = "Cập nhật thông tin nhà cung cấp";
      }

      this.isModalVisible = true;
      // this.$store.dispatch("asset/getAssetHistoryAction", this.asset.value.id);
    },
    closeModal() {
      this.supplier.id = "";
      this.supplier.code = "";
      this.supplier.name = "";
      this.supplier.type = 0;
      this.supplier.desc = "";
      this.supplier.address = "";
      this.supplier.phone = "";
      this.supplier.email = "";
      this.isModalVisible = false;
    },
    showModalDelete() {
      this.headerModal = "XÓA NHÀ CUNG CẤP";
      this.isModalVisibleDelete = true;
    },
    closeModalDelete() {
      this.isModalVisibleDelete = false;
    },
    deleteData(supplierDetail) {
      const dataUrl = {
        dataID: supplierDetail.id,
        perPage: this.perPage,
      };
      this.$store.dispatch("assetSupplier/DeleteSupplierAction", {
        dataUrl,
        toast: this.toast,
      });
      this.isModalVisibleDelete = false;
    },
    // export dữ liệu sang file excel
    exportFile() {
      let Heading = [
        [
          "Mã tài sản",
          "Tên tài sản",
          "Loại tài sản",
          "Ngày mua",
          "Nguyên giá",
          "Nhà cung cấp",
          "Thời gian bảo hành",
          "Trạng thái",
          "Người sử dụng",
          "Phòng ban",
          "Chức vụ",
        ],
      ];
      // const rows = this.listAsset;
      // console.log(rows);
      const wb = utils.book_new();
      // const wb = {
      //   SheetNames: ["Sheet1"],
      //   Sheets: {
      //     Sheet1: {
      //       "!ref": "A1:C1",
      //       A1: { t: "n", v: 10000 }, // <-- General format
      //       B1: { t: "n", v: 10000, z: "0,00%" }, // <-- Builtin format
      //     },
      //   },
      // };
      const ws = utils.json_to_sheet([]);

      ws["!cols"] = [
        { width: 20 },
        { width: 30 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 30 },
        { width: 30 },
        { width: 40 },
      ];
      const edata = this.listAsset.map(function (obj) {
        return {
          code: obj.code,
          name: obj.name,
          group_name: obj.group_name,
          date_bought: obj.date_bought,
          price_origin: obj.price_origin,
          supplier_name: obj.supplier_name,
          time_warranty: obj.time_warranty,
          status_name: obj.status_name,
          current_personnel_name: obj.current_personnel_name,
          department_name: obj.department_name,
          position_name: obj.position_name,
        };
      });
      utils.sheet_add_aoa(ws, Heading);
      utils.sheet_add_json(ws, edata, {
        origin: "A2",
        skipHeader: true,
      });
      ws["A4"].s = {
        // set the style for target cell
        font: {
          name: "ABC",
          sz: 24,
          bold: true,
          color: {
            rgb: "FFFFAA00",
          },
        },
      };
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, "ALL_ASSET.xlsx");
    },
  },
};
</script>
