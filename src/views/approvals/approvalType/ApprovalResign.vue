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
            <p class="longText">Tạo mới đơn xin thôi việc</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 h-full w-full format-scroll"
        v-if="isLoading == false"
      >
        <div class="w-full mt-2">
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
            <div v-show="isInfor == true">
              <div class="">
                <div
                  class="form-small"
                  v-if="this.$route.path == '/approval-resign/help'"
                >
                  <field-helper :Helper="approvalResign"></field-helper>
                </div>
                <div class="form-small">
                  <label for="" class="form-group-label"
                    >Lý do<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="ReasonResign"
                      :reduce="(reason) => reason.ID"
                      placeholder="Chọn lý do"
                      v-model="approvalResign.reason_id"
                      :searchable="false"
                    ></v-select>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 form-small">
                  <div class="col-span-1">
                    <label for="" class="form-group-label"
                      >Ngày nộp đơn<span class="text-red-600">*</span></label
                    >
                    <div>
                      <date-picker v-model="approvalResign.date"></date-picker>
                    </div>
                  </div>
                  <div class="col-span-1">
                    <label for="" class="form-group-label"
                      >Ngày thôi việc<span class="text-red-600">*</span></label
                    >
                    <div>
                      <date-picker
                        v-model="approvalResign.date_of_application"
                      ></date-picker>
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
                      v-model="approvalResign.desc"
                    ></textarea>
                  </div>
                </div>
                <attach-file-vue
                  :arrFile="newFile.reason_file_image"
                ></attach-file-vue>
              </div>
            </div>
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

            <div v-show="isApprover == true">
              <field-approver
                :ArrayApprover="approvalResign.app_approval_ids"
              ></field-approver>
            </div>

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
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="createApprovalResign()"
            :class="{ disabledButtonCreated: isCreated }"
          >
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
import FieldHelper from "@/components/constant/FieldHelper.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { reactive, ref } from "vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalResign } from "@/store/modules/approval/ApprovalResign";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { storeToRefs } from "pinia";
export default {
  data() {
    return {};
  },
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
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isInfor = ref(true);
    const isRelated = ref(true);
    const isApprover = ref(true);
    const isLoading = ref(true);
    const isCreated = ref(false);
    const dateResign = new Date().toISOString().substring(0, 10);
    const resign = useApprovalResign();
    const setting = useSettingApproval();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const { CheckDescApprovalResign } = storeToRefs(setting);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    resign.GetAllReasonResignAction();
    const { ReasonResign } = storeToRefs(resign);
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const approvalResign = reactive({
      personnel_id: null,
      reason_id: null,
      date_of_application: dateResign,
      date: dateResign,
      desc: "",
      app_approval_ids: [null],
    });
    if (CheckDescApprovalResign.value == null) {
      setting.CheckDescApprovalResignAction();
    }
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalResign = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-resign/help") {
        data = {
          personnel_id: approvalResign.personnel_id,
          reason_id: approvalResign.reason_id,
          date_of_application: approvalResign.date_of_application,
          date: approvalResign.date,
          desc: approvalResign.desc,
          app_approval_ids: approvalResign.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          reason_id: approvalResign.reason_id,
          date_of_application: approvalResign.date_of_application,
          date: approvalResign.date,
          desc: approvalResign.desc,
          app_approval_ids: approvalResign.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalResign.value.value == 1) {
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
            resign.createApprovalResignAction({
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
          toast.error("Vui lòng chọn người duyệt");
          setTimeout(() => {
            isCreated.value = false;
          }, 500);
        } else {
          isLoading.value = true;
          resign.createApprovalResignAction({
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
      dateResign,
      approvalResign,
      isLoading,
      newFile,
      formatdate,
      createApprovalResign,
      CheckDescApprovalResign,
      isCreated,
      ReasonResign,
      ActivatedButton,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
