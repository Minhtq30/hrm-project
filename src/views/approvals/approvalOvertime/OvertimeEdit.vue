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
            <p class="longText">Cập nhật đơn làm thêm</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div
      class="text-left px-4 py-2 w-full form-plus-over h-full"
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
          Thông tin chung
        </h4>
        <Transition name="slide-up">
          <div v-show="isInfor == true" class="form-plus">
            <div
              class="flex items-center form-plus"
              v-if="approvalDetail.data.details?.length"
            >
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label"
                  >Ngày làm thêm<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label"
                  >Bắt đầu<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label"
                  >Kết thúc<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label">Ca làm việc</label>
              </div>
              <div class="form-mid-xs-small px-1">
                <label for="" class="form-group-label"
                  >Kiểu<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-xs-small px-1">
                <label for="" class="form-group-label"
                  >Chốt<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-x-small px-1">
                <label for="" class="form-group-label"
                  >Địa điểm chấm công</label
                >
              </div>
              <div class="form-x-small px-1">
                <label for="" class="form-group-label">Ghi chú</label>
              </div>
            </div>
            <div
              class="flex items-center mb-2"
              v-for="(item, index) in approvalDetail.data.details"
              :key="index"
            >
              <div class="flex items-center -mt-3 form-plus">
                <div class="form-mid-small px-1">
                  <date-picker v-model="item.date"></date-picker>
                </div>
                <div class="form-mid-small px-1">
                  <hour-picker v-model="item.start_time"></hour-picker>
                </div>
                <div class="form-mid-small px-1">
                  <hour-picker v-model="item.end_time"></hour-picker>
                </div>
                <div class="form-mid-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="disabledInput p-3 w-full"
                    v-model="item.shift_id"
                    disabled
                  />
                </div>
                <div class="form-mid-xs-small px-1">
                  <select
                    name=""
                    id=""
                    class="form-control-select"
                    v-model="item.type"
                  >
                    <option value="0">Tính công</option>
                    <option value="1">Nghỉ bù</option>
                  </select>
                </div>
                <div class="form-mid-xs-small px-1">
                  <select
                    name=""
                    id=""
                    class="form-control-select"
                    v-model="item.is_attendance"
                  >
                    <option value="0">Không</option>
                    <option value="1">Có</option>
                  </select>
                </div>
                <div class="form-x-small px-1">
                  <v-select
                    placeholder="Chọn vị trí định vị"
                    label="title"
                    :options="listGPSLocation"
                    :reduce="(location) => location.ID"
                    v-model="item.gps_location_ids"
                  ></v-select>
                </div>
                <div class="form-x-small px-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    v-model="item.note"
                  />
                </div>
                <div @click="RemoveApprovalOvertime(index)">
                  <i
                    class="fal fa-times icon-close"
                    style="margin-top: 0px"
                  ></i>
                </div>
              </div>
            </div>
            <div>
              <div>
                <span @click="AddApprovalOvertime"
                  ><i class="fal fa-plus-circle icon-plus mt-2"></i
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
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateApprovalOvertime()">
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
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalOvertime } from "@/store/modules/approval/ApprovalOvertime";
import { useGpsLocation } from "@/store/modules/settingTimekeep/gpslocation";
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
    const isInfor = ref(true);
    const isRelated = ref(true);
    const isLoading = ref(true);
    const dateOvertime = new Date().toISOString().substring(0, 10);
    const total = useApprovalTotal();
    const overtime = useApprovalOvertime();
    const gps = useGpsLocation();
    const { listGPSLocation } = storeToRefs(gps);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    gps.GetAllGPSLocationAction();
    total.ShowDetailApprovalAction({
      id: route.params.OvertimeID,
      EndTimeLoading,
    });
    const AddApprovalOvertime = () => {
      const data = {
        date: dateOvertime,
        start_time: "00:00",
        end_time: "00:00",
        shift_id: null,
        type: 0,
        is_attendance: null,
        gps_location_ids: null,
        note: "",
      };
      approvalDetail.value.data.details.push(data);
    };
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const RemoveApprovalOvertime = (index) => {
      approvalDetail.value.data.details.splice(index, 1);
    };
    const updateApprovalOvertime = () => {
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
        overtime.updateApprovalOvertimeAction({
          data: data,
          router,
          toast,
          EndTimeLoading,
        });
      }
    };
    return {
      isInfor,
      isRelated,
      dateOvertime,
      approvalDetail,
      arrApprover,
      listGPSLocation,
      isLoading,
      reasonFile,
      newFile,
      EndTimeLoading,
      removeOldFile,
      AddApprovalOvertime,
      RemoveApprovalOvertime,
      updateApprovalOvertime,
    };
  },
};
</script>

<style></style>
