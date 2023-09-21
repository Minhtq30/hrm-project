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
              <p class="longText">Đơn đổi ca</p>
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
                      <td class="cellTable">Kiểu đổi ca</td>
                      <td class="cellTable">
                        {{ formatShiftChange(approvalDetail.data?.is_change) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="cellTable">Mô tả</td>
                      <td
                        class="cellTable"
                        v-html="approvalDetail.data?.desc"
                      ></td>
                      <td class="cellTable">Người duyệt</td>
                      <td class="cellTable">
                        {{ formatUserApproval(approvalDetail.user_approval) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div title="Chi tiết" class="inner">
              <div class="detail-section-title">Chi tiết</div>
              <div class="w-full" v-if="approvalDetail?.data">
                <table class="w-full">
                  <thead class="bg-slate-50">
                    <tr>
                      <td class="cellTable font-medium">Ngày cần đổi</td>
                      <td
                        class="cellTable font-medium"
                        v-if="approvalDetail.data?.is_change == 'OTHER'"
                      >
                        Người đổi
                      </td>
                      <td
                        class="cellTable font-medium"
                        v-if="approvalDetail.data?.is_change == 'OTHER'"
                      >
                        Ngày đổi
                      </td>
                      <td class="cellTable font-medium">Ca cần đổi</td>
                      <td class="cellTable font-medium">Ca muốn làm</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(shift, index) in approvalDetail?.data?.details"
                      :key="index"
                    >
                      <td class="cellTable">
                        {{ formatDate(shift.date_change) }}
                      </td>
                      <td
                        class="cellTable"
                        v-if="approvalDetail.data?.is_change == 'OTHER'"
                      >
                        {{ shift.partner_name }}
                      </td>
                      <td
                        class="cellTable"
                        v-if="approvalDetail.data?.is_change == 'OTHER'"
                      >
                        {{ formatDate(shift.date_other) }}
                      </td>
                      <td class="cellTable">
                        {{ formatShift(shift.shift_change) }}
                      </td>
                      <td class="cellTable">
                        {{ formatShift(shift.shift_other) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="text-left p-2">Không tìm thấy kết quả</div>
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
          Đơn từ không tồn tại hoặc đơn đã bị xóa
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
import { useRoute, useRouter } from "vue-router";
import {
  FormatColorApproval,
  FormatDate,
  FormatStatusApproval,
  FormatTitle,
  FormatUserApproval,
} from "@/constants/FormatAll";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
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
    formatUserApproval(arr) {
      return FormatUserApproval(arr);
    },
    formatShiftChange(stt) {
      if (stt == "PRIVATE") {
        return "Chính mình";
      } else if (stt == "OTHER") {
        return "Người khác";
      }
    },
    formatDate(date) {
      return FormatDate(date);
    },
    formatShift(id) {
      return FormatTitle(id, this.listShifts);
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);
    const selected = ref("Chi tiết");
    const total = useApprovalTotal();
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
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
      if (to.name == "Chi tiết đơn đổi ca") {
        isLoading.value = true;
        total.ShowDetailApprovalAction({
          id: to.params.idApproval,
          EndTimeLoading,
        });
      }
    });
    if (listShifts.value?.length == 0) {
      tk_shift.GetAllShiftsAction();
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
      listShifts,
      selected,
      reasonFile,
      countAttach,
      IDApproval,
      showSocialUser,
      EndTimeLoading,
      ChangeTab,
    };
  },
};
</script>

<style></style>
