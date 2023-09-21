<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-approval></sidebar-setting-approval>
    </template>
    <template v-slot:navbar>
      <navbar-social>
        <div class="flex grow">
          <div class="flex items-center">
            <div class="button-create" title="Tạo mới lý do xin nghỉ"></div>
            <p class="longText">{{ ApproveDetail?.name }}</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="flex justify-between w-full">
          <div></div>
          <div class="flex">
            <div
              class="btn-icon"
              title="DS người duyệt"
              @click="this.$router.push(`/approval-approve-setting`)"
            >
              <div class="cx"><i class="fal fa-house-return"></i></div>
              <div class="action-label">DS người duyệt</div>
            </div>
            <div
              class="btn-icon"
              title="Sửa"
              @click="
                this.$router.push(
                  `/approval-approve-setting/edit=${this.$route.params.idApprove}`
                )
              "
            >
              <div class="cx"><i class="fal fa-edit"></i></div>
              <div class="action-label">Sửa</div>
            </div>
            <div class="btn-icon" title="Xóa" @click="RemoveInout">
              <div class="cx"><i class="fal fa-trash"></i></div>
              <div class="action-label">Xóa</div>
            </div>
          </div>
        </div>
      </nav-feature></template
    >
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div title="Thông tin chung">
          <div class="detail-section-title">Thông tin chung</div>
          <div class="w-full">
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="cellTable" width="15%">Tiêu đề</td>
                  <td class="cellTable" width="35%">
                    {{ ApproveDetail.name }}
                  </td>
                  <td class="cellTable" width="15%">Đối tượng áp dụng</td>
                  <td class="cellTable" width="35%">
                    {{ ApproveDetail.module }}
                  </td>
                </tr>
                <tr>
                  <td class="cellTable">Cấu hình duyệt</td>
                  <td class="cellTable" colspan="3">
                    {{ formatApprove(ApproveDetail.user_names) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import PersonLayout from "@/layouts/person-layout.vue";
import NavFeature from "@/components/navbar/NavFeature.vue";
import SidebarSettingApproval from "@/components/sidebar/SidebarSettingApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useApprovers } from "@/store/modules/settingApproval/approve";
import { storeToRefs } from "pinia";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarSettingApproval,
    NavbarSocial,
  },
  data() {
    return {};
  },
  methods: {
    formatApprove(arr) {
      let final = "";
      if (arr) {
        for (let i = 0; i < arr?.length; i++) {
          final = final + arr[i].fullname + " , ";
        }
        return final.slice(0, -2);
      } else {
        return "";
      }
    },
  },
  setup() {
    const isLoading = ref(true);
    const route = useRoute();
    const approve = useApprovers();
    const { ApproveDetail } = storeToRefs(approve);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    approve.ShowDetailApproveAction({
      id: route.params.idApprove,
      EndTimeLoading,
    });

    return {
      isLoading,
      EndTimeLoading,
      ApproveDetail,
    };
  },
};
</script>
