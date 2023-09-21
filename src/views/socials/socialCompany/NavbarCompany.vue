<template>
  <div class="wall-cover">
    <div class="wall-banner">
      <img
        :src="urlImage + '/' + groupDetail?.banners"
        alt=""
        class="image-wall"
      />
      <div
        class="icon-change-wall relative group"
        v-if="checkRole('SOCIAL_SOCIAL_UPDATE')"
      >
        <i class="fal fa-cog"></i>
        <div
          class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
        >
          <ul class="bg-white p-3 rounded-md">
            <li
              class="w-60 sub-item flex items-center"
              @click="handleOpenChangeBackground()"
            >
              <i class="fal fa-image px-2"></i>Chỉnh sửa ảnh bìa
            </li>
            <li
              class="w-60 sub-item flex items-center"
              @click="handleUpdateBackgroundDefault()"
            >
              <i class="fal fa-image px-2"></i>Khôi phục ảnh mặc định
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wall-caption">
      <div class="relative flex items-center z-10">
        <div class="avatar-user-header">
          <img
            class="border rounded-full w-[160px] h-[160px]"
            :src="urlImage + '/' + groupDetail?.avatars"
          />
          <div
            class="icon-change-wall relative group"
            v-if="checkRole('SOCIAL_SOCIAL_UPDATE')"
          >
            <i class="fal fa-cog"></i>
            <div
              class="absolute z-10 left-0 -top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-3 rounded-md">
                <li
                  class="w-52 sub-item flex items-center"
                  @click="handleOpenChangeAvatar()"
                >
                  <i class="fal fa-image px-2"></i>Chỉnh sửa ảnh đại diện
                </li>
                <li
                  class="w-52 sub-item flex items-center"
                  @click="handleUpdateAvatarDefault()"
                >
                  <i class="fal fa-image px-2"></i>Khôi phục ảnh mặc định
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="text-white font-medium mt-12 z-1">
          <p class="text-[28px] text-left pl-5">Tường công ty</p>
        </div>
      </div>
    </div>
  </div>
  <div class="wall-menu">
    <a
      href=""
      @click.prevent="this.$router.push('/social/company/1')"
      :class="{ wallMenuActive: checkRoute('/social/company/1') }"
      >Bảng tin</a
    ><a
      href=""
      @click.prevent="this.$router.push('/social/company/notices/1')"
      :class="{ wallMenuActive: checkRoute('/social/company/notices/1') }"
      >Thông báo</a
    ><a
      href=""
      @click.prevent="this.$router.push('/social/company/members/1')"
      :class="{ wallMenuActive: checkRoute('/social/company/members/1') }"
      >Thành viên ({{ groupDetail?.member_count }})</a
    >
    <!-- <a href="/social/company/department">Sơ đồ tổ chức</a> -->
  </div>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenChangeBackground"
      :handleCloseDetail="handleCloseChangeBackground"
    >
      <div class="w-[700px]">
        <h1 class="header-modal">Cập nhật ảnh bìa</h1>
        <div class="p-4" v-if="defaultBackground == false">
          <img
            :src="imageBackground || urlImage + '/' + groupDetail?.banners"
            alt=""
            class="image-wall"
          />
          <div class="relative file-upload" title="Tải ảnh lên">
            <i class="fal fa-cloud-upload icon-upload mt-3"></i>
            <input
              type="file"
              name=""
              id=""
              class="opacity-0 absolute top-0 bottom-0 right-0 left-0 cursor-pointer"
              @change="changeBackground($event)"
            />
          </div>
        </div>
        <div class="p-4" v-else>
          <img :src="banner_default" alt="" class="image-wall" />
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UploadBackground">
            Cập nhật
          </button>
          <button
            class="button-close-modal"
            @click="handleCloseChangeBackground()"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenChangeAvatar"
      :handleCloseDetail="handleCloseChangeAvatar"
    >
      <div class="w-[500px]">
        <h1 class="header-modal">Cập nhật ảnh đại diện</h1>
        <div v-if="defaultAvatar == false">
          <div class="p-4 flex justify-center drop-shadow-2xl">
            <img
              class="border-2 rounded-full border-slate-300 w-[300px] h-[300px] object-cover"
              :src="imageAvatar || urlImage + '/' + groupDetail?.avatars"
            />
          </div>
          <div class="relative file-upload" title="Tải ảnh lên">
            <i class="fal fa-cloud-upload icon-upload my-3"></i>
            <input
              type="file"
              name=""
              id=""
              class="opacity-0 absolute top-0 bottom-0 right-0 left-0 cursor-pointer"
              @change="changeImageAvatar($event)"
            />
          </div>
        </div>
        <div v-else>
          <div class="p-4 flex justify-center drop-shadow-2xl">
            <img
              class="border-2 rounded-full border-slate-300 w-[300px] h-[300px] object-cover"
              :src="avatar_default"
            />
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UploadAvatar">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseChangeAvatar()">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <loading-overlay
    :isLoading="isLoadingEdit"
    :handleEndLoading="EndTimeLoadingEdit"
  ></loading-overlay>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import {
  AVATAR_GROUP_DEFAULT,
  BANNER_GROUP_DEFAULT,
  URL_IMG,
} from "@/constants/ApiUrl";
import { FormatRole } from "@/constants/FormatAll";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
export default {
  methods: {
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
        this.imageAvatar = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
  },
  setup() {
    const route = useRoute();
    const toast = useToast();
    const isLoadingEdit = ref(false);
    const urlImage = ref(URL_IMG);
    const defaultBackground = ref(false);
    const defaultAvatar = ref(false);
    const isOpenChangeBackground = ref(false);
    const isOpenChangeAvatar = ref(false);
    const avatar_default = ref(AVATAR_GROUP_DEFAULT);
    const banner_default = ref(BANNER_GROUP_DEFAULT);
    const profile = useUserProfile();
    const sc_group = useSocialGroup();
    const { userProfile } = storeToRefs(profile);
    const { avatar, banner, groupDetail } = storeToRefs(sc_group);
    const imageAvatar = ref(avatar);
    const imageBackground = ref(banner);
    const EndTimeLoadingEdit = () => {
      isLoadingEdit.value = false;
    };
    const checkRole = (index) => {
      return FormatRole(index, userProfile.value);
    };
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    const handleOpenChangeBackground = () => {
      isOpenChangeBackground.value = true;
    };
    const handleUpdateBackgroundDefault = () => {
      isOpenChangeBackground.value = true;
      defaultBackground.value = true;
    };
    const handleCloseChangeBackground = () => {
      isOpenChangeBackground.value = false;
      imageBackground.value = banner.value;
    };
    const handleOpenChangeAvatar = () => {
      isOpenChangeAvatar.value = true;
    };
    const handleUpdateAvatarDefault = () => {
      isOpenChangeAvatar.value = true;
      defaultAvatar.value = true;
    };
    const handleCloseChangeAvatar = () => {
      isOpenChangeAvatar.value = false;
      imageAvatar.value = avatar.value;
    };
    const UploadAvatar = () => {
      isLoadingEdit.value = true;
      let data = {};
      if (defaultAvatar.value == true) {
        const img = avatar_default.value;
        data = {
          id: route.params.idGroup,
          avatars: {
            avatars: [img],
            wall_status: "company",
          },
        };
      } else {
        data = {
          id: route.params.idGroup,
          avatars: {
            avatars: [imageAvatar.value],
            wall_status: "company",
          },
        };
      }
      sc_group.ChangeAvatarGroupAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoadingEdit,
      });
      isOpenChangeAvatar.value = false;
      defaultAvatar.value = false;
    };
    const UploadBackground = () => {
      isLoadingEdit.value = true;
      let data = {};
      if (defaultBackground.value == true) {
        const img = banner_default.value;
        data = {
          id: route.params.idGroup,
          banners: {
            banners: [img],
            wall_status: "company",
          },
        };
      } else {
        data = {
          id: route.params.idGroup,
          banners: {
            banners: [imageBackground.value],
            wall_status: "company",
          },
        };
      }
      sc_group.ChangeBannerGroupAction({
        data,
        toast,
        EndTimeLoading: EndTimeLoadingEdit,
      });
      isOpenChangeBackground.value = false;
      defaultBackground.value = false;
    };
    return {
      isOpenChangeBackground,
      defaultBackground,
      defaultAvatar,
      isOpenChangeAvatar,
      imageBackground,
      imageAvatar,
      groupDetail,
      urlImage,
      avatar,
      banner,
      userProfile,
      isLoadingEdit,
      EndTimeLoadingEdit,
      checkRoute,
      checkRole,
      handleOpenChangeBackground,
      handleCloseChangeBackground,
      handleOpenChangeAvatar,
      handleCloseChangeAvatar,
      UploadAvatar,
      UploadBackground,
      handleUpdateBackgroundDefault,
      handleUpdateAvatarDefault,
      avatar_default,
      banner_default,
    };
  },
};
</script>

<style></style>
