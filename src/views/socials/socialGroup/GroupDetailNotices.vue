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
                <div class="grid grid-cols-12" v-if="isLoading == false">
                  <div class="col-span-8">
                    <div class="w-full">
                      <div class="bg-white rounded-lg p-4 text-left">
                        Nhóm chưa có thông báo nào
                      </div>
                    </div>
                  </div>
                  <div class="col-span-4">
                    <div class="ml-8 bg-white shadow-lg rounded-lg">
                      <div class="border-b p-4 flex justify-between font-bold">
                        Thông tin chung
                      </div>
                      <div
                        class="border-b p-4 flex justify-between"
                        v-if="groupDetail.desc"
                      >
                        {{ groupDetail.desc }}
                      </div>
                      <div class="p-4 text-left">
                        <div title="Giới thiệu">Nhóm đc quản trị bởi:</div>
                      </div>
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
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
import { storeToRefs } from "pinia";
export default {
  components: {
    SidebarSocial,
    PersonLayout,
    NavbarSocial3,
    HeaderGroupDetail,
  },
  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    const countPost = ref(5);
    const sc_group = useSocialGroup();
    const { groupDetail } = storeToRefs(sc_group);
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
      EndTimeLoading,
    };
  },
};
</script>
<style></style>
