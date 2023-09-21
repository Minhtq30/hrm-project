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
            <p class="longText">Cập nhật đơn xin nghỉ</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div class="text-left px-4 py-2 w-full h-full" v-if="isLoading == false">
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
            Thông tin chung
          </h4>
          <Transition name="slide-up">
            <div v-show="isInfor == true">
              <div class="grid grid-cols-4 gap-2 form-small">
                <div class="col-span-3">
                  <label for="" class="form-group-label"
                    >Lý do<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="ReasonLeavesActive"
                      :reduce="(leave) => leave.ID"
                      @option:selected="changeInputLeave($event)"
                      placeholder="Chọn lý do"
                      v-model="approvalDetail.data.reason"
                      :searchable="false"
                    >
                      <template #option="{ title, max_day, type_day }">
                        <div class="flex flex-col-reverse">
                          <em>{{ formatType(max_day, type_day) }}</em>
                          <strong>{{ title }}</strong>
                        </div>
                      </template></v-select
                    >
                  </div>
                </div>
                <div class="">
                  <label for="" class="form-group-label"
                    >Tính công<span class="text-red-600">*</span></label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput p-3 w-full"
                      v-model="has_attendance"
                      disabled
                      style="border-radius: 4px"
                    />
                  </div>
                </div>
              </div>
              <div
                class="form-large-plus flex items-center"
                v-if="approvalDetail?.data?.details?.length"
              >
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Ca<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Từ ngày<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Ca<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Đến ngày<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Phép nghỉ</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Phép dư</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Có thể ứng</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Có thể nghỉ</label>
                </div>
              </div>
              <div
                class="flex items-center -mt-3"
                v-for="(item, index) in approvalDetail?.data?.details"
                :key="index"
              >
                <div class="form-large-plus flex items-center">
                  <div class="form-mid-small px-1">
                    <v-select
                      label="title"
                      :options="shiftLeave"
                      :reduce="(shift) => shift.id"
                      placeholder="Chọn ca nghỉ"
                      v-model="item.shifts_start"
                    ></v-select>
                  </div>
                  <div class="form-mid-small px-1">
                    <date-picker v-model="item.date_start"></date-picker>
                  </div>
                  <div class="form-mid-small px-1">
                    <v-select
                      label="title"
                      :options="shiftLeave"
                      :reduce="(shift) => shift.id"
                      placeholder="Chọn ca nghỉ"
                      v-model="item.shifts_end"
                    ></v-select>
                  </div>
                  <div class="form-mid-small px-1">
                    <date-picker v-model="item.date_end"></date-picker>
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      :value="CountLeave(item)"
                    />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      :value="
                        approvalDetail?.data_furlough?.furlough_total_closed
                          ? Number(
                              approvalDetail?.data_furlough
                                ?.furlough_total_closed
                            ) - CountLeave(item)
                          : 0 - CountLeave(item)
                      "
                    />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      :value="0"
                    />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      :value="
                        approvalDetail?.data_furlough?.furlough_total_closed
                          ? Number(
                              approvalDetail?.data_furlough
                                ?.furlough_total_closed
                            )
                          : 0
                      "
                    />
                  </div>
                  <div @click="removeApprovalLeave(index)">
                    <i
                      class="fal fa-times icon-close"
                      style="margin-top: 0px"
                    ></i>
                  </div>
                </div>
              </div>
              <div>
                <span @click="addApprovalLeave"
                  ><i class="fal fa-plus-circle icon-plus mt-2"></i
                ></span>
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
          <div class="mt-2 form-small">
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
        <!-- <attach-file-vue :arrFile="newFile.reason_file_image"></attach-file-vue>
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
        </div> -->
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
          <button class="button-modal" @click="updatecreateApprovalLeave()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
            Hủy bỏ
          </button>
        </div>
      </div>
    </template>
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
import FieldApprover from "@/components/constant/FieldApprover.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { ref, reactive } from "vue";
import { FormatTrueFalse } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { useApprovalLeave } from "@/store/modules/approval/ApprovalLeaves";
import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { storeToRefs } from "pinia";
import { computed } from "vue";
export default {
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    datePicker,
    FieldApprover,
    AttachFileVue,
  },
  data() {
    return {
      shiftLeave: [
        { id: "0", title: "Nửa ca đầu" },
        { id: "1", title: "Nửa ca sau" },
      ],
      isApprover: true,
    };
  },
  methods: {
    CountLeave(item) {
      let ms1 = new Date(item.date_start).getTime();
      let ms2 = new Date(item.date_end).getTime();
      if (item.shifts_start == item.shifts_end) {
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000)) + 0.5;
      } else {
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000)) + 1;
      }
    },
  },
  mounted() {
    const route = useRoute();
    const total = useApprovalTotal();
    const isLoading = ref(true);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    total.ShowDetailApprovalAction({
      id: route.params.idApproval,
      EndTimeLoading,
    });
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isInfor = ref(true);
    const isLoading = ref(true);
    const has_attendance = ref("Không");
    const leave = useApprovalLeave();
    let date = new Date();
    const data = {
      personnel_id: localStorage.getItem("personnelID"),
      date: date.getFullYear(),
    };
    leave.GetFurloughDetailUserAction(data);
    const date_start = new Date().toISOString().substring(0, 10);
    const date_end = new Date().toISOString().substring(0, 10);
    const multiFile = ref([]);
    const AnnualLeave = ref(false);
    const reasonLeave = useReasonLeave();
    const total = useApprovalTotal();
    const { approvalDetail, reasonCurrent, arrApprover } = storeToRefs(total);
    const { ReasonLeavesActive, typeDay } = storeToRefs(reasonLeave);
    const { UserFurlough } = storeToRefs(leave);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    // const reasonCurrent = computed(() => approvalDetail.value.reason.title);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    total.ShowDetailApprovalAction({
      id: route.params.idApproval,
      EndTimeLoading,
    });
    if (ReasonLeavesActive.value.length == 0) {
      reasonLeave.GetAllLeavesAction();
    }
    // let currentReason = localStorage.getItem("reasonCurrent");
    if (approvalDetail?.value?.data_furlough) {
      AnnualLeave.value = true;
    } else {
      AnnualLeave.value = false;
    }
    const addApprovalLeave = () => {
      const data = {
        shifts_start: "0",
        shifts_end: "1",
        date_start: date_start,
        date_end: date_end,
      };
      approvalDetail.value.data.details.push(data);
    };
    const removeApprovalLeave = (index) => {
      approvalDetail.value.data.details.splice(index, 1);
    };
    const changeInputLeave = (event) => {
      if (event.title == "Nghỉ phép năm") {
        AnnualLeave.value = true;
      } else {
        AnnualLeave.value = false;
      }
      let code = formatTrueFalse(event.has_attendance);
      has_attendance.value = code;
    };
    const formatType = (day, type) => {
      const arr = typeDay.value.find((item) => item.value == type);
      if (day == null) {
        return "Không giới hạn";
      } else {
        return day + " " + arr.name;
      }
    };
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const formatTrueFalse = (status) => {
      return FormatTrueFalse(status);
    };
    const updatecreateApprovalLeave = () => {
      const data = {
        ID: approvalDetail.value.ID,
        reason: approvalDetail.value.data.reason,
        details: approvalDetail.value.data.details,
        desc: approvalDetail.value.data.desc,
        app_approval_ids: arrApprover.value,
        personnel_id: approvalDetail.value.personnel_id,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
      };
      if (data.reason == null) {
        toast.error("Vui lòng chọn lý do", 1000);
      } else if (data.app_approval_ids.includes(null)) {
        toast.error("Vui Lòng chọn người duyệt");
      } else {
        isLoading.value = true;
        leave.updateApprovalLeaveAction({
          data: data,
          router,
          toast,
          EndTimeLoading,
        });
      }
    };
    return {
      isInfor,
      isLoading,
      date_start,
      date_end,
      AnnualLeave,
      multiFile,
      ReasonLeavesActive,
      typeDay,
      approvalDetail,
      arrApprover,
      has_attendance,
      reasonFile,
      newFile,
      reasonCurrent,
      UserFurlough,
      removeOldFile,
      addApprovalLeave,
      removeApprovalLeave,
      formatType,
      changeInputLeave,
      formatTrueFalse,
      updatecreateApprovalLeave,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
