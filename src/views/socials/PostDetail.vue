<template>
  <div class="bg-[#f0f2f5]">
    <person-layout>
      <template v-slot:navbar>
        <navbar-social-3></navbar-social-3>
      </template>

      <div class="grid grid-cols-12 gap-10 grow h-full">
        <div class="col-span-3 w-full relative">
          <sidebar-social />
        </div>
        <Transition name="slide-fade">
          <div class="col-span-6 mx-4" v-if="isLoading == false">
            <div class="w-full mt-4">
              <div v-for="post in detailPost" :key="post.ID" class="py-4">
                <post-card
                  :postDetail="post"
                  :countPost="countPost"
                ></post-card>
              </div>
            </div>
          </div>
        </Transition>
        <Transition name="slide-fade">
          <div class="col-span-3 w-full my-4" v-if="isLoading == false">
            <sidebar-social-right></sidebar-social-right>
          </div>
        </Transition>
      </div>
    </person-layout>
  </div>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>
<script>
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import SidebarSocialRight from "@/components/sidebar/SidebarSocialRight.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import PostCard from "@/views/socials/PostCard.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    SidebarSocialRight,
    PersonLayout,
    NavbarSocial3,
    PostCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const bottom = ref(false);
    const isLoading = ref(true);
    const countPost = ref(5);
    const profile = useUserProfile();
    const { userProfile, AccountRole } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("SocialNew/ShowDetailPostAction", {
      id: route.params.idPost,
      EndTimeLoading,
    });
    if (Object.entries(userProfile.value)?.length == 0) {
      profile.GetUserProfileAction();
    }
    watch(route, (to) => {
      if (to.name == "Chi tiết bài viết") {
        isLoading.value = true;
        store.dispatch("SocialNew/ShowDetailPostAction", {
          id: to.params.idPost,
          EndTimeLoading,
        });
      }
    });
    const detailPost = computed(() => store.state.SocialNew.detailPost);
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    return {
      AccountRole,
      isLoading,
      bottom,
      countPost,
      userProfile,
      checkRoute,
      detailPost,
      EndTimeLoading,
    };
  },
};
</script>
<style></style>
