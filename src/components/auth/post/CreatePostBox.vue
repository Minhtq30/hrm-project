<template>
  <div>
    <div class="flex items-center mx-2 pb-2 border-b">
      <div class="min-w-[50px]">
        <img :src="avatar" alt="" class="w-[40px] h-[40px] rounded-full" />
      </div>
      <div
        class="rounded-2xl bg-slate-50 grow text-left p-3 cursor-pointer"
        @click="handleOpenPost()"
      >
        Bạn đang nghĩ gì thế?
      </div>
    </div>
  </div>
  <teleport to="#app">
    <modal-view :isOpen="isOpenPost" :handleCloseDetail="handleClosePost">
      <div class="w-[700px]">
        <div class="header-modal">tạo bài viết mới</div>
        <div class="text-left p-4">
          <div>
            <div class="flex items-center">
              <div class="min-w-[50px]">
                <img
                  :src="avatar"
                  alt=""
                  class="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div class="font-medium text-lg">
                {{ userProfile.fullname }}
              </div>
            </div>
            <div class="h-[350px] overflow-auto format-scroll">
              <div class="mt-4 rounded-lg">
                <input
                  placeholder="Tiêu đề bài viết..."
                  autocomplete="off"
                  autofocus="true"
                  type="text"
                  name="title"
                  style="
                    flex-grow: 1;
                    border: none;
                    font-size: 1.8em;
                    padding: 10px;
                    height: auto;
                    width: 100%;
                    outline: none;
                  "
                  v-model="postContent.topics"
                  v-if="hideShare"
                />
                <ckeditor
                  :editor="editor"
                  v-model="postContent.content_post"
                  :config="editorConfig"
                ></ckeditor>
              </div>
              <div
                class="w-full border p-2 rounded-lg"
                v-if="isShowImage == true"
              >
                <div class="flex justify-between items-center">
                  <input
                    type="file"
                    @change="previewFiles($event)"
                    class="w-full cursor-pointer"
                  />
                  <span class="" @click="closeImage()"
                    ><i
                      class="fal fa-times-circle text-2xl cursor-pointer hover:text-red-500"
                    ></i
                  ></span>
                </div>
                <div class="w-full">
                  <div class="flex items-center flex-wrap">
                    <div
                      v-for="(item, index) in postContent.file_post"
                      :key="index"
                    >
                      <div class="relative">
                        <img
                          alt=""
                          :src="item || emptyImage"
                          class="w-[200px] h-[200px] rounded-lg object-cover m-1"
                        />
                        <span
                          class="absolute -top-3 right-3 z-10"
                          @click="removeImage(index)"
                        >
                          <i class="fal fa-times-circle icon-close"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <div class="w-full flex">
            <div
              class="w-full border p-2 rounded-lg flex justify-between items-center bg-white mb-2 hover:text-red-500 cursor-pointer mx-2"
              :class="{ showNoti: hideShare }"
              @click="showNotic()"
            >
              <div>Chia sẻ</div>
              <div class="">
                <span class="text-2xl"><i class="fal fa-share-all"></i></span>
              </div>
            </div>
            <div
              class="w-full border p-2 rounded-lg flex justify-between items-center bg-white mb-2 cursor-pointer hover:text-red-500 mx-2"
              @click="isShowImage = true"
            >
              <div>Ảnh/ File</div>
              <div class="">
                <span class="text-2xl"><i class="fal fa-images"></i></span>
              </div>
            </div>
            <div
              class="w-full border p-2 rounded-lg flex justify-between items-center bg-white mb-2 hover:text-red-500 cursor-pointer mx-2"
              v-if="isNotification"
              @click="handleNotification()"
              :class="{ showNoti: showShare }"
            >
              <div>Thông báo</div>
              <div class="">
                <span class="text-2xl" @click="isShowImage = true"
                  ><i class="fal fa-bell-on"></i
                ></span>
              </div>
            </div>
          </div>

          <button class="button-modal w-full" @click="CreatePost()">
            Đăng
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
</template>

<script>
import { ref } from "@vue/runtime-core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  name: "CreatePostBox",
  props: {
    contentPost: {
      type: Object,
    },
    isNotification: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["create-post", "is-notice", "hide-notice"],
  setup(props, { emit }) {
    const isOpenPost = ref(false);
    const isShowImage = ref(false);
    const newImage = ref([]);
    const emptyImage = ref();
    const editorData = ref("");
    const profile = useUserProfile();
    const { userProfile, avatar } = storeToRefs(profile);
    const postContent = ref(props.contentPost);
    const hideShare = ref(false);
    const showShare = ref(true);
    const handleOpenPost = () => {
      isOpenPost.value = true;
    };
    const handleClosePost = () => {
      isOpenPost.value = false;
      postContent.value.content_post = "";
      postContent.value.file_post = [];
    };
    const CreatePost = () => {
      emit("create-post", handleClosePost);
    };
    const closeImage = () => {
      isShowImage.value = false;
      postContent.value.file_post = [];
    };
    const removeImage = (index) => {
      postContent.value.file_post.splice(index, 1);
    };
    const showNotic = () => {
      showShare.value = true;
      hideShare.value = false;
      emit("hide-notice", hideShare.value);
    };
    const handleNotification = () => {
      hideShare.value = true;
      showShare.value = false;
      emit("is-notice", hideShare.value);
    };
    return {
      avatar,
      isOpenPost,
      userProfile,
      newImage,
      emptyImage,
      handleOpenPost,
      handleClosePost,
      isShowImage,
      closeImage,
      editorData,
      removeImage,
      postContent,
      showShare,
      hideShare,
      CreatePost,
      handleNotification,
      showNotic,
    };
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  methods: {
    previewFiles(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.postContent.file_post.push(await theReader.result);
      };
      theReader.readAsDataURL(file);
      console.log(this.postContent.file_post);
    },
  },
};
</script>

<style>
.showNoti {
  background-color: #969696b3;
}
</style>
