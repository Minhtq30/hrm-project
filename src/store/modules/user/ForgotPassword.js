import {
  ChangePasswordApi,
  TestEmailApi,
} from "@/api/ApiUser/ApiForgotPassword";

const state = () => {
  return {
    email: null,
  };
};

const mutations = {
  TestEmailMutation(state, payload) {
    state.email = payload.email;
  },
};

const actions = {
  async TestEmailAction(context, { data, router, EndTimeLoading }) {
    TestEmailApi(data)
      .then((payload) => {
        if (payload.status == "failed") {
          alert(payload.message);
        } else {
          context.commit("TestEmailMutation", data);
          router.push("/reset-password");
        }
        EndTimeLoading();
      })
      .catch((err) => console.log(err));
  },
  async ChangePasswordAction(context, { data, router, toast }) {
    ChangePasswordApi(data)
      .then((payload) => {
        if (payload.status == "failed") {
          toast.error(payload?.message);
        } else {
          toast.success("Đổi mật khẩu thành công");
          router.push("/login");
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
