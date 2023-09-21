<template>
  <selector-view-vue
    :Placeholder="'Nhập người duyệt'"
    :listOption="listManagers"
    :listFinal="group.managers"
    :searchOption="loadManagers"
  >
    <template v-slot:selectedOption="{ item }">
      <div class="flex flex-col text-left">
        <div class="flex">
          <div class="font-medium">{{ item.code }}</div>
          <div>&nbsp;- {{ item.fullname }}</div>
        </div>
        <div class="flex text-xs">
          <div v-if="item.position">
            {{ item.position?.title }}&nbsp;-&nbsp;
          </div>
          <div>{{ item.department?.title }}</div>
        </div>
      </div>
    </template>
    <template v-slot:selected="{ item }">
      <div class="flex">
        <div class="font-medium">{{ item.code }}</div>
        <div>&nbsp;- {{ item.fullname }}</div>
      </div>
    </template>
  </selector-view-vue>
</template>

<script>
import SelectorViewVue from "@/components/selector/SelectorView.vue";
export default {
  components: {
    SelectorViewVue,
  },
};
</script>

<style></style>
