<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-personnel></button-create-personnel>
            <div class="longText">Danh sách hợp đồng</div>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex items-center" v-if="checkContracts.length < 1">
          <div>
            <navbar-contract></navbar-contract>
          </div>
        </div>
        <div class="flex">
          <div class="btn-icon relative group" title="Export">
            <div class="cx"><i class="fal fa-file-export"></i></div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-10 right-0 top-12 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-44 sub-item">Xuất tất cả</li>
                <li class="w-44 sub-item">Chọn trường để export</li>
              </ul>
            </div>
          </div>
          <div class="btn-icon relative group" title="Import">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
            <div
              class="absolute z-10 right-0 top-12 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-3 rounded-md">
                <li
                  class="w-56 sub-item"
                  @click="this.$router.push('/contract-import')"
                >
                  Import hợp đồng
                </li>
                <li class="w-56 sub-item">Xem lịch sử import hợp đồng</li>
              </ul>
            </div>
          </div>
          <div
            class="btn-icon"
            @click="this.$router.push('/personnel-profile-settings-general')"
            v-if="
              checkRole([
                'PERSONNEL_CONTRACT_MANAGE_ALL',
                'PERSONNEL_CONTRACT_MANAGE_DEPARTMENT',
              ])
            "
          >
            <div class="cx">
              <i class="fal fa-cog"></i>
            </div>
            <div class="action-label">Cài đặt</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listContracts?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
            ><tr
              class="bg-white border-b"
              v-for="contract in listContracts"
              :key="contract.ID"
              @contextmenu.prevent="rightClick($event, contract)"
              :class="{
                isCheck: CheckedBox(contract.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkContracts"
                    :value="contract.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable">{{ contract.created_by_id }}</td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetail(contract.ID)"
              >
                {{ contract.contract_code }}
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="showDetailPersonnel(contract.personnel_id)"
              >
                {{ contract.personnel_name }}
              </td>
              <td class="cellTable">
                {{ formatDepartment(contract.department_id) }}
              </td>
              <td class="cellTable">
                {{ formatContract(contract.contract_type) }}
              </td>
              <td class="cellTable text-center">
                {{ formatDate(contract.date_start) }}
              </td>
              <td class="cellTable text-center">
                {{ formatDate(contract.date_finish) }}
              </td>
              <td class="cellTable">
                <div class="beacon" :class="formatColor(contract.status)">
                  {{ formatStatus(contract.status) }}
                </div>
              </td>
              <td class="cellTable">{{ formatDate(contract.created_at) }}</td>
            </tr></table-responsive
          >
        </div>
        <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer
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
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li
          @click.prevent="changeStatusContarctToIsvalid()"
          v-if="
            checkRole([
              'PERSONNEL_CONTRACT_MANAGE_ALL',
              'PERSONNEL_CONTRACT_MANAGE_DEPARTMENT',
            ])
          "
          v-show="showConfirm"
        >
          <i class="fal fa-check"></i><a href="#">Có hiệu lực</a>
        </li>
        <li
          @click.prevent="changeStatusContarctToLiquidation()"
          v-if="
            checkRole([
              'PERSONNEL_CONTRACT_MANAGE_ALL',
              'PERSONNEL_CONTRACT_MANAGE_DEPARTMENT',
            ])
          "
          v-show="showLiquidation"
        >
          <i class="fal fa-repeat"></i><a href="#">Thanh lý hợp đồng</a>
        </li>
        <hr />
        <li
          @click.prevent="UpdateContarct()"
          v-if="checkRole(['PERSONNEL_CONTRACT_UPDATE'])"
          v-show="showLiquidation"
        >
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li
          @click.prevent="handleOpenConfirm()"
          v-if="checkRole(['PERSONNEL_CONTRACT_DELETE'])"
          v-show="showLiquidation"
        >
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteContract"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay :isLoading="isLoadingShow"></loading-overlay>
</template>

<script>
import NavbarContract from "./NavbarContract.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import SearchView from "@/components/search/SearchView.vue";
import noData from "@/assets/images/noData.png";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import {
  FormatColorContract,
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatRole,
  FormatShowConfirmContract,
  FormatShowLiquidationContract,
  FormatStatusContract,
  FormatTitle,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useReasonMission } from "@/store/modules/settingApproval/ReasonMission";
import { useContract } from "@/store/modules/contract/contracts";
import { storeToRefs } from "pinia";
export default {
  data() {
    return {
      header: [
        "Người tạo",
        "Mã HĐ",
        "Tên nhân sự",
        "Phòng ban",
        "Tên hợp đồng",
        "Hiệu lực từ ngày",
        "Đến ngày",
        "Tình trạng",
        "Ngày tạo",
      ],
      selected: "Chi tiết",
      imgNoData: noData,
    };
  },
  components: {
    TableResponsive,
    NavFeature,
    PaginationView,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    ButtonCreatePersonnel,
    NavbarContract,
    SearchView,
  },
  methods: {
    formatName(index) {
      if (index) {
        return index.fullname;
      } else {
        return "";
      }
    },
    setSelected(tab) {
      this.selected = tab;
    },
    formatStatus(status) {
      return FormatStatusContract(status);
    },
    formatColor(status) {
      return FormatColorContract(status);
    },
    formatMission(id) {
      if (id == null) {
        return "";
      } else {
        const arr = this.ReasonMissionActive.find((item) => item.ID == id);
        if (arr) {
          return arr.name;
        } else {
          return "";
        }
      }
    },
    formatContract(id) {
      return FormatTitle(id, this.listContractTypes);
    },
    formatDepartment(id) {
      return FormatTitle(id, this.listDepartments);
    },
    formatDate(date) {
      if (date == null) {
        return "";
      } else {
        return FormatDate(date);
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const route = useRoute();
    const isOpenDetail = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkContracts = ref([]);
    const contractID = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isOpenConfirm = ref(false);
    const showLiquidation = ref();
    const showConfirm = ref();
    const profile = useUserProfile();
    const reasonMission = useReasonMission();
    const contract = useContract();
    const { listContracts, listPagination } = storeToRefs(contract);
    const { ReasonMissionActive } = storeToRefs(reasonMission);
    const { userProfile } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoad = () => {
      isLoadingShow.value = false;
    };
    contract.GetAllContractsAction({
      type: route.params.id,
      EndTimeLoading: EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/contract-personnel/contract_type=${to.params.id}`) {
        contract.GetAllContractsAction({
          type: to.params.id,
          EndTimeLoading: EndTimeLoading,
        });
      }
    });
    setTimeout(() => {
      store.dispatch("departments/getAllDepartmentsAction");
      store.dispatch("contractTypes/GetAllContractTypeAction", 30);
    }, 1000);
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listContractTypes = computed(
      () => store.getters["contractTypes/listContractTypesOn"]
    );
    // Start role
    const checkRole = (index) => {
      for (let i = 0; i < index?.length; i++) {
        if (FormatRole(index[i], userProfile.value) == true) {
          return true;
        }
      }
    };
    // End role
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
    };

    const rightClick = (e, contract) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        contractID.value = contract.ID;

        showLiquidation.value = FormatShowLiquidationContract(contract.status);
        showConfirm.value = FormatShowConfirmContract(contract.status);
      }
    };
    const UpdateContarct = () => {
      router.push(`/update-contract/${contractID.value}`);
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      contract.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      contract.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listContracts.value) {
          checkContracts.value.push(listContracts.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkContracts.value.splice(0, checkContracts.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkContracts.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      contract.SearchContractsAction({
        search: dataSearch.wordSearch,
        type: route.params.id,
        EndTimeLoading,
      });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const deleteContract = () => {
      contract.DeleteContractAction({
        id: contractID.value,
        toast,
        route,
        router,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const changeStatusContarctToLiquidation = () => {
      isLoadingShow.value = true;
      contract.ChangeStatusToliquidationAction({
        id: contractID.value,
        toast,
        route,
        EndTimeLoading: EndTimeLoad,
      });
    };
    const changeStatusContarctToIsvalid = () => {
      contract.ChangeStatusToIsvalidAction({
        id: contractID.value,
        toast,
        route,
        EndTimeLoading: EndTimeLoad,
      });
    };
    const showDetail = (id) => {
      router.push(`/contract-detail/${id}`);
    };
    const showDetailPersonnel = (id) => {
      router.push(`/personnelDetail/${id}`);
    };
    return {
      listContracts,
      listDepartments,
      listContractTypes,
      listPagination,
      isOpenDetail,
      isActive,
      contractID,
      checkedAll,
      checkContracts,
      isLoading,
      isLoadingShow,
      ReasonMissionActive,
      userProfile,
      isOpenConfirm,
      showLiquidation,
      showConfirm,
      EndTimeLoad,
      showDetail,
      showDetailPersonnel,
      checkRole,
      handleOpenDetail,
      handleCloseDetail,
      rightClick,
      UpdateContarct,
      deleteContract,
      NextPage,
      PrevPage,
      checkedAllItem,
      CheckedBox,
      changeStatusContarctToLiquidation,
      changeStatusContarctToIsvalid,
      handleSearch,
      EndTimeLoading,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
