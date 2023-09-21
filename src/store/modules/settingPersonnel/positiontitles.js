import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreatePositiontitleApi,
  DeletePositiontitleApi,
  GetAllPositiontitlesApi,
  SearchPositiontitlesApi,
  UpdatePositiontitleApi,
  ImportPositionTitleApi,
  GetAllPositiontitlesEndTimeLoadingApi,
} from "@/api/ApiSettingPersonnel/ApiPositiontitle";

const state = () => {
  return {
    listPositiontitles: [],
    serachPositiontitles: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    positiontitleDetail: {},
  };
};

const getters = {
  getAllPositiontitlesActive(state) {
    return state.serachPositiontitles.filter((item) => item.status == 1);
  },
};

const mutations = {
  getAllPositiontitlesMutation(state, payload) {
    state.listPositiontitles = payload.data.data;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  getAllSearchPositiontitlesMutation(state, payload) {
    state.serachPositiontitles = payload.data.data;
  },
  ShowPositiontitlesMutation(state, payload) {
    state.positiontitleDetail = payload.data.data[0].title;
  },
};

const actions = {
  async getAllPositiontitlesAction(context, data) {
    GetAllPositiontitlesApi(data)
      .then((payload) =>
        context.commit("getAllPositiontitlesMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },

  async getAllPositiontitlesEndTimeLoadingAction(context, { EndTimeLoading }) {
    GetAllPositiontitlesEndTimeLoadingApi()
      .then((payload) => {
        context.commit("getAllPositiontitlesMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },

  async createPositiontitleAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreatePositiontitleApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllPositiontitlesEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo bản ghi mới thành công");
          handleCloseDetail();
        } else {
          toast.error("Tạo bản ghi mới thất bại", res.data.message);
        }
      })
      .catch((err) => console.log(err));
  },
  async deletePositiontitleAction(
    context,
    { id, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeletePositiontitleApi(id)
      .then(() => {
        context.dispatch("getAllPositiontitlesEndTimeLoadingAction", {
          EndTimeLoading,
        });
        toast.success("Xóa thành công");
        handleCloseConfirm();
      })
      .catch((err) => {
        console.log(err);
        handleCloseConfirm();
      });
  },
  async updatePositiontitleAction(
    context,
    { data, toast, handleCloseUpdate, EndTimeLoading }
  ) {
    UpdatePositiontitleApi(data)
      .then((res) => {
        if (res.data?.status == "success") {
          context.dispatch("getAllPositiontitlesEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseUpdate();
        } else {
          toast.error("Cập nhật thất bại");
        }
      })
      .catch((err) => console.log(err));
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllPositiontitlesMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetPrevPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    PrevPageApi(data, token)
      .then((payload) => {
        context.commit("getAllPositiontitlesMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async searchPositiontitlesAction(context, data) {
    SearchPositiontitlesApi(data)
      .then((payload) =>
        context.commit("getAllSearchPositiontitlesMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },
  async searchPositiontitleAction(context, { search, EndTimeLoading }) {
    SearchPositiontitlesApi(search)
      .then((payload) => {
        context.commit("getAllPositiontitlesMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async ImportPositionTitleAction(context, dataUrl) {
    const token = localStorage.getItem("TOKEN");
    ImportPositionTitleApi(dataUrl.data, token)
      .then((payload) =>
        context.commit("getAllPositiontitlesMutation", payload)
      )
      .catch((err) => console.log(err));
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
