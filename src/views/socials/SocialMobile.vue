<template>
  <div class="bg-[#f0f2f5]">
    <person-layout>
      <template v-slot:navbar>
        <navbar-social-3></navbar-social-3>
      </template>
      <div class="grid grid-cols-12 gap-x-2">
        <div class="col-span-3">
          <sidebar-social />
        </div>
        <Transition name="slide-fade">
          <div class="col-span-9 w-full h-full">
            <div class="m-4 bg-white rounded-lg">
              <div
                class="flex items-center justify-center p-4 text-2xl font-medium uppercase w-full"
              >
                <span class="text-2xl mr-2"
                  ><i class="fal fa-phone-rotary"></i
                ></span>
                Danh bạ tập đoàn BTP HOLDINGS
                <span class="text-2xl ml-2"
                  ><i class="fal fa-phone-rotary"></i
                ></span>
              </div>
              <div class="w-full">
                <nav-feature>
                  <div class="ml-5 min-w-[300px]">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập tên nhân sự cần tìm"
                      @keydown.enter="SearchMobile($event)"
                    /></div
                ></nav-feature>
                <Transition name="slide-fade">
                  <div
                    class="overflow-auto w-full h-full"
                    v-if="isLoading == false"
                  >
                    <table-responsive :header="header" :isShow="false">
                      <tr
                        v-for="(mobile, index) in listFinal()"
                        :key="mobile.ID"
                        class="border-b"
                      >
                        <td class="cellTable">{{ index + 1 }}</td>
                        <td class="cellTable">{{ mobile.code }}</td>
                        <td class="cellTable">{{ mobile.name }}</td>
                        <td class="cellTable">
                          {{ mobile.department?.title }}
                        </td>
                        <td class="cellTable">{{ mobile.position?.title }}</td>
                        <td class="cellTable">
                          {{ mobile.job_title_current?.title }}
                        </td>
                        <td class="cellTable">{{ mobile.personal_email }}</td>
                        <td class="cellTable">{{ mobile.company_email }}</td>
                        <td class="cellTable">{{ mobile.phone_ext }}</td>
                        <td class="cellTable">
                          {{ FormatMobile(mobile.mobile) }}
                        </td>
                      </tr>
                    </table-responsive>
                  </div>
                </Transition>
                <!-- <div>{{ listFinal() }}</div> -->
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </person-layout>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import { computed, ref } from "vue";
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import { useStore } from "vuex";
import { FormatDate } from "@/constants/FormatAll";
import NavFeature from "@/components/navbar/NavFeature.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
// import { useRoute } from "vue-router";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,

    NavFeature,
    TableResponsive,
  },
  data() {
    return {
      header: [
        "STT",
        "Mã nhân viên",
        "Họ và tên",
        "Phòng ban",
        "Chức vụ",
        "Vị trí",
        "Email cá nhân",
        "Email Cty",
        "Số máy lẻ",
        "Số di động",
      ],
    };
  },

  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    FormatMobile(arr) {
      let final = "";
      if (arr) {
        for (let i = 0; i < arr?.length; i++) {
          final = final + arr[i] + " ,";
        }
        return final.slice(0, -1);
      } else {
        return "";
      }
    },
    listFinal() {
      return this.listMobile.sort((a, b) =>
        a.department?.title.localeCompare(b.department?.title)
      );
    },
  },
  setup() {
    const store = useStore();
    const isLoading = ref(true);
    const date = new Date();
    // const route = useRoute();
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const listMobile = computed(() => store.state.SocialNew.listMobile);
    if (listMobile.value?.length == 0) {
      store.dispatch("SocialNew/GetAllMobileAction", { EndTimeLoading });
    }
    const SearchMobile = (e) => {
      isLoading.value = true;
      store.dispatch("SocialNew/SearchMobileAction", {
        search: e.target.value,
        EndTimeLoading,
      });
    };
    return {
      isLoading,
      date,
      listMobile,
      SearchMobile,
      EndTimeLoading,
    };
  },
};
</script>
<style></style>
