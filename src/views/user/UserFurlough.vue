<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="longText uppercase font-medium">Thông tin phép năm</p>
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
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full py-2" v-if="isLoading == false">
        <Transition name="slide-fade">
          <the-tab :isSelected="selected == 'Thông tin chung'">
            <div title="Thông tin nhân sự">
              <div class="detail-section-title">Thông tin nhân sự</div>
              <div class="w-full overflow-auto format-scroll whitespace-nowrap">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable w-56">Nhân sự</td>
                      <td
                        class="cellTable w-56"
                        style="color: var(--color-primary)"
                      >
                        {{ DetailUser.code }} - {{ DetailUser.name }}
                      </td>
                      <td class="cellTable w-56">Phòng ban</td>
                      <td class="cellTable w-56">
                        {{ DetailUser.department_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable w-56">Vị trí</td>
                      <td class="cellTable w-56">
                        {{ DetailUser.position_name }}
                      </td>
                      <td class="cellTable w-56">Chức vụ</td>
                      <td class="cellTable w-56">
                        {{ DetailUser.job_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable w-56">Trạng thái</td>
                      <td class="cellTable w-56">
                        <div
                          class="beacon"
                          :class="formatColorWork(DetailUser.job_status)"
                        >
                          {{ formatWorking(DetailUser.job_status) }}
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
              <div class="detail-section-title mt-2">Thông tin phép năm</div>
              <div class="w-full overflow-auto format-scroll">
                <table
                  class="h-full whitespace-nowrap w-full relative"
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
              <div class="detail-section-title mt-2">Thông tin phép tháng</div>
              <div class="w-full overflow-auto format-scroll">
                <table
                  class="h-full whitespace-nowrap w-full relative"
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
                        {{ Number(furlough.furlough_year_open) }}
                      </td>
                      <td class="cellTable border text-center bg-[#fffbef]">
                        {{ Number(furlough.furlough_year_used) }}
                      </td>
                      <td class="cellTable border text-center bg-[#fffbef]">
                        {{ Number(furlough.furlough_year_closed) }}
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
import SidebarUser from "@/components/sidebar/SidebarUser.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import noData from "@/assets/images/noData.png";
import { ref } from "@vue/reactivity";
import {
  FormatColorWork,
  FormatDate,
  FormatReasonFurlough,
  FormatStatusWork,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    TabNav,
    PersonLayout,
    SidebarUser,
    NavbarSocial,
    NavFeature,
    TheTab,
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
    const selected = ref("Thông tin chung");
    const total = useApprovalTotal();
    const profile = useUserProfile();
    const {
      DetailUser,
      UserFurloughMonths,
      UserFurloughYears,
      UserFurloughHistory,
    } = storeToRefs(profile);
    const { listApproval } = storeToRefs(total);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    profile.GetUserFurloughAction({
      id: route.params.idUser,
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
    return {
      selected,
      isLoading,
      DetailUser,
      UserFurloughYears,
      UserFurloughMonths,
      UserFurloughHistory,
      listApproval,
      formatUrlDetail,
      setSelected,
      EndTimeLoading,
      handleShowApproval,
    };
  },
};
</script>

<style></style>
