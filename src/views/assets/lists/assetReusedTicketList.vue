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
                <ul></ul>
              </div>
            </div>
            <p class="ml-2 font-medium">Danh sách phiếu hoàn thành sửa chữa</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkAssetTicket.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div
              class="btn-icon"
              v-if="checkAssetTicket.length > 0"
              @click="RemoveTax"
            >
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkAssetTicket.length == 0">
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
          v-for="(assetTicket, index) in listAssetTicket"
          :key="index"
          :class="{ isCheck: CheckedBox(assetTicket.id) }"
          @contextmenu.prevent="rightClick($event, assetTicket)"
        >
          <td class="w-4 px-6 py-3">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="checkAssetTicket"
                :value="assetTicket.id"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td>
          <td class="p-3" @click="showDetail(assetTicket?.id)">
            {{ assetTicket?.code }}
          </td>
          <td class="p-3">{{ formatAssetTicketType(assetTicket?.type) }}</td>
          <td class="p-3">{{ formatDate(assetTicket?.date_assign) }}</td>
          <!-- <td class="p-3">{{ assetTicket?.assets[0]?.code }}</td>
          <td class="p-3">{{ assetTicket?.assets[0]?.name }}</td> -->
          <td class="p-3">
            {{ formatAssetTicketStatus(assetTicket?.status) }}
          </td>
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
          <option selected value="25">25 bản ghi</option>
        </select>
        <pagination-view
          :listPagination="listPagination"
          :NextPage="NextPage"
          :PrevPage="PrevPage"
        ></pagination-view>
      </div>
    </div>
  </person-layout>
  <div>
    <context-menu :isActive="isActiveAssetTicket"
      ><ul>
        <li @click.prevent="ticketUpdate()">
          <a href="#"><i class="fal fa-edit mr-4"></i>Sửa</a>
        </li>
      </ul></context-menu
    >
  </div>
</template>
<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { utils, writeFileXLSX } from "xlsx";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { FormatDate, FormatAssetStatus } from "@/constants/FormatAll";
import { useRouter } from "vue-router";

export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
  },
  setup() {
    const store = useStore();
    const isActiveAssetTicket = ref(false);
    const router = useRouter();
    const assetTicketDetail = ref({});
    const checkedAll = ref(false);
    const checkAssetTicket = ref([]);
    const perPage = ref(25);
    const status1 = ref("REUSED");
    store.dispatch("assetTicket/getAllAssetTicketAction", {
      status: status1.value,
      perPage: perPage.value,
    });
    store.dispatch("assetTicket/getAllAssetTicketTypeAction");
    store.dispatch("assetTicket/getAllAssetTicketStatusAction");
    const ChangePerPage = () => {
      store.dispatch("assetTicket/getAllAssetTicketAction", {
        status: status1.value,
        perPage: perPage.value,
      });
    };
    const AssetTicketSearch = ref("");
    const listAssetTicket = computed(
      () => store.state.assetTicket.listAssetTicket
    );
    const listTicketType = computed(
      () => store.state.assetTicket.listTicketType
    );
    const listTicketStatus = computed(
      () => store.state.assetTicket.listTicketStatus
    );
    const listPagination = computed(
      () => store.state.assetTicket.listPagination
    );
    const listTicketById = (id) => {
      store.dispatch("assetTicket/getAssetByIdAction", id);
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("assetTicket/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("assetTicket/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, assetTicket) => {
      if (isActiveAssetTicket.value === true) {
        isActiveAssetTicket.value = false;
      } else {
        isActiveAssetTicket.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        assetTicketDetail.value = assetTicket;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAssetTicket.value) {
          checkAssetTicket.value.push(listAssetTicket.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkAssetTicket.value.splice(0, checkAssetTicket.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAssetTicket.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const RemoveAssetTicket = () => {
      for (var i = 0; i < checkAssetTicket.value.length; i++) {
        let dataUrl = {
          dataID: checkAssetTicket.value[i],
          perPage: perPage.value,
        };
        store.dispatch("assetTicket/DeleteAssetTicketAction", dataUrl);
      }
    };
    const ticketUpdate = () => {
      router.push(`/asset-reused-update/${assetTicketDetail.value.id}`);
    };
    return {
      isActiveAssetTicket: isActiveAssetTicket,
      assetTicketDetail: assetTicketDetail,
      checkedAll: checkedAll,
      checkAssetTicket: checkAssetTicket,
      listAssetTicket: listAssetTicket,
      listTicketType: listTicketType,
      listTicketStatus: listTicketStatus,
      perPage: perPage,
      AssetTicketSearch: AssetTicketSearch,
      listPagination: listPagination,
      ticketUpdate,
      ChangePerPage,
      listTicketById,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      RemoveAssetTicket,
    };
  },
  data() {
    return {
      header: [
        "Mã",
        "Loại phiếu",
        "Ngày",
        "Mã tài sản",
        "Tên tài sản",
        "Người giao",
        "Người nhận",
        "Trạng thái",
      ],
      isModalVisible: false,
      files: [],
      masks: {
        input: "DD/MM/YYYY",
        data: "YYYY-MM-DD",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
    },
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
    formatAssetTicketType(code, arr) {
      arr = this.listTicketType;
      if (code == null) {
        return "";
      } else {
        return FormatAssetStatus(code, arr);
      }
    },
    formatAssetTicketStatus(code, arr) {
      arr = this.listTicketStatus;
      if (code == null) {
        return "";
      } else {
        return FormatAssetStatus(code, arr);
      }
    },
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
<style></style>
