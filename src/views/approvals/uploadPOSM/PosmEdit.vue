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
            <p class="longText">Cập nhật Posm</p>
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
          <div class="mt-2 form-small">
            <label for="" class="form-group-label"
              >Tiêu đề<span class="text-red-600">*</span></label
            >
            <div>
              <input
                name=""
                id=""
                cols="30"
                rows="5"
                class="form-control-input"
                v-model="approvalDetail.title"
              />
            </div>
          </div>
          <div class="form-mid-small px-1">
            <label for="" class="form-group-label"
              >Ngày đăng<span class="text-red-600">*</span></label
            >
            <date-picker v-model="date_start"></date-picker>
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
                v-model="approvalDetail.desc"
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
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updatecreateUploadPosm()">
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
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { ref, reactive } from "vue";
import { FormatTrueFalse } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { useUploadPosm } from "@/store/modules/approval/ApprovalPosm";
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
    AttachFileVue,
  },

  mounted() {
    const route = useRoute();
    const total = useApprovalTotal();
    const isLoading = ref(true);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    total.ShowDetailApprovalAction({
      id: route.params.idPosm,
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
    const posm = useUploadPosm();
    const multiFile = ref([]);
    const AnnualLeave = ref(false);
    const reasonLeave = useReasonLeave();
    const total = useApprovalTotal();
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const { ReasonLeavesActive, typeDay } = storeToRefs(reasonLeave);
    const date_start = computed(() => approvalDetail.value.date);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    total.ShowDetailApprovalAction({
      id: route.params.idPosm,
      EndTimeLoading,
    });
    if (ReasonLeavesActive.value.length == 0) {
      reasonLeave.GetAllLeavesAction();
    }
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const formatTrueFalse = (status) => {
      return FormatTrueFalse(status);
    };
    const updatecreateUploadPosm = () => {
      const data = {
        title: approvalDetail.value.title,
        desc: approvalDetail.value.desc,
        date: approvalDetail.value.date,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
        reason_file: [],
      };
      posm.updateUploadPosmAction({ data: data, router, route, toast });
    };
    return {
      isInfor,
      isLoading,
      date_start,
      AnnualLeave,
      multiFile,
      ReasonLeavesActive,
      typeDay,
      approvalDetail,
      arrApprover,
      has_attendance,
      reasonFile,
      newFile,
      removeOldFile,
      formatTrueFalse,
      updatecreateUploadPosm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
