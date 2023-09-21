<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-asset></sidebar-setting-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="text-base">Danh mục loại tài sản</p>
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
            v-if="checkAssetType?.length == 0"
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Export"
            v-if="checkAssetType?.length > 0"
          >
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveAssetType"
            v-if="checkAssetType?.length > 0"
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
            v-for="(assetType, index) in listAssetTypes"
            :key="index"
            :class="{ isCheck: CheckedBox(assetType.id) }"
            @contextmenu.prevent="rightClick($event, assetType)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkAssetType"
                  :value="assetType.id"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="p-3">{{ assetType.code }}</td>
            <td class="p-3">{{ assetType.name }}</td>
            <td class="p-3">{{ assetType.description }}</td>
            <td class="p-3">{{ assetType.parent_id }}</td>
            <td class="p-3">{{ formatStatus(assetType.is_active) }}</td>
          </tr>
        </table-responsive>
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
                    v-model="assetType.code"
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
                  v-model="assetType.name"
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
                  v-model="assetType.description"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Cha</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder=""
                  v-model="assetType.parent_id"
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
                v-model="assetType.is_active"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Kích hoạt</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createAssetType()">
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
                    v-model="assetTypeDetail.code"
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
                  v-model="assetTypeDetail.name"
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
                  v-model="assetTypeDetail.description"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 px-4 py-2">
            <div>
              <label for="">Cha</label>
              <div class="mt-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder=""
                  v-model="assetTypeDetail.parent_id"
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
                v-model="assetTypeDetail.is_active"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Kích hoạt</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateAssetTypeDetail">
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
    <context-menu :isActive="isActiveAssetType"
      ><ul>
        <li @click.prevent="UpdateAssetType">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="DeleteAssetType">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
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
import SearchView from "@/components/search/SearchView.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import {
  FormatModalX,
  FormatModalY,
  FormatStatus,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";

export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingAsset,
    NavbarSocial,
    SearchView,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAssetType = ref(false);
    const assetTypeDetail = ref({});
    const checkedAll = ref(false);
    const checkAssetType = ref([]);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    store.dispatch("assetTypes/getAllAssetTypesAction", 25);
    const AssetTypeSearch = ref("");
    const assetType = reactive({
      code: "",
      name: "",
      is_active: "0",
      description: "",
      parent_id: "",
    });
    const listAssetTypes = computed(
      () => store.state.assetTypes.listAssetTypes
    );
    const listPagination = computed(
      () => store.state.assetTypes.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("assetTypes/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("assetTypes/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, assetType) => {
      if (isActiveAssetType.value === true) {
        isActiveAssetType.value = false;
      } else {
        isActiveAssetType.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        assetTypeDetail.value = assetType;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAssetTypes.value) {
          checkAssetType.value.push(listAssetTypes.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkAssetType.value.splice(0, checkAssetType.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAssetType.value.find((item) => item === index)) {
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
      assetType.code = "";
      assetType.name = "";
      assetType.is_active = "0";
      assetType.description = "";
      assetType.parent_id = "";
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const UpdateAssetType = () => {
      isOpenUpdate.value = true;
    };
    const createAssetType = () => {
      const data = {
        code: assetType.code,
        name: assetType.name,
        is_active: assetType.is_active,
        description: assetType.description,
        parent_id: assetType.parent_id,
      };
      store.dispatch("assetTypes/createAssetTypeAction", {
        data: data,
        toast,
        handleCloseDetail,
      });
    };
    const searchAssetType = () => {
      store.dispatch("assetTypes/SearchAssetTypeAction", AssetTypeSearch.value);
    };
    const UpdateAssetTypeDetail = () => {
      const dataUrl = {
        data: assetTypeDetail.value,
      };
      store.dispatch("assetTypes/UpdateAssetTypeAction", dataUrl);
      isOpenUpdate.value = false;
    };
    const DeleteAssetType = () => {
      const dataUrl = {
        dataID: assetTypeDetail.value.id,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            assetTypeDetail.value.code +
            " ?"
        )
      ) {
        store.dispatch("assetTypes/DeleteAssetTypeAction", dataUrl);
      }
    };
    const RemoveAssetType = () => {
      for (var i = 0; i < checkAssetType.value.length; i++) {
        let dataUrl = {
          dataID: checkAssetType.value[i],
        };
        store.dispatch("assetTypes/DeleteAssetTypeAction", dataUrl);
      }
    };
    const handleSearch = (index) => {
      isLoading.value = true;
      store.dispatch("assetTypes/SearchAssetTypeAction", index);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveAssetType: isActiveAssetType,
      assetType: assetType,
      listAssetTypes: listAssetTypes,
      AssetTypeSearch: AssetTypeSearch,
      assetTypeDetail: assetTypeDetail,

      listPagination: listPagination,
      checkedAll: checkedAll,
      checkAssetType: checkAssetType,
      isLoading,
      rightClick,
      checkedAllItem,
      CheckedBox,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      UpdateAssetType,
      createAssetType,
      searchAssetType,
      NextPage,
      PrevPage,
      UpdateAssetTypeDetail,
      DeleteAssetType,
      RemoveAssetType,
      handleSearch,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Mô tả", "Lớp cha", "Kích hoạt"],
    };
  },
  methods: {
    formatStatus(status) {
      return FormatStatus(status);
    },
  },
};
</script>
<style></style>
