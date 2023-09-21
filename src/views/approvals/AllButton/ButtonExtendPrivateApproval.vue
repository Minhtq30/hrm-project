<template>
  <div
    class="absolute z-10 left-0 top-4 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
  >
    <ul class="bg-white p-2 rounded-md">
      <li
        class="w-44 sub-item"
        @click="this.$router.push('/approval-approval-private/type=ALL')"
        :class="{
          subItemActive: checkRoute('Đơn từ của bạn'),
        }"
      >
        Tất cả
      </li>
      <li
        class="w-44 sub-item"
        @click="this.$router.push('/approval-leave-view/type=private&menu=ALL')"
        :class="{ subItemActive: checkRoute('Approval Leave View') }"
      >
        Đơn xin nghỉ
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push('/approval-absence-view/type=private&menu=ALL')
        "
        :class="{ subItemActive: checkRoute('Approval Absence View') }"
      >
        Đơn vắng mặt
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push('/approval-overtime-view/type=private&menu=ALL')
        "
        :class="{ subItemActive: checkRoute('Approval Overtime View') }"
      >
        Đơn làm thêm
      </li>
      <li
        class="w-44 sub-item"
        @click="this.$router.push('/approval-inout-view/type=private&menu=ALL')"
        :class="{ subItemActive: checkRoute('Approval Inout View') }"
      >
        Đơn check in/out
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push('/approval-shiftchange-view/type=private&menu=ALL')
        "
        :class="{ subItemActive: checkRoute('Approval Shiftchange View') }"
      >
        Đơn đổi ca
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push('/approval-shiftmore-view/type=private&menu=ALL')
        "
        :class="{ subItemActive: checkRoute('Approval Shiftmore View') }"
      >
        Đơn tăng ca
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(
            '/approval-shiftresgister-view/type=private&menu=ALL'
          )
        "
        :class="{
          subItemActive: checkRoute('Approval Shiftresgister View'),
        }"
      >
        Đơn đăng ký ca
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push('/approval-mission-view/type=private&menu=ALL')
        "
        :class="{ subItemActive: checkRoute('Approval Mission View') }"
      >
        Đơn công tác
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push('/approval-worktime-view/type=private&menu=ALL')
        "
        :class="{ subItemActive: checkRoute('Approval Worktime View') }"
      >
        Đơn làm theo chế độ
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push('/approval-resign-view/type=private&menu=ALL')
        "
      >
        Đơn thôi việc
      </li>
      <li
        class="w-44 sub-item"
        @click="this.$router.push('/upload-posm-view/type=private&menu=ALL')"
      >
        Upload POSM
      </li>
    </ul>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const checkRoute = (index) => {
      if (index == route.name) {
        return true;
      } else {
        return false;
      }
    };
    return {
      checkRoute,
    };
  },
};
</script>

<style></style>
