<template>
  <div class="post-write-comment w-full border-t-0 flex flex-col !items-start">
    <div
      class="flex flex-col w-3/5 border-t-0"
      v-if="detailComment?.length > 0"
    >
      <div
        v-for="(item, index) in detailComment"
        :key="index"
        class="post-list-comment w-3/5"
      >
        <div v-if="litteComment == true" class="flex items-center">
          <div>
            <img
              :src="urlIamge + '/' + item.json_auth_avatar"
              alt=""
              class="w-[40px] h-[40px] rounded-full cursor-pointer hover:border hover:border-red-400"
              @click="showDetailUser(item.created_by_id)"
            />
          </div>
          <div class="post-action-comment_content">
            <div class="flex justify-between items-center">
              <a href="" @click.prevent="showDetailUser(item.created_by_id)">{{
                item.auth_comment
              }}</a>
              <div
                class="relative group cursor-pointer"
                v-if="checkUserCreated(item.created_by_id)"
              >
                <i class="fal fa-ellipsis-h-alt"></i>
                <div
                  class="absolute z-10 right-0 top-4 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
                >
                  <ul class="bg-white p-1 rounded-md">
                    <li
                      class="w-32 sub-item flex justify-between items-center"
                      @click="handleOpenDeleteCmt(item.ID)"
                    >
                      <i class="fal fa-trash"></i>Xóa bình luận
                    </li>
                    <li
                      class="w-32 sub-item flex justify-between items-center"
                      @click="handleOpenEditComment(item)"
                    >
                      <i class="fal fa-comment-alt-edit"></i>Sửa bình luận
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="mt-1">
                <div class="text-[15px]">{{ item.content }}</div>
                <div v-if="item?.json_files.length > 0" class="flex flex-wrap">
                  <div
                    v-for="(file, index) in item?.json_files"
                    :key="index"
                    class="w-[150px] h-auto cursor-pointer"
                    @click="handleOpenShowImage(item)"
                  >
                    <img
                      :src="urlIamge + '/' + file"
                      alt=""
                      class="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div title="time" class="text-[10px] text-right">
                {{ formatTime(item.created_at) }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="post-action-comment"
          v-for="cmt in detailComment"
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
                    v-for="(file, index) in cmt.json_files"
                    :key="index"
                    class="w-[150px] h-auto cursor-pointer"
                    @click="handleOpenShowImage(cmt)"
                  >
                    <img
                      :src="urlIamge + '/' + file"
                      alt=""
                      class="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div title="time" class="text-[10px] text-right">
                {{ formatTime(cmt.created_at) }}
              </div>
            </div>
          </div>
        </div>
        <!-- <div
        class="text-left cursor-pointer hover:underline mt-4"
        v-if="detailComment.length > 1"
        @click="ShowMoreComment()"
      >
        <span v-if="litteComment"
          >Xem thêm {{ detailComment.length - 1 }} bình luận</span
        >
        <span v-else>Ẩn bớt</span>
      </div> -->
      </div>
    </div>
    <div class="flex w-3/5">
      <div class="post-write-comment-field">
        <input
          type="text"
          name=""
          id=""
          placeholder="&nbsp; Viết thảo luận..."
          class="border rounded-2xl h-[45px] w-full"
          ref="commentField"
          v-model="newComment.this_content"
          @keyup.enter="CreateCommentApproval()"
        />
      </div>
      <div class="post-write-comment-icon pt-[10px]">
        <span class="relative"
          ><i class="fal fa-paperclip"></i>
          <input
            type="file"
            name=""
            id=""
            class="absolute opacity-0 top-0 left-0 right-0 bottom-0 cursor-pointer"
            @change="uploadFileComment($event)"
        /></span>
        <span @click="CreateCommentApproval()" disabled
          ><i class="fal fa-chevron-circle-right"></i
        ></span>
      </div>
    </div>
  </div>
  <div class="post-field-image" v-if="newComment.comment_file?.length != 0">
    <div v-for="(item, index) in newComment.comment_file" :key="index">
      <div class="relative">
        <img :src="item" alt="" />
        <span class="absolute -top-3 right-3 z-10" @click="removeImage(index)">
          <i
            class="fal fa-times-circle icon-close"
            style="margin-top: 20px"
          ></i>
        </span>
      </div>
    </div>
  </div>
  <teleport to="#app">
    <modal-view :isOpen="isDeleteCmt" :handleCloseDetail="handleCloseDeleteCmt">
      <div class="w-[500px]">
        <h1 class="header-modal">Xóa bình luận</h1>
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
          <div v-if="cmtDetail?.length != 0">
            <label for="" class="form-group-label">Hình ảnh:</label>
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
            <div class="post-field-image">
              <div v-for="(item, index) in cmtDetail.json_files" :key="index">
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
              <div v-for="(item, index) in newImage.arrNewImg" :key="index">
                <div class="relative">
                  <img alt="" :src="item" class="" />
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
            <swiper-slide
              v-for="(img, index) in arrayImage.json_files"
              :key="index"
            >
              <div
                class="w-auto h-[700px] bg-[#ebebeb] flex items-center justify-center"
              >
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
import { Pagination, Navigation } from "swiper";
import { ref, reactive } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { useSettingApproval } from "@/store/modules/settingApproval/allApproval";
import { useApprovalTotal } from "@/store/modules/approval/ApprovalTotal";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { FormatDate } from "@/constants/FormatAll";
import { storeToRefs } from "pinia";
import { URL_IMG } from "@/constants/ApiUrl";
import router from "@/router";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    approval_id: Number,
  },
  data() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  methods: {
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
  setup(props) {
    const toast = useToast();
    const isLoading = ref(false);
    const isShowImage = ref(false);
    const arrayImage = ref();
    const total = useApprovalTotal();
    const setting = useSettingApproval();
    const litteComment = ref(true);
    const { detailComment } = storeToRefs(total);
    const cmtDetail = ref();
    const urlIamge = ref(URL_IMG);
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const isDeleteCmt = ref(false);
    const isEditComment = ref(false);
    const cmtID = ref();
    const newComment = reactive({
      this_content: "",
      comment_file: [],
    });
    const newImage = reactive({
      arrNewImg: [],
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const listImages = ref([]);
    const previewFiles = (event) => {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        newImage.arrNewImg.push(await theReader.result);
      };
      theReader.readAsDataURL(file);
    };
    const uploadFileComment = (event) => {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        newComment.comment_file.push(await theReader.result);
      };
      theReader.readAsDataURL(file);
    };
    const removeImage = (index) => {
      newComment.comment_file.splice(index, 1);
    };
    const CreateCommentApproval = () => {
      const data = {
        ID: props.approval_id, //id đơn
        content: {
          this_content: newComment.this_content,
          comment_file: newComment.comment_file,
        },
      };
      if (data.content.this_content?.length == 0) {
        toast.error("Không được để trống bình luận");
      } else {
        setting.CreateCommentApprovalAction({
          data,
          toast,
          EndTimeLoading,
        });
        newComment.this_content = "";
        newComment.comment_file = [];
      }
    };
    const closeImage = () => {
      isShowImage.value = false;
      cmtDetail.value.json_files = [];
    };
    const handleOpenShowImage = (arr) => {
      isShowImage.value = true;
      arrayImage.value = arr;
      console.log(arr);
    };
    const handleCloseShowImage = () => {
      isShowImage.value = false;
    };
    const handleOpenEditComment = (cmt) => {
      isEditComment.value = true;
      cmtDetail.value = cmt;
      console.log(cmt);
    };
    const handleCloseEditComment = () => {
      isEditComment.value = false;
    };
    const EditComment = () => {
      const data = {
        ID: cmtDetail.value.ID,
        content: {
          this_content: cmtDetail.value.content,
          comment_file_new: newImage.arrNewImg,
          comment_file_old: cmtDetail.value.json_files,
        },
      };
      if (data.content.this_content?.length == 0) {
        toast.error("Không được để trống bình luận");
      } else {
        setting.EditCommentApprovalAction({
          data,
          toast,
          EndTimeLoading,
        });
        isEditComment.value = false;
      }
    };
    const removeEditImage = (index) => {
      cmtDetail.value.json_files.splice(index, 1);
    };
    const removeNewImg = (index) => {
      newImage.arrNewImg.splice(index, 1);
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
      setting.DeleteCommentApprovalAction({
        dataID,
        toast,
        EndTimeLoading,
      });
      isDeleteCmt.value = false;
    };
    const showDetailUser = (id) => {
      router.push(`/social/user/${id}`);
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
    return {
      listImages,
      newComment,
      isLoading,
      setting,
      total,
      detailComment,
      urlIamge,
      litteComment,
      userProfile,
      profile,
      isDeleteCmt,
      cmtID,
      isEditComment,
      cmtDetail,
      newImage,
      isShowImage,
      arrayImage,
      previewFiles,
      closeImage,
      EditComment,
      handleOpenEditComment,
      handleCloseEditComment,
      handleOpenShowImage,
      handleCloseShowImage,
      showDetailUser,
      checkUserCreated,
      handleOpenDeleteCmt,
      handleCloseDeleteCmt,
      deleteComment,
      uploadFileComment,
      CreateCommentApproval,
      removeImage,
      removeEditImage,
      removeNewImg,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
