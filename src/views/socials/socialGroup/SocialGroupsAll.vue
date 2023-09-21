<template>
  <div class="bg-[#f0f2f5]">
    <person-layout>
      <template v-slot:navbar>
        <navbar-social-3></navbar-social-3>
      </template>
      <div class="grid grid-cols-12 gap-x-2 grow">
        <div class="col-span-3">
          <sidebar-social />
        </div>
        <div class="col-span-6 mt-4 mx-4">
          <navbar-social-group></navbar-social-group>
          <Transition name="slide-fade">
            <div class="cards-body" v-if="isLoading == false">
              <div v-if="listGroup?.length">
                <div
                  class="post-small"
                  v-for="group in listGroup"
                  :key="group.ID"
                >
                  <div class="item-post">
                    <div class="cover-group">
                      <img class="w-full" :src="formatBanner(group)" />
                    </div>
                    <div class="content-group">
                      <img
                        class="content-group-avatar"
                        :src="formatAvatar(group)"
                      />
                      <div class="content-group-info">
                        <div class="content-group-info-title">
                          <a
                            class="title text-lg hover:text-red-500"
                            href=""
                            @click.prevent="handleToDetailGroup(group.ID)"
                            >{{ group.name }}</a
                          >
                          <div
                            class="bg-red-100 rounded-lg cursor-pointer relative group"
                          >
                            <i class="fal fa-ellipsis-h-alt text-xl p-2"></i>
                            <div
                              class="drop-shadow-xl absolute z-10 right-0 bottom-full invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:h-6 before:w-full before:-top-3 before:z-10 before:right-0 before:absolute"
                            >
                              <ul class="bg-white p-1 rounded-md">
                                <li
                                  class="w-32 sub-item font-normal"
                                  @click="handleOpenEditGroup(group.ID)"
                                >
                                  <i class="fal fa-edit px-2"></i>Sửa nhóm
                                </li>
                                <li
                                  class="w-32 sub-item font-normal"
                                  @click="handleOpenConfirm(group.ID)"
                                >
                                  <i class="fal fa-trash px-2"></i>Xóa nhóm
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div style="color: #888" class="text-left mt-2">
                          <div class="longText">
                            {{ group.desc }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="bg-white rounded-lg p-4 w-full text-left mt-10"
              >
                Chưa có nhóm nào
              </div>
            </div>
          </Transition>
        </div>
        <div class="col-span-3 w-full relative mt-4">
          <sidebar-social-right></sidebar-social-right>
        </div>
      </div>
    </person-layout>
  </div>
  <teleport to="#app">
    <modal-view :isOpen="isEditGroup" :handleCloseDetail="handleCloseEditGroup">
      <div class="w-[850px]">
        <form-edit-group-vue
          :groupDetail="groupDetail"
          :closeUpdate="handleCloseEditGroup"
        ></form-edit-group-vue>
      </div>
    </modal-view>
    <!-- Start xác nhận xóa -->
    <modal-delete
      :isOpen="isOpenConfirm"
      :handleCloseDetail="handleCloseConfirm"
      :ConfirmDelete="deleteGroup"
    >
    </modal-delete>
    <!-- End xác nhận xóa -->
  </teleport>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
  <loading-overlay
    :isLoading="isLoadingEdit"
    :handleEndLoading="EndTimeLoadingEdit"
  ></loading-overlay>
</template>

<script>
import { computed, ref } from "vue";
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import SidebarSocialRight from "@/components/sidebar/SidebarSocialRight.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import navbarSocialGroup from "./navbarSocialGroup.vue";
import FormEditGroupVue from "./FormEditGroup.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { URL_IMG } from "@/constants/ApiUrl";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    SidebarSocialRight,
    PersonLayout,
    NavbarSocial3,
    navbarSocialGroup,
    FormEditGroupVue,
  },
  methods: {
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
    const store = useStore();
    const toast = useToast();
    const isLoading = ref(true);
    const isLoadingEdit = ref(false);
    const urlImage = ref(URL_IMG);
    const router = useRouter();
    const isEditGroup = ref(false);
    const isOpenConfirm = ref(false);
    const idGroup = ref();
    const sc_group = useSocialGroup();
    const { listGroup, groupDetail } = storeToRefs(sc_group);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EndTimeLoadingEdit = () => {
      isLoadingEdit.value = false;
    };
    if (Object.entries(listGroup.value)?.length == 0) {
      sc_group.GetAllSocialGroupAction({ EndTimeLoading });
    }
    const listDepartments = computed(
      () => store.getters["departments/getAllDepartmentActive"]
    );
    const listUsers = computed(() => store.state.users.listUsers);
    const handleToDetailGroup = (id) => {
      router.push(`/social/group/groupID=${id}`);
    };
    const handleCloseConfirm = () => {
      isOpenConfirm.value = false;
    };
    const handleOpenConfirm = (id) => {
      idGroup.value = id;
      isOpenConfirm.value = true;
    };
    const deleteGroup = () => {
      isLoadingEdit.value = true;
      sc_group.DeleteSocialGroupAction({
        id: idGroup.value,
        toast,
        handleCloseConfirm,
        EndTimeLoading: EndTimeLoadingEdit,
      });
    };
    const handleCloseEditGroup = () => {
      isEditGroup.value = false;
    };
    const handleOpenEditGroup = (id) => {
      if (listDepartments.value?.length == 0) {
        store.dispatch("departments/getAllDepartmentsAction");
      }
      if (listUsers.value?.length == 0) {
        store.dispatch("users/getAllUsersAction");
      }
      sc_group.GetDetailGroupAction({
        id,
        EndTimeLoading,
      });
      isLoadingEdit.value = true;
      setTimeout(() => {
        isEditGroup.value = true;
        isLoadingEdit.value = false;
      }, 2000);
    };
    return {
      isLoading,
      listGroup,
      urlImage,
      isEditGroup,
      listDepartments,
      listUsers,
      isLoadingEdit,
      groupDetail,
      handleToDetailGroup,
      deleteGroup,
      handleCloseEditGroup,
      handleOpenEditGroup,
      EndTimeLoading,
      EndTimeLoadingEdit,
      isOpenConfirm,
      idGroup,
      handleCloseConfirm,
      handleOpenConfirm,
    };
  },
};
</script>
<style></style>
