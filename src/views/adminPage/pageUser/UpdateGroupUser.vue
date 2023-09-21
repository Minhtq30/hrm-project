<template>
  <div>
    <h1 class="header-modal">cập nhật nhóm người dùng</h1>
    <div class="text-left p-2 w-[600px]">
      <div style="line-height: 20px; padding-bottom: 10px">
        <div>Khi chuyển người dùng sang 1 nhóm mới:</div>
        <div>
          + Người dùng chưa được tùy chỉnh quyền sẽ được gán quyền và loại tài
          khoản của nhóm mới.
        </div>
        <div>
          + Người dùng đã được tùy chỉnh quyền sẽ được giữ nguyên quyền và loại
          tài khoản.
        </div>
      </div>
      <div>
        <label for="" class="form-group-label"
          >Nhóm người dùng<span class="text-red-600">*</span></label
        >
        <div>
          <v-select
            label="title"
            :options="listGroupUsers"
            :reduce="(group) => group.ID"
            placeholder="Chọn nhóm người dùng"
            v-model="groupDetail.group_id"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="UpdateGroupPermission()">
        Cập nhật
      </button>
      <button class="button-close-modal" @click="handleCloseUpdateRule()">
        Hủy bỏ
      </button>
    </div>
  </div>
  <loading-overlay
    :isLoading="isLoadingLoad"
    :handleEndLoading="EndTimeLoadingLoad"
  ></loading-overlay>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { useGroupUser } from "@/store/modules/admin/GroupUser";
import { storeToRefs } from "pinia";
export default {
  props: {
    userGroup: {
      type: Object,
    },
    closeModal: {
      type: Function,
    },
  },
  setup(props) {
    const groupDetail = ref(props.userGroup);
    const route = useRoute();
    const toast = useToast();
    const store = useStore();
    const isLoadingLoad = ref(false);
    const GroupUser = useGroupUser();
    const { listGroupUsers } = storeToRefs(GroupUser);
    const EndTimeLoadingLoad = () => {
      isLoadingLoad.value = false;
    };
    if (listGroupUsers.value?.length == 0) {
      GroupUser.getAllAdminGroupsAction(100);
    }
    const handleCloseUpdateRule = () => {
      props.closeModal();
    };
    const UpdateGroupPermission = () => {
      isLoadingLoad.value = true;
      const dataUrl = {
        data: {
          group_id: groupDetail.value.group_id,
        },
        ID: groupDetail.value.ID,
      };
      store.dispatch("users/UpdateGroupPermissionAccountAction", {
        dataUrl,
        key: route.params.key,
        toast,
        route,
        closeModal: handleCloseUpdateRule,
        EndTimeLoading: EndTimeLoadingLoad,
      });
    };
    return {
      groupDetail,
      isLoadingLoad,
      listGroupUsers,
      EndTimeLoadingLoad,
      handleCloseUpdateRule,
      UpdateGroupPermission,
    };
  },
};
</script>

<style></style>
