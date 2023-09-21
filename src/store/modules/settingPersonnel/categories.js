import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateCategoryBonusApi,
  CreateCategoryDisciplineApi,
  CreateCategoryQuitApi,
  CreateCategoryReceiveApi,
  DeleteCategoryBonusApi,
  DeleteCategoryDisciplineApi,
  DeleteCategoryQuitApi,
  DeleteCategoryReceiveApi,
  GetAllCategoryBonusApi,
  GetAllCategoryBonusEndTimeLoadingApi,
  GetAllCategoryDisciplineApi,
  GetAllCategoryDisciplineEndTimeLoadingApi,
  GetAllCategoryQuitApi,
  GetAllCategoryQuitEndTimeLoadingApi,
  GetAllCategoryReceiveApi,
  GetAllCategoryReceiveEndTimeLoadingApi,
  SearchCategoryBonusApi,
  SearchCategoryDisciplineApi,
  SearchCategoryQuitApi,
  SearchCategoryReceiveApi,
  UpdateCategoryBonusApi,
  UpdateCategoryDisciplineApi,
  UpdateCategoryQuitApi,
  UpdateCategoryReceiveApi,
} from "@/api/ApiSettingPersonnel/ApiCategory";

const state = () => {
  return {
    listBonuses: [],
    listDisciplines: [],
    listReceives: [],
    listQuits: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
  };
};

const getters = {
  getAllReceivesActive(state) {
    return state?.listReceives?.filter((item) => item.is_active == 1);
  },
  getAllQuitsActive(state) {
    return state.listQuits.filter((item) => item.is_active == 1);
  },
};

const mutations = {
  // Start category bonus
  getAllBonusMutation(state, payload) {
    state.listBonuses = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  // End category bonus
  // Start category discipline
  getAllDisciplinesMutation(state, payload) {
    state.listDisciplines = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  //   End category discipline
  // Start category reveive
  getAllReceiveMutation(state, payload) {
    state.listReceives = payload.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  // End category receive
  // Start category quit
  getAllQuitMutation(state, payload) {
    state.listQuits = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  // End category quit
};

const actions = {
  // Start category bonus
  async getAllBonusAction(context, data) {
    GetAllCategoryBonusApi(data)
      .then((data) => context.commit("getAllBonusMutation", data.data))
      .catch((err) => console.log(err));
  },

  async getAllBonusEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllCategoryBonusEndTimeLoadingApi()
      .then((data) => {
        context.commit("getAllBonusMutation", data.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async SearchBonusAction(context, data) {
    SearchCategoryBonusApi(data)
      .then((data) => context.commit("getAllBonusMutation", data.data))
      .catch((err) => console.log(err));
  },
  async createBonusAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateCategoryBonusApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllBonusEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async updateBonusAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateCategoryBonusApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllBonusEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error(res.data?.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async deleteBonusAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteCategoryBonusApi(id)
      .then(() => {
        context.dispatch("getAllBonusEndTimeLoadingAction", { EndTimeLoading });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => console.log(err));
  },
  async GetNextPageBonusAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllBonusMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageBonusAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllBonusMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // End category bonus
  // Start category discipline
  async getAllDisciplinesAction(context, data) {
    GetAllCategoryDisciplineApi(data)
      .then((data) => context.commit("getAllDisciplinesMutation", data.data))
      .catch((err) => console.log(err));
  },

  async getAllDisciplinesEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllCategoryDisciplineEndTimeLoadingApi()
      .then((data) => {
        context.commit("getAllDisciplinesMutation", data.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async SearchDisciplinesAction(context, data) {
    SearchCategoryDisciplineApi(data)
      .then((data) => context.commit("getAllDisciplinesMutation", data.data))
      .catch((err) => console.log(err));
  },
  async createDisciplinesAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateCategoryDisciplineApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllDisciplinesEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async updateDisciplinesAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateCategoryDisciplineApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllDisciplinesEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error(res.data?.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async deleteDisciplinesAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteCategoryDisciplineApi(id)
      .then(() => {
        context.dispatch("getAllDisciplinesEndTimeLoadingAction", {
          EndTimeLoading,
        });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => console.log(err));
  },
  async GetNextPageDisciplineAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllDisciplinesMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageDisciplineAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllDisciplinesMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  //   End category discipline
  // Start category receive
  async getAllReceiveAction(context, data) {
    GetAllCategoryReceiveApi(data)
      .then((data) => {
        context.commit("getAllReceiveMutation", data.data);
      })
      .catch((err) => console.log(err));
  },

  async getAllReceiveEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllCategoryReceiveEndTimeLoadingApi()
      .then((data) => {
        context.commit("getAllReceiveMutation", data.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async SearchReceiveAction(context, data) {
    SearchCategoryReceiveApi(data)
      .then((data) => context.commit("getAllReceiveMutation", data.data))
      .catch((err) => console.log(err));
  },
  async createReceiveAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateCategoryReceiveApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllReceiveEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async updateReceiveAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateCategoryReceiveApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllReceiveEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error(res.data?.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async deleteReceiveAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteCategoryReceiveApi(id)
      .then(() => {
        context.dispatch("getAllReceiveEndTimeLoadingAction", {
          EndTimeLoading,
        });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => console.log(err));
  },
  async GetNextPageReceiveAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllReceiveMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageReceiveAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllReceiveMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // End category receive
  // Start category quit
  async getAllQuitAction(context, data) {
    GetAllCategoryQuitApi(data)
      .then((data) => context.commit("getAllQuitMutation", data.data))
      .catch((err) => console.log(err));
  },

  async getAllQuitEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllCategoryQuitEndTimeLoadingApi()
      .then((data) => {
        context.commit("getAllQuitMutation", data.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async SearchQuitAction(context, data) {
    SearchCategoryQuitApi(data)
      .then((data) => context.commit("getAllQuitMutation", data.data))
      .catch((err) => console.log(err));
  },
  async createQuitAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateCategoryQuitApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllQuitEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async updateQuitAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdateCategoryQuitApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllQuitEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error(res.data?.messages);
        }
      })
      .catch((err) => console.log(err));
  },
  async deleteQuitAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeleteCategoryQuitApi(id)
      .then(() => {
        context.dispatch("getAllQuitEndTimeLoadingAction", { EndTimeLoading });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => console.log(err));
  },
  async GetNextPageQuitAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllQuitMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageQuitAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllQuitMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // End category quit
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
