<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-person></sidebar-person>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <div
              class="button-create"
              @click="handleOpenDetail"
              title="Tạo mới vị trí công việc"
            ></div>
            <p class="longText">Danh sách vị trí công việc</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex h-full">
          <div
            class="btn-icon"
            title="Import"
            v-if="checkPosition.length == 0"
            @click="
              this.$router.push({
                path: '/personnel-profile-position-import',
                name: 'PersonnelProfilePositionImport',
              })
            "
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkPosition.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemovePosition"
            v-if="checkPosition.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div></nav-feature
      ></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listPositions?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="position in listPositions"
              :key="position.ID"
              @contextmenu.prevent="rightClick($event, position)"
              :class="{
                isCheck: CheckedBox(position.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    :value="position.ID"
                    v-model="checkPosition"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ position.header_code }}
              </td>
              <td class="cellTable">{{ position.title }}</td>
              <td class="cellTable">
                {{ formatPositionTitle(position.position_title_id) }}
              </td>
              <td class="cellTable">
                {{ formatStatus(position.status) }}
              </td>
              <td class="cellTable">
                {{ formatDate(position.created_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
              <td class="cellTable">
                {{ formatDate(position.updated_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listPositions?.length">
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
    <!-- Start modal add position -->
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới cài đặt vị trí công việc</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Mã vị trí:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã vị trí"
                v-model="position.header_code"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Vị trí:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập vị trí"
                v-model="position.title"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Chức vụ</label>
            <div>
              <v-select
                label="title"
                :options="listPositiontitles"
                :reduce="(positiontitle) => positiontitle.ID"
                v-model="position.position_title_id"
                placeholder="Chọn chức vụ"
              ></v-select>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input id="check" type="checkbox" v-model="position.status" />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
          <div class="mt-2">
            <label for="">Mô tả</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mô tả"
                v-model="position.desc"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createPosition()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add position -->
    <!-- Start modal update position -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới cài đặt vị trí công việc</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Mã vị trí:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã vị trí"
                v-model="positionDetail.header_code"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Vị trí:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập vị trí"
                v-model="positionDetail.title"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Chức vụ</label>
            <div>
              <v-select
                label="title"
                :options="listPositiontitles"
                :reduce="(positiontitle) => positiontitle.ID"
                v-model="positionDetail.position_title_id"
                placeholder="Chọn chức vụ"
              ></v-select>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="positionDetail.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
          <div class="mt-2">
            <label for="">Mô tả</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mô tả"
                v-model="positionDetail.desc"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updatePositionDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update position -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deletePosition"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <!-- Start right click -->
  <div>
    <context-menu :isActive="isActive"
      ><ul>
        <li @click.prevent="updatePosition()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- End right click -->
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import ContextMenu from "@/components/contextmenu/ContextMenu.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPerson from "@/components/sidebar/SidebarPerson.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatStatus,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      header: [
        "Mã vị trí",
        "Vị trí",
        "Chức vụ",
        "Trạng thái",
        "Ngày tạo",
        "Người tạo",
        "Ngày sửa",
        "Người sửa",
      ],
    };
  },
  components: {
    TableResponsive,
    NavFeature,
    ContextMenu,
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    SearchView,
  },
  methods: {
    formatPositionTitle(id) {
      if (id) {
        const arr = this.listPositiontitles.find((item) => item.ID == id);
        if (arr) {
          return arr.title;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const checkPosition = ref([]);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const positionDetail = ref({});
    const isActive = ref(false);
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("positions/getAllPositionsEndTimeLoadingAction", {
      EndTimeLoading,
    });
    store.dispatch("positiontitles/getAllPositiontitlesAction", 100);
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );
    const searchPositiontitle = computed(
      () => store.state.positiontitles.serachPositiontitles
    );
    const listPositions = computed(() => store.state.positions.listPositions);
    const listPagination = computed(() => store.state.positions.listPagination);
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      position.header_code = "";
      position.title = "";
      position.position_title_id = null;
      position.status = false;
      position.desc = "";
      isOpenDetail.value = false;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updatePosition = () => {
      isOpenUpdate.value = true;
    };
    const formatDate = (dateTime) => {
      return FormatDate(dateTime);
    };
    const formatStatus = (status) => {
      return FormatStatus(status);
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      isLoading.value = true;
      store.dispatch("positions/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      isLoading.value = true;
      store.dispatch("positions/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, position) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        positionDetail.value = position;
      }
    };
    const position = reactive({
      header_code: "",
      title: "",
      position_title_id: null,
      status: false,
      desc: "",
    });
    const CheckedBox = (index) => {
      if (index == checkPosition.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listPositions.value) {
          checkPosition.value.push(listPositions.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkPosition.value.splice(0, checkPosition.value.length);
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("positions/SearchPositionsAction", {
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const createPosition = () => {
      const data = {
        header_code: position.header_code,
        title: position.title,
        position_title_id: position.position_title_id,
        status: position.status,
        desc: position.desc,
      };
      store.dispatch("positions/createPositionAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const updatePositionDetail = () => {
      store.dispatch("positions/updatePositionAction", {
        data: positionDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deletePosition = () => {
      store.dispatch("positions/deletePositionAction", {
        id: positionDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkPosition.value.length = 0;
    };
    const RemovePosition = () => {
      for (var i = 0; i < checkPosition.value.length; i++) {
        store.dispatch("positions/deletePositionAction", {
          id: checkPosition.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkPosition.value.length = 0;
    };
    return {
      isOpenDetail,
      isOpenUpdate,
      position,
      listPositions,
      listPositiontitles,
      searchPositiontitle,
      checkPosition,
      checkedAll,
      positionDetail,
      isActive,
      listPagination,
      isOpenConfirm,
      isLoading,
      handleOpenDetail,
      handleCloseDetail,
      createPosition,
      formatDate,
      formatStatus,
      NextPage,
      PrevPage,
      rightClick,
      CheckedBox,
      checkedAllItem,
      handleOpenUpdate,
      handleCloseUpdate,
      updatePosition,
      updatePositionDetail,
      deletePosition,
      RemovePosition,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
