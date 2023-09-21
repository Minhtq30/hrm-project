<template>
  <div class="flex justify-center relative group" @click="showUser()">
    <div>
      <img
        :src="formatUserApproval(Approval.user_created)"
        alt=""
        class="w-[30px] h-[30px] rounded-full cursor-pointer object-fill"
        style="border: 1px solid var(--color-primary)"
      />
    </div>
    <div
      v-if="Approval.user_created"
      class="shadow-2xl absolute z-[999] bottom-[10px] left-[50px] invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
    >
      <div class="bg-white p-2 rounded cursor-pointer font-medium">
        {{ Approval.user_created?.full_name }}
      </div>
    </div>
  </div>
</template>

<script>
import { FormatAvatarApproval } from "@/constants/FormatAll";
import { useRouter } from "vue-router";

export default {
  props: {
    Approval: {
      type: Object,
    },
  },
  methods: {
    formatUserApproval(obj) {
      return FormatAvatarApproval(obj);
    },
  },
  setup(props) {
    const router = useRouter();
    const showUser = () => {
      router.push(`/social/user/${props.Approval.user_created?.ID}`);
    };
    return {
      showUser,
    };
  },
};
</script>

<style></style>
