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
            <div class="longText">Quản lý phép theo năm</div>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center">
          <p class="ml-2">Bảng phép năm {{ this.$route.params.year }}</p>
        </div>
        <div class="flex">
          <div
            class="btn-icon"
            @click="handleOpenFurloughMore()"
            title="Tính toán lại cho nhóm nhân sự"
          >
            <div class="cx">
              <i class="fal fa-calculator"></i>
            </div>
            <div class="action-label">Tính toán nhóm</div>
          </div>
          <div
            class="btn-icon"
            @click="this.$router.push('/timekeep-furlough-furlough-import')"
            title="Tải dữ liệu phép"
          >
            <div class="cx">
              <i class="fal fa-file-import"></i>
            </div>
            <div class="action-label">Import</div>
          </div>
          <div
            @click="ExportAttend()"
            class="btn-icon"
            title="Xuất dữ liệu ra excel"
          >
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
                `/timekeep-furlough-listMonth/month=${
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
            @click="this.$router.push('/timekeep-setting-furlough')"
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
          v-if="listTimekeepFurloughYear?.length"
          ref="tableTimekeeperFurlough"
        >
          <thead>
            <tr>
              <th
                class="headerTableTimekeepZ10 left-0"
                style="width: 1%; min-width: 40px"
                rowspan="2"
              >
                TT
              </th>
              <th
                class="headerTableTimekeepZ10"
                rowspan="2"
                style="width: 2%; min-width: 95px; left: 65px"
              >
                Mã NV
              </th>
              <th
                class="headerTableTimekeepZ10"
                rowspan="2"
                style="width: 4%; min-width: 210px; left: 160px"
              >
                Họ và tên
              </th>
              <th
                class="headerTableTimekeepZ10"
                rowspan="2"
                style="width: 6%; min-width: 305px; left: 370px"
              >
                Phòng ban
              </th>
              <th
                class="headerTableTimekeepZ10"
                rowspan="2"
                style="width: 1%; min-width: 40px; left: 675px"
              >
                Tổng tồn
              </th>
              <th class="headerTableTimekeepZ5" colspan="4">Tổng phép</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Phép ứng</th>
              <th class="headerTableTimekeepZ5" colspan="4">Phép lũy kế</th>
              <th class="headerTableTimekeepZ5" colspan="3">Phép thâm niên</th>
              <th class="headerTableTimekeepZ5" colspan="3">Phép năm</th>
            </tr>
            <tr>
              <th class="headerTableTimekeepZ5T46">Tổng</th>
              <th class="headerTableTimekeepZ5T46">Sử dụng</th>
              <th class="headerTableTimekeepZ5T46">Hết hạn</th>
              <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
              <th class="headerTableTimekeepZ5T46">Tổng</th>
              <th class="headerTableTimekeepZ5T46">Sử dụng</th>
              <th class="headerTableTimekeepZ5T46">Hết hạn</th>
              <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
              <th class="headerTableTimekeepZ5T46">Tổng</th>
              <th class="headerTableTimekeepZ5T46">Sử dụng</th>
              <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
              <th class="headerTableTimekeepZ5T46">Tổng</th>
              <th class="headerTableTimekeepZ5T46">Sử dụng</th>
              <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(furlough, index) in listTimekeepFurloughYear"
              :key="index"
              class="border"
              @contextmenu.prevent="rightClick($event, furlough)"
            >
              <td
                class="cellTableTimekeepZ6 text-center"
                style="width: 1%; min-width: 40px"
              >
                {{ index + listPaginationYear.from }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(furlough.personnel_id)"
                style="width: 2%; min-width: 95px; left: 65px"
              >
                {{ furlough.code }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(furlough.personnel_id)"
                style="width: 4%; min-width: 210px; left: 160px"
              >
                {{ furlough.name }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                style="width: 6%; min-width: 305px; left: 370px"
                @click="
                  SearchTimekeepFurloughDepartment(furlough?.department?.ID)
                "
              >
                {{ furlough?.department?.title }}
              </td>
              <td
                class="cellTableTimekeepZ6 text-center text-[#008000]"
                style="width: 1%; min-width: 40px; left: 675px"
              >
                {{ Number(furlough.furlough_total_closed_more) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                {{ Number(furlough.furlough_total_open) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                {{ Number(furlough.furlough_total_used) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                {{ Number(furlough.furlough_total_expired) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                {{ Number(furlough.furlough_total_closed) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center">
                {{ Number(furlough.furlough_add) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                {{ Number(furlough.furlough_accumulation_open) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                {{ Number(furlough.furlough_accumulation_used) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                {{ Number(furlough.furlough_accumulation_expired) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                {{ Number(furlough.furlough_accumulation_closed) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
                {{ Number(furlough.furlough_seniority_open) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
                {{ Number(furlough.furlough_seniority_used) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
                {{ Number(furlough.furlough_seniority_closed) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
                {{ Number(furlough.furlough_year_open) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
                {{ Number(furlough.furlough_year_used) }}
              </td>
              <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
                {{ Number(furlough.furlough_year_closed) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[200px] h-[200px]" />
          </div>
        </div>
      </div>
    </Transition>
    <!-- bảng ảo -->
    <div class="hidden">
      <Transition name="slide-fade">
        <div class="home w-full" v-if="isLoading == false">
          <table
            class="h-full whitespace-nowrap border divide-gray-300 w-full relative"
            border="1"
            v-if="listDataExportFurloughYear?.length"
            ref="tableTimekeeperFurlough"
          >
            <thead>
              <tr>
                <th
                  class="headerTableTimekeepZ10 left-0"
                  style="width: 1%; min-width: 40px"
                  rowspan="2"
                >
                  TT
                </th>
                <th
                  class="headerTableTimekeepZ10"
                  rowspan="2"
                  style="width: 2%; min-width: 95px; left: 65px"
                >
                  Mã NV
                </th>
                <th
                  class="headerTableTimekeepZ10"
                  rowspan="2"
                  style="width: 4%; min-width: 210px; left: 160px"
                >
                  Họ và tên
                </th>
                <th
                  class="headerTableTimekeepZ10"
                  rowspan="2"
                  style="width: 6%; min-width: 305px; left: 370px"
                >
                  Phòng ban
                </th>
                <th
                  class="headerTableTimekeepZ10"
                  rowspan="2"
                  style="width: 1%; min-width: 40px; left: 675px"
                >
                  Tổng tồn
                </th>
                <th class="headerTableTimekeepZ5" colspan="4">Tổng phép</th>
                <th class="headerTableTimekeepZ5" rowspan="2">Phép ứng</th>
                <th class="headerTableTimekeepZ5" colspan="4">Phép lũy kế</th>
                <th class="headerTableTimekeepZ5" colspan="3">
                  Phép thâm niên
                </th>
                <th class="headerTableTimekeepZ5" colspan="3">Phép năm</th>
              </tr>
              <tr>
                <th class="headerTableTimekeepZ5T46">Tổng</th>
                <th class="headerTableTimekeepZ5T46">Sử dụng</th>
                <th class="headerTableTimekeepZ5T46">Hết hạn</th>
                <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
                <th class="headerTableTimekeepZ5T46">Tổng</th>
                <th class="headerTableTimekeepZ5T46">Sử dụng</th>
                <th class="headerTableTimekeepZ5T46">Hết hạn</th>
                <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
                <th class="headerTableTimekeepZ5T46">Tổng</th>
                <th class="headerTableTimekeepZ5T46">Sử dụng</th>
                <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
                <th class="headerTableTimekeepZ5T46">Tổng</th>
                <th class="headerTableTimekeepZ5T46">Sử dụng</th>
                <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(furlough, index) in listDataExportFurloughYear"
                :key="index"
                class="border"
                @contextmenu.prevent="rightClick($event, furlough)"
              >
                <td
                  class="cellTableTimekeepZ6 text-center"
                  style="width: 1%; min-width: 40px"
                >
                  {{ index + listPaginationYear.from }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="ShowDetail(furlough.personnel_id)"
                  style="width: 2%; min-width: 95px; left: 65px"
                >
                  {{ furlough.code }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  @click="ShowDetail(furlough.personnel_id)"
                  style="width: 4%; min-width: 210px; left: 160px"
                >
                  {{ furlough.name }}
                </td>
                <td
                  class="cellTableTimekeepZ6 cursor-pointer"
                  style="width: 6%; min-width: 305px; left: 370px"
                  @click="
                    SearchTimekeepFurloughDepartment(furlough?.department?.ID)
                  "
                >
                  {{ furlough?.department?.title }}
                </td>
                <td
                  class="cellTableTimekeepZ6 text-center text-[#008000]"
                  style="width: 1%; min-width: 40px; left: 675px"
                >
                  {{ Number(furlough.furlough_total_closed_more) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                  {{ Number(furlough.furlough_total_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                  {{ Number(furlough.furlough_total_used) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                  {{ Number(furlough.furlough_total_expired) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fff7f6]">
                  {{ Number(furlough.furlough_total_closed) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center">
                  {{ Number(furlough.furlough_add) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                  {{ Number(furlough.furlough_accumulation_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                  {{ Number(furlough.furlough_accumulation_used) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                  {{ Number(furlough.furlough_accumulation_expired) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fafafa]">
                  {{ Number(furlough.furlough_accumulation_closed) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
                  {{ Number(furlough.furlough_seniority_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
                  {{ Number(furlough.furlough_seniority_used) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#f7f5f4]">
                  {{ Number(furlough.furlough_seniority_closed) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
                  {{ Number(furlough.furlough_year_open) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
                  {{ Number(furlough.furlough_year_used) }}
                </td>
                <td class="cellTableTimekeepNoIndex text-center bg-[#fffbef]">
                  {{ Number(furlough.furlough_year_closed) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="p-2 flex flex-col justify-center">
            <h2>Không tìm thấy kết quả</h2>
            <div class="flex justify-center">
              <img :src="imgNoData" alt="" class="w-[200px] h-[200px]" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <template v-slot:sub_footer>
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
  <context-menu :isActive="isActive">
    <ul>
      <li @click="RecalcFurlough()">
        <i class="fal fa-repeat"></i><a href="#">Tính toán lại phép năm</a>
      </li>
      <li><i class="fal fa-hand-pointer"></i><a href="#">Sửa trực tiếp</a></li>
    </ul>
  </context-menu>
  <modal-view
    :isOpen="isOpenFurlough"
    :handleCloseDetail="handleCloseFurloughMore"
  >
    <calculate-for-personnels
      :userDetail="UserPersonnel"
      :closeModal="handleCloseFurloughMore"
    ></calculate-for-personnels>
  </modal-view>
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
import noData from "@/assets/images/noData.png";
import CalculateForPersonnels from "@/views/timekeep/timekeep-furlough/UpdatedModal/CalculateForPersonnels.vue";
import ButtonCreateTimekeep from "@/views/timekeep/ButtonCreateTimekeep.vue";
import SearchView from "@/components/search/SearchView.vue";
import { ref } from "@vue/reactivity";
import {
  FormatDate,
  FormatModalX,
  FormatModalY,
  FormatWeekdays,
} from "@/constants/FormatAll";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useTimekeepFurlough } from "@/store/modules/timekeep/timekeepFurlough";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { utils, writeFileXLSX } from "xlsx";
export default {
  components: {
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    ButtonCreateTimekeep,
    NavFeature,
    SearchView,
    CalculateForPersonnels,
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
    AllExportAttend() {
      const wb = utils.table_to_book(this.$refs.tableTimekeeperFurlough);
      writeFileXLSX(wb, "TimekeepFurlough.xlsx");
    },
    ExportAttend() {
      this.isLoading = true;
      this.timekeepfurlough.getDataExportAllFurloughYearAction({
        year: this.$route.params.year,
        funcitionExport: this.AllExportAttend,
        EndTimeLoading: this.EndTimeLoading,
      });
    },
    // RecalcFurlough() {
    //   this.isLoading = true;
    //   const data = {
    //     date: this.time,
    //     personnel_id: this.personnelID,
    //   };
    //   console.log(data);
    //   this.timekeepfurlough.RecalcFurloughMonthAction({
    //     data,
    //     toast: this.toast,
    //     EndTimeLoading: this.EndTimeLoading,
    //   });
    // },
  },
  data() {
    return {
      imgNoData: noData,
    };
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();
    let date = new Date();
    const time = new Date().toISOString().substring(0, 10);
    const isLoading = ref(true);
    const dataDate = ref();
    const isActive = ref(false);
    dataDate.value = {
      year: route.params.year,
    };
    const isOpenFurlough = ref(false);
    const personnelID = ref();
    const timekeepfurlough = useTimekeepFurlough();
    const {
      listTimekeepFurloughYear,
      listPaginationYear,
      listDataExportFurloughYear,
    } = storeToRefs(timekeepfurlough);

    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    timekeepfurlough.GetAllTimekeepFurloughYearAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Quản lý phép năm") {
        isLoading.value = true;
        timekeepfurlough.GetAllTimekeepFurloughYearAction({
          data: { year: to.params.year },
          EndTimeLoading,
        });
      } else {
        EndTimeLoading();
      }
    });
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPaginationYear.value.next_page_url,
        year: date.getFullYear(),
      };
      timekeepfurlough.GetNextPageYearAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPaginationYear.value.prev_page_url,
        year: date.getFullYear(),
      };
      timekeepfurlough.GetPrevPageYearAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, personnel) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        console.log(personnel.personnel_id);
        var menu = document.getElementById("contextMenu");
        personnelID.value = personnel.personnel_id;
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
      }
    };
    const handleCloseFurloughMore = () => {
      isOpenFurlough.value = false;
    };
    const handleOpenFurloughMore = () => {
      isOpenFurlough.value = true;
    };
    const ChangeDate = (event) => {
      isLoading.value = true;
      const year = new Date(event.target.value);
      router.push(`/timekeep-furlough-furlough/year=${year.getFullYear()}`);
    };
    const ShowDetail = (id) => {
      router.push(`/timekeep-furlough-detail/${id}`);
    };

    const handleSearch = (dataSearch, handleCloseSearch) => {
      isLoading.value = true;
      const data = {
        search: dataSearch.wordSearch,
        year: date.getFullYear(),
        idDepartment: dataSearch.department_ids,
        idPosition: dataSearch.position_ids,
      };
      timekeepfurlough.SearchTimekeepFurloughYearAction({
        data: data,
        EndTimeLoading,
        handleCloseSearch,
      });
    };
    const SearchTimekeepFurloughDepartment = (id) => {
      isLoading.value = true;
      const data = {
        id: id,
        year: date.getFullYear(),
      };
      timekeepfurlough.SearchTimekeepFurloughYearDepartmentAction({
        data,
        EndTimeLoading,
      });
    };
    const RecalcFurlough = () => {
      isLoading.value = true;
      const data = {
        date: time,
        personnel_id: personnelID.value,
      };
      timekeepfurlough.RecalcFurloughMonthAction({
        data,
        toast: toast,
        EndTimeLoading: EndTimeLoading,
        handleCloseModal: EndTimeLoading,
      });
    };

    return {
      time,
      date,
      isLoading,
      listPaginationYear,
      listTimekeepFurloughYear,
      toast,
      personnelID,
      isOpenFurlough,
      listDataExportFurloughYear,
      timekeepfurlough,
      handleCloseFurloughMore,
      handleOpenFurloughMore,
      EndTimeLoading,
      NextPage,
      PrevPage,
      ChangeDate,
      ShowDetail,
      handleSearch,
      SearchTimekeepFurloughDepartment,
      rightClick,
      RecalcFurlough,
      isActive,
    };
  },
};
</script>

<style></style>
