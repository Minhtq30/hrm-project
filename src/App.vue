<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useNoticesStore } from "@/store/modules/notices/piniaNotices";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const NoticesStore = useNoticesStore();
    const profile = useUserProfile();
    const { listNotices } = storeToRefs(NoticesStore);
    const { userProfile, AccountRole } = storeToRefs(profile);
    if (listNotices.value?.length == 0) {
      NoticesStore.getAllNoticesAction(10);
    }
    watch(route, (to) => {
      store.dispatch("users/checkAuthenticated", { to, router, store });
      document.title = route.name;
    });
    setTimeout(() => {
      if (route.name != "Login") {
        if (Object.entries(userProfile.value)?.length == 0) {
          profile.GetUserProfileAction();
        }
      }
    }, 500);
    return {
      layout: computed(() => route.meta.layout),
      AccountRole,
      userProfile,
      listNotices,
    };
  },
};
</script>
<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
