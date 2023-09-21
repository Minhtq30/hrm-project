<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view
            :handleSearch="handleSearch"
            :showSearch="showModalSearch"
          ></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <asset-add-events></asset-add-events>
            <p class="text-base">Danh sách tất cả tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <nav-feature>
          <div class="flex">
            <panel-asset-vue><i class="fas fa-wrench"></i></panel-asset-vue>
          </div>
          <div class="flex items-center"></div>
          <div class="flex">
            <div class="btn-icon group relative">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
              <div
                class="absolute z-10 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-14 before:absolute"
              >
                <ul class="bg-white p-3 rounded-md">
                  <li class="w-52 sub-item">Export tất cả</li>
                  <li class="w-52 sub-item" @click="exportFile()">
                    Export dữ liệu
                  </li>
                </ul>
              </div>
            </div>
            <div class="btn-icon group relative" @click="assetImportShow()">
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
            <td class="p-3 text-right">
              <span v-if="asset.price_origin > 0">
                {{ formatPrice(asset.price_origin) }}
              </span>
            </td>
            <td class="p-3">
              {{ asset?.supplier_name }}
            </td>
            <td class="p-3 text-center">
              {{ formatWarranty(asset.time_warranty) }}
            </td>
            <td class="p-3 text-center">
              <div class="beacon" :class="formatColor(asset?.status)">
                {{ asset?.status_name }}
              </div>
            </td>
            <td class="p-3">
              {{ asset?.current_personnel_name }}
            </td>
            <td class="p-3">
              {{ asset?.department_name }}
            </td>
            <td class="p-3">
              {{ asset?.contract_number }}
            </td>
          </tr>
        </table-responsive>
      </div>
    </Transition>
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
    <ModalView1 v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> {{ assetDetail.name }} </template>
      <template v-slot:body>
        <tab-nav
          :tabs="['Thông tin chung', 'Quá trình sử dụng', 'Lịch sử sửa chữa']"
          :selected="selected"
          :paddingTab="true"
          @selected="setSelected"
        >
        </tab-nav>
        <the-tab
          :isSelected="selected == 'Quá trình sử dụng'"
          class="w-[600px]"
        >
          <div>
            <table-responsive :header="headerHistory" :isShow="false"
              ><tr
                class="bg-white border-b text-left"
                v-for="(history, index) in listAssetHistory.DATA"
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
          <div class="w-[1000px]">
            <table-responsive :header="headerRepairHistory" :isShow="false"
              ><tr
                class="bg-white border-b text-left"
                v-for="(repairHistory, index) in listAssetHistory.REPAIR"
                :key="index"
              >
                <td class="cellTable">
                  <a href="#">{{ formatDate(repairHistory.date_assign) }}</a>
                </td>
                <td class="p-3">{{ repairHistory?.description }}</td>
                <td class="p-3">{{ repairHistory?.supplier?.name }}</td>
                <td class="p-3">
                  {{ formatPrice(repairHistory?.expected_cost) }}
                </td>
                <td class="p-3"></td>
              </tr>
            </table-responsive>
          </div>
        </the-tab>
        <the-tab :isSelected="selected == 'Thông tin chung'">
          <div class="w-[800px] h-[400px]">
            <div class="grid grid-cols-2 gap-0 mx-2 mt-2">
              <div class="col-span-1">
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Mã tài sản: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.code
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Tên tài sản: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Loại tài sản:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.group?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Trạng thái: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.statusDetail?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Thời gian bảo hành(tháng):
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.time_warranty
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Khấu hao(tháng):
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.time_warranty
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Nhà cung cấp:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.supplier?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Ngày mua: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.date_bought
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Số serial: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.serial_number
                    }}</label>
                  </div>
                </div>
              </div>
              <div class="col-span-1">
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Quy cách: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail?.description
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Vị trí: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.inventorySource?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Phòng ban quản lý:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.departmentManager?.title
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Ngày mua: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.date_bought
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Số serial: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.serial_number
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label"
                      >Người sử dụng:
                    </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.currentUser?.name
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Chức vụ: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.position?.title
                    }}</label>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-5 text-left">
                    <label for="" class="form-group-label">Phòng ban: </label>
                  </div>
                  <div class="col-span-7 text-left">
                    <label for="" class="text-left">{{
                      assetDetail.department?.title
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </the-tab>
      </template>
    </ModalView1>
  </div>
  <div>
    <context-menu :isActive="isActiveAsset"
      ><ul class="">
        <li @click.prevent="UpdateAsset()">
          <a href="#"><i class="fal fa-edit mr-4"></i>Sửa</a>
        </li>
        <li @click.prevent="showModalDelete(assetDetail)">
          <a href="#"><i class="fal fa-trash-alt mr-4"></i>Xóa</a>
        </li>
        <hr class="mb-1" />
        <li @click.prevent="assetAssign()">
          <a href="#"><i class="fal fa-upload mr-4"></i>Cấp phát</a>
        </li>
        <li @click.prevent="assetRecall()">
          <a href="#"><i class="fal fa-download mr-4"></i>Thu hồi</a>
        </li>
        <li @click.prevent="assetTransfer()">
          <a href="#"><i class="fal fa-exchange mr-4"></i>Điều chuyển</a>
        </li>
        <li @click.prevent="assetRepair()">
          <a href="#"><i class="fal fa-tools mr-4"></i>Nâng cấp/Sửa chữa</a>
        </li>
        <li @click.prevent="assetBroken()">
          <a href="#"><i class="fal fa-exclamation-circle mr-4"></i>Báo hỏng</a>
        </li>
        <hr class="mb-1" />
        <li @click.prevent="assetLost()">
          <a href="#"
            ><i class="fal fa-exclamation-triangle mr-4"></i>Báo mất</a
          >
        </li>
        <li @click.prevent="assetDestroy()">
          <a href="#"><i class="fal fa-times-circle mr-4"></i>Hủy tài sản</a>
        </li>
        <li @click.prevent="assetLiquidated()">
          <a href="#"><i class="fal fa-donate mr-4"></i>Thanh lý</a>
        </li>
        <hr class="mb-1" />
        <li @click.prevent="assetHistoryShow">
          <a href="#"><i class="fal fa-eye mr-4"></i>Xem nhanh</a>
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
  <div>
    <ModalView1 v-show="isModalVisibleDelete" @close="closeModalDelete">
      <template v-slot:header>
        <div class="p-1">Xóa tài sản</div>
      </template>
      <template v-slot:body
        ><div class="grid grid-cols-12 gap-1 mt-6 pr-4">
          <div class="col-span-1">
            <i class="fas fa-backspace fa-1x"></i>
            <!-- <i class="fal fa-trash-alt fa-1x"></i> -->
          </div>
          <div class="col-span-11">
            <a class="text-left"
              >Bạn có chắc chắn muốn xóa tài sản mã:
              <span class="px-1 font-bold"> {{ assetDetail.code }}</span
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
            @click="deleteData(assetDetail)"
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
  <div>
    <ModalView1 v-show="isModalVisibleSearch" @close="closeModalSearch">
      <template v-slot:header><div class="p-1">TÌM KIẾM</div></template>
      <template v-slot:body
        ><div class="grid grid-cols-1 gap-1 mt-2 w-[450px]">
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Từ khóa</label>
            <div class="mt-1">
              <input
                type="text"
                class="form-control-input"
                placeholder="Nhập từ khóa"
                title=""
                v-model="multiParams.code"
              />
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Ngày mua</label>
            <div class="mt-1">
              <date-picker
                v-model="multiParams.date_bought"
                is-expanded
              ></date-picker>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Trạng thái</label>
            <div class="departInput mt-1">
              <div class="departInput placeholder:text-lg">
                <v-select
                  label="name"
                  :options="listAssetStatus"
                  :reduce="(status) => status.code"
                  multiple
                  append-to-body
                  placeholder="Chọn nhiều"
                  class="rounded-3xl"
                  v-model="multiParams.status_code"
                >
                  <template #option="{ name }">
                    <div class="" style="display: flex; align-items: baseline">
                      <strong>{{ name }}</strong>
                    </div>
                  </template>
                </v-select>
              </div>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Phòng ban sử dụng</label>
            <div class="departInput mt-1">
              <div class="departInput placeholder:text-lg">
                <v-select
                  label="title"
                  :options="listDepartments"
                  :reduce="(department) => department.ID"
                  @input="searchDepartment"
                  append-to-body
                  placeholder="Nhập mã hoặc tên"
                  class="rounded-3xl"
                  v-model="multiParams.department_id"
                >
                  <template #option="{ title }">
                    <div
                      class="departInput"
                      style="display: flex; align-items: baseline"
                    >
                      <strong>{{ title }}</strong>
                    </div>
                  </template>
                </v-select>
              </div>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Người sử dụng</label>
            <div class="mt-1">
              <div class="placeholder:text-lg">
                <v-select
                  label="name"
                  :options="listPerson"
                  :reduce="(person) => person.ID"
                  @input="searchPerson"
                  placeholder="Nhập mã hoặc tên"
                  class="rounded-3xl"
                  append-to-body
                  v-model="multiParams.person_id"
                >
                  <template #option="{ work_place_current, name }">
                    <div style="display: flex; align-items: baseline">
                      <strong>{{ name }}</strong>
                      <em style="margin-left: 0.5rem"
                        >- {{ work_place_current?.title }}</em
                      >
                    </div>
                  </template>
                </v-select>
              </div>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Hợp đồng/hóa đơn</label>
            <div class="mt-1">
              <input
                type="text"
                class="form-control-input"
                placeholder="Nhập từ khóa"
                title=""
                v-model="multiParams.contract_number"
              />
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
            @click="multiSearch()"
          >
            Tìm
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalSearch()"
            aria-label="Đóng"
          >
            Hủy bỏ
          </button>
        </div>
      </template>
    </ModalView1>
  </div>
</template>
<style>
.delete-btn {
  padding: 0.5em 1em;
  background-color: #eccfc9;
  color: #c5391a;
  border: 2px solid #ea3f1b;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}
.departInput {
  z-index: 100;
}
</style>
<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import panelAssetVue from "./panelAsset.vue";
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import assetAddEvents from "./assetAddEvents.vue";
import { utils, writeFileXLSX } from "xlsx";
import NavFeature from "@/components/navbar/NavFeature.vue";
import SearchView from "@/components/search/SearchView1.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatAssetStatus,
  FormatPrice,
} from "@/constants/FormatAll";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import ModalView1 from "@/components/modal/ModalView1.vue";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import _ from "lodash";
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
    NavFeature,
    SearchView,
    datePicker,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isModalVisible = ref(false);
    const isModalVisibleDelete = ref(false);
    const isModalVisibleSearch = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAsset = ref(false);
    const assetDetail = ref({});
    const checkedAll = ref(false);
    const isLoading = ref(true);
    const checkAsset = ref([]);
    const perPage = ref("25");
    const toast = useToast();
    const selected = ref("Thông tin chung");
    const columns = ref([]);
    const multiParams = reactive({
      code: "",
      date_bought: null,
      status_code: null,
      department_id: null,
      person_id: null,
      contract_number: "",
    });

    const EndLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("asset/getAllAssetAction", {
      perPage: perPage.value,
      EndLoading: EndLoading,
    });
    store.dispatch("assetTicket/getAllAssetTicketTypeAction");
    const listAsset = computed(() => store.state.asset.listAsset);
    const listAssetStatus = computed(
      () => store.state.assetStatus.listAssetStatus
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listTicketType = computed(
      () => store.state.assetTicket.listTicketType
    );
    const listPerson = computed(() => store.state.asset.listPerson);
    const listPagination = computed(() => store.state.asset.listPagination);
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("asset/GetNextPageAction", dataUrl);
      setTimeout(() => {
        isLoading.value = false;
      }, 200);
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
    const UpdateAsset = () => {
      router.push(`/asset-update/${assetDetail.value.id}`);
    };
    const assetAssign = () => {
      if (assetDetail.value.status == "USING") {
        toast.error(
          "Tài sản mã " +
            assetDetail.value.code +
            " đang được sử dụng hãy chọn tài sản khác"
        );
      } else {
        router.push(`/asset-assign-add`);
      }
    };
    const assetLost = () => {
      if (assetDetail.value.status == "LOST") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã mất");
      } else if (assetDetail.value.status == "LIQUIDATED") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã thanh lý");
      } else if (assetDetail.value.status == "DESTROY") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã bị hủy");
      } else {
        router.push(`/asset-lost-add/${assetDetail.value.id}`);
      }
    };
    const assetBroken = () => {
      if (assetDetail.value.status == "LOST") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã mất");
      } else if (assetDetail.value.status == "REPAIR") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đang sửa chữa");
      } else if (assetDetail.value.status == "BROKEN") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đang bị hỏng");
      } else if (assetDetail.value.status == "LIQUIDATED") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã thanh lý");
      } else if (assetDetail.value.status == "DESTROY") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã bị hủy");
      } else {
        router.push(`/asset-broken-add/${assetDetail.value.id}`);
      }
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
      } else if (assetDetail.value.status == "REPAIR") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đang sửa chữa");
      } else if (assetDetail.value.status == "BROKEN") {
        toast.error(
          "Tài sản mã " +
            assetDetail.value.code +
            " đang bị hỏng không thể thu hồi"
        );
      } else if (assetDetail.value.status == "LIQUIDATED") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã thanh lý");
      } else if (assetDetail.value.status == "DESTROY") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã bị hủy");
      } else {
        router.push(`/asset-recall-add/${assetDetail.value.id}`);
      }
    };
    const assetRepair = () => {
      if (assetDetail.value.status == "LOST") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã mất");
      } else if (assetDetail.value.status == "REPAIR") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đang sửa chữa");
      } else if (assetDetail.value.status == "LIQUIDATED") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã thanh lý");
      } else if (assetDetail.value.status == "DESTROY") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã bị hủy");
      } else {
        router.push(`/asset-repair-add/${assetDetail.value.id}`);
      }
    };
    const assetTransfer = () => {
      if (assetDetail.value.status == "LOST") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã mất");
      } else if (assetDetail.value.status == "REPAIR") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đang sửa chữa");
      } else if (assetDetail.value.status == "LIQUIDATED") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã thanh lý");
      } else if (assetDetail.value.status == "DESTROY") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã bị hủy");
      } else {
        router.push(`/asset-transfer-add/${assetDetail.value.id}`);
      }
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
    const assetLiquidated = () => {
      if (assetDetail.value.status == "USING") {
        toast.error(
          "Hãy thu hồi tài sản " +
            assetDetail.value.code +
            " trước khi thanh lý"
        );
      } else if (assetDetail.value.status == "LOST") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã mất");
      } else if (assetDetail.value.status == "LIQUIDATED") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã thanh lý");
      } else if (assetDetail.value.status == "DESTROY") {
        toast.error("Tài sản mã " + assetDetail.value.code + " đã bị hủy");
      } else {
        router.push(`/asset-liquidated-add/${assetDetail.value.id}`);
      }
    };
    const assetHistoryShow = () => {
      router.push(`/asset-view/${assetDetail.value.id}`);
    };
    const assetImportShow = () => {
      router.push(`/asset-import`);
    };
    const listAssetHistory = computed(() => store.state.asset.listAssetHistory);
    const RemoveAsset = () => {
      for (var i = 0; i < checkAsset.value.length; i++) {
        let dataUrl = {
          dataID: checkAsset.value[i],
          perPage: perPage.value,
        };
        store.dispatch("asset/DeleteAssetAction", dataUrl);
      }
    };
    const handleSearch = (index) => {
      isLoading.value = true;
      store.dispatch("asset/SearchAssetAction", index);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    return {
      isModalVisible,
      isModalVisibleDelete,
      isModalVisibleSearch,
      isOpenUpdate,
      isActiveAsset,
      assetDetail,
      checkedAll,
      checkAsset,
      listAsset,
      listTicketType,
      perPage,
      listPagination,
      listAssetHistory,
      listDepartments,
      listPerson,
      selected,
      handleSearch,
      setSelected,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      UpdateAsset,
      toast,
      RemoveAsset,
      assetLost,
      assetAssign,
      assetRecall,
      assetRepair,
      assetBroken,
      assetDestroy,
      assetHistoryShow,
      assetLiquidated,
      assetTransfer,
      isLoading,
      EndLoading,
      multiParams,
      listAssetStatus,
      assetImportShow,
      columns,
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
        "Nguyên giá",
        "Nhà cung cấp",
        "Bảo hành",
        "Trạng thái",
        "Người sử dụng",
        "Phòng ban",
        "Hợp đồng/hóa đơn",
      ],
      headerHistory: [
        "Loại phiếu",
        "Ngày",
        "Người sử dụng",
        "Chức danh",
        "Phòng ban",
        "Vị trí",
      ],
      headerRepairHistory: [
        "Ngày",
        "Nội dung",
        "Đơn vị sửa chữa",
        "Chi phí",
        "Ghi chú",
      ],
      masks: {
        input: "DD/MM/YYYY",
        data: "YYYY-MM-DD",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
      files: [],
    };
  },
  methods: {
    formatPrice(value) {
      return FormatPrice(value);
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
        return "Thêm mới";
      } else {
        return FormatAssetStatus(code, arr);
      }
    },
    showModal() {
      this.isModalVisible = true;
      this.$store.dispatch("asset/getAssetHistoryAction", this.asset.value.id);
    },
    multiSearch() {
      for (const key in this.multiParams) {
        const val = this.multiParams[key];
        if (val === null) {
          this.multiParams[key] = "";
        }
      }
      this.$store.dispatch("asset/SearchMultilAssetAction", this.multiParams);
      this.isModalVisibleSearch = false;
    },
    showModalSearch() {
      this.isModalVisibleSearch = true;
      this.$store.dispatch("assetStatus/getAllAssetStatusAction", "50");
    },
    closeModalSearch() {
      this.isModalVisibleSearch = false;
    },
    closeModal() {
      this.isModalVisible = false;
    },

    showModalDelete(assetDetail) {
      if (assetDetail.status == "USING") {
        this.toast.error(
          "Hãy thu hồi tài sản " + assetDetail.code + " trước khi xóa"
        );
      } else {
        this.isModalVisibleDelete = true;
      }
    },
    closeModalDelete() {
      this.isModalVisibleDelete = false;
    },
    deleteData(assetDetail) {
      const dataUrl = {
        dataID: assetDetail.id,
        perPage: this.perPage,
      };
      this.$store.dispatch("asset/DeleteAssetAction", {
        dataUrl,
        toast: this.toast,
        EndLoading: this.EndLoading,
        store: this.$store,
      });
      this.isModalVisibleDelete = false;
    },
    searchPerson: _.debounce(function (e) {
      this.$store.dispatch("asset/SearchPersonAction", e.target.value);
    }, 350),
    searchDepartment: _.debounce(function (e) {
      this.$store.dispatch(
        "departments/getAllDepartmentsAction",
        e.target.value
      );
    }, 350),
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
      utils.book_append_sheet(wb, ws, "Data");
      // const max_width = edata.reduce((w, r) => Math.max(w, r.name.length), 10);
      // ws["!cols"] = [{ wch: max_width }];
      writeFileXLSX(wb, "ALL_ASSET.xlsx");
    },
  },
};
</script>
