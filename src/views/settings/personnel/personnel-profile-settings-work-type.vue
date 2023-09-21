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
              title="Tạo mới hình thức làm việc"
            ></div>
            <p class="longText">Danh sách hình thức làm việc</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex h-full">
          <div class="btn-icon" title="Import" v-if="checkWorkType.length == 0">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkWorkType.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveWorkPlace"
            v-if="checkWorkType.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listWorkTypes?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="workType in listWorkTypes"
              :key="workType.ID"
              @contextmenu.prevent="rightClick($event, workType)"
              :class="{
                isCheck: CheckedBox(workType.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    :value="workType.ID"
                    v-model="checkWorkType"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ workType.title }}
              </td>
              <td class="cellTable">
                {{ formatStatus(workType.status) }}
              </td>
              <td class="cellTable">
                {{ formatDate(workType.created_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
              <td class="cellTable">
                {{ formatDate(workType.updated_at) }}
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
    <template v-slot:sub_footer v-if="listWorkTypes?.length">
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
  <!-- Start modal add worktype -->
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới hình thức làm việc</h1>
        <div class="text-left p-2">
          <div class="mt-2">
            <label for="">Hình thức:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập vị trí"
                v-model="workType.title"
              />
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="workType.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="workType.status == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createWorkPlace()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add worktype -->
    <!-- Start modal update worktype -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">cập nhật hình thức làm việc</h1>
        <div class="text-left p-2">
          <div class="mt-2">
            <label for="">Hình thức:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập vị trí"
                v-model="workTypeDetail.title"
              />
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="workTypeDetail.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="workTypeDetail.status == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateWorkTypeDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update worktype -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteWorktype"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <!-- Start right click -->
  <div>
    <context-menu :isActive="isActive"
      ><ul>
        <li @click.prevent="updateWorkType()">
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
        "Tên hình thức",
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
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const checkWorkType = ref([]);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const isActive = ref(false);
    const workTypeDetail = ref({});
    const perPage = ref(50);
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("workTypes/GetAllWorkTypeEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listWorkTypes = computed(() => store.state.workTypes.listWorkTypes);
    const listPagination = computed(() => store.state.workTypes.listPagination);
    const workType = reactive({
      title: "",
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      workType.title = "";
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updateWorkType = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("workTypes/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("workTypes/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const CheckedBox = (index) => {
      if (index == checkWorkType.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listWorkTypes.value) {
          checkWorkType.value.push(listWorkTypes.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkWorkType.value.splice(0, checkWorkType.value.length);
      }
    };
    const formatDate = (dateTime) => {
      return FormatDate(dateTime);
    };
    const formatStatus = (status) => {
      return FormatStatus(status);
    };
    const rightClick = (e, workType) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        workTypeDetail.value = workType;
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("workTypes/SearchWorkTypeAction", dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const createWorkPlace = () => {
      const data = {
        title: workType.title,
      };
      store.dispatch("workTypes/createWorkTypeAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const updateWorkTypeDetail = () => {
      store.dispatch("workTypes/updateWorkTypeAction", {
        data: workTypeDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteWorktype = () => {
      store.dispatch("workTypes/deleteWorkTypeAction", {
        data: workTypeDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkWorkType.value.length = 0;
    };
    const RemoveWorkPlace = () => {
      for (var i = 0; i < checkWorkType.value.length; i++) {
        store.dispatch("workTypes/deleteWorkTypeAction", {
          data: checkWorkType.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkWorkType.value.length = 0;
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      listWorkTypes: listWorkTypes,
      workType: workType,
      checkWorkType: checkWorkType,
      checkedAll: checkedAll,
      isActive: isActive,
      workTypeDetail: workTypeDetail,
      listPagination: listPagination,
      perPage: perPage,
      isLoading,
      isOpenConfirm,
      handleSearch,
      handleOpenDetail,
      handleCloseDetail,
      createWorkPlace,
      handleOpenUpdate,
      handleCloseUpdate,
      updateWorkType,
      NextPage,
      PrevPage,
      CheckedBox,
      checkedAllItem,
      formatDate,
      rightClick,
      updateWorkTypeDetail,
      deleteWorktype,
      RemoveWorkPlace,
      formatStatus,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
