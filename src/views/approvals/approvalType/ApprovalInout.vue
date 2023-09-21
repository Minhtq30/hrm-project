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
            <p class="longText">Tạo mới đơn checkin/out</p>
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
              <span @click="isInfor = !isInfor" v-show="isInfor == false"
                ><i class="fas fa-chevron-right cursor-pointer"></i
              ></span>
              Thông tin đơn
            </h4>
            <Transition name="slide-up">
              <div v-show="isInfor == true" class="form-large-plus">
                <div
                  class="form-small"
                  v-if="this.$route.path == '/approval-inout/help'"
                >
                  <field-helper :Helper="ApprovalInout"></field-helper>
                </div>
                <div
                  class="form-large-plus flex items-center"
                  v-if="ApprovalInout.details?.length"
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
                  v-for="(item, index) in ApprovalInout.details"
                  :key="index"
                >
                  <div class="form-large-plus flex items-center">
                    <div class="form-x-small px-1">
                      <date-picker
                        v-model="item.date"
                        :SelectMultiDate="SelectMultiDate"
                      ></date-picker>
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
                        :value="shiftListCode"
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
                        :searchable="false"
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
                <div>
                  <span @click="addApprovalInout"
                    ><i class="fal fa-plus-circle icon-plus"></i
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
                  v-model="ApprovalInout.desc"
                ></textarea>
              </div>
            </div>
            <attach-file-vue
              :arrFile="newFile.reason_file_image"
            ></attach-file-vue>
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
                  :ArrayApprover="ApprovalInout.app_approval_ids"
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
            @click="createApprovalCheckinout()"
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
import hourPicker from "@/components/datePicker/hourPicker.vue";
import FieldApprover from "@/components/constant/FieldApprover.vue";
import FieldHelper from "@/components/constant/FieldHelper.vue";
import { reactive, ref } from "vue";
import { FormatTrueFalse } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalCheckinout } from "@/store/modules/approval/ApprovalCheckinout";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { useReasonInout } from "@/store/modules/settingApproval/ReasonInout";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    datePicker,
    hourPicker,
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
    const total = useApprovalTotal();
    const checkinout = useApprovalCheckinout();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const isInfor = ref(true);
    const isApprover = ref(true);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const setting = useSettingApproval();
    const { CheckDescApprovalInout } = storeToRefs(setting);
    const reasonInout = useReasonInout();
    const { ReasonInoutActive, typeInout } = storeToRefs(reasonInout);
    const dateInout = new Date().toISOString().substring(0, 10);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    reasonInout.GetAllInoutAction();
    if (CheckDescApprovalInout.value == null) {
      setting.CheckDescApprovalInoutAction();
    }
    const dataShift = ref();
    dataShift.value = {
      personnel_id: localStorage.getItem("personnelID"),
      date: dateInout,
    };
    total.GetShitUserByDayAction(dataShift.value);
    const { ShitUserByDay } = storeToRefs(total);
    const shiftListCode = computed(() =>
      ShitUserByDay.value != null
        ? ShitUserByDay.value.shift_code
        : "Không có ca"
    );
    const ApprovalInout = reactive({
      details: [
        {
          date: dateInout,
          time: "00:00",
          reason: null,
          has_attendance: null,
        },
      ],
      desc: "",
      personnel_id: null,
      app_approval_ids: [null],
    });
    const addApprovalInout = () => {
      const data = {
        date: dateInout,
        time: "00:00",
        reason: null,
        has_attendance: null,
      };
      ApprovalInout.details.push(data);
    };
    const removeApprovalInout = (index) => {
      ApprovalInout.details.splice(index, 1);
    };
    const changeInputInout = (event, index) => {
      ApprovalInout.details[index].has_attendance = FormatTrueFalse(
        event.has_attendance
      );
    };
    // const formatShift = () => {
    //   if (shiftListCode.value) {
    //     return shiftListCode.value;
    //   } else {
    //     return "Không có ca";
    //   }
    // };
    const SelectMultiDate = (e) => {
      dataShift.value = {
        personnel_id: localStorage.getItem("personnelID"),
        date: e.id,
      };
      total.GetShitUserByDayAction(dataShift.value);
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
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalCheckinout = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-inout/me") {
        data = {
          details: ApprovalInout.details,
          desc: ApprovalInout.desc,
          app_approval_ids: ApprovalInout.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          details: ApprovalInout.details,
          desc: ApprovalInout.desc,
          personnel_id: ApprovalInout.personnel_id,
          app_approval_ids: ApprovalInout.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      let isReason = true;
      data.details.map((item) => {
        if (item.reason == null) {
          isReason = false;
        } else {
          isReason = true;
        }
      });
      if (CheckDescApprovalInout.value.value == 1) {
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
          } else if (!isReason) {
            toast.error("Vui Lòng chọn lý do");
            setTimeout(() => {
              isCreated.value = false;
            }, 500);
          } else {
            isLoading.value = true;
            checkinout.createApprovalCheckinoutAction({
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
          checkinout.createApprovalCheckinoutAction({
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
      ReasonInoutActive,
      isInfor,
      isApprover,
      dateInout,
      isLoading,
      ApprovalInout,
      typeInout,
      dataShift,
      ShitUserByDay,
      newFile,
      shiftListCode,
      SelectMultiDate,
      formatType,
      addApprovalInout,
      removeApprovalInout,
      changeInputInout,
      createApprovalCheckinout,
      isCreated,
      ActivatedButton,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
