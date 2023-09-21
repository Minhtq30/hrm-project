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
            <div title="notice-company" v-if="isLoading == false">
              <div class="create-post rounded-lg py-4">
                <div class="grid grid-cols-12">
                  <div class="col-span-8">
                    <div class="w-full">
                      <div
                        class="w-full rounded-lg bg-white overflow-hidden shadow-lg"
                      >
                        <div class="text-left flex items-center p-4 border-b">
                          <i class="fal fa-bell text-xl text-red-500"></i>
                          <div class="font-medium ml-2">Tất cả thông báo</div>
                        </div>
                        <div class="p-2 flex flex-col w-full text-left">
                          <div
                            class="socialCompanyNotice"
                            v-for="notice in listNoticesCompany"
                            :key="notice.ID"
                          >
                            <div class="min-w-[50px]">
                              <img
                                src="https://btpholdings.1office.vn/packages/4x/style/images/icons/stt-notice.svg"
                                alt=""
                                style="width: 40px; height: 40px"
                              />
                            </div>
                            <div class="">
                              <a
                                href=""
                                v-html="notice.topics"
                                @click.prevent="
                                  this.$router.push(
                                    `/social/detailID=${notice.ID}`
                                  )
                                "
                                class="longText"
                              ></a>
                              <div class="text-[10px]">
                                {{ formatTime(notice.created_at) }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-4">
                    <sidebar-social-right></sidebar-social-right>
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
import SidebarSocialRight from "@/components/sidebar/SidebarSocialRight.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import NavbarSocial3 from "@/components/NavbarSocial3.vue";
import NavbarCompany from "@/views/socials/socialCompany/NavbarCompany.vue";
import { FormatDate } from "@/constants/FormatAll";
import { useRoute } from "vue-router";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { useSocialCompany } from "@/store/modules/social/SocialCompany";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
    SidebarSocialRight,
    NavbarCompany,
  },
  methods: {
    formatDate(date) {
      return FormatDate(date);
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
  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    const sc_group = useSocialGroup();
    const sc_company = useSocialCompany();
    const { groupDetail } = storeToRefs(sc_group);
    const { listNoticesCompany } = storeToRefs(sc_company);
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
    sc_company.GetAllNoticesCompanyAction();
    return {
      isLoading,
      listNoticesCompany,
      groupDetail,
      EndTimeLoading,
    };
  },
};
</script>
<style></style>
