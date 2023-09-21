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
              @click="this.$router.push('/approval-approve-setting/create')"
              title="Tạo mới quy trình duyệt"
            ></div>
            <p class="longText">Danh sách người duyệt</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar
      ><nav-feature>
        <div class="flex">
          <div class="btn-icon" title="Import">
            <div class="cx"><i class="fal fa-file-import"></i></div>
            <div class="action-label">Import</div>
          </div>
          <div
            class="btn-icon"
            title="Xóa"
            @click="RemoveLeave"
            v-if="checkLeave.length > 0"
          >
            <div class="cx"><i class="fal fa-trash"></i></div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listApprove?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <tr
              class="bg-white border-b"
              v-for="leave in listApprove"
              :key="leave.ID"
              @contextmenu.prevent="rightClick($event, leave)"
              :class="{
                isCheck: CheckedBox(leave.ID),
              }"
            >
              <td class="w-4 px-6 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    v-model="checkLeave"
                    :value="leave.ID"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td
                class="cellTable cursor-pointer"
                @click="ShowDetail(leave.ID)"
              >
                {{ leave.name }}
              </td>
              <td class="cellTable">{{ leave.module }}</td>
              <td class="cellTable">{{ formatDate(leave.created_at) }}</td>
            </tr>
          </table-responsive>
        </div>
        <div v-else class="text-left p-4">Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <div>
    <context-menu :isActive="isActive">
      <ul>
        <li @click.prevent="handleUpdateApprove()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
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
      :ConfirmDelete="handleDeleteApprove"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
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
import { ref } from "@vue/reactivity";
import { FormatDate, FormatModalX, FormatModalY } from "@/constants/FormatAll";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovers } from "@/store/modules/settingApproval/approve";
import { storeToRefs } from "pinia";
export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    SidebarSettingApproval,
    NavbarSocial,
    SearchView,
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
  },
  data() {
    return {
      header: ["Tiêu đề", "Đối tượng", "Ngày tạo"],
    };
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkLeave = ref([]);
    const leaveDetail = ref({});
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const approve = useApprovers();
    const { listApprove } = storeToRefs(approve);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    approve.GetAllApproveAction({ EndTimeLoading });
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const rightClick = (e, leave) => {
      if (isActive.value === true) {
        isActive.value === false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        leaveDetail.value = leave;
      }
    };
    const CheckedBox = (index) => {
      if (index == checkLeave.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listApprove.value) {
          checkLeave.value.push(listApprove.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkLeave.value.splice(0, checkLeave.value.length);
      }
    };
    const ShowDetail = (id) => {
      router.push(`/approval-approve-setting/detail=${id}`);
    };
    const handleUpdateApprove = () => {
      router.push(`/approval-approve-setting/edit=${leaveDetail.value.ID}`);
    };
    const handleDeleteApprove = () => {
      approve.DeleteApproveAction({
        id: leaveDetail.value.ID,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    const handleSearch = () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };

    return {
      checkLeave,
      checkedAll,
      listApprove,
      isActive,
      isLoading,
      leaveDetail,
      isOpenConfirm,
      CheckedBox,
      checkedAllItem,
      rightClick,
      handleSearch,
      EndTimeLoading,
      handleCloseConfirm,
      handleOpenConfirm,
      ShowDetail,
      handleUpdateApprove,
      handleDeleteApprove,
    };
  },
};
</script>
