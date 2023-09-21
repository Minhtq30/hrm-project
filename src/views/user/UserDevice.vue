<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="longText uppercase font-medium">danh sách thiết bị</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature> </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div v-if="listUserDevices?.length">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
            :isShow="false"
          >
            <tr
              class="bg-white border-b"
              v-for="user in listUserDevices"
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
          </table-responsive>
        </div>
        <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarUser from "@/components/sidebar/SidebarUser.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import {
  FormatColorDevice,
  FormatDate,
  FormatMessageDevice,
} from "@/constants/FormatAll";
export default {
  components: {
    PersonLayout,
    SidebarUser,
    NavbarSocial,
    NavFeature,
    TableResponsive,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
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
    const isLoading = ref(true);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("users/GetAllUserDevicesAction", { EndTimeLoading });
    const listUserDevices = computed(() => store.state.users.listUserDevices);
    return {
      isLoading,
      EndTimeLoading,
      listUserDevices,
    };
  },
};
</script>

<style></style>
