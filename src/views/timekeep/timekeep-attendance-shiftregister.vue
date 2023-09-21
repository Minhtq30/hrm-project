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
            <p class="longText">Bảng đăng ký ca</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center">
          <p class="ml-2 longText" style="font-size: 14px">
            Bảng đăng ký từ {{ formatDate(arrDayFull[0]) }} đến
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
        <div v-if="listTimekeepShiftregister?.length">
          <table class="h-full whitespace-nowrap w-full relative">
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
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(shifts, index) in listTimekeepShiftregister"
                :key="index"
              >
                <td
                  class="cellTableTimekeepZ6 text-center"
                  style="width: 1%; min-width: 40px"
                >
                  {{ index + listPagination.from }}
                </td>
                <td
                  class="cellTableTimekeepZ6 text-left"
                  style="width: 2%; min-width: 95px; left: 75px"
                >
                  {{ shifts[0].code }}
                </td>
                <td
                  class="cellTableTimekeepZ6 text-left"
                  style="width: 4%; min-width: 210px; left: 170px"
                >
                  {{ shifts[0].name }}
                </td>
                <td
                  class="cellTableTimekeepZ6 text-left"
                  style="width: 6%; min-width: 230px; left: 380px"
                >
                  {{ shifts[0].department_title }}
                </td>
                <td class="cellTableTimekeepNoIndex text-left">
                  {{ shifts[0].position_title }}
                </td>
                <td
                  class="cellTableTimekeepNoIndex"
                  v-for="(item, index) in shifts"
                  :key="index"
                  :class="formatWeekendShift(item.detail)"
                  @click.prevent="handleShowDetail($event, item)"
                >
                  <span class="cursor-pointer">{{
                    item.shift_detail?.code
                  }}</span>
                </td>
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
    <template v-slot:sub_footer>
      <div
        class="flex justify-between items-center"
        v-if="listTimekeepShiftregister?.length"
      >
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
        <div class="p-[10px] text-left" v-if="shiftDetail.shift_detail != null">
          <div class="font-semibold">
            Ca làm việc ({{ formatShiftType(shiftDetail.shift_detail?.type) }})
          </div>
          <div>Tên ca: {{ shiftDetail.shift_detail?.title }}</div>
          <div>Mã ca: {{ shiftDetail.shift_detail?.code }}</div>
          <div>
            Thời gian: {{ shiftDetail.shift_detail?.time_start }} -
            {{ shiftDetail.shift_detail?.time_end }}
          </div>
        </div>
        <div class="p-[10px] text-left" v-else>Không có ca làm việc</div>
      </div>
    </click-show-detail>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import SearchView from "@/components/search/SearchView.vue";
import ClickShowDetail from "@/components/contextmenu/ClickShowDetail.vue";
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
import { useAttendanceShiftregister } from "@/store/modules/timekeep/attendanceShiftregister";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    NavFeature,
    SearchView,
    ClickShowDetail,
  },
  data() {
    return {
      time: new Date(),
      imgNoData: noData,
    };
  },
  methods: {
    formatRank(index) {
      return FormatWeekdays(index);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    show() {
      this.$refs.calendar.showPicker();
    },
    formatWeekend(item) {
      return FormatWeekend(item);
    },
    formatWeekendShift(item) {
      return FormatWeekendShift(item);
    },
    formatShiftType(stt) {
      if (stt == "HC") {
        return "Hành chính";
      } else {
        return "Ca kíp";
      }
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const fullDay = ref([]);
    let date = new Date();
    const multiDate = ref([]);
    const arrDayFull = ref([]);
    const isLoading = ref(true);
    const dataDate = ref();
    const isActive = ref(false);
    const shiftDetail = ref();
    dataDate.value = {
      page: 1,
      year: route.params.year,
      month: route.params.month,
    };
    const shiftregister = useAttendanceShiftregister();
    const { listTimekeepShiftregister, listPagination } =
      storeToRefs(shiftregister);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    shiftregister.GetAllTimekeepShiftregisterAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Bảng đăng ký ca") {
        isLoading.value = true;
        shiftregister.GetAllTimekeepShiftregisterAction({
          data: { page: 1, year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    let firstDay = new Date(date.getFullYear(), date.getMonth());
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1);
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
      firstDay = new Date(year.getFullYear(), year.getMonth());
      lastDay = new Date(year.getFullYear(), year.getMonth() + 1);
      arrDayFull.value.length = 0;
      loadDay(firstDay, lastDay);
      router.push(
        `/timekeep-attendance-shiftregister/month=${
          year.getMonth() + 1
        }&year=${year.getFullYear()}`
      );
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        year: route.params.year,
        month: route.params.month,
      };
      shiftregister.GetNextPageAction({
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
      shiftregister.GetPrevPageAction({
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
      shiftregister.SearchAttendanceShiftregisterAction(data);
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    };
    return {
      fullDay,
      dataDate,
      date,
      multiDate,
      firstDay,
      lastDay,
      arrDayFull,
      isLoading,
      isActive,
      shiftDetail,
      listTimekeepShiftregister,
      listPagination,
      getDays,
      loadDay,
      ChangeDate,
      EndTimeLoading,
      NextPage,
      PrevPage,
      handleSearch,
      handleShowDetail,
      handleHideDetail,
    };
  },
};
</script>

<style></style>
