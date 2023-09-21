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
            <div class="longText">Bảng phân ca</div>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center">
          <p class="ml-2 longText" style="font-size: 14px">
            Bảng phân công lao động từ {{ formatDate(arrDayFull[0]) }} đến
            {{ formatDate(arrDayFull[arrDayFull.length - 1]) }}
          </p>
        </div>
        <div class="flex">
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
              class="absolute opacity-0 bottom-0 right-0 left-0"
              @change="ChangeDate($event)"
            />
          </div>
          <div class="btn-icon">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
          </div>
          <div class="btn-icon">
            <div class="cx">
              <i class="fal fa-cog"></i>
            </div>
            <div class="action-label">Cài đặt</div>
          </div>
        </div></nav-feature
      ></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div v-if="listShiftMonth?.length">
          <table
            class="h-full whitespace-nowrap border border-[#e5e7e9] w-full relative"
            border="1"
          >
            <thead>
              <tr>
                <th
                  class="headerTableTimekeepZ10 left-0"
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
                  style="width: 6%; min-width: 230px; left: 380px"
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
                <th class="headerTableTimekeepZ5" colspan="3">Nghỉ phép</th>
                <th class="headerTableTimekeepZ5" colspan="4">Nghỉ bù</th>
                <th class="headerTableTimekeepZ5" colspan="2">Công tổng</th>
                <th class="headerTableTimekeepZ5" rowspan="2">Công chuẩn</th>
              </tr>
              <tr>
                <th
                  class="headerTableTimekeepZ5T46 text-center"
                  v-for="(item, index) in arrDayFull"
                  :key="index"
                  :class="formatWeekend(item.getDay())"
                >
                  {{ item.getDate() }}
                </th>
                <th class="headerTableTimekeepZ5T46">Đầu kỳ</th>
                <th class="headerTableTimekeepZ5T46">Đã dùng</th>
                <th class="headerTableTimekeepZ5T46">Cuối kỳ</th>
                <th class="headerTableTimekeepZ5T46">Đầu kỳ</th>
                <th class="headerTableTimekeepZ5T46">Đã dùng</th>
                <th class="headerTableTimekeepZ5T46">Số giờ thêm</th>
                <th class="headerTableTimekeepZ5T46">Cuối kỳ</th>
                <th class="headerTableTimekeepZ5T46">Số công</th>
                <th class="headerTableTimekeepZ5T46">Tổng giờ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(shifts, index) in listShiftMonth" :key="index">
                <td
                  class="cellTableTimekeepZ6 text-center"
                  style="width: 1%; min-width: 40px"
                >
                  {{ index + listPagination.from }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="ShowDetail(shifts[0].personnel_id)"
                  style="width: 2%; min-width: 95px; left: 75px"
                >
                  {{ shifts[0].code }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="ShowDetail(shifts[0].personnel_id)"
                  style="width: 4%; min-width: 210px; left: 170px"
                >
                  {{ shifts[0].name }}
                </td>
                <td
                  class="cellTableTimekeepZ6"
                  style="width: 6%; min-width: 230px; left: 380px"
                >
                  {{ shifts[0].department }}
                </td>
                <td class="cellTableTimekeepNoIndex text-left">
                  {{ shifts[0].position }}
                </td>
                <td
                  class="cellTableTimekeepNoIndex text-center"
                  v-for="(item, index) in shifts"
                  :key="index"
                  :class="formatWeekendShift(item)"
                  @click.prevent="handleShowDetail($event, item)"
                >
                  <span class="cursor-pointer">{{ item.shift_code }}</span>
                </td>
                <!-- Nghỉ phép -->
                <td class="cellTableTimekeepNoIndex text-center">
                  {{ Number(shifts[0].furlough_year_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center">
                  {{ Number(shifts[0].furlough_year_used) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center">
                  {{ Number(shifts[0].furlough_year_closed) }}
                </td>
                <!-- Nghỉ bù -->
                <td class="cellTableTimekeepNoIndex text-center">
                  {{ Number(shifts[0].furlough_year_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center">
                  {{ Number(shifts[0].furlough_year_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center">
                  {{ Number(shifts[0].furlough_year_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center"></td>
                <td class="cellTableTimekeepNoIndex text-center"></td>
                <td class="cellTableTimekeepNoIndex text-center"></td>
                <td class="cellTableTimekeepNoIndex text-center">Công chuẩn</td>
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
    <template v-slot:sub_footer v-if="listShiftMonth?.length">
      <div class="flex justify-between items-center">
        <div class="p-4 text-sm">
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
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <div>
    <click-show-detail :isActive="isActive">
      <div class="w-[380px]">
        <div class="header-modal flex justify-between">
          <div>
            {{ shiftDetail.name }}, ngày {{ formatDate(shiftDetail.detail) }}
          </div>
          <span @click="handleHideDetail()"
            ><i class="fal fa-times cursor-pointer text-xl hover:scale-125"></i
          ></span>
        </div>
        <div class="p-[10px] text-left" v-if="shiftDetail.shift_code != null">
          <div class="font-semibold">
            Ca làm việc ({{ formatShiftType(shiftDetail.shift_type) }})
          </div>
          <div>Tên ca: {{ shiftDetail.shift_title }}</div>
          <div>Mã ca: {{ shiftDetail.shift_code }}</div>
          <div>
            Thời gian: {{ shiftDetail.ps_time_start }} -
            {{ shiftDetail.ps_time_end }}
          </div>
        </div>
        <div class="p-[10px] text-left" v-else>Không có ca làm việc</div>
      </div>
    </click-show-detail>
  </div>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import ClickShowDetail from "@/components/contextmenu/ClickShowDetail.vue";
import SearchView from "@/components/search/SearchView.vue";
import noData from "@/assets/images/noData.png";
import { ref } from "@vue/reactivity";
import {
  DateRange,
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatWeekdays,
  FormatWeekend,
  FormatWeekendShift,
} from "@/constants/FormatAll";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useShiftMonth } from "@/store/modules/timekeep/shiftMonth";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    NavFeature,
    ClickShowDetail,
    SearchView,
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
    formatWeekendShift(item) {
      return FormatWeekendShift(item.detail);
    },
    show() {
      this.$refs.calendar.showPicker();
    },
    formatShiftType(stt) {
      if (stt == "HC") {
        return "Hành chính";
      } else {
        return "Ca kíp";
      }
    },
  },
  data() {
    return {
      imgNoData: noData,
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);
    const fullDay = ref([]);
    let date = new Date();
    const multiDate = ref([]);
    const time = ref(date);
    const arrDayFull = ref([]);
    const AttendanceDetail = ref();
    const isActive = ref(false);
    const shiftDetail = ref();
    const dataDate = ref();
    dataDate.value = {
      page: 1,
      year: route.params.year,
      month: route.params.month,
    };
    const shiftmonth = useShiftMonth();
    const { listShiftMonth, listPagination } = storeToRefs(shiftmonth);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    shiftmonth.GetAllShiftMonthAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Bảng phân ca") {
        isLoading.value = true;
        shiftmonth.GetAllShiftMonthAction({
          data: { page: 1, year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    let firstDay = new Date(date.getFullYear(), date.getMonth());
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1);
    const getDays = (year, month) => new Date(year, month, 0).getDate();
    const loadDay = (x, y) => {
      multiDate.value = DateRange(x, y);
      for (let i = 1; i < multiDate.value.length; i++) {
        let da = new Date(multiDate.value[i]);
        arrDayFull.value.push(da);
      }
    };
    loadDay(firstDay, lastDay);
    const ChangeDate = (event) => {
      isLoading.value = true;
      date = new Date(event.target.value);
      firstDay = new Date(date.getFullYear(), date.getMonth());
      lastDay = new Date(date.getFullYear(), date.getMonth() + 1);
      arrDayFull.value.length = 0;
      loadDay(firstDay, lastDay);
      router.push(
        `/timekeep-attendance-month/month=${
          date.getMonth() + 1
        }&year=${date.getFullYear()}`
      );
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        year: route.params.year,
        month: route.params.month,
      };
      shiftmonth.GetNextPageAction({
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
      shiftmonth.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const handleShowDetail = (e, item) => {
      isActive.value = true;
      setTimeout(() => {
        var menu = document.getElementById("detailModal");
        // menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
      }, 200);
      shiftDetail.value = item;
    };
    const handleHideDetail = () => {
      isActive.value = false;
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      const data = {
        search: dataSearch.wordSearch,
        year: route.params.year,
        month: route.params.month,
      };
      shiftmonth.SearchShiftMonthAction(data);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    const ShowDetail = (id) => {
      router.push(`/personnelDetail/${id}`);
    };
    return {
      isLoading,
      isActive,
      fullDay,
      date,
      multiDate,
      firstDay,
      lastDay,
      arrDayFull,
      listShiftMonth,
      listPagination,
      time,
      shiftDetail,
      dataDate,
      AttendanceDetail,
      ShowDetail,
      getDays,
      EndTimeLoading,
      ChangeDate,
      loadDay,
      NextPage,
      PrevPage,
      handleShowDetail,
      handleHideDetail,
      handleSearch,
    };
  },
};
</script>

<style></style>
