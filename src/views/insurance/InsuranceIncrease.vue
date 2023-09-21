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
              Danh sách tăng dự kiến tháng {{ this.$route.params.month }}/{{
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
          <div></div>
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
      <div v-if="listInsuranceIncrease?.length">
        <table-responsive
          :header="header"
          :checkAll="checkedAllItem"
          :isCheck="checkedAll"
        >
          <tr
            class="bg-white border-b"
            v-for="insurance in listInsuranceIncrease"
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
            <td class="cellTable"></td>
            <td class="cellTable"></td>
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
    <template v-slot:sub_footer v-if="listInsuranceIncrease?.length"
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
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import ButtonCreatePersonnel from "@/views/personnels/ButtonCreatePersonnel.vue";
import noData from "@/assets/images/noData.png";
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
        "Lý do",
        "Chốt",
      ],
      imgNoData: noData,
    };
  },
  methods: {
    show() {
      this.$refs.calendar.showPicker();
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
    const { listInsuranceIncrease, listPagination } = storeToRefs(insurance);
    dataDate.value = {
      year: route.params.year,
      month: route.params.month,
    };
    isLoading.value = true;
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    insurance.GetAllInsuranceIncreaseAction({
      data: dataDate.value,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Bảo hiểm dự kiến tăng") {
        isLoading.value = true;
        insurance.GetAllInsuranceIncreaseAction({
          data: { year: to.params.year, month: to.params.month },
          EndTimeLoading,
        });
      }
    });
    const NextPage = () => {
      isLoading.value = true;
      const dataUrl = {
        url: listPagination.value.next_page_url,
      };
      insurance.GetNextPageAction({
        data: dataUrl,
        EndTimeLoading,
      });
    };
    const PrevPage = () => {
      isLoading.value = true;
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
        for (var item in listInsuranceIncrease.value) {
          checkInsurances.value.push(
            listInsuranceIncrease.value[item].personnel_id
          );
        }
      } else {
        checkedAll.value = false;
        checkInsurances.value.splice(0, checkInsurances.value.length);
      }
    };
    const CheckedBox = (index) => {
      if (index == checkInsurances.value.find((item) => item === index)) {
        return true;
      } else {
        return false;
      }
    };
    const ChangeDate = (event) => {
      isLoading.value = true;
      date = new Date(event.target.value);
      router.push(
        `/personnel-insurance-increase/month=${
          date.getMonth() + 1
        }&year=${date.getFullYear()}`
      );
    };
    return {
      isLoading,
      listPagination,
      checkedAll,
      checkInsurances,
      listInsuranceIncrease,
      date,
      time,
      dataDate,
      NextPage,
      PrevPage,
      checkedAllItem,
      CheckedBox,
      ChangeDate,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
