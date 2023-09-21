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
            <p class="longText">Cập nhật đơn checkin/out</p>
          </div>
        </div></navbar-social
      >
    </template>
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
          <div v-show="isInfor == true" class="form-large-plus">
            <div
              class="form-large-plus flex items-center"
              v-if="approvalDetail.data.details?.length"
            >
              <div class="form-x-small px-1">
                <label for="" class="form-group-label"
                  >Ngày<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-x-small px-1">
                <label for="" class="form-group-label"
                  >Giờ<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label">Ca</label>
              </div>
              <div class="form-small px-1">
                <label for="" class="form-group-label"
                  >Lý do<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-xs-small px-1">
                <label for="" class="form-group-label">Tính công</label>
              </div>
            </div>
            <div
              class="flex items-center -mt-3"
              v-for="(item, index) in approvalDetail.data?.details"
              :key="index"
            >
              <div class="form-large-plus flex items-center">
                <div class="form-x-small px-1">
                  <date-picker v-model="item.date"></date-picker>
                </div>
                <div class="form-x-small px-1">
                  <hour-picker v-model="item.time"></hour-picker>
                </div>
                <div class="form-mid-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="disabledInput p-3 w-full"
                    disabled
                  />
                </div>
                <div class="form-small px-1">
                  <v-select
                    label="title"
                    :options="ReasonInoutActive"
                    :reduce="(inout) => inout.ID"
                    @option:selected="changeInputInout($event, index)"
                    placeholder="Chọn lý do"
                    v-model="item.reason"
                  >
                    <template #option="{ title, max_time, unit }">
                      <div class="flex flex-col-reverse">
                        <em>{{ formatType(max_time, unit) }}</em>
                        <strong>{{ title }}</strong>
                      </div>
                    </template></v-select
                  >
                </div>
                <div class="form-mid-xs-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="disabledInput p-3 w-full"
                    v-model="item.has_attendance"
                    disabled
                  />
                </div>
                <div @click="removeApprovalInout(index)">
                  <i
                    class="fal fa-times icon-close"
                    style="margin-top: 0px"
                  ></i>
                </div>
              </div>
            </div>
            <div @click="addApprovalInout">
              <i class="fal fa-plus-circle icon-plus"></i>
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
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateApprovalCheckinout()">
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
import hourPicker from "@/components/datePicker/hourPicker.vue";
import FieldApprover from "@/components/constant/FieldApprover.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { ref, reactive } from "vue";
import { FormatTrueFalse } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalCheckinout } from "@/store/modules/approval/ApprovalCheckinout";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useReasonInout } from "@/store/modules/settingApproval/ReasonInout";
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
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const isInfor = ref(true);
    const checkinout = useApprovalCheckinout();
    const total = useApprovalTotal();
    const reasonInout = useReasonInout();
    const { ReasonInoutActive, typeInout } = storeToRefs(reasonInout);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const dateInout = new Date().toISOString().substring(0, 10);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    reasonInout.GetAllInoutAction();
    total.ShowDetailApprovalAction({
      id: route.params.inoutID,
      EndTimeLoading,
    });
    const addApprovalInout = () => {
      const data = {
        date: dateInout,
        time: "00:00",
        reason: null,
        has_attendance: null,
      };
      approvalDetail.value.data.details.push(data);
    };
    const removeApprovalInout = (index) => {
      approvalDetail.value.data.details.splice(index, 1);
    };
    const changeInputInout = (event, index) => {
      approvalDetail.value.data.details[index].has_attendance = FormatTrueFalse(
        event.has_attendance
      );
    };
    const formatType = (time, type) => {
      const arr = typeInout.value.find((item) => item.value == type);
      if (arr) {
        if (time == null) {
          return "Không giới hạn";
        } else {
          return "Tối đa" + " " + time + " lần / " + arr.name;
        }
      } else {
        return "";
      }
    };
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const updateApprovalCheckinout = () => {
      const data = {
        ID: approvalDetail.value.ID,
        details: approvalDetail.value.data.details,
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
        checkinout.updateApprovalCheckinoutAction({
          data: data,
          router,
          toast,
          EndTimeLoading,
        });
      }
    };
    return {
      ReasonInoutActive,
      isInfor,
      dateInout,
      approvalDetail,
      typeInout,
      arrApprover,
      isLoading,
      newFile,
      reasonFile,
      formatType,
      addApprovalInout,
      removeApprovalInout,
      changeInputInout,
      updateApprovalCheckinout,
      removeOldFile,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
