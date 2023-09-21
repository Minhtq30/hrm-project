<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { collapsed } from "../sidebar/state";

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    content: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);
    return { isActive, collapsed };
  },
};
</script>

<template>
  <router-link :to="to" class="link py-1" :class="{ active: isActive }">
    <div
      class="flex items-center py-3 px-4 space-x-2 hover:bg-slate-100 rounded hover:text-cyan-700"
    >
      <i style="font-size: 24px" class="flex bi" :class="icon"></i>
    </div>
    <transition name="fade" class="items-center pt-2 pr-4">
      <span v-show="!collapsed">
        {{ content }}
      </span>
    </transition>
  </router-link>
</template>
