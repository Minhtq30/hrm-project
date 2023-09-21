<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-person></sidebar-person>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <div class="flex flex-col justify-start text-left ml-4">
            <p class="font-medium text-xl">Nhân sự</p>
            <p class="">Cài đặt bảo hiểm</p>
          </div>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div class="p-4 w-full" v-if="isLoading == false">
        <div class="outer">
          <h2
            class="text-setting uppercase mb-2"
            style="color: var(--color-primary)"
          >
            Điều kiện tăng bảo hiểm
          </h2>
          <div class="w-full p-2 rounded-lg border">
            <div class="row-setting">
              <div class="grid grid-cols-12 gap-20">
                <div class="flex flex-col text-left col-span-8">
                  <h5 class="text-setting">Ngày chốt tăng hàng tháng</h5>
                  <h5 class="sub-setting">
                    Tăng lao động đóng BHXH, BHYT, BHTN trong trường hợp này
                    được hiểu là tăng số lượng người lao động tham gia đóng
                    BHXH, BHYT, BHTN. Những phát sinh tăng trước ngày này sẽ báo
                    tăng tháng này, còn sau ngày này sẽ báo tăng tháng sau.
                  </h5>
                </div>
                <div class="col-span-4">
                  <input
                    type="number"
                    name=""
                    id=""
                    class="form-control-input"
                    placeholder="Nhập số ngày"
                    v-model="SettingInsurance.begin_day"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div
              class="flex justify-between p-2 items-center hover:bg-slate-50"
            >
              <div>
                <h5 class="text-setting">Ký hợp đồng lao động</h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="checkSignature"
                    type="checkbox"
                    v-model="SettingInsurance.begin_hd"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkSignature"></label>
                </div>
              </div>
            </div>
            <hr />
            <div
              class="flex justify-between p-2 items-center hover:bg-slate-50"
            >
              <div>
                <h5 class="text-setting">Nghỉ thai sản</h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="checkMaternity"
                    type="checkbox"
                    v-model="SettingInsurance.begin_ts"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkMaternity"></label>
                </div>
              </div>
            </div>
            <hr />
            <div
              class="flex justify-between p-2 items-center hover:bg-slate-50"
            >
              <div>
                <h5 class="text-setting">
                  Nghỉ không lương theo quy định (đã báo giảm) quay trở lại làm
                  việc
                </h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="checkLeave"
                    type="checkbox"
                    v-model="SettingInsurance.begin_kl"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkLeave"></label>
                </div>
              </div>
            </div>
            <hr />
            <div
              class="flex justify-between p-2 items-center hover:bg-slate-50"
            >
              <div>
                <h5 class="text-setting">Tăng mức đóng</h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="checkUp"
                    type="checkbox"
                    v-model="SettingInsurance.begin_lu"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkUp"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inner">
          <h2
            class="text-setting uppercase mb-2 mt-8"
            style="color: var(--color-primary)"
          >
            Điều kiện giảm bảo hiểm
          </h2>
          <div class="w-full p-2 rounded-lg border">
            <div class="row-setting grid grid-cols-12 gap-20">
              <div class="flex flex-col text-left col-span-8">
                <h5 class="text-setting">Ngày chốt giảm hàng tháng</h5>
                <h5 class="sub-setting">
                  Giảm lao động đóng BHXH, BHYT, BHTN được hiểu là giảm số lượng
                  người lao động tham gia đóng BHXH, BHYT, BHTN. Những phát sinh
                  giảm trước ngày này sẽ báo giảm tháng này, còn sau ngày này sẽ
                  báo giảm tháng sau.
                </h5>
              </div>
              <div class="col-span-4">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số ngày"
                  v-model="SettingInsurance.close_day"
                />
              </div>
            </div>
            <hr />
            <div
              class="flex justify-between p-2 items-center hover:bg-slate-50"
            >
              <div>
                <h5 class="text-setting">
                  Hợp đồng lao động được đóng bảo hiểm nghỉ việc
                </h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="checkContract"
                    type="checkbox"
                    v-model="SettingInsurance.close_hd"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkContract"></label>
                </div>
              </div>
            </div>
            <hr />
            <div
              class="flex justify-between p-2 items-center hover:bg-slate-50"
            >
              <div>
                <h5 class="text-setting">Nghỉ thai theo chế độ</h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="checkMaternity_2"
                    type="checkbox"
                    v-model="SettingInsurance.close_ts"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkMaternity_2"></label>
                </div>
              </div>
            </div>
            <hr />
            <div
              class="flex justify-between p-2 items-center hover:bg-slate-50"
            >
              <div>
                <h5 class="text-setting">Giảm mức đóng</h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="checkDown"
                    type="checkbox"
                    v-model="SettingInsurance.close_kl"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkDown"></label>
                </div>
              </div>
            </div>
            <hr />
            <div class="row-setting grid grid-cols-12 gap-20">
              <div class="flex flex-col text-left col-span-8">
                <h5 class="text-setting">Nghỉ không lương</h5>
                <h5 class="sub-setting">
                  Đối với trường hợp người lao động không làm việc và không
                  hưởng tiền lương quá số ngày nghỉ tối đa hàng tháng thì không
                  đóng BHXH tháng đó. Thời gian này không được tính để hưởng
                  BHXH.
                </h5>
              </div>
              <div class="col-span-4 text-right">
                <div class="check">
                  <input
                    id="checkNoSalary"
                    type="checkbox"
                    v-model="SettingInsurance.close_lu"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="checkNoSalary"></label>
                </div>
              </div>
            </div>
            <hr />
            <div class="row-setting grid grid-cols-12 gap-20">
              <div class="flex flex-col text-left col-span-8">
                <h5 class="text-setting">Số ngày nghỉ không lương</h5>
                <h5 class="sub-setting">
                  Đối với trường hợp người lao động không làm việc và không
                  hưởng tiền lương quá số ngày nghỉ tối đa hàng tháng thì không
                  đóng BHXH tháng đó. Thời gian này không được tính để hưởng
                  BHXH.
                </h5>
              </div>
              <div class="col-span-4">
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control-input"
                  placeholder="Nhập số ngày"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="uploadSettingInsurance()">
            Cập nhật
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import "@/assets/checkBox.css";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPerson from "@/components/sidebar/SidebarPerson.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import { ref } from "@vue/runtime-core";
import { useSettingInsurance } from "@/store/modules/insurance/settingInsurance";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
export default {
  components: {
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
  },
  setup() {
    const isLoading = ref(true);
    const toast = useToast();
    const settingInsurance = useSettingInsurance();
    const { SettingInsurance } = storeToRefs(settingInsurance);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    settingInsurance.SettingInsuranceAction({ EndTimeLoading });
    const uploadSettingInsurance = () => {
      isLoading.value = true;
      const data = {
        begin_day: SettingInsurance.value.begin_day,
        begin_hd: SettingInsurance.value.begin_hd,
        begin_ts: SettingInsurance.value.begin_ts,
        begin_kl: SettingInsurance.value.begin_kl,
        begin_lu: SettingInsurance.value.begin_lu,
        close_day: SettingInsurance.value.close_day,
        close_hd: SettingInsurance.value.close_hd,
        close_ts: SettingInsurance.value.close_ts,
        close_kl: SettingInsurance.value.close_kl,
        close_lu: SettingInsurance.value.close_lu,
      };
      settingInsurance.UpdateSettingInsuranceAction({
        data: data,
        toast,
        EndTimeLoading,
      });
    };
    return {
      isLoading,
      SettingInsurance,
      EndTimeLoading,
      uploadSettingInsurance,
    };
  },
};
</script>

<style scoped></style>
