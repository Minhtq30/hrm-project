<template>
  <div>
    <h1 class="header-modal">tạo tài khoản</h1>
    <div class="text-left px-4">
      <div class="mt-2 grid grid-cols-2 gap-2 form-large">
        <div>
          <label for="" class="form-group-label">Mã nhân sự</label>
          <div>
            <input
              type="text"
              name=""
              id="acc_id"
              disabled
              class="disabledInput p-3 w-full"
              :value="userDetail.code"
            />
          </div>
        </div>
        <div>
          <label for="" class="form-group-label">Họ và tên</label>
          <div>
            <input
              type="text"
              name=""
              id="name_id"
              disabled
              class="disabledInput p-3 w-full"
              :value="userDetail.name"
            />
          </div>
        </div>
      </div>
      <div class="mt-2 form-large">
        <label for="" class="form-group-label">Tên tài khoản</label>
        <div v-if="isEnterAccount">
          <input
            type="text"
            name=""
            id="user_id"
            disabled
            class="disabledInput p-3 w-full"
            v-model="newAccount.username"
          />
        </div>
        <div v-else>
          <input
            type="text"
            name=""
            id="pass_id"
            class="form-control-input"
            placeholder="Nhập mã nhân viên"
            v-model="newAccount.username"
          />
        </div>
      </div>
      <div class="mt-2 form-large">
        <label for="" class="form-group-label">Nhóm người dùng</label>
        <div>
          <input-group-user-vue
            v-model="newAccount.group_id"
          ></input-group-user-vue>
        </div>
      </div>
      <div class="mt-2 form-large" v-if="isAutoPassword == false">
        <label for="" class="form-group-label">Mật khẩu</label>
        <div>
          <input
            type="password"
            name=""
            id="Pass"
            class="form-control-input"
            placeholder="Nhập mật khẩu"
            v-model="newAccount.password"
          />
        </div>
      </div>
      <div class="mt-2 form-large" v-if="isAutoPassword == false">
        <label for="" class="form-group-label">Xác nhận mật khẩu</label>
        <div>
          <input
            type="password"
            name=""
            id="passwordConfirmation"
            class="form-control-input"
            placeholder="Nhập mật khẩu"
            v-model="newAccount.password_confirmation"
          />
        </div>
      </div>
      <div class="mt-2 form-large">
        <label for="isEnter" class="flex justify-start mt-2">
          <input
            type="checkbox"
            name=""
            id="isEnter"
            v-model="isEnterAccount"
          />
          <span class="ml-1 text-sm cursor-pointer">Tự động tạo tài khoản</span>
        </label>
        <label for="isPassword" class="flex justify-start mt-2">
          <input
            type="checkbox"
            name=""
            id="isPassword"
            v-model="isAutoPassword"
          />
          <span class="ml-1 text-sm cursor-pointer">Để mật khẩu mặc định</span>
        </label>
        <label for="sendEmail" class="flex justify-start mt-2">
          <input type="checkbox" name="" id="sendEmail" />
          <span class="ml-1 text-sm cursor-pointer">Gửi email</span>
        </label>
      </div>
    </div>
    <div class="bg-button-modal">
      <button class="button-modal" @click="createNewAccount()">Cập nhật</button>
      <button class="button-close-modal" @click="handleCloseAccount()">
        Hủy bỏ
      </button>
    </div>
  </div>
  <loading-overlay
    :isLoading="isLoading"
    :handleEndLoading="EndTimeLoading"
  ></loading-overlay>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import InputGroupUserVue from "@/components/constant/InputGroupUser.vue";
export default {
  components: {
    InputGroupUserVue,
  },
  props: {
    userID: {
      type: Object,
    },
    closeModal: { type: Function },
  },
  setup(props) {
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isEnterAccount = ref(true);
    const isAutoPassword = ref(true);
    const isLoading = ref(false);
    const userDetail = ref(props.userID);
    const format = ref(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    const EndTimeLoading = () => {
      isLoading.value = false;
    };

    const newAccount = reactive({
      username: "",
      password: "",
      password_confirmation: "",
      group_id: null,
    });
    if (isEnterAccount.value == true) {
      newAccount.username = userDetail.value.code;
    } else {
      newAccount.username = "";
    }
    const handleCloseAccount = () => {
      props.closeModal();
      newAccount.password = "";
      newAccount.password_confirmation = "";
      newAccount.group_id = null;
    };
    const createNewAccount = () => {
      if (isAutoPassword.value == true) {
        newAccount.password = "Btp@123456";
        newAccount.password_confirmation = "Btp@123456";
      }
      if (format.value.test(newAccount.password)) {
        if (newAccount.password == newAccount.password_confirmation) {
          const data = {
            ID: userDetail.value.ID,
            username: newAccount.username,
            password: newAccount.password,
            password_confirmation: newAccount.password_confirmation,
            group_id: newAccount.group_id,
          };
          if (data.group_id == null) {
            toast.error("Chưa chọn nhóm người dùng", 500);
          } else {
            isLoading.value = true;
            store.dispatch("personnels/createAccountAction", {
              data: data,
              toast,
              router,
              route,
              store,
              handleCloseAccount,
              key: route.params.key,
              EndTimeLoading,
            });
          }
        } else {
          toast.error("Xác nhận mật khẩu không đúng", 1000);
        }
      } else {
        toast.error(
          "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt"
        );
      }
    };
    return {
      isEnterAccount,
      isAutoPassword,
      newAccount,
      format,
      isLoading,
      userDetail,
      createNewAccount,
      handleCloseAccount,
      EndTimeLoading,
    };
  },
};
</script>

<style></style>
