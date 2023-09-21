<template>
  <div class="flex items-center h-full">
    <slot></slot>
    <div class="flex">
      <ul class="tablist">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: tab == selected }"
        >
          <a @click.prevent="setTab(tab)" :class="checkPadding(paddingTab)">
            {{ tab }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
    paddingTab: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setTab(tab) {
      this.$emit("selected", tab);
    },
    checkPadding(index) {
      if (index) {
        return "paddingTab";
      } else {
        return "defaultPadding";
      }
    },
  },
};
</script>

<style>
.tablist {
  margin: 0;
  padding: 0;
}
.tablist li {
  margin-left: 4px;
  list-style: none;
  display: inline-flex;
  margin-top: 4px;
  position: relative;
}
.paddingTab {
  padding: 8px 12px;
}
.defaultPadding {
  padding: 8px 4px;
}
.tablist li a {
  text-decoration: none;
  cursor: pointer;
  color: #a2a2a2;
}
.tablist li a:hover {
  color: var(--color-primary);
}
.tablist li.active a {
  color: var(--color-primary);
  transition: all linear 0.3s;
  font-weight: 500;
}
.tablist li.active a::after {
  content: "";
  height: 2px;
  width: 100%;
  background-color: var(--color-primary);
  position: absolute;
  left: 0;
  bottom: -7px;
  transition: all linear 0.3s;
}
</style>
