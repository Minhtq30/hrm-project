<template>
  <div class="flex mr-4 ml-8 p-1.5 w-full max-sm:w-[150px] max-sm:m-0">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only"
      >Search</label
    >
    <div class="relative">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <i class="fal fa-search"></i>
      </div>
      <input
        type="search"
        class="block p-2.5 pl-10 w-full whitespace-no-wrap outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        placeholder="Tìm kiếm"
        @keyup.enter="handleSearch(dataSearch, handleCloseSearch)"
        v-model="dataSearch.wordSearch"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="currentColor"
        class="w-6 h-6 flex absolute right-3 top-2 text-gray-600 hover:text-gray-900 cursor-pointer"
        @click="showSearch"
        v-if="dataSearch.wordSearch?.length == 0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        />
      </svg>
    </div>
  </div>
  <teleport to="#app">
    <modal-view :isOpen="isOpenSearch" :handleCloseDetail="handleCloseSearch">
      <div>
        <h1 class="header-modal">tìm kiếm</h1>
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label">Từ khóa</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập từ khóa"
                v-model="dataSearch.wordSearch"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Phòng ban</label>
            <div>
              <v-select
                label="title"
                :options="listDepartments"
                :reduce="(department) => department.ID"
                placeholder="Chọn phòng ban"
                @click="loadDepartment()"
                v-model="dataSearch.department_ids"
                multiple
              ></v-select>
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label">Vị trí</label>
            <div>
              <v-select
                label="title"
                :options="listPositions"
                :reduce="(position) => position.ID"
                placeholder="Chọn vị trí"
                @click="loadPosition()"
                v-model="dataSearch.position_ids"
                multiple
              ></v-select>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button
            class="button-modal"
            @click="handleSearch(dataSearch, handleCloseSearch)"
          >
            Tìm kiếm
          </button>
          <button class="button-close-modal" @click="handleCloseSearch">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    handleSearch: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    const urlSearch = new URLSearchParams(window.location.search);
    const dataSearch = reactive({
      wordSearch: urlSearch.has("search")
        ? urlSearch.get("search")
        : urlSearch.get("s"),
      department_ids: [],
      position_ids: [],
    });
    const isOpenSearch = ref(false);
    const showSearch = () => {
      isOpenSearch.value = true;
    };
    const handleCloseSearch = () => {
      isOpenSearch.value = false;
      dataSearch.wordSearch = "";
      dataSearch.department_ids = [];
      dataSearch.position_ids = [];
    };
    const loadDepartment = () => {
      store.dispatch("departments/getAllDepartmentsAction");
    };
    const loadPosition = () => {
      store.dispatch("positions/getAllPositionsAction", 500);
    };
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listPositions = computed(() => store.state.positions.listPositions);
    return {
      isOpenSearch,
      showSearch,
      handleCloseSearch,
      loadDepartment,
      loadPosition,
      listDepartments,
      listPositions,
      dataSearch,
    };
  },
};
</script>

<style></style>
