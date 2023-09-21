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
            <p class="longText">Tạo mới đơn làm theo chế độ</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 py-2 h-full w-full format-scroll"
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
                <div
                  class="form-small"
                  v-if="this.$route.path == '/approval-worktime/help'"
                >
                  <field-helper :Helper="worktime"></field-helper>
                </div>
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
                        v-model="worktime.reason"
                      >
                      </v-select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 form-small mt-1">
                    <div class="col-span-1">
                      <label for="" class="form-group-label"
                        >Từ ngày<span class="text-red-600">*</span></label
                      >
                      <div>
                        <date-picker
                          v-model="worktime.date_start"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label for="" class="form-group-label"
                        >Đến ngày<span class="text-red-600">*</span></label
                      >
                      <div>
                        <date-picker v-model="worktime.date_end"></date-picker>
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
                        >Thời gian đi muộn<span class="text-red-600"
                          >*</span
                        ></label
                      >
                      <div class="disabledInput p-3 w-full">
                        <!-- <hour-picker v-model="worktime.late"></hour-picker> -->
                        <i class="far fa-clock"></i>
                        <input
                          type="text"
                          class="pl-[5px]"
                          :value="worktime.late"
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
                        <!-- <hour-picker v-model="worktime.early"></hour-picker> -->
                        <i class="far fa-clock"></i>
                        <input
                          type="text"
                          class="pl-[5px]"
                          :value="worktime.early"
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
                      v-model="worktime.desc"
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
            <Transition>
              <div v-show="isApprover == true">
                <field-approver
                  :ArrayApprover="worktime.app_approval_ids"
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
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="createApprovalWorktime()"
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
// import hourPicker from "@/components/datePicker/hourPicker.vue";
import FieldApprover from "@/components/constant/FieldApprover.vue";
import FieldHelper from "@/components/constant/FieldHelper.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { reactive, ref } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalWorktime } from "@/store/modules/approval/ApprovalWorktime";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
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
    FieldHelper,
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
    const isCreated = ref(false);
    const regime = useApprovalWorktime();
    const setting = useSettingApproval();
    const reasonWorktime = useReasonWorktime();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const { listWorktimes } = storeToRefs(reasonWorktime);
    const { CheckDescApprovalWorktime } = storeToRefs(setting);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    const worktime = reactive({
      personnel_id: null,
      reason: null,
      date_start: null,
      date_end: null,
      late: "00:00",
      early: "00:00",
      desc: "",
      app_approval_ids: [null],
    });
    reasonWorktime.GetAllWorktimesAction();
    if (CheckDescApprovalWorktime.value == null) {
      setting.CheckDescApprovalWorktimeAction();
    }
    const isInfor = ref(true);
    const dateFrom = new Date().toISOString().substring(0, 10);
    const dateTo = new Date().toISOString().substring(0, 10);
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };

    const changeReason = () => {
      if (worktime.reason == 1) {
        worktime.late = "00:30";
        worktime.early = "00:30";
      } else if (worktime.reason == 2) {
        worktime.late = "00:00";
        worktime.early = "01:00";
      } else {
        worktime.late = "01:00";
        worktime.early = "00:00";
      }
    };
    const createApprovalWorktime = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-worktime/help") {
        data = {
          personnel_id: worktime.personnel_id,
          reason: worktime.reason,
          date_start: worktime.date_start,
          date_end: worktime.date_end,
          late: worktime.late,
          early: worktime.early,
          desc: worktime.desc,
          app_approval_ids: worktime.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          reason: worktime.reason,
          date_start: worktime.date_start,
          date_end: worktime.date_end,
          late: worktime.late,
          early: worktime.early,
          desc: worktime.desc,
          app_approval_ids: worktime.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalWorktime.value.value == 1) {
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
            regime.createApprovalWorktimeAction({
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
          regime.createApprovalWorktimeAction({
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
      dateFrom,
      dateTo,
      listWorktimes,
      worktime,
      isLoading,
      newFile,
      formatdate,
      createApprovalWorktime,
      changeReason,
      isCreated,
      CheckDescApprovalWorktime,
      ActivatedButton,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
