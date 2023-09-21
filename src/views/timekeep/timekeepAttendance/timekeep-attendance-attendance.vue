<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="sm:longText max-sm:hidden">Chấm công</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature class="max-sm:!justify-start">
        <div class="flex items-center">
          <p
            class="ml-2 md:longText text-[14px] max-sm:text-[10px] max-sm:w-[80px]"
          >
            Bảng chấm công từ {{ formatDate(arrDayFull[0]) }} đến
            {{ formatDate(arrDayFull[arrDayFull.length - 1]) }}
          </p>
        </div>
        <div class="flex">
          <div class="btn-icon relative cursor-pointer" @click="show()">
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
              class="absolute opacity-0 bottom-0 right-0 left-0"
              @change="ChangeDate($event)"
            />
          </div>
          <div
            v-if="detailTimekeepAttendanceFullList.attendance_lock == '0'"
            @click="handleOpenConfirmLockAttend()"
            class="btn-icon"
          >
            <div class="cx">
              <i class="fal fa-check"></i>
            </div>
            <div class="action-label">Chốt</div>
          </div>
          <div
            v-else
            @click="handleOpenConfirmRevertLockAttend()"
            class="btn-icon"
          >
            <div class="cx">
              <i class="fal fa-undo"></i>
            </div>
            <div class="action-label">Hoàn chốt</div>
          </div>
          <div
            v-if="detailTimekeepAttendanceFullList.approval_lock == '0'"
            @click="handleOpenLockApproval()"
            class="btn-icon"
          >
            <div class="cx">
              <i class="fal fa-lock-alt"></i>
            </div>
            <div class="action-label">Chốt đơn</div>
          </div>
          <div v-else @click="handleOpenRevertLockApproval()" class="btn-icon">
            <div class="cx">
              <i class="far fa-unlock-alt"></i>
            </div>
            <div class="action-label">Mở đơn</div>
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-import"></i>
            </div>
            <div class="action-label">Import</div>
            <div
              class="absolute ml-[250px] z-50 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-3 rounded-md pr-[200px]">
                <li class="w-52 sub-item">Import chốt vân tay</li>
                <li class="w-52 sub-item">Import công ngày</li>
                <li class="w-52 sub-item">Import chốt vân tay (MCC)</li>
              </ul>
            </div>
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute ml-[150px] z-50 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md pr-[200px]">
                <li class="w-52 sub-item" @click="AllExport()">Export</li>
                <li class="w-52 sub-item" @click="handleOpenModalLog()">
                  Export Log chấm công
                </li>
                <li class="w-52 sub-item">Eport to that</li>
              </ul>
            </div>
          </div>
          <!-- <div class="btn-icon">
              <div class="cx">
                <i class="fal fa-stopwatch"></i>
              </div>
              <div class="action-label">Lịch sử</div>
            </div> -->
          <div
            class="btn-icon"
            @click="this.$router.push('/timekeep-setting-attendance')"
          >
            <div class="cx">
              <i class="fal fa-cog"></i>
            </div>
            <div class="action-label">Cài đặt</div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listTimekeepAttendance?.length">
          <table
            class="h-full whitespace-nowrap border border-[#e5e7e9] w-full relative"
            border="1"
          >
            <thead>
              <tr>
                <th
                  class="left-0 headerTableTimekeepZ10"
                  style="width: 1%; min-width: 40px"
                  rowspan="2"
                >
                  STT
                </th>
                <th
                  class="headerTableTimekeepZ10"
                  rowspan="2"
                  style="width: 2%; min-width: 95px; left: 75px"
                >
                  Mã NV
                </th>
                <th
                  class="headerTableTimekeepZ10"
                  rowspan="2"
                  style="width: 4%; min-width: 210px; left: 170px"
                >
                  Họ và tên
                </th>
                <th
                  class="headerTableTimekeepZ10"
                  rowspan="2"
                  style="width: 6%; min-width: 305px; left: 380px"
                >
                  Phòng ban
                </th>
                <th class="headerTableTimekeepZ7" rowspan="2">Vị trí</th>
                <th
                  class="headerTableTimekeepZ5"
                  v-for="(item, index) in arrDayFull"
                  :key="index"
                  :class="formatWeekend(item.getDay())"
                >
                  {{ formatRank(item.getDay()) }}
                </th>
                <th class="headerTableTimekeepZ5" colspan="3">Đi muộn</th>
                <th class="headerTableTimekeepZ5" colspan="3">Về sớm</th>
                <th class="headerTableTimekeepZ5" colspan="2">
                  Quên check in/out
                </th>
                <th class="headerTableTimekeepZ5" colspan="2">
                  Nghỉ không lý do
                </th>
                <th class="headerTableTimekeepZ5" colspan="11">Nghỉ</th>
                <th class="headerTableTimekeepZ5" colspan="3">Nghỉ phép</th>
                <th class="headerTableTimekeepZ5" colspan="4">Nghỉ bù</th>
                <th class="headerTableTimekeepZ5" colspan="3">Công chính</th>
                <th class="headerTableTimekeepZ5" colspan="6">Làm thêm</th>
                <th class="headerTableTimekeepZ5" colspan="2">Tăng ca</th>
                <th class="headerTableTimekeepZ5" rowspan="2">Công ăn</th>
                <th class="headerTableTimekeepZ5" rowspan="2">Công chuẩn</th>
                <th class="headerTableTimekeepZ5" colspan="6">Công tổng</th>
              </tr>
              <tr>
                <th
                  class="headerTableTimekeepZ5T46"
                  v-for="(item, index) in arrDayFull"
                  :key="index"
                  :class="formatWeekend(item.getDay())"
                >
                  {{ item.getDate() }}
                </th>
                <th class="headerTableTimekeepZ5T46">Số phút</th>
                <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                <th class="headerTableTimekeepZ5T46">Công phạt</th>
                <th class="headerTableTimekeepZ5T46">Số phút</th>
                <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                <th class="headerTableTimekeepZ5T46">Công phạt</th>
                <th class="headerTableTimekeepZ5T46">Số lần</th>
                <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                <th class="headerTableTimekeepZ5T46">Số lần</th>
                <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                <th class="headerTableTimekeepZ5T46">NB</th>
                <th class="headerTableTimekeepZ5T46">CÔ</th>
                <th class="headerTableTimekeepZ5T46">NC</th>
                <th class="headerTableTimekeepZ5T46">SÔ</th>
                <th class="headerTableTimekeepZ5T46">STS</th>
                <th class="headerTableTimekeepZ5T46">KH</th>
                <th class="headerTableTimekeepZ5T46">KL</th>
                <th class="headerTableTimekeepZ5T46">Ô</th>
                <th class="headerTableTimekeepZ5T46">P</th>
                <th class="headerTableTimekeepZ5T46">NT</th>
                <th class="headerTableTimekeepZ5T46">NS</th>
                <th class="headerTableTimekeepZ5T46">Đầu kỳ</th>
                <th class="headerTableTimekeepZ5T46">Đã dùng</th>
                <th class="headerTableTimekeepZ5T46">Cuối kỳ</th>
                <th class="headerTableTimekeepZ5T46">Đầu kỳ</th>
                <th class="headerTableTimekeepZ5T46">Đã dùng</th>
                <th class="headerTableTimekeepZ5T46">Số giờ thêm</th>
                <th class="headerTableTimekeepZ5T46">Cuối kỳ</th>
                <th class="headerTableTimekeepZ5T46">Công ca</th>
                <th class="headerTableTimekeepZ5T46">Công lễ</th>
                <th class="headerTableTimekeepZ5T46">Công tác</th>
                <th class="headerTableTimekeepZ5T46">Giờ làm đêm</th>
                <th class="headerTableTimekeepZ5T46">Giờ ngày lễ</th>
                <th class="headerTableTimekeepZ5T46">Giờ ngày nghỉ</th>
                <th class="headerTableTimekeepZ5T46">Số ngày làm thêm</th>
                <th class="headerTableTimekeepZ5T46">Số giờ</th>
                <th class="headerTableTimekeepZ5T46">Số công</th>
                <th class="headerTableTimekeepZ5T46">Số giờ</th>
                <th class="headerTableTimekeepZ5T46">Số công</th>
                <th class="headerTableTimekeepZ5T46">Giờ đêm</th>
                <th class="headerTableTimekeepZ5T46">Tổng giờ</th>
                <th class="headerTableTimekeepZ5T46">Số công</th>
                <th class="headerTableTimekeepZ5T46">Công TV</th>
                <th class="headerTableTimekeepZ5T46">Công CTQ1</th>
                <th class="headerTableTimekeepZ5T46">Công CTQ2</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(attendances, index) in listTimekeepAttendance"
                :key="index"
                @contextmenu.prevent="rightClick($event, attendances)"
              >
                <td
                  class="cellTableTimekeepZ6 text-center"
                  style="width: 1%; min-width: 40px"
                >
                  {{ index + listPagination.from }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="
                    ShowPeronnelDetail(
                      attendances?.detail_personnel?.personnel_id
                    )
                  "
                  style="width: 2%; min-width: 95px; left: 75px"
                >
                  {{ attendances?.detail_personnel?.code }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="
                    ShowPeronnelDetail(
                      attendances?.detail_personnel?.personnel_id
                    )
                  "
                  style="width: 4%; min-width: 210px; left: 170px"
                >
                  {{ attendances?.detail_personnel?.name }}
                </td>
                <td
                  class="cellTableTimekeepZ6"
                  style="width: 6%; min-width: 305px; left: 380px"
                >
                  {{ attendances?.detail_personnel?.department_title }}
                </td>
                <td class="cellTableTimekeepNoIndex text-left">
                  {{ attendances?.detail_personnel?.position_title }}
                </td>
                <td
                  class="cellTableTimekeepNoIndex cursor-pointer relative"
                  v-for="(item, index) in attendances.detail_attendance_month"
                  :key="index"
                  :class="formatWeekendShift(item)"
                  @click.prevent="handleShowDetail($event, item)"
                >
                  <span class="flex justify-center">
                    <p>{{ roundingShift(item) }}</p>
                    <p
                      v-if="
                        item?.checktime?.approval_leave &&
                        item?.checktime?.approval_leave != ''
                      "
                      class="text-[10px]"
                    >
                      N
                    </p>
                    <p
                      v-if="
                        item?.checktime?.approval_meeting &&
                        item?.checktime?.approval_meeting != ''
                      "
                      class="text-[10px]"
                    >
                      ,V
                    </p>
                    <p
                      v-if="
                        item?.checktime?.approval_overtime &&
                        item?.checktime?.approval_overtime != ''
                      "
                      class="text-[10px]"
                    >
                      ,LT
                    </p>
                    <p
                      v-if="
                        item?.checktime?.approval_private_mision &&
                        item?.checktime?.approval_private_mision != ''
                      "
                      class="text-[10px]"
                    >
                      ,CT
                    </p>
                    <p
                      v-if="
                        item?.checktime?.approval_privilege_application &&
                        item?.checktime?.approval_privilege_application != ''
                      "
                      class="text-[10px]"
                    >
                      TS
                    </p>
                  </span>
                </td>
                <!-- Đi muộn -->
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.result_attendance_month?.total_minute_late }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    formatPrice(
                      attendances?.result_attendance_month?.total_money_late
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.result_attendance_month?.total_punish_late }}
                </td>
                <!-- Về sớm -->
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.result_attendance_month?.total_minute_soon }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    formatPrice(
                      attendances?.result_attendance_month?.total_money_soon
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.result_attendance_month?.total_punish_soon }}
                </td>
                <!-- Quên chốt -->
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex"></td>
                <!-- Nghỉ không lý do -->
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex"></td>
                <!-- Nghỉ -->
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.NB }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.CÔ }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.NC }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.SÔ }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.STS }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.KH }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.KL }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.Ô }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.P }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.NT }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{ attendances?.total_approval_leave?.NS }}
                </td>
                <!-- Nghỉ phép -->
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month?.furlough_total_open
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month?.furlough_total_used
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.furlough_total_closed
                    )
                  }}
                </td>
                <!-- Nghỉ bù -->
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.compensatory_total_open
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.compensatory_total_used
                    )
                  }}
                </td>
                <!-- tạm thời chưa có -->
                <td class="cellTableTimekeepNoIndex">
                  <!-- {{
                    Number(
                      attendances?.result_attendance_month
                        ?.compensatory_total_used
                    )
                  }} -->
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.compensatory_total_closed
                    )
                  }}
                </td>

                <!-- Công chính -->
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex"></td>
                <!-- Làm tdêm -->
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    attendances?.result_attendance_month
                      ?.total_number_hour_overtime_in_weekoff
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    attendances?.result_attendance_month
                      ?.total_number_day_overtime
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    attendances?.result_attendance_month
                      ?.total_number_hour_overtime
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    attendances?.result_attendance_month
                      ?.total_number_work_overtime
                  }}
                </td>
                <!-- Tăng ca -->
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex"></td>
                <!-- Công ăn -->
                <td class="cellTableTimekeepNoIndex"></td>
                <!-- Công chuẩn -->
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.total_worktime_in_month
                    )
                  }}
                </td>
                <!-- Công tổng -->
                <td class="cellTableTimekeepNoIndex"></td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.total_number_time_work_real_in_day_no_use_round
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.total_number_work_real_in_day
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.total_number_work_by_type_contract_TV
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex">
                  {{
                    Number(
                      attendances?.result_attendance_month
                        ?.total_number_work_by_type_contract_CT
                    )
                  }}
                </td>
                <td class="cellTableTimekeepNoIndex"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
          </div>
        </div>
      </div>
    </Transition>
    <!-- bảng ảo -->
    <div class="hidden">
      <Transition name="slide-fade">
        <div class="home w-full">
          <div>
            <table
              class="h-full whitespace-nowrap border border-[#e5e7e9] w-full relative"
              ref="tableTimekeeper"
              border="1"
            >
              <thead>
                <tr>
                  <th
                    class="left-0 headerTableTimekeepZ10"
                    style="width: 1%; min-width: 40px"
                    rowspan="2"
                  >
                    STT
                  </th>
                  <th
                    class="headerTableTimekeepZ10"
                    rowspan="2"
                    style="width: 2%; min-width: 95px; left: 75px"
                  >
                    Mã NV
                  </th>
                  <th
                    class="headerTableTimekeepZ10"
                    rowspan="2"
                    style="width: 4%; min-width: 210px; left: 170px"
                  >
                    Họ và tên
                  </th>
                  <th
                    class="headerTableTimekeepZ10"
                    rowspan="2"
                    style="width: 6%; min-width: 305px; left: 380px"
                  >
                    Phòng ban
                  </th>
                  <th class="headerTableTimekeepZ7" rowspan="2">Vị trí</th>
                  <th
                    class="headerTableTimekeepZ5"
                    v-for="(item, index) in arrDayFull"
                    :key="index"
                    :class="formatWeekend(item.getDay())"
                  >
                    {{ formatRank(item.getDay()) }}
                  </th>
                  <th class="headerTableTimekeepZ5" colspan="3">Đi muộn</th>
                  <th class="headerTableTimekeepZ5" colspan="3">Về sớm</th>
                  <th class="headerTableTimekeepZ5" colspan="2">
                    Quên check in/out
                  </th>
                  <th class="headerTableTimekeepZ5" colspan="2">
                    Nghỉ không lý do
                  </th>
                  <th class="headerTableTimekeepZ5" colspan="11">Nghỉ</th>
                  <th class="headerTableTimekeepZ5" colspan="3">Nghỉ phép</th>
                  <th class="headerTableTimekeepZ5" colspan="4">Nghỉ bù</th>
                  <th class="headerTableTimekeepZ5" colspan="3">Công chính</th>
                  <th class="headerTableTimekeepZ5" colspan="6">Làm thêm</th>
                  <th class="headerTableTimekeepZ5" colspan="2">Tăng ca</th>
                  <th class="headerTableTimekeepZ5" rowspan="2">Công ăn</th>
                  <th class="headerTableTimekeepZ5" rowspan="2">Công chuẩn</th>
                  <th class="headerTableTimekeepZ5" colspan="6">Công tổng</th>
                </tr>
                <tr>
                  <th
                    class="headerTableTimekeepZ5T46"
                    v-for="(item, index) in arrDayFull"
                    :key="index"
                    :class="formatWeekend(item.getDay())"
                  >
                    {{ item.getDate() }}
                  </th>
                  <th class="headerTableTimekeepZ5T46">Số phút</th>
                  <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                  <th class="headerTableTimekeepZ5T46">Công phạt</th>
                  <th class="headerTableTimekeepZ5T46">Số phút</th>
                  <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                  <th class="headerTableTimekeepZ5T46">Công phạt</th>
                  <th class="headerTableTimekeepZ5T46">Số lần</th>
                  <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                  <th class="headerTableTimekeepZ5T46">Số lần</th>
                  <th class="headerTableTimekeepZ5T46">Tiền phạt</th>
                  <th class="headerTableTimekeepZ5T46">NB</th>
                  <th class="headerTableTimekeepZ5T46">CÔ</th>
                  <th class="headerTableTimekeepZ5T46">NC</th>
                  <th class="headerTableTimekeepZ5T46">SÔ</th>
                  <th class="headerTableTimekeepZ5T46">STS</th>
                  <th class="headerTableTimekeepZ5T46">KH</th>
                  <th class="headerTableTimekeepZ5T46">KL</th>
                  <th class="headerTableTimekeepZ5T46">Ô</th>
                  <th class="headerTableTimekeepZ5T46">P</th>
                  <th class="headerTableTimekeepZ5T46">NT</th>
                  <th class="headerTableTimekeepZ5T46">NS</th>
                  <th class="headerTableTimekeepZ5T46">Đầu kỳ</th>
                  <th class="headerTableTimekeepZ5T46">Đã dùng</th>
                  <th class="headerTableTimekeepZ5T46">Cuối kỳ</th>
                  <th class="headerTableTimekeepZ5T46">Đầu kỳ</th>
                  <th class="headerTableTimekeepZ5T46">Đã dùng</th>
                  <th class="headerTableTimekeepZ5T46">Số giờ thêm</th>
                  <th class="headerTableTimekeepZ5T46">Cuối kỳ</th>
                  <th class="headerTableTimekeepZ5T46">Công ca</th>
                  <th class="headerTableTimekeepZ5T46">Công lễ</th>
                  <th class="headerTableTimekeepZ5T46">Công tác</th>
                  <th class="headerTableTimekeepZ5T46">Giờ làm đêm</th>
                  <th class="headerTableTimekeepZ5T46">Giờ ngày lễ</th>
                  <th class="headerTableTimekeepZ5T46">Giờ ngày nghỉ</th>
                  <th class="headerTableTimekeepZ5T46">Số ngày làm thêm</th>
                  <th class="headerTableTimekeepZ5T46">Số giờ</th>
                  <th class="headerTableTimekeepZ5T46">Số công</th>
                  <th class="headerTableTimekeepZ5T46">Số giờ</th>
                  <th class="headerTableTimekeepZ5T46">Số công</th>
                  <th class="headerTableTimekeepZ5T46">Giờ đêm</th>
                  <th class="headerTableTimekeepZ5T46">Tổng giờ</th>
                  <th class="headerTableTimekeepZ5T46">Số công</th>
                  <th class="headerTableTimekeepZ5T46">Công TV</th>
                  <th class="headerTableTimekeepZ5T46">Công CTQ1</th>
                  <th class="headerTableTimekeepZ5T46">Công CTQ2</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    attendances, index
                  ) in listAllTimekeepAttendanceExport"
                  :key="index"
                  @contextmenu.prevent="rightClick($event, attendances)"
                >
                  <td
                    class="cellTableTimekeepZ6 text-center"
                    style="width: 1%; min-width: 40px"
                  >
                    {{ index + listPagination.from }}
                  </td>
                  <td
                    class="cellTableTimekeepZ6 cursor-pointer"
                    @click="
                      ShowPeronnelDetail(
                        attendances?.detail_personnel?.personnel_id
                      )
                    "
                    style="width: 2%; min-width: 95px; left: 75px"
                  >
                    {{ attendances?.detail_personnel?.code }}
                  </td>
                  <td
                    class="cellTableTimekeepZ6 cursor-pointer"
                    @click="
                      ShowPeronnelDetail(
                        attendances?.detail_personnel?.personnel_id
                      )
                    "
                    style="width: 4%; min-width: 210px; left: 170px"
                  >
                    {{ attendances?.detail_personnel?.name }}
                  </td>
                  <td
                    class="cellTableTimekeepZ6"
                    style="width: 6%; min-width: 305px; left: 380px"
                  >
                    {{ attendances?.detail_personnel?.department_title }}
                  </td>
                  <td class="cellTableTimekeepNoIndex text-left">
                    {{ attendances?.detail_personnel?.position_title }}
                  </td>
                  <td
                    class="cellTableTimekeepNoIndex cursor-pointer relative"
                    v-for="(item, index) in attendances.detail_attendance_month"
                    :key="index"
                    :class="formatWeekendShift(item)"
                    @click.prevent="handleShowDetail($event, item)"
                  >
                    <span class="flex justify-center">
                      <p>{{ roundingShift(item) }}</p>
                      <p
                        v-if="
                          item?.checktime?.approval_leave &&
                          item?.checktime?.approval_leave != ''
                        "
                        class="text-[10px]"
                      ></p>
                      <p
                        v-if="
                          item?.checktime?.approval_meeting &&
                          item?.checktime?.approval_meeting != ''
                        "
                        class="text-[10px]"
                      ></p>
                      <p
                        v-if="
                          item?.checktime?.approval_overtime &&
                          item?.checktime?.approval_overtime != ''
                        "
                        class="text-[10px]"
                      ></p>
                      <p
                        v-if="
                          item?.checktime?.approval_private_mision &&
                          item?.checktime?.approval_private_mision != ''
                        "
                        class="text-[10px]"
                      ></p>
                      <p
                        v-if="
                          item?.checktime?.approval_privilege_application &&
                          item?.checktime?.approval_privilege_application != ''
                        "
                        class="text-[10px]"
                      ></p>
                    </span>
                  </td>
                  <!-- Đi muộn -->
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month?.total_minute_late
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      formatPrice(
                        attendances?.result_attendance_month?.total_money_late
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month?.total_punish_late
                    }}
                  </td>
                  <!-- Về sớm -->
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month?.total_minute_soon
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      formatPrice(
                        attendances?.result_attendance_month?.total_money_soon
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month?.total_punish_soon
                    }}
                  </td>
                  <!-- Quên chốt -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex"></td>
                  <!-- Nghỉ không lý do -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex"></td>
                  <!-- Nghỉ -->
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.NB }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.CÔ }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.NC }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.SÔ }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.STS }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.KH }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.KL }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.Ô }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.P }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.NT }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{ attendances?.total_approval_leave?.NS }}
                  </td>
                  <!-- Nghỉ phép -->
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.furlough_total_open
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.furlough_total_used
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.furlough_total_closed
                      )
                    }}
                  </td>
                  <!-- Nghỉ bù -->
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.compensatory_total_open
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.compensatory_total_used
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.total_worktime_in_month
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.compensatory_total_closed
                      )
                    }}
                  </td>

                  <!-- Công chính -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex"></td>
                  <!-- Làm tdêm -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month
                        ?.total_number_hour_overtime_in_weekoff
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month
                        ?.total_number_day_overtime
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month
                        ?.total_number_hour_overtime
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      attendances?.result_attendance_month
                        ?.total_number_work_overtime
                    }}
                  </td>
                  <!-- Tăng ca -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex"></td>
                  <!-- Công ăn -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <!-- Công chuẩn -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <!-- Công tổng -->
                  <td class="cellTableTimekeepNoIndex"></td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.total_number_time_work_real_in_day_no_use_round
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.total_number_work_real_in_day
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.total_number_work_by_type_contract_TV
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex">
                    {{
                      Number(
                        attendances?.result_attendance_month
                          ?.total_number_work_by_type_contract_CT
                      )
                    }}
                  </td>
                  <td class="cellTableTimekeepNoIndex"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>Không tìm thấy kết quả</h2>
            <div class="flex justify-center">
              <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <!-- hết bảng ảo -->
    <template v-slot:sub_footer v-if="listTimekeepAttendance?.length">
      <div class="flex justify-between items-center">
        <div class="p-4 text-sm max-sm:w-[155px]">
          Hiển thị {{ listPagination.from }} - {{ listPagination.to }} trong số
          {{ listPagination.total }} bản ghi
        </div>
        <div class="flex justify-end p-4">
          <pagination-view
            :listPagination="listPagination"
            :NextPage="NextPage"
            :PrevPage="PrevPage"
          ></pagination-view>
        </div>
      </div>
    </template>
  </person-layout>

  <div>
    <click-show-detail :isActive="isActive">
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
        <div class="text-left">
          <tab-nav
            :tabs="[
              'Tổng hợp',
              `Đơn từ(${CountApplication()})`,
              `Chốt vân tay(${detailTimekeepAttendance?.length})`,
              'Phạt',
            ]"
            :selected="selected"
            :paddingTab="true"
            @selected="setSelected"
          >
          </tab-nav>
          <div class="p-2 mt-[6px] border-t">
            <the-tab :isSelected="selected == 'Tổng hợp'">
              <div class="font-medium">
                Công làm việc trong ngày:
                {{ Number(attendanceDetail.time_work_in_day) }}
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
                  Number(
                    attendanceDetail.number_time_work_real_in_day_no_use_round
                  )
                }}
              </div>
              <div>
                Số công được tính:
                {{ Number(attendanceDetail.number_work_real_in_day) }}
              </div>
              <div>
                Số công làm thêm:
                {{ Number(attendanceDetail.checktime?.total_overtime_in_day) }}
              </div>
              <div>
                Số giờ làm thêm:
                {{
                  Number(attendanceDetail.checktime?.total_hour_overtime_in_day)
                }}
              </div>
            </the-tab>

            <the-tab :isSelected="selected == `Đơn từ(${CountApplication()})`">
              <div class="p-2">
                <div
                  v-if="
                    detailApprovalTimekeep.data_checkinout?.length == 0 &&
                    detailApprovalTimekeep.data_leave?.length == 0 &&
                    detailApprovalTimekeep.data_meeting?.length == 0 &&
                    detailApprovalTimekeep.data_overtime?.length == 0 &&
                    detailApprovalTimekeep.data_shift_assign?.length == 0 &&
                    detailApprovalTimekeep.data_shift_register?.length == 0 &&
                    detailApprovalTimekeep.data_private_mission?.length == 0 &&
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
                      v-for="(
                        approval, index
                      ) in detailApprovalTimekeep.data_leave"
                      :key="index"
                    >
                      <div>
                        Chi tiết:
                        <span
                          class="cursor-pointer text-red-500 hover:underline"
                          @click="handleShowDetailApproval(approval.ID)"
                          >Xin nghỉ</span
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
                    title="Chi tiết phân ca"
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
                    v-if="detailApprovalTimekeep.data_private_mission?.length"
                    class="text-left"
                    title="Đơn công tác"
                  >
                    <div class="font-medium">Đơn công tác</div>
                    <div
                      v-for="(
                        approval, index
                      ) in detailApprovalTimekeep.data_private_mission"
                      :key="index"
                    >
                      <div>
                        Chi tiết:
                        <span
                          class="cursor-pointer text-red-500 hover:underline"
                          @click="handleShowMissionApprove(approval.ID)"
                          >Công tác</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      detailApprovalTimekeep.data_approval_leave_application
                        ?.length
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
            <the-tab
              :isSelected="
                selected == `Chốt vân tay(${detailTimekeepAttendance?.length})`
              "
            >
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
              </div>
            </the-tab>
            <the-tab :isSelected="selected == 'Phạt'">
              <div class="text-left">
                Đi muộn: {{ attendanceDetail.checktime?.minute_late }} phút (
                Phạt tiền
                {{ formatPrice(attendanceDetail.checktime?.money_late) }}, Phạt
                công {{ attendanceDetail.checktime?.punish_late }})
              </div>
              <div class="text-left">
                Về sớm: {{ attendanceDetail.checktime?.minute_soon }} phút (
                Phạt tiền
                {{ formatPrice(attendanceDetail.checktime?.money_soon) }}, Phạt
                công {{ attendanceDetail.checktime?.punish_soon }})
              </div>
            </the-tab>
          </div>
        </div>
        <!-- <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[200px] h-[200px]" />
          </div>
        </div> -->
      </div>
    </click-show-detail>
  </div>
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
  <modal-view
    :isOpen="isOpenEditFinger"
    :handleCloseDetail="handleCloseEditFinger"
  >
    <update-finger-print
      :userDetail="userAttendanceDetail"
      :oldLog="oldManualLog"
      :closeModal="handleCloseEditFinger"
    ></update-finger-print>
  </modal-view>
  <modal-view
    :isOpen="isModalVisibleExport"
    :handleCloseDetail="handleCloseModalLog"
  >
    <ModalExportLog :closeModal="handleCloseModalLog"></ModalExportLog>
  </modal-view>
  <modal-view
    :isOpen="isOpenLockAttend"
    :handleCloseDetail="handleCloseConfirmLockAttend"
  >
    <div class="modal__body">
      <div>
        <h1 class="header-modal">Xác nhận chốt</h1>
        <div class="p-4 text-lg">
          <div>Bạn có chắc chắn muốn chốt bảng chấm công không??</div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="LockAttendance">Xác nhận</button>
          <button
            class="button-close-modal"
            @click="handleCloseConfirmLockAttend"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </modal-view>
  <modal-view
    :isOpen="isOpenRevertLockAttend"
    :handleCloseDetail="handleCloseConfirmRevertLockAttend"
  >
    <div class="modal__body">
      <div>
        <h1 class="header-modal">Xác nhận hoàn chốt</h1>
        <div class="p-4 text-lg">
          <div>Bạn có chắc chắn muốn hoàn chốt bảng chấm công không??</div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UnlockAttendance">
            Xác nhận
          </button>
          <button
            class="button-close-modal"
            @click="handleCloseConfirmRevertLockAttend"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </modal-view>
  <modal-view
    :isOpen="isOpenLockApproval"
    :handleCloseDetail="handleCloseLockApproval"
  >
    <div class="modal__body">
      <div>
        <h1 class="header-modal">Xác nhận khóa đơn</h1>
        <div class="p-4 text-lg">
          <div>Bạn có chắc chắn muốn chốt đơn từ không??</div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="LockApproval">Xác nhận</button>
          <button class="button-close-modal" @click="handleCloseLockApproval">
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </modal-view>
  <modal-view
    :isOpen="isOpenRevertLockApproval"
    :handleCloseDetail="handleCloseRevertLockApproval"
  >
    <div class="modal__body">
      <div>
        <h1 class="header-modal">Xác nhận mở đơn</h1>
        <div class="p-4 text-lg">
          <div>Bạn có chắc chắn muốn mở khóa đơn từ không??</div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UnlockApproval">Xác nhận</button>
          <button
            class="button-close-modal"
            @click="handleCloseRevertLockApproval"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </modal-view>
  <!-- <div>
    <ModalView1 v-show="isModalVisibleExport" @close="closeModalExport">
      <template v-slot:header><div class="p-1">Export dữ liệu</div></template>
      <template v-slot:body
        ><div class="grid grid-cols-1 gap-1 mt-2 w-[450px]">
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Loại</label>
            <div class="mt-1">
              <input
                type="text"
                class="form-control-input"
                placeholder="Nhập từ khóa"
                title=""
              />
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Từ ngày</label>
            <div class="mt-1">
              <date-picker is-expanded></date-picker>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Đến ngày</label>
            <div class="mt-1">
              <date-picker is-expanded></date-picker>
            </div>
          </div>
          <div class="mt-2 text-left">
            <label for="" class="form-group-label">Phòng ban sử dụng</label>
            <div class="departInput mt-1">
              <div class="departInput placeholder:text-lg">
                <v-select
                  label="title"
                  :options="listDepartments"
                  :reduce="(department) => department.ID"
                  @input="searchDepartment"
                  append-to-body
                  placeholder="Nhập mã hoặc tên"
                  class="rounded-3xl"
                  v-model="multiParams.department_id"
                >
                  <template #option="{ title }">
                    <div
                      class="departInput"
                      style="display: flex; align-items: baseline"
                    >
                      <strong>{{ title }}</strong>
                    </div>
                  </template>
                </v-select>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="w-full text-right">
          <button
            type="button"
            class="btn-green"
            style="background-color: var(--color-primary)"
            @click="multiSearch()"
          >
            Tìm
          </button>
          <button
            type="button"
            class="btn-green ml-2"
            style="background-color: var(--color-primary)"
            @click="closeModalSearch()"
            aria-label="Đóng"
          >
            Hủy bỏ
          </button>
        </div>
      </template>
    </ModalView1>
  </div> -->
  <context-menu :isActive="isActive">
    <ul>
      <li @click.prevent="RecalculateMerit()">
        <i class="fal fa-calculator"></i
        ><a href="#">Tính toán lại công, phạt</a>
      </li>
      <li @click.prevent="DeleteRecruitmentCampaign()">
        <i class="fal fa-file-export"></i><a href="#">Xuất file tính công</a>
      </li>
      <li
        v-if="
          checkRole([
            'TIMEKEEP_TIMEKEEP_MANAGE_ALL',
            'TIMEKEEP_TIMEKEEP_MANAGE_COMPANY',
            'TIMEKEEP_TIMEKEEP_MANAGE_BRANCH',
          ])
        "
        @click.prevent="handleOpenEditFinger()"
      >
        <i class="fal fa-hands-usd"></i><a href="#">Cập nhật chốt vân tay</a>
      </li>
    </ul>
  </context-menu>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingHide"
    :handleEndLoading="EndTimeLoadingHide"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import ClickShowDetail from "@/components/contextmenu/ClickShowDetail.vue";
import SearchView from "@/components/search/SearchView.vue";
import ModalEditAttendanceVue from "./ModalEditAttendance.vue";
import UpdateFingerPrint from "./UpdateFingerPrint.vue";
import ModalExportLog from "./ModalExportLog.vue";
import noData from "@/assets/images/noData.png";
import TheTab from "@/components/tab/TheTab.vue";
import TabNav from "@/components/tab/TabNav.vue";
import { ref, computed } from "@vue/reactivity";
// import ConfirmDialog from "primevue/confirmdialog";
import {
  CheckLate,
  CheckSoon,
  CountMinutesLateSingle,
  CountMinutesSoonSingle,
  DateRange,
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatPrice,
  FormatWeekdays,
  FormatWeekend,
  FormatWeekendShift,
  FormatRole,
} from "@/constants/FormatAll";
// import ModalView1 from "@/components/modal/ModalView1.vue";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useTimekeepAttendance } from "@/store/modules/timekeep/timekeepAttendance";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { utils, writeFileXLSX } from "xlsx";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { useUserProfile } from "@/store/modules/user/userProfile";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    NavFeature,
    ClickShowDetail,
    SearchView,
    TheTab,
    TabNav,
    ModalEditAttendanceVue,
    UpdateFingerPrint,
    ModalExportLog,
    // ConfirmDialog,
  },
  data() {
    return {
      imgNoData: noData,
      dateNow: new Date(),
      // signApprove: "",
    };
  },
  methods: {
    formatRank(index) {
      return FormatWeekdays(index);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatWeekend(item) {
      return FormatWeekend(item);
    },
    // formatSignApprove(item) {
    //   // console.log(item);
    //   if (item && item.checktime && item.checktime.approval_leave != "") {
    //     this.signApprove = "N";
    //     return true;
    //   } else if (
    //     item &&
    //     item.checktime &&
    //     item.checktime.approval_shift_assign != ""
    //   ) {
    //     this.signApprove = ",V";
    //     return true;
    //   }
    // },
    formatWeekendShift(item) {
      if (
        item.checktime &&
        (item.checktime.minute_late > 5 || item.checktime.minute_soon > 5)
      ) {
        return "text-rose-600 " + FormatWeekendShift(item.detail);
      } else {
        return FormatWeekendShift(item.detail);
      }
    },
    show() {
      this.$refs.calendar.showPicker();
    },
    setSelected(tab) {
      this.selected = tab;
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
    roundingShift(obj) {
      let date = new Date(obj.detail);
      if (date <= this.dateNow) {
        return Number(obj.number_work_real_in_day);
      } else {
        return "";
      }
    },
    formatTime(index) {
      if (index) {
        let arr = index.split(" ");
        return arr[1] + " , " + this.formatDate(arr[0]);
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
        } else if (item.from_type == "MANUAL") {
          return "(Chấm công thủ công)";
        } else if (item.from_type == "FULL_ATTENDANCE") {
          return "(Chấm công tự động)";
        }
        // let key = this.listApproval.find((obj) => obj.code == item.from_type);
        //   return ` (${key.title})`;
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
    CountMinutesLateSingle(obj) {
      return CountMinutesLateSingle(obj);
    },
    CheckLate(obj) {
      return CheckLate(obj);
    },
    CountMinutesSoonSingle(obj) {
      return CountMinutesSoonSingle(obj);
    },
    CheckSoon(obj) {
      return CheckSoon(obj);
    },
    CountApplication() {
      let number = 0;
      Object.values(this.detailApprovalTimekeep).forEach((value) => {
        if (value?.length > 0) {
          number++;
        }
      });
      return number;
    },
    ExportExcel() {
      const wb = utils.table_to_book(this.$refs.tableTimekeeper);
      writeFileXLSX(wb, "TimekeepAttendance.xlsx");
      // var type = "xlsx";
      // const data = document.getElementById("tableTimekeeper");

      // var file = utils.table_to_book(data, { sheet: "sheet1" });

      // write (file, { bookType: type, bookSST: true, type: "buffer" });

      // writeFileXLSX(file, "file." + type);
      // var elt = this.$refs.tableTimekeeper;
      // var wb = utils.table_to_book(elt, { sheet: "Sheet JS" });
      // return dl
      //   ? writeFileXLSX(wb, { bookType: type, bookSST: true, type: "base64" })
      //   : writeFileXLSX(
      //       wb,
      //       fn || (this.name + "." || "SheetJSTableExport.") + (type || "xlsx")
      //     );
    },
    AllExport() {
      this.isLoading = true;
      this.timekeepAttendance.GetAllTimekeepAttendanceExportAction({
        data: {
          page: this.listPagination.total,
          year: this.$route.params.year,
          month: this.$route.params.month,
        },
        funcitionExport: this.ExportExcel,
        EndTimeLoading: this.EndTimeLoading,
      });
      // this.$store.dispatch(
      //   "TimekeepAttendance/GetAllTimekeepAttendanceExportAction",
      //   {
      //     perPage: 50000,
      //     exportFuncition: this.ExportExcel(),
      //   }
      // );
    },
    showModalExport() {
      this.isModalVisibleExport = true;
      // this.$store.dispatch("assetStatus/getAllAssetStatusAction", "50");
    },
    closeModalSearch() {
      this.isModalVisibleSearch = false;
    },
    searchDepartment: _.debounce(function (e) {
      this.$store.dispatch(
        "departments/getAllDepartmentsAction",
        e.target.value
      );
    }, 350),
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const route = useRoute();
    const fullDay = ref([]);
    let date = new Date();
    const multiDate = ref([]);
    const arrDayFull = ref([]);
    const isLoading = ref(true);
    const isLoadingShow = ref(false);
    const isLoadingHide = ref(false);
    // const isOpenAttendanceLog = ref(false);
    // const isOpenAttendanceLog = ref(false);
    const time = new Date();
    const isActive = ref(false);
    const attendanceDetail = ref();
    const userAttendanceDetail = ref();
    const isModalVisibleExport = ref(false);
    const dataDate = ref();
    const attendanceID = ref();
    const selected = ref("Tổng hợp");
    const isOpenLockAttend = ref(false);
    const isOpenRevertLockAttend = ref(false);
    const isOpenLockApproval = ref(false);
    const isOpenRevertLockApproval = ref(false);
    const isOpenEditAttendance = ref(false);
    const isOpenEditFinger = ref(false);
    const timekeepAttendance = useTimekeepAttendance();
    const total = useApprovalTotal();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listApproval } = storeToRefs(total);
    const {
      listTimekeepAttendance,
      listPagination,
      detailTimekeepAttendance,
      detailApprovalTimekeep,
      listAllTimekeepAttendanceExport,
      detailTimekeepAttendanceFullList,
      oldManualLog,
    } = storeToRefs(timekeepAttendance);
    // const logAttend = computed(
    //   () => detailTimekeepAttendanceFullList?.value.attendance_lock
    // );
    // const logApprove = computed(
    //   () => detailTimekeepAttendanceFullList?.value.approval_lock
    // );
    // console.log(logApprove.value);
    // const isOpenAttendanceLog = ref(logAttend?.value == "1" ? true : false);
    // const isOpenApprovalLog = ref(logApprove?.value == "1" ? true : false);
    dataDate.value = {
      page: 1,
      year: route.params.year,
      month: route.params.month,
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingShow = () => {
      isLoadingShow.value = true;
    };
    const EndTimeLoadingHide = () => {
      isLoadingHide.value = false;
    };
    timekeepAttendance.GetAllTimekeepAttendanceAction({
      data: dataDate.value,
      EndTimeLoading,
    });

    watch(route, (to) => {
      if (route.name == "Chấm công") {
        timekeepAttendance.GetAllTimekeepAttendanceAction({
          data: { page: 1, year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    // Start role
    const checkRole = (index) => {
      for (let i = 0; i < index?.length; i++) {
        if (FormatRole(index[i], userProfile.value) == true) {
          return true;
        }
      }
    };
    // End role
    let y = route.params.year ?? new Date().getFullYear();
    let m = route.params.month ?? new Date().getMonth() + 1;
    let firstDay = new Date(y, m - 1);

    let lastDay = new Date(y, m);
    const getDays = (year, month) => new Date(year, month, 0).getDate();
    const loadDay = (start, end) => {
      multiDate.value = DateRange(start, end);
      for (let i = 1; i < multiDate.value.length; i++) {
        let da = new Date(multiDate.value[i]);
        arrDayFull.value.push(da);
      }
    };
    loadDay(firstDay, lastDay);
    const ChangeDate = (event) => {
      isLoading.value = true;
      const year = new Date(event.target.value);
      router.push(
        `/timekeep-attendance-attendance/month=${
          year.getMonth() + 1
        }&year=${year.getFullYear()}`
      );
      firstDay = new Date(year.getFullYear(), year.getMonth());
      lastDay = new Date(year.getFullYear(), year.getMonth() + 1);
      arrDayFull.value.length = 0;
      loadDay(firstDay, lastDay);
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        year: route.params.year,
        month: route.params.month,
      };
      timekeepAttendance.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        year: route.params.year,
        month: route.params.month,
      };
      timekeepAttendance.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const LockAttendance = () => {
      isLoading.value = true;
      // isOpenAttendanceLog.value = true;
      const dataTable = {
        month: route.params.month,
        year: route.params.year,
        type: "ATTENDANCE",
      };
      timekeepAttendance.LockAttendanceAction({
        data: dataTable,
        toast,
        EndTimeLoading,
      });
    };
    const LockApproval = () => {
      isLoading.value = true;
      // isOpenApprovalLog.value = true;
      const dataTable = {
        month: route.params.month,
        year: route.params.year,
        type: "APPROVAL",
      };
      timekeepAttendance.LockAttendanceAction({
        data: dataTable,
        toast,
        EndTimeLoading,
      });
    };
    const UnlockAttendance = () => {
      isLoading.value = true;
      // isOpenAttendanceLog.value = false;
      const dataTable = {
        month: route.params.month,
        year: route.params.year,
        type: "ATTENDANCE",
      };
      timekeepAttendance.UnlockAttendanceAction({
        data: dataTable,
        toast,
        EndTimeLoading,
      });
    };
    const UnlockApproval = () => {
      isLoading.value = true;
      // isOpenApprovalLog.value = false;
      const dataTable = {
        month: route.params.month,
        year: route.params.year,
        type: "APPROVAL",
      };
      timekeepAttendance.UnlockAttendanceAction({
        data: dataTable,
        toast,
        EndTimeLoading,
      });
    };
    const handleShowDetail = (e, item) => {
      if (item) {
        let date = new Date(item.detail);
        if (date > new Date()) {
          return;
        }
      }

      const data = {
        date: item.detail,
        id: item.personnel_id,
      };
      isActive.value = true;
      setTimeout(() => {
        var menu = document.getElementById("detailModal");
        FormatModalX(menu, e);
        FormatModalY(menu, e);
      }, 200);
      timekeepAttendance.ShowDetailTimekeepAttendanceAction({
        data,
        EndTimeLoading: EndTimeLoadingShow,
      });
      timekeepAttendance.ShowDetailApprovalTimekeepAction({
        data,
        EndTimeLoading: EndTimeLoadingShow,
      });
      attendanceDetail.value = item;
      selected.value = "Tổng hợp";
    };
    const handleHideDetail = () => {
      isActive.value = false;
      selected.value = "Tổng hợp";
    };
    const ShowPeronnelDetail = (id) => {
      router.push(`/personnelDetail/${id}`);
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      const data = {
        search: dataSearch.wordSearch,
        year: route.params.year,
        month: route.params.month,
      };
      timekeepAttendance.SearchTimekeepAttendanceAction({
        data,
        EndTimeLoading,
      });
    };
    const rightClick = (e, attendances) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        attendanceID.value = attendances.detail_personnel?.personnel_id;
        userAttendanceDetail.value = attendances.detail_personnel;
        // console.log(userAttendanceDetail.value);
        timekeepAttendance.GetLogManualAction(attendanceID.value);
      }
    };
    const handleShowDetailApproval = (id) => {
      router.push(`/approval-leave-view/detail=${id}`);
    };
    const handleShowDetailApprovalInout = (id) => {
      router.push(`/approval-inout-view/detail=${id}`);
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
    const handleShowShiftRegister = (id) => {
      router.push(`/approval-shiftresgister-view/detail=${id}`);
    };
    const handleShowMissionApprove = (id) => {
      router.push(`/approval-mission-view/detail=${id}`);
    };
    const handleShowShiftResign = (id) => {
      router.push(`/approval-resign-view/detail=${id}`);
    };
    const RecalculateMerit = () => {
      isLoadingHide.value = true;
      const data = {
        personnel_id: attendanceID.value,
        year: route.params.year,
        month: route.params.month,
      };
      timekeepAttendance.RecalculateMeritAndPenaltyAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoadingHide,
      });
    };
    const handleCloseConfirmLockAttend = () => {
      isOpenLockAttend.value = false;
    };
    const handleOpenConfirmLockAttend = () => {
      isOpenLockAttend.value = true;
    };
    const handleCloseConfirmRevertLockAttend = () => {
      isOpenRevertLockAttend.value = false;
    };
    const handleOpenConfirmRevertLockAttend = () => {
      isOpenRevertLockAttend.value = true;
    };
    const handleCloseLockApproval = () => {
      isOpenLockApproval.value = false;
    };
    const handleOpenLockApproval = () => {
      isOpenLockApproval.value = true;
    };
    const handleCloseRevertLockApproval = () => {
      isOpenRevertLockApproval.value = false;
    };
    const handleOpenRevertLockApproval = () => {
      isOpenRevertLockApproval.value = true;
    };
    const handleCloseEditAttendance = () => {
      isOpenEditAttendance.value = false;
    };
    const handleOpenEditAttendance = () => {
      isOpenEditAttendance.value = true;
    };
    const handleCloseEditFinger = () => {
      isOpenEditFinger.value = false;
    };
    const handleOpenModalLog = () => {
      isModalVisibleExport.value = true;
    };
    const handleCloseModalLog = () => {
      isModalVisibleExport.value = false;
    };
    const handleOpenEditFinger = () => {
      isOpenEditFinger.value = true;
    };
    const listDepartments = computed(
      () => store.state.departments.listDepartments
    );
    return {
      listDepartments,
      timekeepAttendance,
      selected,
      dataDate,
      fullDay,
      date,
      time,
      multiDate,
      firstDay,
      lastDay,
      arrDayFull,
      isLoading,
      isLoadingShow,
      isLoadingHide,
      isActive,
      attendanceDetail,
      userAttendanceDetail,
      listTimekeepAttendance,
      listAllTimekeepAttendanceExport,
      detailTimekeepAttendanceFullList,
      listPagination,
      detailTimekeepAttendance,
      detailApprovalTimekeep,
      listApproval,
      attendanceID,
      isOpenLockAttend,
      isOpenRevertLockAttend,
      isOpenLockApproval,
      isOpenRevertLockApproval,
      isOpenEditAttendance,
      isOpenEditFinger,
      // logAttend,
      // logApprove,
      // isOpenApprovalLog,
      // isOpenAttendanceLog,
      oldManualLog,
      checkRole,
      handleCloseConfirmLockAttend,
      handleOpenConfirmLockAttend,
      handleCloseConfirmRevertLockAttend,
      handleOpenConfirmRevertLockAttend,
      handleCloseLockApproval,
      handleOpenLockApproval,
      handleCloseRevertLockApproval,
      handleOpenRevertLockApproval,
      handleOpenModalLog,
      handleCloseModalLog,
      LockApproval,
      LockAttendance,
      UnlockAttendance,
      UnlockApproval,
      handleCloseEditFinger,
      handleOpenEditFinger,
      NextPage,
      PrevPage,
      getDays,
      loadDay,
      ChangeDate,
      handleShowDetail,
      handleHideDetail,
      EndTimeLoading,
      ShowPeronnelDetail,
      handleSearch,
      EndTimeLoadingShow,
      handleShowDetailApproval,
      handleShowDetailApprovalInout,
      handleShowDetailApprovalAbsence,
      handleShowDetailApprovalOverTime,
      handleShowAsignDetail,
      handleShowShiftRegister,
      handleShowMissionApprove,
      handleShowShiftResign,
      rightClick,
      RecalculateMerit,
      EndTimeLoadingHide,
      handleCloseEditAttendance,
      handleOpenEditAttendance,
      isModalVisibleExport,
    };
  },
};
</script>

<style></style>
