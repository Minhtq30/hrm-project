<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>

    <template v-slot:navbar>
      <navbar-social
        ><template v-slot:search>
          <search-view :handleSearch="handleSearch"></search-view>
        </template>
        <div class="flex grow">
          <div class="flex items-center">
            <button-create-timekeep></button-create-timekeep>
            <p class="longText">Quản lý nghỉ bù</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center">
          <p class="ml-2">Bảng nghỉ bù năm {{ this.$route.params.year }}</p>
        </div>
        <div class="flex">
          <div @click="ExportExcelCompensatory()" class="btn-icon">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
          </div>
          <div class="btn-icon relative" @click="show()">
            <div class="cx">
              <i class="fal fa-calendar-alt"></i>
            </div>
            <div class="action-label">Chọn năm</div>
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
                `/timekeep-compensatory-listMonth/month=${
                  date.getMonth() + 1
                }&year=${date.getFullYear()}`
              )
            "
          >
            <div class="cx">
              <i class="fal fa-list"></i>
            </div>
            <div class="action-label">Xem theo tháng</div>
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
          v-if="listTimekeepCompensatoryYear?.length"
          ref="tableCompensatory"
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
              <th class="headerTableTimekeepZ5T46">Số giờ thêm</th>
              <th class="headerTableTimekeepZ5T46">Hết hạn</th>
              <th class="headerTableTimekeepZ5T46">Ứng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(compensatory, index) in listTimekeepCompensatoryYear"
              :key="index"
              class="border"
            >
              <td
                class="cellTableTimekeepZ6 text-center"
                style="width: 1%; min-width: 40px"
              >
                {{ index + listPaginationYear.from }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(compensatory.personnel_id)"
                style="width: 2%; min-width: 95px; left: 65px"
              >
                {{ compensatory.code }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(compensatory.personnel_id)"
                style="width: 4%; min-width: 210px; left: 160px"
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
              <td
                class="cellTableTimekeepNoIndex text-center"
                style="width: 70px"
              >
                {{ compensatory.compensatory_total_open }}
              </td>
              <td
                class="cellTableTimekeepNoIndex text-center"
                style="width: 70px"
              >
                {{ compensatory.compensatory_total_used }}
              </td>
              <td
                class="cellTableTimekeepNoIndex text-center"
                style="width: 70px"
              >
                {{ compensatory.compensatory_total_closed_more }}
              </td>
              <td
                class="cellTableTimekeepNoIndex text-center"
                style="width: 70px"
              >
                {{ compensatory.compensatory_total_expired }}
              </td>
              <td
                class="cellTableTimekeepNoIndex text-center"
                style="width: 70px"
              >
                {{ compensatory.compensatory_add }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
      </div>
    </Transition>
    <!-- bảng ảo -->
    <div class="hidden">
      <Transition name="slide-fade">
        <div class="home w-full" v-if="isLoading == false">
          <table
            class="h-full whitespace-nowrap border divide-gray-300 w-full relative"
            border="1"
            v-if="listDataExportCompensatoryYear?.length"
            ref="tableCompensatory"
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
                <th class="headerTableTimekeepZ5T46">Số giờ thêm</th>
                <th class="headerTableTimekeepZ5T46">Hết hạn</th>
                <th class="headerTableTimekeepZ5T46">Ứng</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(compensatory, index) in listDataExportCompensatoryYear"
                :key="index"
                class="border"
              >
                <td
                  class="cellTableTimekeepZ6 text-center"
                  style="width: 1%; min-width: 40px"
                >
                  {{ index + listPaginationYear.from }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="ShowDetail(compensatory.personnel_id)"
                  style="width: 2%; min-width: 95px; left: 65px"
                >
                  {{ compensatory.code }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="ShowDetail(compensatory.personnel_id)"
                  style="width: 4%; min-width: 210px; left: 160px"
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
                <td
                  class="cellTableTimekeepNoIndex text-center"
                  style="width: 70px"
                >
                  {{ compensatory.compensatory_total_open }}
                </td>
                <td
                  class="cellTableTimekeepNoIndex text-center"
                  style="width: 70px"
                >
                  {{ compensatory.compensatory_total_used }}
                </td>
                <td
                  class="cellTableTimekeepNoIndex text-center"
                  style="width: 70px"
                >
                  {{ compensatory.compensatory_total_closed_more }}
                </td>
                <td
                  class="cellTableTimekeepNoIndex text-center"
                  style="width: 70px"
                >
                  {{ compensatory.compensatory_total_expired }}
                </td>
                <td
                  class="cellTableTimekeepNoIndex text-center"
                  style="width: 70px"
                >
                  {{ compensatory.compensatory_add }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
        </div>
      </Transition>
    </div>
    <template v-slot:sub_footer v-if="listTimekeepCompensatoryYear?.length">
      <div class="flex justify-between items-center">
        <div class="p-4 text-sm">
          Hiển thị {{ listPaginationYear.from }} -
          {{ listPaginationYear.to }} trong số
          {{ listPaginationYear.total }} bản ghi
        </div>
        <div class="flex justify-end p-4">
          <pagination-view
            :listPagination="listPaginationYear"
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
import SearchView from "@/components/search/SearchView.vue";
import { ref } from "@vue/reactivity";
import { utils, writeFileXLSX } from "xlsx";
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
    SearchView,
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
    ExportExcel() {
      const wb = utils.table_to_book(this.$refs.tableCompensatory);
      writeFileXLSX(wb, "TimekeepCompensatory.xlsx");
    },
    ExportExcelCompensatory() {
      this.isLoading = true;
      this.timekeepcompensatory.getDataExportAllCompensatoryYearAction({
        year: this.$route.params.year,
        funcitionExport: this.ExportExcel,
        EndTimeLoading: this.EndTimeLoading,
      });
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const date = new Date();
    const time = new Date();
    const isLoading = ref(true);
    const dataDate = ref();
    dataDate.value = {
      year: route.params.year,
    };
    const timekeepcompensatory = useTimekeepCompensatory();
    const {
      listTimekeepCompensatoryYear,
      listPaginationYear,
      listDataExportCompensatoryYear,
    } = storeToRefs(timekeepcompensatory);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    timekeepcompensatory.GetAllTimekeepCompensatoryYearAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Quản lý nghỉ bù năm") {
        isLoading.value = true;
        timekeepcompensatory.GetAllTimekeepCompensatoryYearAction({
          data: { year: to.params.year },
          EndTimeLoading,
        });
      } else {
        EndTimeLoading();
      }
    });
    const ChangeDate = (event) => {
      const year = new Date(event.target.value);
      router.push(`/timekeep-furlough-compensatory/year=${year.getFullYear()}`);
    };
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPaginationYear.value.next_page_url,
        year: route.params.year,
      };
      timekeepcompensatory.GetNextPageYearAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPaginationYear.value.prev_page_url,
        year: route.params.year,
      };
      timekeepcompensatory.GetPrevPageYearAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const ShowDetail = (id) => {
      router.push(`/timekeep-furlough-compensatory-detail/${id}`);
    };
    const handleSearch = (dataSearch) => {
      isLoading.value = true;
      const data = {
        search: dataSearch.wordSearch,
        year: date.getFullYear(),
        idDepartment: dataSearch.department_ids,
        idPosition: dataSearch.position_ids,
      };
      timekeepcompensatory.SearchTimekeepFurloughAction({
        data: data,
        EndTimeLoading,
      });
    };
    return {
      date,
      time,
      isLoading,
      listPaginationYear,
      listTimekeepCompensatoryYear,
      timekeepcompensatory,
      listDataExportCompensatoryYear,
      ChangeDate,
      NextPage,
      PrevPage,
      ShowDetail,
      handleSearch,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
