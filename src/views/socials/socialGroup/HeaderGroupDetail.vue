<template>
  <div class="wall-cover">
    <div class="wall-banner">
      <img :src="formatBanner(groupDetail)" alt="" class="image-wall" />
      <div
        class="icon-change-wall relative group"
        v-if="checkRole('SOCIAL_SOCIAL_UPDATE')"
      >
        <i class="fal fa-cog"></i>
        <div
          class="absolute z-10 right-0 top-10 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
        >
          <ul class="bg-white p-2 rounded-md">
            <li
              class="w-60 sub-item flex items-center text-left"
              @click="handleOpenChangeBackground()"
            >
              <i class="fal fa-image px-4"></i>Chỉnh sửa ảnh bìa
            </li>
            <li
              class="w-60 sub-item flex items-center text-left"
              @click="handleUpdateBackgroundDefault()"
            >
              <i class="fal fa-image px-4"></i>Cập nhật ảnh bìa mặc định
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wall-caption">
      <div class="relative flex items-center">
        <div class="avatar-user-header">
          <img
            class="border rounded-full w-full h-full"
            :src="formatAvatar(groupDetail)"
          />
          <div
            class="icon-change-wall relative group"
            v-if="checkRole('SOCIAL_SOCIAL_UPDATE')"
          >
            <i class="fal fa-cog"></i>
            <div
              class="absolute z-10 left-0 -top-14 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
            >
              <ul class="bg-white p-2 rounded-md">
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
                  <i class="fal fa-image px-2"></i>Đặt lại ảnh mặc định
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="text-white font-medium mt-12">
          <p class="text-[28px] text-left pl-5">
            {{ groupDetail.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between bg-white rounded-b-lg">
    <div class="wall-menu">
      <a
        href=""
        @click.prevent="
          this.$router.push(
            `/social/group/groupID=${this.$route.params.idGroup}`
          )
        "
        :class="{
          wallMenuActive: checkRoute(
            `/social/group/groupID=${this.$route.params.idGroup}`
          ),
        }"
        >Bảng tin</a
      ><a
        href=""
        @click.prevent="
          this.$router.push(
            `/social/group/notices=${this.$route.params.idGroup}`
          )
        "
        :class="{
          wallMenuActive: checkRoute(
            `/social/group/notices=${this.$route.params.idGroup}`
          ),
        }"
        >Thông báo</a
      ><a
        href=""
        @click.prevent="
          this.$router.push(
            `/social/group/members=${this.$route.params.idGroup}`
          )
        "
        :class="{
          wallMenuActive: checkRoute(
            `/social/group/members=${this.$route.params.idGroup}`
          ),
        }"
        >Thành viên ({{ listMembersInGroup?.length }})</a
      >
    </div>
    <div
      class="hover:bg-red-200 cursor-pointer hover:rounded-lg relative group"
    >
      <i class="fal fa-cog text-xl p-4"></i>
      <div
        class="absolute z-10 right-0 bottom-12 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
      >
        <ul class="bg-white p-1 rounded-md">
          <li
            class="w-40 sub-item flex justify-start items-center"
            @click="handleOpenEditGroup()"
          >
            <i class="fal fa-cog px-2"></i>Sửa
          </li>
          <li
            class="w-40 sub-item flex justify-start items-center"
            @click="handleOpenAddPerson()"
          >
            <i class="fal fa-user-plus px-2"></i>Thêm thành viên
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Start Add person -->
  <teleport to="#app">
    <modal-view :isOpen="isAddPerson" :handleCloseDetail="handleCloseAddPerson">
      <div class="w-[500px]">
        <h1 class="header-modal">thêm thành viên</h1>
        <div class="text-left w-full p-2">
          <div>
            <label for="">Tên nhóm</label>
            <div>
              <input
                type="text"
                disabled
                class="disabledInput"
                v-model="groupDetail.name"
              />
            </div>
          </div>
          <div>
            <label for="">Thành viên</label>
            <div>
              <v-select
                label="code"
                @input="loadMembers($event)"
                :options="listMembers"
                :reduce="(user) => user.ID"
                class="rounded-3xl"
                placeholder="Nhập tên hoặc mã nhân viên"
                multiple
                :filterable="false"
                v-model="members_add"
              >
                <template #option="{ code, fullname, position, department }">
                  <div class="flex flex-col">
                    <div class="font-medium">{{ code }} - {{ fullname }}</div>
                    <div class="text-xs">{{ position?.title }}</div>
                    <div class="text-xs">
                      {{ department?.title }}
                    </div>
                  </div>
                </template>
                <template #selected-option="{ code, fullname }">
                  <div style="display: flex; align-items: baseline">
                    <strong>{{ code }}</strong>
                    <em>-{{ fullname }}</em>
                  </div>
                </template>
              </v-select>
            </div>
          </div>
        </div>
        <div class="bg-button-modal text-center">
          <button class="button-modal" @click="AddPerson()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseAddPerson">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <!-- End Add person -->
  <!-- Start edit group -->
  <teleport to="#app">
    <modal-view :isOpen="isEditGroup" :handleCloseDetail="handleCloseEditGroup">
      <div class="w-[850px]">
        <form-edit-group-vue
          :groupDetail="groupDetail"
          :closeUpdate="handleCloseEditGroup"
        ></form-edit-group-vue>
      </div>
    </modal-view>
  </teleport>
  <!-- End edit group -->
  <!-- Start Change background -->
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
          <img
            src="https://btpholdings.1office.vn/packages/4x/style/images/social/default-group-cover2.png"
            alt=""
            class="image-wall"
          />
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
  <!-- End Change background -->
  <!-- Start change avatar -->
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenChangeAvatar"
      :handleCloseDetail="handleCloseChangeAvatar"
    >
      <div class="w-[500px]">
        <h1 class="header-modal">Cập nhật ảnh đại diện</h1>
        <div class="p-4" v-if="defaultAvatar == false">
          <div class="flex justify-center drop-shadow-2xl">
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
        <div class="p-4" v-else>
          <div class="flex justify-center drop-shadow-2xl">
            <img
              class="border-2 rounded-full border-slate-300 w-[300px] h-[300px] object-cover"
              :src="avatar_default"
            />
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="UploadAvatar()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseChangeAvatar()">
            Hủy bỏ
          </button>
        </div>
      </div>
    </modal-view>
  </teleport>
  <!-- End change avatar -->
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import {
  AVATAR_GROUP_DEFAULT,
  BANNER_GROUP_DEFAULT,
  URL_IMG,
} from "@/constants/ApiUrl";
import { FormatRole } from "@/constants/FormatAll";
import FormEditGroupVue from "./FormEditGroup.vue";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
export default {
  components: {
    FormEditGroupVue,
  },
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
    formatBanner(group) {
      if (group?.banners) {
        return this.urlImage + "/" + group?.banners;
      } else {
        return "https://btpholdings.1office.vn/packages/4x/style/images/social/default-group-cover2.png";
      }
    },
    formatAvatar(group) {
      if (group?.avatars) {
        return this.urlImage + "/" + group?.avatars;
      } else {
        return "https://btpholdings.1office.vn/packages/4x/style/images/social/group.png";
      }
    },
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const toast = useToast();
    const isAddPerson = ref(false);
    const isEditGroup = ref(false);
    const isLoading = ref(true);
    const urlImage = ref(URL_IMG);
    const isOpenChangeBackground = ref(false);
    const isOpenChangeAvatar = ref(false);
    const defaultBackground = ref(false);
    const defaultAvatar = ref(false);
    const members_add = ref();
    const avatar_default = ref(AVATAR_GROUP_DEFAULT);
    const banner_default = ref(BANNER_GROUP_DEFAULT);
    const profile = useUserProfile();
    const sc_group = useSocialGroup();
    const { avatar, banner, groupDetail, listMembersInGroup } =
      storeToRefs(sc_group);
    const { userProfile } = storeToRefs(profile);
    const imageAvatar = ref(avatar);
    const imageBackground = ref(banner);
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const listUsers = computed(() => store.state.users.listUsers);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    sc_group.GetAllMembersInGroupAction({
      id: route.params.idGroup,
      EndTimeLoading,
    });
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
    const handleCloseAddPerson = () => {
      isAddPerson.value = false;
    };
    const handleOpenAddPerson = () => {
      members_add.value = [];
      isAddPerson.value = true;
      if (listUsers.value?.length == 0) {
        store.dispatch("users/getAllUsersAction");
      }
    };
    const handleCloseEditGroup = () => {
      isEditGroup.value = false;
    };
    const handleOpenEditGroup = () => {
      if (listDepartments.value?.length == 0) {
        store.dispatch("departments/getAllDepartmentsAction");
      }
      if (listUsers.value?.length == 0) {
        store.dispatch("users/getAllUsersAction");
      }
      isEditGroup.value = true;
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
      let data = {};
      if (defaultAvatar.value == true) {
        const img = avatar_default.value;
        data = {
          id: route.params.idGroup,
          avatars: {
            avatars: [img],
          },
        };
      } else {
        data = {
          id: route.params.idGroup,
          avatars: {
            avatars: [imageAvatar.value],
          },
        };
      }
      sc_group.ChangeAvatarGroupAction({
        data,
        toast,
        EndTimeLoading,
      });
      isOpenChangeAvatar.value = false;
      defaultAvatar.value = false;
    };
    const UploadBackground = () => {
      let data = {};
      if (defaultBackground.value == true) {
        data = {
          id: route.params.idGroup,
          banners: {
            banners: ["banner_default"],
          },
        };
      } else {
        data = {
          id: route.params.idGroup,
          banners: {
            banners: [imageBackground.value],
          },
        };
      }
      sc_group.ChangeBannerGroupAction({
        data,
        toast,
        EndTimeLoading,
      });
      isOpenChangeBackground.value = false;
      defaultBackground.value = false;
    };
    const loadMembers = (event) => {
      store.dispatch("users/SearchMembersAction", event.target.value);
    };
    const listMembers = computed(() => store.state.users.listMembers);
    const loadManagers = (event) => {
      store.dispatch("users/SearchManagersAction", event.target.value);
    };
    const AddPerson = () => {
      const dataGroup = {
        id: route.params.idGroup,
        data: {
          members_add: members_add.value,
        },
      };
      sc_group.AddMembersInGroupAction({
        dataGroup,
        route,
        handleCloseAddPerson,
        EndTimeLoading,
      });
    };
    return {
      AddPerson,
      listUsers,
      listMembers,
      listMembersInGroup,
      groupDetail,
      isAddPerson,
      isEditGroup,
      urlImage,
      isOpenChangeBackground,
      isOpenChangeAvatar,
      imageAvatar,
      imageBackground,
      avatar,
      banner,
      userProfile,
      checkRoute,
      members_add,
      isLoading,
      EndTimeLoading,
      checkRole,
      handleOpenChangeBackground,
      handleUpdateBackgroundDefault,
      handleCloseChangeBackground,
      handleOpenChangeAvatar,
      handleCloseChangeAvatar,
      handleCloseAddPerson,
      handleOpenAddPerson,
      handleCloseEditGroup,
      handleOpenEditGroup,
      UploadAvatar,
      UploadBackground,
      loadMembers,
      loadManagers,
      listDepartments,
      defaultBackground,
      defaultAvatar,
      handleUpdateAvatarDefault,
      avatar_default,
      banner_default,
    };
  },
};
</script>

<style></style>
