<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center ml-4">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="ml-2 text-base">Danh mục nguồn gốc tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex">
          <div
            class="btn-icon"
            title="Import"
            v-if="checkAssetOrigin.length == 0"
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Export"
            v-if="checkAssetOrigin.length > 0"
          >
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveAssetOrigin"
            v-if="checkAssetOrigin?.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
          ><tr
            class="bg-white border-b text-left"
            v-for="(assetOrigin, index) in listAssetOrigins"
            :key="index"
            :class="{ isCheck: CheckedBox(assetOrigin.id) }"
            @contextmenu.prevent="rightClick($event, assetOrigin)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkAssetOrigin"
                  :value="assetOrigin.id"
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
          {{ AssetOrigin.ID }}
        </th> -->
            <td class="p-3">{{ assetOrigin.code }}</td>
            <td class="p-3">{{ assetOrigin.name }}</td>
            <td class="p-3">{{ assetOrigin.description }}</td>
            <td class="p-3">{{ formatStatus(assetOrigin.is_active) }}</td>
          </tr></table-responsive
        >
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="flex justify-end p-4">
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
        ></pagination-view></div
    ></template>
  </person-layout>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div style="width: 500px">
        <h1 class="header-modal">Thêm mới</h1>
        <div class="text-left">
          <div class="grid grid-cols-1 px-4 py-2">
            <div class="flex-inline">
              <label for="">Mã<span class="text-red-600"> (*)</span></label>
              <div class="mt-1">
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mã"
                    v-model="assetOrigin.code"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Tên</label>
              <div class="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="assetOrigin.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Mô tả</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder=""
                  v-model="assetOrigin.description"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="form-large flex items-center mt-2 px-4">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                true-value="1"
                false-value="0"
                v-model="assetOrigin.is_active"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Kích hoạt</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createAssetOrigin()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div style="width: 500px">
        <h1 class="header-modal">Sửa dữ liệu</h1>
        <div class="text-left">
          <div class="grid grid-cols-1 px-4 py-2">
            <div class="flex-inline">
              <label for="">Mã<span class="text-red-600"> (*)</span></label>
              <div class="mt-1">
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập mã"
                    v-model="assetOriginDetail.code"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Tên</label>
              <div class="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="assetOriginDetail.name"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Sắp xếp</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder=""
                  v-model="assetOriginDetail.description"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="form-large flex items-center mt-2 px-4">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                true-value="1"
                false-value="0"
                v-model="assetOriginDetail.is_active"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Kích hoạt</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button
            class="button-modal"
            @click="UpdateAssetOriginDetail(AssetOriginDetail)"
          >
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <div>
    <context-menu :isActive="isActiveAssetOrigin"
      ><ul>
        <li @click.prevent="UpdateAssetOrigin()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="DeleteAssetOrigin(assetOriginDetail)">
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
import SidebarAsset from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
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
    SidebarAsset,
    NavbarSocial,
    SearchView,
  },
  methods: {
    formatStatus(status) {
      return FormatStatus(status);
    },
  },
  setup() {
    const store = useStore();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAssetOrigin = ref(false);
    const assetOriginDetail = ref({});
    const checkedAll = ref(false);
    const checkAssetOrigin = ref([]);
    const perPage = ref(25);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    // const isModalVible = ref(false);
    // const fields = "id,name,source_code,phone,description,email,is_active";
    store.dispatch("assetOrigins/getAllAssetOriginsAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("assetOrigins/getAllAssetOriginsAction", perPage.value);
    };
    const AssetOriginSearch = ref("");
    const assetOrigin = reactive({
      code: "",
      name: "",
      description: "",
      is_active: "1",
    });
    const listAssetOrigins = computed(
      () => store.state.assetOrigins.listAssetOrigins
    );
    const listPagination = computed(
      () => store.state.assetOrigins.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("assetOrigins/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("assetOrigins/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, assetOrigin) => {
      if (isActiveAssetOrigin.value === true) {
        isActiveAssetOrigin.value = false;
      } else {
        isActiveAssetOrigin.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e, 300);
        FormatModalY(menu, e);
        assetOriginDetail.value = assetOrigin;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAssetOrigins.value) {
          checkAssetOrigin.value.push(listAssetOrigins.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkAssetOrigin.value.splice(0, checkAssetOrigin.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAssetOrigin.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
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
    const UpdateAssetOrigin = () => {
      isOpenUpdate.value = true;
    };
    const createAssetOrigin = () => {
      const data = {
        code: assetOrigin.code,
        name: assetOrigin.name,
        description: assetOrigin.description,
        is_active: assetOrigin.is_active,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("assetOrigins/createAssetOriginAction", dataUrl);
      isOpenDetail.value = false;
      (assetOrigin.code = ""),
        (assetOrigin.name = ""),
        (assetOrigin.description = ""),
        (assetOrigin.is_active = "1");
    };
    const searchAssetOrigin = () => {
      store.dispatch(
        "assetOrigins/SearchAssetOriginAction",
        AssetOriginSearch.value
      );
    };
    const UpdateAssetOriginDetail = (assetOriginDetail) => {
      const dataUrl = {
        data: assetOriginDetail,
        perPage: perPage.value,
      };
      store.dispatch("assetOrigins/UpdateAssetOriginAction", dataUrl);
      isOpenUpdate.value = false;
    };
    const DeleteAssetOrigin = (assetOriginDetail) => {
      const dataUrl = {
        dataID: assetOriginDetail.id,
        perPage: perPage.value,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            assetOriginDetail.code +
            " ?"
        )
      ) {
        store.dispatch("assetOrigins/DeleteAssetOriginAction", dataUrl);
      }
    };
    const RemoveAssetOrigin = () => {
      for (var i = 0; i < checkAssetOrigin.value.length; i++) {
        let dataUrl = {
          dataID: checkAssetOrigin.value[i],
          perPage: perPage.value,
        };
        store.dispatch("assetOrigins/DeleteAssetOriginAction", dataUrl);
      }
    };
    const handleSearch = (index) => {
      isLoading.value = true;
      store.dispatch("assetOrigins/SearchAssetOriginAction", index);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveAssetOrigin: isActiveAssetOrigin,
      assetOriginDetail: assetOriginDetail,
      checkedAll: checkedAll,
      checkAssetOrigin: checkAssetOrigin,
      listAssetOrigins: listAssetOrigins,
      listPagination: listPagination,
      perPage: perPage,
      assetOrigin: assetOrigin,
      AssetOriginSearch: AssetOriginSearch,
      isLoading,
      ChangePerPage,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      UpdateAssetOrigin,
      createAssetOrigin,
      searchAssetOrigin,
      UpdateAssetOriginDetail,
      DeleteAssetOrigin,
      RemoveAssetOrigin,
      handleSearch,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Sắp xếp", "Trạng thái"],
    };
  },
};
</script>
<style></style>
