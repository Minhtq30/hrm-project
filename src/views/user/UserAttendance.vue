<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <Transition name="slide-fade">
              <div v-if="isLoading == false">
                <div
                  class="ml-2 longText uppercase font-medium"
                  v-if="UserAttendance?.length"
                >
                  Bảng chấm công {{ this.$route.params.month }}/{{
                    this.$route.params.year
                  }}
                </div>
              </div></Transition
            >
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="">
          <div class="btn-icon relative" @click="show()">
            <div class="cx">
              <i class="fal fa-calendar-alt"></i>
            </div>
            <div class="action-label">Thời gian</div>
            <input
              type="month"
              id="start"
              name="start"
              v-model="time"
              ref="calendar"
              class="absolute opacity-0 bottom-0 right-0 left-0 cursor-pointer"
              @change="ChangeDate($event)"
            />
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div v-if="isLoading == false" class="h-full">
        <div class="flex p-2 h-full" v-if="UserAttendance?.length">
          <div
            class="calendar h-full overflow-auto sidebar relative"
            v-if="calendar"
          >
            <!-- head -->
            <div class="calendar-row head sticky top-0 z-10">
              <div
                v-for="(item, index) in dateOfWeek"
                :key="index"
                class="row-item"
              >
                <div v-text="item"></div>
              </div>
            </div>
            <!-- body -->
            <div
              v-for="(row, row_index) in calendar"
              :key="row_index"
              class="calendar-row"
            >
              <div
                v-for="(cell, cell_index) in row"
                :key="cell_index"
                class="row-item"
                @click="handleOpenAttendance(cell)"
              >
                <div
                  class="item-attendance"
                  :class="{
                    isToday: isToday(cell?.detail),
                    isLate: CheckLate(cell),
                    isSoon: CheckSoon(cell),
                  }"
                >
                  <div class="item-attendance-cell">
                    <div class="item-attendance-date">
                      {{ formatDay(cell) }}
                    </div>
                    <div style="color: #777">
                      {{ formatAttendance(cell) }}
                    </div>
                    <div
                      style="
                        font-size: 0.8em;
                        padding-bottom: 5px;
                        font-weight: bold;
                      "
                      title="Thời gian thực tế"
                    >
                      {{ formatTimeStart(cell) }}{{ formatTimeEnd(cell) }}
                    </div>
                    <div
                      style="font-size: 0.9em"
                      :title="cell ? cell.shift_title : ''"
                    >
                      {{ cell ? cell.shift_code : "" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-[300px] border">
            <div
              class="flex-col w-full h-full overflow-auto px-3 bg-slate-100 sidebar"
            >
              <div class="attendance-user-first">
                <div>Công làm việc</div>
                <div>
                  {{ ResultAttendance.total_number_work_real_in_day }}
                </div>
              </div>
              <div class="attendance-user">
                <div>Giờ làm việc thực tính</div>
                <div>
                  {{
                    ResultAttendance.total_number_time_work_real_in_day_no_use_round
                  }}
                </div>
              </div>
              <div class="attendance-user">
                <div>Số công chuẩn</div>
                <div>
                  {{ Number(ResultAttendance.total_worktime_in_month) }}
                </div>
              </div>
              <div class="attendance-user">
                <div>Số lần đi muộn</div>
                <!-- <div>{{ CountLate(UserAttendance) }}</div> -->
                <div>
                  {{ Number(ResultAttendance.total_number_minute_late) }}
                </div>
              </div>
              <div class="attendance-user">
                <div>Số lần về sớm</div>
                <!-- <div>{{ CountSoon(UserAttendance) }}</div> -->
                <div>
                  {{ Number(ResultAttendance.total_number_minute_soon) }}
                </div>
              </div>
              <div class="attendance-user">
                <div>Số phút đi muộn</div>
                <div>{{ Number(ResultAttendance.total_minute_late) }}</div>
              </div>
              <div class="attendance-user">
                <div>Số phút về sớm</div>
                <div>{{ Number(ResultAttendance.total_minute_soon) }}</div>
              </div>
              <div class="attendance-user">
                <div>Số công nghỉ không lý do</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Số lần quên check in/out</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Giờ làm việc thực tính ban đêm</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Giờ làm việc thực tính ban ngày</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công làm thêm</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Giờ làm thêm</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công ăn làm thêm</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công ăn theo ca</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công ăn</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Tiền phạt đi muộn</div>
                <div>{{ formatPrice(ResultAttendance.total_money_late) }}</div>
              </div>
              <div class="attendance-user">
                <div>Tiền phạt về sớm</div>
                <div>{{ formatPrice(ResultAttendance.total_money_soon) }}</div>
              </div>
              <div class="attendance-user">
                <div>Tiền phạt nghỉ không lý do</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Tiền phạt quên check inout</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Tiền phạt chấm công</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công phạt đi muộn</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công phạt về sớm</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công phạt nghỉ không lý do</div>
                <div></div>
              </div>
              <div class="attendance-user">
                <div>Công phạt quên check inout</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[200px] h-[200px]" />
          </div>
        </div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenAttendance"
      :handleCloseDetail="handleCloseAttendance"
    >
      <div class="w-[460px]">
        <h1 class="header-modal">
          chấm công , ngày {{ formatDate(dateModal.detail) }}
        </h1>
        <div class="text-left p-2 flex-col" v-if="dateModal.shift_code">
          <div class="attendance-user-first">
            <div>Tổng công</div>
            <div>{{ Number(dateModal.number_work_real_in_day) }}</div>
          </div>
          <div class="attendance-user">
            <div>Tổng giờ làm</div>
            <div>
              {{ Number(dateModal.number_time_work_real_in_day_no_use_round) }}
            </div>
          </div>
          <div class="attendance-user" v-if="CheckLate(dateModal)">
            <div>Phạt tiền đi muộn</div>
            <div>{{ CountMinutesLateSingle(dateModal) }}</div>
          </div>
          <div class="attendance-user" v-if="CheckSoon(dateModal)">
            <div>Phạt tiền về sớm</div>
            <div>{{ CountMinutesSoonSingle(dateModal) }}</div>
          </div>
          <div class="attendance-user">
            <div>Chốt vân tay trong ngày</div>
            <div>
              <span>{{ formatTimeStart(dateModal) }}</span
              ><span>{{ formatTimeEnd(dateModal) }}</span>
            </div>
          </div>
          <div class="attendance-user">
            <div>Ca làm việc</div>
            <div>{{ dateModal.shift_code }} - {{ dateModal.shift_title }}</div>
          </div>
          <div class="attendance-user">
            <div>Thời gian</div>
            <div>
              {{ dateModal.shift_time_start }} - {{ dateModal.shift_time_end }}
            </div>
          </div>
          <div class="attendance-user">
            <div>Số công</div>
            <div>{{ dateModal.time_work_in_day }}</div>
          </div>
          <div
            v-if="
              dateModal?.checktime?.money_late > 0 ||
              dateModal?.checktime?.money_soon > 0
            "
            class="attendance-user"
          >
            <div>Phạt</div>
            <div class="flex-col">
              <div v-if="dateModal?.checktime.money_late > 0">
                Tiền phạt đi muộn :
                {{ formatPrice(dateModal?.checktime?.money_late) }}({{
                  Number(dateModal?.checktime?.minute_late)
                }}p)
              </div>
              <div v-if="dateModal?.checktime.money_soon > 0">
                Tiền phạt về sớm :
                {{ formatPrice(dateModal?.checktime?.money_soon) }}({{
                  Number(dateModal?.checktime?.minute_soon)
                }}p)
              </div>
            </div>
          </div>
          <div
            v-if="
              dateModal?.checktime?.punish_late > 0 ||
              dateModal?.checktime?.punish_soon > 0
            "
            class="attendance-user"
          >
            <div>Phạt công</div>
            <div class="flex-col">
              <div v-if="dateModal?.checktime?.punish_late > 0">
                Phạt công đi muộn :
                {{ formatPrice(dateModal?.checktime?.punish_late) }}
              </div>
              <div v-if="dateModal?.checktime.punish_soon > 0">
                Phạt công về sớm :
                {{ formatPrice(dateModal?.checktime?.punish_soon) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              dateModal?.checktime?.approval_leave != '' ||
              dateModal?.checktime?.approval_meeting != '' ||
              dateModal?.checktime?.approval_overtime != '' ||
              dateModal?.checktime?.approval_private_mission != '' ||
              dateModal?.checktime?.approval_privilege_application != '' ||
              dateModal?.checktime?.approval_shift_assign != '' ||
              dateModal?.checktime?.approval_shift_register != ''
            "
            class="attendance-user"
          >
            <div>Đơn</div>
            <div class="flex-col">
              <div
                v-if="dateModal?.checktime?.approval_leave != ''"
                class="cursor-pointer text-red-500 hover:underline"
                @click="
                  handleShowDetailApprovalLeave(
                    dateModal?.checktime?.approval_leave
                  )
                "
              >
                Đơn xin nghỉ
              </div>
              <div
                v-if="dateModal?.checktime?.approval_meeting != ''"
                class="cursor-pointer text-red-500 hover:underline"
                @click="
                  handleShowDetailApprovalAbsence(
                    dateModal?.checktime?.approval_meeting
                  )
                "
              >
                Vắng mặt
              </div>
              <div
                v-if="dateModal?.checktime?.approval_overtime != ''"
                class="cursor-pointer text-red-500 hover:underline"
                @click="
                  handleShowDetailApprovalOverTime(
                    dateModal?.checktime?.approval_overtime
                  )
                "
              >
                Làm thêm
              </div>
              <div
                v-if="dateModal?.checktime?.approval_private_mission != ''"
                class="cursor-pointer text-red-500 hover:underline"
                @click="
                  handleShowMissionApprove(
                    dateModal?.checktime?.approval_private_mission
                  )
                "
              >
                Công tác
              </div>
              <div
                v-if="
                  dateModal?.checktime?.approval_privilege_application != ''
                "
                class="cursor-pointer text-red-500 hover:underline"
                @click="
                  handleShowDetailApprovalOverTime(
                    dateModal?.checktime?.approval_privilege_application
                  )
                "
              >
                Nghỉ chế độ
              </div>
              <div
                v-if="dateModal?.checktime?.approval_shift_assign != ''"
                class="cursor-pointer text-red-500 hover:underline"
                @click="
                  handleShowAsignDetail(
                    dateModal?.checktime?.approval_shift_assign
                  )
                "
              >
                Phân ca
              </div>
              <div
                v-if="dateModal?.checktime?.approval_shift_register != ''"
                class="cursor-pointer text-red-500 hover:underline"
                @click="
                  handleShowShiftRegister(
                    dateModal?.checktime?.approval_shift_register
                  )
                "
              >
                Đăng kí ca
              </div>
            </div>
          </div>
        </div>
        <div class="text-left p-2" v-else>
          Không có thông tin chấm công hoặc không làm việc ngày này.
        </div>
      </div>
    </modal-view>
  </teleport>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarUser from "@/components/sidebar/SidebarUser.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import noData from "@/assets/images/noData.png";
import { ref } from "@vue/reactivity";
import {
  CheckLate,
  CheckSoon,
  CountMinutesLate,
  CountMinutesLateSingle,
  CountMinutesSoon,
  CountMinutesSoonSingle,
  CountMoneyLate,
  CountMoneySoon,
  FormatDate,
  FormatPrice,
} from "@/constants/FormatAll";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarUser,
    NavbarSocial,
    NavFeature,
  },
  data() {
    return {
      dateOfWeek: [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
      ],
      imgNoData: noData,
    };
  },
  methods: {
    show() {
      this.$refs.calendar.showPicker();
    },
    formatDay(day) {
      if (day) {
        let date = new Date(day.detail);
        return date.getDate() + "/" + (date.getMonth() + 1);
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
    isToday(index) {
      let date = new Date(index);
      const date1 = new Date();
      if (
        date.getDate() == date1.getDate() &&
        date.getMonth() == date1.getMonth() &&
        date.getFullYear() == date1.getFullYear()
      ) {
        return true;
      } else {
        return false;
      }
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
    formatAttendance(cell) {
      if (cell && cell.detail) {
        let date1 = new Date(cell.detail);
        let date2 = new Date();
        if (cell) {
          if (date1 < date2) {
            return Number(cell.number_work_real_in_day);
          } else {
            return 0;
          }
        }
      }
    },
    formatTimeStart(cell) {
      if (cell && cell.detail) {
        let date1 = new Date(cell.detail);
        let date2 = new Date();
        if (cell) {
          if (date1 < date2) {
            if (date1.getDay() > 0) {
              if (cell.time_checkin) {
                let arr = cell.time_checkin.split(" ");
                return arr[1].slice(0, -3) + " - ";
              } else {
                return "x - ";
              }
            } else {
              return "";
            }
          } else {
            if (cell.shift_time_start) {
              return cell.shift_time_start.slice(0, -3) + " - ";
            }
          }
        }
      }
    },
    formatTimeEnd(cell) {
      if (cell && cell.detail) {
        let date1 = new Date(cell.detail);
        let date2 = new Date();
        if (cell) {
          if (date1 < date2) {
            if (date1.getDay() > 0) {
              if (cell.time_checkout) {
                let arr = cell.time_checkout.split(" ");
                return arr[1].slice(0, -3);
              } else {
                return "x";
              }
            } else {
              return "";
            }
          } else {
            if (cell.shift_time_end) {
              return cell.shift_time_end.slice(0, -3);
            }
          }
        }
      }
    },
    CountAttendance(arr) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        let date1 = new Date(arr[i].detail);
        let date2 = new Date();
        if (arr[i]) {
          if (date1 < date2) {
            count = count + Number(arr[i].number_work_real_in_day);
          } else {
            count = count + 0;
          }
        }
      }
      return count;
    },
    CountLate(arr) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        let date1 = new Date(arr[i].detail);
        let date2 = new Date();
        if (arr[i]) {
          if (date1 < date2) {
            if (arr[i].result_check_checkin) {
              let key = arr[i].result_check_checkin.split(",");
              if (key[0] == "ok") {
                count = count + 0;
              } else {
                count = count + 1;
              }
            }
          } else {
            count = count + 0;
          }
        }
      }
      return count;
    },
    CountSoon(arr) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        let date1 = new Date(arr[i].detail);
        let date2 = new Date();
        if (arr[i]) {
          if (date1 < date2) {
            if (arr[i].result_check_checkout) {
              let key = arr[i].result_check_checkout.split(",");
              if (key[0] == "soon") {
                count = count + 1;
              } else {
                count = count + 0;
              }
            }
          } else {
            count = count + 0;
          }
        }
      }
      return count;
    },
    CountMinutesLate(arr) {
      return CountMinutesLate(arr);
    },
    CountMinutesLateSingle(obj) {
      return CountMinutesLateSingle(obj);
    },
    CountMinutesSoon(arr) {
      return CountMinutesSoon(arr);
    },
    CountMinutesSoonSingle(obj) {
      return CountMinutesSoonSingle(obj);
    },
    TotalMoneyLate(arr) {
      return CountMoneyLate(arr);
    },
    TotalMoneySoon(arr) {
      return CountMoneySoon(arr);
    },
    CheckLate(obj) {
      return CheckLate(obj);
    },
    CheckSoon(obj) {
      return CheckSoon(obj);
    },
    TotalHoursWork(arr) {
      let total = 0;
      for (let i = 0; i < arr?.length; i++) {
        total =
          total + Number(arr[i].number_time_work_real_in_day_no_use_round);
      }
      return total;
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);
    let date = new Date();
    const time = new Date();
    const isOpenAttendance = ref(false);
    const dateModal = ref();
    const dataDate = ref();
    const calendar = ref();
    dataDate.value = {
      year: route.params.year,
      month: route.params.month,
    };
    const profile = useUserProfile();
    const { UserAttendance, ResultAttendance } = storeToRefs(profile);
    const buildCalendar = () => {
      let arr = [[]];
      // lấy ngày đầu và ngày cuối trong tháng
      let firstDay = new Date(UserAttendance.value[0].detail);
      let lastDay = new Date(
        UserAttendance.value[UserAttendance.value.length - 1].detail
      );
      // đếm ngày
      let countDay = 1;
      // nếu countDay lớn hơn số ngày cuối trong tháng thì mình dừng vòng lặp
      for (let i = 1; countDay <= UserAttendance.value.length; i++) {
        for (let j = 0; j < 7; j++) {
          // first loop
          if (i == 1) {
            if (j < firstDay.getDay()) arr[arr.length - 1].push(0);
            else {
              arr[arr.length - 1].push(UserAttendance.value[countDay - 1]);
              countDay++;
            }
          } else {
            if (countDay > lastDay.getDate()) arr[arr.length - 1].push(0);
            else {
              arr[arr.length - 1].push(UserAttendance.value[countDay - 1]);
              countDay++;
            }
          }
        }
        if (countDay > lastDay.getDate()) break;
        arr.push([]);
      }
      calendar.value = arr;
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
      if (UserAttendance.value?.length > 0) {
        buildCalendar();
      }
    };
    profile.GetUserAttendanceAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Chấm công cá nhân") {
        isLoading.value = true;
        profile.GetUserAttendanceAction({
          data: { year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    const handleCloseAttendance = () => {
      isOpenAttendance.value = false;
    };
    const handleOpenAttendance = (index) => {
      if (index == 0) {
        isOpenAttendance.value = false;
      } else {
        isOpenAttendance.value = true;
        dateModal.value = index;
      }
    };
    const handleShowDetailApprovalLeave = (id) => {
      router.push(`/approval-leave-view/detail=${id}`);
    };
    const handleShowDetailApprovalAbsence = (id) => {
      router.push(`/approval-absence-view/detail=${id}`);
    };
    const handleShowDetailApprovalOverTime = (id) => {
      router.push(`/approval-overtime-view/detail=${id}`);
    };
    const handleShowAsignDetail = (id) => {
      router.push(`/timekeep-attendance-assign-detail/${id}`);
    };
    const handleShowMissionApprove = (id) => {
      router.push(`/approval-mission-view/detail=${id}`);
    };
    const handleShowPrivilegeApprove = (id) => {
      router.push(`/approval-worktime-view/detail=${id}`);
    };
    const handleShowShiftRegister = (id) => {
      router.push(`/approval-shiftresgister-view/detail=${id}`);
    };
    const ChangeDate = (event) => {
      isLoading.value = true;
      let date = new Date(event.target.value);
      router.push(
        `/user/attendance/month=${
          date.getMonth() + 1
        }&year=${date.getFullYear()}`
      );
    };
    return {
      isLoading,
      date,
      time,
      dataDate,
      dateModal,
      isOpenAttendance,
      UserAttendance,
      calendar,
      ResultAttendance,
      handleCloseAttendance,
      handleOpenAttendance,
      EndTimeLoading,
      buildCalendar,
      ChangeDate,
      handleShowDetailApprovalAbsence,
      handleShowDetailApprovalLeave,
      handleShowDetailApprovalOverTime,
      handleShowAsignDetail,
      handleShowMissionApprove,
      handleShowPrivilegeApprove,
      handleShowShiftRegister,
    };
  },
};
</script>

<style scoped>
.item-attendance {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.item-attendance-cell {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.item-attendance-date {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 0.7em;
  color: #333;
}
.isToday {
  background-color: antiquewhite;
}
.isLate {
  color: red;
}
.isSoon {
  color: orangered;
}
.calendar {
  height: 100%;
  flex: 1;
}
.calendar .calendar-row {
  display: flex;
}
.calendar .calendar-row.head > div {
  height: 42px;
  color: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(241, 245, 249);
  font-size: 16px;
  font-weight: 500;
}
.calendar .calendar-row .row-item {
  flex-grow: 1;
  position: relative;
  border-top: none;
  border: thin solid #e2e8f0;
  min-width: 100px;
  width: calc(100% / 7);
  height: 120px;
  cursor: pointer;
}
.calendar .calendar-row .row-item > span {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #333333;
  font-size: 10px;
}
</style>
