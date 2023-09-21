<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-person></sidebar-person>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false">
        <div class="flex grow">
          <div class="flex flex-col justify-start text-left ml-4">
            <p class="font-medium text-xl">Nhân sự</p>
            <p class="">Hồ sơ nhân sự</p>
          </div>
        </div>
      </navbar-social>
    </template>
    <Transition duration="550" name="nested">
      <div class="p-4 w-full" v-if="isLoading == false">
        <h2 class="uppercase text-red-600 text-setting text-left p-2 outer">
          cài đặt hồ sơ nhân sự
        </h2>
        <div class="w-full p-2 border rounded-lg inner">
          <div class="row-setting">
            <h5 class="text-setting">Cài đặt mã nhân sự</h5>
            <div>
              <div class="check">
                <input
                  id="checkId"
                  type="checkbox"
                  v-model="personnelCode"
                  true-value="1"
                  false-value="0"
                />
                <label for="checkId"></label>
              </div>
            </div>
          </div>
          <div class="flex justify-between py-2" v-show="personnelCode == 1">
            <h5 class="text-setting"></h5>
            <div>
              <select
                name=""
                id=""
                class="form-control-select"
                @change="changePersonnelCode($event)"
              >
                <option
                  :value="item.ID"
                  v-for="item in listPersonnelCode"
                  :key="item.ID"
                  :selected="item.is_active == 1"
                >
                  {{ item.value }}
                </option>
              </select>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <div class="flex flex-col text-left">
              <h5 class="text-setting">
                Quyền được xem/ sửa thông tin lương, phụ cấp trong HSNS
              </h5>
              <h5 class="sub-setting">
                Những người có quyền này sẽ xem/ sửa được lương và phụ cấp của
                phòng ban tương ứng
              </h5>
            </div>
            <div>
              <select name="" id="" class="form-control-select">
                <option value="" disabled selected>Chọn</option>
                <option value="">Quản lý chi nhánh</option>
              </select>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <div class="flex flex-col text-left">
              <h5 class="text-setting">
                Quyền được xem/ sửa thông tin bảo hiểm trong HSNS
              </h5>
              <h5 class="sub-setting">
                Những người có quyền này sẽ xem/ sửa được bảo hiểm của phòng ban
                tương ứng
              </h5>
            </div>
            <div>
              <select name="" id="" class="form-control-select">
                <option value="" disabled selected>Chọn</option>
                <option value="">Quản lý chi nhánh</option>
              </select>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <h5 class="text-setting">Cài đặt khen thưởng/ phúc lợi</h5>
            <div
              @click="
                this.$router.push('/personnel-profile-settings-category-bonus')
              "
            >
              <i
                class="fal fa-external-link text-lg cursor-pointer hover:scale-125"
              ></i>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <h5 class="text-setting">Cài đặt vị trí công việc</h5>
            <div
              @click="this.$router.push('/personnel-profile-settings-position')"
            >
              <i
                class="fal fa-external-link text-lg cursor-pointer hover:scale-125"
              ></i>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <h5 class="text-setting">Cài đặt chức vụ</h5>
            <div
              @click="
                this.$router.push('/personnel-profile-settings-positiontitle')
              "
            >
              <i
                class="fal fa-external-link text-lg cursor-pointer hover:scale-125"
              ></i>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <h5 class="text-setting">Cài đặt nơi làm việc</h5>
            <div
              @click="
                this.$router.push('/personnel-profile-settings-workplace')
              "
            >
              <i
                class="fal fa-external-link text-lg cursor-pointer hover:scale-125"
              ></i>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <h5 class="text-setting">Cài đặt quy định phạt 5s</h5>
            <div @click="this.$router.push('/sadas')">
              <i
                class="fal fa-external-link text-lg cursor-pointer hover:scale-125"
              ></i>
            </div>
          </div>
          <hr />
          <div class="row-setting">
            <h5 class="text-setting">
              Cho phép nhân viên tự cập nhật thông tin cá nhân
            </h5>
            <div>
              <div class="check">
                <input id="checkIndividual" type="checkbox" />
                <label for="checkIndividual"></label>
              </div>
            </div>
          </div>
          <hr />
          <div class="row-setting items-center">
            <div class="flex flex-col text-left">
              <h5 class="text-setting">
                Áp dụng quy trình duyệt vào thay đổi hồ sơ nhân sự của cá nhân
              </h5>
              <h5 class="sub-setting">
                Khi bật cài đặt này, Thay đổi hồ sơ nhân sự sẽ được áp dụng tính
                năng duyệt. Chỉ khi được duyệt thì mọi thông tin thay đổi mới
                được cập nhật
              </h5>
            </div>
            <div>
              <div class="check">
                <input id="check" type="checkbox" />
                <label for="check"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <template v-slot:sub_footer
      ><div class="bg-slate-100">
        <div class="p-4 text-left">
          <button class="button-modal" @click="updatedSettingPersonnel()">
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
import { useToast } from "vue-toastification";
import { usePersonnelCode } from "@/store/modules/settingPersonnel/personnelCode";
import { storeToRefs } from "pinia";
export default {
  components: {
    PersonLayout,
    SidebarPerson,
    NavbarSocial,
  },
  setup() {
    const toast = useToast();
    const isLoading = ref(true);
    const code = usePersonnelCode();
    const { checkedCode, listPersonnelCode } = storeToRefs(code);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    code.getAllPersonnelCodeAction();
    code.getPersonnelCodeAction();
    const personnelCode = ref();
    setTimeout(() => (personnelCode.value = checkedCode.value), 1000);
    const changePersonnelCode = (event) => {
      code.changePersonnelCodeAction({
        id: event.target.value,
        toast,
      });
    };
    const updatedSettingPersonnel = () => {
      const data = {
        is_active: personnelCode.value,
      };
      //hien thi thong bao khi cap nhat
      code.hideShowPersonnelCodeAction({
        data,
        toast,
      });
    };
    return {
      personnelCode,
      checkedCode,
      isLoading,
      listPersonnelCode,
      changePersonnelCode,
      updatedSettingPersonnel,
    };
  },
};
</script>

<style scoped></style>
