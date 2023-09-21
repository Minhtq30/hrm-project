<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-approval></button-create-approval>
            <p class="longText">Cập nhật đơn làm theo chế độ</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div class="text-left px-4 w-full" v-if="isLoading == false">
      <div class="w-full mt-2">
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
              <div class="">
                <label for="" class="form-group-label"
                  >Lý do<span class="text-red-600">*</span></label
                >
                <div>
                  <v-select
                    label="title"
                    :options="listWorktimes"
                    :reduce="(leave) => leave.ID"
                    placeholder="Chọn lý do"
                    :change="changeReason()"
                    v-model="approvalDetail.data.reason"
                  >
                  </v-select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div class="col-span-1">
                  <label for="" class="form-group-label"
                    >Từ ngày<span class="text-red-600">*</span></label
                  >
                  <div>
                    <date-picker
                      v-model="approvalDetail.data.date_start"
                    ></date-picker>
                  </div>
                </div>
                <div class="col-span-1">
                  <label for="" class="form-group-label"
                    >Đến ngày<span class="text-red-600">*</span></label
                  >
                  <div>
                    <date-picker
                      v-model="approvalDetail.data.date_end"
                    ></date-picker>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 form-small">
                <div class="col-span-1">
                  <label for="" class="form-group-label"
                    >Chế độ<span class="text-red-600">*</span></label
                  >
                  <div>
                    <input
                      type="text"
                      class="disabledInput p-3 w-full"
                      value="Đi muộn"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-span-1">
                  <label for="" class="form-group-label"
                    >Thời gian đi muộn<span class="text-red-600">*</span></label
                  >
                  <div class="disabledInput p-3 w-full">
                    <!-- <hour-picker
                      v-model="approvalDetail.data.late"
                    ></hour-picker> -->
                    <i class="far fa-clock"></i>
                    <input
                      type="text"
                      class="pl-[5px]"
                      :value="approvalDetail.data.late"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-span-1">
                  <div>
                    <input
                      type="text"
                      class="disabledInput p-3 w-full"
                      value="Về sớm"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="disabledInput p-3 w-full">
                    <!-- <hour-picker
                      v-model="approvalDetail.data.early"
                    ></hour-picker> -->
                    <i class="far fa-clock"></i>
                    <input
                      type="text"
                      class="pl-[5px]"
                      :value="approvalDetail.data.early"
                      disabled
                    />
                  </div>
                </div>
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
          </div>
        </Transition>
        <div v-show="isInfor == false">
          <h2 @click="isInfor = !isInfor" class="cursor-pointer mt-2 text-sm">
            Lý do *, Tính công, Nhân sự cần tạo đơn *, Ca *, Đến ngày*, Phép
            nghĩ,, Phép dư, Có thể ứng, Có thể nghỉ
          </h2>
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
    </div>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="createApprovalWorktime()">
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
// import hourPicker from "@/components/datePicker/hourPicker.vue";
import FieldApprover from "@/components/constant/FieldApprover.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { ref, computed, reactive } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalWorktime } from "@/store/modules/approval/ApprovalWorktime";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useReasonWorktime } from "@/store/modules/settingApproval/ReasonWorktime";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    datePicker,
    // hourPicker,
    FieldApprover,
    AttachFileVue,
  },
  data() {
    return {};
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const isApprover = ref(true);
    const regime = useApprovalWorktime();
    const total = useApprovalTotal();
    const reasonWorktime = useReasonWorktime();
    const { listWorktimes } = storeToRefs(reasonWorktime);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    total.ShowDetailApprovalAction({
      id: route.params.worktimeID,
      EndTimeLoading,
    });
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    reasonWorktime.GetAllWorktimesAction();
    const isInfor = ref(true);
    const dateFrom = new Date().toISOString().substring(0, 10);
    const dateTo = new Date().toISOString().substring(0, 10);
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const changeReason = () => {
      if (approvalDetail.value.data.reason == 1) {
        approvalDetail.value.data.late = "00:30";
        approvalDetail.value.data.early = "00:30";
      } else if (approvalDetail.value.data.reason == 2) {
        approvalDetail.value.data.late = "00:00";
        approvalDetail.value.data.early = "01:00";
      } else {
        approvalDetail.value.data.late = "01:00";
        approvalDetail.value.data.early = "00:00";
      }
    };
    const createApprovalWorktime = () => {
      const data = {
        ID: approvalDetail.value.ID,
        reason: approvalDetail.value.data.reason,
        date_start: approvalDetail.value.data.date_start,
        date_end: approvalDetail.value.data.date_end,
        late: approvalDetail.value.data.late,
        early: approvalDetail.value.data.early,
        desc: approvalDetail.value.data.desc,
        app_approval_ids: arrApprover.value,
        personnel_id: approvalDetail.value.personnel_id,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
      };
      if (data.app_approval_ids.includes(null)) {
        toast.error("Vui Lòng chọn người duyệt");
      } else {
        isLoading.value = true;
        regime.updateApprovalWorktimeAction({
          data: data,
          router,
          toast,
          EndTimeLoading,
        });
      }
    };
    return {
      isInfor,
      dateFrom,
      dateTo,
      listWorktimes,
      approvalDetail,
      arrApprover,
      reasonFile,
      newFile,
      changeReason,
      formatdate,
      createApprovalWorktime,
      EndTimeLoading,
      removeOldFile,
      isLoading,
      isApprover,
    };
  },
};
</script>

<style></style>
