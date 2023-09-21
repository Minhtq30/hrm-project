<template>
  <div class="flex w-full h-screen">
    <div class="flex grow"><slot name="sidebar"></slot></div>
    <div class="flex grow flex-col w-full sm:overflow-x-hidden">
      <div class="sticky top-0 right-0 z-20 w-full">
        <slot name="navbar"></slot>
      </div>
      <slot name="sub_navbar"></slot>
      <slot v-if="isSocial"></slot>
      <div class="grow overflow-x-auto format-scroll" v-else>
        <slot></slot>
      </div>
      <div class="sticky bottom-0 right-0 z-20 w-full">
        <slot name="sub_footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const isSocial = ref(false);
    if (
      route.name == "Social" ||
      route.name == "Social Company" ||
      route.name == "PrivateView" ||
      route.name == "Social Groups Detail"
    ) {
      isSocial.value = true;
    } else {
      isSocial.value = false;
    }

    return {
      isSocial,
    };
  },
};
</script>
