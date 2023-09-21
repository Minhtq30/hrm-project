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
            <p class="longText" v-if="isLoading == false">
              {{ CandidateDetail.name }}
            </p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full flex justify-between items-center w-full">
          <div></div>
          <div class="flex">
            <div
              class="btn-icon"
              title="Danh sách ứng viên"
              @click="this.$router.push('/candidate-profile/all')"
            >
              <div class="cx">
                <i class="fal fa-house-return"></i>
              </div>
              <div class="action-label">DS ứng viên</div>
            </div>
            <div class="btn-icon" title="Chuyển trạng thái">
              <div class="cx">
                <i class="fal fa-sync"></i>
              </div>
              <div class="action-label">Trạng thái</div>
            </div>
            <div class="btn-icon" title="Chuyển chiến dịch">
              <div class="cx">
                <i class="fal fa-external-link"></i>
              </div>
              <div class="action-label">Chuyển CD</div>
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
                    @click="handleEditProfile()"
                    title="Sửa"
                  >
                    <i class="fal fa-edit mr-3"></i>Sửa
                  </li>
                  <li
                    class="p-[10px] hover:bg-slate-100 hover:rounded-lg text-left"
                    @click="handleOpenConfirm()"
                    title="Xóa"
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
    <div class="w-full" v-if="isLoading == false">
      <div title="Thông tin chung" class="outer">
        <div class="detail-section-title">Thông tin chung</div>
        <div class="grid grid-cols-12">
          <div class="col-span-2">
            <img
              class="p-2 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCcJ3fJYkYAD9Mu1_-HdQtpAJFdYDPvvZTw&usqp=CAU"
              alt=""
            />
          </div>
          <div class="col-span-10">
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="cellTable">Họ và tên</td>
                  <td class="cellTable">
                    {{ CandidateDetail.name }}
                  </td>
                  <td class="cellTable">Mã ứng viên</td>
                  <td class="cellTable">
                    {{ CandidateDetail.code }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Ngày sinh</td>
                  <td class="cellTable">
                    {{ formatDate(CandidateDetail.birthday) }}
                  </td>
                  <td class="cellTable">Giới tính</td>
                  <td class="cellTable">
                    {{ formatGender(CandidateDetail.gender) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Tình trạng hôn nhân</td>
                  <td class="cellTable">
                    {{ formatMarital(CandidateDetail.marital_status) }}
                  </td>
                  <td class="cellTable">Quốc tịch</td>
                  <td class="cellTable">Việt Nam</td>
                </tr>
                <tr>
                  <td class="cellTable">Điện thoại</td>
                  <td class="cellTable">
                    {{ formatPhone(CandidateDetail.phone) }}
                  </td>
                  <td class="cellTable">Email</td>
                  <td class="cellTable">
                    {{ formatEmail(CandidateDetail.email) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Dân tộc</td>
                  <td class="cellTable">
                    {{ formatEthnic(CandidateDetail.people) }}
                  </td>
                  <td class="cellTable">Tôn giáo</td>
                  <td class="cellTable">
                    {{ formatReligion(CandidateDetail.religious) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Ghi chú</td>
                  <td class="cellTable" colspan="3">
                    {{ CandidateDetail.desc_note }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div title="Thông tin khác" class="outer">
        <div class="detail-section-title">Thông tin khác</div>
        <div class="w-full">
          <table class="w-full">
            <tbody>
              <tr>
                <td class="cellTable">Chiến dịch</td>
                <td class="cellTable">
                  {{ CandidateDetail.campaign_current_id }}
                </td>
                <td class="cellTable">Người phụ trách</td>
                <td class="cellTable"></td>
              </tr>
              <tr>
                <td class="cellTable">Ngày nộp hồ sơ</td>
                <td class="cellTable">
                  {{ formatDate(CandidateDetail.submissionDate) }}
                </td>
                <td class="cellTable">Mức lương mong muốn</td>
                <td class="cellTable"></td>
              </tr>
              <tr>
                <td class="cellTable">CMT/Căn cước/Hộ chiếu</td>
                <td class="cellTable">{{ CandidateDetail.private_code }}</td>
                <td class="cellTable">Ngày cấp</td>
                <td class="cellTable">
                  {{ formatDate(CandidateDetail.private_code_date) }}
                </td>
              </tr>
              <tr>
                <td class="cellTable">Nơi sinh</td>
                <td class="cellTable">{{ CandidateDetail.placeOfBirth }}</td>
                <td class="cellTable">Địa chỉ</td>
                <td class="cellTable">{{ CandidateDetail.address }}</td>
              </tr>
              <tr>
                <td class="cellTable">Nguồn</td>
                <td class="cellTable">Facebook</td>
                <td class="cellTable">Người giới thiệu</td>
                <td class="cellTable"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div title="Thông tin gia đình" class="outer text-left">
        <div class="detail-section-title">Thông tin gia đình</div>
        <div v-if="CandidateDetail.json_family?.length"></div>
        <div class="p-2" v-else>Không tìm thấy kết quả</div>
      </div>
      <div title="Trình độ học vấn" class="outer text-left">
        <div class="detail-section-title">Trình độ học vấn</div>
        <div v-if="CandidateDetail.json_study?.length"></div>
        <div class="p-2" v-else>Không tìm thấy kết quả</div>
      </div>
      <div title="Kinh nghiệm làm việc" class="outer text-left">
        <div class="detail-section-title">Kinh nghiệm làm việc</div>
        <div v-if="CandidateDetail.json_process?.length"></div>
        <div class="p-2" v-else>Không tìm thấy kết quả</div>
      </div>
      <div title="Thảo luận" class="outer">
        <div class="detail-section-title">Thảo luận</div>
        <write-comment></write-comment>
      </div>
    </div>
  </person-layout>
  <teleport to="#app">
    <!-- Start Xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="DeleteRecruitmentCandidate"
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
import { ref } from "@vue/reactivity";
import { FormatDate, FormatTitle } from "@/constants/FormatAll";
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
    WriteComment,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatGender(stt) {
      if (stt == 0) {
        return "Nữ";
      } else if (stt == 1) {
        return "Nam";
      } else {
        return "Khác";
      }
    },
    formatMarital(stt) {
      if (stt == 4) {
        return "Độc thân";
      } else if (stt == 5) {
        return "Kết hôn";
      } else {
        return "Ly hôn";
      }
    },
    formatPhone(arr) {
      for (let i = 0; i < arr?.length; i++) {
        return arr[i] + ", ";
      }
    },
    formatEmail(arr) {
      for (let i = 0; i < arr?.length; i++) {
        return arr[i] + ", ";
      }
    },
    formatEthnic(id) {
      return FormatTitle(id, this.listEthnics);
    },
    formatReligion(id) {
      return FormatTitle(id, this.listReligions);
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(true);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("ethnics/GetAllEthnicsAction");
    store.dispatch("ethnics/GetAllReligionAction");
    store.dispatch(
      "recruitmentCandidate/ShowDetailRecruitmentCandidateAction",
      {
        id: route.params.idCandidate,
        EndTimeLoading,
      }
    );
    const CandidateDetail = computed(
      () => store.state.recruitmentCandidate.CandidateDetail
    );
    const listEthnics = computed(() => store.state.ethnics.listEthnics);
    const listReligions = computed(() => store.state.ethnics.listReligions);
    const handleEditProfile = () => {
      router.push(`/recruitment-candidate/edit/${route.params.idCandidate}`);
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const DeleteRecruitmentCandidate = () => {
      store.dispatch("recruitmentCandidate/DeleteRecruitmentCandidateAction", {
        id: route.params.idCandidate,
        toast,
        route,
        router,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    return {
      isLoading,
      CandidateDetail,
      listEthnics,
      listReligions,
      isOpenConfirm,
      EndTimeLoading,
      handleEditProfile,
      handleOpenConfirm,
      handleCloseConfirm,
      DeleteRecruitmentCandidate,
    };
  },
};
</script>

<style></style>
