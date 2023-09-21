<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-timekeep></sidebar-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="text-base uppercase font-medium">
              Chi tiết nghỉ phép của nhân sự
            </p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full">
          <tab-nav
            :tabs="['Thông tin chung', 'Lịch sử sử dụng']"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav>
        </div>
        <div>
          <div class="flex items-center">
            <div class="btn-icon" @click="handleOpenFurlough()">
              <div class="cx">
                <i class="fal fa-calculator"></i>
              </div>
              <div class="action-label">Tính toán</div>
            </div>
            <div class="btn-icon" @click="handleOpenEditFurlough()">
              <div class="cx">
                <i class="fal fa-edit"></i>
              </div>
              <div class="action-label">Sửa phép</div>
            </div>
          </div>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <Transition name="slide-fade">
          <the-tab :isSelected="selected == 'Thông tin chung'">
            <div title="Thông tin nhân sự">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Thông tin nhân sự</h3>
              </div>
              <div class="w-full overflow-auto format-scroll whitespace-nowrap">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable w-56">Nhân sự</td>
                      <td
                        class="cellTable w-56 hover:underline cursor-pointer"
                        style="color: var(--color-primary)"
                        @click="handleToDetail(UserPersonnel.id)"
                      >
                        {{ UserPersonnel?.code }} -
                        {{ UserPersonnel.name }}
                      </td>
                      <td class="cellTable w-56">Phòng ban</td>
                      <td class="cellTable w-56">
                        {{ UserPersonnel.department_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable w-56">Vị trí</td>
                      <td class="cellTable w-56">
                        {{ UserPersonnel.position_name }}
                      </td>
                      <td class="cellTable w-56">Chức vụ</td>
                      <td class="cellTable w-56">
                        {{ UserPersonnel.job_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable w-56">Trạng thái</td>
                      <td class="cellTable w-56">
                        <div
                          class="beacon"
                          :class="formatColorWork(UserPersonnel.job_status)"
                        >
                          {{ formatWorking(UserPersonnel.job_status) }}
                        </div>
                      </td>
                      <td class="cellTable w-56"></td>
                      <td class="cellTable w-56"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Thông tin phép năm">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Thông tin phép năm</h3>
              </div>
              <div class="w-full overflow-auto format-scroll">
                <table
                  class="h-full whitespace-nowrap mt-2 w-full relative cc1"
                  v-if="UserFurloughYears?.length"
                >
                  <thead>
                    <tr>
                      <th
                        class="cellTable border text-center sticky top-0 left-0 bg-white"
                        rowspan="2"
                      >
                        Năm
                      </th>
                      <th class="cellTable border text-center" rowspan="2">
                        Tổng tồn
                      </th>
                      <th class="cellTable border text-center" colspan="4">
                        Tổng phép
                      </th>
                      <th class="cellTable border text-center" rowspan="2">
                        Phép ứng
                      </th>
                      <th class="cellTable border text-center" colspan="4">
                        Phép lũy kế
                      </th>
                      <th class="cellTable border text-center" colspan="3">
                        Phép thâm niên
                      </th>
                      <th class="cellTable border text-center" colspan="3">
                        Phép năm
                      </th>
                    </tr>
                    <tr>
                      <!-- Tổng phép -->
                      <th class="cellTable border text-center">Tổng</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Hết hạn</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                      <!-- Phép lũy kế -->
                      <th class="cellTable border text-center">Tổng</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Hết hạn</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                      <!-- Phép thâm niên -->
                      <th class="cellTable border text-center">Tổng</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                      <!-- Phép năm -->
                      <th class="cellTable border text-center">Tổng</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(furlough, index) in UserFurloughYears"
                      :key="index"
                    >
                      <td
                        class="cellTable border text-center sticky top-0 left-0 bg-white"
                      >
                        {{ furlough.year }}
                      </td>
                      <td class="cellTable text-center border text-[#008000]">
                        {{ Number(furlough.furlough_total_closed_more) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fff7f6]">
                        {{ Number(furlough.furlough_total_open) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fff7f6]">
                        {{ Number(furlough.furlough_total_used) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fff7f6]">
                        {{ Number(furlough.furlough_total_expired) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fff7f6]">
                        {{ Number(furlough.furlough_total_closed) }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ Number(furlough.furlough_add) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fafafa]">
                        {{ Number(furlough.furlough_accumulation_open) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fafafa]">
                        {{ Number(furlough.furlough_accumulation_used) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fafafa]">
                        {{ Number(furlough.furlough_accumulation_expired) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fafafa]">
                        {{ Number(furlough.furlough_accumulation_closed) }}
                      </td>
                      <td class="cellTable text-center border bg-[#f7f5f4]">
                        {{ Number(furlough.furlough_seniority_open) }}
                      </td>
                      <td class="cellTable text-center border bg-[#f7f5f4]">
                        {{ Number(furlough.furlough_seniority_used) }}
                      </td>
                      <td class="cellTable text-center border bg-[#f7f5f4]">
                        {{ Number(furlough.furlough_seniority_closed) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fffbef]">
                        {{ Number(furlough.furlough_year_open) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fffbef]">
                        {{ Number(furlough.furlough_year_used) }}
                      </td>
                      <td class="cellTable text-center border bg-[#fffbef]">
                        {{ Number(furlough.furlough_year_closed) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
              </div>
            </div>
            <div title="Thông tin phép tháng">
              <div class="bg-slate-100 text-left mt-2">
                <h3 class="font-medium p-3">Thông tin phép tháng</h3>
              </div>
              <div class="w-full overflow-auto format-scroll">
                <table
                  class="h-full whitespace-nowrap mt-2 w-full relative cc2"
                  v-if="UserFurloughMonths?.length"
                >
                  <thead>
                    <tr>
                      <th
                        class="cellTable border text-center sticky top-0 left-0 bg-white"
                        rowspan="2"
                      >
                        Tháng
                      </th>
                      <th class="cellTable border text-center" rowspan="2">
                        Tổng tồn
                      </th>
                      <th class="cellTable border text-center" colspan="3">
                        Tổng phép
                      </th>
                      <th class="cellTable border text-center" rowspan="2">
                        Phép ứng
                      </th>
                      <th class="cellTable border text-center" colspan="3">
                        Phép lũy kế
                      </th>
                      <th class="cellTable border text-center" colspan="3">
                        Phép thâm niên
                      </th>
                      <th class="cellTable border text-center" colspan="3">
                        Phép năm
                      </th>
                    </tr>
                    <tr>
                      <!-- Tổng phép -->
                      <th class="cellTable border text-center">Tồn đầu</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                      <!-- Phép lũy kế -->
                      <th class="cellTable border text-center">Tồn đầu</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                      <!-- Phép thâm niên -->
                      <th class="cellTable border text-center">Tồn đầu</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                      <!-- Phép năm -->
                      <th class="cellTable border text-center">Tồn đầu</th>
                      <th class="cellTable border text-center">Sử dụng</th>
                      <th class="cellTable border text-center">Tồn cuối</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(furlough, index) in UserFurloughMonths"
                      :key="index"
                    >
                      <td
                        class="cellTable border text-center sticky top-0 left-0 bg-white"
                      >
                        <div>
                          <div class="font-medium">
                            {{ furlough.month }}/{{ furlough.year }}
                          </div>
                          <div>
                            {{ formatMonth(furlough.date_start) }} -
                            {{ formatMonth(furlough.date_end) }}
                          </div>
                        </div>
                      </td>
                      <!-- Tổng tồn -->
                      <td class="cellTable border text-center text-[#008000]">
                        {{ Number(furlough.furlough_total_closed_more) }}
                      </td>
                      <!-- Tổng phép -->
                      <td class="cellTable border text-center bg-[#fff7f6]">
                        {{ Number(furlough.furlough_total_open) }}
                      </td>

                      <td class="cellTable border text-center bg-[#fff7f6]">
                        {{ Number(furlough.furlough_total_used) }}
                      </td>
                      <td class="cellTable border text-center bg-[#fff7f6]">
                        {{ Number(furlough.furlough_total_closed) }}
                      </td>
                      <!-- Phép ứng -->
                      <td class="cellTable border text-center">
                        {{ Number(furlough.furlough_add) }}
                      </td>
                      <!-- Phép lũy kế -->
                      <td class="cellTable border text-center">
                        {{ Number(furlough.furlough_accumulation_open) }}
                      </td>
                      <td class="cellTable border text-center">
                        {{ Number(furlough.furlough_accumulation_used) }}
                      </td>
                      <td class="cellTable border text-center">
                        {{ Number(furlough.furlough_accumulation_closed) }}
                      </td>
                      <!-- Phép thâm niên -->
                      <td class="cellTable border text-center bg-[#f7f5f4]">
                        {{ Number(furlough.furlough_seniority_open) }}
                      </td>
                      <td class="cellTable border text-center bg-[#f7f5f4]">
                        {{ Number(furlough.furlough_seniority_used) }}
                      </td>
                      <td class="cellTable border text-center bg-[#f7f5f4]">
                        {{ Number(furlough.furlough_seniority_closed) }}
                      </td>
                      <!-- Phép năm -->
                      <td class="cellTable border text-center bg-[#fffbef]">
                        {{ Number(furlough.furlough_total_open) }}
                      </td>
                      <td class="cellTable border text-center bg-[#fffbef]">
                        {{ Number(furlough.furlough_total_used) }}
                      </td>
                      <td class="cellTable border text-center bg-[#fffbef]">
                        {{ Number(furlough.furlough_total_closed) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="p-2 text-left">Không tìm thấy kết quả</div>
              </div>
            </div>
          </the-tab>
        </Transition>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected == 'Lịch sử sử dụng'">
            <div v-if="UserFurloughHistory?.length">
              <table class="w-full relative">
                <thead class="sticky top-0 bg-white">
                  <tr class="border-b">
                    <th class="cellTable text-center">STT</th>
                    <th class="cellTable">Ngày</th>
                    <th class="cellTable">Số lượng</th>
                    <th class="cellTable">Lý do</th>
                    <th class="cellTable">Ngày hết hạn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(history, index) in UserFurloughHistory"
                    :key="index"
                    class="border-b hover:bg-slate-50"
                  >
                    <td class="cellTable text-center">{{ index + 1 }}</td>
                    <td class="cellTable">{{ formatDate(history.date) }}</td>
                    <td class="cellTable">{{ countFurlough(history) }}</td>
                    <td class="cellTable">
                      <div>
                        {{ formatReason(history.reason) }}
                        <span
                          @click="handleShowApproval(history)"
                          class="text-[11px] cursor-pointer hover:text-red-500"
                          v-if="history.reason != 'ADD_MONTH'"
                          >. Chi tiết</span
                        >
                      </div>
                    </td>
                    <td class="cellTable">
                      {{ formatDate(history.date_expired) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="p-2 flex flex-col justify-center" v-else>
              <h2>Không tìm thấy kết quả</h2>
              <div class="flex justify-center">
                <img :src="imgNoData" alt="" class="w-[300px] h-[300px]" />
              </div></div
          ></the-tab>
        </Transition>
      </div>
    </Transition>
  </person-layout>
  <teleport to="#app">
    <!-- Start Tạo tài khoản  -->
    <modal-view
      :isOpen="isOpenFurlough"
      :handleCloseDetail="handleCloseFurlough"
    >
      <calculate-furlough
        :userDetail="UserPersonnel"
        :closeModal="handleCloseFurlough"
      ></calculate-furlough>
    </modal-view>
    <modal-view
      :isOpen="isOpenEditFurlough"
      :handleCloseDetail="handleCloseEditFurlough"
    >
      <edit-furlough
        :userDetail="UserPersonnel"
        :closeModal="handleCloseEditFurlough"
      >
      </edit-furlough>
    </modal-view>
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import TabNav from "@/components/tab/TabNav.vue";
import TheTab from "@/components/tab/TheTab.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarTimekeep from "@/components/sidebar/SidebarTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import CalculateFurlough from "@/views/timekeep/timekeep-furlough/UpdatedModal/CalculateFurlough.vue";
import EditFurlough from "@/views/timekeep/timekeep-furlough/UpdatedModal/EditFurlough.vue";
import noData from "@/assets/images/noData.png";
import { ref } from "@vue/reactivity";
import {
  FormatColorWork,
  FormatDate,
  FormatReasonFurlough,
  FormatStatusWork,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useTimekeepFurlough } from "@/store/modules/timekeep/timekeepFurlough";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { storeToRefs } from "pinia";
export default {
  components: {
    TabNav,
    PersonLayout,
    SidebarTimekeep,
    NavbarSocial,
    NavFeature,
    TheTab,
    CalculateFurlough,
    EditFurlough,
  },
  data() {
    return {
      imgNoData: noData,
    };
  },
  methods: {
    formatWorking(status) {
      return FormatStatusWork(status);
    },
    formatColorWork(status) {
      return FormatColorWork(status);
    },
    formatMonth(day) {
      let date = new Date(day);
      return date.getDate() + "/" + (date.getMonth() + 1);
    },
    formatDate(date) {
      return FormatDate(date);
    },
    countFurlough(index) {
      if (index.action == "ADD") {
        if (index.amount_unit == "DAY") {
          return "+ " + Number(index.amount) + " ngày";
        }
      } else if (index.action == "MINUS") {
        if (index.amount_unit == "DAY") {
          return "- " + Number(index.amount) + " ngày";
        }
      }
    },
    formatReason(key) {
      return FormatReasonFurlough(key);
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);
    const isOpenFurlough = ref(false);
    const isOpenEditFurlough = ref(false);
    const selected = ref("Thông tin chung");
    const timekeepfurlough = useTimekeepFurlough();
    const total = useApprovalTotal();
    const {
      UserFurloughYears,
      UserFurloughMonths,
      UserFurloughHistory,
      UserPersonnel,
    } = storeToRefs(timekeepfurlough);
    const { listApproval } = storeToRefs(total);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    timekeepfurlough.ShowDetailPersonnelFurloughAction({
      id: route.params.idPersonnel,
      EndTimeLoading,
    });
    const setSelected = (tab) => {
      selected.value = tab;
    };
    const formatUrlDetail = (obj) => {
      const arr = listApproval.value.find((item) => item.obj == obj.object);
      return arr.urlDetail;
    };
    const handleShowApproval = (obj) => {
      router.push(`${formatUrlDetail(obj)}` + `${obj.object_id}`);
    };
    const handleToDetail = (id) => {
      router.push(`/personnelDetail/${id}`);
    };
    const handleCloseFurlough = () => {
      isOpenFurlough.value = false;
    };
    const handleOpenFurlough = () => {
      isOpenFurlough.value = true;
    };
    const handleCloseEditFurlough = () => {
      isOpenEditFurlough.value = false;
    };
    const handleOpenEditFurlough = () => {
      isOpenEditFurlough.value = true;
    };
    return {
      selected,
      isLoading,
      isOpenFurlough,
      UserPersonnel,
      UserFurloughYears,
      UserFurloughMonths,
      UserFurloughHistory,
      listApproval,
      isOpenEditFurlough,
      formatUrlDetail,
      setSelected,
      EndTimeLoading,
      handleShowApproval,
      handleToDetail,
      handleOpenFurlough,
      handleCloseFurlough,
      handleCloseEditFurlough,
      handleOpenEditFurlough,
    };
  },
};
</script>

<style></style>
