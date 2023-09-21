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
        <div class="grid grid-cols-12 gap-x-2 grow h-full">
          <div class="col-span-3">
            <sidebar-social />
          </div>

          <div class="col-span-9 p-4" v-if="isLoading == false">
            <div
              v-if="personnelDetail?.status == 'failed'"
              class="flex justify-center flex-col-reverse"
            >
              <img
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=2000"
                alt=""
                class="w-1/2 rounded-lg m-auto"
              />
              <div
                class="uppercase font-medium text-2xl text-red-500 mt-10 py-4"
              >
                Tài khoản không hoạt động
              </div>
            </div>
            <div v-else>
              <Transition name="slide-up">
                <div class="wall-cover">
                  <div class="wall-banner">
                    <img
                      :src="checkNullBanner(personnelDetail.data_user?.banners)"
                      alt=""
                      class="image-wall"
                    />
                    <div
                      class="icon-change-wall relative group"
                      v-if="checkRoute()"
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
                            <i class="fal fa-image px-2"></i>Khôi phục ảnh mặc
                            định
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="wall-caption">
                    <div class="relative flex items-center">
                      <div class="avatar-user-header">
                        <img
                          class="border rounded-full w-[160px] h-[160px]"
                          :src="
                            checkNullAvatar(personnelDetail.data_user?.avatars)
                          "
                        />
                        <div
                          class="icon-change-wall relative group"
                          v-if="checkRoute()"
                        >
                          <i class="fal fa-cog"></i>
                          <div
                            class="absolute z-10 left-0 -top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
                          >
                            <ul class="bg-white p-3 rounded-md">
                              <li
                                class="w-52 sub-item flex justify-evenly items-center"
                                @click="handleOpenChangeAvatar()"
                              >
                                <i class="fal fa-image"></i>Chỉnh sửa ảnh đại
                                diện
                              </li>
                              <li
                                class="w-52 sub-item flex justify-evenly items-center"
                                @click="handleUpdateChangeAvatarDefault()"
                              >
                                <i class="fal fa-image"></i>Khôi phục ảnh mặc
                                định
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div class="text-white font-medium mt-12">
                        <p class="text-[24px] text-left pl-5">
                          {{ personnelDetail.data_user.fullname }}
                        </p>
                        <p class="text-left pl-5 text-[18px]">
                          {{ personnelDetail.data_user?.position?.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              <Transition name="slide-fade">
                <div
                  class="create-post mt-12 rounded-lg py-4"
                  v-if="isLoading == false"
                >
                  <div class="grid grid-cols-12">
                    <div class="col-span-8">
                      <div class="w-full">
                        <div class="w-full" v-if="checkAuth()">
                          <div
                            class="bg-white rounded-lg w-full py-4 shadow-lg"
                          >
                            <create-post-box
                              :contentPost="newPost"
                              @create-post="CreatePost"
                            ></create-post-box>
                          </div>
                        </div>
                        <div
                          v-if="personnelDetail.data_post?.length == 0"
                          class="bg-white rounded-lg p-4 w-full text-left mt-2"
                        >
                          {{ personnelDetail?.data_user?.fullname }} chưa có bài
                          viết nào!!!
                        </div>
                        <div
                          v-else
                          v-for="postUser in personnelDetail.data_post"
                          :key="postUser.ID"
                          class="listPostPrivate"
                        >
                          <post-card
                            :postDetail="postUser"
                            :countPost="countPost"
                          ></post-card>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-4">
                      <div
                        class="ml-8 bg-white shadow-lg rounded-lg sticky top-3"
                      >
                        <div
                          class="border-b p-4 flex justify-between font-bold"
                        >
                          Giới thiệu
                        </div>
                        <div class="p-4">
                          <div title="Giới thiệu">
                            <div
                              class="detail-profile-element"
                              v-if="personnelDetail.data_user?.department"
                              title="Phòng ban"
                            >
                              <div>
                                <img
                                  src="https://btpholdings.1office.vn/packages/4x/style/images/icons/wall-department.svg"
                                />
                              </div>
                              <div>
                                {{
                                  personnelDetail.data_user?.department?.title
                                }}
                              </div>
                            </div>
                            <div
                              class="detail-profile-element"
                              v-if="personnelDetail.data_user?.position"
                              title="Vị trí"
                            >
                              <div>
                                <img
                                  src="https://btpholdings.1office.vn/packages/4x/style/images/icons/wall-position.svg"
                                />
                              </div>
                              <div class="col-span-5">
                                {{ personnelDetail.data_user?.position?.title }}
                              </div>
                            </div>
                            <div
                              class="detail-profile-element"
                              v-if="personnelDetail.data_user.birthday"
                              title="Sinh nhật"
                            >
                              <div>
                                <img
                                  src="https://btpholdings.1office.vn/packages/4x/style/images/icons/wall-birthday.svg"
                                />
                              </div>
                              <div>
                                {{
                                  formatDate(personnelDetail.data_user.birthday)
                                }}
                              </div>
                            </div>
                            <div
                              class="detail-profile-element"
                              v-if="personnelDetail.data_user.phone?.length"
                              title="Số điện thoại"
                            >
                              <div>
                                <img
                                  src="https://btpholdings.1office.vn/packages/4x/style/images/icons/wall-phone.svg"
                                />
                              </div>
                              <div
                                v-for="(item, index) in personnelDetail
                                  .data_user.phone"
                                :key="index"
                              >
                                {{ item }}
                              </div>
                            </div>
                            <div
                              class="detail-profile-element"
                              v-if="personnelDetail.data_user.personal_email"
                              title="Email"
                            >
                              <div>
                                <img
                                  src="https://btpholdings.1office.vn/packages/4x/style/images/icons/wall-mail.svg"
                                />
                              </div>
                              <div>
                                {{ personnelDetail.data_user.personal_email }}
                              </div>
                            </div>
                            <div
                              class="detail-profile-element"
                              v-if="personnelDetail.data_user?.job_date_join"
                            >
                              <div>
                                <img
                                  src="https://btpholdings.1office.vn/packages/4x/style/images/icons/wall-date.svg"
                                />
                              </div>
                              <div>
                                {{
                                  formatDate(
                                    personnelDetail.data_user?.job_date_join
                                  )
                                }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
      <div v-if="bottom">Loading!!!!!!</div>
    </person-layout>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenChangeBackground"
      :handleCloseDetail="handleCloseChangeBackground"
    >
      <div class="w-[700px]">
        <h1 class="header-modal">Cập nhật ảnh bìa</h1>
        <div class="p-4" v-if="banner_default == false">
          <img
            :src="
              imageBackground ||
              urlIamge + '/' + personnelDetail.data_user?.banners
            "
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
          <img :src="defaultBanner" alt="" class="image-wall" />
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="ChangeBackgroundPost()">
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
        <div v-if="avatar_default == false">
          <div class="p-4 flex justify-center drop-shadow-2xl">
            <img
              class="border-2 rounded-full border-slate-300 w-[300px] h-[300px] object-cover"
              :src="
                imageAvatar ||
                urlIamge + '/' + personnelDetail.data_user?.avatars
              "
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
              :src="defaultAvatar"
            />
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="ChangeAvatar()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseChangeAvatar()">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import PostCard from "@/views/socials/PostCard.vue";
import CreatePostBox from "@/components/auth/post/CreatePostBox";
import { useStore } from "vuex";
import { FormatDate } from "@/constants/FormatAll";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import {
  AVATAR_PRIVATE_DEFAULT,
  BANNER_PRIVATE_DEFAULT,
  URL_IMG,
} from "@/constants/ApiUrl";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
    PostCard,
    CreatePostBox,
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
        this.imageAvatar = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
    checkNullBanner(url) {
      if (url) {
        return this.urlIamge + "/" + this.personnelDetail.data_user?.banners;
      } else {
        return "http://4.bp.blogspot.com/-p7SnIEIYyVc/Ua1QvnYOGkI/AAAAAAAABSM/nPaBB02FYKU/s1600/blogsinhvien.info-Facebook-Timeline-5.jpg";
      }
    },
    checkNullAvatar(url) {
      if (url) {
        return this.urlIamge + "/" + this.personnelDetail.data_user?.avatars;
      } else {
        return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBggOBwgICAcIBwoGBgUFBg8ICQcKIBEWFiAREx8YKCggGCYlGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEA0NDisZHxkrKysrKysrLSsrKysrLS0rKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QALRABAAIBAgQEBgIDAQAAAAAAAAECAwQRISIxUgUSMnITM1FigpJCYUFxoiP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD6+A0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhz6mmKOM727agmeTasdZiGZl1WXJPCfLHbVDMzM8Zk1ca/wAWndDqJiekxLG3n6y9i1onhMxKaY2RnYtZesx5+aF7Flrkjln8V1HYAAAAAAAAAAAAAAAAOMuSMdJmf8Ah1eo+HG1fXP8AyzpmZmd53l7e03tMz1lylutQAQAAHeO9sdoms7OAGvgzVzU3jr/KqRlabLOLJHbPLZqxMTEbdJalZoAAAAAAAAAAAAAApeI34VrH5LrN18755/qKlIrAMtAAAAAADV0d/Phrv1jlZS/4dO9b/wBLEq4AqAAAAAAAAAAAADN10bZ5/wBVaSj4jT0zH5FIpAMtAAAAAAC/4dG0X/tQamip5MMb9Z5liVOAqAAAAAAAAAAAADjNjjJjmJ/F2AxbRNbTE9YeNHV6b4keakc8eqvcz5iYnjG0pY08AQAAAdUpOS0RWN5kHenxzlyRG3COazWiIiI26Qi0+GMNPun1WStSM0AAAAAAAAAAAAAAAAQZ9NXL05b9yW16V9Voj3OomJjhO8AysumyY54xvHdVFtP0ltOZx0t1rEmLrGexEzPCJlrfAxdkOopWvSsQYaz8WkyXmPNHlr9y9iw0xRyxx7kgSGg5jJSZ2i0ebtdCAAAAAAAAAAAAAOcuSMdJmZ4QBe8UiZtO0KObWWtv8Plr3Ic+a2W07zy/xqiS1cezMzPGZlJi1GTHPCd47bIhFaOPW0n1xNZ+1NXNjmOF6/syBdTGz56d1f2eTmxx1vX9mRvP1knj1NMaV9ZjrHDe0qmXV5L77cte2quGmPd536zunxarJjmN581e2yuIrXxZq5Y5Z49qRj0vOO0TWdphpafNGan0tHqqsqWJgFQAAAAAAAAZuszTkvtE8lVzVZPh4p2njPLVlz1KseAMqAAAAAAAAAAJMOScV4mPyqjAbVLRasTHSXqpoMm9JrM8Y9PtW2oyAAAAAAAApeI29MfkorfiM/8ArX2KiXqwARQAAAAAAAAAAAFnRW8uePu5WkydN8/H72s1EoAIAAAAAAz/ABH50exUW/EfnR7FRL1qACAAAAAAAAAAAACXTfPx+9rMnTfPx+9rNRKACAAAAAAM/wAR+dHsVAS9agAgAAAAAAAAAAAAl03z8fvawNRKACAAP//Z";
      }
    },
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const route = useRoute();
    const countPost = ref(5);
    const isLoading = ref(true);
    const urlIamge = ref(URL_IMG);
    const bottom = ref(false);
    const avatar_default = ref(false);
    const banner_default = ref(false);
    const defaultBanner = ref(BANNER_PRIVATE_DEFAULT);
    const defaultAvatar = ref(AVATAR_PRIVATE_DEFAULT);
    const profile = useUserProfile();
    const { userProfile } = storeToRefs(profile);
    const dataPost = reactive({
      idUser: route.params.idUser,
      count: countPost.value,
    });
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    store.dispatch("SocialNew/GetShowDetailUserEndTimeLoadingAction", {
      data: dataPost,
      EndTimeLoading: EndTimeLoading,
    });
    watch(route, (to) => {
      if (to.params.idUser != 0) {
        isLoading.value = true;
        store.dispatch("SocialNew/GetShowDetailUserEndTimeLoadingAction", {
          data: { idUser: route.params.idUser, count: countPost.value },
          EndTimeLoading: EndTimeLoading,
        });
      }
    });
    const personnelDetail = computed(
      () => store.state.SocialNew.personnelDetail
    );
    const avatar = computed(() => store.state.SocialNew.avatar);
    const banners = computed(() => store.state.SocialNew.banners);
    const imageBackground = ref(banners.value);
    const imageAvatar = ref(avatar.value);
    const isOpenChangeBackground = ref(false);
    const isOpenChangeAvatar = ref(false);
    const newPost = reactive({
      content_post: "",
      file_post: [],
      wall_status: "news",
    });
    const checkRoute = () => {
      if (route.params.idUser == userProfile.value.ID) {
        return true;
      } else {
        return false;
      }
    };
    const checkAuth = () => {
      if (route.params.idUser == userProfile.value.ID) {
        return true;
      } else {
        return false;
      }
    };
    const CreatePost = (closeModal) => {
      const data = {
        content_post: newPost.content_post,
        file_post: newPost.file_post,
        wall_status: newPost.wall_status,
      };
      if (data.content_post == "") {
        toast.error("Không được để trống nội dung bài viết");
      } else {
        store.dispatch("SocialNew/CreateSocialNewAction", {
          data,
          toast,
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
        store.dispatch("SocialNew/GetShowDetailUserEndTimeLoadingAction", {
          data: { idUser: route.params.idUser, count: (countPost.value += 1) },
          EndTimeLoading: EndTimeLoading,
        });
        return (countPost.value += 1);
      }
    };
    const handleOpenChangeBackground = () => {
      isOpenChangeBackground.value = true;
    };
    const handleUpdateBackgroundDefault = () => {
      isOpenChangeBackground.value = true;
      banner_default.value = true;
    };
    const handleCloseChangeBackground = () => {
      isOpenChangeBackground.value = false;
      imageBackground.value = banners.value;
    };
    const handleOpenChangeAvatar = () => {
      isOpenChangeAvatar.value = true;
    };
    const handleUpdateChangeAvatarDefault = () => {
      isOpenChangeAvatar.value = true;
      avatar_default.value = true;
    };
    const handleCloseChangeAvatar = () => {
      isOpenChangeAvatar.value = false;
      imageAvatar.value = avatar.value;
    };
    const ChangeAvatar = () => {
      let data = {};
      if (defaultAvatar.value == true) {
        const img = defaultAvatar.value;
        data = {
          avatars: [img],
        };
      } else {
        data = {
          avatars: [imageAvatar.value],
        };
      }
      profile.ChangeAvatarAction({
        data,
        toast,
        store,
        route,
        count: countPost.value,
      });
      isOpenChangeAvatar.value = false;
      defaultAvatar.value = false;
    };
    const ChangeBackgroundPost = () => {
      let data = {};
      if (banner_default.value == true) {
        const img = defaultBanner.value;
        data = {
          banners: [img],
        };
      } else {
        data = {
          banners: [imageBackground.value],
        };
      }
      profile.ChangeBackgroundAction({
        data,
        toast,
        store,
        route,
        count: countPost.value,
      });
      isOpenChangeBackground.value = false;
      defaultBanner.value = false;
    };

    return {
      userProfile,
      banner_default,
      avatar_default,
      defaultBanner,
      avatar,
      countPost,
      banners,
      isLoading,
      bottom,
      dataPost,
      imageBackground,
      imageAvatar,
      defaultAvatar,
      isOpenChangeBackground,
      isOpenChangeAvatar,
      handleOpenChangeBackground,
      handleCloseChangeBackground,
      handleOpenChangeAvatar,
      handleCloseChangeAvatar,
      ChangeAvatar,
      checkRoute,
      ChangeBackgroundPost,
      personnelDetail,
      urlIamge,
      loadNewPost,
      checkAuth,
      newPost,
      CreatePost,
      EndTimeLoading,
      handleUpdateBackgroundDefault,
      handleUpdateChangeAvatarDefault,
    };
  },
};
</script>
<style scoped>
.wall-cover {
  position: relative;
  flex-grow: 1;
  min-height: 220px;
}
.wall-banner {
  height: 300px;
  background: #f7f8f9;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
}
.image-wall {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.icon-change-wall {
  pointer-events: all;
  transition: all linear 0.3s;
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 9;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  background: #fff;
  padding: 6px;
  border-radius: 4px;
  display: none;
}
.wall-banner:hover .icon-change-wall,
.wall-caption:hover .icon-change-wall {
  display: block;
}
.wall-caption {
  left: 25px;
  top: 185px;
  position: absolute;
  z-index: 2;
  display: flex;
}
.detail-profile-element {
  display: flex;
  align-items: center;
  text-align: left;
  margin-top: 10px;
  flex-wrap: wrap;
}
.detail-profile-element:first-child {
  margin-top: 0px;
}
.detail-profile-element > div {
  margin-right: 10px;
}

.modal-change-box {
  background: white;
  position: absolute;
  z-index: 1;
  top: 300px;
  justify-items: center;
  margin-left: 150px;
}

.modal-change-background {
  background: white;
  position: absolute;
  z-index: 1;
  top: 190px;
  justify-items: center;
  margin-left: 150px;
}

.detail-profile-header {
  margin-top: 5px;
}

.profile-header {
  height: 250px;
  background-image: url("https://saigonmetromall.com.vn/wp-content/uploads/2021/10/background-dep-840x557-3-780x470.jpg");
  border-radius: 15px;
}
.avatar-user-header {
  width: 160px;
  height: 160px;
}

.avatar-user-header-img {
  border-radius: 50%;
  width: 149px;
  height: 145px;
  margin-top: 130px;
}

.detail-profile {
  height: 600px;
  border-radius: 12px;
  background: white;
}

.setting-background {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 5px;
}
.sidebar-left {
  width: 300px;
}
</style>
