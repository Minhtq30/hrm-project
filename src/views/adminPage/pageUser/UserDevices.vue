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
            <div class="longText">Danh sách xác thực thiết bị</div>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <div>
        <navbar-user></navbar-user>
      </div>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listDevices?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <template v-if="this.$route.params.key != 'INACTIVE'">
              <tr
                class="bg-white border-b"
                v-for="user in listDevices"
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
                <td class="cellTable cursor-pointer">
                  {{ user.username }}
                </td>

                <td class="cellTable cursor-pointer">
                  {{ user.fullname }}
                </td>
                <td class="cellTable">{{ user.device }}</td>
                <td class="cellTable cursor-pointer">
                  {{ user.status }}
                </td>
                <td class="cellTable">
                  <div
                    class="beacon"
                    :class="formatColorStatus(user.request_status)"
                  >
                    {{ formatMessageStatus(user.request_status) }}
                  </div>
                </td>
                <td class="cellTable w-[100px] whitespace-normal">
                  {{ user.ip }}
                </td>
                <td class="cellTable">{{ formatDate(user.request_time) }}</td>
                <td class="cellTable">{{ formatDate(user.request_time) }}</td>
              </tr>
            </template>
          </table-responsive>
        </div>
        <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listDevices?.length"
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
      <li @click.prevent="ConfirmDevice()">
        <i class="fal fa-user-check"></i><a href="#">Xác thực</a>
      </li>
      <li @click.prevent="UnconfirmDevice()">
        <i class="fal fa-user-slash"></i><a href="#">Không xác thực</a>
      </li>
    </ul>
  </context-menu>
  <teleport to="#app"></teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingShow"
    :handleEndLoading="EndTimeLoadingShow"
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
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import {
  FormatColorDevice,
  FormatDate,
  FormatMessageDevice,
  FormatModalX,
  FormatModalY,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarHome,
    NavbarSocial,
    NavbarUser,
    TableResponsive,
    ButtonCreateAdmin,
    SearchView,
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
    formatColorStatus(stt) {
      return FormatColorDevice(stt);
    },
    formatMessageStatus(stt) {
      return FormatMessageDevice(stt);
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isActive = ref(false);
    const checkedAll = ref(false);
    const checkUsers = ref([]);
    const isOpenUpdateRule = ref(false);
    const deviceDetail = ref();
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const header = ref();
    const isOpenCreateAccount = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = false;
    };
    header.value = [
      "Tài khoản",
      "Tên nhân sự",
      "Thiết bị",
      "Trạng thái",
      "Tình trạng",
      "IP",
      "Truy cập",
      "Đăng xuất",
    ];
    store.dispatch("users/GetAllDevicesAction", {
      EndTimeLoading,
    });
    watch(route, (to) => {
      isLoading.value = true;
      if (to.path == `/user-devices/type=DEVICES`) {
        store.dispatch("users/GetAllDevicesAction", {
          EndTimeLoading,
        });
      }
    });
    const listDevices = computed(() => store.state.users.listDevices);
    const listPagination = computed(
      () => store.state.users.listPaginationDevices
    );
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listDevices.value) {
          checkUsers.value.push(listDevices.value[item].ID);
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
        deviceDetail.value = user;
      }
    };
    const ShowDetailUser = (idUser) => {
      router.push(`/page-user/detail/${idUser}`);
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      store.dispatch("users/SearchDevicesListAction", {
        key: route.params.key,
        search: dataSearch.wordSearch,
        EndTimeLoading,
      });
    };
    const ConfirmDevice = () => {
      isLoadingShow.value = true;
      store.dispatch("users/ConfirmDeviceInListAction", {
        id: deviceDetail.value.ID,
        toast,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    const UnconfirmDevice = () => {
      isLoadingShow.value = true;
      store.dispatch("users/UnconfirmDeviceInListAction", {
        id: deviceDetail.value.ID,
        toast,
        EndTimeLoading: EndTimeLoadingShow,
      });
    };
    return {
      listDevices,
      header,
      checkUsers,
      checkedAll,
      listPagination,
      isActive,
      isOpenUpdateRule,
      deviceDetail,
      isLoading,
      isLoadingShow,
      isOpenCreateAccount,
      checkedAllItem,
      CheckedBox,
      NextPage,
      PrevPage,
      rightClick,
      ShowDetailUser,
      handleSearch,
      EndTimeLoading,
      EndTimeLoadingShow,
      ConfirmDevice,
      UnconfirmDevice,
    };
  },
};
</script>

<style></style>
