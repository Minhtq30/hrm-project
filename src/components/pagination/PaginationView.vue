<template>
  <div>
    <nav
      class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
      aria-label="Pagination"
    >
      <a
        href="#"
        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        :class="[{ disabledLink: !listPagination.prev_page_url }]"
        @click.prevent="PrevPage"
      >
        <span class="sr-only">Previous</span>
        <!-- Heroicon name: solid/chevron-left -->
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
      <a
        aria-current="page"
        class="z-10 bg-indigo-50 border-gray-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      >
        {{ listPagination.current_page }} - {{ listPagination.last_page }}
      </a>
      <a
        href="#"
        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        :class="[{ disabledLink: !listPagination.next_page_url }]"
        @click.prevent="NextPage"
      >
        <span class="sr-only">Next</span>
        <!-- Heroicon name: solid/chevron-right -->
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    listPagination: {
      type: Object,
    },
    NextPage: {
      type: Function,
    },
    PrevPage: {
      type: Function,
    },
  },
};
</script>

<style>
.disabledLink {
  pointer-events: none;
}
</style>
