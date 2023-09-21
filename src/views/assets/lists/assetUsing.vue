<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center ml-4">
            <asset-add-events></asset-add-events>
            <p class="ml-2 font-medium">Danh sách tài sản đang sử dụng</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <nav-feature>
          <div class="flex">
            <panel-asset-vue></panel-asset-vue>
          </div>
        </nav-feature></div
    ></template>
    <div class="w-full">
      <table-responsive
        :header="header"
        :checkAll="checkedAllItem"
        :isCheck="checkedAll"
        ><tr
          class="bg-white border-b text-left"
          v-for="(asset, index) in listAssetUsing"
          :key="index"
          :class="{ isCheck: CheckedBox(asset.id) }"
          @contextmenu.prevent="rightClick($event, asset)"
        >
          <td class="w-4 px-6 py-3">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="checkAsset"
                :value="asset.id"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td>
          <td class="cellTable">{{ asset.code }}</td>
          <td class="p-3">{{ asset?.name }}</td>
          <td class="p-3">{{ asset?.group_name }}</td>
          <td class="p-3">{{ formatDate(asset?.ticket_date_assign) }}</td>

          <td class="p-3">
            {{ asset?.user_assign_name }}
            <p>
              {{ asset?.user_assign_department }} /
              {{ asset?.user_assign_position }}
            </p>
          </td>

          <td class="p-3">
            {{ asset?.user_assignment_name }}
            <p>
              {{ asset?.user_assignment_department }} /
              {{ asset?.user_assignment_position }}
            </p>
          </td>
          <td class="p-3">{{ asset?.ticket_code }}</td>

          <td class="p-3">{{ asset?.description }}</td>
        </tr>
      </table-responsive>
    </div>
    <template v-slot:sub_footer v-if="listAssetUsing?.length"
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
  <div>
    <context-menu :isActive="isActiveAsset"
      ><ul>
        <li @click.prevent="addAssetRecall()">
          <a href="#"><i class="fal fa-download mr-4"></i>Thu hồi</a>
        </li>
        <li @click.prevent="addAssetBroken()">
          <a href="#"><i class="fal fa-times-circle mr-4"></i>Báo hỏng</a>
        </li>
        <li @click.prevent="addAssetLost()">
          <a href="#"
            ><i class="fal fa-exclamation-triangle mr-4"></i>Báo mất</a
          >
        </li>
        <hr />
        <li @click.prevent="assetHistoryShow">
          <a href="#"><i class="fal fa-eye mr-4"></i>Xem nhanh</a>
        </li>
      </ul></context-menu
    >
  </div>
</template>

<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import panelAssetVue from "../panelAsset.vue";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { utils, writeFileXLSX } from "xlsx";
import assetAddEvents from "../assetAddEvents.vue";
import { FormatDate, FormatPerson } from "@/constants/FormatAll";
export default {
  components: {
    TableResponsive,
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    panelAssetVue,
    assetAddEvents,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isActiveAsset = ref(false);
    const assetDetail = ref({});
    const checkedAll = ref(false);
    const checkAsset = ref([]);
    const perPage = ref(25);
    const status = ref("USING");
    const isLoading = ref(true);
    const EndLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("asset/getAssetUsingAction", {
      status: status.value,
      perPage: perPage.value,
    });
    const ChangePerPage = () => {
      store.dispatch("asset/getAssetUsingAction", {
        status: status.value,
        perPage: perPage.value,
      });
    };
    store.dispatch("asset/getAllPersonAction");
    const AssetSearch = ref("");
    const asset = reactive({
      code: "",
      name: "",
      barcode: null,
      description: null,
      supplier_id: null,
      unit_id: null,
      status: null,
      time_warranty: null,
      date_bought: null,
      price_origin: null,
      currency_id: null,
      group_id: null,
      type_id: null,
      origin: null,
      group: null,
      type: null,
      statusDetail: null,
      unit: null,
      supplier: null,
      department: null,
      location: null,
      user: null,
      currentUser: null,
    });
    const listAssetUsing = computed(() => store.state.asset.listAssetUsing);
    const listPagination = computed(
      () => store.state.asset.listPaginationUsing
    );
    const listAllPerson = computed(() => store.state.asset.listAllPerson);
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
        status: status.value,
      };
      store.dispatch("asset/GetUsingNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
        status: status.value,
      };
      store.dispatch("asset/GetUsingPrevPageAction", dataUrl);
    };
    const rightClick = (e, asset) => {
      if (isActiveAsset.value === true) {
        isActiveAsset.value = false;
      } else {
        isActiveAsset.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        assetDetail.value = asset;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAssetUsing.value) {
          checkAsset.value.push(listAssetUsing.value[item].id);
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
    const createAsset = () => {
      const data = {
        code: asset.code,
        name: asset.name,
        barcode: null,
        description: asset.description,
        supplier_id: asset.supplier_id,
        unit_id: null,
        status: asset.status,
        time_warranty: asset.time_warranty,
        date_bought: asset.date_bought,
        price_origin: asset.price_origin,
        currency_id: null,
        group_id: asset.group_id,
        type_id: null,
        origin: asset.origin,
        group: null,
        type: null,
        statusDetail: null,
        unit: null,
        supplier: null,
        department: null,
        location: asset.location,
        user: asset.user,
        currentUser: null,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("asset/createAssetAction", dataUrl);
      (asset.code = ""), (asset.name = ""), (asset.ord = "1");
    };
    const searchAsset = () => {
      store.dispatch("asset/SearchAssetAction", AssetSearch.value);
    };
    const addAssetRecall = () => {
      router.push(`/asset-recall-add/${assetDetail.value.id}`);
    };
    const addAssetBroken = () => {
      router.push(`/asset-broken-add/${assetDetail.value.id}`);
    };
    const addAssetLost = () => {
      router.push(`/asset-lost-add/${assetDetail.value.id}`);
    };
    const UpdateAssignTicket = () => {
      router.push(`/asset-assign-update/${assetDetail.value.ticket_id}`);
    };
    const DeleteAsset = (assetDetail) => {
      const dataUrl = {
        dataID: assetDetail.id,
        perPage: perPage.value,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " + assetDetail.code + " ?"
        )
      ) {
        store.dispatch("asset/DeleteAssetAction", dataUrl);
      }
    };
    const RemoveAsset = () => {
      for (var i = 0; i < checkAsset.value.length; i++) {
        let dataUrl = {
          dataID: checkAsset.value[i],
          perPage: perPage.value,
        };
        store.dispatch("asset/DeleteAssetAction", dataUrl);
      }
    };
    const showDetail = (id) => {
      alert(id);
    };
    const assetHistoryShow = () => {
      router.push(`/asset-view/${assetDetail.value.id}`);
    };
    return {
      isActiveAsset,
      assetDetail,
      checkedAll,
      checkAsset,
      listAssetUsing,
      listAllPerson,
      perPage,
      EndLoading,
      asset,
      AssetSearch,
      listPagination,
      ChangePerPage,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      createAsset,
      UpdateAssignTicket,
      searchAsset,
      DeleteAsset,
      RemoveAsset,
      showDetail,
      addAssetRecall,
      addAssetBroken,
      addAssetLost,
      assetHistoryShow,
    };
  },
  data() {
    return {
      header: [
        "Mã",
        "Tên tài sản",
        "Loại",
        "Ngày cấp",
        "Người sử dụng",
        "Người cấp",
        "Số chứng từ",
        "Ghi chú",
      ],
      isModalVisible: false,
      files: [],
    };
  },
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
      console.log(this.files);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
    formatPersonal(id, arr) {
      arr = this.listAllPerson;
      if (id == null) {
        return "";
      } else {
        return FormatPerson(id, arr);
      }
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
