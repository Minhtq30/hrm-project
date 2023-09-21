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
            <p class="longText">Cập nhật đơn tăng ca</p>
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
                  >Ngày tăng ca<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-x-small px-1">
                <label for="" class="form-group-label">Ca được phân</label>
              </div>
              <div class="form-extra-small px-1">
                <label for="" class="form-group-label"
                  >Ca tăng<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label"
                  >Kiểu<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label"
                  >Yêu cầu chốt<span class="text-red-600">*</span></label
                >
              </div>
              <div class="form-x-small px-1">
                <label for="" class="form-group-label">Lý do</label>
              </div>
            </div>
            <div
              class="flex items-center form-plus -mt-3"
              v-for="(item, index) in approvalDetail.data.details"
              :key="index"
            >
              <div class="form-mid-small px-1">
                <date-picker
                  v-model="item.date"
                  :SelectMultiDate="SelectMultiDate"
                ></date-picker>
              </div>
              <div class="form-mid-small px-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="disabledInput p-3 w-full"
                  :value="formatShift(index)"
                  disabled
                />
              </div>
              <div class="form-extra-small px-1">
                <v-select
                  label="title"
                  :options="listShifts"
                  :reduce="(shift) => shift.ID"
                  placeholder="Chọn ca"
                  v-model="item.shift_ids"
                  ><template
                    #option="{
                      title,
                      time_start,
                      time_end,
                      time_break_start,
                      time_break_end,
                    }"
                  >
                    <div style="align-items: baseline" class="flex flex-col">
                      <strong>{{ title }}</strong>
                      <em class="text-xs"
                        >Ca làm việc: {{ time_start }} - {{ time_end }}</em
                      >
                      <em class="text-xs" v-if="time_break_start"
                        >Nghỉ trưa: {{ time_break_start }} -
                        {{ time_break_end }}</em
                      >
                    </div>
                  </template></v-select
                >
              </div>
              <div class="form-mid-small px-1">
                <v-select
                  label="title"
                  :options="dataModel"
                  :reduce="(model) => model.value"
                  placeholder="Chọn kiểu"
                  v-model="item.type"
                  :searchable="false"
                ></v-select>
              </div>
              <div class="form-mid-small px-1">
                <v-select
                  label="title"
                  :options="dataType"
                  :reduce="(type) => type.value"
                  placeholder="Chọn kiểu"
                  v-model="item.is_attendance"
                  :searchable="false"
                ></v-select>
              </div>
              <div class="form-x-small px-1">
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  v-model="item.reason"
                />
              </div>

              <div>
                <i
                  class="fal fa-times icon-close mr-5"
                  style="margin-top: 0px"
                  @click="removeApprovalShiftmore(index)"
                ></i>
              </div>
            </div>
            <div>
              <span @click="addApprovalShiftmore"
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
        <div class="form-small">
          <label for="" class="form-group-label"
            >Mô tả<span class="text-red-600">*</span></label
          >
          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              class="form-control-input"
              v-model="approvalDetail.data.desc"
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
          <button class="button-modal" @click="updateApprovalShiftmore()">
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
import { ref, computed, reactive } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalShiftmore } from "@/store/modules/approval/ApprovalShiftmore";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { storeToRefs } from "pinia";
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
      isApprover: true,
      dataType: [
        { value: 0, title: "Không" },
        { value: 1, title: "Có" },
      ],
      dataModel: [
        {
          value: 0,
          title: "Tính công",
        },
        {
          value: 1,
          title: "Nghỉ bù",
        },
      ],
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isInfor = ref(true);
    const isRelated = ref(true);
    const dateShiftMore = new Date().toISOString().substring(0, 10);
    const isLoading = ref(true);
    const total = useApprovalTotal();
    const shiftmore = useApprovalShiftmore();
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const { ShitUserByDay } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const personnelShiftID = computed(
      () => ShitUserByDay.value.personnel_shifts.ID
    );
    const approvalDetailData = computed(() => approvalDetail.value.data);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    tk_shift.GetAllShiftsAction();
    total.ShowDetailApprovalAction({
      id: route.params.shiftmoreID,
      EndTimeLoading,
    });
    const dataShift = ref();
    dataShift.value = {
      personnel_id: localStorage.getItem("personnelID"),
      date: dateShiftMore,
    };
    total.GetShitUserByDayAction(dataShift.value);
    const addApprovalShiftmore = () => {
      const data = {
        date: dateShiftMore,
        shift_id_current: null,
        shift_ids: null,
        type: 0,
        is_attendance: 0,
        reason: "",
      };
      approvalDetail.value.data.details.push(data);
    };
    const removeApprovalShiftmore = (index) => {
      approvalDetail.value.data.details.splice(index, 1);
    };
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    console.log(approvalDetail);
    console.log(ShitUserByDay.value?.shift_code);
    const SelectMultiDate = (e) => {
      dataShift.value = {
        personnel_id: localStorage.getItem("personnelID"),
        date: e.id,
      };
      total.GetShitUserByDayAction(dataShift.value);
    };
    const formatShift = (index) => {
      if (ShitUserByDay.value) {
        approvalDetail.value.data.details[index].shift_id_current =
          personnelShiftID;
        return ShitUserByDay.value?.shift_code;
      } else {
        approvalDetail.value.data.details[index].shift_id_current = null;
        return "Không có ca";
      }
    };
    const updateApprovalShiftmore = () => {
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
        shiftmore.updateApprovalShiftmoreAction({
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
      dateShiftMore,
      listShifts,
      isLoading,
      arrApprover,
      approvalDetail,
      reasonFile,
      newFile,
      ShitUserByDay,
      personnelShiftID,
      approvalDetailData,
      dataShift,
      SelectMultiDate,
      formatShift,
      removeOldFile,
      formatdate,
      addApprovalShiftmore,
      removeApprovalShiftmore,
      updateApprovalShiftmore,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
