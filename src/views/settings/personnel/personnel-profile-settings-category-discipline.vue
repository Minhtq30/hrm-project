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
              title="Tạo mới kỷ luật"
            ></div>
            <p class="longText">Danh mục kỷ luật</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <navbar-category></navbar-category>
        <div class="flex h-full">
          <div
            class="btn-icon"
            title="Import"
            v-if="checkDiscipline.length == 0"
          >
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Export"
            v-if="checkDiscipline.length > 0"
          >
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveDiscipline"
            v-if="checkDiscipline.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listDisciplines?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="discipline in listDisciplines"
              :key="discipline.ID"
              @contextmenu.prevent="rightClick($event, discipline)"
              :class="{
                isCheck: CheckedBox(discipline.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkDiscipline"
                    :value="discipline.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">
                {{ discipline.title }}
              </td>
              <td class="cellTable w-[400px] whitespace-normal">
                {{ discipline.desc }}
              </td>
              <td class="cellTable">
                {{ formatStatus(discipline.is_active) }}
              </td>
              <td class="cellTable">
                {{ formatDate(discipline.created_at) }}
              </td>
              <td class="cellTable">
                <img src="" alt="" class="w-8 h-8 rounded-full" />
              </td>
              <td class="cellTable">
                {{ formatDate(discipline.updated_at) }}
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
    <template v-slot:sub_footer v-if="listDisciplines?.length"
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
  <!-- Start modal add category-discipline -->
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div class="w-[500px]">
        <h1 class="header-modal">tạo mới hình thức kỷ luật</h1>
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
                v-model="discipline.disciplineCode"
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
                v-model="discipline.title"
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
                v-model="discipline.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="discipline.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-slate-100 p-2 text-left">
          <button class="button-modal" @click="CreateDiscipline()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal add category-discipline -->
    <!-- Start modal update category-discipline -->
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div class="w-[500px]">
        <h1 class="header-modal">cập nhật hình thức kỷ luật</h1>
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
                v-model="disciplineDetail.disciplineCode"
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
                v-model="disciplineDetail.title"
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
                v-model="disciplineDetail.desc"
              ></textarea>
            </div>
          </div>
          <div class="mt-2 flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="disciplineDetail.is_active"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">Hoạt động</p>
          </div>
        </div>
        <div class="bg-slate-100 p-2 text-left">
          <button class="button-modal" @click="UpdateDisciplineDetail()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- End modal update category-discipline -->
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteDiscipline"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <!-- Start context-menu category-discipline -->
  <div>
    <context-menu :isActive="isActiveDiscipline"
      ><ul>
        <li @click.prevent="updateDiscipline()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <!-- End context-menu category-discipline -->
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
    const checkedAll = ref(false);
    const checkDiscipline = ref([]);
    const disciplineDetail = ref({});
    const isActiveDiscipline = ref(false);
    const perPage = ref(50);
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const discipline = reactive({
      disciplineCode: "",
      title: "",
      desc: "",
      is_active: false,
    });
    store.dispatch("categories/getAllDisciplinesEndTimeLoadingAction", {
      EndTimeLoading,
    });
    const listDisciplines = computed(
      () => store.state.categories.listDisciplines
    );
    const listPagination = computed(
      () => store.state.categories.listPagination
    );
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      (discipline.disciplineCode = ""),
        (discipline.title = ""),
        (discipline.desc = ""),
        (discipline.is_active = false),
        (isOpenDetail.value = false);
    };
    const handleOpenUpdate = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseUpdate = () => {
      isOpenUpdate.value = false;
    };
    const updateDiscipline = () => {
      isOpenUpdate.value = true;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
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
      store.dispatch("categories/GetNextPageDisciplineAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("categories/GetPrevPageDisciplineAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, discipline) => {
      if (isActiveDiscipline.value === true) {
        isActiveDiscipline.value = false;
      } else {
        isActiveDiscipline.value == true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        disciplineDetail.value = discipline;
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch(
        "categories/SearchDisciplinesAction",
        dataSearch.wordSearch
      );
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const CreateDiscipline = () => {
      const data = {
        disciplineCode: discipline.disciplineCode,
        title: discipline.title,
        desc: discipline.desc,
        is_active: discipline.is_active,
      };
      store.dispatch("categories/createDisciplinesAction", {
        data: data,
        toast,
        handleCloseDetail,
        EndTimeLoading,
      });
    };
    const CheckedBox = (index) => {
      if (index == checkDiscipline.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listDisciplines.value) {
          checkDiscipline.value.push(listDisciplines.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkDiscipline.value.splice(0, checkDiscipline.value.length);
      }
    };
    const UpdateDisciplineDetail = () => {
      store.dispatch("categories/updateDisciplinesAction", {
        data: disciplineDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteDiscipline = () => {
      store.dispatch("categories/deleteDisciplinesAction", {
        id: disciplineDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkDiscipline.value.length = 0;
    };
    const RemoveDiscipline = () => {
      for (var i = 0; i < checkDiscipline.value.length; i++) {
        store.dispatch("categories/deleteDisciplinesAction", {
          id: checkDiscipline.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkDiscipline.value.length = 0;
    };
    return {
      isOpenDetail: isOpenDetail,
      discipline: discipline,
      listDisciplines: listDisciplines,
      isOpenUpdate: isOpenUpdate,
      checkedAll: checkedAll,
      checkDiscipline: checkDiscipline,
      disciplineDetail: disciplineDetail,
      isActiveDiscipline: isActiveDiscipline,
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
      CreateDiscipline,
      updateDiscipline,
      UpdateDisciplineDetail,
      deleteDiscipline,
      RemoveDiscipline,
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
