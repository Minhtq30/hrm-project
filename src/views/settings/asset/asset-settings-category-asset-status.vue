<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-asset></sidebar-setting-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="text-base">Danh mục trạng thái tài sản</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkAssetStatus.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div
              class="btn-icon"
              v-if="checkAssetStatus.length > 0"
              @click="RemoveTax"
            >
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkAssetStatus.length == 0">
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
          v-for="(assetStatus, index) in listAssetStatus"
          :key="index"
          :class="{ isCheck: CheckedBox(assetStatus.id) }"
          @contextmenu.prevent="rightClick($event, assetStatus)"
        >
          <td class="w-4 px-6 py-3">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="checkAssetStatus"
                :value="assetStatus.id"
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
          {{ AssetStatus.ID }}
        </th> -->
          <td class="p-3">{{ assetStatus.code }}</td>
          <td class="p-3">{{ assetStatus.name }}</td>
          <td class="p-3">{{ assetStatus.ord }}</td>
        </tr></table-responsive
      >
    </div>
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
      <div style="width: 520px">
        <h1 class="header-modal">Thêm mới</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="assetStatus.code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Tên</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="assetStatus.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Sắp xếp</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder=""
                v-model="assetStatus.ord"
                title=""
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createAssetStatus()">
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
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="assetStatusDetail.code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Tên</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="assetStatusDetail.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Sắp xếp</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder=""
                v-model="assetStatusDetail.ord"
                title=""
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button
            class="button-modal"
            @click="UpdateAssetStatusDetail(AssetStatusDetail)"
          >
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
    <context-menu :isActive="isActiveAssetStatus"
      ><ul>
        <li @click.prevent="UpdateAssetStatus()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="DeleteAssetStatus(assetStatusDetail)">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- <button Status="button" class="btn" @click="showModal">Open Modal!</button>
  <div>
    <input Status="text" name="" id="" v-model="AssetStatusSearch" />
    <button @click="searchAssetStatus()">Tìm</button>
  </div> -->
</template>
<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingAsset from "@/components/sidebar/SidebarSettingAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { FormatModalX, FormatModalY } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";

export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingAsset,
    NavbarSocial,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveAssetStatus = ref(false);
    const assetStatusDetail = ref({});
    const checkedAll = ref(false);
    const checkAssetStatus = ref([]);
    const perPage = ref(25);
    // const isModalVible = ref(false);
    // const fields = "id,name,source_code,phone,description,email,is_active";
    store.dispatch("assetStatus/getAllAssetStatusAction", perPage.value);
    const AssetStatusSearch = ref("");
    const assetStatus = reactive({
      code: "",
      name: "",
      ord: "",
    });
    const listAssetStatus = computed(
      () => store.state.assetStatus.listAssetStatus
    );
    const listPagination = computed(
      () => store.state.assetStatus.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("assetStatus/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("assetStatus/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, assetStatus) => {
      if (isActiveAssetStatus.value === true) {
        isActiveAssetStatus.value = false;
      } else {
        isActiveAssetStatus.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        assetStatusDetail.value = assetStatus;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listAssetStatus.value) {
          checkAssetStatus.value.push(listAssetStatus.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkAssetStatus.value.splice(0, checkAssetStatus.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAssetStatus.value.find((item) => item === index)) {
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
      assetStatus.code = "";
      assetStatus.name = "";
      assetStatus.ord = "1";
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const UpdateAssetStatus = () => {
      isOpenUpdate.value = true;
    };
    const createAssetStatus = () => {
      const data = {
        code: assetStatus.code,
        name: assetStatus.name,
        ord: assetStatus.ord,
      };
      store.dispatch("assetStatus/createAssetStatusAction", {
        data: data,
        toast,
        handleCloseDetail,
      });
    };
    const searchAssetStatus = () => {
      store.dispatch(
        "assetStatus/SearchAssetStatusAction",
        AssetStatusSearch.value
      );
    };
    const UpdateAssetStatusDetail = () => {
      const data = {
        id: assetStatusDetail.value.id,
        code: assetStatusDetail.value.code,
        name: assetStatusDetail.value.name,
        ord: assetStatusDetail.value.ord,
      };
      store.dispatch("assetStatus/UpdateAssetStatusAction", {
        data: data,
        toast,
        handleCloseUpdate,
      });
    };
    const DeleteAssetStatus = (assetStatusDetail) => {
      const dataUrl = {
        dataID: assetStatusDetail.id,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            assetStatusDetail.code +
            " ?"
        )
      ) {
        store.dispatch("assetStatus/DeleteAssetStatusAction", dataUrl);
      }
    };
    const RemoveAssetStatus = () => {
      for (var i = 0; i < checkAssetStatus.value.length; i++) {
        let dataUrl = {
          dataID: checkAssetStatus.value[i],
        };
        store.dispatch("assetStatus/DeleteAssetStatusAction", dataUrl);
      }
      checkAssetStatus.value = [];
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveAssetStatus: isActiveAssetStatus,
      assetStatusDetail: assetStatusDetail,
      checkedAll: checkedAll,
      checkAssetStatus: checkAssetStatus,
      listAssetStatus: listAssetStatus,
      perPage: perPage,
      assetStatus: assetStatus,
      AssetStatusSearch: AssetStatusSearch,
      listPagination: listPagination,
      NextPage,
      PrevPage,
      rightClick,
      checkedAllItem,
      CheckedBox,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      UpdateAssetStatus,
      createAssetStatus,
      searchAssetStatus,
      UpdateAssetStatusDetail,
      DeleteAssetStatus,
      RemoveAssetStatus,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Sắp xếp"],
      isModalVisible: false,
    };
  },
  methods: {
    abc(data) {
      alert(data.name);
    },
  },
};
</script>
<style></style>
