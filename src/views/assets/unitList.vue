<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-qlts></sidebar-qlts>
    </template>
    <template v-slot:navbar>
      <navbar-social></navbar-social>
    </template>
    <div class="w-full">
      <table-responsive :header="header" :units="units"
        ><tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(unit, index) in listUnits"
          :key="index"
          :class="{ isCheck: unit.checkUser }"
          @contextmenu.prevent="rightClick($event)"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="unit.checkUser"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {{ unit.Id }}
          </th>
          <td class="px-6 py-4">{{ unit.id }}</td>
          <td class="px-6 py-4">{{ unit.title }}</td>
          <td class="px-6 py-4">{{ user.description }}</td>
        </tr></table-responsive
      >
    </div>
  </person-layout>
</template>

<script>
import TableResponsive from "@/components/table/TableResponsive.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarQlts from "@/components/sidebar1/asset/sidebarAsset.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
// import { reactive, ref } from "vue";
import { createNamespacedHelpers, useStore } from "vuex";
const { mapState } = createNamespacedHelpers("qlts/unit");
export default {
  components: {
    TableResponsive,
    PersonLayout,
    SidebarQlts,
    NavbarSocial,
  },
  setup() {
    const store = useStore();
    store.dispatch("qlts/unit/getAllUnitsAction");
    const listUnit = store.state.listUnit;
    return {
      listUnit: listUnit,
    };
  },
  data() {
    return {
      header: ["Mã", "Tên", "Diễn giải"],
    };
  },
  computed: {
    ...mapState({
      listUnits: (state) => state.listUnits,
    }),
  },
  methods: {
    abc(data) {
      alert(data.name);
    },
  },
};
</script>

<style></style>
