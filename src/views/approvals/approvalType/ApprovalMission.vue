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
            <p class="longText">Tạo mới đơn công tác</p>
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
                <div
                  class="form-small"
                  v-if="this.$route.path == '/approval-mission/help'"
                >
                  <field-helper :Helper="approvalMission"></field-helper>
                </div>
                <div class="grid grid-cols-4 gap-2 form-small">
                  <div class="col-span-1">
                    <label for="" class="form-group-label"
                      >Giờ<span class="text-red-600">*</span></label
                    >
                    <div>
                      <hour-picker
                        v-model="approvalMission.time_start"
                      ></hour-picker>
                    </div>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label"
                      >Từ ngày<span class="text-red-600">*</span></label
                    >
                    <div>
                      <date-picker
                        v-model="approvalMission.date_from"
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
                        v-model="approvalMission.time_end"
                      ></hour-picker>
                    </div>
                  </div>
                  <div class="col-span-3">
                    <label for="" class="form-group-label"
                      >Đến ngày<span class="text-red-600">*</span></label
                    >
                    <div>
                      <date-picker
                        v-model="approvalMission.date_to"
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
                        v-model="approvalMission.address"
                        placeholder="Nhập địa điểm"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-small">
                  <div class="col-span-1">
                    <label for="" class="form-group-label"
                      >Lý do công tác</label
                    >
                    <div>
                      <input
                        type="text"
                        name=""
                        id=""
                        class="form-control-input"
                        v-model="approvalMission.reason"
                        placeholder="Nhập lý do công tác"
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
                        v-model="approvalMission.travel_by"
                        placeholder="Nhập tên phương tiện"
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
                        v-model="approvalMission.is_work_abroad"
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
              <h2
                @click="isInfor = !isInfor"
                class="cursor-pointer form-group-label"
              >
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
                  v-for="(item, index) in approvalMission.json_details"
                  :key="index"
                >
                  <div class="grid grid-cols-7 gap-2 w-full">
                    <div class="col-span-5">
                      <v-select
                        label="name"
                        :options="ReasonMissionActive"
                        :reduce="(mission) => mission.ID"
                        v-model="item.surcharges_type_id"
                        placeholder="Chọn phụ phí"
                      ></v-select>
                    </div>
                    <div class="col-span-2">
                      <input
                        type="number"
                        name=""
                        id=""
                        class="form-control-input"
                        placeholder="1,000,000"
                        v-model="item.surcharges_money"
                        @input="changeMission"
                      />
                    </div>
                  </div>
                  <span @click="removeSurcharge(index)"
                    ><i
                      class="fal fa-times icon-close"
                      style="margin-top: 15px"
                    ></i
                  ></span>
                </div>
                <div class="grid grid-cols-7 gap-2 form-large">
                  <div class="col-span-5">
                    <span @click="addSurcharge"
                      ><i class="fal fa-plus-circle icon-plus"></i
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
                class="cursor-pointer form-group-label"
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
                  v-model="approvalMission.this_content"
                ></textarea>
              </div>
            </div>
          </div>
          <attach-file-vue
            :arrFile="newFile.reason_file_image"
          ></attach-file-vue>
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
                  :ArrayApprover="approvalMission.app_approval_ids"
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
            @click="createApprovalMission()"
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
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalMission } from "@/store/modules/approval/ApprovalMission";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { useReasonMission } from "@/store/modules/settingApproval/ReasonMission";
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
    const isApprover = ref(true);
    const isRelated = ref(true);
    const isSurcharge = ref(true);
    const dateFrom = new Date().toISOString().substring(0, 10);
    const dateTo = new Date().toISOString().substring(0, 10);
    const multiFile = ref([]);
    const totalMission = ref();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const mission = useApprovalMission();
    const setting = useSettingApproval();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const reasonMission = useReasonMission();
    const { ReasonMissionActive } = storeToRefs(reasonMission);
    const { CheckDescApprovalMission } = storeToRefs(setting);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    reasonMission.GetAllMissionsAction();
    if (CheckDescApprovalMission.value == null) {
      setting.CheckDescApprovalMissionAction();
    }
    const approvalMission = reactive({
      personnel_id: null,
      time_start: "00:00",
      date_from: null,
      time_end: "00:00",
      date_to: null,
      address: "",
      reason: null,
      travel_by: "",
      is_work_abroad: 0,
      this_content: "",
      json_details: [
        {
          surcharges_type_id: null,
          surcharges_money: null,
        },
      ],
      app_approval_ids: [null],
    });
    const addSurcharge = () => {
      const data = {
        surcharges_type_id: null,
        surcharges_money: null,
      };
      approvalMission.json_details.push(data);
    };
    const removeSurcharge = (index) => {
      approvalMission.json_details.splice(index, 1);
      changeMission();
    };
    const changeMission = () => {
      let x = approvalMission.json_details.reduce(
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
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalMission = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-mission/help") {
        data = {
          personnel_id: approvalMission.personnel_id,
          time_start: approvalMission.time_start,
          date_from: approvalMission.date_from,
          time_end: approvalMission.time_end,
          date_to: approvalMission.date_to,
          address: approvalMission.address,
          reason: approvalMission.reason,
          travel_by: approvalMission.travel_by,
          is_work_abroad: approvalMission.is_work_abroad,
          this_content: approvalMission.this_content,
          json_details: approvalMission.json_details,
          app_approval_ids: approvalMission.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          time_start: approvalMission.time_start,
          date_from: approvalMission.date_from,
          time_end: approvalMission.time_end,
          date_to: approvalMission.date_to,
          address: approvalMission.address,
          reason: approvalMission.reason,
          travel_by: approvalMission.travel_by,
          is_work_abroad: approvalMission.is_work_abroad,
          this_content: approvalMission.this_content,
          json_details: approvalMission.json_details,
          app_approval_ids: approvalMission.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalMission.value.value == 1) {
        if (data.this_content?.length == 0) {
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
            mission.createApprovalMissionAction({
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
          mission.createApprovalMissionAction({
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
      isApprover,
      isSurcharge,
      dateFrom,
      dateTo,
      multiFile,
      isLoading,
      approvalMission,
      ReasonMissionActive,
      totalMission,
      newFile,
      formatdate,
      addSurcharge,
      removeSurcharge,
      changeMission,
      createApprovalMission,
      CheckDescApprovalMission,
      isCreated,
      ActivatedButton,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
