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
            <p class="longText">Tạo mới Upload POSM</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div
        class="text-left px-4 py-2 w-full h-full format-scroll form-plus-over"
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
            <div v-show="isInfor == true" class="outer">
              <!-- <div class="grid grid-cols-4 gap-2 form-small">
                <div class="col-span-3">
                  <label for="" class="form-group-label"
                    >Lý do<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="ReasonLeavesActive"
                      :reduce="(leave) => leave.ID"
                      @option:selected="changeInputLeave($event)"
                      placeholder="Chọn lý do"
                      v-model="approvalLeave.reason"
                      :searchable="false"
                    >
                      <template #option="{ title, max_day, type_day }">
                        <div class="flex flex-col-reverse">
                          <em>{{ formatType(max_day, type_day) }}</em>
                          <strong>{{ title }}</strong>
                        </div>
                      </template></v-select
                    >
                  </div>
                </div>
                <div class="">
                  <label for="" class="form-group-label"
                    >Tính công<span class="text-red-600">*</span></label
                  >
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="disabledInput p-3 w-full"
                      v-model="has_attendance"
                      disabled
                      style="border-radius: 4px"
                    />
                  </div>
                </div>
              </div> -->
              <!-- <div
                class="form-large-plus flex items-center"
                v-if="approvalLeave.details?.length"
              >
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Ca<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Từ ngày<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Ca<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-small px-1">
                  <label for="" class="form-group-label"
                    >Đến ngày<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Phép nghỉ</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Phép dư</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Có thể ứng</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                  <label for="" class="form-group-label">Có thể nghỉ</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                  <label for="" class="form-group-label">Nghỉ bù</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                  <label for="" class="form-group-label">Số giờ thêm</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                  <label for="" class="form-group-label">Ứng</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                  <label for="" class="form-group-label">Đã dùng</label>
                </div>
                <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                  <label for="" class="form-group-label">Có thể nghỉ</label>
                </div>
              </div>
              <div
                class="flex items-center -mt-3"
                v-for="(item, index) in approvalLeave.details"
                :key="index"
              >
                <div class="form-large-plus flex items-center">
                  <div class="form-mid-small px-1">
                    <v-select
                      label="title"
                      :options="shiftLeave"
                      :reduce="(shift) => shift.id"
                      placeholder="Chọn ca nghỉ"
                      v-model="item.shifts_start"
                    ></v-select>
                  </div>
                  <div class="form-mid-small px-1">
                    <date-picker v-model="item.date_start"></date-picker>
                  </div>
                  <div class="form-mid-small px-1">
                    <v-select
                      label="title"
                      :options="shiftLeave"
                      :reduce="(shift) => shift.id"
                      placeholder="Chọn ca nghỉ"
                      v-model="item.shifts_end"
                    ></v-select>
                  </div>
                  <div class="form-mid-small px-1">
                    <date-picker v-model="item.date_end"></date-picker>
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      :value="CountLeave(item)"
                    />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      :value="
                        UserFurlough.furlough_total_closed_more
                          ? Number(UserFurlough.furlough_total_closed)
                          : '0'
                      "
                    />
                  </div>

                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      value="0"
                    />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="AnnualLeave">
                    <input
                      type="text"
                      class="disabledInput"
                      disabled
                      :value="
                        UserFurlough.furlough_total_closed_more
                          ? Number(UserFurlough.furlough_total_closed)
                          : '0'
                      "
                    />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                    <input type="text" class="disabledInput" disabled />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                    <input type="text" class="disabledInput" disabled />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                    <input type="text" class="disabledInput" disabled />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                    <input type="text" class="disabledInput" disabled />
                  </div>
                  <div class="form-mid-xs-small px-1" v-if="CompensatoryLeave">
                    <input type="text" class="disabledInput" disabled />
                  </div>
                  <div @click="removeApprovalLeave(index)">
                    <i
                      class="fal fa-times icon-close"
                      style="margin-top: 0px"
                    ></i>
                  </div> -->
              <!-- </div> -->
              <!-- </div> -->
              <!-- <div>
                <span @click="addApprovalLeave"
                  ><i class="fal fa-plus-circle icon-plus"></i
                ></span>
              </div> -->
              <div class="mt-2 form-small">
                <label for="" class="form-group-label"
                  >Tiêu đề<span class="text-red-600">*</span></label
                >
                <div>
                  <input
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    class="form-control-input"
                    v-model="approvalPosm.title"
                  />
                </div>
              </div>
              <div class="form-mid-small px-1">
                <label for="" class="form-group-label"
                  >Ngày đăng<span class="text-red-600">*</span></label
                >
                <date-picker
                  :SelectMultiDate="SelectMultiDate"
                  v-model="date_start"
                ></date-picker>
              </div>
              <div class="mt-2 form-small">
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
                    v-model="approvalPosm.desc"
                  ></textarea>
                </div>
              </div>
              <attach-file-vue
                :arrFile="newFile.reason_file_image"
              ></attach-file-vue>
            </div>
          </Transition>
          <!-- <div v-show="isInfor == false">
            <h2
              @click="isInfor = !isInfor"
              class="cursor-pointer form-group-label"
            >
              Lý do *, Tính công, Nhân sự cần tạo đơn *, Ca *, Đến ngày*, Phép
              nghĩ,, Phép dư, Có thể ứng, Có thể nghỉ
            </h2>
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
                  :ArrayApprover="approvalLeave.app_approval_ids"
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
          </div> -->
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button
            class="button-modal"
            @click="UploadPosm()"
            :class="{ disabledButtonCreated: isCreated }"
          >
            Upload
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
            Hủy bỏ
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarApproval from "@/components/sidebar/SidebarApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import AttachFileVue from "@/components/constant/AttachFile.vue";
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useUploadPosm } from "@/store/modules/approval/ApprovalPosm";
import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    datePicker,
    AttachFileVue,
  },
  setup() {
    const router = useRouter();
    const isInfor = ref(true);
    const isApprover = ref(true);
    const toast = useToast();
    const isLoading = ref(true);
    const has_attendance = ref("Không");
    const date_start = new Date().toISOString().substring(0, 10);
    const date_end = new Date().toISOString().substring(0, 10);
    const multiFile = ref([]);
    const AnnualLeave = ref(false);
    const CompensatoryLeave = ref(false);
    const isCreated = ref(false);
    // const dataDate = ref();
    const posm = useUploadPosm();
    const reasonLeave = useReasonLeave();
    const newFile = reactive({
      reason_file_image: [],
    });
    const { ReasonLeavesActive, typeDay } = storeToRefs(reasonLeave);
    const { UserFurlough } = storeToRefs(posm);
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
    const ActivatedButton = () => {
      isCreated.value = false;
    };

    const approvalPosm = reactive({
      title: "",
      desc: "",
      date: date_start,
    });
    const SelectMultiDate = (e) => {
      //   dataDate.value = {
      //     personnel_id: localStorage.getItem("personnelID"),
      //     date: e.id,
      //   };
      approvalPosm.date = e.id;
    };
    const UploadPosm = () => {
      isCreated.value = true;
      let data;
      //   if (route.path == "/approval-leave/help") {
      //     data = {
      //       personnel_id: approvalLeave.personnel_id,
      //       reason: approvalLeave.reason,
      //       details: approvalLeave.details,
      //       desc: approvalLeave.desc,
      //       app_approval_ids: approvalLeave.app_approval_ids,
      //       reason_file: newFile.reason_file_image[0],
      //     };
      //   } else {
      data = {
        title: approvalPosm.title,
        desc: approvalPosm.desc,
        date: approvalPosm.date,
        reason_file: newFile.reason_file_image[0],
      };
      //   }
      const dataUrl = {
        data: data,
      };
      posm.createUploadPosmAction({
        dataUrl,
        router,
        toast,
        ActivatedButton,
      });
      //   if (data.reason == null) {
      //     toast.error("Vui lòng chọn lý do nghỉ");
      //     setTimeout(() => {
      //       isCreated.value = false;
      //     }, 500);
      //   } else {
      //     if (CheckDescApprovalLeave.value.value == 1) {
      //       if (data.desc?.length == 0) {
      //         toast.error("Vui Lòng nhập mô tả lý do xin nghỉ");
      //         setTimeout(() => {
      //           isCreated.value = false;
      //         }, 500);
      //       } else {
      //         if (data.app_approval_ids[0] == null) {
      //           toast.error("Vui Lòng chọn người duyệt");
      //           setTimeout(() => {
      //             isCreated.value = false;
      //           }, 500);
      //         } else {
      //           leave.createApprovalLeaveAction({
      //             dataUrl,
      //             router,
      //             toast,
      //             ActivatedButton,
      //           });
      //         }
      //       }
      //     } else {
      //       if (data.app_approval_ids[0] == null) {
      //         toast.error("Vui Lòng chọn người duyệt");
      //         setTimeout(() => {
      //           isCreated.value = false;
      //         }, 500);
      //       } else {
      //         leave.createApprovalLeaveAction({
      //           dataUrl,
      //           router,
      //           toast,
      //           ActivatedButton,
      //         });
      //       }
      //     }
      //   }
    };
    return {
      isInfor,
      isApprover,
      date_start,
      date_end,
      isLoading,
      approvalPosm,
      CompensatoryLeave,
      multiFile,
      ReasonLeavesActive,
      typeDay,
      has_attendance,
      UserFurlough,
      newFile,
      ActivatedButton,
      UploadPosm,
      SelectMultiDate,
      AnnualLeave,
      isCreated,
    };
  },
};
</script>

<style></style>
