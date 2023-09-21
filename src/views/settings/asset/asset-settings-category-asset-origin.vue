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
            <p class="text-base">Danh mục nguồn gốc tài sản</p>
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
                  v-model="checkAssetOrigin"
                  :value="assetOrigin.id"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable">{{ assetOrigin.code }}</td>
            <td class="cellTable">{{ assetOrigin.name }}</td>
            <td class="cellTable">{{ assetOrigin.description }}</td>
            <td class="cellTable">{{ formatStatus(assetOrigin.is_active) }}</td>
          </tr></table-responsive
        >
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
        <h1 class="header-modal">Tạo mới</h1>
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
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  class="form-control-input"
                  v-model="assetOrigin.description"
                ></textarea>
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
            <div class="ml-2">
              <span v-if="assetOrigin.is_active == 1">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </div>
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
              <label for="">Mô tả</label>
              <div class="mt-1">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  class="form-control-input"
                  v-model="assetOriginDetail.description"
                ></textarea>
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
            <div class="ml-2">
              <span v-if="assetOriginDetail.is_active == 1">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </div>
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
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="DeleteAssetOrigin()">
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
  methods: {
    formatStatus(status) {
      return FormatStatus(status);
    },
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAssetOrigin = ref(false);
    const assetOriginDetail = ref({});
    const checkedAll = ref(false);
    const checkAssetOrigin = ref([]);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    store.dispatch("assetOrigins/getAllAssetOriginsAction", 25);
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
      };
      store.dispatch("assetOrigins/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
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
        FormatModalX(menu, e);
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
      assetOrigin.code = "";
      assetOrigin.name = "";
      assetOrigin.description = "";
      assetOrigin.is_active = "1";
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
      store.dispatch("assetOrigins/createAssetOriginAction", {
        data: data,
        toast,
        handleCloseDetail,
      });
    };
    const searchAssetOrigin = () => {
      store.dispatch(
        "assetOrigins/SearchAssetOriginAction",
        AssetOriginSearch.value
      );
    };
    const UpdateAssetOriginDetail = () => {
      const data = {
        id: assetOriginDetail.value.id,
        code: assetOriginDetail.value.code,
        name: assetOriginDetail.value.name,
        description: assetOriginDetail.value.description,
        is_active: assetOriginDetail.value.is_active,
      };
      store.dispatch("assetOrigins/UpdateAssetOriginAction", {
        data: data,
        toast,
        handleCloseUpdate,
      });
    };
    const DeleteAssetOrigin = () => {
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            assetOriginDetail.value.code +
            " ?"
        )
      ) {
        store.dispatch(
          "assetOrigins/DeleteAssetOriginAction",
          assetOriginDetail.value.id
        );
      }
    };
    const RemoveAssetOrigin = () => {
      for (var i = 0; i < checkAssetOrigin.value.length; i++) {
        let id = checkAssetOrigin.value[i];
        store.dispatch("assetOrigins/DeleteAssetOriginAction", id);
      }
      checkAssetOrigin.value = [];
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
      assetOrigin: assetOrigin,
      AssetOriginSearch: AssetOriginSearch,
      isLoading,
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
      header: ["Mã", "Tên", "Mô tả", "Trạng thái"],
    };
  },
};
</script>
<style></style>
