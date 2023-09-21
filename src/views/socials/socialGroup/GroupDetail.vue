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
              <header-group-detail></header-group-detail>
              <Transition name="slide-fade">
                <div
                  class="create-post rounded-lg py-4"
                  v-if="isLoading == false"
                >
                  <div class="grid grid-cols-12">
                    <div class="col-span-8">
                      <div
                        class="bg-white py-4 rounded-lg shadow-lg mb-4"
                        v-if="checkRole('SOCIAL_SOCIAL_CREATE')"
                      >
                        <create-post-box
                          :contentPost="newPost"
                          @create-post="CreatePost"
                        ></create-post-box>
                      </div>
                      <div class="w-full">
                        <div
                          v-if="listPostGroup?.length == 0"
                          class="bg-white rounded-lg"
                        >
                          <p class="p-4 text-left text-lg">
                            Chưa có bài viết nào
                          </p>
                        </div>
                        <div
                          v-for="post in listPostGroup"
                          :key="post.ID"
                          class="listPostPrivate"
                          v-else
                        >
                          <post-card
                            :postDetail="post"
                            :countPost="countPost"
                          ></post-card>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-4 w-full">
                      <div class="ml-8 bg-white shadow-lg rounded-lg">
                        <div class="border-b p-4 flex items-center font-bold">
                          <i
                            class="fal fa-exclamation-circle text-red-500 px-1"
                          ></i>
                          Thông tin chung
                        </div>
                        <div
                          class="border-b p-4 flex justify-between w-full"
                          v-if="groupDetail.desc"
                          style="word-break: break-all"
                        >
                          <span>{{ groupDetail.desc }}</span>
                        </div>
                        <div class="p-4 text-left">
                          <div
                            v-if="groupDetail.detail_managers"
                            title="Giới thiệu"
                          >
                            Nhóm đc quản trị bởi : &nbsp;
                            {{ formatName(groupDetail.detail_managers) }}
                          </div>
                        </div>
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
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import CreatePostBox from "@/components/auth/post/CreatePostBox";
import PostCard from "@/views/socials/PostCard.vue";
import HeaderGroupDetail from "./HeaderGroupDetail.vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { FormatRole } from "@/constants/FormatAll";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
// import { lookup } from "dns";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
    CreatePostBox,
    PostCard,
    HeaderGroupDetail,
  },
  methods: {
    formatName(array) {
      var lookup1 = {};
      const tennguoi = [];
      for (var i = 0; i < array.length; i++) {
        lookup1[array[i].fullname] = array[i];
        tennguoi.push(array[i].fullname);
      }
      return tennguoi.toString();
    },
  },
  setup() {
    const isLoading = ref(true);
    const toast = useToast();
    const route = useRoute();
    const countPost = ref(5);
    const bottom = ref(false);
    const profile = useUserProfile();
    const sc_group = useSocialGroup();
    const { groupDetail, listPostGroup } = storeToRefs(sc_group);
    const { userProfile } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    sc_group.GetAllPostGroupAction({
      id: route.params.idGroup,
      count: countPost.value,
      toast,
      EndTimeLoading,
    });
    const newPost = reactive({
      content_post: "",
      file_post: [],
      wall_ids: route.params.idGroup,
      wall_status: "group",
    });
    const checkRole = (index) => {
      return FormatRole(index, userProfile.value);
    };
    const CreatePost = (closeModal) => {
      const data = {
        content_post: newPost.content_post,
        file_post: newPost.file_post,
        wall_ids: newPost.wall_ids,
        wall_status: newPost.wall_status,
      };
      if (data.content_post == "") {
        toast.error("Không được để trống nội dung bài viết");
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
      if (scrollTop + clientHeight >= scrollHeight) {
        sc_group.GetAllPostGroupAction({
          id: route.params.idGroup,
          count: (countPost.value += 1),
          toast,
          EndTimeLoading,
        });
        return (countPost.value += 1);
      }
    };
    return {
      isLoading,
      groupDetail,
      listPostGroup,
      countPost,
      newPost,
      bottom,
      userProfile,
      CreatePost,
      loadNewPost,
      checkRole,
      EndTimeLoading,
    };
  },
};
</script>
<style></style>
