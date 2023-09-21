<template>
  <div class="w-full flex items-center justify-between">
    <div class="flex flex-wrap items-center">
      <router-link
        to="/social/groups"
        class="social-topic bg-gray-100"
        :class="{
          socialTopicActive: checkRoute('/social/groups'),
          socialTopicInactive: checkRoute('/social/groups/all'),
        }"
        ><i class="fal fa-user-friends mr-2"></i>Nhóm đang tham gia</router-link
      >
      <router-link
        to="/social/groups/all"
        class="social-topic bg-gray-100"
        :class="{
          socialTopicActive: checkRoute('/social/groups/all'),
          socialTopicInactive: checkRoute('/social/groups'),
        }"
        ><i class="fal fa-users mr-2"></i>Tất cả các nhóm</router-link
      >
    </div>
    <div>
      <button class="button-modal" @click="handleOpenCreateGroup()">
        Tạo nhóm
      </button>
    </div>
  </div>
  <teleport to="#app">
    <modal-view
      :isOpen="isOpenCreateGroup"
      :handleCloseDetail="handleCloseCreateGroup"
    >
      <div class="w-[850px]">
        <h1 class="header-modal">tạo nhóm</h1>
        <div class="text-left p-4 h-[500px] overflow-auto format-scroll">
          <div class="form-large">
            <div>
              <label for="" class="form-group-label"
                >Tên nhóm<span class="text-red-600">*</span></label
              >
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhóm công nghệ thông tin"
                  v-model="group.name"
                />
              </div>
            </div>
          </div>
          <div class="cursor-pointer">
            <div class="flex items-start">
              <input
                id="default-radio-1"
                type="radio"
                value="manual"
                v-model="group.type"
                name="default-radio"
                class="w-4 h-4"
              />
              <label for="default-radio-1" class="form-group-label ml-2"
                >Nhóm tự do</label
              >
            </div>
            <div class="flex items-start cursor-pointer">
              <input
                id="default-radio-2"
                type="radio"
                value="auto"
                v-model="group.type"
                name="default-radio"
                class="w-4 h-4"
              />
              <label for="default-radio-2" class="form-group-label ml-2"
                >Nhóm theo phòng ban</label
              >
            </div>
          </div>
          <div class="form-large" v-if="group.type == 'auto'">
            <div>
              <label for="" class="form-group-label">Phòng ban</label>
              <div>
                <input-department
                  v-model="group.cats"
                  :isMultiple="true"
                ></input-department>
              </div>
            </div>
          </div>
          <div class="">
            <label for="isEnter" class="flex items-start">
              <input
                type="checkbox"
                name=""
                id="isEnter"
                true-value="open"
                false-value="close"
                v-model="group.access"
              />
              <span class="form-group-label ml-2 cursor-pointer"
                >Cho phép khách đọc bài viết, gia nhập nhóm</span
              >
            </label>
          </div>
          <div class="form-large">
            <div>
              <label for="" class="form-group-label"
                >Người quản lý nhóm<span class="text-red-600">*</span></label
              >
              <div>
                <input-add-user :arrUser="group.managers"></input-add-user>
              </div>
            </div>
          </div>
          <div class="form-large">
            <div>
              <label for="" class="form-group-label"
                >Thêm thành viên<span class="text-red-600">*</span></label
              >
              <div>
                <input-add-user :arrUser="group.member_ids"></input-add-user>
              </div>
            </div>
          </div>
          <div class="form-large">
            <div>
              <label for="" class="form-group-label">Mô tả nhóm</label>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="5"
                  rows="5"
                  class="form-control-input"
                  v-model="group.desc"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-button-modal">
          <button class="button-modal" @click="CreateGroup()">Cập nhật</button>
          <button class="button-close-modal" @click="handleCloseCreateGroup()">
            Hủy bỏ
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
import { reactive, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import InputAddUser from "@/components/constant/InputAddUser.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
export default {
  components: {
    InputAddUser,
    InputDepartment,
  },
  setup() {
    const route = useRoute();
    const toast = useToast();
    const isOpenCreateGroup = ref(false);
    const isLoading = ref(false);
    const sc_group = useSocialGroup();
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const group = reactive({
      name: "",
      type: "manual",
      access: "close",
      cats: null,
      managers: [],
      member_ids: [],
      desc: "",
    });
    const checkRoute = (index) => {
      if (index == route.path) {
        return true;
      } else {
        return false;
      }
    };
    const handleCloseCreateGroup = () => {
      isOpenCreateGroup.value = false;
    };
    const handleOpenCreateGroup = () => {
      isOpenCreateGroup.value = true;
    };
    const CreateGroup = () => {
      const data = {
        name: group.name,
        type: group.type,
        access: group.access,
        cats: group.cats,
        managers: group.managers,
        member_ids: group.member_ids,
        desc: group.desc,
      };
      if (data.name?.length > 0) {
        if (data.managers?.length > 0) {
          sc_group.CreateSocialGroupAction({
            data,
            toast,
            handleCloseCreateGroup,
            EndTimeLoading,
          });
        } else {
          toast.error("Vui lòng chọn người quản lý");
        }
      } else {
        toast.error("Vui lòng nhâp tên nhóm");
      }
    };
    return {
      group,
      isLoading,
      isOpenCreateGroup,
      checkRoute,
      handleCloseCreateGroup,
      handleOpenCreateGroup,
      CreateGroup,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
