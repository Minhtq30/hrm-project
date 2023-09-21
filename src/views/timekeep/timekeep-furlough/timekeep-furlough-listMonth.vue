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
            <p class="longText">Quản lý phép theo tháng</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center">
          <p class="ml-2 longText" style="font-size: 14px">
            Bảng phép tháng {{ this.$route.params.month }}/{{
              this.$route.params.year
            }}
          </p>
        </div>
        <div class="flex">
          <div class="btn-icon">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
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
                `/timekeep-furlough-furlough/year=${date.getFullYear()}`
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
          v-if="listTimekeepFurloughMonth?.length"
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
                style="width: 6%; min-width: 305px; left: 380px"
              >
                Phòng ban
              </th>
              <th
                class="headerTableTimekeepZ10"
                rowspan="2"
                style="width: 1%; min-width: 40px; left: 685px"
              >
                Tổng tồn
              </th>
              <th class="headerTableTimekeepZ5" colspan="3">Tổng phép</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Phép ứng</th>
              <th class="headerTableTimekeepZ5" colspan="3">Phép lũy kế</th>
              <th class="headerTableTimekeepZ5" colspan="3">Phép thâm niên</th>
              <th class="headerTableTimekeepZ5" colspan="3">Phép năm</th>
            </tr>
            <tr>
              <th class="headerTableTimekeepZ5T46">Tổng</th>
              <th class="headerTableTimekeepZ5T46">Sử dụng</th>
              <th class="headerTableTimekeepZ5T46">Tồn cuối</th>
              <th class="headerTableTimekeepZ5T46">Tổng</th>
              <th class="headerTableTimekeepZ5T46">Sử dụng</th>
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
              v-for="(furlough, index) in listTimekeepFurloughMonth"
              :key="index"
              @contextmenu.prevent="rightClick($event, furlough)"
            >
              <td
                class="cellTableTimekeepZ6 text-center"
                style="width: 1%; min-width: 40px"
              >
                {{ index + listPagination.from }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(furlough.personnel_id)"
                style="width: 2%; min-width: 95px; left: 75px"
              >
                {{ furlough.code }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowDetail(furlough.personnel_id)"
                style="width: 4%; min-width: 210px; left: 170px"
              >
                {{ furlough.name }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                style="width: 6%; min-width: 305px; left: 380px"
                @click="
                  SearchTimekeepFurloughDepartment(furlough.department.ID)
                "
              >
                {{ furlough.department.title }}
              </td>
              <td
                class="cellTableTimekeepZ6 text-center text-[#008000]"
                style="width: 1%; min-width: 40px; left: 685px"
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
    <template v-slot:sub_footer>
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
  <context-menu :isActive="isActive">
    <ul>
      <li>
        <i class="fal fa-repeat"></i><a href="#">Tính toán lại phép tháng</a>
      </li>
      <li><i class="fal fa-hand-pointer"></i><a href="#">Sửa trực tiếp</a></li>
    </ul>
  </context-menu>
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
import noData from "@/assets/images/noData.png";
import { ref } from "@vue/reactivity";
import { FormatDate, FormatModalX, FormatModalY } from "@/constants/FormatAll";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useTimekeepFurlough } from "@/store/modules/timekeep/timekeepFurlough";
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
    formatDate(date) {
      return FormatDate(date);
    },
    show() {
      this.$refs.calendar.showPicker();
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
    let date = new Date();
    const time = new Date();
    const isLoading = ref(true);
    const dataDate = ref();
    const isActive = ref(false);
    dataDate.value = {
      year: route.params.year,
      month: route.params.month,
    };
    const timekeepfurlough = useTimekeepFurlough();
    const { listTimekeepFurloughMonth, listPagination } =
      storeToRefs(timekeepfurlough);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    timekeepfurlough.GetAllTimekeepFurloughMonthAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Quản lý phép tháng") {
        isLoading.value = true;
        timekeepfurlough.GetAllTimekeepFurloughMonthAction({
          data: { year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
      timekeepfurlough.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.prev_page_url,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
      timekeepfurlough.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const rightClick = (e, furlough) => {
      if (isActive.value === true) {
        isActive.value = false;
      } else {
        isActive.value === true;
        var menu = document.getElementById("contextMenu");
        menu.style.display = "block";
        FormatModalX(menu, e);
        FormatModalY(menu, e);
        console.log(furlough);
      }
    };
    const ChangeDate = (event) => {
      isLoading.value = true;
      const year = new Date(event.target.value);
      router.push(
        `/timekeep-furlough-listMonth/month=${
          year.getMonth() + 1
        }&year=${year.getFullYear()}`
      );
    };
    const ShowDetail = (id) => {
      router.push(`/timekeep-furlough-detail/${id}`);
    };
    const handleSearch = (dataSearch, handleCloseSearch) => {
      isLoading.value = true;
      const data = {
        search: dataSearch.wordSearch,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        idDepartment: dataSearch.idDepartment,
        idPosition: dataSearch.idPosition,
      };
      timekeepfurlough.SearchTimekeepFurloughMonthAction({
        data: data,
        EndTimeLoading,
      });
      handleCloseSearch();
    };
    const SearchTimekeepFurloughDepartment = (id) => {
      isLoading.value = true;
      const data = {
        id: id,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
      timekeepfurlough.SearchTimekeepFurloughDepartmentAction({
        data,
        EndTimeLoading,
      });
    };
    return {
      date,
      time,
      isLoading,
      dataDate,
      listPagination,
      listTimekeepFurloughMonth,
      rightClick,
      EndTimeLoading,
      NextPage,
      PrevPage,
      ChangeDate,
      ShowDetail,
      handleSearch,
      SearchTimekeepFurloughDepartment,
      isActive,
    };
  },
};
</script>

<style></style>
