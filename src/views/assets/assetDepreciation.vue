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
            <p class="ml-2 font-medium">Danh sách tất cả tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
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
          v-for="(asset, index) in listAsset"
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
          <td class="cellTable">
            {{ asset.code }}
          </td>
          <td class="p-3">{{ asset.name }}</td>
          <td class="p-3">{{ asset?.group_name }}</td>
          <td class="p-3">{{ formatDate(asset.date_bought) }}</td>
          <td class="p-3">{{ asset?.inventory_source_name }}</td>
          <td class="p-3 text-right">{{ formatPrice(asset.price_origin) }}</td>
          <td class="p-3">
            {{ asset?.supplier_name }}
          </td>
          <td class="p-3">
            {{ asset?.user?.name }}
          </td>
          <td class="p-3 text-center">
            {{ formatWarranty(asset.time_warranty) }}
          </td>
          <td class="p-3 text-center">
            <div class="beacon" :class="formatColor(asset?.status)">
              {{ asset?.status_name }}
            </div>
          </td>
          <td class="p-3 w-24 flex-wrap">{{ asset.description }}</td>
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
    <ModalView1 v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> Lịch sử tài sản </template>
      <template v-slot:body>
        <tab-nav
          :tabs="['Thông tin chung', 'Quá trình sử dụng', 'Lịch sử sửa chữa']"
          :selected="selected"
          :paddingTab="true"
          @selected="setSelected"
        >
        </tab-nav>
        <the-tab :isSelected="selected == 'Quá trình sử dụng'">
          <div class="w-[1000px]">
            <table-responsive :header="headerHistory" :isShow="false"
              ><tr
                class="bg-white border-b text-left"
                v-for="(history, index) in listAssetHistory"
                :key="index"
              >
                <td class="p-3">
                  {{ formatAssetTicketType(history.ticket_type) }}
                </td>
                <td class="cellTable">
                  <a href="#">{{ formatDate(history.date_assign) }}</a>
                </td>
                <td class="p-3">{{ history?.userAssign?.name }}</td>
                <td class="p-3"></td>
                <td class="p-3"></td>
                <td class="p-3"></td>
              </tr>
            </table-responsive>
          </div>
        </the-tab>
        <the-tab :isSelected="selected == 'Lịch sử sửa chữa'">
          <div class="w-[800px]"></div>
        </the-tab>
        <the-tab :isSelected="selected == 'Thông tin chung'">
          <div class="w-[900px]">
            <div class="grid grid-cols-2 gap-0 mx-5 mt-2">
              <div class="col-span-1">
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Mã tài sản: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.code
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Tên tài sản: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Loại tài sản: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.group?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Ngày mua: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.date_bought
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Số serial: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.serial_number
                    }}</label>
                  </div>
                </div>
              </div>
              <div class="col-span-1">
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Quy cách: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail?.description
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Vị trí: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.inventorySource?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Người sử dụng: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.currentUser?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Chức vụ: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.position?.title
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-3">
                  <div class="col-span-3 text-left">
                    <label for="" class="text-[12.6px]">Phòng ban: </label>
                  </div>
                  <div class="col-span-9 text-left">
                    <label for="" class="font-bold text-left">{{
                      assetDetail.department?.title
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </the-tab>
      </template>

      <!-- <template v-slot:footer> This is a new modal footer. </template> -->
    </ModalView1>
  </div>
  <div>
    <context-menu :isActive="isActiveAsset"
      ><ul>
        <li @click.prevent="UpdateAsset()">
          <a href="#"><i class="fal fa-edit mr-4"></i>Sửa</a>
        </li>
        <li @click.prevent="DeleteAsset(assetDetail)">
          <a href="#"><i class="fal fa-trash-alt mr-4"></i>Xóa</a>
        </li>
        <hr class="mb-1" />
        <li @click.prevent="assetAssign()">
          <a href="#"><i class="fal fa-upload mr-4"></i>Cấp phát</a>
        </li>
        <li @click.prevent="assetRecall()">
          <a href="#"><i class="fal fa-download mr-4"></i>Thu hồi</a>
        </li>
        <li @click.prevent="assetRepair()">
          <a href="#"><i class="fal fa-tools mr-4"></i>Nâng cấp/Sửa chữa</a>
        </li>
        <li @click.prevent="assetBroken()">
          <a href="#"><i class="fal fa-exclamation-circle mr-4"></i>Báo hỏng</a>
        </li>
        <li @click.prevent="assetLost()">
          <a href="#"
            ><i class="fal fa-exclamation-triangle mr-4"></i>Báo mất</a
          >
        </li>
        <li @click.prevent="">
          <a href="#"><i class="fal fa-donate mr-4"></i>Thanh lý</a>
        </li>
        <li @click.prevent="assetDestroy()">
          <a href="#"><i class="fal fa-times-circle mr-4"></i>Hủy tài sản</a>
        </li>
        <hr class="mb-1" />
        <li @click.prevent="assetHistoryShow">
          <a href="#"><i class="fal fa-eye mr-4"></i>Xem lịch sử</a>
        </li>
      </ul></context-menu
    >
  </div>
</template>

<script>
import TableResponsive from "../../components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";

import panelAssetVue from "./panelAsset.vue";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import assetAddEvents from "./assetAddEvents.vue";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatAssetStatus,
} from "@/constants/FormatAll";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import ModalView1 from "@/components/modal/ModalView1.vue";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
export default {
  components: {
    TableResponsive,
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
    panelAssetVue,
    assetAddEvents,
    ModalView1,
    TheTab,
    TabNav,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isModalVisible = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAsset = ref(false);
    const assetDetail = ref({});
    const checkedAll = ref(false);
    const checkAsset = ref([]);
    const perPage = ref(25);
    const toast = useToast();
    const selected = ref("Thông tin chung");
    store.dispatch("asset/getAllAssetAction", perPage.value);
    store.dispatch("assetTicket/getAllAssetTicketTypeAction");
    const ChangePerPage = () => {
      store.dispatch("asset/getAllAssetAction", perPage.value);
    };
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
    const listAsset = computed(() => store.state.asset.listAsset);
    const listTicketType = computed(
      () => store.state.assetTicket.listTicketType
    );
    const listPagination = computed(() => store.state.asset.listPagination);
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("asset/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("asset/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, asset) => {
      if (isActiveAsset.value === true) {
        isActiveAsset.value = false;
      } else {
        isActiveAsset.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        assetDetail.value = asset;
      }
    };
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAsset.value) {
          checkAsset.value.push(listAsset.value[item].id);
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
    const UpdateAsset = () => {
      router.push(`/asset-update/${assetDetail.value.id}`);
    };
    const assetAssign = () => {
      router.push(`/asset-assign`);
    };
    const assetLost = () => {
      if (assetDetail.value.status == "LOST") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã mất");
      } else {
        router.push(`/asset-lost-add/${assetDetail.value.id}`);
      }
    };
    const assetBroken = () => {
      router.push(`/asset-broken-add/${assetDetail.value.id}`);
    };
    const assetRecall = () => {
      if (assetDetail.value.status == "LOST") {
        toast.error(
          "Tài sản mã " + assetDetail.value.code + " đã mất còn đâu mà thu hồi"
        );
      } else if (assetDetail.value.status == "UNUSED") {
        toast.error(
          "Tài sản mã " +
            assetDetail.value.code +
            " chưa sử dụng không thể thu hồi"
        );
      } else {
        router.push(`/asset-recall-add/${assetDetail.value.id}`);
      }
    };
    const assetRepair = () => {
      router.push(`/asset-repair-add/${assetDetail.value.id}`);
    };
    const assetDestroy = () => {
      if (assetDetail.value.status == "USING") {
        toast.error(
          "Tài sản đang sử dụng, phải thu hồi tài sản mã " +
            assetDetail.value.code +
            " trước khi hủy"
        );
      } else if (assetDetail.value.status == "DESTROY") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã được hủy");
      } else if (assetDetail.value.status == "LOST") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã mất");
      } else {
        router.push(`/asset-destroy-add/${assetDetail.value.id}`);
      }
    };
    const assetHistoryShow = () => {
      store.dispatch("asset/getAssetHistoryAction", {
        id: assetDetail.value.id,
      });
      setTimeout(() => {
        isModalVisible.value = true;
      }, 350);
    };
    const listAssetHistory = computed(() => store.state.asset.listAssetHistory);
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
    return {
      isModalVisible: isModalVisible,
      isOpenUpdate: isOpenUpdate,
      isActiveAsset: isActiveAsset,
      assetDetail: assetDetail,
      checkedAll: checkedAll,
      checkAsset: checkAsset,
      listAsset: listAsset,
      listTicketType: listTicketType,
      perPage: perPage,
      asset: asset,
      AssetSearch: AssetSearch,
      listPagination: listPagination,
      listAssetHistory,
      selected,
      setSelected,
      ChangePerPage,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      createAsset,
      searchAsset,
      UpdateAsset,
      DeleteAsset,
      RemoveAsset,
      assetLost,
      assetAssign,
      assetRecall,
      assetRepair,
      assetBroken,
      assetDestroy,
      assetHistoryShow,
    };
  },
  data() {
    return {
      header: [
        "Mã",
        "Tên tài sản",
        "Loại",
        "Ngày mua",
        "Vị trí",
        "Giá trị",
        "Nhà cung cấp",
        "Người quản lý",
        "Bảo hành",
        "Trạng thái",
        "Ghi chú",
      ],
      headerHistory: [
        "Loại phiếu",
        "Ngày",
        "Người sử dụng",
        "Chức danh",
        "Phòng ban",
        "Vị trí",
      ],
      files: [],
    };
  },
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
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
    formatColor(status) {
      if (status == "USING") {
        return "bg-info";
      } else if (status == "UNUSED") {
        return "bg-warning";
      }
      {
        return "beacon-liquidation";
      }
    },
    formatWarranty(value) {
      if (value == 0 || value == null) {
        return "";
      }
      {
        return value + " tháng";
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
    showModal() {
      this.isModalVisible = true;
      this.$store.dispatch("asset/getAssetHistoryAction", this.asset.value.id);
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
