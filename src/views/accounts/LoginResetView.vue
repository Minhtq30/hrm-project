<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img :src="img" alt="" class="w-full h-full object-cover" />
    </div>
    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
      v-if="isLoading == false"
    >
      <div class="w-full h-100">
        <h1 class="flex text-3xl font-bold justify-center text-red-600">
          PHẦN MỀM NHÂN SỰ
        </h1>
        <h1 class="flex text-3xl font-bold justify-center text-red-600">
          TẬP ĐOÀN BÁCH TƯỜNG PHÁT
        </h1>
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-5 uppercase">
          đặt lại mật khẩu
        </h1>
        <form class="mt-4">
          <div>
            <label class="block text-gray-700 text-left">Email cá nhân:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Nhập email cá nhân"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              autocomplete
              required
              v-model="resetPassword.email"
            />
          </div>
          <div class="mt-2">
            <label class="block text-gray-700 text-left">Mật khẩu mới:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              v-model="resetPassword.password"
            />
          </div>
          <div class="mt-2">
            <label class="block text-gray-700 text-left"
              >Nhập lại mật khẩu mới:</label
            >
            <input
              type="password"
              name="returnPassword"
              id="returnPassword"
              placeholder="Nhập lại mật khẩu"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              v-model="resetPassword.password_confirmation"
            />
          </div>
          <div class="mt-2">
            <label class="block text-gray-700 text-left"
              >Nhập mã xác thực (được gửi về email cá nhân):</label
            >
            <input
              type="text"
              name="capcha"
              id="capcha"
              placeholder="Nhập mã xác thực"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              v-model="resetPassword.code"
            />
          </div>
          <div class="text-right mt-2">
            <router-link :to="{ name: 'Login', params: {} }">
              <a
                class="text-sm font-medium text-gray-700 hover:text-red-500 hover:underline"
                >Quay lại trang đăng nhập</a
              >
            </router-link>
          </div>
          <button
            @click.prevent="onSubmit()"
            class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-4"
          >
            Xác nhận
          </button>
        </form>
        <p class="text-sm text-gray-500 mt-12">
          &copy; 2022 BTP HOLDINGS - All Rights Reserved.
        </p>
      </div>
    </div>
  </section>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import bg_BTP from "@/assets/images/bg-BTP.jpg";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const img = ref(bg_BTP);
    const format = ref(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
    const personEmail = computed(() => store.state.ForgotPassword.email);
    const resetPassword = reactive({
      email: personEmail.value,
      password: "",
      password_confirmation: "",
      code: "",
    });
    const onSubmit = () => {
      const data = {
        email: resetPassword.email,
        password: resetPassword.password,
        password_confirmation: resetPassword.password_confirmation,
        code: resetPassword.code,
      };
      if (format.value.test(data.password)) {
        if (data.password == data.password_confirmation) {
          store.dispatch("ForgotPassword/ChangePasswordAction", {
            data: data,
            router,
            toast,
          });
        } else {
          toast.error("Nhập lại mật khẩu không đúng");
        }
      } else {
        toast.error(
          "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt"
        );
      }
    };

    return { personEmail, resetPassword, onSubmit, isLoading, img, format };
  },
};
</script>
