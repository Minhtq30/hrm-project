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
            <p class="longText">Cập nhật đơn vắng mặt</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 py-2 w-full h-full form-plus-over"
        v-if="isLoading == false"
      >
        <div class="w-full">
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
                class="flex items-center form-plus"
                v-if="approvalDetail.data.details?.length"
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
                  <label for="" class="form-group-label">Yêu cầu chốt</label>
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
                v-for="(approval_absence, index) in approvalDetail.data.details"
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
                      v-model="approval_absence.nb_total"
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
                      v-model="approval_absence.nb_total"
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
                      v-model="approval_absence.nb_used"
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
                      v-model="approval_absence.nb_amount"
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
                <span @click="addApprovalAbsence">
                  <i class="fal fa-plus-circle icon-plus"></i
                ></span>
              </div>
              <attach-file-vue
                :arrFile="newFile.reason_file_image"
              ></attach-file-vue>
              <div
                v-for="(file, index) in reasonFile"
                :key="index"
                class="form-small flex justify-between items-center mt-2 bg-slate-100 rounded-xl p-3"
              >
                <div class="flex flex-col">
                  <div>{{ file.slice(7) }}</div>
                </div>
                <div>
                  <span @click="removeOldFile(index)" class="cursor-pointer"
                    ><i class="fal fa-times icon-close"></i
                  ></span>
                </div>
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
                    v-model="approvalDetail.data.desc"
                  ></textarea>
                </div>
              </div>
            </div>
          </Transition>
          <div v-show="isInfor == false">
            <h2
              @click="isInfor = !isInfor"
              class="cursor-pointer form-group-label"
            >
              Lý do *, Tính công, Nhân sự cần tạo đơn *, Ca *, Đến ngày*, Phép
              nghĩ,, Phép dư, Có thể ứng, Có thể nghỉ
            </h2>
          </div>
        </div>
        <div class="w-full inner">
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
              <field-approver :ArrayApprover="arrApprover"></field-approver>
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
          <button class="button-modal" @click="updateApprovalAbsence()">
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
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { ref, reactive } from "vue";
import {
  FormatDate,
  FormatTitle,
  FormatTrueFalse,
} from "@/constants/FormatAll";
import router from "@/router";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useApprovalAbsence } from "@/store/modules/approval/ApprovalAbsence";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useReasonAbsences } from "@/store/modules/settingApproval/ReasonAbsences";
import { storeToRefs } from "pinia";
import { computed } from "vue";
export default {
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    datePicker,
    hourPicker,
    FieldApprover,
    AttachFileVue,
  },
  data() {
    return {
      isApprover: true,
    };
  },
  methods: {
    formatReason(id) {
      return FormatTitle(id, this.ReasonAbsencesActive);
    },
    formatdate(date) {
      return FormatDate(date);
    },
    formatType(time, type) {
      const arr = this.typeAbsences.find((item) => item.value == type);
      if (time == null) {
        return "Không giới hạn";
      } else {
        return "Tối đa" + " " + time + " lần / " + arr.name;
      }
    },
  },
  setup() {
    const toast = useToast();
    const route = useRoute();
    const isInfor = ref(true);
    const isLoading = ref(true);
    const CompensatoryLeave = ref(false);
    const absences = useApprovalAbsence();
    const total = useApprovalTotal();
    const reasonAbsence = useReasonAbsences();
    const { ReasonAbsencesActive, typeAbsences } = storeToRefs(reasonAbsence);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const dateAbsence = new Date().toISOString().substring(0, 10);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    reasonAbsence.GetAllAbsencesAction();
    total.ShowDetailApprovalAction({
      id: route.params.absenceID,
      EndTimeLoading,
    });
    const changeInputAbsence = (event, index) => {
      if (event.title == "Nghỉ bù") {
        approvalDetail.value.data.details[index].is_compensatory = 1;
        CompensatoryLeave.value = true;
      } else {
        approvalDetail.value.data.details[index].is_compensatory = 0;
        CompensatoryLeave.value = false;
      }
      approvalDetail.value.data.details[index].reason_attendance =
        FormatTrueFalse(event.has_attendance);
      approvalDetail.value.data.details[index].reason_inout = FormatTrueFalse(
        event.required_finger
      );
    };
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const addApprovalAbsence = () => {
      const data = {
        date_start: dateAbsence,
        absenceID: null,
        has_attendance: "",
        time_start: "00:00",
        time_end: "00:00",
        reason_inout: "",
        is_compensatory: 0,
        nb_total: 0,
        nb_used: 0,
        nb_amount: 0,
      };
      approvalDetail.value.data.details.push(data);
    };
    const removeApprovalAbsence = (index) => {
      approvalDetail.value.data.details.splice(index, 1);
    };
    const updateApprovalAbsence = () => {
      const data = {
        ID: approvalDetail.value.ID,
        desc: approvalDetail.value.data.desc,
        details: approvalDetail.value.data.details,
        app_approval_ids: arrApprover.value,
        personnel_id: approvalDetail.value.personnel_id,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
      };
      if (data.app_approval_ids.includes(null)) {
        toast.error("Vui Lòng chọn người duyệt");
      } else {
        isLoading.value = true;
        absences.updateApprovalAbsenceAction({
          dataUrl: data,
          router,
          toast,
          EndTimeLoading,
        });
      }
    };
    return {
      isInfor,
      dateAbsence,
      ReasonAbsencesActive,
      typeAbsences,
      CompensatoryLeave,
      isLoading,
      approvalDetail,
      arrApprover,
      reasonFile,
      newFile,
      changeInputAbsence,
      addApprovalAbsence,
      removeApprovalAbsence,
      updateApprovalAbsence,
      removeOldFile,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
