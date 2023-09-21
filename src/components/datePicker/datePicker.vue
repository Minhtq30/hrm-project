<template>
  <v-date-picker
    class="form-control-input overflow-hidden"
    :masks="masks"
    :model-config="modelConfig"
    :value="datePicker"
    @dayclick="SelectMultiDate"
    :update-on-input="true"
    :class="{ disabledHistoryWork: disable }"
  >
    <template v-slot="{ inputValue, togglePopover, inputEvents }">
      <div class="flex items-center">
        <button class="focus:outline-none mr-2" @click="togglePopover()">
          <i class="far fa-calendar-alt"></i>
        </button>
        <input
          placeholder="dd/mm/yyyy"
          :value="inputValue"
          class="focus:outline-none w-full"
          @click="togglePopover()"
          v-on="inputEvents"
          :class="{ disabledHistoryWork: disable }"
        />
      </div>
    </template>
  </v-date-picker>
</template>

<script>
export default {
  data() {
    return {
      masks: {
        input: "DD/MM/YYYY",
        data: "YYYY-MM-DD",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },
  props: {
    datePicker: {
      type: String,
    },
    SelectMultiDate: {
      type: Function,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
