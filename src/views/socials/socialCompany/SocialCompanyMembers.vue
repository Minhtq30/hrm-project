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
          <div title="navbar-company">
            <navbar-company></navbar-company>
          </div>
          <Transition name="slide-up">
            <div v-if="isLoading == false">
              <div class="mt-4 rounded-lg py-4">
                <div class="grid grid-cols-12 gap-8">
                  <div
                    class="lg:col-span-3 md:col-span-4 sm:col-span-6 item-member-social"
                    v-for="(item, index) in listMembersInGroup"
                    :key="index"
                  >
                    <div>
                      <img
                        src="https://btpholdings.1office.vn/packages/4x/style/images/letters/c.png"
                        alt=""
                        style="width: 100px; height: 100px; border-radius: 50%"
                      />
                    </div>
                    <div
                      class="mt-4 text-lg hover:text-red-500 hover:underline"
                    >
                      <a href="" @click.prevent="ShowUserDetail(item.ID)">{{
                        item.fullname
                      }}</a>
                    </div>
                    <div class="py-5 px-3">
                      {{ item.position?.title }}
                    </div>
                    <div class="py-5 px-3">
                      {{ item.department?.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
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
import NavbarCompany from "@/views/socials/socialCompany/NavbarCompany.vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute, useRouter } from "vue-router";
import { useUserProfile } from "@/store/modules/user/userProfile";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
    NavbarCompany,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);
    const profile = useUserProfile();
    const sc_group = useSocialGroup();
    const { groupDetail, listMembersInGroup } = storeToRefs(sc_group);
    const { userProfile, avatar } = storeToRefs(profile);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    if (Object.entries(groupDetail.value)?.length == 0) {
      sc_group.GetAllPostGroupAction({
        id: route.params.idGroup,
        count: 5,
        EndTimeLoading,
      });
    } else {
      EndTimeLoading();
    }
    sc_group.GetAllMembersInGroupAction({
      id: route.params.idGroup,
      EndTimeLoading,
    });
    const ShowUserDetail = (id) => {
      router.push(`/social/user/${id}`);
    };
    return {
      userProfile,
      avatar,
      isLoading,
      listMembersInGroup,
      groupDetail,
      ShowUserDetail,
      EndTimeLoading,
    };
  },
};
</script>
<style></style>
