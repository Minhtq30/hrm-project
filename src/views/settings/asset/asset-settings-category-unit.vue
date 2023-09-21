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
            <p class="text-base">Danh mục đơn vị</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><div>
        <!-- Start router navbar -->
        <nav-feature>
          <div class="flex">
            <div class="btn-icon" v-if="checkUnit.length > 0">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div
              class="btn-icon"
              v-if="checkUnit.length > 0"
              @click="RemoveTax"
            >
              <div class="cx">
                <i class="fal fa-trash-alt"></i>
              </div>
              <div class="action-label">Xóa</div>
            </div>
            <div class="btn-icon" v-if="checkUnit.length == 0">
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
          v-for="(unit, index) in listUnits"
          :key="index"
          :class="{ isCheck: CheckedBox(unit.ID) }"
          @contextmenu.prevent="rightClick($event, unit)"
        >
          <td class="w-4 px-6 py-3">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="checkUnit"
                :value="unit.ID"
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
          {{ unit.ID }}
        </th> -->
          <td class="p-3">{{ unit.title }}</td>
          <td class="p-3">{{ unit.ord }}</td>
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
      <div style="width: 500px">
        <h1 class="header-modal">Thêm mới</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mã đơn vị<span class="text-red-600"> (*)</span></label
            >
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder=""
                v-model="unit.title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Ord</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="unit.ord"
                title=""
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createUnit()">Cập nhật</button>
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
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label">Mã đơn vị</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="unitDetail.title"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Ord</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control-input"
                placeholder=""
                v-model="unitDetail.ord"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateUnitDetail()">
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
    <context-menu :isActive="isActiveUnit"
      ><ul>
        <li @click.prevent="updateUnit()">
          <a href="#">Sửa</a>
        </li>
        <li @click.prevent="deleteUnit()">
          <a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- <button type="button" class="btn" @click="showModal">Open Modal!</button>
  <div>
    <input type="text" name="" id="" v-model="unitSearch" />
    <button @click="searchunit()">Tìm</button>
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
    const isOpenUpdate = ref(false);
    const isActiveUnit = ref(false);
    const unitDetail = ref({});
    const checkedAll = ref(false);
    const checkUnit = ref([]);
    const unitSearch = ref("");
    const perPage = ref(50);
    const unit = reactive({
      title: "",
      ord: "",
    });
    // const isModalVible = ref(false);
    // const fields = "id,name,source_title,phone,description,email,is_active";
    store.dispatch("units/getAllUnitsAction", perPage.value);
    const ChangePerPage = () => {
      store.dispatch("units/getAllUnitsAction", perPage.value);
    };
    const listUnits = computed(() => store.state.units.listUnits);
    const listPagination = computed(() => store.state.units.listPagination);

    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
        perPage: perPage.value,
      };
      store.dispatch("units/GetNextPageAction", dataUrl);
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        perPage: perPage.value,
      };
      store.dispatch("units/GetPrevPageAction", dataUrl);
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listUnits.value) {
          checkUnit.value.push(listUnits.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkUnit.value.splice(0, checkUnit.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkUnit.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const rightClick = (e, unit) => {
      if (isActiveUnit.value === true) {
        isActiveUnit.value = false;
      } else {
        isActiveUnit.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        unitDetail.value = unit;
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
    const updateUnit = () => {
      isOpenUpdate.value = true;
    };
    const createUnit = () => {
      const data = {
        title: unit.title,
        ord: unit.ord,
      };
      const dataUrl = {
        data: data,
        perPage: perPage.value,
      };
      store.dispatch("units/createUnitAction", dataUrl);
      isOpenDetail.value = false;
      (unit.title = ""), (unit.ord = "");
    };
    const searchUnit = () => {
      store.dispatch("units/SearchUnitAction", unitSearch.value);
    };
    const UpdateUnitDetail = () => {
      const dataUrl = {
        data: unitDetail.value,
        perPage: perPage.value,
      };
      store.dispatch("units/UpdateUnitAction", dataUrl);
      isOpenUpdate.value = false;
    };
    const deleteunit = () => {
      const dataUrl = {
        dataID: unitDetail.value.id,
        perPage: perPage.value,
      };
      if (
        confirm(
          "Bạn có chắc chắn muốn xóa dữ liệu mã: " +
            unitDetail.value.title +
            " ?"
        )
      ) {
        store.dispatch("units/DeleteUnitAction", dataUrl);
      }
    };
    const Removeunit = () => {
      for (var i = 0; i < checkUnit.value.length; i++) {
        let dataUrl = {
          dataID: checkUnit.value[i],
          perPage: perPage.value,
        };
        store.dispatch("inventories/DeleteunitAction", dataUrl);
      }
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      isActiveUnit: isActiveUnit,
      listUnits: listUnits,
      unitDetail: unitDetail,
      checkedAll: checkedAll,
      checkUnit: checkUnit,
      perPage: perPage,
      listPagination: listPagination,
      unit: unit,
      unitSearch: unitSearch,
      ChangePerPage,
      NextPage,
      PrevPage,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      updateUnit,
      checkedAllItem,
      CheckedBox,
      createUnit,
      searchUnit,
      rightClick,
      UpdateUnitDetail,
      deleteunit,
      Removeunit,
    };
  },
  data() {
    return {
      header: ["Mã đơn vị", "Ord"],
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
