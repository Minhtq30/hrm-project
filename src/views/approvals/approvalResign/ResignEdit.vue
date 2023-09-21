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
            <p class="longText">Cập nhật đơn xin thôi việc</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div class="text-left px-4 w-full h-full" v-if="isLoading == false">
      <div class="w-full mt-2">
        <h4 class="form-section-title form-small">
          <span v-show="isInfor == true" @click="isInfor = !isInfor">
            <i class="fas fa-chevron-down cursor-pointer"></i>
          </span>
          <span @click="isInfor = !isInfor" v-show="isInfor == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Thông tin chung
        </h4>
        <div v-show="isInfor == true">
          <div class="">
            <div class="form-small">
              <label for="" class="form-group-label"
                >Lý do<span class="text-red-600">*</span></label
              >
              <div>
                <v-select
                  label="title"
                  :options="ReasonResign"
                  :reduce="(reason) => reason.ID"
                  placeholder="Chọn lý do"
                  v-model="approvalDetail.reason"
                  :searchable="false"
                ></v-select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 form-small">
              <div class="col-span-1">
                <label for="" class="form-group-label"
                  >Ngày nộp đơn<span class="text-red-600">*</span></label
                >
                <div>
                  <date-picker
                    v-model="approvalDetail.date_aprroval_create"
                  ></date-picker>
                </div>
              </div>
              <div class="col-span-1">
                <label for="" class="form-group-label"
                  >Ngày thôi việc<span class="text-red-600">*</span></label
                >
                <div>
                  <date-picker
                    v-model="approvalDetail.date_of_application"
                  ></date-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="isInfor == false">
          <h2 @click="isInfor = !isInfor" class="cursor-pointer mt-2 text-sm">
            Lý do *, Tính công, Nhân sự cần tạo đơn *, Ca *, Đến ngày*, Phép
            nghĩ,, Phép dư, Có thể ứng, Có thể nghỉ
          </h2>
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
              v-text="approvalDetail.desc"
            ></textarea>
          </div>
        </div>
        <attach-file-vue :arrFile="newFile.reason_file_image"></attach-file-vue>
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
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateApprovalResign()">
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
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalResign } from "@/store/modules/approval/ApprovalResign";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { storeToRefs } from "pinia";
import { computed } from "vue";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isInfor = ref(true);
    const isApprover = ref(true);
    const isLoading = ref(true);
    const total = useApprovalTotal();
    const resign = useApprovalResign();
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const { ReasonResign } = storeToRefs(resign);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    total.ShowDetailApprovalAction({
      id: route.params.resignID,
      EndTimeLoading,
    });
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    resign.GetAllReasonResignAction();
    const updateApprovalResign = () => {
      const data = {
        ID: approvalDetail.value.ID,
        reason: 1,
        date_of_application: approvalDetail.value.date_of_application,
        date: approvalDetail.value.date_aprroval_create,
        desc: approvalDetail.value.desc,
        app_approval_ids: arrApprover.value,
        personnel_id: approvalDetail.value.personnel_id,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
      };
      if (data.app_approval_ids.includes(null)) {
        toast.error("Vui Lòng chọn người duyệt");
      } else {
        isLoading.value = true;
        resign.updateApprovalResignAction({
          data: data,
          router,
          toast,
          EndTimeLoading,
        });
      }
    };
    const formatdate = (date) => {
      return FormatDate(date);
    };
    return {
      isInfor,
      approvalDetail,
      isLoading,
      isApprover,
      reasonFile,
      newFile,
      formatdate,
      removeOldFile,
      updateApprovalResign,
      EndTimeLoading,
      arrApprover,
      ReasonResign,
    };
  },
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    datePicker,
    FieldApprover,
    AttachFileVue,
  },
};
</script>

<style></style>
