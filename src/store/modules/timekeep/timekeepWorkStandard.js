import {
  GetTimekeepWorkStandardApi,
  UpdateTimekeepWorkStandardApi,
} from "@/api/ApiTimekeep/ApiTimekeepWorkStandard";

const state = () => {
  return {
    StandardWork: [],
  };
};

const mutations = {
  GetTimekeepWorkStandardMutation(state, payload) {
    state.StandardWork = payload.data;
  },
};

const actions = {
  async GetTimekeepWorkStandardAction(context, { EndTimeLoading }) {
    GetTimekeepWorkStandardApi()
      .then((payload) => {
        context.commit("GetTimekeepWorkStandardMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async UpdateTimekeepWorkStandardAction(
    context,
    { data, toast, EndTimeLoading }
  ) {
    UpdateTimekeepWorkStandardApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("GetTimekeepWorkStandardAction", { EndTimeLoading });
          toast.success("Cập nhật thành công");
        } else {
          toast.error("Thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Thất bại");
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
