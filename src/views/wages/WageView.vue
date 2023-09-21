<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-wage></sidebar-wage>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-wage></button-create-wage>
            <p class="longText">Danh sách bảng lương</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div v-if="isLoading == false" class="ml-2">
          <div v-if="listWages?.length" class="longText">
            Bảng lương từ {{ formatDate(listWages[0].date_start) }} đến
            {{ formatDate(listWages[0].date_end) }}
          </div>
        </div>
        <div v-else></div>
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
              v-model="date"
              ref="calendar"
              class="absolute opacity-0 bottom-0 right-0 left-0 cursor-pointer"
              @change="ChangeDate($event)"
            />
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
            <div
              class="absolute z-10 right-0 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-52 sub-item">Xuất tất cả</li>
                <li class="w-52 sub-item">Chọn trường để export</li>
              </ul>
            </div>
          </div>
          <div class="btn-icon group relative">
            <div class="cx">
              <i class="fal fa-file-import"></i>
            </div>
            <div class="action-label">Import</div>
            <div
              class="absolute z-10 right-0 top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
            >
              <ul class="bg-white p-3 rounded-md">
                <li class="w-52 sub-item">Import bảng lương</li>
              </ul>
            </div>
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
      <div class="w-full" v-if="isLoading == false">
        <table
          class="h-full w-full whitespace-nowrap relative border-collapse"
          v-if="listWages?.length"
        >
          <thead class="">
            <tr class="">
              <th class="left-0 headerTableTimekeepZ10" rowspan="2">STT</th>
              <th
                class="headerTableTimekeepZ10"
                style="width: 2%; min-width: 95px; left: 75px"
                rowspan="2"
              >
                Mã NV
              </th>
              <th
                class="headerTableTimekeepZ10"
                style="width: 4%; min-width: 210px; left: 170px"
                rowspan="2"
              >
                Họ và tên
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Phòng ban</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Vị trí</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Chức vụ</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Nơi làm việc</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Khối</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Nhóm chức danh</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Ngày vào làm</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Ngày hết hạn học việc/thử việc
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Thâm niên(Năm)</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Chỉ tiêu</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Lương cơ bản(BHXH)
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Lương cứng</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Công TC</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Hệ số thử việc</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Công thử việc</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Công chính thức</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Lễ</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Tổng công TT</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Tiền lương thời gian
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Trích 10%</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Tiền lương chi trong tháng
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Công OL</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Lương lv online</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Công tăng ca</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Hỗ trợ tăng ca</th>
              <th class="headerTableTimekeepZ5 text-center" colspan="6">
                Phụ cấp
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Hoa hồng</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Thưởng</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Sinh nhật</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Hỗ trợ ăn ca</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Mức thưởng KPI</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Nghỉ lễ(10/3 & 30/4)
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Truy thu (-)/ Truy lĩnh (+)
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Tổng thu nhập</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Tiền ăn (-)</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Đồng phục (-)</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Công nợ/ Tạm ứng
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Bảo hiểm sưc khỏe
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Điện thoại, Vé xe (-)
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Vi phạm chấm công(-)
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Đặt cọc (-)</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Đoàn phí</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Kỉ luật</th>
              <th class="headerTableTimekeepZ5" rowspan="2">New</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Thuế TNCN</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                BHXH, BHYT, BHTN NLĐ (10.5%)
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Tổng các khoản trừ
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Thực lĩnh</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Lương ghi nợ</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Lương tạm giữ</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Hình thức TT</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Số tài khoản</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Ngân hàng chi nhánh
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Ngày nghỉ việc</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Tình trạng</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Lý do giữ lương</th>
              <th class="headerTableTimekeepZ5" rowspan="2">BHXH(21,5%)</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Mã số thuế</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Thu nhập chịu thuế
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Số NPT</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Giảm trừ gia đình
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">Tiền ăn</th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                BHXH, BHYT, TCTN
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Thu nhập chịu thuế(Miễn giảm)
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">
                Tổng các khoản GT
              </th>
              <th class="headerTableTimekeepZ5" rowspan="2">TN tính thuế</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Thuế TNCN</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Cọc lũy kế</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Ghi chú</th>
              <th class="headerTableTimekeepZ5" rowspan="2">GSBH</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Thực lĩnh</th>
              <th class="headerTableTimekeepZ5" rowspan="2">Chênh lệch</th>
            </tr>
            <tr>
              <th class="headerTableTimekeepZ5T46">Thâm niên</th>
              <th class="headerTableTimekeepZ5T46">Trách nhiệm</th>
              <th class="headerTableTimekeepZ5T46">Điện thoại</th>
              <th class="headerTableTimekeepZ5T46">Xăng xe</th>
              <th class="headerTableTimekeepZ5T46">Ăn ca(VP - KV)</th>
              <th class="headerTableTimekeepZ5T46">Tổng các khoản PC</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(wage, index) in listWages" :key="index">
              <td
                class="cellTableTimekeepZ6 text-center"
                style="width: 1%; min-width: 40px"
              >
                {{ listPagination.from + index }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowPeronnelDetail(wage.personnel_id)"
                style="width: 2%; min-width: 95px; left: 75px"
              >
                {{ wage.code }}
              </td>
              <td
                class="cellTableTimekeepZ6 cursor-pointer"
                @click="ShowPeronnelDetail(wage.personnel_id)"
                style="width: 4%; min-width: 210px; left: 170px"
              >
                {{ wage.name }}
              </td>
              <td class="cellTable border">{{ wage.department_title }}</td>
              <td class="cellTable border">{{ wage.position_title }}</td>
              <td class="cellTable border">{{ wage.job_title_current }}</td>
              <td class="cellTable border">{{ wage.work_place_current }}</td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border text-center">
                {{ Number(wage.count_work_standard) }}
              </td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border text-center">
                {{ Number(wage.total_work_time) }}
              </td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
              <td class="cellTable border"></td>
            </tr>
          </tbody>
        </table>
        <div v-else class="p-2 flex flex-col justify-center">
          <h2>Không tìm thấy kết quả</h2>
          <div class="flex justify-center">
            <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer v-if="listWages?.length"
      ><div class="flex justify-between items-center">
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
        </div></div
    ></template>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarWage from "@/components/sidebar/SidebarWage.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateWage from "@/views/wages/ButtonCreateWage.vue";
import noData from "@/assets/images/noData.png";
import { FormatDate, FormatPrice } from "@/constants/FormatAll";
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  components: {
    PersonLayout,
    SidebarWage,
    NavbarSocial,
    ButtonCreateWage,
    NavFeature,
  },
  data() {
    return {
      imgNoData: noData,
    };
  },
  methods: {
    formatPrice(price) {
      return FormatPrice(price);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    show() {
      this.$refs.calendar.showPicker();
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(true);
    let date = new Date();
    const time = new Date();
    const dataDate = ref();
    dataDate.value = {
      page: 1,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("wages/GetAllWageAction", {
      data: dataDate.value,
      EndTimeLoading,
    });
    const listWages = computed(() => store.state.wages.listWages);
    const listPagination = computed(() => store.state.wages.listPagination);
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
      store.dispatch("wages/GetNextPageAction", {
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
      store.dispatch("wages/GetPrevPageAction", {
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const ChangeDate = (event) => {
      isLoading.value = true;
      const year = new Date(event.target.value);
      const data = {
        page: 1,
        year: year.getFullYear(),
        month: year.getMonth() + 1,
      };
      store.dispatch("wages/GetAllWageAction", {
        data: data,
        EndTimeLoading,
      });
    };
    const ShowPeronnelDetail = (id) => {
      router.push(`/personnelDetail/${id}`);
    };
    return {
      listWages,
      listPagination,
      isLoading,
      dataDate,
      time,
      date,
      EndTimeLoading,
      NextPage,
      PrevPage,
      ChangeDate,
      ShowPeronnelDetail,
    };
  },
};
</script>

<style></style>
