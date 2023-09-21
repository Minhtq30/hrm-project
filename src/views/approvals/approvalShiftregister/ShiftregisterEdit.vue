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
            <p class="longText">Cập nhật đơn đăng ký ca</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div class="text-left px-4 py-2 w-full h-full" v-if="isLoading == false">
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
            <div class="mt-2">
              <div class="form-small">
                <label for="" class="form-group-label"
                  >Kiểu đăng kí<span class="text-red-600">*</span></label
                >
                <div>
                  <v-select
                    label="title"
                    :options="dataType"
                    :reduce="(type) => type.value"
                    placeholder="Chọn kiểu đăng kí"
                    v-model="approvalDetail.data.repeat_type"
                    :searchable="false"
                  ></v-select>
                </div>
              </div>
              <div
                class="grid grid-cols-2 gap-2 form-small"
                v-if="approvalDetail.data?.repeat_type == 'RANGE'"
              >
                <div class="col-span-1">
                  <label for="" class="form-group-label"
                    >Từ ngày<span class="text-red-600">*</span></label
                  >
                  <div>
                    <date-picker
                      v-model="approvalDetail.data.date_start"
                      :SelectMultiDate="SelectMultiDate"
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
                      :SelectMultiDate="SelectMultiDate"
                    ></date-picker>
                  </div>
                </div>
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
        <h4 class="form-section-title form-small">
          <span v-show="isRelated == true" @click="isRelated = !isRelated">
            <i class="fas fa-chevron-down cursor-pointer"></i>
          </span>
          <span @click="isRelated = !isRelated" v-show="isRelated == false"
            ><i class="fas fa-chevron-right cursor-pointer"></i
          ></span>
          Chi tiết đăng kí ca
        </h4>
        <div v-show="isRelated == true">
          <div v-if="approvalDetail.data?.repeat_type == 'RANGE'">
            <div class="grid grid-cols-7 gap-2 form-small">
              <div class="col-span-2">
                <label for="" class="form-group-label"
                  >Ngày<span class="text-red-600">*</span></label
                >
              </div>
              <div class="col-span-5">
                <label for="" class="form-group-label"
                  >Ca<span class="text-red-600">*</span></label
                >
              </div>
            </div>
            <div
              v-for="(item, index) in approvalDetail.data.details"
              :key="index"
            >
              <div class="grid grid-cols-7 gap-2 form-small">
                <div class="col-span-2">
                  <div>
                    <date-picker v-model="item.date_start"></date-picker>
                  </div>
                </div>
                <div class="col-span-5">
                  <div>
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
                        <div
                          style="align-items: baseline"
                          class="flex flex-col"
                        >
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
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="grid grid-cols-7 gap-2 form-small">
              <div class="col-span-2">
                <label for="" class="form-group-label"
                  >Ngày<span class="text-red-600">*</span></label
                >
              </div>
              <div class="col-span-5">
                <label for="" class="form-group-label"
                  >Ca<span class="text-red-600">*</span></label
                >
              </div>
            </div>
            <div
              class="flex items-center form-small"
              v-for="(item, index) in approvalDetail.data.details"
              :key="index"
            >
              <div class="grid grid-cols-7 gap-2 w-full">
                <div class="col-span-2">
                  <div>
                    <date-picker v-model="item.date_start"></date-picker>
                  </div>
                </div>
                <div class="col-span-5">
                  <div>
                    <v-select
                      label="title"
                      :options="listShifts"
                      :reduce="(shift) => shift.ID"
                      placeholder="Chọn ca"
                      multiple
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
                        <div
                          style="align-items: baseline"
                          class="flex flex-col"
                        >
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
                </div>
              </div>
              <span @click="removeDetails(index)"
                ><i class="fal fa-times icon-close" style="margin-top: 0px"></i
              ></span>
            </div>
            <div>
              <span @click="addDetails()"
                ><i class="fal fa-plus-circle icon-plus"></i
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
        <div v-show="isRelated == false">
          <h2
            @click="isRelated = !isRelated"
            class="cursor-pointer form-group-label"
          >
            Đối tượng liên quan, Bản ghi
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
          <button class="button-modal" @click="updateApprovalShiftregister()">
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
import FieldApprover from "@/components/constant/FieldApprover.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { ref, computed, reactive } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalShiftresgister } from "@/store/modules/approval/ApprovalShiftresgister";
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
      dataType: [
        { value: "NONE", title: "Theo ngày cố định" },
        { value: "RANGE", title: "Theo khoảng ngày" },
      ],
      isApprover: true,
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isInfor = ref(true);
    const isRelated = ref(true);
    const dateShiftregister = new Date().toISOString().substring(0, 10);
    const isLoading = ref(true);
    const multiDate = ref([]);
    const dateTo = ref();
    const shiftresgister = useApprovalShiftresgister();
    const total = useApprovalTotal();
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    tk_shift.GetAllShiftsAction();
    total.ShowDetailApprovalAction({
      id: route.params.shiftresgisterID,
      EndTimeLoading,
    });
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const addDetails = () => {
      const data = {
        date_start: dateShiftregister,
        date_end: null,
        shift_ids: null,
      };
      approvalDetail.value.data.details.push(data);
    };
    const removeDetails = (index) => {
      approvalDetail.value.data.details.splice(index, 1);
    };
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const updateApprovalShiftregister = () => {
      const data = {
        repeat_type: approvalDetail.value.data.repeat_type,
        details: approvalDetail.value.data.details,
        desc: approvalDetail.value.desc,
        ID: approvalDetail.value.ID,
        app_approval_ids: arrApprover.value,
        personnel_id: approvalDetail.value.personnel_id,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
      };
      if (data.app_approval_ids.includes(null)) {
        toast.error("Vui Lòng chọn người duyệt");
      } else {
        isLoading.value = true;
        shiftresgister.updateApprovalShiftresgisterAction({
          data: data,
          router,
          toast,
          EndTimeLoading,
        });
      }
    };
    const dateRange = (startDate, endDate, steps = 1) => {
      const dateArray = [];
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate).toISOString().substring(0, 10));
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }

      return dateArray;
    };
    const SelectMultiDate = () => {
      multiDate.value = dateRange(
        approvalDetail.value.data.date_start,
        approvalDetail.value.data.date_end
      );
      approvalDetail.value.data.details.length = 0;
      for (let i = 0; i < multiDate.value.length; i++) {
        const data = {
          date_start: multiDate.value[i],
          date_end: null,
          shift_ids: null,
        };
        approvalDetail.value.data.details.push(data);
      }
    };
    const ChangeShiftresgister = () => {
      approvalDetail.value.details.length = 1;
    };
    return {
      approvalDetail,
      listShifts,
      isInfor,
      isRelated,
      dateShiftregister,
      dateTo,
      multiDate,
      isLoading,
      arrApprover,
      reasonFile,
      newFile,
      formatdate,
      removeOldFile,
      updateApprovalShiftregister,
      addDetails,
      removeDetails,
      SelectMultiDate,
      dateRange,
      ChangeShiftresgister,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
