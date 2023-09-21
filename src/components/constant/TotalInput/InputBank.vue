<template>
  <!-- Input chọn ngân hàng -->
  <v-select
    label="code"
    :options="listBanks"
    :reduce="(bank) => bank.title"
    placeholder="Chọn ngân hàng"
    :value="bank"
  >
    <template #option="{ code, title }">
      <div class="flex flex-col-reverse">
        <div class="font-semibold">{{ code }}</div>
        <div>{{ title }}</div>
      </div>
    </template>
    <template #selected-option="{ code, title }">
      <div style="display: flex; align-items: baseline">
        <div>{{ code }}</div>
        <div>- {{ title }}</div>
      </div>
    </template>
  </v-select>
</template>

<script>
import { useBanks } from "@/store/modules/settingPersonnel/banks";
import { storeToRefs } from "pinia";
export default {
  props: {
    bank: {
      type: null,
    },
  },
  setup() {
    const banks = useBanks();
    const { listBanks } = storeToRefs(banks);
    if (listBanks.value?.length == 0) {
      banks.GetAllBanksAction();
    }

    return {
      listBanks,
    };
  },
};
</script>

<style></style>
