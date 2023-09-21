<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    content: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);
    return { isActive };
  },
};
</script>

<template>
  <router-link
    :to="to"
    class="link app-menu-item hover:bg-cyan-300 rounded hover:text-cyan-700"
    :class="{ active: isActive }"
  >
    <i style="font-size: 24px" class="flex bi" :class="icon"></i>
    <span class="nowrap">
      {{ content }}
    </span>
  </router-link>
</template>
