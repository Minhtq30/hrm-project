<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-approval></sidebar-setting-approval>
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
              title="Tạo mới lý công tác"
            ></div>
            <p class="longText">Danh sách lý do công tác</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex">
          <div class="btn-icon" title="Import">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveMission"
            v-if="checkMission.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listMissions?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="mission in listMissions"
              :key="mission.ID"
              @contextmenu.prevent="rightClick($event, mission)"
              :class="{
                isCheck: CheckedBox(mission.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkMission"
                    :value="mission.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td class="cellTable w-[500px] whitespace-normal">
                {{ mission.name }}
              </td>
              <td class="cellTable">
                {{ formatPrice(mission.money) }}
              </td>
              <td class="cellTable">
                {{ formatActive(mission.status) }}
              </td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <modal-view :isOpen="isOpenDetail" :handleCloseDetail="handleCloseDetail">
      <div>
        <h1 class="header-modal">Tạo mới lý do công tác</h1>
        <div class="text-left p-4">
          <div class="form-small">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="mission.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="">Phụ phí</label>
            <div class="mt-1">
              <CurrencyInput v-model="mission.money" />
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="mission.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="mission.status == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="createMission()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseDetail">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <modal-view :isOpen="isOpenUpdate" :handleCloseDetail="handleCloseUpdate">
      <div>
        <h1 class="header-modal">Cập nhật lý do công tác</h1>
        <div class="text-left p-4">
          <div class="form-small">
            <label for="">Lý do</label>
            <div class="mt-1">
              <input
                type="text"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập tên lý do"
                v-model="missionDetail.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="">Phụ phí</label>
            <div class="mt-1">
              <CurrencyInput v-model="missionDetail.money" />
            </div>
          </div>
          <div class="form-small flex items-center">
            <div class="check">
              <input
                id="check"
                type="checkbox"
                v-model="missionDetail.status"
                true-value="1"
                false-value="0"
              />
              <label for="check"></label>
            </div>
            <p class="ml-2">
              <span v-if="missionDetail.status == true">Hoạt động</span
              ><span v-else>Không hoạt động</span>
            </p>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="updateMission()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="handleCloseUpdate">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteMission"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="handleOpenUpdate()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul>
    </context-menu>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import "@/assets/checkBox.css";
import TableResponsive from "@/components/table/TableResponsive.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingApproval from "@/components/sidebar/SidebarSettingApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SearchView from "@/components/search/SearchView.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import { reactive, ref } from "@vue/reactivity";
import {
  FormatModalX,
  FormatModalY,
  FormatPrice,
  FormatStatus,
  FormatTrueFalse,
} from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useReasonMission } from "@/store/modules/settingApproval/ReasonMission";
import { storeToRefs } from "pinia";
export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingApproval,
    NavbarSocial,
    SearchView,
    CurrencyInput,
  },
  data() {
    return {
      header: ["Lý do", "Phụ phí", "Trạng thái"],
    };
  },
  setup() {
    const toast = useToast();
    const isOpenDetail = ref(false);
    const isOpenUpdate = ref(false);
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkMission = ref([]);
    const missionDetail = ref({});
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const reason_mission = useReasonMission();
    const { listMissions } = storeToRefs(reason_mission);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    reason_mission.GetAllMissionsEndTimeLoadingAction({
      EndTimeLoading,
    });
    const mission = reactive({
      name: "",
      money: null,
      status: 0,
      app_approval_status: null,
    });
    const handleOpenDetail = () => {
      isOpenDetail.value = true;
    };
    const handleCloseDetail = () => {
      isOpenDetail.value = false;
      mission.name = "";
      mission.money = null;
      mission.status = 0;
      mission.app_approval_status = null;
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
    const rightClick = (e, mission) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        missionDetail.value = mission;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkMission.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listMissions.value) {
          checkMission.value.push(listMissions.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkMission.value.splice(0, checkMission.value.length);
      }
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      reason_mission.SearchMissionsAction(dataSearch.wordSearch);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const createMission = () => {
      const data = {
        name: mission.name,
        money: mission.money,
        status: mission.status,
        app_approval_status: mission.app_approval_status,
      };
      if (mission.name.length > 0) {
        reason_mission.createMissionAction({
          data: data,
          toast,
          handleCloseDetail,
          EndTimeLoading,
        });
      } else {
        toast.error("Vui lòng nhập tên phụ cấp công tác");
      }
    };
    const updateMission = () => {
      reason_mission.updateMissionAction({
        data: missionDetail.value,
        toast,
        handleCloseUpdate,
        EndTimeLoading,
      });
    };
    const deleteMission = () => {
      reason_mission.deleteMissionAction({
        id: missionDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
      checkMission.value.length = 0;
    };
    const RemoveMission = () => {
      for (var i = 0; i < checkMission.value.length; i++) {
        reason_mission.deleteMissionAction({
          id: checkMission.value[i],
          toast,
          handleCloseConfirm,
          EndTimeLoading,
        });
      }
      checkMission.value.length = 0;
    };
    // Start format all
    const formatActive = (status) => {
      return FormatStatus(status);
    };
    const formatTrueFalse = (status) => {
      return FormatTrueFalse(status);
    };
    const formatPrice = (money) => {
      return FormatPrice(money);
    };
    // End format all
    return {
      checkMission,
      checkedAll,
      listMissions,
      mission,
      isOpenDetail,
      isOpenUpdate,
      isActive,
      missionDetail,
      isLoading,
      isOpenConfirm,
      EndTimeLoading,
      handleOpenDetail,
      handleCloseDetail,
      handleOpenUpdate,
      handleCloseUpdate,
      CheckedBox,
      formatActive,
      formatTrueFalse,
      createMission,
      updateMission,
      deleteMission,
      RemoveMission,
      checkedAllItem,
      rightClick,
      formatPrice,
      handleSearch,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
