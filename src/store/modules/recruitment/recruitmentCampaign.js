import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import { SearchPersonnelApi } from "@/api/ApiPersonnel/ApiPersonnel";
import {
  CreateRecruitmentCampaignApi,
  getAllRecruitmentCampaignApi,
  ShowDetailRecruitmentCampaignApi,
  UpdateRecruitmentCampaignApi,
  DeleteRecruitmentCampaignApi,
  SearchRecruitmentCampaignApi,
} from "@/api/ApiRecruitment/ApiRecruitmentCampaign";

const state = () => {
  return {
    listRecruitmentCampaign: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    CampaignDetail: {},
    listPersonnelInCharge: [],
  };
};

const mutations = {
  getAllRecruitmentCampaignMutation(state, payload) {
    state.listRecruitmentCampaign = payload.data;
    state.listPagination.current_page = payload.current_page;
    state.listPagination.last_page = payload.last_page;
    state.listPagination.next_page_url = payload.next_page_url;
    state.listPagination.prev_page_url = payload.prev_page_url;
    state.listPagination.total = payload.total;
    state.listPagination.from = payload.from;
    state.listPagination.to = payload.to;
  },
  ShowDetailRecruitmentCampaignMutation(state, payload) {
    state.CampaignDetail = payload;
  },
  SearchPersonnelInChargeMutation(state, payload) {
    state.listPersonnelInCharge = payload.data;
  },
};

const actions = {
  // Lấy tất cả danh sách chiến dịch tuyển dụng
  async getAllRecruitmentCampaignAction(context, { EndTimeLoading }) {
    getAllRecruitmentCampaignApi()
      .then((payload) => {
        if (payload.status == "success") {
          context.commit(
            "getAllRecruitmentCampaignMutation",
            payload.data.data
          );
          EndTimeLoading();
        } else {
          console.log("a0");
          EndTimeLoading();
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          console.log("a!");
        }
        EndTimeLoading();
      });
  },
  // Tạo mới chiến dịch tuyển dụng
  async CreateRecruitmentCampaignAction(
    context,
    { data, toast, router, ActivatedButton, EndTimeLoading }
  ) {
    CreateRecruitmentCampaignApi(data)
      .then((res) => {
        if (res.data.status == "create failed") {
          toast.error(res.data.messages);
          ActivatedButton();
          EndTimeLoading();
        } else {
          // context.dispatch("getAllRecruitmentCampaignAction");
          toast.success("Tạo mới thành công!");
          router.push(`/recruitment-campaign/detail/${res.data.data.ID}`);
          ActivatedButton();
          EndTimeLoading();
        }
      })
      .catch((err) => {
        console.log(err);
        ActivatedButton();
        EndTimeLoading();
      });
  },
  // Cập nhật chiến dịch tuyển dụng
  async UpdateRecruitmentCampaignAction(
    context,
    { data, toast, router, ActivatedButton, EndTimeLoading }
  ) {
    UpdateRecruitmentCampaignApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
          ActivatedButton();
          EndTimeLoading();
        } else {
          // context.dispatch("getAllRecruitmentCampaignAction");
          toast.success("Cập nhật thành công!");
          router.push(`/recruitment-campaign/detail/${data.ID}`);
          ActivatedButton();
          EndTimeLoading();
        }
      })
      .catch((err) => {
        console.log(err);
        ActivatedButton();
        EndTimeLoading();
      });
  },
  // Xóa chiến dịch tuyển dụng
  async DeleteRecruitmentCampaignAction(
    context,
    { data, route, router, toast, EndTimeLoading, handleCloseConfirm }
  ) {
    DeleteRecruitmentCampaignApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
          EndTimeLoading();
        } else {
          if (route.name == "Chi tiết chiến dịch tuyển dụng") {
            router.push("/recruitment-campaign/all");
          } else {
            context.dispatch("getAllRecruitmentCampaignAction", {
              EndTimeLoading,
            });
          }
          toast.success("Xóa thành công!");
          EndTimeLoading();
        }
        handleCloseConfirm();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
        handleCloseConfirm();
      });
  },
  // Chi tiêt
  async ShowDetailRecruitmentCampaignAction(context, { id, EndTimeLoading }) {
    ShowDetailRecruitmentCampaignApi(id)
      .then((payload) => {
        if (payload.status == "success") {
          context.commit(
            "ShowDetailRecruitmentCampaignMutation",
            payload.data.data
          );
          EndTimeLoading();
        } else {
          EndTimeLoading();
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          console.log("a!");
        }
        EndTimeLoading();
      });
  },
  //Tìm kiếm chiến dịch
  async SearchRecruitmentCampaignAction(context, { search, EndTimeLoading }) {
    SearchRecruitmentCampaignApi(search)
      .then((payload) => {
        if (payload.status == "success") {
          context.commit(
            "getAllRecruitmentCampaignMutation",
            payload.data.data
          );
          EndTimeLoading();
        } else {
          console.log("a0");
          EndTimeLoading();
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          console.log("a!");
        }
        EndTimeLoading();
      });
  },
  // Phân trang
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllRecruitmentCampaignMutation", payload);
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
        context.commit("getAllRecruitmentCampaignMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Tìm kiếm người phụ trách
  async SearchPersonnelInChargeAction(context, data) {
    SearchPersonnelApi(data)
      .then((payload) =>
        context.commit("SearchPersonnelInChargeMutation", payload.data.data)
      )
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
