<template>
  <div
    class="absolute z-10 left-0 top-4 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
  >
    <ul class="bg-white p-2 rounded-md">
      <li
        class="w-44 sub-item"
        @click="this.$router.push(`${link}`)"
        :class="{
          subItemActive: checkRoute(`${check}`),
        }"
      >
        Tất cả
      </li>
      <li
        class="w-44 sub-item"
        @click="this.$router.push(`/approval-leave-view/type=${type}&menu=ALL`)"
        :class="{ subItemActive: checkRoute('Approval Leave View') }"
      >
        Đơn xin nghỉ
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(`/approval-absence-view/type=${type}&menu=ALL`)
        "
        :class="{ subItemActive: checkRoute('Approval Absence View') }"
      >
        Đơn vắng mặt
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(`/approval-overtime-view/type=${type}&menu=ALL`)
        "
        :class="{ subItemActive: checkRoute('Approval Overtime View') }"
      >
        Đơn làm thêm
      </li>
      <li
        class="w-44 sub-item"
        @click="this.$router.push(`/approval-inout-view/type=${type}&menu=ALL`)"
        :class="{ subItemActive: checkRoute('Approval Inout View') }"
      >
        Đơn check in/out
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(`/approval-shiftchange-view/type=${type}&menu=ALL`)
        "
        :class="{ subItemActive: checkRoute('Approval Shiftchange View') }"
      >
        Đơn đổi ca
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(`/approval-shiftmore-view/type=${type}&menu=ALL`)
        "
        :class="{ subItemActive: checkRoute('Approval Shiftmore View') }"
      >
        Đơn tăng ca
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(
            `/approval-shiftresgister-view/type=${type}&menu=ALL`
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
          this.$router.push(`/approval-mission-view/type=${type}&menu=ALL`)
        "
        :class="{ subItemActive: checkRoute('Approval Mission View') }"
      >
        Đơn công tác
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(`/approval-worktime-view/type=${type}&menu=ALL`)
        "
        :class="{ subItemActive: checkRoute('Approval Worktime View') }"
      >
        Đơn làm theo chế độ
      </li>
      <li
        class="w-44 sub-item"
        @click="
          this.$router.push(`/approval-resign-view/type=${type}&menu=ALL`)
        "
        :class="{ subItemActive: checkRoute('Approval Resign View') }"
      >
        Đơn thôi việc
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const type = ref();
    const link = ref();
    const check = ref();
    if (route.params.type == "private") {
      type.value = "private";
      link.value = "/approval-approval-private/type=ALL";
      check.value = "Đơn từ của bạn";
    } else if (route.params.type == "all") {
      type.value = "all";
      link.value = "/approval-approval-all/type=ALL";
      check.value = "Tất cả đơn từ";
    } else if (route.params.type == "confirm") {
      type.value = "confirm";
      link.value = "/approval-approval-approve/type=ALL";
      check.value = "Đơn từ bạn duyệt";
    } else if (route.params.type == "department") {
      type.value = "department";
      link.value = "/approval-approval-department/type=ALL";
      check.value = "Đơn từ theo phòng ban";
    } else if (route.params.type == "help") {
      type.value = "help";
      link.value = "/approval-approval-created/type=ALL";
      check.value = "Đơn từ bạn tạo hộ";
    }
    const checkRoute = (index) => {
      if (index == route.name) {
        return true;
      } else {
        return false;
      }
    };
    return {
      checkRoute,
      type,
      link,
      check,
    };
  },
};
</script>

<style></style>
