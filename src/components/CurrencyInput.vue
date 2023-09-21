<template>
  <input
    ref="inputRef"
    type="text"
    class="form-control-input"
    placeholder="Nhập số tiền"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: { String, Object, Number },
    options: Object,
  },
  setup(props) {
    const { inputRef, formattedValue, setValue } = useCurrencyInput({
      currency: "USD",
      currencyDisplay: "hidden",
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
      hideNegligibleDecimalDigitsOnFocus: false,
    });
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );
    return { inputRef, formattedValue };
  },
};
</script>
