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
            <p class="longText">Tạo mới quy trình duyệt</p>
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
                v-model="approveSetting.name"
              />
            </div>
          </div>
          <div class="form-small">
            <label for="" class="form-group-label"
              >Đối tượng<span class="text-red-600">*</span></label
            >
            <div>
              <v-select
                label="title"
                :options="moduleApprove"
                :reduce="(module) => module.value"
                v-model="approveSetting.module"
                placeholder="Chọn đối tượng áp dượng"
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
                :listFinal="approveSetting.value"
                :searchOption="loadManagers"
                :listSearch="listSearch"
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
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>
<script>
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingApproval from "@/components/sidebar/SidebarSettingApproval.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import SelectorViewVue from "@/components/selector/SelectorTestView.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
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
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const listSearch = ref([]);
    const approve = useApprovers();
    const { moduleApprove } = storeToRefs(approve);
    const listManagers = computed(() => store.state.users.listMembers);
    const approveSetting = reactive({
      name: null,
      module: null,
      value: [],
    });
    const loadManagers = (event) => {
      store.dispatch("users/SearchMembersAction", event.target.value);
    };
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
    const createApprove = () => {
      const data = {
        name: approveSetting.name,
        module: approveSetting.module,
        value: approveSetting.value,
      };
      approve.CreateApproveAction({
        data: data,
        toast,
        router,
      });
    };
    return {
      isLoading,
      approveSetting,
      listManagers,
      listSearch,
      moduleApprove,
      loadManagers,
      createApprove,
    };
  },
};
</script>
