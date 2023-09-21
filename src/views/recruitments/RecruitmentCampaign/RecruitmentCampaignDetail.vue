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
            <p class="text-base">{{ CampaignDetail.title }}</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full flex justify-between items-center w-full">
          <div class="h-full">
            <tab-nav
              :tabs="['Thông tin chung', 'Ứng viên', 'Lịch phỏng vấn']"
              :selected="selected"
              @selected="setSelected"
            >
            </tab-nav>
          </div>
          <div class="flex">
            <div
              class="btn-icon"
              title="Danh sách chiến dịch"
              @click="this.$router.push('/recruitment-campaign/all')"
            >
              <div class="cx">
                <i class="fal fa-house-return"></i>
              </div>
              <div class="action-label">DS chiến dịch</div>
            </div>
            <div class="btn-icon relative group">
              <div class="cx">
                <i class="fal fa-comment-lines"></i>
              </div>
              <div class="action-label">Trạng thái</div>
              <div
                class="text-black text-sm absolute w-48 z-10 bg-white right-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
              >
                <ul>
                  <li
                    class="p-[10px] hover:bg-slate-100 hover:rounded-lg text-left"
                  >
                    Đang thực hiện
                  </li>
                  <li
                    class="p-[10px] hover:bg-slate-100 hover:rounded-lg text-left"
                  >
                    Hoàn thành
                  </li>
                  <li
                    class="p-[10px] hover:bg-slate-100 hover:rounded-lg text-left"
                  >
                    Hủy
                  </li>
                  <li
                    class="p-[10px] hover:bg-slate-100 hover:rounded-lg text-left"
                  >
                    Tạm dừng
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="btn-icon"
              @click="handleOpenExtend()"
              title="Gia hạn thời gian chiến dịch"
            >
              <div class="cx">
                <i class="fal fa-history"></i>
              </div>
              <div class="action-label">Gia hạn</div>
            </div>
            <div
              class="btn-icon"
              title="Tạo lịch phỏng vấn"
              @click="handleOpenInterview()"
            >
              <div class="cx">
                <i class="fal fa-calendar-day"></i>
              </div>
              <div class="action-label">Phỏng vấn</div>
            </div>
            <div class="btn-icon relative group">
              <div class="cx">
                <i class="fal fa-tools"></i>
              </div>
              <div class="action-label">Mở rộng</div>
              <div
                class="text-black text-sm absolute w-48 z-10 bg-white right-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
              >
                <ul>
                  <li
                    class="p-[10px] hover:bg-slate-100 hover:rounded-lg text-left"
                    @click="handleToEditCampaign()"
                  >
                    <i class="fal fa-edit mr-3"></i>Sửa
                  </li>
                  <li
                    class="p-[10px] hover:bg-slate-100 hover:rounded-lg text-left"
                    @click="handleOpenConfirm()"
                  >
                    <i class="fal fa-trash mr-3"></i>Xóa
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition duration="550" name="nested">
      <div class="w-full" v-if="isLoading == false">
        <the-tab :isSelected="selected == 'Thông tin chung'"
          ><div title="Thông tin chiến dịch" class="outer">
            <div class="detail-section-title">Thông tin chiến dịch</div>
            <div class="w-full">
              <table class="w-full">
                <tbody>
                  <tr>
                    <td class="cellTable">Tên chiến dịch</td>
                    <td class="cellTable">
                      {{ CampaignDetail.title }}
                    </td>
                    <td class="cellTable">Số lượng tuyển</td>
                    <td class="cellTable">
                      {{ CampaignDetail.amount_candidate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="cellTable">Chuyển HSNS</td>
                    <td class="cellTable"></td>
                    <td class="cellTable">Trạng thái</td>
                    <td class="cellTable">
                      <div
                        class="beacon"
                        :class="formatColor(CampaignDetail.status)"
                      >
                        {{ formatStatus(CampaignDetail.status) }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="cellTable">Người phụ trách</td>
                    <td class="cellTable">{{ CampaignDetail.manager_ids }}</td>
                    <td class="cellTable">Người theo dõi</td>
                    <td class="cellTable">{{ CampaignDetail.follower_ids }}</td>
                  </tr>
                  <tr>
                    <td class="cellTable">Hạn tuyển</td>
                    <td class="cellTable">
                      {{ formatDate(CampaignDetail.date_start) }} -
                      {{ formatDate(CampaignDetail.date_end) }}
                    </td>
                    <td class="cellTable"></td>
                    <td class="cellTable"></td>
                  </tr>
                  <tr>
                    <td class="cellTable">Mô tả</td>
                    <td colspan="3" class="cellTable">
                      {{ CampaignDetail.desc }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div title="Thông tin vị trí tuyển" class="inner">
            <div class="detail-section-title">Thông tin vị trí tuyển</div>
            <div class="w-full">
              <table class="w-full">
                <tbody>
                  <tr>
                    <td class="cellTable">Vị trí</td>
                    <td class="cellTable">
                      {{ formatPosition(CampaignDetail.position_id) }}
                    </td>
                    <td class="cellTable">Hình thức</td>
                    <td class="cellTable">
                      {{ formatWorkType(CampaignDetail.type_id) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="cellTable">Nơi làm việc</td>
                    <td class="cellTable">
                      {{ formatPlace(CampaignDetail.place) }}
                    </td>
                    <td class="cellTable">Mẫu đánh giá ứng viên</td>
                    <td class="cellTable"></td>
                  </tr>
                  <tr>
                    <td class="cellTable">Mức lương thỏa thuận</td>
                    <td class="cellTable">
                      {{ formatPrice(Number(CampaignDetail.salary_from)) }} -
                      {{ formatPrice(Number(CampaignDetail.salary_to)) }}
                    </td>
                    <td class="cellTable">Số lượng</td>
                    <td class="cellTable">
                      {{ CampaignDetail.amount_candidate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="cellTable">Hạn tuyển</td>
                    <td class="cellTable">
                      {{ formatDate(CampaignDetail.deadline) }}
                    </td>
                    <td class="cellTable"></td>
                    <td class="cellTable"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div title="Yêu cầu ứng viên" class="inner">
            <div class="detail-section-title">Yêu cầu ứng viên</div>
            <div class="w-full">
              <table class="w-full">
                <tbody>
                  <tr>
                    <td class="cellTable">Trình độ</td>
                    <td class="cellTable">
                      {{ formatAcademic(CampaignDetail.degree_id) }}
                    </td>
                    <td class="cellTable">Chuyên ngành</td>
                    <td class="cellTable">
                      {{ CampaignDetail.specialization }}
                    </td>
                  </tr>
                  <tr>
                    <td class="cellTable">Kinh nghiệm</td>
                    <td class="cellTable">
                      {{ formatExp(CampaignDetail.experience) }}
                    </td>
                    <td class="cellTable">Ngoại ngữ</td>
                    <td class="cellTable">{{ CampaignDetail.language }}</td>
                  </tr>
                  <tr>
                    <td class="cellTable">Giới tính</td>
                    <td class="cellTable">
                      {{ formatGender(CampaignDetail.gender) }}
                    </td>
                    <td class="cellTable">Độ tuổi</td>
                    <td class="cellTable">{{ formatAge(CampaignDetail) }}</td>
                  </tr>
                  <tr>
                    <td class="cellTable">Chiều cao</td>
                    <td class="cellTable">
                      {{ formatHeight(CampaignDetail) }}
                    </td>
                    <td class="cellTable">Cân nặng</td>
                    <td class="cellTable">
                      {{ formatWeight(CampaignDetail) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div title="Thảo luận" class="outer">
            <div class="detail-section-title">Thảo luận</div>
            <write-comment></write-comment>
          </div>
        </the-tab>
        <the-tab :isSelected="selected == 'Ứng viên'">
          <div class="p-4 text-left">Không tìm thấy kết quả</div>
        </the-tab>
        <the-tab :isSelected="selected == 'Lịch phỏng vấn'">
          <div class="p-4 text-left">Không tìm thấy kết quả</div>
        </the-tab>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <!-- Start Gia hạn thời gian -->
    <modal-view :isOpen="isOpenExtend" :handleCloseDetail="handleCloseExtend">
      <extend-date
        :CampaignDetail="CampaignDetail"
        :CloseExtend="handleCloseExtend"
      ></extend-date>
    </modal-view>
    <!-- End Gia hạn thời gian  -->
    <!-- Start Phỏng vấn -->
    <modal-view
      :isOpen="isOpenInterview"
      :handleCloseDetail="handleCloseInterview"
    >
      <interview-date-vue
        :InterviewDetail="CampaignDetail"
        :closeInterview="handleCloseInterview"
      ></interview-date-vue>
    </modal-view>
    <!-- End Phỏng vấn -->
    <!-- Start Xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteRecruitmentCampaign"
    >
    </modal-delete>
    <!-- End Xác nhận xóa -->
  </teleport>

  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import WriteComment from "@/components/constant/WriteComment.vue";
import InterviewDateVue from "./InterviewDate.vue";
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import ExtendDate from "./ExtendDate.vue";
import { ref } from "@vue/reactivity";
import { FormatDate, FormatPrice, FormatTitle } from "@/constants/FormatAll";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    NavFeature,
    ButttonCreateRecruitment,
    TabNav,
    TheTab,
    WriteComment,
    ExtendDate,
    InterviewDateVue,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
    formatAge(obj) {
      if (obj.age_from && obj.age_to) {
        return "Từ " + obj.age_from + " đến " + obj.age_to + " tuổi";
      } else {
        return "Không yêu cầu";
      }
    },
    formatHeight(obj) {
      if (obj.height && obj.height_to) {
        return "Từ " + obj.height + " đến " + obj.height_to + " cm";
      } else {
        return "Không yêu cầu";
      }
    },
    formatWeight(obj) {
      if (obj.weight && obj.weight_to) {
        return "Từ " + obj.weight + " đến " + obj.weight_to + " kg";
      } else {
        return "Không yêu cầu";
      }
    },
    formatGender(stt) {
      if (stt) {
        if (stt == 0) {
          return "Nữ";
        } else if (stt == 1) {
          return "Nam";
        } else {
          return "Không yêu cầu";
        }
      } else {
        return "Không yêu cầu";
      }
    },
    formatPlace(arr) {
      for (let i = 0; i < arr?.length; i++) {
        return FormatTitle(arr[i], this.listCity) + ", ";
      }
    },
    formatAcademic(id) {
      return FormatTitle(id, this.listAcademic);
    },
    formatWorkType(id) {
      return FormatTitle(id, this.listWorkTypes);
    },
    formatPosition(id) {
      return FormatTitle(id, this.listPositions);
    },
    formatStatus(index) {
      if (index == 1) {
        return "Lên kế hoạch";
      } else if (index == 2) {
        return "Tạm dừng";
      } else if (index == 3) {
        return "Quá hạn";
      }
    },
    formatColor(index) {
      if (index == 1) {
        return "beacon-warning";
      } else if (index == 2) {
        return "beacon-pause";
      } else if (index == 3) {
        return "beacon-wait";
      } else {
        return "";
      }
    },
    formatExp(id) {
      if (id) {
        const key = this.dataExpRecruitment.find((item) => item.value == id);
        return key.title;
      } else {
        return "";
      }
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(true);
    const selected = ref("Thông tin chung");
    const isOpenExtend = ref(false);
    const isOpenInterview = ref(false);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("recruitmentCampaign/ShowDetailRecruitmentCampaignAction", {
      id: route.params.idCampaign,
      EndTimeLoading,
    });
    store.dispatch("places/getAllCityAction");
    store.dispatch("workTypes/GetAllWorkTypeAction", 50);
    store.dispatch("academics/GetAllAcademicsAction");
    store.dispatch("positions/getAllPositionsAction", 500);
    const CampaignDetail = computed(
      () => store.state.recruitmentCampaign.CampaignDetail
    );
    const listCity = computed(() => store.state.places.listCity);
    const listWorkTypes = computed(
      () => store.getters["workTypes/GetAllWorkTypeActive"]
    );
    const listAcademic = computed(() => store.state.academics.listAcademic);
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const dataExpRecruitment = computed(
      () => store.state.constant.dataExpRecruitment
    );
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const handleOpenExtend = () => {
      isOpenExtend.value = true;
    };
    const handleCloseExtend = () => {
      isOpenExtend.value = false;
    };
    const handleToEditCampaign = () => {
      router.push(`/recruitment-campaign/edit/${route.params.idCampaign}`);
    };
    const handleOpenInterview = () => {
      isOpenInterview.value = true;
    };
    const handleCloseInterview = () => {
      isOpenInterview.value = false;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const DeleteRecruitmentCampaign = () => {
      store.dispatch("recruitmentCampaign/DeleteRecruitmentCampaignAction", {
        data: route.params.idCampaign,
        route,
        router,
        toast,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    return {
      isLoading,
      CampaignDetail,
      selected,
      listCity,
      listWorkTypes,
      listAcademic,
      listPositions,
      isOpenExtend,
      dataExpRecruitment,
      isOpenInterview,
      isOpenConfirm,
      setSelected,
      EndTimeLoading,
      handleOpenExtend,
      handleCloseExtend,
      handleToEditCampaign,
      handleOpenInterview,
      handleCloseInterview,
      handleOpenConfirm,
      handleCloseConfirm,
      DeleteRecruitmentCampaign,
    };
  },
};
</script>

<style></style>
