<template>
  <div class="bg-[#f0f2f5]">
    <person-layout>
      <template v-slot:navbar>
        <navbar-social-3></navbar-social-3>
      </template>
      <div
        class="grow overflow-x-auto format-scroll"
        @scroll="loadNewPost($event)"
      >
        <div class="grid grid-cols-12 gap-10 grow">
          <sidebar-social-responsive class="md:hidden relative" />
          <div
            class="col-span-3 w-full relative max-sm:hidden"
            v-if="isLoading == false"
          >
            <sidebar-social />
          </div>
          <Transition name="slide-fade">
            <div
              class="col-span-6 mt-4 mx-4 max-sm:col-span-10 max-sm:pl-[35px]"
              @scroll="handle()"
              v-if="isLoading == false"
            >
              <div class="w-full" v-if="checkRole('SOCIAL_SOCIAL_CREATE')">
                <div
                  class="bg-white rounded-lg w-full py-4 shadow-lg max-sm:hidden"
                >
                  <create-post-box
                    :contentPost="newPost"
                    @create-post="CreatePost"
                  ></create-post-box>
                </div>
              </div>
              <div class="w-full mt-4">
                <div v-for="post in listSocialNew" :key="post.ID" class="py-4">
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
      </div>
      <div v-if="bottom">Loading!!!!!!</div>
    </person-layout>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import SidebarSocialResponsive from "@/components/sidebar/SidebarSocialResponsive.vue";
import SidebarSocialRight from "@/components/sidebar/SidebarSocialRight.vue";
import CreatePostBox from "@/components/auth/post/CreatePostBox";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import PostCard from "@/views/socials/PostCard.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { FormatRole } from "@/constants/FormatAll";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    CreatePostBox,
    SidebarSocialRight,
    PersonLayout,
    NavbarSocial3,
    PostCard,
    SidebarSocialResponsive,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toast = useToast();
    const bottom = ref(false);
    const isLoading = ref(true);
    const countPost = ref(4);
    const profile = useUserProfile();
    const { userProfile, AccountRole } = storeToRefs(profile);
    if (Object.entries(userProfile.value)?.length == 0) {
      profile.GetUserProfileAction();
    }
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("SocialNew/GetAllSocialNewAction", {
      countPost: countPost.value,
      EndTimeLoading,
    });

    const newPost = reactive({
      content_post: "",
      file_post: [],
      wall_status: "news",
    });
    const CreatePost = (closeModal) => {
      const data = {
        content_post: newPost.content_post,
        file_post: newPost.file_post,
        wall_status: newPost.wall_status,
      };
      if (data.content_post == "") {
        toast.error("Không được để trống nội dung bài viết");
      } else {
        isLoading.value = true;
        store.dispatch("SocialNew/CreateSocialNewAction", {
          data,
          toast,
          closeModal,
          count: countPost.value,
          EndTimeLoading,
        });
      }
    };
    const listSocialNew = computed(() => store.state.SocialNew.listSocialNew);
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    const checkRole = (index) => {
      return FormatRole(index, userProfile.value);
    };
    const loadNewPost = (e) => {
      const clientHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        store.dispatch("SocialNew/GetAllSocialNewAction", {
          countPost: (countPost.value += 1),
          EndTimeLoading,
        });
        return (countPost.value += 1);
      }
    };

    return {
      AccountRole,
      isLoading,
      newPost,
      listSocialNew,
      bottom,
      countPost,
      userProfile,
      EndTimeLoading,
      checkRoute,
      CreatePost,
      loadNewPost,
      checkRole,
    };
  },
};
</script>
<style></style>
