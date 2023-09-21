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
            <p class="text-base">{{ RequestDetail.title }}</p>
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
              title="Danh sách kế hoạch tuyển dụng"
              @click="this.$router.push('/recruitment-request/all')"
            >
              <div class="cx">
                <i class="fal fa-house-return"></i>
              </div>
              <div class="action-label">DS kế hoạch</div>
            </div>
            <div class="btn-icon" title="Duyệt">
              <div class="cx">
                <i class="fal fa-check"></i>
              </div>
              <div class="action-label">Duyệt</div>
            </div>
            <div class="btn-icon" title="Hoàn duyệt">
              <div class="cx">
                <i class="fal fa-undo"></i>
              </div>
              <div class="action-label">Hoàn duyệt</div>
            </div>
            <div class="btn-icon" title="Không duyệt">
              <div class="cx">
                <i class="fal fa-ban"></i>
              </div>
              <div class="action-label">Không duyệt</div>
            </div>
            <div
              class="btn-icon"
              @click="handleOpenExtend()"
              title="Gia hạn thời gian chiến dịch"
            >
              <div class="cx">
                <i class="fal fa-stopwatch"></i>
              </div>
              <div class="action-label">Gia hạn</div>
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
                    @click="handleEditRecruitmentRequest()"
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
    <Transition duration="550" name="nested">
      <div class="w-full" v-if="isLoading == false">
        <div title="Thông tin chung" class="outer">
          <div class="detail-section-title">Thông tin chung</div>
          <div class="w-full">
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="cellTable">Tên đề xuất</td>
                  <td class="cellTable">
                    {{ RequestDetail.title }}
                  </td>
                  <td class="cellTable">Vị trí</td>
                  <td class="cellTable">
                    {{ formatPosition(RequestDetail.position_id) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Phòng ban</td>
                  <td class="cellTable">
                    {{ formatDepartment(RequestDetail.department_id) }}
                  </td>
                  <td class="cellTable">Nơi làm việc</td>
                  <td class="cellTable">
                    {{ formatPlace(RequestDetail.place) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Hình thức</td>
                  <td class="cellTable">
                    {{ formatWorkType(RequestDetail.type_id) }}
                  </td>
                  <td class="cellTable">Ứng tuyển</td>
                  <td class="cellTable"></td>
                </tr>
                <tr>
                  <td class="cellTable">Trúng tuyển</td>
                  <td class="cellTable"></td>
                  <td class="cellTable">Mức lương</td>
                  <td class="cellTable">Thỏa thuận</td>
                </tr>
                <tr>
                  <td class="cellTable">Số lượng</td>
                  <td class="cellTable"></td>
                  <td class="cellTable">Hạn tuyển</td>
                  <td class="cellTable">
                    {{ formatDate(RequestDetail.date_start) }} -
                    {{ formatDate(RequestDetail.deadline) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Trạng thái</td>
                  <td class="cellTable"></td>
                  <td class="cellTable">Lý do tuyển</td>
                  <td class="cellTable">
                    {{ formatReason(RequestDetail.desc_reason) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Mô tả công việc</td>
                  <td colspan="3" class="cellTable">
                    {{ RequestDetail.desc }}
                  </td>
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
                    {{ formatDegree(RequestDetail.degree_id) }}
                  </td>
                  <td class="cellTable">Chuyên ngành</td>
                  <td class="cellTable">{{ RequestDetail.specialization }}</td>
                </tr>
                <tr>
                  <td class="cellTable">Kinh nghiệm</td>
                  <td class="cellTable">
                    {{ formatExp(RequestDetail.experience) }}
                  </td>
                  <td class="cellTable">Ngoại ngữ</td>
                  <td class="cellTable"></td>
                </tr>
                <tr>
                  <td class="cellTable">Giới tính</td>
                  <td class="cellTable">
                    {{ formatGender(RequestDetail.gender) }}
                  </td>
                  <td class="cellTable">Độ tuổi</td>
                  <td class="cellTable">
                    {{
                      formatAge(RequestDetail.age_from, RequestDetail.age_to)
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Chiều cao</td>
                  <td class="cellTable">
                    {{
                      formatHeight(
                        RequestDetail.height,
                        RequestDetail.height_to
                      )
                    }}
                  </td>
                  <td class="cellTable">Cân nặng</td>
                  <td class="cellTable">
                    {{
                      formatWeight(
                        RequestDetail.weight,
                        RequestDetail.weight_to
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div title="Thảo luận" class="inner">
          <div class="detail-section-title">Thảo luận</div>
          <write-comment></write-comment>
        </div>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <!-- Start gia hạn -->
    <modal-view :isOpen="isOpenExtend" :handleCloseDetail="handleCloseExtend">
      <extend-date-request
        :RequestDetail="RequestDetail"
        :CloseExtend="handleCloseExtend"
      ></extend-date-request>
    </modal-view>
    <!-- End gia hạn -->
    <!-- Start Xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="handleDeleteRecruitmentRequest"
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
import ExtendDateRequest from "./ExtendDateRequest.vue";
import { ref } from "@vue/reactivity";
import { FormatDate, FormatTitle } from "@/constants/FormatAll";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    NavFeature,
    ButttonCreateRecruitment,
    WriteComment,
    ExtendDateRequest,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Tên đề xuất",
        "Vị trí",
        "Số lượng",
        "Ứng tuyển",
        "Trúng tuyển",
        "Còn tuyển",
        "Hạn tuyển",
        "Trạng thái",
      ],
      dataTypeRequest: [
        {
          value: "0",
          title: "Thay thế",
        },
        {
          value: "1",
          title: "Bổ sung theo kế hoạch",
        },
        {
          value: "2",
          title: "Bổ sung ngoài kế hoạch",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    formatGender(index) {
      if (index == 0) {
        return "Nữ";
      } else if (index == 1) {
        return "Nam";
      } else {
        return "Không yêu cầu";
      }
    },
    formatAge(first, last) {
      if (first == null || last == null) {
        return "Không yêu cầu";
      } else {
        return "Từ " + first + " tuổi đến " + last + " tuổi";
      }
    },
    formatHeight(first, last) {
      if (first == null || last == null) {
        return "Không yêu cầu";
      } else {
        return "Từ " + first + " đến " + last;
      }
    },
    formatWeight(first, last) {
      if (first == null || last == null) {
        return "Không yêu cầu";
      } else {
        return "Từ " + first + " đến " + last;
      }
    },
    formatExp(index) {
      if (index == 0) {
        return "Chưa có kinh nghiệm";
      } else if (index == 1) {
        return "Dưới 1 năm";
      } else if (index == 2) {
        return "1 năm kinh nghiệm";
      } else if (index == 3) {
        return "2 năm kinh nghiệm";
      } else if (index == 4) {
        return "3 năm kinh nghiệm";
      } else if (index == 5) {
        return "4 năm kinh nghiệm";
      } else if (index == 6) {
        return "5 năm kinh nghiệm";
      } else if (index == 7) {
        return "Trên 5 năm kinh nghiệm";
      }
    },
    formatPosition(id) {
      return FormatTitle(id, this.listPositions);
    },
    formatDepartment(id) {
      return FormatTitle(id, this.listDepartments);
    },
    formatPlace(id) {
      return FormatTitle(id, this.listCity);
    },
    formatWorkType(id) {
      return FormatTitle(id, this.listWorkTypes);
    },
    formatReason(id) {
      const key = this.dataTypeRequest.find((item) => item.value == id);
      return key.title;
    },
    formatDegree(id) {
      return FormatTitle(id, this.listAcademic);
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(true);
    const isOpenExtend = ref(false);
    const isOpenConfirm = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("recruitmentRequest/ShowDetailRecruitmentRequestAction", {
      id: route.params.idRequest,
      EndTimeLoading: EndTimeLoading,
    });
    const listCity = computed(() => store.state.places.listCity);
    // const TypeTraining = computed(() => store.state.personnels.TypeTraining);
    const listAcademic = computed(() => store.state.academics.listAcademic);
    const listPositions = computed(
      () => store.getters["positions/getAllPositionsActive"]
    );
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    const listWorkTypes = computed(
      () => store.getters["workTypes/GetAllWorkTypeActive"]
    );
    if (listCity.value?.length == 0) {
      store.dispatch("places/getAllCityAction");
    }
    if (listDepartments.value?.length == 0) {
      store.dispatch("departments/getAllDepartmentsAction");
    }
    if (listPositions.value?.length == 0) {
      store.dispatch("positions/getAllPositionsAction", 500);
    }
    if (listAcademic.value?.length == 0) {
      store.dispatch("academics/GetAllAcademicsAction");
    }
    store.dispatch("workTypes/GetAllWorkTypeAction", 50);
    const RequestDetail = computed(
      () => store.state.recruitmentRequest.RequestDetail
    );
    const handleEditRecruitmentRequest = () => {
      router.push(`/recruitment-request/edit/${route.params.idRequest}`);
    };
    const handleOpenExtend = () => {
      isOpenExtend.value = true;
    };
    const handleCloseExtend = () => {
      isOpenExtend.value = false;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleDeleteRecruitmentRequest = () => {
      store.dispatch("recruitmentRequest/DeleteRecruitmentRequestAction", {
        id: route.params.idRequest,
        route,
        router,
        toast,
        EndTimeLoading,
        handleCloseConfirm,
      });
    };
    return {
      isLoading,
      RequestDetail,
      listCity,
      listAcademic,
      listPositions,
      listDepartments,
      listWorkTypes,
      isOpenExtend,
      isOpenConfirm,
      EndTimeLoading,
      handleDeleteRecruitmentRequest,
      handleEditRecruitmentRequest,
      handleOpenExtend,
      handleCloseExtend,
      handleOpenConfirm,
      handleCloseConfirm,
    };
  },
};
</script>

<style></style>
