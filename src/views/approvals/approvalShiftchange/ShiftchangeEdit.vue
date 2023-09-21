<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-approval></button-create-approval>
            <p class="longText">Cập nhật đơn đơn đổi ca</p>
          </div>
        </div></navbar-social
      >
    </template>
    <div
      class="text-left p-4 w-full h-full form-plus-over"
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
          <div v-show="isInfor == true">
            <div>
              <div class="form-small">
                <div>
                  <label for="" class="form-group-label"
                    >Kiểu đổi ca<span class="text-red-600">*</span></label
                  >
                  <div>
                    <v-select
                      label="title"
                      :options="typeShif"
                      :reduce="(shift) => shift.value"
                      placeholder="Chọn kiểu đổi ca"
                      @option-selected="ChangeShift($event)"
                      v-model="approvalDetail.data.is_change"
                    ></v-select>
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
        <div v-if="approvalDetail.data.is_change == 'OTHER'">
          <div
            class="flex items-center form-plus"
            v-if="approvalDetail.data.details?.length"
          >
            <div class="form-x-small px-1">
              <label for="" class="form-group-label"
                >Ngày cần đổi<span class="text-red-600">*</span></label
              >
            </div>
            <div class="form-x-small px-1">
              <label for="" class="form-group-label">Ca cần đổi</label>
            </div>
            <div class="form-mid-small px-1">
              <label for="" class="form-group-label">Ngày đổi</label>
            </div>
            <div class="form-x-small px-1">
              <label for="" class="form-group-label"
                >Người đổi<span class="text-red-600">*</span></label
              >
            </div>
            <div class="form-x-small px-1">
              <label for="" class="form-group-label">Ca muốn làm</label>
            </div>
          </div>
          <div
            class="flex items-center form-plus -mt-3"
            v-for="(item, index) in approvalDetail.data.details"
            :key="index"
          >
            <div class="form-x-small px-1">
              <date-picker v-model="item.date_change"></date-picker>
            </div>
            <div class="form-x-small px-1">
              <v-select
                label="title"
                :options="listShifts"
                :reduce="(shift) => shift.ID"
                placeholder="Chọn ca"
                v-model="item.shift_change"
              >
                <template
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
                      >Ca làm việc:{{ time_start }} - {{ time_end }}</em
                    >
                    <em class="text-xs" v-if="time_break_start"
                      >Nghỉ trưa:{{ time_break_start }} -
                      {{ time_break_end }}</em
                    >
                  </div>
                </template>
              </v-select>
            </div>
            <div class="form-mid-small px-1">
              <date-picker v-model="item.date_other"></date-picker>
            </div>
            <div class="form-x-small px-1">
              <v-select
                label="code"
                :options="listPersonnel"
                :reduce="(personnel) => personnel.ID"
                @input="loadPersonnel($event)"
                placeholder="Tìm mã, họ tên"
                v-model="item.partner_id"
              >
                <template #option="{ code, name }">
                  <div style="display: flex; align-items: baseline">
                    <strong>{{ code }}</strong>
                    <em style="margin-left: 0.5rem">- {{ name }}</em>
                  </div>
                </template>
                <template #selected-option="{ code, name }">
                  <div style="display: flex; align-items: baseline">
                    <strong>{{ code }}</strong>
                    <em style="margin-left: 0.5rem">- {{ name }}</em>
                  </div>
                </template>
              </v-select>
            </div>
            <div class="form-x-small px-1">
              <v-select
                label="title"
                :options="listShifts"
                :reduce="(shift) => shift.ID"
                placeholder="Chọn ca"
                v-model="item.shift_other"
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
                      >Ca làm việc:{{ time_start }} - {{ time_end }}</em
                    >
                    <em class="text-xs" v-if="time_break_start"
                      >Nghỉ trưa:{{ time_break_start }} -
                      {{ time_break_end }}</em
                    >
                  </div>
                </template></v-select
              >
            </div>
            <div @click="removeApprovalShiftChange(index)">
              <i class="fal fa-times icon-close" style="margin-top: 0px"></i>
            </div>
          </div>
          <div>
            <span @click="addApprovalShiftChange"
              ><i class="fal fa-plus-circle icon-plus"></i
            ></span>
          </div>
        </div>
        <div v-else>
          <div
            class="flex items-center form-large-plus"
            v-if="approvalDetail.data.details?.length"
          >
            <div class="form-mid-small px-1">
              <label for="" class="form-group-label"
                >Ngày cần đổi<span class="text-red-600">*</span></label
              >
            </div>
            <div class="form-extra-small px-1">
              <label for="" class="form-group-label"
                >Ca cần đổi<span class="text-red-600">*</span></label
              >
            </div>
            <div class="form-small px-1">
              <label for="" class="form-group-label"
                >Ca muốn làm<span class="text-red-600">*</span></label
              >
            </div>
          </div>
          <div
            class="flex items-center form-large-plus -mt-3"
            v-for="(item, index) in approvalDetail.data.details"
            :key="index"
          >
            <div class="form-mid-small px-1">
              <date-picker v-model="item.date_change"></date-picker>
            </div>
            <div class="form-extra-small px-1">
              <v-select
                label="title"
                :options="listShifts"
                :reduce="(shift) => shift.ID"
                placeholder="Chọn ca"
                v-model="item.shift_change"
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
                      >Ca làm việc:{{ time_start }} - {{ time_end }}</em
                    >
                    <em class="text-xs" v-if="time_break_start"
                      >Nghỉ trưa:{{ time_break_start }} -
                      {{ time_break_end }}</em
                    >
                  </div>
                </template></v-select
              >
            </div>
            <div class="form-small px-1">
              <v-select
                label="title"
                :options="listShifts"
                :reduce="(shift) => shift.ID"
                placeholder="Chọn ca"
                v-model="item.shift_other"
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
                      >Ca làm việc:{{ time_start }} - {{ time_end }}</em
                    >
                    <em class="text-xs" v-if="time_break_start"
                      >Nghỉ trưa:{{ time_break_start }} -
                      {{ time_break_end }}</em
                    >
                  </div>
                </template></v-select
              >
            </div>
            <div @click="removeApprovalShiftChange(index)">
              <i class="fal fa-times icon-close" style="margin-top: 0px"></i>
            </div>
          </div>
          <div>
            <span @click="addApprovalShiftChange"
              ><i class="fal fa-plus-circle icon-plus mt-2"></i
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
            class="cursor-pointer form-group-label"
          >
            Người duyệt*
          </h2>
        </div>
      </div>
    </div>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateApprovalShiftchange()">
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
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalShiftchange } from "@/store/modules/approval/ApprovalShiftchange";
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
      typeShif: [
        {
          value: "PRIVATE",
          title: "Chính mình",
        },
        {
          value: "OTHER",
          title: "Người khác",
        },
      ],
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isInfor = ref(true);
    const isRelated = ref(true);
    const isLoading = ref(true);
    const toast = useToast();
    const dateShiftChange = new Date().toISOString().substring(0, 10);
    const total = useApprovalTotal();
    const shiftchange = useApprovalShiftchange();
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const { approvalDetail, arrApprover } = storeToRefs(total);
    console.log(approvalDetail.value.details);
    const approvalDetailShiftChange = computed(
      () => approvalDetail.value.details
    );
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    tk_shift.GetAllShiftsAction();
    total.ShowDetailApprovalAction({
      id: route.params.shiftchangeID,
      EndTimeLoading,
    });
    const loadPersonnel = (event) => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    };
    const listPersonnel = computed(
      () => store.state.personnels.SearchPersonnel
    );
    console.log(store.state);
    const addApprovalShiftChange = () => {
      const data = {
        date_change: dateShiftChange,
        date_other: dateShiftChange,
        shift_change: null,
        shift_other: null,
        partner_id: null,
      };
      approvalDetail.value.data.details.push(data);
    };
    const removeApprovalShiftChange = (index) => {
      approvalDetail.value.data.details.splice(index, 1);
    };
    const ChangeShift = (event) => {
      approvalDetail.value.is_change = event.target.value;
    };
    const removeOldFile = (index) => {
      reasonFile.value.splice(index, 1);
    };
    const updateApprovalShiftchange = () => {
      const data = {
        ID: approvalDetail.value.ID,
        is_change: approvalDetail.value.data.is_change,
        details: approvalDetail.value.data.details,
        desc: approvalDetail.value.data.desc,
        app_approval_ids: arrApprover.value,
        personnel_id: approvalDetail.value.personnel_id,
        reason_file_new: newFile.reason_file_image[0],
        reason_file_old: reasonFile.value,
      };
      if (data.app_approval_ids.includes(null)) {
        toast.error("Vui Lòng chọn người duyệt");
      } else {
        isLoading.value = true;
        shiftchange.updateApprovalShiftchangeAction({
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
      dateShiftChange,
      approvalDetail,
      listShifts,
      listPersonnel,
      isLoading,
      arrApprover,
      reasonFile,
      newFile,
      approvalDetailShiftChange,
      removeOldFile,
      addApprovalShiftChange,
      removeApprovalShiftChange,
      loadPersonnel,
      updateApprovalShiftchange,
      ChangeShift,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
