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
              title="Tạo mới danh mục tiếp nhận"
            ></div>
            <p class="longText">Danh mục tiếp nhận</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <navbar-category></navbar-category>
        <div class="flex h-full">
          <div class="btn-icon" title="Import" v-if="checkReceive.length == 0">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkReceive.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveReceive"
            v-if="checkReceive.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listReceives?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="receive in listReceives"
              :key="receive.ID"
              @contextmenu.prevent="rightClick($event, receive)"
              :class="{
                isCheck: CheckedBox(receive.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkReceive"
                    :value="receive.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ receive.title }}
              </td>
              <td class="cellTable w-[400px] whitespace-normal">
                {{ receive.desc }}
              </td>
              <td class="cellTable">
                {{ formatStatus(receive.is_active) }}
              </td>
              <td class="cellTable">
                {{ formatDate(receive.created_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
              <td class="cellTable">
                {{ formatDate(receive.updated_at) }}
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
    <template v-slot:sub_footer v-if="listReceives?.length">
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
    <!-- Start moda l add category-receive -->
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới hình thức tiếp nhận</h1>
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
                v-model="receive.quitCode"
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
                v-model="receive.title"
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
                v-model="receive.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="receive.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="CreateReceive()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add category-receive -->
    <!-- Start modal update category-receive -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">cập nhật hình thức thôi việc</h1>
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
                v-model="receiveDetail.receiveCode"
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
                v-model="receiveDetail.title"
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
                v-model="receiveDetail.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="receiveDetail.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdateReceiveDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update category-receive -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteReceive"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <!-- Start context-menu categoty-receive -->
  <div>
    <context-menu :isActive="isActive"
      ><ul>
        <li @click.prevent="updateReceive()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- End context-menu category-receive -->
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
    const checkReceive = ref([]);
    const isOpenUpdate = ref(false);
    const checkedAll = ref(false);
    const receiveDetail = ref({});
    const isActive = ref(false);
    const perPage = ref(50);
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const receive = reactive({
      receiveCode: "",
      title: "",
      is_active: 0,
      desc: "",
    });
    store.dispatch("categories/getAllReceiveEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listReceives = computed(() => store.state.categories.listReceives);
    const listPagination = computed(
      () => store.state.categories.listPagination
    );
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      (receive.receiveCode = ""),
        (receive.title = ""),
        (receive.is_active = true),
        (receive.desc = "");
      isOpenDetail.value = false;
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
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
      store.dispatch("categories/GetNextPageReceiveAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("categories/GetPrevPageReceiveAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, receive) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        receiveDetail.value = receive;
      }
    };
    const formatDate = (dateTime) => {
      return FormatDate(dateTime);
    };
    const formatStatus = (status) => {
      return FormatStatus(status);
    };
    const CheckedBox = (index) => {
      if (index == checkReceive.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listReceives.value) {
          checkReceive.value.push(listReceives.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkReceive.value.splice(0, checkReceive.value.length);
      }
    };
    const updateReceive = () => {
      isOpenUpdate.value = true;
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("categories/SearchReceiveAction", dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const CreateReceive = () => {
      const data = {
        receiveCode: receive.receiveCode,
        title: receive.title,
        is_active: receive.is_active,
        desc: receive.desc,
      };
      store.dispatch("categories/createReceiveAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const UpdateReceiveDetail = () => {
      store.dispatch("categories/updateReceiveAction", {
        data: receiveDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteReceive = () => {
      store.dispatch("categories/deleteReceiveAction", {
        id: receiveDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkReceive.value.length = 0;
    };
    const RemoveReceive = () => {
      for (var i = 0; i < checkReceive.value.length; i++) {
        store.dispatch("categories/deleteReceiveAction", {
          id: checkReceive.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkReceive.value.length = 0;
    };
    return {
      listReceives: listReceives,
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      checkedAll: checkedAll,
      receive: receive,
      checkReceive: checkReceive,
      receiveDetail: receiveDetail,
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
      checkedAllItem,
      CheckedBox,
      updateReceive,
      CreateReceive,
      UpdateReceiveDetail,
      deleteReceive,
      RemoveReceive,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
