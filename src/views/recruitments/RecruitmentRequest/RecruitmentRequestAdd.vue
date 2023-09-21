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
            <p class="longText">Tạo mới đề xuất tuyển dụng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="w-full h-full text-left px-4 py-2 form-plus-over format-scroll"
        v-if="isLoading == false"
      >
        <div title="Thông tin chung" class="outer">
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
                    v-model="RecruitmentRequest.title"
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
                    v-model="RecruitmentRequest.desc_reason"
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
                    v-model="RecruitmentRequest.position_id"
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
                    v-model="RecruitmentRequest.department_id"
                  ></v-select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div>
                  <label for="" class="form-group-label">Hạn tuyển từ</label>
                  <div>
                    <date-picker
                      v-model="RecruitmentRequest.date_start"
                    ></date-picker>
                  </div>
                </div>
                <div>
                  <label for="" class="form-group-label">Hạn tuyển đến</label>
                  <div>
                    <date-picker
                      v-model="RecruitmentRequest.deadline"
                    ></date-picker>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-2 form-small">
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
                <div class="col-span-2">
                  <label for="" class="form-group-label">Số lượng tuyển</label>
                  <div>
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Số lượng"
                      v-model="RecruitmentRequest.amount"
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
                    v-model="RecruitmentRequest.type_id"
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
                    v-model="RecruitmentRequest.place"
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
                      v-model="RecruitmentRequest.salary_from"
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
                      v-model="RecruitmentRequest.salary_to"
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
                      v-model="RecruitmentRequest.degree_id"
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
                      v-model="RecruitmentRequest.specialization"
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
                      v-model="RecruitmentRequest.experience"
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
                      v-model="RecruitmentRequest.language"
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
                      v-model="RecruitmentRequest.age_from"
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
                      v-model="RecruitmentRequest.age_to"
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
                      v-model="RecruitmentRequest.gender"
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
                      v-model="RecruitmentRequest.height"
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
                      v-model="RecruitmentRequest.height_to"
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
                      v-model="RecruitmentRequest.weight"
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
                      v-model="RecruitmentRequest.weight_to"
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
        <div title="Mô tả công việc" class="inner">
          <div class="form-small">
            <label for="" class="form-group-label">Mô tả công việc</label>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input"
                v-model="RecruitmentRequest.desc"
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
                :ArrayApprover="RecruitmentRequest.app_approval_ids"
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
            @click="CreateRecruitmentRequest()"
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
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarRecruitment from "@/components/sidebar/SidebarRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButttonCreateRecruitment from "@/views/recruitments/ButttonCreateRecruitment.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import FieldApprover from "@/components/constant/FieldApprover.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
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
      isApprover: true,
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
    const toast = useToast();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const RecruitmentRequest = reactive({
      title: null,
      department_id: null,
      position_id: null,
      salary_from: null,
      salary_to: null,
      gender: null,
      language: null,
      height: null,
      height_to: null,
      weight: null,
      weight_to: null,
      age_from: null,
      age_to: null,
      experience: null,
      place: null,
      degree_id: null,
      type_id: null,
      date_start: null,
      deadline: null,
      desc_reason: "0",
      desc: null,
      specialization: null,
      amount: null,
      app_approval_ids: [null],
    });
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

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
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const compareDate = (start, end) => {
      let date1 = new Date(start);
      let date2 = new Date(end);
      if (date1 < date2) {
        return true;
      } else {
        return false;
      }
    };
    const CreateRecruitmentRequest = () => {
      isCreated.value = true;
      const data = {
        title: RecruitmentRequest.title,
        position_id: RecruitmentRequest.position_id,
        department_id: RecruitmentRequest.department_id,
        salary_from: RecruitmentRequest.salary_from,
        salary_to: RecruitmentRequest.salary_to,
        height: RecruitmentRequest.height,
        height_to: RecruitmentRequest.height_to,
        weight: RecruitmentRequest.weight,
        weight_to: RecruitmentRequest.weight_to,
        age_from: RecruitmentRequest.age_from,
        age_to: RecruitmentRequest.age_to,
        experience: RecruitmentRequest.experience,
        place: RecruitmentRequest.place,
        degree_id: RecruitmentRequest.degree_id,
        type_id: RecruitmentRequest.type_id,
        date_start: RecruitmentRequest.date_start,
        deadline: RecruitmentRequest.deadline,
        desc_reason: RecruitmentRequest.desc_reason,
        language: RecruitmentRequest.language,
        gender: RecruitmentRequest.gender,
        desc: RecruitmentRequest.desc,
        specialization: RecruitmentRequest.specialization,
        amount: RecruitmentRequest.amount,
        app_approval_ids: RecruitmentRequest.app_approval_ids,
      };
      if (RecruitmentRequest.title?.length > 0) {
        if (
          RecruitmentRequest.date_start != null &&
          RecruitmentRequest.deadline != null
        ) {
          if (
            compareDate(
              RecruitmentRequest.date_start,
              RecruitmentRequest.deadline
            )
          ) {
            if (Number(RecruitmentRequest.amount) > 0) {
              if (RecruitmentRequest.app_approval_ids[0] != null) {
                store.dispatch(
                  "recruitmentRequest/CreateRecruitmentRequestAction",
                  {
                    data: data,
                    toast,
                    router,
                    ActivatedButton,
                  }
                );
              } else {
                toast.error("Vui lòng chọn người duyệt");
                ActivatedButton();
              }
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
      RecruitmentRequest,
      listCity,
      TypeTraining,
      listAcademic,
      listPositions,
      listDepartments,
      listWorkTypes,
      isCreated,
      dataExpRecruitment,
      dataLanguageRecruitment,
      dataGenderRecruitment,
      CreateRecruitmentRequest,
      ActivatedButton,
      compareDate,
    };
  },
};
</script>

<style></style>
