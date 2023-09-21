<script>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { collapsedResponsive } from "@/components/sidebar/state";
import { FormatRole } from "@/constants/FormatAll";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  name: "MenuItem",
  props: {
    to: { type: String, required: true },
    label: { type: String, required: true },
    smallLabel: { type: String },
    icon: { type: String },
    depth: { type: Number, required: true },
    data: { type: Array },
    permission: { type: Array },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path == props.to);
    const showChildren = ref(false);
    const profile = useUserProfile();
    const { userProfile, AccountRole } = storeToRefs(profile);
    if (props.data) {
      if (props.data.find((item) => item.to == route.path)) {
        showChildren.value = true;
      } else {
        showChildren.value = false;
      }
    }
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    const toggleShowChildren = () => {
      showChildren.value = !showChildren.value;
    };
    const checkRole = (index) => {
      for (let i = 0; i < index.length; i++) {
        if (FormatRole(index[i], AccountRole.value) == true) {
          return true;
        }
      }
    };
    const checkCenter = (index) => {
      if (index == true) {
        return " justify-center";
      } else {
        return "pl-4";
      }
    };
    return {
      isActive,
      collapsedResponsive,
      showChildren,
      checkRoute,
      AccountRole,
      userProfile,
      checkRole,
      toggleShowChildren,
      checkCenter,
    };
  },
};
</script>
<template>
  <div
    class="menu-item flex-row"
    :class="{ activeSidebar: checkRoute(to) }"
    v-if="checkRole(permission)"
  >
    <div class="flex-row" @click="toggleShowChildren()">
      <router-link
        :to="to"
        class="flex items-center py-2"
        :class="checkCenter(collapsedResponsive)"
      >
        <div class="flex justify-center items-center">
          <div class="flex flex-col items-center justify-center">
            <div class="flex items-center" v-if="icon">
              <i
                style="
                  font-size: 18px;
                  width: 25px;
                  height: 25px;
                  text-align: left;
                  padding-top: 3px;
                "
                class="flex items-center pl-1"
                :class="icon"
              ></i>
            </div>
            <div
              v-if="collapsedResponsive"
              style="
                font-size: 10px;
                text-align: left;
                white-space: nowrap;
                margin-top: 8px;
              "
            >
              {{ smallLabel }}
            </div>
          </div>
          <div
            v-if="!collapsedResponsive"
            style=""
            class="flex-nowrap text-left ml-3"
          >
            {{ label }}
          </div>
        </div>
      </router-link>
    </div>
    <div class="item-container flex-2 ml-8" v-if="showChildren">
      <menu-item
        class="hover:bg-white/20 text-white flex-column border-l-2 just"
        v-for="(item, index) in data"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :depth="depth + 1"
        :data="item.children"
        :to="item.to"
        :permission="item.permission"
        v-show="!collapsedResponsive"
      />
    </div>
  </div>
</template>

<style></style>
