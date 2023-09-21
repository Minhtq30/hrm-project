<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-asset></sidebar-setting-asset>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <div class="button-create" @click="handleOpenDetail"></div>
            <p class="text-base">Danh mục kho</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkInventory.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div
              class="btn-icon"
              v-if="checkInventory.length > 0"
              @click="RemoveTax"
            >
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkInventory.length == 0">
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
            v-for="(Inventory, index) in listInventories"
            :key="index"
            :class="{ isCheck: CheckedBox(Inventory.id) }"
            @contextmenu.prevent="rightClick($event, Inventory)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkInventory"
                  :value="Inventory.id"
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
          {{ Inventory.ID }}
        </th> -->
            <td class="p-3">{{ Inventory.source_code }}</td>
            <td class="p-3">{{ Inventory.name }}</td>
            <td class="p-3">{{ Inventory.phone }}</td>
            <td class="p-3">{{ Inventory.email }}</td>
            <td class="p-3">{{ Inventory.description }}</td>
            <td class="p-3">{{ Inventory.is_active }}</td>
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
              >Mã kho<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="Inventory.source_code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Tên kho</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="Inventory.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Phone</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="Inventory.phone"
                title=""
              />
            </div>
            <div class="form-small">
              <label for="" class="form-group-label">Email</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder=""
                  v-model="Inventory.email"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 form-small">
            <div>
              <label for="" class="form-group-label">Nhóm</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder="Nhập hình thức"
                  v-model="Inventory.group"
                  title=""
                />
              </div>
            </div>
            <div>
              <label for="" class="form-group-label">Tình trạng</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder="Nhập hình thức"
                  v-model="Inventory.is_active"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Mô tả</label>
            <div>
              <textarea
                type="text"
                name="rate"
                id="rate"
                class="form-control-input"
                placeholder=""
                v-model="Inventory.description"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createInventory()">
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
              >Mã kho<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã"
                v-model="InventoryDetail.source_code"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Tên kho</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="InventoryDetail.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Phone</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="InventoryDetail.phone"
                title=""
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Email</label>
            <div class="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="InventoryDetail.email"
                title=""
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 form-small">
            <div>
              <label for="" class="form-group-label">Nhóm</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder="Nhập hình thức"
                  v-model="InventoryDetail.group"
                  title=""
                />
              </div>
            </div>
            <div>
              <label for="" class="form-group-label">Tình trạng</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control-input"
                  placeholder="Nhập hình thức"
                  v-model="InventoryDetail.is_active"
                  title=""
                />
              </div>
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Mô tả</label>
            <div>
              <textarea
                type="text"
                name="rate"
                id="rate"
                class="form-control-input"
                placeholder=""
                v-model="InventoryDetail.description"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button
            class="button-modal"
            @click="UpdateInventoryDetail(InventoryDetail)"
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
    <context-menu :isActive="isActiveInventory"
      ><ul>
        <li @click.prevent="updateInventory()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="deleteInventory(InventoryDetail)">
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
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingAsset from "@/components/sidebar/SidebarSettingAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";

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
    const isOpenDetail = ref(false);
    const InventoryDetail = ref({});
    const isActiveInventory = ref(false);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const checkInventory = ref([]);
    const perPage = ref(25);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    store.dispatch("inventories/getAllInventoriesAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("inventories/getAllInventoriesAction", perPage.value);
    };
    const inventorySearch = ref("");
    const Inventory = reactive({
      source_code: "",
      name: "",
      is_active: "1",
      description: "",
      phone: "",
      email: "",
    });
    const listInventories = computed(
      () => store.state.inventories.listInventories
    );
    const listPagination = computed(
      () => store.state.inventories.listPagination
    );
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("inventories/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("inventories/GetPrevPageAction", dataUrl);
    };
    const rightClick = (e, Inventory) => {
      if (isActiveInventory.value === true) {
        isActiveInventory.value = false;
      } else {
        isActiveInventory.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        InventoryDetail.value = Inventory;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listInventories.value) {
          checkInventory.value.push(listInventories.value[item].id);
        }
      } else {
        checkedAll.value = false;
        checkInventory.value.splice(0, checkInventory.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkInventory.value.find((item) => item === index)) {
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
    const updateInventory = () => {
      isOpenUpdate.value = true;
    };
    const createInventory = () => {
      const data = {
        source_code: Inventory.source_code,
        name: Inventory.name,
        is_active: Inventory.is_active,
        description: Inventory.description,
        phone: Inventory.phone,
        email: Inventory.email,
      };
      store.dispatch("inventories/createInventoryAction", data);
      handleCloseDetail();
      (Inventory.source_code = ""),
        (Inventory.name = ""),
        (Inventory.is_active = "1"),
        (Inventory.description = "");
      Inventory.phone = "";
      Inventory.email = "";
    };
    const searchInventory = () => {
      store.dispatch(
        "inventories/SearchInventoryAction",
        inventorySearch.value
      );
    };
    const UpdateInventoryDetail = (InventoryDetail) => {
      store.dispatch("inventories/UpdateInventoryAction", InventoryDetail);
      isOpenUpdate.value = false;
    };
    const deleteInventory = (InventoryDetail) => {
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            InventoryDetail.source_code +
            " ?"
        )
      ) {
        store.dispatch("inventories/DeleteInventoryAction", InventoryDetail.id);
      }
    };
    const RemoveInventory = () => {
      for (var i = 0; i < checkInventory.value.length; i++) {
        store.dispatch(
          "inventories/DeleteInventoryAction",
          checkInventory.value[i]
        );
      }
    };
    return {
      isOpenDetail: isOpenDetail,
      InventoryDetail: InventoryDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveInventory: isActiveInventory,
      checkedAll: checkedAll,
      checkInventory: checkInventory,
      listInventories: listInventories,
      inventorySearch: inventorySearch,
      Inventory: Inventory,
      perPage: perPage,
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
      updateInventory,
      createInventory,
      searchInventory,
      UpdateInventoryDetail,
      deleteInventory,
      RemoveInventory,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên kho", "Số ĐT", "Email", "Mô tả", "Tình Trạng"],
      isModalVisible: false,
    };
  },
  methods: {
    abc(data) {
      alert(data.name);
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
<style></style>
