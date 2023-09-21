<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="longText uppercase font-medium">
              {{ userProfile.fullname }}
            </p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full">
          <tab-nav
            :tabs="['Thông tin chung', 'Thông tin quyền']"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div title="Thông tin chung">
          <Transition name="slide-fade">
            <the-tab :isSelected="selected === 'Thông tin chung'">
              <div class="detail-section-title mt-2">Thông tin chung</div>
              <div class="">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable">Tài khoản</td>
                      <td
                        class="cellTable font-medium"
                        style="color: var(--color-primary)"
                      >
                        {{ userProfile.username }}
                      </td>
                      <td class="cellTable">Mã NS</td>
                      <td class="cellTable">{{ userProfile.code }}</td>
                    </tr>
                    <tr>
                      <td class="cellTable">Họ và tên</td>
                      <td class="cellTable">{{ userProfile.fullname }}</td>
                      <td class="cellTable">Phòng ban</td>
                      <td class="cellTable">
                        {{ userProfile?.department?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Email cá nhân</td>
                      <td class="cellTable">
                        {{ userProfile.personal_email }}
                      </td>
                      <td class="cellTable">Email cty</td>
                      <td class="cellTable">
                        {{ userProfile.company_email }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Vị trí</td>
                      <td class="cellTable">
                        {{ userProfile?.position?.title }}
                      </td>
                      <td class="cellTable">Chức vụ</td>
                      <td class="cellTable">
                        {{ userProfile?.job_title_current?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Số điện thoại</td>
                      <td class="cellTable">
                        {{ userProfile?.personnels?.mobile[0] }}
                      </td>
                      <td class="cellTable">Ngày sinh</td>
                      <td class="cellTable">
                        {{ formatDate(userProfile.birthday) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </the-tab>
          </Transition>
        </div>
        <div title="Thông tin quyền">
          <Transition name="slide-fade">
            <the-tab :isSelected="selected === 'Thông tin quyền'">
              <div class="p-4 text-left">
                <div v-for="(role, index) in AccountRole" :key="index">
                  {{ role }}
                </div>
              </div>
            </the-tab>
          </Transition>
        </div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarUser from "@/components/sidebar/SidebarUser.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
import { FormatDate } from "@/constants/FormatAll";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    TabNav,
    PersonLayout,
    SidebarUser,
    NavbarSocial,
    NavFeature,
    TheTab,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const selected = ref("Thông tin chung");
    const isLoading = ref(true);
    const profile = useUserProfile();
    const { userProfile, AccountRole } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
    const setSelected = (tab) => {
      selected.value = tab;
    };
    return {
      selected,
      isLoading,
      setSelected,
      EndTimeLoading,
      userProfile,
      AccountRole,
    };
  },
};
</script>

<style></style>
