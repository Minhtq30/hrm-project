<template>
  <div id="contextMenu" class="context-menu" :class="{ isActive: isActive }">
    <ul>
      <li @click.prevent="EditApproval()">
        <i class="fal fa-edit"></i> <a href="#">Sửa</a>
      </li>
      <li @click.prevent="handleOpenConfirm()">
        <i class="fal fa-trash"></i><a href="#">Xóa</a>
      </li>
      <li><i class="fal fa-paste"></i><a href="#">Biểu mẫu</a></li>
      <li @click.prevent="ConfirmApproval()">
        <i class="fal fa-check"></i><a href="#">Duyệt đơn</a>
      </li>
      <li @click.prevent="ReturnApproval()">
        <i class="fal fa-undo"></i> <a href="#">Hoàn duyệt</a>
      </li>
      <li @click.prevent="UnconfirmApproval()">
        <i class="fal fa-ban"></i><a href="#">Không duyệt</a>
      </li>
    </ul>
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
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    ApprovalDetail: {
      type: Object,
    },
    isActive: {
      type: Boolean,
    },
  },
  created() {
    document.onclick = hideMenu;
    function hideMenu() {
      let context = document.getElementById("contextMenu");
      context.style.display = "none";
    }
  },
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(false);
    const approvalDetail = ref(props.ApprovalDetail);
    const isOpenConfirm = ref(false);
    const listApproval = computed(() => store.state.ApprovalTotal.listApproval);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const FormatUrlEdit = (obj) => {
      const arr = listApproval.value.find(
        (item) => item.code == obj.app_sub_object
      );
      return arr.urlEdit;
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = () => {
      isOpenConfirm.value = true;
    };
    const EditApproval = () => {
      router.push(
        `${FormatUrlEdit(approvalDetail.value)}` + `${approvalDetail.value.ID}`
      );
    };
    const handleDeleteApproval = () => {
      store.dispatch("ApprovalTotal/DeleteApprovalAction", {
        id: approvalDetail.value.ID,
        route,
        toast,
        handleCloseConfirm,
        EndTimeLoading,
      });
    };
    return {
      approvalDetail,
      listApproval,
      isOpenConfirm,
      FormatUrlEdit,
      EditApproval,
      handleCloseConfirm,
      handleOpenConfirm,
      handleDeleteApproval,
    };
  },
};
</script>

<style></style>
