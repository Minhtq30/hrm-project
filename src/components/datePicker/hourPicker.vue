<template>
  <v-date-picker
    :value="hourPicker"
    mode="time"
    :is24hr="true"
    :masks="masksTime"
    :model-config="modelConfigTime"
    class="form-control-input overflow-hidden"
  >
    <template #default="{ inputValue, inputEvents }">
      <div class="flex items-center">
        <i class="fal fa-clock mr-1"></i>
        <input :value="inputValue" v-on="inputEvents" class="outline-none" />
      </div>
    </template>
  </v-date-picker>
</template>

<script>
export default {
  data() {
    return {
      masksTime: {
        input: "HH:mm",
        data: "HH:mm:ss",
      },
      modelConfigTime: {
        type: "string",
        mask: "HH:mm",
      },
    };
  },
  props: {
    hourPicker: {
      type: String,
    },
  },
};
</script>

<style></style>
