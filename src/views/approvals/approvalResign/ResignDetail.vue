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
            <p class="longText">Đơn xin thôi việc</p>
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
    <div class="text-left w-full h-full" v-if="isLoading == false">
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
                    <td class="cellTable">Người tạo</td>
                    <td class="cellTable">
                      {{ approvalDetail?.user_created?.full_name }}
                    </td>
                    <td class="cellTable">Người duyệt</td>
                    <td class="cellTable">
                      {{ formatUserApproval(approvalDetail.user_approval) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="cellTable">Ngày nộp đơn</td>
                    <td class="cellTable">
                      {{ formatDate(approvalDetail.date_aprroval_create) }}
                    </td>
                    <td class="cellTable">Ngày thôi việc</td>
                    <td class="cellTable">
                      {{ formatDate(approvalDetail.date_of_application) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="cellTable">Lý do</td>
                    <td class="cellTable">
                      {{ approvalDetail.reason?.title }}
                    </td>
                    <td class="cellTable">Trạng thái</td>
                    <td class="cellTable">
                      <div
                        class="beacon"
                        :class="formatColor(approvalDetail.app_approval_status)"
                      >
                        {{ formatStatus(approvalDetail.app_approval_status) }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="cellTable">Mô tả</td>
                    <td
                      colspan="3"
                      class="cellTable"
                      v-html="approvalDetail.desc"
                    ></td>
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
        Đơn từ không tồn tại hoặc đơn đã bị xóa
      </div>
    </div>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import PersonLayout from "@/layouts/person-layout.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import SidebarApproval from "@/components/sidebar/SidebarApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import ButtonCreateApproval from "@/views/approvals/AllButton/ButtonCreateApproval.vue";
import FeatureApproval from "@/components/constant/FeatureApprovalResign.vue";
import WriteComment from "@/components/constant/WriteComment.vue";
import OtherApproval from "../OtherApproval.vue";
import AttachFileApproval from "../attachFileApproval.vue";
import { ref, watch } from "vue";
import {
  FormatColorApproval,
  FormatDate,
  FormatStatusApproval,
  FormatUserApproval,
} from "@/constants/FormatAll";
import { useRoute } from "vue-router";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { storeToRefs } from "pinia";
import { computed } from "vue";
export default {
  data() {
    return {};
  },
  methods: {
    formatUserApproval(arr) {
      return FormatUserApproval(arr);
    },
    formatStatus(status) {
      return FormatStatusApproval(status);
    },
    formatColor(status) {
      return FormatColorApproval(status);
    },
    formatDate(date) {
      return FormatDate(date);
    },
  },
  components: {
    PersonLayout,
    SidebarApproval,
    NavbarSocial,
    ButtonCreateApproval,
    FeatureApproval,
    NavFeature,
    WriteComment,
    OtherApproval,
    AttachFileApproval,
  },
  setup() {
    const route = useRoute();
    const isInfor = ref(true);
    const isLoading = ref(true);
    const selected = ref("Chi tiết");
    const total = useApprovalTotal();
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
      if (to.name == "Approval Resign Detail") {
        isLoading.value = true;
        total.ShowDetailApprovalAction({
          id: to.params.idApproval,
          EndTimeLoading,
        });
      }
    });
    const formatdate = (date) => {
      return FormatDate(date);
    };
    const ChangeTab = (tab) => {
      selected.value = tab;
    };
    return {
      selected,
      isInfor,
      approvalDetail,
      isLoading,
      reasonFile,
      countAttach,
      IDApproval,
      formatdate,
      EndTimeLoading,
      ChangeTab,
    };
  },
};
</script>

<style></style>
