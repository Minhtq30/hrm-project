<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-setting-recruitment></sidebar-setting-recruitment>
    </template>
    <template v-slot:navbar>
      <navbar-social :isShowSearch="false"
        ><div class="flex grow">
          <create-person>
            <p class="ml-2 text-base uppercase font-medium">
              Cài đặt tuyển dụng
            </p>
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
            Cài đặt chung
          </h2>
          <div class="w-full p-2 border rounded-lg inner">
            <div class="row-setting">
              <div class="flex flex-col text-left">
                <h5 class="text-setting">Mã ứng viên</h5>
                <h5 class="sub-setting">Bộ đếm tăng dần và cho phép sửa</h5>
              </div>
              <div>
                <i
                  class="fal fa-edit cursor-pointer iconRotate"
                  @click="ShowMoreSetting()"
                  :class="{ isRotate: isMore }"
                ></i>
              </div>
            </div>
            <Transition name="slide-down">
              <div class="ml-5" v-if="isMore">
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">Cấu trúc mã</h5>
                    <h5 class="sub-setting">
                      Sử dụng các từ khóa {keyword} để viết mã tự sinh theo
                      format định sẵn
                    </h5>
                  </div>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập"
                    />
                  </div>
                </div>
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">Bộ đếm tự tăng bắt đầu từ</h5>
                    <h5 class="sub-setting">
                      Bộ đếm mã tự tăng có thể cài đặt từ 0 hoặc lớn hơn tùy ý
                    </h5>
                  </div>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control-input"
                      placeholder="Nhập"
                    />
                  </div>
                </div>
                <div class="row-setting">
                  <div class="flex flex-col text-left">
                    <h5 class="text-setting">Cho phép chỉnh sửa</h5>
                    <h5 class="sub-setting">
                      Khi tính năng này được bật, người dùng có thể thay đổi mã
                      Hãy tắt nó nếu công ty bạn đã có quy định chuẩn về mã ,
                      tránh tình trạng xung đột mã giữa các đối tượng
                    </h5>
                  </div>
                  <div>
                    <div class="check">
                      <input
                        id="isEdit "
                        type="checkbox"
                        true-value="1"
                        false-value="0"
                      />
                      <label for="isEdit"></label>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
            <hr />
            <div class="row-setting">
              <div class="flex flex-col text-left">
                <h5 class="text-setting">
                  Tự động chuyển trạng thái chiến dịch sang hoàn thành khi đề
                  xuất hoàn thành
                </h5>
                <h5 class="sub-setting">
                  Bật cài đặt này, trạng thái của chiến dịch sẽ tự động chuyển
                  sang hoàn thành khi đề xuất trong chiến dịch hoàn thành
                </h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="isAuto "
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="isAuto"></label>
                </div>
              </div>
            </div>
            <hr />
            <div class="row-setting">
              <div class="flex flex-col text-left">
                <h5 class="text-setting">
                  Áp dụng tính năng duyệt vào hồ sơ ứng viên
                </h5>
                <h5 class="sub-setting">
                  Bật cài đặt này, ứng viên phải được duyệt thì mới có thể
                  chuyển sang hồ sơ nhân sự
                </h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="isAuto "
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="isAuto"></label>
                </div>
              </div>
            </div>
            <hr />
            <div class="row-setting">
              <div class="flex flex-col text-left">
                <h5 class="text-setting">
                  Áp dụng quy trình duyệt vào đề xuất định biên
                </h5>
                <h5 class="sub-setting">
                  Bật cài đặt này, đề xuất định biên sẽ được áp dụng tính năng
                  duyệt
                </h5>
              </div>
              <div>
                <div class="check">
                  <input
                    id="isAuto "
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="isAuto"></label>
                </div>
              </div>
            </div>
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
  <loading-page
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="true"
  >
  </loading-page>
</template>
<script>
import "@/assets/checkBox.css";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarSettingRecruitment from "@/components/sidebar/SidebarSettingRecruitment.vue";
import NavbarSocial from "@/components/NavbarSocial.vue";
import CreatePerson from "@/components/CreatePerson.vue";
import { ref } from "@vue/reactivity";
export default {
  components: {
    PersonLayout,
    SidebarSettingRecruitment,
    NavbarSocial,
    CreatePerson,
  },
  setup() {
    const isLoading = ref(true);
    const isMore = ref(false);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    const ShowMoreSetting = () => {
      isMore.value = !isMore.value;
    };
    return {
      isLoading,
      isMore,
      ShowMoreSetting,
    };
  },
};
</script>
