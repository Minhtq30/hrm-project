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
            <p class="longText">Tạo mới đơn làm thêm</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 w-full h-full form-plus-over format-scroll"
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
                  v-if="this.$route.path == '/approval-overtime/help'"
                >
                  <field-helper :Helper="approvalOvertime"></field-helper>
                </div>
                <div
                  class="flex items-center form-plus"
                  v-if="approvalOvertime.details?.length"
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
                  class="flex items-center"
                  v-for="(item, index) in approvalOvertime.details"
                  :key="index"
                >
                  <div class="flex items-center -mt-3 form-plus">
                    <div class="form-mid-small px-1">
                      <date-picker
                        v-model="item.date"
                        :SelectMultiDate="SelectMultiDate"
                      ></date-picker>
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
                        :value="formatShift(index)"
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
                  <span @click="AddApprovalOvertime"
                    ><i class="fal fa-plus-circle icon-plus"></i
                  ></span>
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
                      v-model="approvalOvertime.desc"
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
                class="cursor-pointer mt-2 text-sm"
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
                  :ArrayApprover="approvalOvertime.app_approval_ids"
                ></field-approver>
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
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="createApprovalOvertime()"
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
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalOvertime } from "@/store/modules/approval/ApprovalOvertime";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { useGpsLocation } from "@/store/modules/settingTimekeep/gpslocation";
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
    const isInfor = ref(true);
    const isRelated = ref(true);
    const dateOvertime = new Date().toISOString().substring(0, 10);
    const isLoading = ref(true);
    const isApprover = ref(true);
    const isCreated = ref(false);
    const total = useApprovalTotal();
    const overtime = useApprovalOvertime();
    const profile = useUserProfile();
    const setting = useSettingApproval();
    const gps = useGpsLocation();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const { listGPSLocation } = storeToRefs(gps);
    const { CheckDescApprovalOvertime } = storeToRefs(setting);
    const { userProfile } = storeToRefs(profile);
    setTimeout(() => {
      isLoading.value = false;
    }, 600);
    if (CheckDescApprovalOvertime.value == null) {
      setting.CheckDescApprovalOvertimeAction();
    }
    gps.GetAllGPSLocationAction();
    const dataShift = ref();
    dataShift.value = {
      personnel_id: localStorage.getItem("personnelID"),
      date: dateOvertime,
    };
    total.GetShitUserByDayAction(dataShift.value);
    const { ShitUserByDay } = storeToRefs(total);
    const approvalOvertime = reactive({
      desc: "",
      personnel_id: null,
      details: [
        {
          date: dateOvertime,
          start_time: "00:00",
          end_time: "00:00",
          shift_id: null,
          type: 0,
          is_attendance: 0,
          gps_location_ids: null,
          note: "",
        },
      ],
      app_approval_ids: [null],
    });
    const AddApprovalOvertime = () => {
      const data = {
        date: dateOvertime,
        start_time: "00:00",
        end_time: "00:00",
        shift_id: null,
        type: 0,
        is_attendance: 0,
        gps_location_ids: null,
        note: "",
      };
      approvalOvertime.details.push(data);
    };
    const RemoveApprovalOvertime = (index) => {
      approvalOvertime.details.splice(index, 1);
    };
    const SelectMultiDate = (e) => {
      dataShift.value = {
        personnel_id: userProfile.value.personnel_id,
        date: e.id,
      };
      total.GetShitUserByDayAction(dataShift.value);
    };
    const formatShift = (index) => {
      approvalOvertime.details[index].shift_id =
        ShitUserByDay.value?.shift_code;
      if (ShitUserByDay.value?.shift_code) {
        return approvalOvertime.details[index].shift_id;
      } else {
        return "Không có ca";
      }
    };

    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalOvertime = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-overtime/help") {
        data = {
          personnel_id: approvalOvertime.personnel_id,
          desc: approvalOvertime.desc,
          details: approvalOvertime.details,
          app_approval_ids: approvalOvertime.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          desc: approvalOvertime.desc,
          details: approvalOvertime.details,
          app_approval_ids: approvalOvertime.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalOvertime.value.value == 1) {
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
            overtime.createApprovalOvertimeAction({
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
          overtime.createApprovalOvertimeAction({
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
      isRelated,
      dateOvertime,
      approvalOvertime,
      isLoading,
      isCreated,
      ActivatedButton,
      AddApprovalOvertime,
      RemoveApprovalOvertime,
      createApprovalOvertime,
      listGPSLocation,
      isApprover,
      CheckDescApprovalOvertime,
      userProfile,
      dataShift,
      ShitUserByDay,
      newFile,
      SelectMultiDate,
      formatShift,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
