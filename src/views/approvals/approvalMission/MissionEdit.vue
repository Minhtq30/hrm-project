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
            <p class="longText">Cập nhật đơn công tác</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div class="text-left px-4 py-2 w-full" v-if="isLoading == false">
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
          <div v-show="isInfor == true">
            <div class="grid grid-cols-4 gap-2 form-small">
              <div class="col-span-1">
                <label for="" class="form-group-label"
                  >Giờ<span class="text-red-600">*</span></label
                >
                <div>
                  <hour-picker
                    v-model="approvalDetail.data.time_start"
                  ></hour-picker>
                </div>
              </div>
              <div class="col-span-3">
                <label for="" class="form-group-label"
                  >Từ ngày<span class="text-red-600">*</span></label
                >
                <div>
                  <date-picker
                    v-model="approvalDetail.data.date_from"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2 form-small">
              <div class="col-span-1">
                <label for="" class="form-group-label"
                  >Giờ<span class="text-red-600">*</span></label
                >
                <div>
                  <hour-picker
                    v-model="approvalDetail.data.time_end"
                  ></hour-picker>
                </div>
              </div>
              <div class="col-span-3">
                <label for="" class="form-group-label"
                  >Đến ngày<span class="text-red-600">*</span></label
                >
                <div>
                  <date-picker
                    v-model="approvalDetail.data.date_to"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="form-small">
              <div class="col-span-1">
                <label for="" class="form-group-label"
                  >Địa điểm<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    v-model="approvalDetail.data.address"
                  />
                </div>
              </div>
            </div>
            <div class="form-small">
              <div class="col-span-1">
                <label for="" class="form-group-label">Lý do công tác</label>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    v-model="approvalDetail.data.reason"
                  />
                </div>
              </div>
            </div>
            <div class="form-small">
              <div class="col-span-1">
                <label for="" class="form-group-label"
                  >Phương tiện công tác</label
                >
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control-input"
                    v-model="approvalDetail.data.travel_by"
                  />
                </div>
              </div>
            </div>
            <div class="form-small">
              <div class="flex">
                <div>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    v-model="approvalDetail.data.is_work_abroad"
                    true-value="1"
                    false-value="0"
                  />
                </div>
                <label for="" class="form-group-label ml-1"
                  >Công tác nước ngoài</label
                >
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
        <!-- <h4
          class="form-section-title form-small cursor-pointer"
          @click="isSurcharge = !isSurcharge"
        >
          <span v-show="isSurcharge == true">
            <i class="fas fa-chevron-down cursor-pointer"></i>
          </span>
          <span v-show="isSurcharge == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Phụ phí công tác
        </h4>
        <Transition name="slide-up">
          <div v-show="isSurcharge == true">
            <div class="form-large">
              <div class="grid grid-cols-7 gap-2 w-full">
                <div class="col-span-5">
                  <label for="" class="form-group-label">Tên phụ phí</label>
                </div>
                <div class="col-span-2">
                  <label for="" class="form-group-label">Số tiền</label>
                </div>
              </div>
            </div>
            <div
              class="flex items-center form-large"
              v-for="(item, index) in jsonDetails"
              :key="index"
            >
              <div class="grid grid-cols-7 gap-2 w-full">
                <div class="col-span-5">
                  <v-select
                    label="name"
                    :options="ReasonMissionActive"
                    :reduce="(mission) => mission.ID"
                    v-model="item.surcharges_type_id"
                  ></v-select>
                </div>
                <div class="col-span-2">
                  <CurrencyInput v-model="item.surcharges_money" />
                </div>
              </div>
              <span @click="removeSurcharge(index)"
                ><i class="fal fa-times icon-close" style="margin-top: 0px"></i
              ></span>
            </div>
            <div class="grid grid-cols-7 gap-2 form-large">
              <div class="col-span-5">
                <span @click="addSurcharge"
                  ><i class="fal fa-plus-circle icon-plus mt-2"></i
                ></span>
              </div>
              <div class="col-span-2 mr-7">
                <input
                  type="text"
                  name=""
                  id=""
                  class="p-3 w-full rounded-lg bg-slate-300/60"
                  placeholder="1,000,000"
                  disabled
                  v-model="totalMission"
                />
              </div>
            </div>
          </div>
        </Transition>
        <div v-show="isSurcharge == false">
          <h2
            @click="isSurcharge = !isSurcharge"
            class="cursor-pointer mt-2 text-sm"
          >
            Đối tượng liên quan, Bản ghi
          </h2>
        </div> -->
        <div class="form-small">
          <label for="" class="form-group-label"
            >Nội dung công việc<span class="text-red-600">*</span></label
          >
          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              class="form-control-input"
              v-model="approvalDetail.data.content"
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
            class="cursor-pointer mt-2 text-sm"
          >
            Người duyệt*
          </h2>
        </div>
      </div>
    </div>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateApprovalMission()">
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
// import CurrencyInput from "@/components/CurrencyInput.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { ref, reactive } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalMission } from "@/store/modules/approval/ApprovalMission";
import { useReasonMission } from "@/store/modules/settingApproval/ReasonMission";
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
    // CurrencyInput,
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
    const isSurcharge = ref(true);
    const isLoading = ref(true);
    const dateFrom = new Date().toISOString().substring(0, 10);
    const dateTo = new Date().toISOString().substring(0, 10);
    const totalMission = ref();
    const total = useApprovalTotal();
    const mission = useApprovalMission();
    const reasonMission = useReasonMission();
    const { ReasonMissionActive } = storeToRefs(reasonMission);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    console.log(approvalDetail);
    const jsonDetails = computed(() => approvalDetail.value.data?.json_details);
    console.log(typeof jsonDetails.value);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    reasonMission.GetAllMissionsAction();
    total.ShowDetailApprovalAction({
      id: route.params.missionID,
      EndTimeLoading,
    });
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const addSurcharge = () => {
      const data = {
        surcharges_type_id: null,
        surcharges_money: null,
      };
      approvalDetail.value.data.json_details.push(data);
    };
    const removeSurcharge = (index) => {
      approvalDetail.value.data.json_details.splice(index, 1);
      changeMission();
    };
    const changeMission = () => {
      let x = approvalDetail.value.data.json_details.reduce(
        (sum, cart) => (sum += cart.surcharges_money),
        0
      );
      x = x.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      });
      totalMission.value = x;
    };
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const updateApprovalMission = () => {
      const data = {
        ID: approvalDetail.value.ID,
        time_start: approvalDetail.value.data.time_start,
        date_from: approvalDetail.value.data.date_from,
        time_end: approvalDetail.value.data.time_end,
        date_to: approvalDetail.value.data.date_to,
        address: approvalDetail.value.data.address,
        reason: approvalDetail.value.data.reason,
        travel_by: approvalDetail.value.data.travel_by,
        is_work_abroad: approvalDetail.value.data.is_work_abroad,
        this_content: approvalDetail.value.data.content,
        json_details: approvalDetail.value.data.json_details,
        app_approval_ids: arrApprover.value,
        personnel_id: approvalDetail.value.personnel_id,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
      };
      if (data.app_approval_ids.includes(null)) {
        toast.error("Vui Lòng chọn người duyệt");
      } else {
        isLoading.value = true;
        mission.updateApprovalMissionAction({
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
      isSurcharge,
      dateFrom,
      dateTo,
      approvalDetail,
      ReasonMissionActive,
      totalMission,
      isLoading,
      arrApprover,
      reasonFile,
      jsonDetails,
      newFile,
      formatdate,
      addSurcharge,
      removeSurcharge,
      changeMission,
      updateApprovalMission,
      removeOldFile,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
