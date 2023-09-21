<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="longText" v-if="assignDetail">
              {{ assignDetail?.title }}
            </p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="w-full" v-if="isLoading == false">
          <div v-if="assignDetail.ID">
            <feature-assign :AssignDetail="assignDetail"></feature-assign>
          </div>
        </div> </nav-feature
    ></template>
    <Transition duration="550" name="nested">
      <div class="w-full pb-4" v-if="isLoading == false">
        <div class="text-left" v-if="assignDetail.ID">
          <div title="Thông tin chung" class="outer">
            <div class="detail-section-title">Thông tin chung</div>
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="cellTable" width="20%">Tiêu đề</td>
                  <td class="cellTable" width="30%">
                    {{ assignDetail.title }}
                  </td>
                  <td class="cellTable" width="20%">Phòng ban</td>
                  <td class="cellTable" width="30%">
                    {{ assignDetail?.data_departments.slice(0, -1) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable" width="20%">Vị trí</td>
                  <td class="cellTable" width="30%">
                    {{ assignDetail?.data_positions.slice(0, -1) }}
                  </td>
                  <td class="cellTable" width="20%">Kiểu phân ca</td>
                  <td class="cellTable" width="30%">
                    {{ formatTypeShift(assignDetail.type) }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable" width="20%">Loại ca</td>
                  <td class="cellTable" width="30%">
                    {{ formatShift(assignDetail.shift_type) }}
                  </td>
                  <td class="cellTable" width="20%">Phân công</td>
                  <td class="cellTable" width="30%">
                    {{ formatAssignment(assignDetail.repeat_type) }}
                  </td>
                </tr>
                <tr>
                  <template v-if="assignDetail.repeat_type == 'NONE'">
                    <td class="cellTable" width="20%"></td>
                    <td class="cellTable" width="30%"></td>
                  </template>
                  <template v-else>
                    <td class="cellTable" width="20%">Thời gian</td>
                    <td class="cellTable" width="30%">
                      {{ formatDate(assignDetail.date_start) }} -
                      {{ formatDate(assignDetail.date_end) }}
                    </td>
                  </template>
                  <td class="cellTable" width="20%">Trạng thái</td>
                  <td class="cellTable" width="30%">
                    <div
                      class="beacon"
                      :class="formatColor(assignDetail.app_approval_status)"
                    >
                      {{ formatStatus(assignDetail.app_approval_status) }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="cellTable" width="20%">Người duyệt</td>
                  <td class="cellTable" width="30%">
                    {{ formatUserApproval(assignDetail.data_approver) }}
                  </td>
                  <td class="cellTable" width="20%">Ghi chú</td>
                  <td class="cellTable" width="30%"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div title="Chi tiết phân ca" class="inner">
            <div class="detail-section-title">Chi tiết phân ca</div>
            <div class="w-full overflow-auto format-scroll mb-2">
              <table class="w-full" v-if="assignDetail.type == 'GROUP'">
                <thead class="bg-slate-50">
                  <tr>
                    <td class="cellTable font-medium">Ngày</td>
                    <td class="cellTable font-medium">Ca</td>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(shifts, index) in assignDetail.details"
                    :key="index"
                  >
                    <tr
                      v-for="(item, ind) in shifts.shift_ids"
                      :key="ind"
                      class="border"
                    >
                      <td
                        class="w-[200px] cellTable"
                        v-if="assignDetail.repeat_type == 'WEEKLY'"
                      >
                        {{ formatWeekItem(item.day) }}
                      </td>
                      <td
                        class="w-[200px] cellTable"
                        v-else-if="assignDetail.repeat_type == 'NONE'"
                      >
                        {{ formatWeek(shifts.date_start) }},
                        {{ formatDate(shifts.date_start) }}
                      </td>
                      <td
                        class="w-[200px] cellTable"
                        v-else-if="assignDetail.repeat_type == 'DAILY'"
                      >
                        {{ formatAssignDaily(ind + 1) }}
                      </td>
                      <td
                        :class="formatWeekendShift(item.day)"
                        class="w-[200px] cellTable"
                        v-else
                      >
                        {{ formatWeek(item.day) }}, {{ formatDate(item.day) }}
                      </td>
                      <td class="cellTable">
                        {{ formatDetailShift(item.shift) }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <table class="h-full whitespace-nowrap w-full" v-else>
                <thead class="bg-slate-50">
                  <tr>
                    <td
                      class="cellTable font-medium whitespace-nowrap w-[80px]"
                    >
                      Mã NV
                    </td>
                    <td
                      class="cellTable font-medium whitespace-nowrap w-[180px]"
                    >
                      Họ và tên
                    </td>
                    <td
                      class="cellTable font-medium whitespace-nowrap w-[100px]"
                    >
                      Vị trí
                    </td>
                    <td
                      class="cellTable font-medium whitespace-nowrap w-[200px]"
                    >
                      Phòng ban
                    </td>
                    <td
                      class="cellTable font-medium w-[120px]"
                      v-for="(shift, index) in assignDetail.details[0]
                        ?.shift_ids"
                      :key="index"
                      :class="formatWeekendShift(shift.day)"
                    >
                      <div v-if="assignDetail.repeat_type == 'WEEKLY'">
                        {{ formatWeekItem(shift.day) }}
                      </div>
                      <div v-else-if="assignDetail.repeat_type == 'DAILY'">
                        {{ formatAssignDaily(index + 1) }}
                      </div>
                      <div v-else-if="assignDetail.repeat_type == 'NONE'">
                        Ngày
                      </div>
                      <div v-else>
                        {{ formatWeek(shift.day) }},
                        {{ formatDate(shift.day) }}
                      </div>
                    </td>
                    <td
                      v-if="assignDetail.repeat_type == 'NONE'"
                      class="cellTable font-medium"
                    >
                      Ca
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(shifts, index) in assignDetail.details"
                    :key="index"
                    class="border"
                  >
                    <td class="cellTable">
                      {{ shifts.personnel_code }}
                    </td>
                    <td class="cellTable">{{ shifts.name }}</td>
                    <td class="cellTable">{{ shifts.position_title }}</td>
                    <td class="cellTable">{{ shifts.department_title }}</td>
                    <td
                      v-if="assignDetail.repeat_type == 'NONE'"
                      class="cellTable"
                    >
                      {{ formatDate(shifts.date_start) }}
                    </td>
                    <td
                      v-for="(item, ind) in shifts.shift_ids"
                      :key="ind"
                      class="whitespace-nowrap cellTable"
                    >
                      {{ formatDetailShift(item.shift) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div title="Thảo luận" class="inner">
            <div class="detail-section-title">Thảo luận</div>
            <write-comment></write-comment>
          </div>
        </div>
        <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingReload"
    :handleEndLoading="EndTimeReload"
  ></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import FeatureAssign from "@/components/constant/FeatureAssign.vue";
import WriteComment from "@/components/constant/WriteComment.vue";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import {
  FormatColorApproval,
  FormatDate,
  FormatStatusApproval,
  FormatUserApproval,
  FormatWeekdays,
} from "@/constants/FormatAll";
import { useShiftAssign } from "@/store/modules/timekeep/shiftAssign";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    NavFeature,
    FeatureAssign,
    WriteComment,
  },
  data() {
    return {};
  },
  methods: {
    formatRank(index) {
      return FormatWeekdays(index);
    },
    formatWeek(day) {
      let date = new Date(day);
      return FormatWeekdays(date.getDay());
    },
    formatWeekendShift(day) {
      let date = new Date(day);
      if (date.getDay() == 0) {
        return "text-red-500";
      }
    },
    formatNumDateShift(index) {
      return "Ngày " + (index + 1);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatTypeShift(stt) {
      if (stt == "PERSON") {
        return "Phân ca cho cá nhân";
      } else if (stt == "GROUP") {
        return "Phân ca cho phòng ban, vị trí";
      }
    },
    formatShift(stt) {
      if (stt == "HC") {
        return "Hành chính";
      } else if (stt == "CC") {
        return "Ca kíp";
      }
    },
    formatAssignment(stt) {
      if (stt == "RANGE") {
        return "Theo khoảng ngày";
      } else if (stt == "DAILY") {
        return "Lặp theo chu kỳ ngày";
      } else if (stt == "NONE") {
        return "Theo ngày cố định";
      } else if (stt == "WEEKLY") {
        return "Lặp theo tuần";
      }
    },
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
    formatDetailShift(id) {
      let final = "";
      if (id.length > 0) {
        for (let i = 0; i < id.length; i++) {
          const arr = this.listShifts.find((item) => item.ID == id[i]);
          if (arr) {
            final = final + arr.code + " , ";
          } else {
            final = final + "";
          }
        }
        return final.slice(0, -2);
      } else {
        return "";
      }
    },
    formatWeekItem(index) {
      if (index == 8) {
        return "Chủ nhật";
      } else {
        return "Thứ " + index;
      }
    },
    formatAssignDaily(index) {
      return "Ngày thứ " + index;
    },
    formatUserApproval(arr) {
      return FormatUserApproval(arr);
    },
  },
  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    const isLoadingReload = ref(false);
    const assign = useShiftAssign();
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const { assignDetail } = storeToRefs(assign);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeReload = () => {
      isLoadingReload.value = false;
    };
    assign.showShiftAssignAction({
      id: route.params.detailID,
      EndTimeLoading: EndTimeLoading,
    });
    if (listShifts.value?.length == 0) {
      tk_shift.GetAllShiftsAction();
    }
    return {
      assignDetail,
      isLoading,
      isLoadingReload,
      listShifts,
      EndTimeReload,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
