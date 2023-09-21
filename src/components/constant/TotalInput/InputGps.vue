<template>
  <!-- Địa điểm chấm công GPS -->
  <v-select
    placeholder="Chọn vị trí định vị"
    label="title"
    :options="listGPSLocation"
    :reduce="(location) => location.ID"
    @click.once="loadGPSLocation()"
    :multiple="isMultiple"
    :value="location"
  ></v-select>
</template>

<script>
import { useGpsLocation } from "@/store/modules/settingTimekeep/gpslocation";
import { storeToRefs } from "pinia";
export default {
  props: {
    location: {
      type: null,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    loadData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const gps = useGpsLocation();
    const { listGPSLocation } = storeToRefs(gps);
    const loadGPSLocation = () => {
      if (listGPSLocation.value?.length == 0) {
        gps.GetAllGPSLocationAction();
      }
    };
    if (props.loadData == true) {
      loadGPSLocation();
    }
    return {
      listGPSLocation,
      loadGPSLocation,
    };
  },
};
</script>

<style></style>
