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
            <p class="text-base">Danh mục nhóm kho</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkInventoryGroup.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div
              class="btn-icon"
              v-if="checkInventoryGroup.length > 0"
              @click="RemoveInventoryGroup"
            >
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkInventoryGroup.length == 0">
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
            v-for="(inventoryGroup, index) in listInventoryGroups"
            :key="index"
            :class="{ isCheck: CheckedBox(inventoryGroup.id) }"
            @contextmenu.prevent="rightClick($event, inventoryGroup)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkInventoryGroup"
                  :value="inventoryGroup.id"
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
          {{ inventoryGroup.ID }}
        </th> -->
            <td class="cellTable">{{ inventoryGroup.name }}</td>
            <td class="cellTable">{{ inventoryGroup.description }}</td>
            <td class="cellTable">
              {{ formatActive(inventoryGroup.is_active) }}
            </td>
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
      <div style="width: 520px">
        <h1 class="header-modal">Thêm mới</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tên nhóm<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="inventoryGroup.name"
              />
            </div>
          </div>
          <div class="form-small">
            <div>
              <label for="" class="form-group-label">Mô tả</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="inventoryGroup.description"
                />
              </div>
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="inventoryGroup.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="inventoryGroup.is_active == 1">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createInventoryGroup()">
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
        <h1 class="header-modal">Cập nhật</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tên nhóm<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="inventoryGroupDetail.name"
              />
            </div>
          </div>
          <div class="form-small">
            <div>
              <label for="" class="form-group-label">Mô tả</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="inventoryGroupDetail.description"
                />
              </div>
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="inventoryGroupDetail.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="inventoryGroupDetail.is_active == 1">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateInventoryGroupDetail()">
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
    <context-menu :isActive="isActiveInventoryGroup"
      ><ul>
        <li @click.prevent="updateInventoryGroup()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="deleteInventoryGroup(inventoryGroupDetail)">
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
import SidebarSettingAsset from "@/components/sidebar/SidebarSettingAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import {
  FormatModalX,
  FormatModalY,
  FormatStatus,
} from "@/constants/FormatAll";
// import { type } from "os";

export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingAsset,
    NavbarSocial,
  },
  data() {
    return {
      header: ["Tên", "Mô tả", "Active"],
      isModalVisible: false,
    };
  },
  methods: {
    formatActive(status) {
      return FormatStatus(status);
    },
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActiveInventoryGroup = ref(false);
    const inventoryGroupDetail = ref({});
    const checkedAll = ref(false);
    const checkInventoryGroup = ref([]);
    const perPage = ref(50);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    store.dispatch(
      "inventoryGroups/getAllInventoryGroupsAction",
      perPage.value
    );
    const ChangePerPage = () => {
      store.dispatch(
        "inventoryGroups/getAllInventoryGroupsAction",
        perPage.value
      );
    };
    const inventorySearch = ref("");
    const inventoryGroup = reactive({
      name: "",
      is_active: "1",
      description: "",
    });
    const listInventoryGroups = computed(
      () => store.state.inventoryGroups.listInventoryGroups
    );
    const listPagination = computed(
      () => store.state.inventoryGroups.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("inventoryGroups/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("inventoryGroups/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, inventoryGroup) => {
      if (isActiveInventoryGroup.value === true) {
        isActiveInventoryGroup.value = false;
      } else {
        isActiveInventoryGroup.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e, 300);
        FormatModalY(menu, e);
        inventoryGroupDetail.value = inventoryGroup;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listInventoryGroups.value) {
          checkInventoryGroup.value.push(listInventoryGroups.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkInventoryGroup.value.splice(0, checkInventoryGroup.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkInventoryGroup.value.find((item) => item === index)) {
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
    const updateInventoryGroup = () => {
      isOpenUpdate.value = true;
    };
    const createInventoryGroup = () => {
      const data = {
        name: inventoryGroup.name,
        is_active: inventoryGroup.is_active,
        description: inventoryGroup.description,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("inventoryGroups/createInventoryGroupAction", dataUrl);
      handleCloseDetail();
      (inventoryGroup.name = ""),
        (inventoryGroup.is_active = "1"),
        (inventoryGroup.description = "");
    };
    const searchInventory = () => {
      store.dispatch(
        "inventoryGroups/SearchInventoryAction",
        inventorySearch.value
      );
    };
    const toastError = () => {
      toast.warning("Vui lòng điền đầy đủ", {
        position: "top-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    };
    const UpdateInventoryGroupDetail = (inventoryGroupDetail) => {
      const dataUrl = {
        data: inventoryGroupDetail,
        perPage: perPage.value,
      };
      store.dispatch("inventoryGroups/UpdateInventoryGroupAction", dataUrl);
      isOpenUpdate.value = false;
    };
    const deleteInventoryGroup = (inventoryGroupDetail) => {
      const dataUrl = {
        dataID: inventoryGroupDetail.id,
        perPage: perPage.value,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            inventoryGroupDetail.name +
            " ?"
        )
      ) {
        store.dispatch("inventoryGroups/DeleteInventoryGroupAction", dataUrl);
      }
    };
    const RemoveInventoryGroups = () => {
      for (var i = 0; i < checkInventoryGroup.value.length; i++) {
        let dataUrl = {
          dataID: checkInventoryGroup.value[i],
          perPage: perPage.value,
        };
        store.dispatch("inventoryGroups/DeleteInventoryGroupAction", dataUrl);
      }
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveInventoryGroup: isActiveInventoryGroup,
      inventoryGroupDetail: inventoryGroupDetail,
      checkedAll: checkedAll,
      checkInventoryGroup: checkInventoryGroup,
      inventoryGroup: inventoryGroup,
      perPage: perPage,
      inventorySearch: inventorySearch,
      listInventoryGroups: listInventoryGroups,
      listPagination: listPagination,
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
      updateInventoryGroup,
      createInventoryGroup,
      searchInventory,
      toastError,
      UpdateInventoryGroupDetail,
      deleteInventoryGroup,
      RemoveInventoryGroups,
    };
  },
};
</script>
<style></style>
