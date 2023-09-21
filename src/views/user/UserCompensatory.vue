<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-user></sidebar-user>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center ml-4">
            <p class="longText uppercase font-medium">Thông tin nghỉ bù</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="h-full">
          <tab-nav
            :tabs="['Thông tin chung', 'Lịch sử nghỉ bù']"
            :selected="selected"
            @selected="setSelected"
          >
          </tab-nav>
        </div>
      </nav-feature>
    </template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <Transition name="slide-fade">
          <the-tab :isSelected="selected == 'Thông tin chung'">
            <div title="Thông tin nhân sự">
              <div class="detail-section-title mt-2">Thông tin nhân sự</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable">Nhân sự</td>
                      <td class="cellTable" style="color: var(--color-primary)">
                        {{ UserPersonnel.code }} - {{ UserPersonnel.name }}
                      </td>
                      <td class="cellTable">Phòng ban</td>
                      <td class="cellTable">
                        {{ UserPersonnel.department_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Vị trí</td>
                      <td class="cellTable">
                        {{ UserPersonnel.position_name }}
                      </td>
                      <td class="cellTable">Chức vụ</td>
                      <td class="cellTable">{{ UserPersonnel.job_name }}</td>
                    </tr>
                    <tr>
                      <td class="cellTable">Trạng thái</td>
                      <td class="cellTable">
                        <div
                          class="beacon"
                          :class="formatColorWork(UserPersonnel.job_status)"
                        >
                          {{ formatWorking(UserPersonnel.job_status) }}
                        </div>
                      </td>
                      <td class="cellTable"></td>
                      <td class="cellTable"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Thông tin nghỉ bù năm">
              <div class="detail-section-title mt-2">Thông tin nghỉ bù năm</div>
              <div class="w-full overflow-auto format-scroll">
                <table
                  class="h-full whitespace-nowrap w-full relative"
                  v-if="UserCompensatoryYears?.length"
                >
                  <thead>
                    <tr>
                      <th
                        class="cellTable border text-center sticky top-0 left-0 bg-white"
                        rowspan="2"
                      >
                        Năm
                      </th>
                      <th class="cellTable border text-center" colspan="6">
                        Chi tiết
                      </th>
                    </tr>
                    <tr>
                      <th class="cellTable border text-center">Tổng tồn</th>
                      <th class="cellTable border text-center">Tồn thực tế</th>
                      <th class="cellTable border text-center">Sự dụng</th>
                      <th class="cellTable border text-center">
                        Số giờ làm thêm
                      </th>
                      <th class="cellTable border text-center">Hết hạn</th>
                      <th class="cellTable border text-center">Ứng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(compensatoryYear, index) in UserCompensatoryYears"
                      :key="index"
                      class="border"
                    >
                      <td class="cellTable text-center border">
                        {{ compensatoryYear.year }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryYear.compensatory_total_closed }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryYear.compensatory_total_open }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryYear.compensatory_total_used }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryYear.compensatory_total_closed_more }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryYear.compensatory_total_expired }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryYear.compensatory_add }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
              </div>
            </div>
            <div title="Thông tin nghỉ bù tháng">
              <div class="detail-section-title mt-2">
                Thông tin nghỉ bù tháng
              </div>
              <div class="w-full overflow-auto format-scroll">
                <table
                  class="h-full whitespace-nowrap w-full relative"
                  v-if="UserCompensatoryMonths?.length"
                >
                  <thead>
                    <tr>
                      <th
                        class="cellTable border text-center sticky top-0 left-0 bg-white"
                        rowspan="2"
                      >
                        Tháng
                      </th>
                      <th class="cellTable border text-center" colspan="6">
                        Chi tiết
                      </th>
                    </tr>
                    <tr>
                      <th class="cellTable border text-center">Tổng tồn</th>
                      <th class="cellTable border text-center">Tồn thực tế</th>
                      <th class="cellTable border text-center">Sự dụng</th>
                      <th class="cellTable border text-center">
                        Số giờ làm thêm
                      </th>
                      <th class="cellTable border text-center">Hết hạn</th>
                      <th class="cellTable border text-center">Ứng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        compensatoryMonth, index
                      ) in UserCompensatoryMonths"
                      :key="index"
                      class="border"
                    >
                      <td class="cellTable text-center border">
                        {{ compensatoryMonth.month }}/{{
                          compensatoryMonth.year
                        }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryMonth.compensatory_total_closed }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryMonth.compensatory_total_open }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryMonth.compensatory_total_used }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryMonth.compensatory_total_closed_more }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryMonth.compensatory_total_expired }}
                      </td>
                      <td class="cellTable text-center border">
                        {{ compensatoryMonth.compensatory_add }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="p-2 text-left" v-else>Không tìm thấy kết quả</div>
              </div>
            </div>
          </the-tab>
        </Transition>
        <Transition name="slide-fade">
          <the-tab :isSelected="selected == 'Lịch sử nghỉ bù'">
            <div v-if="UserCompensatoryHistory?.length" class="py-2">
              <table class="w-full relative">
                <thead class="sticky top-0 bg-white">
                  <tr class="border">
                    <th class="cellTable text-center">STT</th>
                    <th class="cellTable">Số giờ còn</th>
                    <th class="cellTable">Lý do</th>
                    <th class="cellTable">Ghi chú</th>
                    <th class="cellTable">Ngày</th>
                    <th class="cellTable">Ngày hết hạn</th>
                    <th class="cellTable">Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(history, index) in UserCompensatoryHistory"
                    :key="index"
                    class="border-b hover:bg-slate-50"
                  >
                    <td class="cellTable text-center">
                      {{ index + 1 }}
                    </td>
                    <td class="cellTable text-center">
                      {{ formatPlus(history.action) }} {{ history.amount_hour }}
                    </td>
                    <td
                      class="cellTable cursor-pointer"
                      @click="handleShowApproval(history)"
                    >
                      {{ formatApproval(history.object) }}
                    </td>
                    <td class="cellTable">
                      {{ history.desc }}
                    </td>
                    <td class="cellTable">
                      {{ formatDate(history.date) }}
                    </td>
                    <td class="cellTable"></td>
                    <td class="cellTable">
                      {{ formatDate(history.date_created) }}
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
import { useRoute } from "vue-router";
import {
  FormatColorWork,
  FormatDate,
  FormatStatusWork,
} from "@/constants/FormatAll";
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
    formatDate(date) {
      return FormatDate(date);
    },
    formatApproval(stt) {
      const final = this.listApproval.find((item) => item.obj == stt);
      if (final) {
        return final.title;
      } else {
        return "";
      }
    },
    formatPlus(stt) {
      if (stt == "ADD") {
        return "+";
      } else {
        return stt;
      }
    },
  },
  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    const selected = ref("Thông tin chung");
    const total = useApprovalTotal();
    const profile = useUserProfile();
    const {
      UserPersonnel,
      UserCompensatoryYears,
      UserCompensatoryMonths,
      UserCompensatoryHistory,
    } = storeToRefs(profile);
    const { listApproval } = storeToRefs(total);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    profile.GetUserCompensatoryAction({
      id: route.params.idUser,
      EndTimeLoading,
    });
    const setSelected = (tab) => {
      selected.value = tab;
    };
    return {
      selected,
      isLoading,
      UserPersonnel,
      UserCompensatoryYears,
      UserCompensatoryMonths,
      UserCompensatoryHistory,
      listApproval,
      setSelected,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
