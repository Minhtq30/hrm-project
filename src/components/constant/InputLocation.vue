<template>
  <v-select
    label="title"
    :options="listCity"
    :reduce="(city) => city.ID"
    @click.once="loadPlace()"
    @option:selected="changeCity($event)"
    placeholder="Chọn tỉnh/thành phố"
    :value="location"
    @click="loadLocation"
  ></v-select>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    location: {
      type: null,
    },
  },
  setup() {
    const store = useStore();
    const listWorkplace = computed(() => store.state.workplace.listWorkplace);
    if (listWorkplace.value?.length == 0) {
      store.dispatch("workplace/getAllWorkplaceAction", 500);
    }
    const loadWorkplace = () => {
      if (listWorkplace.value?.length == 0) {
        store.dispatch("workplace/getAllWorkplaceAction", 500);
      }
    };

    return {
      listWorkplace,
      loadWorkplace,
    };
  },
};
</script>

<style></style>
