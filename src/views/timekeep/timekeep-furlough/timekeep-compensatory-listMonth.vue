<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="longText">Quản lý nghỉ bù theo tháng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center">
          <p class="ml-2">
            Bảng nghỉ bù tháng {{ this.$route.params.month }}/{{
              this.$route.params.year
            }}
          </p>
        </div>
        <div class="flex">
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-20 right-0 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-40 sub-item">Xuất nghỉ bù</li>
              </ul>
            </div>
          </div>
          <div class="btn-icon relative" @click="show()">
            <div class="cx">
              <i class="fal fa-calendar-alt"></i>
            </div>
            <div class="action-label">Chọn tháng</div>
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
            class="btn-icon"
            @click="
              this.$router.push(
                `/timekeep-furlough-compensatory/year=${date.getFullYear()}`
              )
            "
          >
            <div class="cx">
              <i class="fal fa-list"></i>
            </div>
            <div class="action-label">Xem theo năm</div>
          </div>
          <div
            class="btn-icon"
            @click="this.$router.push('/timekeep-setting-compensatory')"
          >
            <div class="cx">
              <i class="fal fa-cog"></i>
            </div>
            <div class="action-label">Cài đặt</div>
          </div>
        </div></nav-feature
      >
    </template>
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <table
          class="h-full whitespace-nowrap border divide-gray-300 w-full relative"
          border="1"
          v-if="listTimekeepCompensatoryMonth?.length"
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
                class="headerTableTimekeepZ5"
                rowspan="2"
                style="width: 6%; min-width: 305px"
              >
                Phòng ban
              </th>
              <th class="headerTableTimekeepZ5" colspan="6">Chi tiết</th>
            </tr>
            <tr>
              <th class="headerTableTimekeepZ5T46">Tổng tồn</th>
              <th class="headerTableTimekeepZ5T46">Tồn thực tế</th>
              <th class="headerTableTimekeepZ5T46">Sử dụng</th>
              <th class="headerTableTimekeepZ5T46">Số giờ làm thêm</th>
              <th class="headerTableTimekeepZ5T46">Hết hạn</th>
              <th class="headerTableTimekeepZ5T46">Ứng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(compensatory, index) in listTimekeepCompensatoryMonth"
              :key="index"
            >
              <td
                class="cellTableTimekeepZ6 text-center"
                style="width: 1%; min-width: 40px"
              >
                {{ index + listPagination.from }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(compensatory.personnel_id)"
                style="width: 2%; min-width: 95px; left: 75px"
              >
                {{ compensatory.code }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(compensatory.personnel_id)"
                style="width: 4%; min-width: 210px; left: 170px"
              >
                {{ compensatory.name }}
              </td>
              <td class="cellTableTimekeepNoIndex text-left">
                {{ compensatory.department_name }}
              </td>
              <td
                class="cellTableTimekeepNoIndex text-center"
                style="width: 70px"
              >
                {{ compensatory.compensatory_total_closed }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center">
                {{ compensatory.compensatory_total_open }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center">
                {{ compensatory.compensatory_total_used }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center">
                {{ compensatory.compensatory_total_closed_more }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center">
                {{ compensatory.compensatory_total_expired }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center">
                {{ compensatory.compensatory_add }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listTimekeepCompensatoryMonth?.length">
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
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import { ref } from "@vue/reactivity";
import { FormatDate, FormatWeekdays } from "@/constants/FormatAll";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useTimekeepCompensatory } from "@/store/modules/timekeep/timekeepCompensatory";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    NavFeature,
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
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const date = new Date();
    const isLoading = ref(true);
    const time = ref(date);
    const dataDate = ref();
    dataDate.value = {
      year: route.params.year,
      month: route.params.month,
    };
    const timekeepcompensatory = useTimekeepCompensatory();
    const { listTimekeepCompensatoryMonth, listPagination } =
      storeToRefs(timekeepcompensatory);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    timekeepcompensatory.GetAllTimekeepCompensatoryMonthAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Quản lý nghỉ bù tháng") {
        isLoading.value = true;
        timekeepcompensatory.GetAllTimekeepCompensatoryMonthAction({
          data: { year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        year: route.params.year,
        month: route.params.month,
      };
      timekeepcompensatory.GetNextPageAction({
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
      timekeepcompensatory.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const ChangeDate = (event) => {
      isLoading.value = true;
      const year = new Date(event.target.value);
      router.push(
        `/timekeep-compensatory-listMonth/month=${
          year.getMonth() + 1
        }&year=${year.getFullYear()}`
      );
    };
    const ShowDetail = (id) => {
      router.push(`/timekeep-furlough-compensatory-detail/${id}`);
    };
    return {
      date,
      isLoading,
      dataDate,
      listTimekeepCompensatoryMonth,
      listPagination,
      time,
      EndTimeLoading,
      ChangeDate,
      ShowDetail,
      NextPage,
      PrevPage,
    };
  },
};
</script>

<style></style>
