<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img :src="bg_BTP" alt="" class="w-full h-full object-cover" />
    </div>
    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <h1 class="flex text-3xl font-bold justify-center text-red-600">
          PHẦN MỀM NHÂN SỰ
        </h1>
        <h1 class="flex text-3xl font-bold justify-center text-red-600">
          TẬP ĐOÀN BÁCH TƯỜNG PHÁT
        </h1>
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-10 uppercase">
          Đăng nhập
        </h1>
        <form class="mt-6">
          {{ errorMsg }}
          <div>
            <label class="block text-gray-700 text-left">Tài khoản</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nhập mã nhân viên"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autocomplete
              autofocus
              required
              v-model="user.username"
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-left">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              v-model="user.password"
            />
          </div>
          <div class="flex justify-between mt-2">
            <div class="flex items-center">
              <input
                type="checkbox"
                name=""
                id="savePass"
                v-model="savePassword"
              />
              <label for="savePass" class="ml-1 cursor-pointer"
                >Nhớ mật khẩu</label
              >
            </div>
            <a
              class="text-sm font-medium text-gray-700 hover:text-red-500 hover:underline cursor-pointer"
              @click.prevent="handleConfirmEmail()"
              >Quên mật khẩu?</a
            >
          </div>
          <button
            @click.prevent="login()"
            class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Đăng nhập
          </button>
        </form>
        <p class="text-sm text-gray-500 mt-12">
          &copy; 2022 BTP HOLDINGS - All Rights Reserved.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import bg_BTP from "@/assets/images/bg-BTP.jpg";

const router = useRouter();
const store = useStore();
const savePassword = ref(false);
const userSave = JSON.parse(localStorage.getItem("dataUser"));
const user = {
  username: "",
  password: "",
};
if (userSave) {
  user.username = userSave.username;
  user.password = userSave.password;
  savePassword.value = userSave.isCheck;
}
let errorMsg = ref("");

const login = () => {
  if (savePassword.value == true) {
    const dataUser = {
      username: user.username,
      password: user.password,
      isCheck: savePassword.value,
    };
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
    store.dispatch("userLogin/UserLoginAction", user);
  } else {
    localStorage.removeItem("dataUser");
    store.dispatch("userLogin/UserLoginAction", user);
  }
};
const handleConfirmEmail = () => {
  router.push("/confirm-email");
};
</script>
