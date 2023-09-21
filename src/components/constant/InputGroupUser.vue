<template>
  <v-select
    label="title"
    :options="listGroupUsers"
    :reduce="(group) => group.ID"
    placeholder="Chọn nhóm người dùng"
    :value="groupUser"
  ></v-select>
</template>

<script>
import { useGroupUser } from "@/store/modules/admin/GroupUser";
import { storeToRefs } from "pinia";
export default {
  props: {
    groupUser: {
      type: null,
    },
  },
  setup() {
    const GroupUser = useGroupUser();
    const { listGroupUsers } = storeToRefs(GroupUser);

    if (listGroupUsers.value?.length == 0) {
      GroupUser.getAllAdminGroupsAction(100);
    }

    return {
      listGroupUsers,
    };
  },
};
</script>

<style></style>
