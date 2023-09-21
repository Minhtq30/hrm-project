<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-home></sidebar-home>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-admin></button-create-admin>
            <p class="longText">Danh sách nhóm người dùng</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex">
          <div class="btn-icon">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
          </div>
          <div
            class="btn-icon"
            v-if="checkAdminGroup?.length > 0"
            @click="handleOpenConfirm()"
          >
            <div class="cx">
              <i class="fal fa-trash"></i>
            </div>
            <div class="action-label">Xóa</div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full items-left" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
          :isShow="true"
          ><tr
            class="bg-white text-left border-b"
            v-for="(adminGroup, index) in listGroupUsers"
            :key="index"
            :class="{ isCheck: CheckedBox(adminGroup.ID) }"
            @contextmenu.prevent="rightClick($event, adminGroup)"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkAdminGroup"
                  :value="adminGroup.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td
              class="cellTable cursor-pointer"
              @click="handleToGroupDetail(adminGroup.ID)"
            >
              {{ adminGroup.title }}
            </td>
            <td class="cellTable">
              {{ formatIsAdministration(adminGroup.is_admin) }}
            </td>
            <td class="cellTable">{{ adminGroup.created_user?.fullname }}</td>
            <td class="cellTable">{{ formatDate(adminGroup.created_at) }}</td>
            <td class="cellTable">{{ adminGroup.updated_user?.fullname }}</td>
            <td class="cellTable">{{ formatDate(adminGroup.updated_at) }}</td>
            <!-- <td class="p-3">{{ AdminGroup.is_active }}</td> -->
          </tr>
        </table-responsive>
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
    <context-menu :isActive="isActiveAdminGroup"
      ><ul>
        <li @click.prevent="EditGroup()">
          <i class="fal fa-edit"></i><a href="#">Sửa</a>
        </li>
        <li @click.prevent="handleOpenConfirm()">
          <i class="fal fa-trash"></i><a href="#">Xóa</a>
        </li>
      </ul></context-menu
    >
  </div>
  <teleport to="#app">
    <!-- Start Xác nhận xóa -->
    <div v-if="checkAdminGroup?.length > 0">
      <modal-delete
        :isOpen="isOpenConfirm"
        :handleCloseDetail="handleCloseConfirm"
        :ConfirmDelete="RemoveAdminGroup"
      >
      </modal-delete>
    </div>
    <div v-else>
      <modal-delete
        :isOpen="isOpenConfirm"
        :handleCloseDetail="handleCloseConfirm"
        :ConfirmDelete="handleDeleteGroup"
      >
      </modal-delete>
    </div>

    <!-- End Xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateAdmin from "./ButtonCreateAdmin.vue";
import { ref } from "vue";
import SidebarHome from "@/components/sidebar/SidebarHome.vue";
import { FormatDate, FormatModalX, FormatModalY } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useGroupUser } from "@/store/modules/admin/GroupUser";
import { storeToRefs } from "pinia";

export default {
  components: {
    TableResponsive,
    NavFeature,
    PersonLayout,
    NavbarSocial,
    SidebarHome,
    ButtonCreateAdmin,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isActiveAdminGroup = ref(false);
    const isLoading = ref(true);
    const adminGroupDetail = ref();
    const checkedAll = ref(false);
    const checkAdminGroup = ref([]);
    const isOpenConfirm = ref(false);
    const AdminGroupSearch = ref("");
    const GroupUser = useGroupUser();
    const { listGroupUsers, listPagination } = storeToRefs(GroupUser);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    GroupUser.getAllAdminGroupsEndTimeLoadingAction({ EndTimeLoading });
    const rightClick = (e, adminGroup) => {
      if (isActiveAdminGroup.value === true) {
        isActiveAdminGroup.value = false;
      } else {
        isActiveAdminGroup.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        adminGroupDetail.value = adminGroup;
      }
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listGroupUsers.value) {
          checkAdminGroup.value.push(listGroupUsers.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkAdminGroup.value.splice(0, checkAdminGroup.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkAdminGroup.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const NextPage = () => {
      const data = {
        urlLink: listPagination.value.next_page,
      };
      GroupUser.getNextPageAction({
        data: data,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const data = {
        urlLink: listPagination.value.prev_page,
      };
      GroupUser.getPrevPageAction({
        data: data,
        EndTimeLoading,
      });
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleDeleteGroup = () => {
      GroupUser.DeleteAdminGroupAction({
        id: adminGroupDetail.value.ID,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    const RemoveAdminGroup = () => {
      for (var i = 0; i < checkAdminGroup.value.length; i++) {
        GroupUser.DeleteAdminGroupAction({
          id: checkAdminGroup.value[i],
          toast,
          route,
          router,
          EndTimeLoading,
          handleCloseConfirm,
        });
      }
      checkAdminGroup.value.length = 0;
    };
    const formatDate = (date) => {
      return FormatDate(date);
    };
    const EditGroup = () => {
      router.push(`/admin-group-edit/${adminGroupDetail.value.ID}`);
    };
    const handleToGroupDetail = (id) => {
      router.push(`/admin-group-detail/${id}`);
    };
    return {
      isActiveAdminGroup,
      listGroupUsers,
      AdminGroupSearch,
      listPagination,
      adminGroupDetail,
      checkedAll,
      checkAdminGroup,
      isLoading,
      isOpenConfirm,
      GroupUser,
      rightClick,
      checkedAllItem,
      CheckedBox,
      NextPage,
      PrevPage,
      handleDeleteGroup,
      RemoveAdminGroup,
      formatDate,
      EditGroup,
      EndTimeLoading,
      handleOpenConfirm,
      handleCloseConfirm,
      handleToGroupDetail,
    };
  },
  data() {
    return {
      header: [
        "Tên nhóm",
        "Quản trị hệ thống",
        "Người tạo",
        "Ngày tạo",
        "Người sửa",
        "Ngày sửa",
      ],
    };
  },
  methods: {
    formatIsAdministration(status) {
      if (status) {
        if (status == "no") {
          return "Không";
        } else {
          return "Có";
        }
      } else {
        return "";
      }
    },
  },
};
</script>
<style></style>
