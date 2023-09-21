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
            <p class="longText">Cập nhật đề xuất tuyển dụng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="w-full h-full text-left px-4 form-plus-over format-scroll"
        v-if="isLoading == false"
      >
        <div title="Thông tin chung" class="mt-2 outer">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isInfor = !isInfor"
          >
            <span v-show="isInfor == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isInfor == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Thông tin chung
          </h4>
          <Transition name="slide-up">
            <div v-show="isInfor == true">
              <div class="form-small">
                <label for="" class="form-group-label">Tên đề xuất</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập tên đề xuất"
                    v-model="RequestDetail.title"
                  />
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Lý do tuyển</label>
                <div>
                  <v-select
                    label="title"
                    :options="dataTypeRequest"
                    :reduce="(type) => type.value"
                    placeholder="Chọn lý do"
                    v-model="RequestDetail.desc_reason"
                    :searchable="false"
                  ></v-select>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Vị trí</label>
                <div>
                  <v-select
                    label="title"
                    :options="listPositions"
                    :reduce="(position) => position.ID"
                    placeholder="Chọn vị trí"
                    v-model="RequestDetail.position_id"
                  ></v-select>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Phòng ban</label>
                <div>
                  <v-select
                    label="title"
                    :options="listDepartments"
                    :reduce="(depart) => depart.ID"
                    placeholder="Chọn phòng ban"
                    v-model="RequestDetail.department_id"
                  ></v-select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Hạn tuyển từ</label>
                  <div>
                    <date-picker
                      v-model="RequestDetail.date_start"
                    ></date-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Hạn tuyển đến</label>
                  <div>
                    <date-picker v-model="RequestDetail.deadline"></date-picker>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label"
                    >SL nhân sự hiện có</label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">SL định biên</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Số lượng tuyển</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Số lượng"
                      v-model="RequestDetail.amount"
                    />
                  </div>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Hình thức làm việc</label
                >
                <div>
                  <v-select
                    label="title"
                    :options="listWorkTypes"
                    :reduce="(workType) => workType.ID"
                    placeholder="Chọn hình thức làm việc"
                    v-model="RequestDetail.type_id"
                  ></v-select>
                </div>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label">Nơi làm việc</label>
                <div>
                  <v-select
                    label="title"
                    :options="listCity"
                    :reduce="(city) => city.ID"
                    placeholder="Chọn nơi làm việc"
                    v-model="RequestDetail.place"
                  ></v-select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Mức lương(từ)</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RequestDetail.salary_from"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Mức lương(đến)</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RequestDetail.salary_to"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isInfor == false">
            <h2
              @click="isInfor = !isInfor"
              class="cursor-pointer form-group-label"
            >
              Tên đề xuất *, Lý do tuyển *, Vị trí *, Phòng ban, Hạn tuyển từ,
              Hạn tuyển đến *, SL nhân sự hiện có, Số lượng định biên, Số lượng
              tuyển *
            </h2>
          </div>
        </div>
        <div title="Yêu cầu ứng viên" class="inner">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isContact = !isContact"
          >
            <span v-show="isContact == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isContact == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Yêu cầu ứng viên
          </h4>
          <Transition name="slide-up">
            <div v-show="isContact == true">
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Trình độ</label>
                  <div>
                    <v-select
                      label="title"
                      :options="listAcademic"
                      :reduce="(level) => level.ID"
                      placeholder="Chọn trình độ"
                      v-model="RequestDetail.degree_id"
                    ></v-select>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Chuyên ngành</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập chuyên ngành"
                      v-model="RequestDetail.specialization"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Kinh nghiệm</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataExpRecruitment"
                      :reduce="(exp) => exp.value"
                      placeholder="Chọn kinh nghiệm"
                      v-model="RequestDetail.experience"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Ngoại ngữ</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataLanguageRecruitment"
                      :reduce="(lan) => lan.value"
                      placeholder="Chọn ngôn ngữ"
                      v-model="RequestDetail.language"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-small grid grid-cols-4 gap-2">
                <div>
                  <label for="" class="form-group-label">Độ tuổi</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RequestDetail.age_from"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">&nbsp;</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RequestDetail.age_to"
                    />
                  </div>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Giới tính</label>
                  <div>
                    <v-select
                      label="title"
                      :options="dataGenderRecruitment"
                      :reduce="(gender) => gender.value"
                      placeholder="Chọn giới tính"
                      v-model="RequestDetail.gender"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="form-small grid grid-cols-4 gap-2">
                <div>
                  <label for="" class="form-group-label">Chiều cao</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RequestDetail.height"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">&nbsp;</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RequestDetail.height_to"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Cân nặng</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Từ"
                      v-model="RequestDetail.weight"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">&nbsp;</label>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Đến"
                      v-model="RequestDetail.weight_to"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isContact == false">
            <h2
              @click="isContact = !isContact"
              class="cursor-pointer form-group-label"
            >
              Điện thoại, Email, Thường trú, Địa chỉ, Chỗ ở hiện nay, Địa chỉ
            </h2>
          </div>
        </div>
        <div title="Mô tả công việc">
          <div class="form-small">
            <label for="" class="form-group-label">Mô tả công việc</label>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input"
                v-model="RequestDetail.desc"
              ></textarea>
            </div>
          </div>
        </div>
        <div title="Người duyệt" class="inner">
          <h4
            class="form-section-title form-small cursor-pointer"
            @click="isApprover = !isApprover"
          >
            <span v-show="isApprover == true">
              <i class="fas fa-chevron-down cursor-pointer"></i>
            </span>
            <span v-show="isApprover == false"
              ><i class="fas fa-chevron-right cursor-pointer"></i
            ></span>
            Người duyệt
          </h4>
          <Transition name="slide-up">
            <div v-show="isApprover == true">
              <field-approver
                :ArrayApprover="RequestDetail.app_approval_ids"
              ></field-approver>
            </div>
          </Transition>
          <div v-show="isApprover == false">
            <h2
              @click="isApprover = !isApprover"
              class="cursor-pointer form-group-label"
            >
              Người duyệt*
            </h2>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="EditRecruitmentRequest()"
            :class="{ disabledButtonCreated: isCreated }"
          >
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="
              this.$router.push({
                path: '/recruitment-request/all',
                name: 'Recruitment Request All',
              })
            "
          >
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import FieldApprover from "@/components/constant/FieldApprover.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    PersonLayout,
    SidebarRecruitment,
    NavbarSocial,
    ButttonCreateRecruitment,
    datePicker,
    FieldApprover,
  },
  data() {
    return {
      isInfor: true,
      isContact: true,
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
  methods: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("recruitmentRequest/ShowDetailRecruitmentRequestAction", {
      id: route.params.idRequest,
      EndTimeLoading: EndTimeLoading,
    });
    const RequestDetail = computed(
      () => store.state.recruitmentRequest.RequestDetail
    );
    store.dispatch("places/getAllCityAction");
    store.dispatch("departments/getAllDepartmentsAction");
    store.dispatch("positions/getAllPositionsAction", 500);
    store.dispatch("workTypes/GetAllWorkTypeAction", 50);
    store.dispatch("academics/GetAllAcademicsAction");
    const listCity = computed(() => store.state.places.listCity);
    const TypeTraining = computed(() => store.state.personnels.TypeTraining);
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
    const dataExpRecruitment = computed(
      () => store.state.constant.dataExpRecruitment
    );
    const dataLanguageRecruitment = computed(
      () => store.state.constant.dataLanguageRecruitment
    );
    const dataGenderRecruitment = computed(
      () => store.state.constant.dataGenderRecruitment
    );
    //
    const compareDate = (start, end) => {
      let date1 = new Date(start);
      let date2 = new Date(end);
      if (date1 < date2) {
        return true;
      } else {
        return false;
      }
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const EditRecruitmentRequest = () => {
      isCreated.value = true;
      const data = {
        ID: RequestDetail.value.ID,
        title: RequestDetail.value.title,
        position_id: RequestDetail.value.position_id,
        department_id: RequestDetail.value.department_id,
        salary_from: RequestDetail.value.salary_from,
        salary_to: RequestDetail.value.salary_to,
        height: RequestDetail.value.height,
        height_to: RequestDetail.value.height_to,
        weight: RequestDetail.value.weight,
        weight_to: RequestDetail.value.weight_to,
        age_from: RequestDetail.value.age_from,
        age_to: RequestDetail.value.age_to,
        experience: RequestDetail.value.experience,
        place: RequestDetail.value.place,
        degree_id: RequestDetail.value.degree_id,
        type_id: RequestDetail.value.type_id,
        date_start: RequestDetail.value.date_start,
        deadline: RequestDetail.value.deadline,
        desc_reason: RequestDetail.value.desc_reason,
        language: RequestDetail.value.language,
        gender: RequestDetail.value.gender,
        desc: RequestDetail.value.desc,
        specialization: RequestDetail.value.specialization,
        amount: RequestDetail.value.amount,
        app_approval_ids: RequestDetail.value.app_approval_ids,
      };
      if (RequestDetail.value.title?.length > 0) {
        if (
          RequestDetail.value.date_start != null &&
          RequestDetail.value.deadline != null
        ) {
          if (
            compareDate(
              RequestDetail.value.date_start,
              RequestDetail.value.deadline
            )
          ) {
            if (Number(RequestDetail.value.amount) > 0) {
              store.dispatch(
                "recruitmentRequest/EditRecruitmentRequestAction",
                {
                  data: data,
                  toast,
                  router,
                  ActivatedButton,
                }
              );
            } else {
              toast.error("Vui lòng nhập số lượng tuyển");
              ActivatedButton();
            }
          } else {
            toast.error("Ngày bắt đầu lớn hơn ngày kết thúc chiến dịch");
            ActivatedButton();
          }
        } else {
          toast.error("Vui lòng nhập ngày bắt đầu hoặc kết thúc chiến dịch");
          ActivatedButton();
        }
      } else {
        toast.error("Vui lòng nhập tên đề xuất tuyển dụng");
        ActivatedButton();
      }
    };
    return {
      isLoading,
      listCity,
      TypeTraining,
      listAcademic,
      listPositions,
      listDepartments,
      listWorkTypes,
      isCreated,
      RequestDetail,
      dataExpRecruitment,
      dataLanguageRecruitment,
      dataGenderRecruitment,
      compareDate,
      EditRecruitmentRequest,
      ActivatedButton,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
