import { UserLoginApi, UserLogoutApi } from "@/api/ApiUser/ApiUserProfile";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const state = () => {
  return {
    user: {
      data: {},
      token: localStorage.getItem("TOKEN"),
    },
  };
};

const mutations = {
  SetUserMuation(state, payload) {
    state.user.token = payload.token;
    state.user.data = payload.user;
    localStorage.setItem("authenticated", true);
    localStorage.setItem("TOKEN", payload.token);
  },
  LogoutUserMuation() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("userID");
    localStorage.removeItem("personnelID");
  },
};

const actions = {
  async UserLoginAction(context, user) {
    UserLoginApi(user)
      .then((payload) => {
        if (payload?.status == "success") {
          useToast().info("Chào mừng bạn đến với BTP holding!!");
          window.location.reload();
          context.commit("SetUserMuation", payload);
          useRouter().push("/social");
        } else {
          useToast().error("Tài khoản hoặc mật khẩu không chính xác!");
        }
      })
      .catch((err) => {
        if (err.response.data.error?.username) {
          useToast().error(err.response.data.error?.username[0]);
        }
        if (err.response.data.error?.password) {
          useToast().error(err.response.data.error?.password[0]);
        }
      });
  },
  async UserLogoutAction(context) {
    const token = localStorage.getItem("TOKEN");
    UserLogoutApi(token)
      .then((payload) => {
        if (payload.success == true) {
          context.commit("LogoutUserMuation");
          // router.push({ name: "Login" });
          useToast().info("Hẹn gặp lại!!!!!");
          window.location.reload();
        } else {
          useToast().error("Không thể đăng xuất!!!");
        }
      })
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
