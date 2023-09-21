<template>
  <div class="flex justify-between items-center w-full">
    <div>
      <tab-nav
        :tabs="['Chi tiết', 'Đơn khác', 'Đính kèm' + `(${countAttach})`]"
        :selected="selected"
        @selected="setSelected"
      >
      </tab-nav>
    </div>
    <div class="flex items-center">
      <div
        class="btn-icon"
        :class="{
          disabledButtonCreated: isCreated,
          disabledDiv: formatApproval(ApprovalDetail),
        }"
        @click="ConfirmApproval()"
        v-if="checkUserApproved(ApprovalDetail.app_approval_ids)"
      >
        <div class="cx">
          <i class="fal fa-check"></i>
        </div>
        <div class="action-label">Duyệt</div>
      </div>
      <div
        class="btn-icon"
        @click="DisagreeApproval()"
        :class="{
          disabledDiv: formatApproval(ApprovalDetail),
          disabledButtonCreated: isCreated,
        }"
        v-if="checkUserApproved(ApprovalDetail.app_approval_ids)"
      >
        <div class="cx">
          <i class="fal fa-ban"></i>
        </div>
        <div class="action-label">Không duyệt</div>
      </div>
      <div
        class="btn-icon"
        :class="{
          disabledDiv: !formatApproval(ApprovalDetail),
          disabledButtonCreated: isCreated,
        }"
        @click="RevertApproval()"
        v-if="checkUserApproved(ApprovalDetail.app_approval_ids)"
      >
        <div class="cx">
          <i class="fal fa-undo"></i>
        </div>
        <div class="action-label">Hoàn duyệt</div>
      </div>
      <div
        class="btn-icon"
        :class="{ disabledDiv: formatApproval(ApprovalDetail) }"
        @click="handleEditApproval()"
        v-if="checkUserCreate(ApprovalDetail)"
      >
        <div class="cx">
          <i class="fal fa-edit"></i>
        </div>
        <div class="action-label">Sửa</div>
      </div>
      <div
        class="btn-icon"
        :class="{ disabledDiv: formatApproval(ApprovalDetail) }"
        @click="handleOpenConfirm()"
        v-if="checkUserCreate(ApprovalDetail)"
      >
        <div class="cx">
          <i class="fal fa-trash"></i>
        </div>
        <div class="action-label">Xóa</div>
      </div>
    </div>
  </div>
  <teleport to="#app">
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="handleDeleteApproval"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import {
  CheckUserApproved,
  CheckUserCreateApproval,
  FormatDisableButtonApproval,
} from "@/constants/FormatAll";
import { ref, computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import TabNav from "@/components/tab/TabNav.vue";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useConfirmApproval } from "@/store/modules/approval/ConfirmApproval";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    TabNav,
  },
  props: {
    ApprovalDetail: {
      type: Object,
    },
  },
  methods: {
    formatApproval(obj) {
      return FormatDisableButtonApproval(obj, this.userProfile);
    },
    checkUserApproved(id) {
      return CheckUserApproved(id, this.userProfile);
    },
    checkUserCreate(id) {
      return CheckUserCreateApproval(id, this.userProfile);
    },
    CheckHelped(obj) {
      if (obj.data?.user_id == obj.data?.created_by_id) {
        return false;
      } else {
        return true;
      }
    },
  },
  emits: ["change-tab"],
  setup(props, { emit }) {
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();
    const isCreated = ref(false);
    const isLoading = ref(false);
    const isOpenConfirm = ref(false);
    const selected = ref("Chi tiết");
    const approvalDetail = ref(props.ApprovalDetail);
    const countAttach = computed(() =>
      approvalDetail.value.reason_file
        ? approvalDetail.value.reason_file.length
        : "0"
    );
    const total = useApprovalTotal();
    const confirm = useConfirmApproval();
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const { listApproval } = storeToRefs(total);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const ConfirmApproval = () => {
      isCreated.value = true;
      isLoading.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataApproval = {
        id: approvalDetail.value.ID,
        data: data,
      };
      confirm.ConfirmApprovalDetailAction({
        data: dataApproval,
        toast,
        total,
        ActivatedButton,
        EndTimeLoading,
      });
    };
    const DisagreeApproval = () => {
      isCreated.value = true;
      isLoading.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "NO_APPROVED",
      };
      const dataApproval = {
        id: approvalDetail.value.ID,
        data: data,
      };
      confirm.ConfirmApprovalDetailAction({
        data: dataApproval,
        toast,
        total,
        ActivatedButton,
        EndTimeLoading,
      });
    };
    const RevertApproval = () => {
      isCreated.value = true;
      isLoading.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "REVERT",
      };
      const dataApproval = {
        id: approvalDetail.value.ID,
        data: data,
      };
      confirm.RevertApprovalDetailAction({
        data: dataApproval,
        toast,
        total,
        ActivatedButton,
        EndTimeLoading,
      });
    };
    const FormatUrlEdit = (obj) => {
      const arr = listApproval.value.find(
        (item) => item.code == obj.app_sub_object
      );
      return arr.urlEdit;
    };
    const FormatPathDelete = (obj) => {
      const arr = listApproval.value.find(
        (item) => item.code == obj.app_sub_object
      );
      return arr.path;
    };
    const handleEditApproval = () => {
      router.push(
        `${FormatUrlEdit(approvalDetail.value)}` + `${approvalDetail.value.ID}`
      );
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const handleDeleteApproval = () => {
      total.DeleteApprovalDetailAction({
        id: route.params.idApproval,
        toast,
        router,
        handleCloseConfirm,
      });
    };
    const showUserDetail = (id) => {
      router.push(`/social/user/${id}`);
    };
    const setSelected = (tab) => {
      selected.value = tab;
      emit("change-tab", tab);
    };
    return {
      isCreated,
      userProfile,
      listApproval,
      isOpenConfirm,
      selected,
      countAttach,
      isLoading,
      setSelected,
      ActivatedButton,
      ConfirmApproval,
      DisagreeApproval,
      RevertApproval,
      FormatUrlEdit,
      FormatPathDelete,
      handleEditApproval,
      handleDeleteApproval,
      showUserDetail,
      handleCloseConfirm,
      handleOpenConfirm,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
