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
        <div class="col-span-9 p-4">
          <div class="">
            <header-group-detail></header-group-detail>
            <div class="create-post rounded-lg py-4">
              <Transition name="slide-up">
                <div class="grid grid-cols-12 gap-8" v-if="isLoading == false">
                  <div
                    class="lg:col-span-3 md:col-span-4 sm:col-span-6 item-member-social"
                    v-for="member in listMembersInGroup"
                    :key="member.ID"
                  >
                    <div>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0nuD5Rv6FV-35aHcgmvyYlldqJbjdJsYQ3NKM4xVLPsLhKvxjET5BrI8bmCAr75WY5Tw&usqp=CAU"
                        alt=""
                        style="width: 100px; height: 100px; border-radius: 50%"
                      />
                    </div>
                    <div class="mt-4 text-lg">
                      <a
                        href=""
                        @click.prevent="showDetailUser(member.ID)"
                        class="hover:text-red-500 hover:underline"
                        >{{ member.fullname }}</a
                      >
                    </div>
                    <div class="py-4 px-3">
                      {{ member?.position?.title }}
                    </div>
                    <div class="py-4 px-3">
                      {{ member?.department?.title }}
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </person-layout>
  </div>

  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import { ref } from "vue";
import SidebarSocial from "@/components/sidebar/SidebarSocial.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import HeaderGroupDetail from "./HeaderGroupDetail.vue";
import { useRoute } from "vue-router";
import { URL_IMG } from "@/constants/ApiUrl";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
    HeaderGroupDetail,
  },
  methods: {
    formatImage(avatar) {
      if (avatar == null) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0nuD5Rv6FV-35aHcgmvyYlldqJbjdJsYQ3NKM4xVLPsLhKvxjET5BrI8bmCAr75WY5Tw&usqp=CAU";
      } else {
        return URL_IMG + "/" + avatar;
      }
    },
  },
  setup() {
    const isLoading = ref(true);
    const route = useRoute();
    const countPost = ref(5);
    const sc_group = useSocialGroup();
    const { groupDetail, listMembersInGroup } = storeToRefs(sc_group);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    if (Object.entries(groupDetail.value)?.length == 0) {
      sc_group.GetAllPostGroupAction({
        id: route.params.idGroup,
        count: countPost.value,
        EndTimeLoading,
      });
    } else {
      EndTimeLoading();
    }
    return {
      isLoading,
      groupDetail,
      countPost,
      listMembersInGroup,
      EndTimeLoading,
    };
  },
};
</script>
<style></style>
