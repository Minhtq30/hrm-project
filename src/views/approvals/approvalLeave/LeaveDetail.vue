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
              <p class="longText">Đơn xin nghỉ</p>
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
      <div class="w-full text-left pb-4" v-if="isLoading == false">
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
                      <td class="cellTable">Lý do</td>
                      <td class="cellTable">
                        {{ approvalDetail.reason?.title }}
                      </td>
                      <td class="cellTable">Tính công</td>
                      <td class="cellTable">
                        {{ formatTrueFalse(has_attendance) }}
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
              <div class="w-full overflow-auto format-scroll whitespace-nowrap">
                <table class="w-full">
                  <thead class="bg-slate-50">
                    <tr>
                      <td class="cellTable font-medium">Bắt đầu</td>
                      <td class="cellTable font-medium">Kết thúc</td>
                      <td class="cellTable font-medium">Số ngày</td>
                      <!-- <td
                        class="cellTable font-medium"
                        v-if="
                          formatLeaves(approvalDetail.data?.reason) ==
                          'Nghỉ phép năm'
                        "
                      >
                        Số phép trước nghỉ
                      </td>
                      <td
                        class="cellTable font-medium"
                        v-if="
                          formatLeaves(approvalDetail.data?.reason) ==
                          'Nghỉ phép năm'
                        "
                      >
                        Số phép sau nghỉ
                      </td> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(leave, index) in approvalDetail.data?.details"
                      :key="index"
                    >
                      <td class="cellTable">{{ formatDateFrom(leave) }}</td>
                      <td class="cellTable">{{ formatDateTo(leave) }}</td>
                      <td class="cellTable">{{ rangeDay(leave) }}</td>
                      <!-- <td
                        class="cellTable"
                        v-if="approvalDetail.reason?.title == 'Nghỉ phép năm'"
                      >
                        {{ approvalDetail.data_furlough.furlough_total_open }}
                      </td>
                      <td
                        class="cellTable"
                        v-if="approvalDetail.reason?.title == 'Nghỉ phép năm'"
                      >
                        {{ approvalDetail.data_furlough.furlough_total_closed }}
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Thảo luận" class="inner">
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
          Đơn này không tồn tại hoặc đã bị xóa
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
  FormatTrueFalse,
  FormatUserApproval,
} from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useReasonLeave } from "@/store/modules/settingApproval/ReasonLeave";
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
      has_attendance: null,
    };
  },
  methods: {
    formatTrueFalse(status) {
      return FormatTrueFalse(status);
    },
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
    formatUserApproval(arr) {
      return FormatUserApproval(arr);
    },
    formatLeaves(id) {
      if (id) {
        const arr = this.ReasonLeavesActive.find((item) => item.ID == id);
        if (arr) {
          this.has_attendance = arr.has_attendance;
          return arr.title;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    formatShift(index) {
      if (index == 0) {
        return "Nửa ca đầu";
      } else {
        return "Nửa ca sau";
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatDateFrom(obj) {
      return (
        this.formatShift(obj.shifts_start) +
        "  " +
        this.formatDate(obj.date_start)
      );
    },
    formatDateTo(obj) {
      return (
        this.formatShift(obj.shifts_end) + "  " + this.formatDate(obj.date_end)
      );
    },
    rangeDay(leave) {
      let start = new Date(leave.date_start);
      let end = new Date(leave.date_end);
      if (leave.shifts_start == leave.shifts_end) {
        return (
          Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) +
          0.5 +
          " (ngày)"
        );
      } else {
        return (
          Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) +
          1 +
          " (ngày)"
        );
      }
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);
    const selected = ref("Chi tiết");
    const total = useApprovalTotal();
    const reasonLeave = useReasonLeave();
    const { ReasonLeavesActive } = storeToRefs(reasonLeave);
    const { approvalDetail } = storeToRefs(total);
    const IDApproval = computed(() => route.params.idApproval);
    const reasonFile = computed(() => approvalDetail.value.reason_file);
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
      if (to.name == "Chi tiết đơn xin nghỉ") {
        isLoading.value = true;
        total.ShowDetailApprovalAction({
          id: to.params.idApproval,
          EndTimeLoading,
        });
      }
    });
    if (ReasonLeavesActive.value.length == 0) {
      reasonLeave.GetAllLeavesAction();
    }
    const showSocialUser = (id) => {
      router.push(`/social/user/${id}`);
    };
    const ChangeTab = (tab) => {
      selected.value = tab;
    };
    return {
      ReasonLeavesActive,
      isLoading,
      approvalDetail,
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
