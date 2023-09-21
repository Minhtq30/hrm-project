<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-approval></sidebar-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex items-center">
            <button-create-approval></button-create-approval>
            <div class="flex items-center">
              <p class="text-base">Đơn làm thêm</p>
            </div>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar v-if="isLoading == false">
      <nav-feature>
        <div class="w-full" v-if="approvalDetail.ID">
          <feature-approval
            :ApprovalDetail="approvalDetail"
            @change-tab="ChangeTab"
          ></feature-approval>
        </div> </nav-feature
    ></template>
    <Transition duration="550" name="nested">
      <div class="w-full pb-4" v-if="isLoading == false">
        <div v-if="approvalDetail.ID">
          <div title="Chi tiết" v-if="selected == 'Chi tiết'">
            <div title="Thông tin chung" class="outer">
              <div class="detail-section-title">Thông tin chung</div>
              <div class="w-full">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="cellTable">Họ và tên</td>
                      <td class="cellTable">
                        <span
                          style="color: var(--color-primary)"
                          class="hover:underline cursor-pointer"
                          @click="showSocialUser(approvalDetail.data?.user_id)"
                        >
                          {{ approvalDetail.personnel_name }}
                        </span>
                      </td>
                      <td class="cellTable">Phòng ban</td>
                      <td class="cellTable">
                        {{ approvalDetail.department?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Vị trí</td>
                      <td class="cellTable">
                        {{ approvalDetail.position?.title }}
                      </td>
                      <td class="cellTable">Chức vụ</td>
                      <td class="cellTable">
                        {{ approvalDetail.job_title_current?.title }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Trạng thái</td>
                      <td class="cellTable">
                        <div
                          class="beacon"
                          :class="
                            formatColor(approvalDetail.app_approval_status)
                          "
                        >
                          {{ formatStatus(approvalDetail.app_approval_status) }}
                        </div>
                      </td>
                      <td class="cellTable">Người duyệt</td>
                      <td class="cellTable">
                        {{ formatUserApproval(approvalDetail.user_approval) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Mô tả</td>
                      <td
                        colspan="3"
                        class="cellTable"
                        v-html="approvalDetail.data?.desc"
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Chi tiết" class="inner">
              <div class="detail-section-title">Chi tiết</div>
              <div class="w-full">
                <table class="w-full">
                  <thead class="bg-slate-50">
                    <tr>
                      <td class="cellTable font-medium">Ngày</td>
                      <td class="cellTable font-medium">Thời gian</td>
                      <td class="cellTable font-medium">Tổng số giờ</td>
                      <td class="cellTable font-medium">Kiểu</td>
                      <td class="cellTable font-medium">Chốt</td>
                      <td class="cellTable font-medium">
                        Địa điểm chấm công định vị
                      </td>
                      <td class="cellTable font-medium">Ghi chú</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(overtime, index) in approvalDetail.data?.details"
                      :key="index"
                    >
                      <td class="cellTable">{{ formatDate(overtime.date) }}</td>
                      <td class="cellTable">
                        {{ overtime.start_time }} - {{ overtime.end_time }}
                      </td>
                      <td class="cellTable">
                        {{ TotalHours(overtime.start_time, overtime.end_time) }}
                      </td>
                      <td class="cellTable">{{ formatType(overtime.type) }}</td>
                      <td class="cellTable">
                        {{ formatAttendance(overtime.is_attendance) }}
                      </td>
                      <td class="cellTable">
                        {{ formatGps(overtime.gps_location_ids) }}
                      </td>
                      <td class="cellTable">
                        {{ overtime.note }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Thảo luận">
              <div class="detail-section-title">Thảo luận</div>
              <write-comment :approval_id="Number(IDApproval)"></write-comment>
            </div>
          </div>
          <div title="Đơn khác" v-if="selected == 'Đơn khác'">
            <other-approval :Personnel="approvalDetail"></other-approval>
          </div>
          <div
            title="Đính kèm"
            v-if="selected == 'Đính kèm' + `(${countAttach})`"
          >
            <AttachFileApproval :arr-image="reasonFile"></AttachFileApproval>
          </div>
        </div>
        <div v-else class="p-2 text-left">
          Đơn này không tồn tại hoặc đơn đã bị xóa
        </div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarApproval from "@/components/sidebar/SidebarApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
import WriteComment from "@/components/constant/WriteComment.vue";
import FeatureApproval from "@/components/constant/FeatureApproval.vue";
import OtherApproval from "../OtherApproval.vue";
import AttachFileApproval from "../attachFileApproval.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import {
  FormatColorApproval,
  FormatDate,
  FormatStatusApproval,
  FormatTitle,
  FormatUserApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useGpsLocation } from "@/store/modules/settingTimekeep/gpslocation";
import { storeToRefs } from "pinia";
import { computed } from "vue";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    WriteComment,
    FeatureApproval,
    OtherApproval,
    AttachFileApproval,
  },
  data() {
    return {
      header: [
        "Người tạo",
        "Mã NV",
        "Họ và tên",
        "Trạng thái",
        "Lý do",
        "Từ ngày",
        "Đến ngày",
        "Phòng ban",
        "Vị trí",
        "Ngày tạo",
      ],
    };
  },
  methods: {
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
    formatType(id) {
      if (id == 1) {
        return "Nghỉ bù";
      } else if (id == 0) {
        return "Tính công";
      } else {
        return "";
      }
    },
    TotalHours(start, end) {
      let startHour = Number(start.slice(0, 2));
      let startMinute = Number(start.slice(-2));
      let endHour = Number(end.slice(0, 2));
      let endMinute = Number(end.slice(-2));

      if (endMinute - startMinute < 0) {
        return endHour - startHour - 1 + "h" + (60 - startMinute + endMinute);
      } else {
        return endHour - startHour + "h" + (endMinute - startMinute);
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatUserApproval(arr) {
      return FormatUserApproval(arr);
    },
    formatAttendance(status) {
      if (status == 0) {
        return "Không";
      } else {
        return "Có";
      }
    },
    formatGps(id) {
      return FormatTitle(id, this.listGPSLocation);
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);
    const selected = ref("Chi tiết");
    const total = useApprovalTotal();
    const gps = useGpsLocation();
    const { listGPSLocation } = storeToRefs(gps);
    const { approvalDetail } = storeToRefs(total);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
    const IDApproval = computed(() => route.params.idApproval);
    const countAttach = computed(() =>
      reasonFile.value ? reasonFile.value.length : "0"
    );
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    total.ShowDetailApprovalAction({
      id: route.params.idApproval,
      EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.name == "Chi tiết đơn làm thêm") {
        isLoading.value = true;
        total.ShowDetailApprovalAction({
          id: to.params.idApproval,
          EndTimeLoading,
        });
      }
    });
    if (listGPSLocation.value?.length == 0) {
      gps.GetAllGPSLocationAction();
    }
    const showSocialUser = (id) => {
      router.push(`/social/user/${id}`);
    };
    const ChangeTab = (tab) => {
      selected.value = tab;
    };
    return {
      approvalDetail,
      isLoading,
      listGPSLocation,
      selected,
      reasonFile,
      countAttach,
      IDApproval,
      EndTimeLoading,
      showSocialUser,
      ChangeTab,
    };
  },
};
</script>

<style></style>
