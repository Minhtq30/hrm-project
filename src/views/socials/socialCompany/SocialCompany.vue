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
        <div class="grid grid-cols-12 gap-x-2 grow">
          <div class="col-span-3">
            <sidebar-social />
          </div>
          <Transition name="slide-up">
            <div class="col-span-9 p-4">
              <div title="navbar-company">
                <navbar-company></navbar-company>
              </div>
              <Transition name="slide-fade">
                <div title="social-company" v-if="isLoading == false">
                  <div class="create-post rounded-lg py-4">
                    <div class="grid grid-cols-12">
                      <div class="col-span-8">
                        <div
                          class="bg-white py-4 rounded-lg shadow-lg mb-4"
                          v-if="checkRole('SOCIAL_SOCIAL_CREATE')"
                        >
                          <create-post-box
                            :contentPost="newPost"
                            @create-post="CreatePost"
                            :isNotification="true"
                            @is-notice="showNotice"
                            @hide-notice="hideNotice"
                          ></create-post-box>
                        </div>
                        <div class="w-full">
                          <div
                            v-for="post in listPostGroup"
                            :key="post.ID"
                            class="listPostPrivate"
                          >
                            <post-card
                              :postDetail="post"
                              :countPost="countPost"
                            ></post-card>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-4">
                        <sidebar-social-right></sidebar-social-right>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
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
import { reactive, ref } from "vue";
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import SidebarSocialRight from "@/components/sidebar/SidebarSocialRight.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import PostCard from "@/views/socials/PostCard.vue";
import NavbarCompany from "@/views/socials/socialCompany/NavbarCompany.vue";
import { FormatDate, FormatRole } from "@/constants/FormatAll";
import CreatePostBox from "@/components/auth/post/CreatePostBox";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
    SidebarSocialRight,
    NavbarCompany,
    CreatePostBox,
    PostCard,
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
    changeBackground(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.imageBackground = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
    changeImageAvatar(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.iamgeAvatar = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
  },
  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    const toast = useToast();
    const countPost = ref(5);
    const bottom = ref(false);
    const showTitle = ref(false);
    const sc_group = useSocialGroup();
    const { groupDetail, listPostGroup } = storeToRefs(sc_group);
    const profile = useUserProfile();
    const { userProfile, AccountRole } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    sc_group.GetAllPostGroupAction({
      id: route.params.idGroup,
      count: countPost.value,
      EndTimeLoading,
    });
    const newPost = reactive({
      content_post: "",
      file_post: [],
      wall_ids: "1",
      wall_status: "company",
      topics: "",
    });
    const checkRole = (index) => {
      return FormatRole(index, userProfile.value);
    };
    const showNotice = (index) => {
      showTitle.value = index;
    };
    const hideNotice = (index) => {
      showTitle.value = index;
    };
    const CreatePost = (closeModal) => {
      let data;
      if (showTitle.value) {
        data = {
          content_post: newPost.content_post,
          file_post: newPost.file_post,
          wall_ids: newPost.wall_ids,
          wall_status: newPost.wall_status,
          topics: newPost.topics, //Tiêu đề
          title: "NOTICES", //Thông báo
        };
      } else {
        data = {
          content_post: newPost.content_post,
          file_post: newPost.file_post,
          wall_ids: newPost.wall_ids,
          wall_status: newPost.wall_status,
        };
      }
      if (data.content_post == "") {
        toast.error("Không được để trống nội dung");
      } else {
        isLoading.value = true;
        sc_group.CreatePostGroupAction({
          data,
          toast,
          route,
          closeModal,
          count: countPost.value,
          EndTimeLoading,
        });
      }
    };
    const loadNewPost = (e) => {
      const clientHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        sc_group.GetAllPostGroupAction({
          id: route.params.idGroup,
          count: (countPost.value += 1),
          EndTimeLoading,
        });
        return (countPost.value += 1);
      }
    };
    return {
      userProfile,
      isLoading,
      newPost,
      bottom,
      countPost,
      groupDetail,
      listPostGroup,
      showTitle,
      AccountRole,
      EndTimeLoading,
      hideNotice,
      CreatePost,
      showNotice,
      loadNewPost,
      checkRole,
    };
  },
};
</script>
<style></style>
