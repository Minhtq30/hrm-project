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
            <p class="longText">Tạo mới đơn tăng ca</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 py-2 w-full h-full form-plus-over format-scroll"
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
              <div v-show="isInfor == true" class="form-plus">
                <div
                  class="form-small"
                  v-if="this.$route.path == '/approval-shiftmore/help'"
                >
                  <field-helper :Helper="approvalShiftmore"></field-helper>
                </div>
                <div
                  class="flex items-center form-plus"
                  v-if="approvalShiftmore.details?.length"
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
                  v-for="(item, index) in approvalShiftmore.details"
                  :key="index"
                >
                  <div class="form-mid-small px-1">
                    <date-picker
                      v-model="item.date"
                      :SelectMultiDate="SelectMultiDate"
                    ></date-picker>
                  </div>
                  <div class="form-x-small px-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput p-3 w-full"
                      disabled
                      :value="formatShift(index)"
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
                  <i
                    class="fal fa-plus-circle icon-plus"
                    @click="addApprovalShiftmore"
                  ></i>
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
                      v-model="approvalShiftmore.desc"
                    ></textarea>
                  </div>
                </div>
                <attach-file-vue
                  :arrFile="newFile.reason_file_image"
                ></attach-file-vue>
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
                  :ArrayApprover="approvalShiftmore.app_approval_ids"
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
            @click="createApprovalShiftmore()"
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
import { reactive, ref, computed } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalShiftmore } from "@/store/modules/approval/ApprovalShiftmore";
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
        { value: 0, title: "Không" },
        { value: 1, title: "Có" },
      ],
      dataModel: [
        {
          value: 0,
          title: "Nghỉ bù",
        },
        {
          value: 1,
          title: "Tính công",
        },
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
    const dateShiftMore = new Date().toISOString().substring(0, 10);
    const isLoading = ref(true);
    const isCreated = ref(false);
    const total = useApprovalTotal();
    const shiftmore = useApprovalShiftmore();
    const setting = useSettingApproval();
    const tk_shift = useShifts();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const { listShifts } = storeToRefs(tk_shift);
    const { CheckDescApprovalShiftMore } = storeToRefs(setting);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    tk_shift.GetAllShiftsAction();
    if (CheckDescApprovalShiftMore.value == null) {
      setting.CheckDescApprovalShiftMoreAction();
    }
    const dataShift = ref();
    dataShift.value = {
      personnel_id: localStorage.getItem("personnelID"),
      date: dateShiftMore,
    };
    total.GetShitUserByDayAction(dataShift.value);
    const { ShitUserByDay } = storeToRefs(total);
    const personnelShiftID = computed(
      () => ShitUserByDay.value.personnel_shifts.ID
    );
    const approvalShiftmore = reactive({
      desc: "",
      personnel_id: null,
      details: [
        {
          date: dateShiftMore,
          shift_id_current: personnelShiftID,
          shift_ids: null,
          type: 1,
          is_attendance: 0,
          reason: "",
        },
      ],
      app_approval_ids: [null],
    });
    const addApprovalShiftmore = () => {
      const data = {
        date: dateShiftMore,
        shift_id_current: personnelShiftID,
        shift_ids: null,
        type: 1,
        is_attendance: 0,
        reason: "",
      };
      approvalShiftmore.details.push(data);
    };
    const removeApprovalShiftmore = (index) => {
      approvalShiftmore.details.splice(index, 1);
    };
    const SelectMultiDate = (e) => {
      dataShift.value = {
        personnel_id: localStorage.getItem("personnelID"),
        date: e.id,
      };
      total.GetShitUserByDayAction(dataShift.value);
    };
    const formatShift = (index) => {
      if (ShitUserByDay.value) {
        approvalShiftmore.details[index].shift_id_current = personnelShiftID;
        return ShitUserByDay.value?.shift_code;
      } else {
        approvalShiftmore.details[index].shift_id_current = null;
        return "Không có ca";
      }
    };
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalShiftmore = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-shiftmore/me") {
        data = {
          desc: approvalShiftmore.desc,
          details: approvalShiftmore.details,
          app_approval_ids: approvalShiftmore.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          personnel_id: approvalShiftmore.personnel_id,
          desc: approvalShiftmore.desc,
          details: approvalShiftmore.details,
          app_approval_ids: approvalShiftmore.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalShiftMore.value.value == 1) {
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
            shiftmore.createApprovalShiftmoreAction({
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
          shiftmore.createApprovalShiftmoreAction({
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
      dateShiftMore,
      listShifts,
      isLoading,
      ShitUserByDay,
      dataShift,
      newFile,
      personnelShiftID,
      SelectMultiDate,
      formatShift,
      formatdate,
      addApprovalShiftmore,
      removeApprovalShiftmore,
      EndTimeLoading,
      approvalShiftmore,
      createApprovalShiftmore,
      CheckDescApprovalShiftMore,
      isCreated,
      ActivatedButton,
    };
  },
};
</script>

<style></style>
