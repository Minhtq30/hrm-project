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
              title="Tạo mới chức vụ"
            ></div>
            <p class="longText">Danh sách chức vụ</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex h-full">
          <div
            class="btn-icon"
            title="Import"
            v-if="checkPositiontitle.length == 0"
            @click="
              this.$router.push({
                path: '/personnel-profile-positionTitle-import',
                name: 'PersonnelProfilePositionTitleImport',
              })
            "
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Export"
            v-if="checkPositiontitle.length > 0"
          >
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="deleteAllPositiontitle"
            v-if="checkPositiontitle.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listPositiontitles?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="positiontitle in listPositiontitles"
              :key="positiontitle.ID"
              @contextmenu.prevent="rightClick($event, positiontitle)"
              :class="{
                isCheck: CheckedBox(positiontitle.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkPositiontitle"
                    :value="positiontitle.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ positiontitle.header_code }}
              </td>
              <td class="cellTable">
                {{ positiontitle.title }}
              </td>
              <td class="cellTable">
                {{ formatStatus(positiontitle.status) }}
              </td>
              <td class="cellTable">
                {{ formatDate(positiontitle.created_at) }}
              </td>
              <td class="cellTable">
                <img
                  :src="positiontitle.personCreate"
                  alt=""
                  class="w-8 h-8 rounded-full"
                />
              </td>
              <td class="cellTable">
                {{ formatDate(positiontitle.updated_at) }}
              </td>
              <td class="cellTable">
                <img
                  :src="positiontitle.personUpdate"
                  alt=""
                  class="w-8 h-8 rounded-full"
                />
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listPositiontitles?.length">
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
    <!-- Start modal add positiontitle -->
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới cài đặt Chức vụ</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Mã chức vụ:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã chức vụ"
                v-model="positiontitle.header_code"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Chức vụ:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập chức vụ"
                v-model="positiontitle.title"
              />
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                true-value="1"
                false-value="0"
                v-model="positiontitle.status"
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
                v-model="positiontitle.desc"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createPositiontitle()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add positiontitle -->
    <!-- Start modal update positiontitle -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới cài đặt Chức vụ</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Mã chức vụ:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã chức vụ"
                v-model="positiontitleDetail.header_code"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Chức vụ:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập chức vụ"
                v-model="positiontitleDetail.title"
              />
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="positiontitleDetail.status"
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
                v-model="positiontitleDetail.desc"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updatePositiontitleDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update positiontitle -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deletePositiontitle"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <!-- Start right click -->
  <context-menu :isActive="isActive"
    ><ul>
      <li @click.prevent="updatePositiontitle()">
        <i class="fal fa-edit"></i><a href="#">Sửa</a>
      </li>
      <li @click.prevent="handleOpenConfirm()">
        <i class="fal fa-trash"></i><a href="#">Xóa</a>
      </li>
    </ul></context-menu
  >
  <!-- End right click -->
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPerson from "@/components/sidebar/SidebarPerson.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatStatus,
} from "@/constants/FormatAll";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      header: [
        "Mã chức vụ",
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
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    SearchView,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const checkPositiontitle = ref([]);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const positiontitleDetail = ref();
    const isActive = ref(false);
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("positiontitles/getAllPositiontitlesEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listPositiontitles = computed(
      () => store.state.positiontitles.listPositiontitles
    );
    const positiontitle = reactive({
      header_code: "",
      title: "",
      status: false,
      desc: "",
    });
    const listPagination = computed(
      () => store.state.positiontitles.listPagination
    );
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      positiontitle.header_code = "";
      positiontitle.title = "";
      positiontitle.status = false;
      positiontitle.desc = "";
      isOpenDetail.value = false;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updatePositiontitle = () => {
      isOpenUpdate.value = true;
    };
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("positiontitles/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("positiontitles/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, positiontitle) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        positiontitleDetail.value = positiontitle;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkPositiontitle.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listPositiontitles.value) {
          checkPositiontitle.value.push(listPositiontitles.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkPositiontitle.value.splice(0, checkPositiontitle.value.length);
      }
    };
    const formatDate = (dateTime) => {
      return FormatDate(dateTime);
    };
    const formatStatus = (status) => {
      return FormatStatus(status);
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("positiontitles/searchPositiontitleAction", {
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const createPositiontitle = () => {
      const data = {
        header_code: positiontitle.header_code,
        title: positiontitle.title,
        status: positiontitle.status,
        desc: positiontitle.desc,
      };
      store.dispatch("positiontitles/createPositiontitleAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const updatePositiontitleDetail = () => {
      store.dispatch("positiontitles/updatePositiontitleAction", {
        data: positiontitleDetail.value,
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
    const deletePositiontitle = () => {
      store.dispatch("positiontitles/deletePositiontitleAction", {
        id: positiontitleDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkPositiontitle.value.length = 0;
    };
    const deleteAllPositiontitle = () => {
      for (var i = 0; i < checkPositiontitle.value.length; i++) {
        store.dispatch("positiontitles/deletePositiontitleAction", {
          id: checkPositiontitle.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkPositiontitle.value.length = 0;
    };
    return {
      isOpenDetail,
      isOpenUpdate,
      positiontitle,
      listPositiontitles,
      checkPositiontitle,
      checkedAll,
      listPagination,
      positiontitleDetail,
      isActive,
      isLoading,
      isOpenConfirm,
      handleOpenDetail,
      handleCloseDetail,
      createPositiontitle,
      handleOpenUpdate,
      handleCloseUpdate,
      updatePositiontitle,
      NextPage,
      PrevPage,
      CheckedBox,
      checkedAllItem,
      rightClick,
      formatDate,
      formatStatus,
      updatePositiontitleDetail,
      deletePositiontitle,
      deleteAllPositiontitle,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
