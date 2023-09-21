<template>
  <div class="flex items-center justify-between">
    <div></div>
    <div class="flex items-center">
      <div
        class="btn-icon"
        @click="ConfirmWorkShift()"
        :class="{
          disabledDiv: formatApproval(AssignDetail),
          disabledButtonCreated: isCreated,
        }"
        v-if="checkUserApproved(AssignDetail.app_approval_ids)"
      >
        <div class="cx">
          <i class="fal fa-check"></i>
        </div>
        <div class="action-label">Duyệt</div>
      </div>
      <div
        class="btn-icon"
        @click="DisagreeWorkShift()"
        :class="{
          disabledDiv: formatApproval(AssignDetail),
          disabledButtonCreated: isCreated,
        }"
        v-if="checkUserApproved(AssignDetail.app_approval_ids)"
      >
        <div class="cx">
          <i class="fal fa-ban"></i>
        </div>
        <div class="action-label">Không duyệt</div>
      </div>
      <div
        class="btn-icon"
        :class="{
          disabledDiv: !formatApproval(AssignDetail),
          disabledButtonCreated: isCreated,
        }"
        @click="RevertWorkShift()"
        v-if="checkUserApproved(AssignDetail.app_approval_ids)"
      >
        <div class="cx">
          <i class="fal fa-undo"></i>
        </div>
        <div class="action-label">Hoàn duyệt</div>
      </div>
      <div
        class="btn-icon"
        @click="EditWorkShift()"
        :class="{
          disabledDiv: formatApproval(AssignDetail),
        }"
        v-if="checkUserCreate(AssignDetail)"
      >
        <div class="cx">
          <i class="fal fa-edit"></i>
        </div>
        <div class="action-label">Sửa</div>
      </div>
      <div
        class="btn-icon"
        @click="handleOpenConfirm()"
        :class="{
          disabledDiv: formatApproval(AssignDetail),
        }"
        v-if="checkUserCreate(AssignDetail)"
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
      :ConfirmDelete="DeleteWorkShift"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoadingReload"
    :handleEndLoading="EndTimeReload"
  ></loading-overlay>
</template>

<script>
import {
  CheckUserApproved,
  CheckUserCreateApproval,
  FormatDisableButtonApproval,
} from "@/constants/FormatAll";
import { ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useShiftAssign } from "@/store/modules/timekeep/shiftAssign";
import { storeToRefs } from "pinia";
export default {
  props: {
    AssignDetail: {
      type: Object,
    },
  },
  methods: {
    formatApproval(obj) {
      return FormatDisableButtonApproval(obj, this.userProfile);
    },
    checkUserApproved(str) {
      return CheckUserApproved(str, this.userProfile);
    },
    checkUserCreate(id) {
      return CheckUserCreateApproval(id, this.userProfile);
    },
  },
  setup(props) {
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);
    const isCreated = ref(false);
    const isLoadingReload = ref(false);
    const assignDetail = ref(props.AssignDetail);
    const isOpenConfirm = ref(false);
    const profile = useUserProfile();
    const assign = useShiftAssign();
    const { userProfile } = storeToRefs(profile);
    const EndTimeReload = () => {
      isLoadingReload.value = false;
    };
    const ActivatedButton = () => {
      isCreated.value = false;
    };
    const ConfirmWorkShift = () => {
      isCreated.value = true;
      isLoadingReload.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "APPROVED",
      };
      const dataAssign = {
        id: route.params.detailID,
        data: data,
      };
      assign.ConfirmAttendanceAssignAction({
        dataAssign,
        toast,
        ActivatedButton,
        EndTimeLoading: EndTimeReload,
      });
    };
    const DisagreeWorkShift = () => {
      isCreated.value = true;
      isLoadingReload.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "NO_APPROVED",
      };
      const dataAssign = {
        id: route.params.detailID,
        data: data,
      };
      assign.ConfirmAttendanceAssignAction({
        dataAssign,
        toast,
        ActivatedButton,
        EndTimeLoading: EndTimeReload,
      });
    };
    const RevertWorkShift = () => {
      isCreated.value = true;
      isLoadingReload.value = true;
      const data = {
        app_approval_id: userProfile.value.ID,
        app_approval_status: "REVERT",
      };
      const dataAssign = {
        id: route.params.detailID,
        data: data,
      };
      assign.RevertAttendanceAssignAction({
        dataAssign,
        toast,
        ActivatedButton,
        EndTimeLoading: EndTimeReload,
      });
    };
    const EditWorkShift = () => {
      router.push(`/timekeep-attendance-assign-edit/${route.params.detailID}`);
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const DeleteWorkShift = () => {
      assign.deleteShiftAssignAction({
        data: route.params.detailID,
        route,
        router,
        toast,
        EndTimeLoading: EndTimeReload,
        handleCloseConfirm,
      });
    };
    return {
      assignDetail,
      userProfile,
      isLoading,
      isLoadingReload,
      isCreated,
      isOpenConfirm,
      ConfirmWorkShift,
      DisagreeWorkShift,
      RevertWorkShift,
      EndTimeReload,
      DeleteWorkShift,
      EditWorkShift,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>

<style></style>
