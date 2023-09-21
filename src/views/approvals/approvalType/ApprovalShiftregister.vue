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
            <p class="longText">Tạo mới đơn đăng ký ca</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 py-2 w-full h-full format-scroll"
        v-if="isLoading == false"
      >
        <div class="w-full">
          <div class="outer">
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
                  <div
                    class="form-small"
                    v-if="this.$route.path == '/approval-shiftregister/help'"
                  >
                    <field-helper
                      :Helper="approvalShiftresgister"
                    ></field-helper>
                  </div>
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
                        v-model="approvalShiftresgister.repeat_type"
                        :searchable="false"
                      ></v-select>
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-2 gap-2 form-small"
                    v-if="approvalShiftresgister.repeat_type == 'RANGE'"
                  >
                    <div class="col-span-1">
                      <label for="" class="form-group-label"
                        >Từ ngày<span class="text-red-600">*</span></label
                      >
                      <div>
                        <date-picker
                          v-model="range.start"
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
                          v-model="range.end"
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
            <h4
              class="form-section-title form-small cursor-pointer"
              @click="isRelated = !isRelated"
            >
              <span v-show="isRelated == true">
                <i class="fas fa-chevron-down cursor-pointer"></i>
              </span>
              <span v-show="isRelated == false"
                ><i class="fas fa-chevron-right cursor-pointer"></i
              ></span>
              Chi tiết đăng kí ca
            </h4>
            <Transition name="slide-up">
              <div v-show="isRelated == true">
                <div v-if="approvalShiftresgister.repeat_type == 'RANGE'">
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
                    v-for="(item, index) in approvalShiftresgister.details"
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
                            multiple
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
                                  >Ca làm việc: {{ time_start }} -
                                  {{ time_end }}</em
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
                    v-for="(item, index) in approvalShiftresgister.details"
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
                            v-model="item.shift_ids"
                            multiple
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
                                  >Ca làm việc: {{ time_start }} -
                                  {{ time_end }}</em
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
                    <div @click="removeDetails()">
                      <i
                        class="fal fa-times icon-close"
                        style="margin-top: 10px"
                      ></i>
                    </div>
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
                      v-model="approvalShiftresgister.desc"
                    ></textarea>
                  </div>
                </div>
                <attach-file-vue
                  :arrFile="newFile.reason_file_image"
                ></attach-file-vue>
              </div>
            </Transition>
            <div v-show="isRelated == false">
              <h2
                @click="isRelated = !isRelated"
                class="cursor-pointer form-group-label"
              >
                Đối tượng liên quan, Bản ghi
              </h2>
            </div>
          </div>
          <div class="inner">
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
                <field-approver
                  :ArrayApprover="approvalShiftresgister.app_approval_ids"
                ></field-approver>
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
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="createApprovalShiftregister()"
            :class="{ disabledButtonCreated: isCreated }"
          >
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
import FieldHelper from "@/components/constant/FieldHelper.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { reactive, ref } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalShiftresgister } from "@/store/modules/approval/ApprovalShiftresgister";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
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
    FieldHelper,
    AttachFileVue,
  },
  data() {
    return {
      dataType: [
        { value: "NONE", title: "Theo ngày cố định" },
        { value: "RANGE", title: "Theo khoảng ngày" },
      ],
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isInfor = ref(true);
    const isApprover = ref(true);
    const isRelated = ref(true);
    const isLoading = ref(true);
    const isCreated = ref(false);
    const dateShiftregister = new Date().toISOString().substring(0, 10);
    const shiftresgister = useApprovalShiftresgister();
    const setting = useSettingApproval();
    const tk_shift = useShifts();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const { listShifts } = storeToRefs(tk_shift);
    const { CheckDescApprovalShiftRegister } = storeToRefs(setting);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    const range = reactive({
      start: null,
      end: null,
    });
    const multiDate = ref([]);
    const dateTo = ref();
    tk_shift.GetAllShiftsAction();
    if (CheckDescApprovalShiftRegister.value == null) {
      setting.CheckDescApprovalShiftRegisterAction();
    }
    const approvalShiftresgister = reactive({
      repeat_type: "NONE",
      range: range,
      details: [
        {
          date_start: dateShiftregister,
          date_end: null,
          shift_ids: [],
        },
      ],
      desc: "",
      personnel_id: null,
      app_approval_ids: [null],
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
      approvalShiftresgister.details.push(data);
    };
    const removeDetails = (index) => {
      approvalShiftresgister.details.splice(index, 1);
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
      multiDate.value = dateRange(range.start, range.end);
      approvalShiftresgister.details.length = 0;
      for (let i = 0; i < multiDate.value.length; i++) {
        const data = {
          date_start: multiDate.value[i],
          date_end: null,
          shift_ids: null,
        };
        approvalShiftresgister.details.push(data);
      }
    };
    const ChangeShiftresgister = () => {
      approvalShiftresgister.details.length = 1;
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalShiftregister = () => {
      isCreated.value = true;
      let data;
      let arr = [];
      for (let i = 0; i < approvalShiftresgister.details.length; i++) {
        let dateAdd = approvalShiftresgister.details[i].date_start;
        arr.push(dateAdd);
      }
      let max = arr.reduce((prev, curr) => (prev > curr ? prev : curr));
      let min = arr.reduce((prev, curr) => (prev < curr ? prev : curr));
      const range = {
        start: min,
        end: max,
      };
      Object.assign(approvalShiftresgister.range, range);
      if (route.path == "/approval-shiftregister/help") {
        data = {
          repeat_type: approvalShiftresgister.repeat_type,
          details: approvalShiftresgister.details,
          desc: approvalShiftresgister.desc,
          range: approvalShiftresgister.range,
          personnel_id: approvalShiftresgister.personnel_id,
          app_approval_ids: approvalShiftresgister.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          repeat_type: approvalShiftresgister.repeat_type,
          details: approvalShiftresgister.details,
          desc: approvalShiftresgister.desc,
          range: approvalShiftresgister.range,
          app_approval_ids: approvalShiftresgister.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalShiftRegister.value.value == 1) {
        if (data.desc?.length == 0) {
          toast.error("Vui Lòng nhập mô tả");
          setTimeout(() => {
            isCreated.value = false;
          }, 500);
        } else {
          if (data.app_approval_ids.includes(null)) {
            toast.error("Vui Lòng chọn người duyệt");
            setTimeout(() => {
              isCreated.value = false;
            }, 500);
          } else {
            isLoading.value = true;
            shiftresgister.createApprovalShiftresgisterAction({
              dataUrl,
              router,
              toast,
              EndTimeLoading,
              ActivatedButton,
            });
          }
        }
      } else {
        if (data.app_approval_ids.includes(null)) {
          toast.error("Vui Lòng chọn người duyệt");
          setTimeout(() => {
            isCreated.value = false;
          }, 500);
        } else {
          isLoading.value = true;
          shiftresgister.createApprovalShiftresgisterAction({
            dataUrl,
            router,
            toast,
            EndTimeLoading,
            ActivatedButton,
          });
        }
      }
    };
    return {
      isInfor,
      isApprover,
      isRelated,
      range,
      dateShiftregister,
      dateTo,
      isLoading,
      approvalShiftresgister,
      listShifts,
      newFile,
      formatdate,
      createApprovalShiftregister,
      addDetails,
      removeDetails,
      SelectMultiDate,
      dateRange,
      multiDate,
      ChangeShiftresgister,
      CheckDescApprovalShiftRegister,
      isCreated,
      ActivatedButton,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
