<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="ml-2 font-medium">KHẤU HAO TÀI SẢN</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <nav-feature>
          <div class="flex"></div>
        </nav-feature></div
    ></template>
    <div class="w-full">
      <table-responsive class="tableReduction" :header="header" :isShow="false">
        <template v-for="(assetReduction, index) in listReduction" :key="index">
          <tr class="bg-white border-b text-left" :class="checkSelected(index)">
            <td @click="expandClicked(assetReduction)" class="py-3 px-6">
              <i
                class="fas fa-caret-right"
                v-if="!isShowDetails"
                title="Click vào để xem chi tiết"
              ></i>
              <i
                v-else
                class="fas fa-caret-down"
                aria-hidden="true"
                title="Click vào để thu gọn dòng"
              ></i>
            </td>
            <td class="cellTable">{{ assetReduction.code }}</td>
            <td class="p-3">{{ assetReduction.name }}</td>
            <td class="p-3">{{ assetReduction.group?.name }}</td>
            <td class="p-3 text-center">
              {{ formatDate(assetReduction?.date_used_origin) }}
            </td>
            <td class="p-3 text-center">
              {{ formatDate(assetReduction?.date_end_origin) }}
            </td>
            <td class="p-3 text-right">
              {{ formatPrice(assetReduction?.price_origin) }}
            </td>
            <td class="p-3 text-center">
              {{ assetReduction?.reduction_time_origin }} <span>Tháng</span>
            </td>
            <td class="p-3 text-right">
              {{
                formatPrice(
                  assetReduction?.reductions[0]?.price_reduction_begin
                )
              }}
            </td>
            <td class="p-3 text-right">
              {{ formatPrice(assetReduction?.reductions[0]?.price_reduction) }}
            </td>
            <td class="p-3 text-right">
              {{ formatPrice(assetReduction?.reductions[0]?.price_residual) }}
            </td>
            <td class="p-3 text-left">
              {{ assetReduction?.current_personnel_name }} -
              <span class="italic">{{ assetReduction?.position_name }}</span>
            </td>
            <td class="p-3 text-left">
              {{ assetReduction?.department_name }}
            </td>
          </tr>
          <tr v-if="ExpandDetails.includes(assetReduction.id)" class="tableBg">
            <td colspan="11" class="mt-0">
              <div class="ml-[50px] mt-0">
                <table class="tableReductionDetails">
                  <thead class="mt-8">
                    <tr>
                      <th class="text-center">Năm khấu hao</th>
                      <th class="text-center">Tháng khấu hao</th>
                      <th class="text-center">Ngày bắt đầu</th>
                      <th class="text-right">Tổng GT đã khấu hao</th>
                      <th class="text-right">GT KH trong tháng</th>
                      <th class="text-right">Giá trị còn lại</th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr
                      class="border-b"
                      v-for="reductionRow in listReductionById.reductions"
                      :key="reductionRow.id"
                    >
                      <td class="cellTable text-center">
                        {{ reductionRow.year }}
                      </td>
                      <td class="cellTable text-center">
                        <span>Tháng</span>
                        {{ reductionRow.month }}
                      </td>
                      <td class="cellTable text-center">
                        {{ formatDate(reductionRow.date_begin) }}
                      </td>
                      <td class="cellTable text-right">
                        {{ formatPrice(reductionRow.price_reduction_begin) }}
                      </td>
                      <td class="cellTable text-right">
                        {{ formatPrice(reductionRow.price_reduction) }}
                      </td>
                      <td class="cellTable text-right">
                        {{ formatPrice(reductionRow?.price_residual) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
            <td></td>
            <td></td>
          </tr>
        </template>
      </table-responsive>
      <div class="flex justify-end p-4">
        <pagination-view
          :listPagination="listPagination"
          :NextPage="NextPage"
          :PrevPage="PrevPage"
        ></pagination-view>
      </div>
    </div>
  </person-layout>
</template>
<style>
table.tableReduction > thead tr th:nth-child(3) {
  text-align: left;
}
table.tableReduction > thead tr th:nth-child(5) {
  text-align: left;
}
table.tableReduction > thead tr th:nth-child(6) {
  text-align: center;
}
table.tableReduction > thead tr th:nth-child(7) {
  text-align: right;
}
table.tableReduction > thead tr th:nth-child(8) {
  text-align: right;
}
table.tableReduction > thead tr th:nth-child(12) {
  text-align: right;
}
table.tableReductionDetails > th,
td {
  padding: 0px;
}
.tableBg {
  background: rgb(250, 250, 238);
}
</style>
<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TableResponsive,
    PersonLayout,
    SidebarAsset,
    NavbarSocial,
  },
  setup() {
    const store = useStore();
    const assetDetail = ref({});
    const checkedAll = ref(false);
    const checkAsset = ref([]);
    const perPage = ref(25);
    const ExpandDetails = ref([]);
    const isShowDetails = ref(false);
    store.dispatch("asset/getReductionAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("asset/getReductionAction", perPage.value);
    };
    const AssetSearch = ref("");
    const listReduction = computed(() => store.state.asset.listReduction);
    const listPagination = computed(
      () => store.state.asset.listPaginationReduction
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
    const listReductionById = computed(
      () => store.state.asset.listReductionById
    );
    return {
      ExpandDetails,
      isShowDetails,
      assetDetail: assetDetail,
      checkedAll: checkedAll,
      checkAsset: checkAsset,
      listReduction,
      perPage: perPage,
      AssetSearch: AssetSearch,
      listPagination: listPagination,
      ChangePerPage,
      NextPage,
      PrevPage,
      listReductionById,
    };
  },
  data() {
    return {
      header: [
        " ",
        "Mã",
        "Tên tài sản",
        "Loại tài sản",
        "Ngày bắt đầu KH",
        "Ngày DK hết KH",
        "Nguyên giá",
        "Tổng Khấu hao",
        "GT đã khấu hao",
        "GT KH trong tháng",
        "GT Còn lại",
        "Người sử dụng",
        "Phòng ban",
      ],
      headerReduction: [
        "Năm khấu hao",
        "KH trong năm",
        "Giá trị đã khấu hao",
        "GT chuyển kỳ sau",
      ],
      isModalVisible: false,
    };
  },
  methods: {
    formatPrice(value) {
      if (value != null || value != null) {
        let val = (value / 1).toFixed(0).replace(",", ".");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    expandClicked(value) {
      const key = this.ExpandDetails.find((item) => item == value.id);
      const id = this.ExpandDetails.indexOf(value.id);
      if (key !== value.id) {
        if (id > -1) {
          // this.ExpandDetails.splice(id, 1);
          this.listReductionById = [];
        } else {
          this.ExpandDetails = [];
          this.ExpandDetails.push(value.id);
          this.$store.dispatch("asset/getReductionByIdAction", value.id);
        }
      } else {
        this.ExpandDetails.splice(id, 1);
      }
    },
    checkSelected(id) {
      const key = this.ExpandDetails.find((item) => item == id);
      if (key) {
        this.isShowDetails = true;
        return "isCheck";
      } else {
        this.isShowDetails = false;
        return "";
      }
    },
  },
};
</script>
