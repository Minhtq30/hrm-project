<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-approval></button-create-approval>
            <p class="longText">Tạo mới đơn vắng mặt</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 py-2 w-full form-plus-over h-full format-scroll"
        v-if="isLoading == false"
      >
        <div class="w-full outer">
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
            Thông tin đơn
          </h4>
          <Transition name="slide-up">
            <div v-show="isInfor == true" class="form-plus">
              <div
                class="form-small"
                v-if="this.$route.path == '/approval-absence/help'"
              >
                <field-helper :Helper="ApprovalAbsence"></field-helper>
              </div>
              <div
                class="flex items-center form-plus"
                v-if="ApprovalAbsence.details?.length"
              >
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Ngày vắng mặt<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Vắng mặt từ<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Vắng mặt đến<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-extra-small px-1">
                  <label for="" class="form-group-label"
                    >Lý do<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-xs-small px-1">
                  <label for="" class="form-group-label">Tính công</label>
                </div>
                <div class="form-mid-xs-small px-1">
                  <label for="" class="form-group-label">Chốt vân tay</label>
                </div>
                <div class="form-mid-xs-small px-1">
                  <label
                    for=""
                    class="form-group-label"
                    v-if="CompensatoryLeave"
                    >Số giờ làm thêm</label
                  >
                </div>
                <div class="form-mid-xs-small px-1">
                  <label
                    for=""
                    class="form-group-label"
                    v-if="CompensatoryLeave"
                    >Ứng</label
                  >
                </div>
                <div class="form-mid-xs-small px-1">
                  <label
                    for=""
                    class="form-group-label"
                    v-if="CompensatoryLeave"
                    >Đã dùng</label
                  >
                </div>
                <div class="form-mid-xs-small px-1">
                  <label
                    for=""
                    class="form-group-label"
                    v-if="CompensatoryLeave"
                    >Có thể nghỉ</label
                  >
                </div>
              </div>
              <div
                class="flex items-center -mt-3"
                v-for="(approval_absence, index) in ApprovalAbsence.details"
                :key="index"
                :name="index"
              >
                <div class="flex items-center form-plus">
                  <div class="form-mid-small px-1">
                    <date-picker
                      v-model="approval_absence.date_start"
                    ></date-picker>
                  </div>
                  <div class="form-mid-small px-1">
                    <hour-picker
                      v-model="approval_absence.time_start"
                    ></hour-picker>
                  </div>
                  <div class="form-mid-small px-1">
                    <hour-picker
                      v-model="approval_absence.time_end"
                    ></hour-picker>
                  </div>
                  <div class="form-extra-small px-1">
                    <v-select
                      label="title"
                      :options="ReasonAbsencesActive"
                      :reduce="(absence) => absence.ID"
                      @option:selected="changeInputAbsence($event, index)"
                      placeholder="Chọn lý do"
                      v-model="approval_absence.reason"
                      :searchable="false"
                    >
                      <template #option="{ title, max_time, unit }">
                        <div class="flex flex-col-reverse">
                          <p class="text-xs">
                            {{ formatType(max_time, unit) }}
                          </p>
                          <p class="font-medium">{{ title }}</p>
                        </div>
                      </template></v-select
                    >
                  </div>
                  <div class="form-mid-xs-small px-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                      v-model="approval_absence.reason_attendance"
                    />
                  </div>
                  <div class="form-mid-xs-small px-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                      v-model="approval_absence.reason_inout"
                    />
                  </div>
                  <div
                    class="form-mid-xs-small px-1"
                    v-if="formatReason(approval_absence.reason) == 'Nghỉ bù'"
                  >
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                      :value="
                        DetailsCompensatoryUser
                          ? DetailsCompensatoryUser.compensatory_total_closed
                          : 0
                      "
                    />
                  </div>
                  <div
                    class="form-mid-xs-small px-1"
                    v-if="formatReason(approval_absence.reason) == 'Nghỉ bù'"
                  >
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                      :value="0"
                    />
                  </div>
                  <div
                    class="form-mid-xs-small px-1"
                    v-if="formatReason(approval_absence.reason) == 'Nghỉ bù'"
                  >
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                      :value="
                        DetailsCompensatoryUser
                          ? DetailsCompensatoryUser.compensatory_total_used
                          : 0
                      "
                    />
                  </div>
                  <div
                    class="form-mid-xs-small px-1"
                    v-if="formatReason(approval_absence.reason) == 'Nghỉ bù'"
                  >
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput"
                      disabled
                      :value="
                        DetailsCompensatoryUser
                          ? DetailsCompensatoryUser.compensatory_total_closed
                          : 0
                      "
                    />
                  </div>
                  <div @click="removeApprovalAbsence(index)">
                    <i
                      class="fal fa-times icon-close"
                      style="margin-top: 0px"
                    ></i>
                  </div>
                </div>
              </div>
              <div>
                <span @click="addApprovalAbsence"
                  ><i class="fal fa-plus-circle icon-plus"></i
                ></span>
              </div>
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Mô tả<span class="text-red-600">*</span></label
                >
                <div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    class="form-control-input"
                    v-model="ApprovalAbsence.desc"
                  ></textarea>
                </div>
              </div>
              <attach-file-vue
                :arrFile="newFile.reason_file_image"
              ></attach-file-vue>
            </div>
          </Transition>

          <div v-show="isInfor == false">
            <h2 @click="isInfor = !isInfor" class="cursor-pointer mt-2 text-sm">
              Lý do *, Tính công, Nhân sự cần tạo đơn *, Ca *, Đến ngày*, Phép
              nghĩ,, Phép dư, Có thể ứng, Có thể nghỉ
            </h2>
          </div>
        </div>
        <div class="inner">
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
            Người duyệt đơn
          </h4>
          <Transition name="slide-up">
            <div v-show="isApprover == true">
              <field-approver
                :ArrayApprover="ApprovalAbsence.app_approval_ids"
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
            @click="createApprovalAbsence()"
            :class="{ disabledButtonCreated: isCreated }"
          >
            Cập nhật
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
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
import SidebarApproval from "@/components/sidebar/SidebarApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import hourPicker from "@/components/datePicker/hourPicker.vue";
import FieldApprover from "@/components/constant/FieldApprover.vue";
import FieldHelper from "@/components/constant/FieldHelper.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { reactive, ref } from "vue";
import {
  FormatDate,
  FormatTitle,
  FormatTrueFalse,
} from "@/constants/FormatAll";
import router from "@/router";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useApprovalAbsence } from "@/store/modules/approval/ApprovalAbsence";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { useReasonAbsences } from "@/store/modules/settingApproval/ReasonAbsences";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    datePicker,
    hourPicker,
    FieldApprover,
    FieldHelper,
    AttachFileVue,
  },
  data() {
    return {};
  },
  methods: {
    formatReason(id) {
      return FormatTitle(id, this.ReasonAbsencesActive);
    },
  },
  setup() {
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const CompensatoryLeave = ref(false);
    const isApprover = ref(true);
    const isCreated = ref(false);
    const absences = useApprovalAbsence();
    const profile = useUserProfile();
    const setting = useSettingApproval();
    const reasonAbsence = useReasonAbsences();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const { ReasonAbsencesActive, typeAbsences } = storeToRefs(reasonAbsence);
    const { CheckDescApprovalAbsence } = storeToRefs(setting);
    const { userProfile } = storeToRefs(profile);
    const { idUserCreate, DetailsCompensatoryUser } = storeToRefs(absences);
    console.log(idUserCreate);
    console.log(DetailsCompensatoryUser);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    const isInfor = ref(true);
    const dateAbsence = new Date().toISOString().substring(0, 10);
    if (ReasonAbsencesActive.value?.length == 0) {
      reasonAbsence.GetAllAbsencesAction();
    }
    if (CheckDescApprovalAbsence.value == null) {
      setting.CheckDescApprovalAbsenceAction();
    }
    const ApprovalAbsence = reactive({
      personnel_id: null,
      desc: "",
      details: [
        {
          date_start: dateAbsence,
          date_end: null,
          reason: null,
          reason_attendance: "",
          time_start: "00:00",
          time_end: "00:00",
          reason_inout: "",
          is_compensatory: 0,
          nb_total: 0,
          nb_used: 0,
          nb_amount: 0,
        },
      ],
      app_approval_ids: [null],
    });
    const changeInputAbsence = (event, index) => {
      if (event.title == "Nghỉ bù") {
        let data_compensatory;
        absences.setIdUserCreateApprovalAction(ApprovalAbsence.personnel_id);
        if (route.path == "/approval-absence/help") {
          data_compensatory = {
            personnel_id: idUserCreate.value,
            year: new Date().getFullYear(),
          };
        } else {
          data_compensatory = {
            personnel_id: userProfile.value.personnel_id,
            year: new Date().getFullYear(),
          };
        }
        absences.DetailsCompensatoryUserAction(data_compensatory);
        CompensatoryLeave.value = true;
        ApprovalAbsence.details[index].is_compensatory = 1;
      } else {
        CompensatoryLeave.value = false;
        ApprovalAbsence.details[index].is_compensatory = 0;
      }
      ApprovalAbsence.details[index].reason_attendance = FormatTrueFalse(
        event.has_attendance
      );
      ApprovalAbsence.details[index].reason_inout = FormatTrueFalse(
        event.required_finger
      );
    };
    const addApprovalAbsence = () => {
      const data = {
        date_start: dateAbsence,
        date_end: null,
        reason: null,
        reason_attendance: "",
        time_start: "00:00",
        time_end: "00:00",
        reason_inout: "",
        is_compensatory: 0,
        nb_total: 0,
        nb_used: 0,
        nb_amount: 0,
      };
      ApprovalAbsence.details.push(data);
    };
    const removeApprovalAbsence = (index) => {
      ApprovalAbsence.details.splice(index, 1);
    };
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const formatType = (time, type) => {
      const arr = typeAbsences.value.find((item) => item.value == type);
      if (time == null) {
        return "Không giới hạn";
      } else {
        return "Tối đa" + " " + time + " lần / " + arr.name;
      }
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalAbsence = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-absence/help") {
        data = {
          personnel_id: ApprovalAbsence.personnel_id,
          desc: ApprovalAbsence.desc,
          details: ApprovalAbsence.details,
          app_approval_ids: ApprovalAbsence.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          desc: ApprovalAbsence.desc,
          details: ApprovalAbsence.details,
          app_approval_ids: ApprovalAbsence.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalAbsence.value.value == 1) {
        if (data.desc?.length == 0) {
          toast.error("Vui Lòng nhập mô tả");
          setTimeout(() => {
            isCreated.value = false;
          }, 500);
        } else {
          if (data.details[0].reason == null) {
            toast.error("Vui Lòng chọn lý do");
            setTimeout(() => {
              isCreated.value = false;
            }, 500);
          } else {
            if (data.app_approval_ids.includes(null)) {
              toast.error("Vui Lòng chọn người duyệt");
              setTimeout(() => {
                isCreated.value = false;
              }, 500);
            } else {
              isLoading.value = true;
              absences.createApprovalAbsenceAction({
                dataUrl,
                router,
                toast,
                EndTimeLoading,
                ActivatedButton,
              });
            }
          }
        }
      } else {
        if (data.details[0].reason == null) {
          toast.error("Vui Lòng chọn lý do");
          setTimeout(() => {
            isCreated.value = false;
          }, 500);
        } else {
          if (data.app_approval_ids.includes(null)) {
            toast.error("Vui Lòng chọn người duyệt");
            setTimeout(() => {
              isCreated.value = false;
            }, 500);
          } else {
            isLoading.value = true;
            absences.createApprovalAbsenceAction({
              dataUrl,
              router,
              toast,
              EndTimeLoading,
              ActivatedButton,
            });
          }
        }
      }
    };
    return {
      isInfor,
      dateAbsence,
      isApprover,
      ReasonAbsencesActive,
      typeAbsences,
      isLoading,
      CompensatoryLeave,
      ApprovalAbsence,
      isCreated,
      CheckDescApprovalAbsence,
      userProfile,
      DetailsCompensatoryUser,
      idUserCreate,
      newFile,
      formatType,
      changeInputAbsence,
      formatdate,
      addApprovalAbsence,
      removeApprovalAbsence,
      createApprovalAbsence,
      ActivatedButton,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
