<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-timekeep></sidebar-setting-timekeep>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <create-person>
            <p class="ml-2 text-base uppercase font-medium">Cài đặt nghỉ bù</p>
          </create-person>
        </div></navbar-social
      >
    </template>
    <Transition duration="550" name="nested">
      <div class="home w-full h-full" v-if="isLoading == false">
        <div class="p-2">
          <h2
            class="text-left uppercase font-semibold p-2 outer"
            style="color: var(--color-primary)"
          >
            Cài đặt nghỉ bù
          </h2>
          <div class="w-full p-2 border rounded-lg inner">
            <div class="row-setting grid grid-cols-12 gap-20">
              <div class="flex flex-col text-left col-span-8">
                <h5 class="text-setting">Cho phép nghỉ bù</h5>
                <h5 class="sub-setting">
                  Nghỉ bù tuy không quy định trong luật nhưng nhiều doanh nghiệp
                  áp dụng hình thức này khi nhân viên làm thêm giờ,thay vì trả
                  tiền thì được quy đổi sang nghỉ bù.
                </h5>
              </div>
              <div class="col-span-4 text-right">
                <div class="check">
                  <input
                    id="isCompensatory "
                    type="checkbox"
                    v-model="OldSettingCompensatory.compensatory"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="isCompensatory"></label>
                </div>
              </div>
            </div>
            <hr />
            <Transition duration="550" name="nested">
              <div v-show="OldSettingCompensatory.compensatory == 1">
                <div class="row-setting grid grid-cols-12 gap-20">
                  <div class="flex flex-col text-left ml-4 col-span-8">
                    <h5 class="text-setting">
                      Tỷ lệ chuyển đổi thời gian làm thêm và thời gian nghỉ bù
                    </h5>
                    <h5 class="sub-setting">
                      Ví dụ: Bạn cài tỷ lệ là 1.5 nghĩa là 1 giờ làm thêm sẽ quy
                      đổi ra 1.5 giờ nghỉ bù
                    </h5>
                  </div>
                  <div class="col-span-4">
                    <input
                      type="number"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập số ngày"
                      v-model="OldSettingCompensatory.compensatory_rate"
                    />
                  </div>
                </div>
                <hr />
                <div class="row-setting grid grid-cols-12 gap-20">
                  <div class="flex flex-col text-left ml-4 col-span-8">
                    <h5 class="text-setting">Thời gian hết hạn</h5>
                    <h5 class="sub-setting">
                      Thời gian được phép nghỉ bù tính từ lúc bắt đầu đơn làm
                      thêm và đơn tăng ca. Sau thời gian này thì nhân sự không
                      được hưởng thời gian nghỉ bù của đơn đó nữa.
                    </h5>
                  </div>
                  <div class="col-span-4">
                    <select
                      name=""
                      id=""
                      class="form-control-select"
                      v-model="OldSettingCompensatory.compensatory_accumulation"
                    >
                      <option value="0">Không hết hạn</option>
                      <option value="1">Hết hạn trong tháng</option>
                      <option value="2">1 tháng</option>
                      <option value="3">3 tháng</option>
                      <option value="4">6 tháng</option>
                      <option value="5">12 tháng</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div class="row-setting grid grid-cols-12 gap-20">
                  <div class="flex flex-col text-left ml-4 col-span-8">
                    <h5 class="text-setting">Ứng trước nghỉ bù</h5>
                    <h5 class="sub-setting">
                      Khi bật cài đặt này, nhân sự tạo đơn cài phải nhập nội
                      dung mô tả thì hệ thống mới ghi nhận tạo đơn thành công
                    </h5>
                  </div>
                  <div class="col-span-4 text-right">
                    <div class="check">
                      <input
                        id="isAdvance"
                        type="checkbox"
                        v-model="OldSettingCompensatory.compensatory_addmore"
                        true-value="1"
                        false-value="0"
                      />
                      <label for="isAdvance"></label>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer>
      <div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="UpdateSettingCompensatory()">
            Cập nhật
          </button>
        </div>
      </div></template
    >
  </person-layout>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>
<script>
import "@/assets/checkBox.css";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingTimekeep from "@/components/sidebar/SidebarSettingTimekeep.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import CreatePerson from "@/components/CreatePerson.vue";
import { ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { useTimekeepFormula } from "@/store/modules/settingTimekeep/timekeepFormula";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarSettingTimekeep,
    NavbarSocial,
    CreatePerson,
  },
  setup() {
    const toast = useToast();
    const isLoading = ref(true);
    const formula = useTimekeepFormula();
    const { OldSettingCompensatory } = storeToRefs(formula);
    const EndTimeLoading = () => {
      isLoading.value = false;
    };
    formula.OldSettingCompensatoryAction({ EndTimeLoading });
    const UpdateSettingCompensatory = () => {
      const data = {
        compensatory: OldSettingCompensatory.value.compensatory,
        compensatory_rate: OldSettingCompensatory.value.compensatory_rate,
        compensatory_accumulation:
          OldSettingCompensatory.value.compensatory_accumulation,
        compensatory_addmore: OldSettingCompensatory.value.compensatory_addmore,
      };
      formula.UpdateSettingCompensatoryAction({
        data,
        toast,
        EndTimeLoading,
      });
    };
    return {
      isLoading,
      OldSettingCompensatory,
      EndTimeLoading,
      UpdateSettingCompensatory,
    };
  },
};
</script>
