<template>
  <div class="flex mr-8 ml-8 p-1.5 pr-8 w-full">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only"
      >Search</label
    >
    <div class="relative w-full">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <i class="fal fa-search"></i>
      </div>
      <input
        type="search"
        class="block p-2.5 pl-10 w-full whitespace-no-wrap outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200"
        placeholder="Tìm kiếm"
        @keyup.enter="handleSearch(wordSearch)"
        v-model="wordSearch"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="currentColor"
        class="w-6 h-6 flex absolute right-3 top-2 text-gray-600 hover:text-gray-900 cursor-pointer"
        @click="showSearch"
        v-if="wordSearch?.length == 0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    handleSearch: {
      type: Function,
    },
    showSearch: {
      type: Function,
    },
  },
  data() {
    return {
      wordSearch: "",
    };
  },
};
</script>

<style></style>
