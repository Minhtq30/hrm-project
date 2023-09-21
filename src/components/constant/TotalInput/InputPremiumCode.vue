<template>
  <!-- chọn mã tỉnh cấp BHYT -->
  <v-select
    label="title"
    :options="listPremiumCode"
    :reduce="(code) => code.ID"
    @option:selected="changeInputPremiumCode($event)"
    @click.once="loadPlacePremium()"
    placeholder="Chọn địa điểm đăng kí BHYT"
    :value="place"
  ></v-select>
</template>

<script>
import { useInsurance } from "@/store/modules/personnelView/insurance";
import { storeToRefs } from "pinia";
export default {
  props: {
    place: {
      type: null,
    },
    loadData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const insurance = useInsurance();
    const { listPremiumCode } = storeToRefs(insurance);
    const loadPlacePremium = () => {
      insurance.GetAllPremiumCodeAction();
    };
    const changeInputPremiumCode = (event) => {
      insurance.GetAllPremiumPlaceAction(event.ID);
    };
    if (props.place != null) {
      insurance.GetAllPremiumPlaceAction(props.place);
    }
    if (props.loadData == true) {
      loadPlacePremium();
    }
    return {
      listPremiumCode,
      loadPlacePremium,
      changeInputPremiumCode,
    };
  },
};
</script>

<style></style>
