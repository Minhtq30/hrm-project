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
            <p class="longText">Tạo mới đơn đổi ca</p>
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
              <div v-show="isInfor == true">
                <div
                  class="form-small"
                  v-if="this.$route.path == '/approval-shiftchange/help'"
                >
                  <field-helper :Helper="approvalShiftchange"></field-helper>
                </div>
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
                          v-model="approvalShiftchange.is_change"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="approvalShiftchange.is_change == 'OTHER'">
                  <div
                    class="flex items-center form-plus"
                    v-if="approvalShiftchange.details?.length"
                  >
                    <div class="form-x-small px-1">
                      <label for="" class="form-group-label"
                        >Ngày cần đổi<span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="form-x-small px-1">
                      <label for="" class="form-group-label">Ca cũ</label>
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
                    v-for="(item, index) in approvalShiftchange.details"
                    :key="index"
                  >
                    <div class="form-x-small px-1">
                      <date-picker
                        v-model="item.date_change"
                        :SelectMultiDate="SelectMultiDate"
                      ></date-picker>
                    </div>
                    <div class="form-x-small px-1">
                      <v-select
                        label="title"
                        :options="listShifts"
                        :reduce="(shift) => shift.ID"
                        placeholder="Chọn ca"
                        v-model="shiftListCode"
                        disabled
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
                          <div
                            style="align-items: baseline"
                            class="flex flex-col"
                          >
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
                        :options="listPersonnels"
                        :reduce="(personnel) => personnel.ID"
                        @search="loadPersonnel"
                        :filterable="false"
                        placeholder="Tìm mã, họ tên nhân sự"
                        v-model="item.partner_id"
                      >
                        <template
                          #option="{ code, name, department, position }"
                        >
                          <div class="flex flex-col text-left">
                            <div class="flex">
                              <div class="font-medium">{{ code }}</div>
                              <div>&nbsp;- {{ name }}</div>
                            </div>
                            <div class="flex text-xs">
                              <div v-if="position">
                                {{ position }}&nbsp;-&nbsp;
                              </div>
                              <div>{{ department }}</div>
                            </div>
                          </div>
                        </template>
                        <template #selected-option="{ code, name }">
                          <div class="flex">
                            <div class="font-medium">{{ code }}</div>
                            <div>&nbsp;- {{ name }}</div>
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
                          <div
                            style="align-items: baseline"
                            class="flex flex-col"
                          >
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
                      <i
                        class="fal fa-times icon-close"
                        style="margin-top: 0px"
                      ></i>
                    </div>
                  </div>
                  <div>
                    <i
                      class="fal fa-plus-circle icon-plus"
                      @click="addApprovalShiftChange"
                    ></i>
                  </div>
                </div>
                <div v-else>
                  <div
                    class="flex items-center form-large-plus"
                    v-if="approvalShiftchange.details?.length"
                  >
                    <div class="form-mid-small px-1">
                      <label for="" class="form-group-label"
                        >Ngày cần đổi<span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="form-extra-small px-1">
                      <label for="" class="form-group-label"
                        >Ca cũ<span class="text-red-600">*</span></label
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
                    v-for="(item, index) in approvalShiftchange.details"
                    :key="index"
                  >
                    <div class="form-mid-small px-1">
                      <date-picker
                        v-model="item.date_change"
                        :SelectMultiDate="SelectMultiDate"
                      ></date-picker>
                    </div>
                    <div class="form-extra-small px-1 !w-max">
                      <!-- <v-select
                        label="title"
                        :options="listShifts"
                        :reduce="(shift) => shift.ID"
                        v-model="shiftListCode"
                        placeholder="Chọn ca"
                        disabled
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
                              >Ca làm việc:{{ time_start }} - {{ time_end }}</em
                            >
                            <em class="text-xs" v-if="time_break_start"
                              >Nghỉ trưa:{{ time_break_start }} -
                              {{ time_break_end }}</em
                            >
                          </div>
                        </template></v-select
                      > -->
                      <input
                        type="text"
                        name=""
                        id=""
                        class="disabledInput p-3 w-full"
                        disabled
                        :value="formatShift(index)"
                      />
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
                          <div
                            style="align-items: baseline"
                            class="flex flex-col"
                          >
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
                      <i
                        class="fal fa-times icon-close"
                        style="margin-top: 0px"
                      ></i>
                    </div>
                  </div>
                  <div>
                    <i
                      class="fal fa-plus-circle icon-plus"
                      @click="addApprovalShiftChange"
                    ></i>
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
                      v-model="approvalShiftchange.desc"
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
                  :ArrayApprover="approvalShiftchange.app_approval_ids"
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
            @click="createApprovalShiftchange()"
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
import { computed, onUpdated, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useApprovalShiftchange } from "@/store/modules/approval/ApprovalShiftchange";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { storeToRefs } from "pinia";
import _ from "lodash";
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
    const isInfor = ref(true);
    const isApprover = ref(true);
    const isRelated = ref(true);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const dateShiftChange = new Date().toISOString().substring(0, 10);
    const total = useApprovalTotal();
    const shiftchange = useApprovalShiftchange();
    const setting = useSettingApproval();
    const tk_shift = useShifts();
    const newFile = reactive({
      reason_file_image: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const { listShifts } = storeToRefs(tk_shift);
    const { CheckDescApprovalShiftChange } = storeToRefs(setting);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    tk_shift.GetAllShiftsAction();
    if (CheckDescApprovalShiftChange.value == null) {
      setting.CheckDescApprovalShiftChangeAction();
    }
    const dataShift = ref();
    dataShift.value = {
      personnel_id: localStorage.getItem("personnelID"),
      date: dateShiftChange,
    };
    total.GetShitUserByDayAction(dataShift.value);
    const { ShitUserByDay } = storeToRefs(total);
    const shiftListCode = computed(() =>
      ShitUserByDay.value != null
        ? Number(ShitUserByDay.value.shift_ids)
        : "Không có ca"
    );
    const shiftUser = ref();
    onUpdated(() => {
      if (ShitUserByDay.value) {
        shiftUser.value = listShifts.value.filter(
          (item) => item.ID == ShitUserByDay.value.ID
        );
      }
    });
    const loadPersonnel = _.debounce((search, loading) => {
      if (search.length > 0) {
        loading(true);
        store.dispatch("personnels/SearchPersonnelCreateApprovalAction", {
          search: search,
          loading,
        });
      }
    }, 300);
    const listPersonnels = computed(
      () => store.state.personnels.PersonnelCreateApproval
    );
    const approvalShiftchange = reactive({
      is_change: "PRIVATE",
      details: [
        {
          date_change: dateShiftChange,
          date_other: dateShiftChange,
          shift_change: shiftListCode,
          shift_other: null,
          partner_id: null,
        },
      ],
      desc: "",
      personnel_id: null,
      app_approval_ids: [null],
    });
    const addApprovalShiftChange = () => {
      const data = {
        date_change: dateShiftChange,
        date_other: dateShiftChange,
        shift_change: null,
        shift_other: null,
        partner_id: null,
      };
      approvalShiftchange.details.push(data);
    };
    const removeApprovalShiftChange = (index) => {
      approvalShiftchange.details.splice(index, 1);
    };
    const ChangeShift = (event) => {
      approvalShiftchange.is_change = event.target.value;
    };
    const SelectMultiDate = (e) => {
      dataShift.value = {
        personnel_id: localStorage.getItem("personnelID"),
        date: e.id,
      };
      total.GetShitUserByDayAction(dataShift.value);
      setTimeout(() => {
        if (ShitUserByDay.value) {
          shiftUser.value = listShifts.value.filter(
            (item) => item.ID == ShitUserByDay.value.ID
          );
          console.log(ShitUserByDay);
        }
      }, 200);
      console.log(shiftUser.value);
    };
    const formatShift = (index) => {
      if (ShitUserByDay.value) {
        approvalShiftchange.details[index].shift_change = shiftListCode;
        return ShitUserByDay.value?.shift_code;
      } else {
        approvalShiftchange.details[index].shift_change = null;
        return "Không có ca";
      }
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const createApprovalShiftchange = () => {
      isCreated.value = true;
      let data;
      if (route.path == "/approval-shiftchange/help") {
        data = {
          is_change: approvalShiftchange.is_change,
          details: approvalShiftchange.details,
          desc: approvalShiftchange.desc,
          personnel_id: approvalShiftchange.personnel_id,
          app_approval_ids: approvalShiftchange.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      } else {
        data = {
          is_change: approvalShiftchange.is_change,
          details: approvalShiftchange.details,
          desc: approvalShiftchange.desc,
          app_approval_ids: approvalShiftchange.app_approval_ids,
          reason_file: newFile.reason_file_image[0],
        };
      }
      const dataUrl = {
        data: data,
      };
      if (CheckDescApprovalShiftChange.value.value == 1) {
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
            shiftchange.createApprovalShiftchangeAction({
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
          shiftchange.createApprovalShiftchangeAction({
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
      dateShiftChange,
      isLoading,
      approvalShiftchange,
      listShifts,
      shiftUser,
      isCreated,
      CheckDescApprovalShiftChange,
      dataShift,
      ShitUserByDay,
      newFile,
      shiftListCode,
      formatShift,
      addApprovalShiftChange,
      removeApprovalShiftChange,
      createApprovalShiftchange,
      ChangeShift,
      ActivatedButton,
      SelectMultiDate,
      EndTimeLoading,
      loadPersonnel,
      listPersonnels,
    };
  },
};
</script>

<style></style>
