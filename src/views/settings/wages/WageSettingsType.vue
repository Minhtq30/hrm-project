<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-wage></sidebar-setting-wage>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex flex-col justify-start text-left ml-4">
            <p class="font-medium text-xl">Bảng lương</p>
            <p class="">Cài đặt bảng lương</p>
          </div>
        </div></navbar-social
      >
    </template>
    <template v-slot:sub_navbar> <nav-feature> </nav-feature></template>
    <Transition name="slide-fade">
      <div class="w-full" v-if="isLoading == false">
        <div class="w-full p-2 rounded-lg border">
          <div class="flex justify-between p-2 items-center hover:bg-slate-50">
            <div class="w-[880px]">
              <h5 class="text-setting">
                Thời gian được phép hoàn chốt bảng lương
              </h5>
              <h5 class="sub-setting">
                Ví dụ: Khi cài 5 ngày, thì bạn chỉ được phép hoàn chốt bảng
                lương trong 5 ngày sau đó, quá thời gian này sẽ không được phép
                hoàn chốt bảng lương.
              </h5>
            </div>
            <div>
              <input
                type="number"
                name=""
                id=""
                class="form-control-input"
                placeholder="Nhập số ngày"
              />
            </div>
          </div>
          <hr />
          <div class="row-setting items-center">
            <div class="flex flex-col text-left">
              <h5 class="text-setting">
                Cá nhân được xem phiếu lương khi chưa chốt bảng lương
              </h5>
              <h5 class="sub-setting">
                Cài đặt này cho phép nhân sự xem được phiếu lương của mình khi
                công ty chưa chốt bảng lương.
              </h5>
            </div>
            <div>
              <div class="check">
                <input id="check" type="checkbox" />
                <label for="check"></label>
              </div>
            </div>
          </div>
          <hr />
          <div class="row-setting items-center">
            <div class="flex flex-col text-left">
              <h5 class="text-setting">
                Áp dụng quy trình duyệt vào bảng lương
              </h5>
              <h5 class="sub-setting">
                Khi bật cài đặt này, trong bảng lương sẽ hiển thị quy trình
                duyệt Sau khi chốt, bảng lương sẽ chạy theo quy trình duyệt.
              </h5>
            </div>
            <div>
              <div class="check">
                <input id="checkbox" type="checkbox" />
                <label for="checkbox"></label>
              </div>
            </div>
          </div>
        </div>
        <v-select
          label="name"
          :options="listPersonnels"
          :reduce="(personnel) => personnel.ID"
          @search="loadPersonnel"
          placeholder="Tìm mã, họ tên"
          :filterable="false"
          class="rounded-3xl"
          multiple
        >
          <template #option="{ code, name }">
            <div style="display: flex; align-items: baseline">
              <strong>{{ code }}</strong>
              <em style="margin-left: 0.5rem">- {{ name }}</em>
            </div>
          </template>
          <template #selected-option="{ code, name }">
            <div style="display: flex; align-items: baseline">
              <strong>{{ code }}</strong>
              <em style="margin-left: 0.5rem">- {{ name }}</em>
            </div>
          </template>
        </v-select>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updateSettingWage()">
            Cập nhật
          </button>
        </div>
      </div></template
    >
  </person-layout>

  <loading-page
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="true"
  >
  </loading-page>
</template>
<script>
import "@/assets/checkBox.css";
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingWage from "@/components/sidebar/SidebarSettingWage.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    NavFeature,
    PersonLayout,
    SidebarSettingWage,
    NavbarSocial,
  },
  data() {
    return {
      masks: {
        input: "DD/MM/YYYY",
        data: "YYYY-MM-DD",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },
  setup() {
    const store = useStore();
    const isLoading = ref(true);
    const list = ref([]);

    setTimeout(() => {
      isLoading.value = false;
    }, 600);
    const loadPersonnel = (search, loading) => {
      if (search.length) {
        loading(true);
        store.dispatch("personnels/SearchPersonnelAction", search);
        setTimeout(() => {
          loading(false);
        }, 500);
      }
    };
    const listPersonnels = computed(
      () => store.state.personnels.SearchPersonnel
    );
    const updateSettingWage = () => {
      console.log(list.value);
    };

    return {
      isLoading,
      listPersonnels,
      list,
      loadPersonnel,
      updateSettingWage,
    };
  },
};
</script>
