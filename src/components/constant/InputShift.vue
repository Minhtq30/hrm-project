<template>
  <v-select
    label="title"
    :options="listShifts"
    :reduce="(shift) => shift.ID"
    placeholder="Chọn ca làm việc"
    :multiple="isMultiple"
    :value="arrShift"
    @update:modelValue="arrShiftChange"
  >
    <template
      #option="{
        title,
        time_start,
        time_end,
        time_break_start,
        time_break_end,
        code,
      }"
    >
      <div
        style="align-items: baseline"
        class="flex flex-col whitespace-normal"
      >
        <div class="font-medium">{{ title }}</div>
        <div class="text-xs">{{ code }}: {{ time_start }} - {{ time_end }}</div>
        <div class="text-xs" v-if="time_break_start">
          Nghỉ trưa: {{ time_break_start }} - {{ time_break_end }}
        </div>
      </div>
    </template>
  </v-select>
</template>

<script>
import { useShifts } from "@/store/modules/settingTimekeep/shifts";
import { storeToRefs } from "pinia";
export default {
  props: {
    arrShift: {
      type: [Array, null],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    shiftRange: {
      type: Array,
    },
  },
  setup() {
    const tk_shift = useShifts();
    const { listShifts } = storeToRefs(tk_shift);
    const arrShiftChange = (e) => {
      // e.value = props.arrShift.type;
      let arr = [];
      console.log(e);
      arr.push(e);
      console.log(arr);
      console.log(listShifts);
    };
    return {
      listShifts,
      arrShiftChange,
    };
  },
};
</script>

<style></style>
