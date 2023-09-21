<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-personnel></sidebar-personnel>
    </template>
    <template v-slot:navbar>
      <navbar-social
        ><div class="flex grow">
          <div class="flex items-center">
            <div>
              <button-create-personnel></button-create-personnel>
            </div>
            <div class="longText">
              Danh sách đóng bảo hiểm tháng {{ this.$route.params.month }}/{{
                this.$route.params.year
              }}
            </div>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex items-center">
          <div class="ml-2"></div>
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
          <div class="btn-icon" @click="updateInsurance()">
            <div class="cx">
              <i class="fal fa-undo"></i>
            </div>
            <div class="action-label">Cập nhật</div>
          </div>
          <div class="btn-icon">
            <div class="cx">
              <i class="fal fa-file-export"></i>
            </div>
            <div class="action-label">Export</div>
          </div>
        </div>
      </nav-feature></template
    >
    <div class="w-full" v-if="isLoading == false">
      <div v-if="listInsurances?.length">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="insurance in listInsurances"
            :key="insurance.personnel_id"
            @contextmenu.prevent="rightClick($event, insurance)"
            :class="{
              isCheck: CheckedBox(insurance.personnel_id),
            }"
          >
            <td class="w-4 px-6 py-3">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  v-model="checkInsurances"
                  :value="insurance.personnel_id"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="cellTable">{{ insurance.code }}</td>
            <td class="cellTable">{{ insurance.name }}</td>
            <td class="cellTable">
              {{ insurance.department_title }}
            </td>
            <td class="cellTable">
              {{ insurance.position_title }}
            </td>
            <td class="cellTable">
              {{ insurance.job_title_current }}
            </td>
            <td class="cellTable text-center">
              {{ formatDate(insurance.job_reldate_join) }}
            </td>
            <td class="cellTable text-center">
              {{ formatDate(insurance.job_date_out) }}
            </td>
            <td class="cellTable text-center">
              {{ insurance.premium_card }}
            </td>
            <td class="cellTable text-center">
              {{ insurance.premium_number }}
            </td>
            <td class="cellTable text-center">
              {{ formatDate(insurance.date_from) }}
            </td>
            <td class="cellTable text-center">
              {{ formatPrice(insurance.salary_premium_base) }}
            </td>
            <td class="cellTable text-center">
              {{ formatPrice(insurance.salary_premium_company) }}
            </td>
            <td class="cellTable text-center">
              {{ formatPrice(insurance.salary_premium_person) }}
            </td>
          </tr>
        </table-responsive>
      </div>
      <div v-else class="p-2 flex flex-col justify-center">
        <h2>Không tìm thấy kết quả</h2>
        <div class="flex justify-center">
          <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
        </div>
      </div>
    </div>
    <template v-slot:sub_footer v-if="listInsurances?.length"
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
import SidebarPersonnel from "@/components/sidebar/SidebarPersonnel.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import TableResponsive from "@/components/table/TableResponsive.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import noData from "@/assets/images/noData.png";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { FormatDate, FormatPrice } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useInsurance } from "@/store/modules/personnelView/insurance";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarPersonnel,
    NavbarSocial,
    TableResponsive,
    PaginationView,
    ButtonCreatePersonnel,
  },
  data() {
    return {
      header: [
        "Mã NV",
        "Họ và tên",
        "Phòng ban",
        "Vị trí công việc",
        "Chức vụ",
        "Ngày vào chính thức",
        "Ngày nghỉ việc",
        "Số sổ",
        "Số thẻ",
        "Bắt đầu đóng",
        "Mức đóng bảo hiểm",
        "CT đóng",
        "NLĐ nộp",
      ],
      imgNoData: noData,
    };
  },
  methods: {
    show() {
      this.$refs.calendar.showPicker();
    },
    formatPrice(price) {
      return FormatPrice(price);
    },
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(false);
    const checkedAll = ref(false);
    const checkInsurances = ref([]);
    let date = new Date();
    const time = ref(date);
    const dataDate = ref();
    const insurance = useInsurance();
    const { listInsurances, listPagination } = storeToRefs(insurance);
    dataDate.value = {
      year: route.params.year,
      month: route.params.month,
    };
    isLoading.value = true;
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    insurance.GetAllInsuranceAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Bảo hiểm") {
        isLoading.value = true;
        insurance.GetAllInsuranceAction({
          data: { year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    const NextPage = () => {
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      insurance.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      const dataUrl = {
        url: listPagination.value.prev_page_url,
      };
      insurance.GetPrevPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const checkedAllItem = () => {
      if (!checkedAll.value) {
        checkedAll.value = true;
        for (var item in listInsurances.value) {
          checkInsurances.value.push(listInsurances.value[item].personnel_id);
        }
      } else {
        checkedAll.value = false;
        checkInsurances.value.splice(0, checkInsurances.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkInsurances.value.find((item) => item == index)) {
        return true;
      } else {
        return false;
      }
    };
    const ChangeDate = (event) => {
      isLoading.value = true;
      date = new Date(event.target.value);
      router.push(
        `/personnel-insurance/month=${
          date.getMonth() + 1
        }&year=${date.getFullYear()}`
      );
    };
    const updateInsurance = () => {
      dataDate.value = {
        year: route.params.year,
        month: route.params.month,
      };
      insurance.UpdateInsuranceAction({
        data: dataDate.value,
        EndTimeLoading,
      });
    };
    return {
      isLoading,
      listPagination,
      checkedAll,
      checkInsurances,
      listInsurances,
      date,
      time,
      dataDate,
      NextPage,
      PrevPage,
      checkedAllItem,
      CheckedBox,
      ChangeDate,
      updateInsurance,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
