<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-home></sidebar-home>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-admin></button-create-admin>
            <div class="longText">Danh sách người dùng</div>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <div>
        <navbar-user :countUser="listCount"></navbar-user>
      </div>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listUsers?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <template v-if="this.$route.params.key != 'INACTIVE'">
              <tr
                class="bg-white border-b"
                v-for="user in listUsers"
                :key="user.ID"
                @contextmenu.prevent="rightClick($event, user)"
                :class="{
                  isCheck: CheckedBox(user.ID),
                }"
              >
                <td class="w-4 px-6 py-3">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      v-model="checkUsers"
                      :value="user.ID"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>
                <td
                  class="cellTable cursor-pointer"
                  @click="ShowDetailUser(user.ID)"
                >
                  {{ user.username }}
                </td>
                <td class="cellTable">{{ formatGroup(user.group_id) }}</td>
                <td
                  class="cellTable cursor-pointer"
                  @click="ShowDetailUser(user.ID)"
                >
                  {{ user.code }}
                </td>
                <td
                  class="cellTable cursor-pointer"
                  @click="ShowDetailUser(user.ID)"
                >
                  {{ user.personnels?.name }}
                </td>
                <td class="cellTable">
                  {{ formatPosition(user.position_id) }}
                </td>
                <td class="cellTable">
                  {{ formatDepartment(user.department_id) }}
                </td>
                <td class="cellTable">{{ formatDate(user.created_at) }}</td>
              </tr>
            </template>
            <template v-else>
              <tr
                class="bg-white border-b"
                v-for="user in listUsers"
                :key="user.ID"
                @contextmenu.prevent="rightClick($event, user)"
                :class="{
                  isCheck: CheckedBox(user.ID),
                }"
              >
                <td class="w-4 px-6 py-3">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      v-model="checkUsers"
                      :value="user.ID"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>
                <td class="cellTable">
                  {{ user.code }}
                </td>
                <td class="cellTable">{{ user.name }}</td>
                <td class="cellTable">{{ formatDate(user.birthday) }}</td>
                <td class="cellTable">
                  {{ user.personal_email }}
                </td>
                <td class="cellTable">
                  {{ formatPosition(user.position_id) }}
                </td>
                <td class="cellTable">
                  {{ formatDepartment(user.department_id) }}
                </td>

                <td class="cellTable">{{ formatDate(user.created_at) }}</td>
              </tr>
            </template>
          </table-responsive>
        </div>
        <div v-else class="text-left p-2 form-group-label">
          Không tìm thấy kết quả
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listUsers?.length"
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

  <context-menu :isActive="isActive">
    <ul>
      <li
        @click.prevent="handleBlockAccount()"
        v-if="this.$route.params.key == 'ACTIVE'"
      >
        <i class="fal fa-lock-alt"></i><a href="#">Khóa tài khoản</a>
      </li>
      <li
        @click.prevent="handleUnlockAccount()"
        v-if="this.$route.params.key == 'BLOCK'"
      >
        <i class="fal fa-unlock-alt"></i><a href="#">Mở lại tài khoản</a>
      </li>
      <li
        @click.prevent="handleOpenCreateAccount()"
        v-if="this.$route.params.key == 'INACTIVE'"
      >
        <i class="fal fa-check"></i><a href="#">Kích hoạt tài khoản</a>
      </li>
      <li
        @click.prevent="handleOpenUpdateRule()"
        v-if="this.$route.params.key != 'INACTIVE'"
      >
        <i class="fal fa-users"></i><a href="#">Cập nhật nhóm</a>
      </li>
      <li
        @click.prevent="handleOpenCreateAccount()"
        v-if="this.$route.params.key != 'INACTIVE'"
      >
        <i class="fal fa-paper-plane"></i><a href="#">Gửi mật khẩu</a>
      </li>
      <li
        @click.prevent="EditUser()"
        v-if="this.$route.params.key != 'INACTIVE'"
      >
        <i class="fal fa-edit"></i><a href="#">Sửa</a>
      </li>
      <li
        @click.prevent="openModalChangePass()"
        v-if="this.$route.params.key != 'INACTIVE'"
      >
        <i class="fal fa-key"></i><a href="#">Đổi mật khẩu</a>
      </li>
    </ul>
  </context-menu>
  <teleport to="#app">
    <!-- Start Cập nhật nhóm người dùng -->
    <modal-view
      :isOpen="isOpenUpdateRule"
      :handleCloseDetail="handleCloseUpdateRule"
    >
      <update-group-user
        :userGroup="accountDetail"
        :closeModal="handleCloseUpdateRule"
      ></update-group-user>
    </modal-view>
    <!-- End Cập nhật nhóm người dùng -->
    <!-- Start kích hoạt tài khoản -->
    <modal-view
      :isOpen="isOpenCreateAccount"
      :handleCloseDetail="handleCloseCreateAccount"
    >
      <form-create-user
        :userID="accountDetail"
        :closeModal="handleCloseCreateAccount"
      ></form-create-user>
    </modal-view>
    <!-- End kích hoạt tài khoản -->
  </teleport>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenDetail"
      :handleCloseDetail="closeModalChangePass"
    >
      <div>
        <h1 class="header-modal">Reset mật khẩu {{ accountDetail.code }}</h1>
        <div class="text-left p-2 w-[520px]">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Mật khẩu mới <span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control-input"
                placeholder="Ít nhất 4 ký tự"
                v-model="passwordReset"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Nhập lại mật khẩu <span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control-input"
                placeholder="Ít nhất 4 ký tự"
                v-model="RePassword"
              />
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="ChangePass()">Cập nhật</button>
          <button class="button-close-modal" @click="closeModalChangePass">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarHome from "@/components/sidebar/SidebarHome.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import NavbarUser from "./NavbarUser.vue";
import ButtonCreateAdmin from "../ButtonCreateAdmin.vue";
import SearchView from "@/components/search/SearchView.vue";
import FormCreateUser from "./FormCreateUser.vue";
import UpdateGroupUser from "./UpdateGroupUser.vue";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatTitle,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useGroupUser } from "@/store/modules/admin/GroupUser";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarHome,
    NavbarSocial,
    NavbarUser,
    TableResponsive,
    ButtonCreateAdmin,
    SearchView,
    FormCreateUser,
    UpdateGroupUser,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(date) {
      if (date == null) {
        return "";
      } else return FormatDate(date);
    },
    formatDepartment(id) {
      if (id != null) {
        return FormatTitle(id, this.listDepartments);
      } else {
        return "";
      }
    },
    formatPosition(id) {
      return FormatTitle(id, this.listPositions);
    },
    formatGroup(id) {
      return FormatTitle(id, this.listGroupUsers);
    },
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkUsers = ref([]);
    const isOpenUpdateRule = ref(false);
    const accountDetail = ref();
    const isLoading = ref(true);
    const isOpenDetail = ref(false);
    const header = ref();
    const passwordReset = ref();
    const RePassword = ref();
    const isOpenCreateAccount = ref(false);
    const GroupUser = useGroupUser();
    const { listGroupUsers } = storeToRefs(GroupUser);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    if (route.params.key != "INACTIVE") {
      header.value = [
        "Tài khoản",
        "Nhóm",
        "Mã nhân sự",
        "Tên nhân sự",
        "Vị trí",
        "Phòng ban",
        "Ngày tạo",
      ];
    } else {
      header.value = [
        "Mã nhân sự",
        "Họ tên",
        "Ngày sinh",
        "Email",
        "Vị trí",
        "Phòng ban",
        "Ngày tạo HSNS",
      ];
    }
    store.dispatch("users/GetAllUserAccountAction", {
      key: route.params.key,
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/page-user/type=${to.params.key}`) {
        store.dispatch("users/GetAllUserAccountAction", {
          key: to.params.key,
          EndTimeLoading,
        });
      }
      if (to.params.key != "INACTIVE") {
        header.value = [
          "Tài khoản",
          "Nhóm",
          "Mã nhân sự",
          "Tên nhân sự",
          "Vị trí",
          "Phòng ban",
          "Ngày tạo",
        ];
      } else {
        header.value = [
          "Mã nhân sự",
          "Họ tên",
          "Ngày sinh",
          "Email",
          "Vị trí",
          "Phòng ban",
          "Ngày tạo HSNS",
        ];
      }
    });
    const listUsers = computed(() => store.state.users.listUserAccount);
    const listCount = computed(() => store.state.users.listUserCount);
    const listPagination = computed(() => store.state.users.listPagination);
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listPositions = computed(() => store.state.positions.listPositions);
    if (listDepartments.value?.length == 0) {
      store.dispatch("departments/getAllDepartmentsAction");
    }
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    if (listGroupUsers.value?.length == 0) {
      GroupUser.getAllAdminGroupsAction(100);
    }
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listUsers.value) {
          checkUsers.value.push(listUsers.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkUsers.value.splice(0, checkUsers.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkUsers.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      store.dispatch("users/GetNextPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      store.dispatch("users/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, user) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        accountDetail.value = user;
      }
    };
    const handleOpenUpdateRule = () => {
      isOpenUpdateRule.value = true;
    };
    const handleCloseUpdateRule = () => {
      isOpenUpdateRule.value = false;
    };
    const handleBlockAccount = () => {
      store.dispatch("users/BlockAccountAction", {
        id: accountDetail.value.ID,
        key: route.params.key,
        route,
        toast,
        EndTimeLoading,
      });
    };
    const handleUnlockAccount = () => {
      store.dispatch("users/UnLockAccountAction", {
        id: accountDetail.value.ID,
        key: route.params.key,
        route,
        toast,
        EndTimeLoading,
      });
    };
    const openModalChangePass = () => {
      isOpenDetail.value = true;
    };
    const closeModalChangePass = () => {
      isOpenDetail.value = false;
    };
    const ChangePass = () => {
      const password = {
        password: passwordReset.value,
        password_confirmation: RePassword.value,
      };
      store.dispatch("users/ChangePassAdminAction", {
        id: accountDetail.value.ID,
        password: password,
        toast,
        closeModalChangePass,
        EndTimeLoading,
      });
    };
    const handleOpenCreateAccount = () => {
      isOpenCreateAccount.value = true;
    };
    const handleCloseCreateAccount = () => {
      isOpenCreateAccount.value = false;
    };
    const ShowDetailUser = (idUser) => {
      router.push(`/page-user/detail/${idUser}`);
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("users/SearchUsersListAction", {
        key: route.params.key,
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const EditUser = () => {
      router.push(`/page-user/edit/${accountDetail.value.ID}`);
    };

    return {
      listGroupUsers,
      listUsers,
      header,
      checkUsers,
      checkedAll,
      listPagination,
      isActive,
      isOpenUpdateRule,
      accountDetail,
      isLoading,
      listDepartments,
      listPositions,
      isOpenCreateAccount,
      isOpenDetail,
      passwordReset,
      RePassword,
      listCount,
      openModalChangePass,
      closeModalChangePass,
      checkedAllItem,
      CheckedBox,
      NextPage,
      PrevPage,
      rightClick,
      handleOpenUpdateRule,
      handleCloseUpdateRule,
      handleBlockAccount,
      ShowDetailUser,
      handleSearch,
      ChangePass,
      EndTimeLoading,
      handleUnlockAccount,
      handleOpenCreateAccount,
      handleCloseCreateAccount,
      EditUser,
    };
  },
};
</script>

<style></style>
