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
            <p class="ml-2 font-medium">Danh sách tài sản mất, hủy, thanh lý</p>
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
          <td class="p-3">{{ asset?.status_name }}</td>
          <td class="p-3">{{ asset?.current_personnel_name }}</td>
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import assetAddEvents from "../assetAddEvents.vue";
import { useRouter } from "vue-router";
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
    const status1 = ref("LOST,DESTROY,LIQUIDATED");
    store.dispatch("asset/getAssetLostAction", {
      status: status1.value,
      perPage: perPage.value,
    });
    const ChangePerPage = () => {
      store.dispatch("asset/getAssetLostAction", {
        status: status1.value,
        perPage: perPage.value,
      });
    };
    const AssetSearch = ref("");
    const listAsset = computed(() => store.state.asset.listAssetLost);
    const listPagination = computed(() => store.state.asset.listPaginationLost);
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
    const assetReused = () => {
      router.push(`/asset-reused-add/${assetDetail.value.id}`);
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
      AssetSearch: AssetSearch,
      listPagination: listPagination,
      ChangePerPage,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      RemoveAsset,
      assetReused,
      assetHistoryShow,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên tài sản", "Loại", "Ngày", "Trạng thái", "Lý do"],
      isModalVisible: false,
      files: [],
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
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
