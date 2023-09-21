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
            <p class="ml-2 font-medium">Danh sách tài sản sửa chữa bảo dưỡng</p>
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
          <td class="cellTable">{{ asset.code }}</td>
          <td class="p-3">{{ asset.name }}</td>
          <td class="p-3">{{ asset?.group_name }}</td>
          <td class="p-3">{{ formatDate(asset?.ticket?.date_assign) }}</td>
          <td class="p-3">{{ asset.repairSupplier?.name }}</td>
          <td class="p-3">{{ formatPrice(asset.expected_cost) }}</td>
          <td class="p-3">{{ asset.repair_description }}</td>
        </tr>
      </table-responsive>
    </div>
    <template v-slot:sub_footer v-if="listAsset?.length"
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
        <li @click.prevent="assetReused()">
          <a href="#"><i class="fal fa-undo mr-4"></i>Sử dụng lại</a>
        </li>
        <li @click.prevent="assetLiquidated()">
          <a href="#"><i class="fal fa-donate mr-4"></i>Thanh lý</a>
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
import assetAddEvents from "../assetAddEvents.vue";
import { FormatDate } from "@/constants/FormatAll";
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
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAsset = ref(false);
    const assetDetail = ref({});
    const checkedAll = ref(false);
    const checkAsset = ref([]);
    const perPage = ref(25);
    const status1 = ref("REPAIR");
    store.dispatch("asset/getAssetRepairAction", {
      status: status1.value,
      perPage: perPage.value,
    });
    const ChangePerPage = () => {
      store.dispatch("asset/getAssetRepairAction", {
        status: status1.value,
        perPage: perPage.value,
      });
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
    const listAsset = computed(() => store.state.asset.listAssetRepair);
    const listPagination = computed(
      () => store.state.asset.listPaginationRepair
    );
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
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        assetDetail.value = asset;
      }
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
    const assetLiquidated = () => {
      router.push(`/asset-liquidated-add/${assetDetail.value.id}`);
    };
    const assetReused = () => {
      router.push(`/asset-reused-add/${assetDetail.value.id}`);
    };
    const UpdateAssetDetail = (assetDetail) => {
      const dataUrl = {
        data: assetDetail,
        perPage: perPage.value,
      };
      store.dispatch("asset/UpdateAssetAction", dataUrl);
      isOpenUpdate.value = false;
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
    const assetHistoryShow = () => {
      router.push(`/asset-view/${assetDetail.value.id}`);
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveAsset: isActiveAsset,
      assetDetail: assetDetail,
      checkedAll: checkedAll,
      checkAsset: checkAsset,
      listAsset: listAsset,
      perPage: perPage,
      asset: asset,
      AssetSearch: AssetSearch,
      listPagination: listPagination,
      ChangePerPage,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      createAsset,
      searchAsset,
      UpdateAssetDetail,
      DeleteAsset,
      RemoveAsset,
      assetLiquidated,
      assetReused,
      assetHistoryShow,
    };
  },
  data() {
    return {
      header: [
        "Mã",
        "Tên tài sản",
        "Loại",
        "Ngày sửa chữa",
        "Tên đơn vị sửa",
        "Chi phí dự kiến",
        "Nguyên nhân",
        "Vị trí",
        "Ghi chú",
      ],
      isModalVisible: false,
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
  },
};
</script>
