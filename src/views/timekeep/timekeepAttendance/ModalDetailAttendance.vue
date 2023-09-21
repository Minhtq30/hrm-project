<template>
  <div class="w-[380px]">
    <div class="header-modal flex justify-between">
      <div>
        {{ attendanceDetail.name }}, ngày
        {{ formatDate(attendanceDetail?.detail) }}
      </div>
      <span @click="handleHideDetail()"
        ><i class="fal fa-times cursor-pointer text-xl hover:scale-125"></i
      ></span>
    </div>
    <div class="text-left" v-if="attendanceDetail?.shift_code">
      <tab-nav
        :tabs="['Tổng hợp', 'Đơn từ', 'Chốt vân tay', 'Phạt']"
        :selected="selected"
        :paddingTab="true"
        @selected="setSelected"
      >
      </tab-nav>
      <div class="p-2 mt-[6px] border-t">
        <the-tab :isSelected="selected == 'Tổng hợp'">
          <div class="font-medium">
            Công làm việc trong ngày:
            {{ attendanceDetail.time_work_in_day }}
          </div>
          <div class="font-medium flex justify-between items-center">
            Thông tin nhân sự:
            <span
              @click="handleOpenEditAttendance()"
              class="cursor-pointer text-red-500"
              title="Sửa chấm công trực tiếp"
              ><i class="fal fa-edit"></i
            ></span>
          </div>
          <div>Mã nhân viên: {{ attendanceDetail.code }}</div>
          <div>Vị trí: {{ attendanceDetail.position_title }}</div>
          <div>Phòng ban: {{ attendanceDetail.department_title }}</div>
          <div class="font-medium">Ca làm việc:</div>
          <div>Tên ca: {{ attendanceDetail.shift_title }}</div>
          <div>Mã ca: {{ attendanceDetail.shift_code }}</div>
          <div>
            Thời gian: {{ attendanceDetail.shift_time_start }} -
            {{ attendanceDetail.shift_time_end }}
          </div>
          <div>
            Chốt vân tay:
            {{ getHour(attendanceDetail.time_checkin) }} -
            {{ getHour(attendanceDetail.time_checkout) }}
          </div>
          <div>
            Số giờ:
            {{
              Number(attendanceDetail.number_time_work_real_in_day_no_use_round)
            }}
          </div>
          <div>
            Số công được tính:
            {{ Number(attendanceDetail.number_work_real_in_day) }}
          </div>
        </the-tab>

        <the-tab :isSelected="selected == 'Đơn từ'">
          <div class="p-2">
            <div
              v-if="
                detailApprovalTimekeep.data_checkinout?.length == 0 &&
                detailApprovalTimekeep.data_leave?.length == 0 &&
                detailApprovalTimekeep.data_meeting?.length == 0 &&
                detailApprovalTimekeep.data_overtime?.length == 0 &&
                detailApprovalTimekeep.data_shift_assign?.length == 0 &&
                detailApprovalTimekeep.data_shift_register?.length == 0 &&
                detailApprovalTimekeep.data_approval_leave_application
                  ?.length == 0
              "
            >
              Không có đơn từ nào!
            </div>
            <div class="text-left" v-else>
              <div
                v-if="detailApprovalTimekeep.data_checkinout?.length"
                class="text-left"
                title="Đơn check in/out"
              >
                <div class="font-medium">Đơn check in/out</div>
                <div
                  v-for="(
                    approval, index
                  ) in detailApprovalTimekeep.data_checkinout"
                  :key="index"
                >
                  <div>
                    Chi tiết:
                    <span
                      class="cursor-pointer text-red-500 hover:underline"
                      @click="handleShowDetailApprovalInout(approval.ID)"
                      >Check in/out</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="detailApprovalTimekeep.data_leave?.length"
                class="text-left"
                title="Đơn xin nghỉ"
              >
                <div class="font-medium">Đơn xin nghỉ</div>
                <div
                  v-for="(approval, index) in detailApprovalTimekeep.data_leave"
                  :key="index"
                >
                  <div>
                    Lý do:
                    <span
                      class="cursor-pointer text-red-500 hover:underline"
                      @click="handleShowDetailApproval(approval.ID)"
                      >Nghỉ phép</span
                    >
                  </div>
                  <div>
                    {{ formatTimeLeave(approval) }}
                  </div>
                </div>
              </div>
              <div
                v-if="detailApprovalTimekeep.data_meeting?.length"
                class="text-left"
                title="Đơn vắng mặt"
              >
                <div class="font-medium">Đơn vắng mặt</div>
                <div
                  v-for="(
                    approval, index
                  ) in detailApprovalTimekeep.data_meeting"
                  :key="index"
                >
                  <div>
                    Chi tiết:
                    <span
                      class="cursor-pointer text-red-500 hover:underline"
                      @click="handleShowDetailApprovalAbsence(approval.ID)"
                      >Vắng mặt</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="detailApprovalTimekeep.data_overtime?.length"
                class="text-left"
                title="Đơn làm thêm"
              >
                <div class="font-medium">Đơn làm thêm</div>
                <div
                  v-for="(
                    approval, index
                  ) in detailApprovalTimekeep.data_overtime"
                  :key="index"
                >
                  <div>
                    Chi tiết:
                    <span
                      class="cursor-pointer text-red-500 hover:underline"
                      @click="handleShowDetailApprovalOverTime(approval.ID)"
                      >Làm thêm</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="detailApprovalTimekeep.data_shift_assign?.length"
                class="text-left"
                title="Đơn làm thêm"
              >
                <div class="font-medium">Phân ca làm việc</div>
                <div
                  v-for="(
                    approval, index
                  ) in detailApprovalTimekeep.data_shift_assign"
                  :key="index"
                >
                  <div>
                    Chi tiết:
                    <span
                      class="cursor-pointer text-red-500 hover:underline"
                      @click="handleShowAsignDetail(approval.ID)"
                      >Phân ca</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="detailApprovalTimekeep.data_shift_register?.length"
                class="text-left"
                title="Đơn đăng kí ca"
              >
                <div class="font-medium">Đơn đăng kí ca</div>
                <div
                  v-for="(
                    approval, index
                  ) in detailApprovalTimekeep.data_shift_register"
                  :key="index"
                >
                  <div>
                    Chi tiết:
                    <span
                      class="cursor-pointer text-red-500 hover:underline"
                      @click="handleShowShiftRegister(approval.ID)"
                      >Đăng kí ca</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="
                  detailApprovalTimekeep.data_approval_leave_application?.length
                "
                class="text-left"
                title="Đơn thôi việc"
              >
                <div class="font-medium">Đơn thôi việc</div>
                <div
                  v-for="(
                    approval, index
                  ) in detailApprovalTimekeep.data_approval_leave_application"
                  :key="index"
                >
                  <div>
                    Chi tiết:
                    <span
                      class="cursor-pointer text-red-500 hover:underline"
                      @click="handleShowShiftResign(approval.ID)"
                      >Thôi việc</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </the-tab>
        <the-tab :isSelected="selected == 'Chốt vân tay'">
          <div v-if="isLoadingShow" class="p-2">
            <div v-if="detailTimekeepAttendance?.length">
              <div
                v-for="(item, index) in detailTimekeepAttendance"
                :key="index"
              >
                <div>
                  {{ formatTime(item.time)
                  }}<span>{{ formatMachine(item) }}</span>
                </div>
              </div>
            </div>
            <div v-else class="text-left">Chưa có dữ liệu chốt vân tay</div>
          </div></the-tab
        >

        <the-tab :isSelected="selected == 'Phạt'"
          ><div class="text-left">
            <div
              v-if="CheckLate(attendanceDetail) || CheckSoon(attendanceDetail)"
            >
              <div v-if="CheckLate(attendanceDetail)">
                Đi muộn:
                {{ CountMinutesLateSingle(attendanceDetail) }}
              </div>
              <div v-if="CheckSoon(attendanceDetail)">
                Về sớm: {{ CountMinutesSoonSingle(attendanceDetail) }}
              </div>
            </div>
            <div v-else>Không bị phạt!</div>
          </div></the-tab
        >
      </div>
    </div>
    <div v-else class="p-2 flex flex-col justify-center">
      <h2>Không tìm thấy kết quả</h2>
      <div class="flex justify-center">
        <img :src="imgNoData" alt="" class="w-[200px] h-[200px]" />
      </div>
    </div>
  </div>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenEditAttendance"
      :handleCloseDetail="handleCloseEditAttendance"
    >
      <modal-edit-attendance-vue
        :AttendanceDetail="attendanceDetail"
        :closeEdit="handleCloseEditAttendance"
      >
      </modal-edit-attendance-vue>
    </modal-view>
  </teleport>
</template>

<script>
import { ref } from "@vue/reactivity";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import ModalEditAttendanceVue from "./ModalEditAttendance.vue";
import {
  CheckLate,
  CheckSoon,
  CountMinutesLateSingle,
  CountMinutesSoonSingle,
  FormatDate,
} from "@/constants/FormatAll";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    TheTab,
    TabNav,
    ModalEditAttendanceVue,
  },
  props: {
    AttendanceDetail: {
      type: Object,
    },
    closeModal: {
      type: Function,
    },
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    setSelected(tab) {
      this.selected = tab;
    },
    formatTime(index) {
      if (index) {
        let arr = index.split(" ");
        return arr[1] + ", " + this.formatDate(arr[0]);
      }
    },
    getHour(index) {
      if (index) {
        let arr = index.split(" ");
        return arr[1];
      }
    },
    formatMachine(item) {
      if (item) {
        if (item.from_type == "MACHINE") {
          return "(máy), mã máy: " + item.machine_code;
        } else if (item.from_type == "GPS") {
          return "(GPS)";
        } else if (item.from_type != "MACHINE") {
          let key = this.listApproval.find((obj) => obj.code == item.from_type);
          return ` (${key.title})`;
        }
      }
    },
    formatTimeLeave(arrLeave) {
      if (arrLeave.shifts_start == 0) {
        if (arrLeave.shifts_end == 0) {
          return (
            "Nửa ca đầu " +
            this.formatDate(arrLeave.date_start) +
            " - " +
            "Nửa ca đầu " +
            this.formatDate(arrLeave.date_end)
          );
        } else if (arrLeave.shifts_end == 1) {
          return (
            "Nửa ca đầu " +
            this.formatDate(arrLeave.date_start) +
            " - " +
            "Nửa ca sau " +
            this.formatDate(arrLeave.date_end)
          );
        }
      } else if (arrLeave.shifts_start == 1) {
        if (arrLeave.shifts_end == 0) {
          return (
            "Nửa ca sau " +
            this.formatDate(arrLeave.date_start) +
            " - " +
            "Nửa ca đầu " +
            this.formatDate(arrLeave.date_end)
          );
        } else if (arrLeave.shifts_end == 1) {
          return (
            "Nửa ca sau " +
            this.formatDate(arrLeave.date_start) +
            " - " +
            "Nửa ca sau " +
            this.formatDate(arrLeave.date_end)
          );
        }
      }
    },
    CheckLate(obj) {
      return CheckLate(obj);
    },
    CheckSoon(obj) {
      return CheckSoon(obj);
    },
    CountMinutesLateSingle(obj) {
      return CountMinutesLateSingle(obj);
    },
    CountMinutesSoonSingle(obj) {
      return CountMinutesSoonSingle(obj);
    },
  },
  setup(props) {
    const store = useStore();
    const selected = ref("Tổng hợp");
    const isLoadingShow = ref(true);
    const attendanceDetail = ref(props.AttendanceDetail);
    const isOpenEditAttendance = ref(false);
    const detailApprovalTimekeep = computed(
      () => store.state.timekeepAttendance.detailApprovalTimekeep
    );
    const detailTimekeepAttendance = computed(
      () => store.state.timekeepAttendance.detailTimekeepAttendance
    );
    const listApproval = computed(() => store.state.ApprovalTotal.listApproval);
    const handleHideDetail = () => {
      props.closeModal();
    };
    const handleCloseEditAttendance = () => {
      isOpenEditAttendance.value = false;
    };
    const handleOpenEditAttendance = () => {
      isOpenEditAttendance.value = true;
    };
    return {
      attendanceDetail,
      selected,
      detailApprovalTimekeep,
      detailTimekeepAttendance,
      isLoadingShow,
      listApproval,
      handleHideDetail,
      isOpenEditAttendance,
      handleCloseEditAttendance,
      handleOpenEditAttendance,
    };
  },
};
</script>

<style></style>
