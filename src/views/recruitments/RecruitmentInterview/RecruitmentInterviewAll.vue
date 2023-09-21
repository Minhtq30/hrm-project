<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-recruitment></sidebar-recruitment>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <buttton-create-recruitment></buttton-create-recruitment>
            <div class="longText">Danh sách lịch phỏng vấn</div>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full flex justify-between items-center w-full">
          <div></div>
          <div class="flex">
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-file-import"></i>
              </div>
              <div class="action-label">Import</div>
            </div>
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-file-export"></i>
              </div>
              <div class="action-label">Export</div>
            </div>
            <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-cog"></i>
              </div>
              <div class="action-label">Cài đặt</div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
          v-if="listRecruitmentInterview?.length"
        >
          <tr
            class="bg-white border-b"
            v-for="interview in listRecruitmentInterview"
            :key="interview.ID"
            @contextmenu.prevent="rightClick($event, interview)"
            :class="{
              isCheck: CheckedBox(interview.ID),
            }"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkInterviews"
                  :value="interview.ID"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable"></td>
            <td
              class="cellTable cursor-pointer"
              @click="showDetailInterview(interview.ID)"
            >
              {{ interview.title }}
            </td>
            <td class="cellTable text-center">
              {{ interview.time_start }} - {{ interview.time_end }}
            </td>
            <td class="cellTable">{{ formatDate(interview.interviewDate) }}</td>
            <td class="cellTable">
              {{ interview.recruitmentCampaign?.title }}
            </td>
            <td class="cellTable text-center">{{ interview.candidate }}</td>
            <td class="cellTable"></td>
            <td class="cellTable">{{ formatDate(interview.date_created) }}</td>
          </tr>
        </table-responsive>
        <div class="text-left p-4" v-else>Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { FormatDate } from "@/constants/FormatAll";
import { useRouter } from "vue-router";
export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    NavFeature,
    ButttonCreateRecruitment,
    TableResponsive,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Tên lịch phỏng vấn",
        "Thời gian",
        "Ngày phỏng vấn",
        "Chiến dịch tuyển dụng",
        "Ứng viên",
        "Người phỏng vấn",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const checkedAll = ref(false);
    const checkInterviews = ref([]);
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const listRecruitmentInterview = computed(
      () => store.state.recruitmentInterview.listRecruitmentInterview
    );
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listRecruitmentInterview.value) {
          checkInterviews.value.push(listRecruitmentInterview.value[item].ID);
        }
      } else {
        checkedAll.value = false;
        checkInterviews.value.splice(0, checkInterviews.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkInterviews.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const showDetailInterview = (id) => {
      router.push(`/recruitment-interview/detail/${id}`);
    };
    return {
      isLoading,
      checkedAll,
      checkInterviews,
      listRecruitmentInterview,
      checkedAllItem,
      CheckedBox,
      showDetailInterview,
    };
  },
};
</script>

<style></style>
