<template>
  <table class="h-full whitespace-nowrap border w-full relative">
    <thead>
      <tr>
        <th
          class="sticky top-0 px-6 py-3 bg-slate-50 z-[5]"
          :class="{ isCheck: isCheck }"
          v-show="isShow"
        >
          <div class="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              @click="checkAll"
              :checked="isCheck"
            />
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th
          class="sticky top-0 px-3 py-3 text-[#050505] font-medium bg-slate-50 z-[5]"
          v-for="(item, index) in header"
          :key="index"
          align="center"
          @click="handleSort"
          :class="{ isCheck: isCheck }"
        >
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody class="border-b">
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    header: {
      type: Array,
    },
    users: {
      type: Array,
    },
    checkAll: {
      type: Function,
    },
    isCheck: {
      type: Boolean,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
  setup() {
    const handleSort = () => {
      console.log("a");
    };
    return { handleSort };
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px;
  text-align: left;
  /* border: #ddd; */
}
tbody tr:hover {
  background-color: #f7f8f9;
  /* color: white; */
}
thead th:nth-child(11) {
  text-align: center;
}
</style>
