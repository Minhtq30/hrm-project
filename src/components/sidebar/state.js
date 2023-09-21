import { ref, computed } from "vue";

export const collapsed = ref(false);
export const toggleSidebar = () => (collapsed.value = !collapsed.value);
export const collapsedResponsive = ref(false);
export const toggleSidebarResponsive = () =>
  (collapsedResponsive.value = !collapsedResponsive.value);
export const SIDEBAR_WIDTH = 230;
export const SIDEBAR_WIDTH_COLLAPSED = 70;
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
);
export const sidebarResponsiveWidth = computed(
  () =>
    `${collapsedResponsive.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
);
