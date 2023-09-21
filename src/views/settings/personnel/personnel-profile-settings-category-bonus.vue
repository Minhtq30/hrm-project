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
              title="Tạo mới loại khen thưởng"
            ></div>
            <p class="longText">Danh mục khen thưởng</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <navbar-category></navbar-category>
        <div class="flex h-full">
          <div class="btn-icon" title="Import" v-if="checkBonus.length == 0">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div class="btn-icon" title="Export" v-if="checkBonus.length > 0">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveBonus"
            v-if="checkBonus.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listBonuses?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="bonus in listBonuses"
              :key="bonus.ID"
              @contextmenu.prevent="rightClick($event, bonus)"
              :class="{
                isCheck: CheckedBox(bonus.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkBonus"
                    :value="bonus.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ bonus.title }}
              </td>
              <td class="cellTable w-[400px] whitespace-normal">
                {{ bonus.desc }}
              </td>
              <td class="cellTable">
                {{ formatStatus(bonus.is_active) }}
              </td>
              <td class="cellTable">
                {{ formatDate(bonus.created_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
              <td class="cellTable">
                {{ formatDate(bonus.updated_at) }}
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
    <template v-slot:sub_footer v-if="listBonuses?.length"
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
    <!-- Start modal add category-bonus -->
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới hình thức khen thưởng</h1>
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
                v-model="bonus.bonusCode"
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
                v-model="bonus.title"
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
                v-model="bonus.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="bonus.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="CreateBonus()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add category-bonus -->
    <!-- Start modal update category-bouus -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">cập nhật hình thức khen thưởng</h1>
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
                v-model="bonusDetail.bonusCode"
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
                v-model="bonusDetail.title"
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
                v-model="bonusDetail.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="bonusDetail.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UpdatebonusDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update category-bonus -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteBonus"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <!-- Start context-menu category-bonus -->
  <div>
    <context-menu :isActive="isActiveBonus"
      ><ul>
        <li @click.prevent="updateBonus()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- End context-menu category-bonus -->
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
    const isOpenUpdate = ref(false);
    const checkBonus = ref([]);
    const checkedAll = ref(false);
    const isActiveBonus = ref(false);
    const bonusDetail = ref({});
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const bonus = reactive({
      bonusCode: "",
      title: "",
      desc: "",
      is_active: false,
    });
    store.dispatch("categories/getAllBonusEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listBonuses = computed(() => store.state.categories.listBonuses);
    const listPagination = computed(
      () => store.state.categories.listPagination
    );
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      bonus.bonusCode = "";
      bonus.title = "";
      bonus.desc = "";
      bonus.is_active = false;
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
      store.dispatch("categories/GetNextPageBonusAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("categories/GetPrevPageBonusAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, bonus) => {
      if (isActiveBonus.value === true) {
        isActiveBonus.value = false;
      } else {
        isActiveBonus.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        bonusDetail.value = bonus;
      }
    };
    const updateBonus = () => {
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
      store.dispatch("categories/SearchBonusAction", dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const CreateBonus = () => {
      const data = {
        bonusCode: bonus.bonusCode,
        title: bonus.title,
        desc: bonus.desc,
        is_active: bonus.is_active,
      };
      store.dispatch("categories/createBonusAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const UpdatebonusDetail = () => {
      store.dispatch("categories/updateBonusAction", {
        data: bonusDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const CheckedBox = (index) => {
      if (index == checkBonus.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listBonuses.value) {
          checkBonus.value.push(listBonuses.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkBonus.value.splice(0, checkBonus.value.length);
      }
    };
    const deleteBonus = () => {
      store.dispatch("categories/deleteBonusAction", {
        id: bonusDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkBonus.value.length = 0;
    };
    const RemoveBonus = () => {
      for (var i = 0; i < checkBonus.value.length; i++) {
        store.dispatch("categories/deleteBonusAction", {
          id: checkBonus.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkBonus.value.length = 0;
    };
    return {
      isOpenDetail: isOpenDetail,
      isOpenUpdate: isOpenUpdate,
      bonus: bonus,
      listBonuses: listBonuses,
      checkBonus: checkBonus,
      checkedAll: checkedAll,
      isActiveBonus: isActiveBonus,
      bonusDetail: bonusDetail,
      listPagination: listPagination,
      isLoading,
      isOpenConfirm,
      EndTimeLoading,
      handleSearch,
      handleOpenDetail,
      handleCloseDetail,
      CreateBonus,
      handleOpenUpdate,
      handleCloseUpdate,
      formatDate,
      formatStatus,
      NextPage,
      PrevPage,
      rightClick,
      updateBonus,
      UpdatebonusDetail,
      CheckedBox,
      deleteBonus,
      RemoveBonus,
      checkedAllItem,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>

<style></style>
