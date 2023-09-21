<template>
  <div
    class="w-full rounded-lg bg-white overflow-hidden shadow-lg"
    v-if="postDetail"
  >
    <div
      :title="postDetail?.user_post?.fullname"
      class="flex justify-between items-center"
    >
      <div class="flex items-center ml-2 px-2 pt-4">
        <div class="min-w-[50px]">
          <img
            :src="urlIamge + '/' + postDetail?.user_post?.avatars"
            alt=""
            style="height: 40px; width: 40px; border-radius: 50%"
            @click="showDetailUser(postDetail?.user_post?.ID)"
            class="cursor-pointer hover:border hover:border-red-400"
          />
        </div>
        <div class="m-0 p-0">
          <div class="text-left">
            <a
              href=""
              class="inline font-medium hover:underline"
              style="color: var(--color-primary)"
              @click.prevent="showDetailUser(postDetail?.user_post?.ID)"
            >
              {{ postDetail?.user_post?.fullname }}
            </a>
            <span class="ml-1"
              >{{ formatPostCard(postDetail) }}
              <a
                href=""
                @click.prevent="this.$router.push(subLink)"
                style="color: var(--color-primary)"
                class="hover:underline"
                >{{ subTitle }}</a
              ></span
            >
          </div>
          <p class="updateTime text-sm text-left">
            <span>
              <i class="far fa-clock text-sm mr-1"></i
              >{{ formatTime(postDetail.created_at) }}</span
            >
          </p>
        </div>
      </div>
      <div
        class="relative group cursor-pointer mr-4"
        v-if="checkUserCreated(postDetail.created_by_id)"
      >
        <i class="fal fa-ellipsis-h-alt text-lg"></i>
        <div
          class="absolute z-10 right-0 top-4 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute drop-shadow-2xl"
        >
          <ul class="bg-white p-1 rounded-md">
            <li
              class="w-32 sub-item flex justify-around items-center"
              @click="handleOpenDeletePost(postDetail.ID)"
            >
              <i class="fal fa-trash"></i>Xóa bài viết
            </li>
            <li
              class="w-32 sub-item flex justify-around items-center"
              @click="handleOpenEditPost(postDetail.ID)"
            >
              <i class="fal fa-edit"></i>Sửa bài viết
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full px-4 py-3">
      <div
        style="
          flex-grow: 1;
          border: none;
          font-size: 1.8em;
          height: auto;
          width: 100%;
          outline: none;
          text-align: left;
        "
        v-if="postDetail?.topics"
      >
        {{ postDetail?.topics }}
      </div>
      <div
        title="Nội dung"
        v-html="postDetail.content"
        class="text-left my-2"
        v-if="postDetail?.content"
        ref="heightContent"
        :class="{ longContent: isHeight }"
      ></div>
      <p class="text-left" v-if="isHeight" @click="isHeight = true">Xem thêm</p>
      <div
        class="w-full grid grid-cols-4 gap-2"
        v-if="postDetail.files?.length > 0"
      >
        <div
          v-for="(item, index) in postDetail.files"
          :key="index"
          :class="formatImage(postDetail)"
          @click="handleShowDetailPost(postDetail)"
        >
          <img
            class="rounded-lg w-full cursor-pointer"
            :src="urlIamge + '/' + item"
            alt="Sunset in the mountains"
          />
        </div>
      </div>
    </div>
    <div class="post-action-top">
      <div>
        <div
          class="flex items-center hover:underline cursor-pointer hover:text-red-500"
          v-if="postDetail.reaction_count > 0"
          @click="handleOpenReaction()"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/3670/3670153.png"
            alt=""
          />{{ postDetail.reaction_count }}
        </div>
      </div>
      <div v-if="postDetail.comments?.length > 0">
        {{ postDetail.comments?.length }} bình luận
      </div>
    </div>
    <div class="post-action-bottom">
      <div class="post-action-bottom-left">
        <div>
          <div v-if="isLiked == false" @click="LikePost(postDetail.ID)">
            <i class="fal fa-thumbs-up"></i>
            <span>Thích</span>
          </div>
          <div v-else class="postCardLiked" @click="UnlikePost(postDetail.ID)">
            <i class="fas fa-thumbs-up"></i>
            <span>Thích</span>
          </div>
        </div>
        <div @click="WriteComment()">
          <div>
            <i class="fal fa-comment"></i>
            <span>Bình luận</span>
          </div>
        </div>
      </div>
      <div class="post-action-bottom-right">
        <div
          class="flex -space-x-2 overflow-hidden cursor-pointer"
          @click="handleOpenReaction()"
        >
          <img
            v-for="avatar in fewPersonLiked"
            :key="avatar.ID"
            class="inline-block h-8 w-8 rounded-full ring-2 ring-white border border-red-400"
            :src="urlIamge + '/' + avatar?.auth_avatar"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="post-list-comment" v-if="postDetail.comments?.length > 0">
      <div v-if="litteComment == true" class="flex items-center">
        <div>
          <img
            :src="urlIamge + '/' + fewComment?.auth_avatar"
            alt=""
            class="w-[40px] h-[40px] rounded-full cursor-pointer hover:border hover:border-red-400"
            @click="showDetailUser(fewComment?.created_by_id)"
          />
        </div>
        <div class="post-action-comment_content">
          <div class="flex justify-between items-center">
            <a
              href=""
              @click.prevent="showDetailUser(fewComment?.created_by_id)"
              >{{ fewComment.auth_comment }}</a
            >
            <div
              class="relative group cursor-pointer"
              v-if="checkUserCreated(fewComment.created_by_id)"
            >
              <i class="fal fa-ellipsis-h-alt"></i>
              <div
                class="absolute z-10 right-0 top-4 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul class="bg-white p-1 rounded-md">
                  <li
                    class="w-32 sub-item flex justify-between items-center"
                    @click="handleOpenDeleteCmt(fewComment.ID)"
                  >
                    <i class="fal fa-trash"></i>Xóa bình luận
                  </li>
                  <li
                    class="w-32 sub-item flex justify-between items-center"
                    @click="handleOpenEditComment(fewComment)"
                  >
                    <i class="fal fa-comment-alt-edit"></i>Sửa bình luận
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mt-1">
              <div class="text-[15px]">{{ fewComment.content }}</div>
              <div v-if="fewComment?.files.length > 0" class="flex flex-wrap">
                <div
                  v-for="(file, index) in fewComment.files"
                  :key="index"
                  class="w-[150px] h-auto cursor-pointer"
                  @click="handleOpenShowImage(fewComment)"
                >
                  <img :src="urlIamge + '/' + file" alt="" class="rounded-lg" />
                </div>
              </div>
            </div>
            <div title="time" class="text-[10px] text-right">
              {{ formatTime(fewComment.created_at) }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="post-action-comment"
        v-for="cmt in postDetail.comments"
        :key="cmt.ID"
      >
        <div>
          <img
            :src="urlIamge + '/' + cmt?.auth_avatar"
            alt=""
            class="w-[40px] h-[40px] rounded-full cursor-pointer hover:border hover:border-red-400"
            @click="showDetailUser(cmt?.created_by_id)"
          />
        </div>
        <div class="post-action-comment_content">
          <div class="flex justify-between items-center">
            <a href="" @click.prevent="showDetailUser(cmt?.created_by_id)">{{
              cmt.auth_comment
            }}</a>
            <div
              class="relative group cursor-pointer"
              v-if="checkUserCreated(cmt.created_by_id)"
            >
              <i class="fal fa-ellipsis-h-alt"></i>
              <div
                class="absolute z-10 right-0 top-4 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
              >
                <ul class="bg-white p-1 rounded-md">
                  <li
                    class="w-32 sub-item flex justify-between items-center"
                    @click="handleOpenDeleteCmt(cmt.ID)"
                  >
                    <i class="fal fa-trash"></i>Xóa bình luận
                  </li>
                  <li
                    class="w-32 sub-item flex justify-between items-center"
                    @click="handleOpenEditComment(cmt)"
                  >
                    <i class="fal fa-comment-alt-edit"></i>Sửa bình luận
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mt-1">
              <div class="text-[15px]">{{ cmt.content }}</div>
              <div v-if="cmt?.files.length > 0" class="flex flex-wrap">
                <div
                  v-for="(file, index) in cmt.files"
                  :key="index"
                  class="w-[150px] h-auto cursor-pointer"
                  @click="handleOpenShowImage(cmt)"
                >
                  <img :src="urlIamge + '/' + file" alt="" class="rounded-lg" />
                </div>
              </div>
            </div>
            <div title="time" class="text-[10px] text-right">
              {{ formatTime(cmt.created_at) }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="text-left cursor-pointer hover:underline mt-4"
        v-if="postDetail.comments?.length > 1"
        @click="ShowMoreComment()"
      >
        <span v-if="litteComment"
          >Xem thêm {{ postDetail.comments?.length - 1 }} bình luận</span
        >
        <span v-else>Ẩn bớt</span>
      </div>
    </div>
    <div class="post-write-comment">
      <div class="post-write-comment-field">
        <input
          type="text"
          :name="postDetail.ID"
          :id="postDetail.ID"
          placeholder="Viết bình luận..."
          ref="commentField"
          v-model="newComment.this_content"
          @keyup.enter="CreateCommentPost(postDetail.ID)"
        />
      </div>
      <div class="post-write-comment-icon">
        <span class="relative"
          ><i class="fal fa-paperclip"></i>
          <input
            type="file"
            name=""
            id=""
            class="absolute opacity-0 top-0 left-0 right-0 bottom-0 cursor-pointer"
            @change="uploadFileComment($event)"
        /></span>
        <span @click="CreateCommentPost(postDetail.ID)" disabled
          ><i class="fal fa-chevron-circle-right"></i
        ></span>
      </div>
    </div>
    <div class="post-field-image" v-if="newComment.comment_file?.length != 0">
      <div v-for="(item, index) in newComment.comment_file" :key="index">
        <div class="relative">
          <img :src="item" alt="" />
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
  <teleport to="#app">
    <modal-view :isOpen="isShowImage" :handleCloseDetail="handleCloseShowImage">
      <div class="w-full h-full">
        <h1 class="header-modal">hình ảnh</h1>
        <div class="text-left">
          <swiper
            v-if="arrayImage"
            :slidesPerView="1"
            :spaceBetween="10"
            :slidesPerGroup="1"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="(img, index) in arrayImage.files" :key="index">
              <div class="w-auto h-[700px] bg-[#ebebeb] flex items-center">
                <img
                  :src="urlIamge + '/' + img"
                  alt=""
                  class="rounded-lg max-h-[650px]"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view :isOpen="isDeleteCmt" :handleCloseDetail="handleCloseDeleteCmt">
      <div class="w-[500px]">
        <h1 class="header-modal">yêu cầu</h1>
        <div class="text-center p-4 text-2xl">
          Bạn có muốn xóa bình luận này không???
        </div>
        <div class="bg-button-modal text-center">
          <button class="button-modal" @click="deleteComment()">Đồng ý</button>
          <button class="button-close-modal" @click="handleCloseDeleteCmt">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view
      :isOpen="isDeletePost"
      :handleCloseDetail="handleCloseDeletePost"
    >
      <div class="w-[500px]">
        <h1 class="header-modal">yêu cầu</h1>
        <div class="text-center p-4 text-2xl">
          Bạn có muốn xóa bài viết này không???
        </div>
        <div class="bg-button-modal text-center">
          <button class="button-modal" @click="deletePost()">Đồng ý</button>
          <button class="button-close-modal" @click="handleCloseDeletePost">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view
      :isOpen="isEditComment"
      :handleCloseDetail="handleCloseEditComment"
    >
      <div class="w-[500px]">
        <h1 class="header-modal">sửa bình luận</h1>
        <div class="text-left w-full p-2">
          <div>
            <label for="" class="form-group-label">Bình luận:</label>
            <textarea
              name=""
              id=""
              cols="5"
              rows="5"
              v-model="cmtDetail.content"
              class="form-control-input"
            ></textarea>
          </div>
          <div v-if="cmtDetail.files?.length != 0">
            <label for="" class="form-group-label">Hình ảnh:</label>
            <div class="post-field-image">
              <div v-for="(item, index) in cmtDetail.files" :key="index">
                <div class="relative">
                  <img :src="urlIamge + '/' + item" alt="" />
                  <span
                    class="absolute -top-3 right-3 z-10"
                    @click="removeEditImage(index)"
                  >
                    <i class="fal fa-times-circle icon-close"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-button-modal text-center">
          <button class="button-modal" @click="EditComment()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseEditComment">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view
      :isOpen="isShowReaction"
      :handleCloseDetail="handleCloseReaction"
    >
      <div class="w-[500px]">
        <h1 class="header-modal">tương tác</h1>
        <div class="max-h-[500px] overflow-y-auto format-scroll p-2">
          <div v-for="user in postDetail.data_reaction" :key="user.ID">
            <div
              v-if="user.reaction != 'none'"
              class="item-reaction"
              @click="showDetailUser(user.user_id)"
            >
              <div class="flex items-center">
                <img
                  :src="urlIamge + '/' + user.auth_avatar"
                  alt=""
                  class="w-[40px] h-[40px] rounded-full"
                />
                <div class="px-3">{{ user.auth_reac }}</div>
              </div>
              <div class="">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670153.png"
                  alt=""
                  class="w-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenEditPost"
      :handleCloseDetail="handleCloseEditPost"
    >
      <div class="w-[700px]">
        <div class="header-modal">Sửa bài viết</div>
        <div class="text-left p-4">
          <div>
            <div class="flex items-center">
              <div class="min-w-[50px]">
                <img
                  :src="urlIamge + '/' + postDetail?.user_post?.avatars"
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
                  v-if="hideShare"
                />
                <ckeditor
                  :editor="editor"
                  v-model="postContent.content"
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
                      v-for="(item, index) in postContent.files"
                      :key="index"
                    >
                      <div class="relative">
                        <img
                          alt=""
                          :src="urlIamge + '/' + item"
                          class="w-[200px] h-[200px] rounded-lg object-cover m-1"
                        />
                        <span
                          class="absolute -top-3 right-3 z-10"
                          @click="removeImageEdit(index)"
                        >
                          <i class="fal fa-times-circle icon-close"></i>
                        </span>
                      </div>
                    </div>
                    <div
                      v-for="(item, index) in newImage.arrNewImg"
                      :key="index"
                    >
                      <div class="relative">
                        <img
                          alt=""
                          :src="item"
                          class="w-[200px] h-[200px] rounded-lg object-cover m-1"
                        />
                        <span
                          class="absolute -top-3 right-3 z-10"
                          @click="removeNewImg(index)"
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

          <button class="button-modal w-full" @click="UpdatePost()">
            Đăng
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import { reactive, ref } from "@vue/reactivity";
import { URL_IMG } from "@/constants/ApiUrl";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormatDate, FormatRole } from "@/constants/FormatAll";
import router from "@/router";
import { useRoute } from "vue-router";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Navigation],
      subTitle: "",
      subLink: "",
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
        this.newImage.arrNewImg.push(await theReader.result);
      };
      theReader.readAsDataURL(file);
    },
    uploadFileComment(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newComment.comment_file.push(await theReader.result);
      };
      console.log(this.newComment.comment_file);
      theReader.readAsDataURL(file);
    },
    formatImage(index) {
      if (index.files?.length == 1) {
        return "oneImage";
      } else if (index.files?.length == 2) {
        return "twoImage";
      }
    },
    formatPostCard(group) {
      if (group.wall_status == "group") {
        this.subTitle = group.wall_parent.name;
        this.subLink = `/social/group/groupID=${group?.wall_title}`;
        if (group.title == "NORMAL") {
          return "đã đăng bài viết trong";
        } else if (group.title == "CHANGE-AVATAR") {
          return "đã cập nhật ảnh đại diện của";
        } else if (group.title == "CHANGE-BANNER") {
          return "đã cập nhật ảnh bìa của";
        }
      } else if (group.wall_status == "company") {
        this.subTitle = "Tường công ty";
        this.subLink = "/social/company/1";
        if (group.title == "NORMAL") {
          return "đã đăng bài viết trên";
        } else if (group.title == "CHANGE-AVATAR") {
          return "đã cập nhật ảnh đại diện của";
        } else if (group.title == "CHANGE-BANNER") {
          return "đã cập nhật ảnh bìa của";
        } else if (group.title == "NOTICES") {
          return "đã đăng thông báo trên";
        }
      } else if (group.wall_status == "news") {
        if (group.title == "NORMAL") {
          return "đã đăng bài viết";
        } else if (group.title == "CHANGE-AVATAR") {
          return "đã cập nhật ảnh đại diện của mình";
        } else if (group.title == "CHANGE-BANNER") {
          return "đã cập nhật ảnh bìa của mình";
        }
      }
    },
    formatTime(index) {
      let time = new Date(index);
      const current = new Date();
      let key = Math.ceil((current.getTime() - time.getTime()) / 86400);
      if (key < 60) {
        return key + " phút trước";
      } else if (key > 60 && key < 1440) {
        return Math.floor(key / 60) + " giờ trước";
      } else if (key > 1440) {
        return FormatDate(index);
      }
    },
  },
  props: {
    postDetail: {
      type: Object,
    },
    countPost: {
      type: Number,
    },
  },
  emits: ["create-post", "is-notice", "hide-notice"],
  computed: {
    fewComment() {
      return this.postDetail?.comments[this.postDetail.comments?.length - 1];
    },
    fewPersonLiked() {
      return this.postDetail?.data_reaction
        .slice(-4)
        .filter((item) => item.reaction != "none");
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const toast = useToast();
    const route = useRoute();
    const isLoading = ref(false);
    const heightContent = ref();
    const isHeight = ref(false);
    const hideShare = ref(false);
    const showShare = ref(true);
    const newImage = reactive({
      arrNewImg: [],
    });
    const newComment = reactive({
      this_content: "",
      comment_file: [],
    });
    const emptyImage = ref();
    const commentField = ref();
    const isOpenEditPost = ref(false);
    const isDeleteCmt = ref(false);
    const isDeletePost = ref(false);
    const isEditComment = ref(false);
    const litteComment = ref(true);
    const isShowReaction = ref(false);
    const cmtID = ref();
    const postID = ref();
    const cmtDetail = ref();
    const isLiked = ref(false);
    const urlIamge = ref(URL_IMG);
    const isShowImage = ref(false);
    const arrayImage = ref();
    const profile = useUserProfile();
    const { userProfile, AccountRole } = storeToRefs(profile);
    const postContent = ref(props.postDetail);
    const liked = ref();
    liked.value = props.postDetail?.data_reaction.find(
      (item) => item?.user_id == userProfile.value.ID
    );
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    onMounted(() => {
      // console.log(heightContent.value?.clientHeight);
    });
    if (liked.value?.reaction == "like") {
      isLiked.value = true;
    } else if (liked.value?.reaction == "none") {
      isLiked.value = false;
    }
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
    const WriteComment = () => {
      commentField.value.focus();
    };
    const removeImage = (index) => {
      newComment.comment_file.splice(index, 1);
    };
    const closeImage = () => {
      isShowImage.value = false;
      postContent.value.files = [];
    };
    const removeImageEdit = (index) => {
      postContent.value.files.splice(index, 1);
    };
    const removeNewImg = (index) => {
      newImage.arrNewImg.splice(index, 1);
    };
    const LikePost = (id) => {
      const data = {
        ID: id,
        reaction: {
          reaction: "like",
        },
      };
      store.dispatch("SocialNew/ReactionPostAction", {
        data,
        route,
        store,
        count: props.countPost,
        EndTimeLoading,
      });
      isLiked.value = !isLiked.value;
    };
    const UnlikePost = (id) => {
      const data = {
        ID: id,
        reaction: {
          reaction: "none",
        },
      };
      store.dispatch("SocialNew/ReactionPostAction", {
        data,
        route,
        store,
        count: props.countPost,
        EndTimeLoading,
      });
      isLiked.value = !isLiked.value;
    };
    const handleOpenShowImage = (arr) => {
      isShowImage.value = true;
      arrayImage.value = arr;
    };
    const handleCloseShowImage = () => {
      isShowImage.value = false;
    };
    const UpdatePost = () => {
      const data = {
        ID: postContent.value.ID,
        content: {
          content_post: postContent.value.content,
          post_file_new: newImage.arrNewImg,
          post_file_old: postContent.value.files,
          wall_status: postContent.value.wall_status,
        },
      };
      if (data.content.content_post?.length == 0) {
        toast.error("Không được để trống nội dung");
      } else {
        store.dispatch("SocialNew/EditPostSocialAction", {
          data,
          toast,
          route,
          store,
          count: props.countPost,
          EndTimeLoading,
        });
        isOpenEditPost.value = false;
        isShowImage.value = false;
      }
    };
    const CreateCommentPost = (id) => {
      const data = {
        ID: id, //id bài viết
        content: {
          this_content: newComment.this_content,
          comment_file: newComment.comment_file,
        },
      };
      if (data.content.this_content?.length == 0) {
        toast.error("Không được để trống bình luận");
      } else {
        store.dispatch("SocialNew/CreateCommentSocialAction", {
          data,
          toast,
          route,
          store,
          count: props.countPost,
          EndTimeLoading,
        });
        newComment.this_content = "";
        newComment.comment_file = [];
      }
    };
    const handleOpenDeleteCmt = (id) => {
      isDeleteCmt.value = true;
      cmtID.value = id;
    };
    const handleCloseDeleteCmt = () => {
      isDeleteCmt.value = false;
    };
    const deleteComment = () => {
      const dataID = {
        ID: cmtID.value,
      };
      store.dispatch("SocialNew/DeleteCommentAction", {
        dataID,
        toast,
        route,
        store,
        count: props.countPost,
        EndTimeLoading,
      });
      isDeleteCmt.value = false;
    };
    const showDetailUser = (id) => {
      router.push(`/social/user/${id}`);
    };
    const handleOpenEditPost = (id) => {
      isOpenEditPost.value = true;
      isShowImage.value = true;
      postID.value = id;
    };
    const handleCloseEditPost = (id) => {
      isOpenEditPost.value = false;
      isShowImage.value = false;
      postID.value = id;
    };
    const handleOpenDeletePost = (id) => {
      isDeletePost.value = true;
      postID.value = id;
    };
    const handleCloseDeletePost = () => {
      isDeletePost.value = false;
    };
    const handleOpenEditComment = (cmt) => {
      isEditComment.value = true;
      cmtDetail.value = cmt;
    };
    const handleCloseEditComment = () => {
      isEditComment.value = false;
      store.dispatch("SocialNew/LoadPostAction", {
        route,
        count: props.countPost,
        EndTimeLoading,
      });
    };
    const EditComment = () => {
      const data = {
        ID: cmtDetail.value.ID,
        content: {
          this_content: cmtDetail.value.content,
          comment_file: cmtDetail.value.files,
        },
      };
      if (data.content.this_content?.length == 0) {
        toast.error("Không được để trống bình luận");
      } else {
        store.dispatch("SocialNew/EditCommentSocialAction", {
          data,
          toast,
          route,
          store,
          count: props.countPost,
          EndTimeLoading,
        });
        isEditComment.value = false;
      }
    };
    const deletePost = () => {
      const dataID = {
        ID: postID.value,
      };
      store.dispatch("SocialNew/DeleteNewPostAction", {
        dataID,
        route,
        count: props.countPost,
        EndTimeLoading,
      });
      isDeletePost.value = false;
    };
    const checkUserCreated = (id) => {
      let check = true;
      if (userProfile.value.ID == id || userProfile.value?.is_admin == "yes") {
        check = true;
      } else {
        check = false;
      }
      return check;
    };
    const ShowMoreComment = () => {
      litteComment.value = !litteComment.value;
    };
    const removeEditImage = (index) => {
      cmtDetail.value.files.splice(index, 1);
    };
    const handleOpenReaction = () => {
      isShowReaction.value = true;
    };
    const handleCloseReaction = () => {
      isShowReaction.value = false;
    };
    const handleShowDetailPost = (arr) => {
      if (route.name == "Chi tiết bài viết") {
        isShowImage.value = true;
        arrayImage.value = arr;
      } else {
        router.push(`/social/detailID=${arr.ID}`);
      }
    };
    const checkRole = (index) => {
      for (let i = 0; i < index?.length; i++) {
        if (FormatRole(index[i], userProfile.value) == true) {
          return true;
        }
      }
    };
    return {
      newComment,
      commentField,
      isShowImage,
      isDeletePost,
      isEditComment,
      litteComment,
      heightContent,
      isLoading,
      isOpenEditPost,
      emptyImage,
      newImage,
      handleCloseEditPost,
      hideShare,
      showShare,
      EndTimeLoading,
      WriteComment,
      removeImage,
      LikePost,
      handleOpenShowImage,
      handleCloseShowImage,
      CreateCommentPost,
      handleOpenDeleteCmt,
      removeImageEdit,
      removeNewImg,
      closeImage,
      isLiked,
      liked,
      urlIamge,
      arrayImage,
      deleteComment,
      isDeleteCmt,
      cmtID,
      postID,
      cmtDetail,
      isShowReaction,
      postContent,
      handleCloseDeleteCmt,
      handleOpenDeletePost,
      handleOpenEditPost,
      handleCloseDeletePost,
      handleOpenEditComment,
      handleCloseEditComment,
      showDetailUser,
      UnlikePost,
      deletePost,
      checkUserCreated,
      userProfile,
      ShowMoreComment,
      EditComment,
      removeEditImage,
      handleOpenReaction,
      handleCloseReaction,
      handleShowDetailPost,
      checkRole,
      showNotic,
      handleNotification,
      UpdatePost,
      AccountRole,
      isHeight,
    };
  },
};
</script>

<style>
.ol {
  list-style: decimal inside;
}

.ul {
  list-style: disc inside;
}
</style>
<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #ebebeb;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  object-fit: fill;
}

.slide-sale {
  position: relative;
}

@keyframes brandList {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
