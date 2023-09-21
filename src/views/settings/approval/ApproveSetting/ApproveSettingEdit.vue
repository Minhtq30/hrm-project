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
            <p class="longText">Cập nhật quy trình duyệt</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition name="slide-fade">
      <div class="home w-full" v-if="isLoading == false">
        <div class="text-left p-2">
          <div class="form-small">
            <label for="" class="form-group-label"
              >Tiêu đề<span class="text-red-600">*</span></label
            >
            <div>
              <input
                type="text"
                class="form-control-input"
                placeholder="Nhập tiêu đề"
                v-model="ApproveDetail.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Đối tượng<span class="text-red-600">*</span></label
            >
            <div>
              <v-select
                v-model="ApproveDetail.module"
                placeholder="Chọn đối tượng áp dượng"
                label="title"
                :options="moduleApprove"
                :reduce="(module) => module.value"
                :searchable="false"
              ></v-select>
            </div>
          </div>
          <div class="form-large">
            <label for="" class="form-group-label"
              >Đối tượng<span class="text-red-600">*</span></label
            >
            <div>
              <selector-view-vue
                :Placeholder="'Nhập người duyệt'"
                :listOption="listManagers"
                :listFinal="ApproveDetail.value"
                :searchOption="loadManagers"
                :listSearch="ApproveDetail.user_names"
              >
                <template v-slot:selectedOption="{ item }">
                  <div class="flex flex-col text-left">
                    <div class="flex">
                      <div class="font-medium">{{ item.code }}</div>
                      <div>&nbsp;- {{ item.fullname }}</div>
                    </div>
                    <div class="flex text-xs">
                      <div v-if="item.position">
                        {{ item.position?.title }}&nbsp;-&nbsp;
                      </div>
                      <div>{{ item.department?.title }}</div>
                    </div>
                  </div>
                </template>
                <template v-slot:selected="{ item }">
                  <div class="flex">
                    <div class="font-medium">{{ item.code }}</div>
                    <div>&nbsp;- {{ item.fullname }}</div>
                  </div>
                </template>
              </selector-view-vue>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="createApprove()">
            Cập nhật
          </button>
          <button class="button-close-modal" @click="this.$router.go(-1)">
            Hủy bỏ
          </button>
        </div>
      </div>
    </template>
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingApproval from "@/components/sidebar/SidebarSettingApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SelectorViewVue from "@/components/selector/SelectorTestView.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useApprovers } from "@/store/modules/settingApproval/approve";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarSettingApproval,
    NavbarSocial,
    SelectorViewVue,
  },
  data() {
    return {};
  },
  setup() {
    const isLoading = ref(true);
    const store = useStore();
    const route = useRoute();
    const toast = useToast();
    const router = useRouter();
    const listSearch = ref([]);
    const approve = useApprovers();
    const { moduleApprove, ApproveDetail } = storeToRefs(approve);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    approve.ShowDetailApproveAction({
      id: route.params.idApprove,
      EndTimeLoading,
    });
    const listManagers = computed(() => store.state.users.listMembers);
    const loadManagers = (event) => {
      store.dispatch("users/SearchMembersAction", event.target.value);
    };

    const createApprove = () => {
      const data = {
        name: ApproveDetail.value.name,
        module: ApproveDetail.value.module,
        value: ApproveDetail.value.value,
      };
      approve.UpdateApproveApi({
        id: route.params.idApprove,
        data: data,
        toast,
        router,
      });
    };
    return {
      isLoading,
      ApproveDetail,
      listManagers,
      listSearch,
      loadManagers,
      createApprove,
      EndTimeLoading,
      moduleApprove,
    };
  },
};
</script>
