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
            <div class="text-base">{{ InterviewDetail.title }}</div>
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
    <div class="w-full">
      <div title="Thông tin chung" class="outer">
        <div class="bg-slate-100 text-left mt-2">
          <h3 class="font-medium p-3">Thông tin chung</h3>
        </div>
        <div class="w-full">
          <table class="w-full">
            <tbody>
              <tr>
                <td class="cellTable">Tên lịch phỏng vấn</td>
                <td class="cellTable">
                  {{ InterviewDetail.title }}
                </td>
                <td class="cellTable">Chiến dịch tuyển dụng</td>
                <td class="cellTable">
                  {{ InterviewDetail.recruitmentCampaign?.title }}
                </td>
              </tr>
              <tr>
                <td class="cellTable">Ứng viên</td>
                <td class="cellTable">{{ InterviewDetail.candidate }}</td>
                <td class="cellTable">Thời gian</td>
                <td class="cellTable">
                  {{ InterviewDetail.time_start }} -
                  {{ InterviewDetail.time_end }},
                  {{ formatDate(InterviewDetail.interviewDate) }}
                </td>
              </tr>
              <tr>
                <td class="cellTable">Người phỏng vấn</td>
                <td class="cellTable"></td>
                <td class="cellTable"></td>
                <td class="cellTable"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div title="Danh sách ứng viên" class="outer">
        <div class="bg-slate-100 text-left mt-2">
          <h3 class="font-medium p-3">Danh sách ứng viên</h3>
        </div>
        <div class="w-full">
          <table-responsive
            :header="header"
            :checkAll="checkedAllItem"
            :isCheck="checkedAll"
          >
            <!-- <tr
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
              <td class="cellTable">
                {{ formatDate(interview.interviewDate) }}
              </td>
              <td class="cellTable">
                {{ interview.recruitmentCampaign?.title }}
              </td>
              <td class="cellTable text-center">{{ interview.candidate }}</td>
              <td class="cellTable"></td>
              <td class="cellTable">
                {{ formatDate(interview.date_created) }}
              </td>
            </tr> -->
          </table-responsive>
        </div>
      </div>
    </div>
  </person-layout>
  <loading-page
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="true"
  >
  </loading-page>
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
import { useRoute } from "vue-router";
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
        "Ảnh",
        "Mã UV",
        "Họ và tên",
        "Thời gian",
        "Trạng thái",
        "Đánh giá",
        "Điện thoại",
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
    const route = useRoute();
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    store.dispatch(
      "recruitmentInterview/ShowDetailInterviewAction",
      route.params.idInterview
    );
    const InterviewDetail = computed(
      () => store.state.recruitmentInterview.InterviewDetail
    );
    return {
      isLoading,
      InterviewDetail,
    };
  },
};
</script>

<style></style>
