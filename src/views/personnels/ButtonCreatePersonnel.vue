<template>
  <div class="button-create relative group" title="Tạo mới">
    <div
      class="text-sm absolute w-48 z-10 bg-white left-0 top-full rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-2 drop-shadow-xl before:content-[''] before:h-5 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
    >
      <ul>
        <li
          class="sub-item"
          @click="handleToCreatePersonnel"
          v-if="checkRole('PERSONNEL_PROFILE_CREATE')"
          title="Tạo mới HSNS"
        >
          <span class="ml-4">Hồ sơ nhân sự</span>
        </li>
        <li
          class="sub-item"
          @click="handleToCreateContract"
          v-if="checkRole('PERSONNEL_CONTRACT_CREATE')"
          title="Tạo mới hợp đồng"
        >
          <span class="ml-4">Hợp đồng</span>
        </li>
        <li class="sub-item" @click="this.$router.push('/personnel-ratting')">
          <span class="ml-4">Phiếu đánh giá</span>
        </li>
      </ul>
    </div>
  </div>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { FormatRole } from "@/constants/FormatAll";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const router = useRouter();
    const isLoading = ref(false);
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const handleToCreatePersonnel = () => {
      router.push("/personnel-profile-create");
    };
    const handleToCreateContract = () => {
      router.push("/add-contract/add");
    };
    // Start role
    const checkRole = (index) => {
      return FormatRole(index, userProfile.value);
    };
    // End role
    return {
      isLoading,
      userProfile,
      checkRole,
      handleToCreatePersonnel,
      handleToCreateContract,
    };
  },
};
</script>

<style></style>
