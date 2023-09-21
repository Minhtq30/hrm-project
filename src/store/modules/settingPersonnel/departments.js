import {
  ChangeStatusDepartmentApi,
  CreateDepartmentApi,
  DeleteDepartmentApi,
  getAllDepartmentsApi,
  SearchDepartmentsApi,
  UpdateDepartmentApi,
  ImportDepartmentApi,
} from "@/api/ApiSettingPersonnel/ApiDepartment";
const state = () => {
  return {
    listDepartments: [],
    listDepartmentsFull: [],
    listTypes: [
      {
        type: "DEPART",
        title: "Văn phòng",
      },
      {
        type: "BRANCH",
        title: "Chi nhánh",
      },
      {
        type: "COMPANY",
        title: "Công ty",
      },
      {
        type: "STATE",
        title: "Đội, nhóm",
      },
    ],
    listPermission: [
      {
        type: "DEPART",
        title: "Phòng ban",
      },
      {
        type: "BRANCH",
        title: "Chi nhánh công ty",
      },
      {
        type: "COMPANY",
        title: "Công ty",
      },
    ],
    departmentDetail: {},
  };
};

const mutations = {
  getAllDepartmentsMutation(state, payload) {
    state.listDepartments = payload.data;
  },
  getFullDepartmentMutation(state, payload) {
    state.listDepartmentsFull = payload.data;
  },
  showDepartmentDetailMutation(state, payload) {
    state.departmentDetail = payload.data;
  },
};
const getters = {
  getAllDepartmentActive(state) {
    return state.listDepartments.filter((item) => item.status == 1);
  },
  getFullDepartmentActive(state) {
    return state.listDepartmentsFull.filter((item) => item.status == 1);
  },
  getAllDepartmentInactive(state) {
    return state.listDepartments.filter((item) => item.status == 0);
  },
};

const actions = {
  async getAllDepartmentsAction(context) {
    getAllDepartmentsApi()
      .then((data) => context.commit("getAllDepartmentsMutation", data.data))
      .catch((err) => console.log(err));
  },
  async getFullDepartmentsAction(context) {
    getAllDepartmentsApi()
      .then((data) => context.commit("getFullDepartmentMutation", data.data))
      .catch((err) => console.log(err));
  },
  async getAllDepartmentsEndTimeLoadingAction(context, { EndTimeLoading }) {
    getAllDepartmentsApi()
      .then((data) => {
        context.commit("getAllDepartmentsMutation", data.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async createDepartmentAction(
    context,
    { data, toast, handleCloseDetail, EndTimeLoading }
  ) {
    CreateDepartmentApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("getAllDepartmentsEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Tạo mới thành công");
          handleCloseDetail();
        } else {
          toast.warning(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async DeleteDepartmentAction(
    context,
    { id, EndTimeLoading, handleCloseConfirm }
  ) {
    DeleteDepartmentApi(id)
      .then(() => {
        context.dispatch("getAllDepartmentsEndTimeLoadingAction", {
          EndTimeLoading,
        });
        handleCloseConfirm();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async UpdateDepartmentAction(
    context,
    { data, toast, handleCloseEditDepartment, EndTimeLoading }
  ) {
    UpdateDepartmentApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          context.dispatch("getAllDepartmentsEndTimeLoadingAction", {
            EndTimeLoading,
          });
          handleCloseEditDepartment();
          toast.success("Cập nhật thành công");
        }
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async SearchDepartmentsAction(context, { search, EndTimeLoading }) {
    SearchDepartmentsApi(search)
      .then((payload) => {
        context.commit("getAllDepartmentsMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async ChangeStatusDepartmentAction(
    context,
    { dataID, toast, EndTimeLoading }
  ) {
    ChangeStatusDepartmentApi(dataID)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          context.dispatch("getAllDepartmentsEndTimeLoadingAction", {
            EndTimeLoading,
          });
          toast.success("Thay đổi trạng thái thành công");
          EndTimeLoading();
        }
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async ImportDepartmentAction(context, dataUrl) {
    const token = localStorage.getItem("TOKEN");
    ImportDepartmentApi(dataUrl.data, token)
      .then((payload) => context.commit("getAllDepartmentsAction", payload))
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
