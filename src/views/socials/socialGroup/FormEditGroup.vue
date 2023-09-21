<template>
  <h1 class="header-modal">cập nhật nhóm</h1>
  <div class="text-left px-4 py-2 h-[450px] overflow-auto format-scroll">
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
            v-model="GroupDetail.name"
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
          v-model="GroupDetail.type"
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
          v-model="GroupDetail.type"
          name="default-radio"
          class="w-4 h-4"
        />
        <label for="default-radio-2" class="form-group-label ml-2"
          >Nhóm theo phòng ban</label
        >
      </div>
    </div>
    <div class="form-large" v-if="GroupDetail.type == 'auto'">
      <div>
        <label for="" class="form-group-label">Phòng ban</label>
        <div>
          <input-department
            v-model="GroupDetail.cats"
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
          v-model="GroupDetail.access"
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
          <v-select
            label="code"
            @input="loadManagers($event)"
            :options="listMembers"
            class="rounded-3xl"
            placeholder="Chọn người quản lý"
            multiple
            v-model="GroupDetail.detail_managers"
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
    <div class="form-large">
      <div>
        <label for="" class="form-group-label"
          >Thêm thành viên<span class="text-red-600">*</span></label
        >
        <div>
          <v-select
            label="code"
            @input="loadManagers($event)"
            :options="listMembers"
            class="rounded-3xl"
            placeholder="Nhập tên hoặc mã nhân viên"
            multiple
            v-model="GroupDetail.detail_memebers"
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
            v-model="GroupDetail.desc"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-button-modal">
    <button class="button-modal" @click="EditGroup()">Cập nhật</button>
    <button class="button-close-modal" @click="handleCloseEditGroup()">
      Hủy bỏ
    </button>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
// import InputAddUser from "@/components/constant/InputAddUser.vue";
import InputDepartment from "@/components/constant/InputDepartment.vue";
import { useSocialGroup } from "@/store/modules/social/SocialGroup";
export default {
  components: {
    // InputAddUser,
    InputDepartment,
  },
  props: {
    groupDetail: { type: Object },
    closeUpdate: { type: Function },
  },
  methods: {},
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const GroupDetail = ref(props.groupDetail);
    const isLoading = ref(false);
    const sc_group = useSocialGroup();
    const loadManagers = (e) => {
      store.dispatch("users/SearchMembersAction", e.target.value);
    };
    const listMembers = computed(() => store.state.users.listMembers);
    const listUsers = computed(() => store.state.users.listUsers);
    const handleCloseEditGroup = () => {
      props.closeUpdate();
    };
    const getID = (array) => {
      var lookup1 = {};
      const arrID = [];
      for (var i = 0; i < array.length; i++) {
        lookup1[array[i].ID] = array[i];
        arrID.push(array[i].ID);
      }
      return arrID;
    };
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    const EditGroup = () => {
      let data;
      if (GroupDetail.value.type == "manual") {
        data = {
          name: GroupDetail.value.name,
          type: GroupDetail.value.type,
          cats: null,
          access: GroupDetail.value.access,
          managers: getID(GroupDetail.value.detail_managers),
          member_ids: getID(GroupDetail.value.detail_memebers),
          desc: GroupDetail.value.desc,
        };
      } else {
        data = {
          name: GroupDetail.value.name,
          type: GroupDetail.value.type,
          cats: GroupDetail.value.cats,
          access: GroupDetail.value.access,
          managers: getID(GroupDetail.value.detail_managers),
          member_ids: getID(GroupDetail.value.detail_memebers),
          desc: GroupDetail.value.desc,
        };
      }
      const dataGroup = {
        ID: GroupDetail.value.ID,
        group: data,
      };
      sc_group.UpdateSocialGroupAction({
        dataGroup,
        toast,
        handleCloseEditGroup,
        EndTimeLoading,
      });
    };
    return {
      GroupDetail,
      listUsers,
      isLoading,
      EditGroup,
      handleCloseEditGroup,
      loadManagers,
      listMembers,
      getID,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
