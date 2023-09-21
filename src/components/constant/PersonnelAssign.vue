<template>
  <div class="col-span-2">
    <input
      type="text"
      name=""
      id=""
      class="disabledInput p-3 w-full"
      disabled
      placeholder="Mã NV"
      v-model="item.personnel_code"
    />
  </div>
  <div class="col-span-4">
    <v-select
      label="name"
      :options="listPersonnels"
      :reduce="(personnel) => personnel.ID"
      :filterable="false"
      @input="loadPersonnel($event)"
      @option:selected="changeInputPersonnel($event, index)"
      placeholder="Chọn nhân sự"
      v-model="item.personnel_id"
    ></v-select>
  </div>
  <div class="col-span-3">
    <input
      type="text"
      name=""
      id=""
      class="disabledInput p-3 w-full"
      disabled
      placeholder="Vị trí"
      v-model="item.position_id"
    />
  </div>
  <div class="col-span-3">
    <input
      type="text"
      name=""
      id=""
      class="disabledInput p-3 w-full"
      disabled
      placeholder="Phòng ban"
      v-model="item.department_id"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: {
    idPersonnel: {
      type: null,
    },
  },
  setup() {
    const store = useStore();
    const loadPersonnel = () => {
      store.dispatch("personnels/SearchPersonnelAction", event.target.value);
    };
    return {
      loadPersonnel,
    };
  },
};
</script>

<style></style>
