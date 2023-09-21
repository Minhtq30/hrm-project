<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-asset></sidebar-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center ml-4">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="ml-2 text-base">Danh mục nhóm tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkAssetGroup.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div
              class="btn-icon"
              v-if="checkAssetGroup.length > 0"
              @click="RemoveTax"
            >
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkAssetGroup.length == 0">
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
            v-for="(assetGroup, index) in listAssetGroups"
            :key="index"
            :class="{ isCheck: CheckedBox(assetGroup.id) }"
            @contextmenu.prevent="rightClick($event, assetGroup)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkAssetGroup"
                  :value="assetGroup.id"
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
          {{ AssetGroup.ID }}
        </th> -->
            <td class="p-3">{{ assetGroup.code }}</td>
            <td class="p-3">{{ assetGroup.name }}</td>
            <td class="p-3">{{ assetGroup.description }}</td>
            <td class="p-3">{{ formatType(assetGroup.type_id) }}</td>
            <td class="p-3">{{ formatStatus(assetGroup.is_active) }}</td>
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
      <div style="width: 520px">
        <h1 class="header-modal">Thêm mới</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                Group="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="assetGroup.code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Tên</label>
            <div>
              <input
                Group="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="assetGroup.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Mô tả</label>
            <div>
              <input
                Group="text"
                name=""
                id=""
                class="form-control-input"
                placeholder=""
                v-model="assetGroup.description"
                title=""
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Loại</label>
            <div>
              <select
                name=""
                id=""
                class="w-full form-control-input"
                v-model="assetGroup.type_id"
              >
                <option value="" selected disabled>Chọn loại</option>
                <option
                  v-for="assetType in listAssetTypes"
                  :key="assetType"
                  :value="assetType.id"
                >
                  {{ assetType.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-small flex items-center mt-2">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                true-value="1"
                false-value="0"
                v-model="assetGroup.is_active"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Kích hoạt</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createAssetGroup()">
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
      <div style="width: 520px">
        <h1 class="header-modal">Sửa dữ liệu</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                Group="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="assetGroupDetail.code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Tên</label>
            <div>
              <input
                Group="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="assetGroupDetail.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Mô tả</label>
            <div>
              <input
                Group="text"
                name=""
                id=""
                class="form-control-input"
                placeholder=""
                v-model="assetGroupDetail.description"
                title=""
              />
            </div>
          </div>
          <div class="form-small">
            <div>
              <label for="" class="form-group-label">Loại</label>
              <div>
                <select
                  name=""
                  id=""
                  class="w-full form-control-input"
                  v-model="assetGroupDetail.type_id"
                >
                  <option value="" selected disabled>Chọn loại</option>
                  <option
                    v-for="assetType in listAssetTypes"
                    :key="assetType"
                    :value="assetType.id"
                  >
                    {{ assetType.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-small flex items-center mt-2">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                true-value="1"
                false-value="0"
                v-model="assetGroupDetail.is_active"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Kích hoạt</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateAssetGroupDetail()">
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
    <context-menu :isActive="isActiveAssetGroup"
      ><ul>
        <li @click.prevent="UpdateAssetGroup()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="DeleteAssetGroup()">
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
  },
  methods: {
    formatType(id) {
      if (id == null) {
        return "";
      } else {
        const arr = this.listAssetTypes.find((item) => item.id == id);
        return arr.name;
      }
    },
    formatStatus(status) {
      return FormatStatus(status);
    },
  },
  setup() {
    const store = useStore();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAssetGroup = ref(false);
    const assetGroupDetail = ref();
    const checkedAll = ref(false);
    const checkAssetGroup = ref([]);
    const perPage = ref(25);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    // const isModalVible = ref(false);
    // const fields = "id,name,source_code,phone,description,email,is_active";
    store.dispatch("assetGroups/getAllAssetGroupsAction", perPage.value);
    store.dispatch("assetGroups/getAllAssetTypesAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("assetGroups/getAllAssetGroupsAction", perPage.value);
      store.dispatch("assetGroups/getAllAssetTypesAction", perPage.value);
    };
    const AssetGroupSearch = ref("");
    const assetGroup = reactive({
      code: "",
      name: "",
      is_active: "1",
      description: "",
      type_id: "",
    });
    const listAssetGroups = computed(
      () => store.state.assetGroups.listAssetGroups
    );
    const listAssetTypes = computed(
      () => store.state.assetGroups.listAssetTypes
    );
    const listPagination = computed(
      () => store.state.assetGroups.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("assetGroups/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("assetGroups/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, assetGroup) => {
      if (isActiveAssetGroup.value === true) {
        isActiveAssetGroup.value = false;
      } else {
        isActiveAssetGroup.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e, 300);
        FormatModalY(menu, e);
        assetGroupDetail.value = assetGroup;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAssetGroups.value) {
          checkAssetGroup.value.push(listAssetGroups.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkAssetGroup.value.splice(0, checkAssetGroup.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAssetGroup.value.find((item) => item === index)) {
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
    const UpdateAssetGroup = () => {
      isOpenUpdate.value = true;
    };
    const createAssetGroup = () => {
      const data = {
        code: assetGroup.code,
        name: assetGroup.name,
        is_active: assetGroup.is_active,
        description: assetGroup.description,
        type_id: assetGroup.type_id,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("assetGroups/createAssetGroupAction", dataUrl);
      isOpenDetail.value = false;
      (assetGroup.code = ""),
        (assetGroup.name = ""),
        (assetGroup.is_active = "1"),
        (assetGroup.description = "");
      assetGroup.type_id = "";
    };
    const searchAssetGroup = () => {
      store.dispatch(
        "assetGroups/SearchAssetGroupAction",
        AssetGroupSearch.value
      );
    };
    const UpdateAssetGroupDetail = () => {
      const dataUrl = {
        data: assetGroupDetail.value,
        perPage: perPage.value,
      };
      store.dispatch("assetGroups/UpdateAssetGroupAction", dataUrl);
      isOpenUpdate.value = false;
    };
    const DeleteAssetGroup = () => {
      const dataUrl = {
        dataID: assetGroupDetail.value.id,
        perPage: perPage.value,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            assetGroupDetail.value.code +
            " ?"
        )
      ) {
        store.dispatch("assetGroups/DeleteAssetGroupAction", dataUrl);
      }
    };
    const RemoveAssetGroup = () => {
      for (var i = 0; i < checkAssetGroup.value.length; i++) {
        let dataUrl = {
          dataID: checkAssetGroup.value[i],
          perPage: perPage.value,
        };
        store.dispatch("assetGroups/DeleteAssetGroupAction", dataUrl);
      }
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveAssetGroup: isActiveAssetGroup,
      assetGroupDetail,
      checkedAll: checkedAll,
      checkAssetGroup: checkAssetGroup,
      listAssetGroups: listAssetGroups,
      listAssetTypes: listAssetTypes,
      listPagination: listPagination,
      perPage: perPage,
      assetGroup: assetGroup,
      AssetGroupSearch: AssetGroupSearch,
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
      UpdateAssetGroup,
      createAssetGroup,
      searchAssetGroup,
      UpdateAssetGroupDetail,
      DeleteAssetGroup,
      RemoveAssetGroup,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Mô tả", "Loại", "Tình Trạng"],
      isModalVisible: false,
    };
  },
};
</script>
<style></style>
