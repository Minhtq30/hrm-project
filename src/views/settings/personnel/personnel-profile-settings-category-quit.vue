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
              title="Tạo mới danh mục thôi việc"
            ></div>
            <p class="longText">Danh mục thôi việc</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <navbar-category></navbar-category>
        <div class="flex h-full">
          <div class="btn-icon" title="Import" v-if="checkQuit.length == 0">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkQuit.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveQuit"
            v-if="checkQuit.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listQuits?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="quit in listQuits"
              :key="quit.ID"
              @contextmenu.prevent="rightClick($event, quit)"
              :class="{
                isCheck: CheckedBox(quit.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkQuit"
                    :value="quit.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ quit.title }}
              </td>
              <td class="cellTable w-[400px] whitespace-normal">
                {{ quit.desc }}
              </td>
              <td class="cellTable">
                {{ formatStatus(quit.is_active) }}
              </td>
              <td class="cellTable">
                {{ formatDate(quit.created_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
              <td class="cellTable">
                {{ formatDate(quit.updated_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4"></div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listQuits?.length"
      ><div class="flex justify-between items-center">
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
    <!-- Start modal add category-quit -->
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới hình thức thôi việc</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Mã hình thức:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã hình thức"
                v-model="quit.quitCode"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Tên hình thức</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="quit.title"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Mô tả:</label>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input"
                v-model="quit.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="quit.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="CreateQuit()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add category-quit -->
    <!-- Start modal update category-quit -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới hình thức thôi việc</h1>
        <div class="text-left p-2">
          <div>
            <label for="">Mã hình thức:</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập mã hình thức"
                v-model="quitDetail.quitCode"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Tên hình thức</label>
            <div>
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập hình thức"
                v-model="quitDetail.title"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="">Mô tả:</label>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input"
                v-model="quitDetail.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="quitDetail.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateQuitDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!--End modal update category-quit  -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteQuit"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>

  <!-- Start context-menu category-quit -->
  <div>
    <context-menu :isActive="isActive"
      ><ul>
        <li @click.prevent="updateQuit()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- End context-menu category-quit -->
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import "@/assets/checkBox.css";
import NavbarCategory from "./NavbarCategory.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
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
  components: {
    NavFeature,
    TableResponsive,
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
    NavbarCategory,
    SearchView,
  },
  data() {
    return {
      header: [
        "Tên hình thức",
        "Mô tả",
        "Trạng thái",
        "Ngày tạo",
        "Người tạo",
        "Ngày sửa",
        "Người sửa",
      ],
    };
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const isOpenDetail = ref(false);
    const checkQuit = ref([]);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const quitDetail = ref({});
    const isActive = ref(false);
    const perPage = ref(50);
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const quit = reactive({
      quitCode: "",
      title: "",
      is_active: true,
      desc: "",
    });
    store.dispatch("categories/getAllQuitEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listQuits = computed(() => store.state.categories.listQuits);
    const listPagination = computed(
      () => store.state.categories.listPagination
    );
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      (quit.quitCode = ""),
        (quit.title = ""),
        (quit.is_active = true),
        (quit.desc = "");
      isOpenDetail.value = false;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
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
      store.dispatch("categories/GetNextPageQuitAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("categories/GetPrevPageQuitAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, quit) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        quitDetail.value = quit;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkQuit.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listQuits.value) {
          checkQuit.value.push(listQuits.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkQuit.value.splice(0, checkQuit.value.length);
      }
    };
    const updateQuit = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("categories/SearchQuitAction", dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const CreateQuit = () => {
      const data = {
        quitCode: quit.quitCode,
        title: quit.title,
        is_active: quit.is_active,
        desc: quit.desc,
      };
      store.dispatch("categories/createQuitAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const UpdateQuitDetail = () => {
      store.dispatch("categories/updateQuitAction", {
        data: quitDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteQuit = () => {
      store.dispatch("categories/deleteQuitAction", {
        id: quitDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkQuit.value.length = 0;
    };
    const RemoveQuit = () => {
      for (var i = 0; i < checkQuit.value.length; i++) {
        store.dispatch("categories/deleteQuitAction", {
          id: checkQuit.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkQuit.value.length = 0;
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      quit: quit,
      listQuits: listQuits,
      checkQuit: checkQuit,
      checkedAll: checkedAll,
      quitDetail: quitDetail,
      isActive: isActive,
      listPagination: listPagination,
      perPage: perPage,
      isLoading,
      isOpenConfirm,
      handleSearch,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      formatDate,
      formatStatus,
      NextPage,
      PrevPage,
      rightClick,
      CreateQuit,
      updateQuit,
      UpdateQuitDetail,
      deleteQuit,
      RemoveQuit,
      checkedAllItem,
      CheckedBox,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
