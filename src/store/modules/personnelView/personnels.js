import {
  ChangeStatusToIsvalidApi,
  ChangeStatusToliquidationApi,
} from "@/api/ApiContract/ApiContract";
import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  CreateAccountApi,
  CreatePersonnelsApi,
  DeletePersonnelApi,
  GetAllPersonnelsApi,
  GetAllPersonnelsNoPaginateApi,
  GetLastCodePersonnelApi,
  GetShowDetailPersonnelApi,
  SearchPersonnelApi,
  SearchPersonnelInputApi,
  // SearchPersonnelsStopWorkingApi,
  // SearchPersonnelsWorkingApi,
  UpdatePersonnelApi,
  ImportPersonnelApi,
  GetAllPersonnelsEndTimeLoadingApi,
  SearchPersonnelsApprovalApi,
  GetAllHistoryWorkApi,
  UpdateHistoryWorkApi,
  UpdatePersonnelWorkDayApi,
  DeleteManualPersonnelWorkDayApi,
  UpdateConcurrentlyApi,
  GetCustomPersonnelExportApi,
  GetAllPersonnelExportApi,
  ExportAllPersonnelApi,
} from "@/api/ApiPersonnel/ApiPersonnel";
import { URL_IMG } from "@/constants/ApiUrl";
import { CatchError } from "@/constants/FormatAll";

const state = () => {
  return {
    PersonnelCreateApproval: [],
    listPersonnels: [],
    listPersonnelNoPaginate: [],
    listContracts: [],
    personnelDetail: {},
    personnelContractDetail: {},
    listPersonnelExport: [],
    listAllPersonnelExport: [],
    errorPersonnels: null,
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    CountTab: {},
    ReasonIncrease: [
      { title: "Chuyển từ hợp đồng lao động", ID: 1 },
      { title: "Nghỉ thai sản đi làm lại", ID: 2 },
      { title: "Thay đổi mức đóng", ID: 3 },
      { title: "Tồn từ tháng trước", ID: 4 },
      {
        title:
          "Nghỉ không lương theo quy định (đã báo giảm) quay trở lại làm việc",
        ID: 5,
      },
      { title: "Tăng mới", ID: 6 },
      { title: "Thay đổi chức danh", ID: 7 },
      { title: "Nghỉ ốm đi làm lại", ID: 8 },
      { title: "Thay đổi mức lương tối thiểu", ID: 9 },
    ],
    ReasonDecrease: [
      {
        title: "Nghỉ việc",
        ID: 1,
      },
      {
        title: "Nghỉ thai sản",
        ID: 2,
      },
      {
        title: "Thay đổi mức đóng",
        ID: 3,
      },
      {
        title: "Nghỉ ốm",
        ID: 4,
      },
      {
        title: "Nghỉ không lương",
        ID: 5,
      },
      {
        title: "Thay đổi chức danh",
        ID: 6,
      },
      {
        title: "Giảm do tạm dừng đóng vào quỹ hưu trí, tử tuất",
        ID: 7,
      },
      {
        title: "Nghỉ hưu",
        ID: 8,
      },
    ],
    TypeTraining: [
      {
        title: "Tại chức",
        ID: 1,
      },
      {
        title: "Chính quy",
        ID: 2,
      },
      {
        title: "Chuyên nghiệp",
        ID: 3,
      },
      {
        title: "Bán chuyên nghiệp",
        ID: 4,
      },
      {
        title: "Chuyên tu",
        ID: 5,
      },
      {
        title: "Bán công",
        ID: 6,
      },
      {
        title: "Văn bằng 2",
        ID: 7,
      },
    ],
    listTypeSalary: [
      {
        title: "Lương sản phẩm",
        ID: 1,
      },
      {
        title: "Lương kinh doanh",
        ID: 2,
      },
      {
        title: "Lương ngày công",
        ID: 3,
      },
      {
        title: "Lương cộng tác viên",
        ID: 4,
      },
      {
        title: "Lương cơ bản gross",
        ID: 5,
      },
      {
        title: "Lương cơ bản net",
        ID: 6,
      },
      {
        title: "Lương theo giờ",
        ID: 7,
      },
      {
        title: "Lương P1",
        ID: 8,
      },
      {
        title: "Lương P2",
        ID: 9,
      },
      {
        title: "Lương P3",
        ID: 10,
      },
    ],
    SearchPersonnel: [],
    LastCode: null,
    HistoryWork: [],
  };
};

const getters = {
  getPersonnelInsurance(state) {
    return state.listPersonnels.filter((item) => item.premium_number);
  },
};

const mutations = {
  getAllPersonnelMutation(state, payload) {
    state.listPersonnels = payload.data.data;
    state.CountTab = payload.detail_count;
    state.listPagination.current_page = payload.data.current_page;
    state.listPagination.last_page = payload.data.last_page;
    state.listPagination.next_page_url = payload.data.next_page_url;
    state.listPagination.prev_page_url = payload.data.prev_page_url;
    state.listPagination.total = payload.data.total;
    state.listPagination.from = payload.data.from;
    state.listPagination.to = payload.data.to;
  },
  GetAllPersonnelsNoPaginateMutation(state, payload) {
    state.listPersonnelNoPaginate = payload;
  },
  GetCustomPersonnelExportMutation(state, payload) {
    state.listPersonnelExport = payload.data.data;
  },
  GetAllPersonnelExportMutation(state, payload) {
    state.listAllPersonnelExport = payload.data.data;
  },
  GetLastCodePersonnelMutation(state, payload) {
    state.LastCode = payload + 1;
  },
  SearchPersonnelMutation(state, payload) {
    state.SearchPersonnel = payload;
  },
  getAllErrorPersonnelMutation(state, payload) {
    if (payload.response.data.error.code[0].length > 0) {
      state.errorPersonnels = "error";
    } else {
      this.getAllErrorPersonnelMutation();
    }
  },
  GetPersonnelMutation(state, payload) {
    state.personnelContractDetail = payload.data.personnel_contracts;
  },
  getPersonnelDetailMutation(state, payload) {
    state.personnelDetail = payload.data;
    if (payload.data.private_code_front) {
      state.img_1 = URL_IMG + "/" + payload.data.private_code_front;
    }
    if (payload.data.private_code_back) {
      state.img_2 = URL_IMG + "/" + payload.data.private_code_back;
    }
    if (payload.data.personnel_contracts?.length > 0) {
      state.personnelContractDetail = payload.data.personnel_contracts.find(
        (item) => item.is_last_contract == 1
      );
    }
    state.listContracts = payload.data.personnel_contracts;
  },
  UpdateStatusContractDetailMuation(state, payload) {
    state.listContracts = payload.data.personnel_contracts;
  },
  //
  SearchPersonnelCreateApprovalMutation(state, payload) {
    state.PersonnelCreateApproval = payload.data;
  },
  GetAllHistoryWorkMutation(state, payload) {
    state.HistoryWork = payload;
  },
};

const actions = {
  async getAllPersonnelAction(context) {
    GetAllPersonnelsApi()
      .then((payload) => {
        if (payload.status == 200) {
          context.commit("getAllPersonnelMutation", payload.data);
        } else if (payload.status == 403) {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
      });
  },
  async getAllPersonnelNoPaginateAction(context) {
    GetAllPersonnelsNoPaginateApi()
      .then((payload) => {
        if (payload.status == 200) {
          context.commit("GetAllPersonnelsNoPaginateMutation", payload.data);
        } else if (payload.status == 403) {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getAllPersonnelExportAction(context, { perPage, exportFuncition }) {
    GetAllPersonnelExportApi(perPage)
      .then((payload) => {
        if (payload.data?.status == "success") {
          context.commit("GetAllPersonnelExportMutation", payload.data);
          exportFuncition();
        } else {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async ExportAllPersonnelAction(context, { exportFuncition }) {
    ExportAllPersonnelApi()
      .then((payload) => {
        if (payload.data?.status == "success") {
          context.commit("GetAllPersonnelExportMutation", payload);
          exportFuncition();
        } else {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getCustomPersonnelExportAction(
    context,
    { perPage, array, exportFuncition }
  ) {
    GetCustomPersonnelExportApi(perPage, array)
      .then((payload) => {
        if (payload.data?.status == "success") {
          context.commit("GetCustomPersonnelExportMutation", payload.data);
          exportFuncition();
        } else {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getAllPersonnelEndTimeLoadingAction(context, { key, EndTimeLoading }) {
    GetAllPersonnelsEndTimeLoadingApi(key)
      .then((payload) => {
        if (payload.status == 200) {
          context.commit("getAllPersonnelMutation", payload.data);
          EndTimeLoading();
        } else if (payload.status == 403) {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
          EndTimeLoading();
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          console.log("Bạn không có quyền thực hiện chức năng này !!");
        }
        EndTimeLoading();
      });
  },
  async createPersonnelAction(
    context,
    { data, toast, EndTimeLoading, router }
  ) {
    CreatePersonnelsApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
          EndTimeLoading();
        } else {
          toast.success("Tạo mới thành công!");
          router.push(`/personnelDetail/${res.data.data.ID}`);
        }
      })
      .catch((err) => {
        console.log(err);
        let arrMess = err.response.data.messages;
        let errMess = arrMess[Object.keys(arrMess)[0]];
        toast.error(errMess);
        EndTimeLoading();
      });
  },
  async deletePersonnelAction(
    context,
    { id, route, router, toast, handleCloseConfirm, EndTimeLoading }
  ) {
    DeletePersonnelApi(id)
      .then((res) => {
        if (res.data.status != "failed") {
          if (route.name == "Nhân sự") {
            context.dispatch("getAllPersonnelEndTimeLoadingAction", {
              key: route.params.key,
              EndTimeLoading,
            });
          } else {
            router.push("/personnel/type=WORKING");
          }
          toast.success("Xóa nhân sự thành công");
        } else {
          toast.error(res.data.messages);
        }
        handleCloseConfirm();
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async UpdatePersonnelAction(
    context,
    { data, router, EndTimeLoading, toast }
  ) {
    UpdatePersonnelApi(data)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
          EndTimeLoading();
        } else {
          router.push(`/personnelDetail/${data.ID}`);
          toast.success("Cập nhật nhân sự thành công");
        }
      })
      .catch((err) => {
        console.log(err);
        let arrMess = err.response.data.messages;
        let errMess = arrMess[Object.keys(arrMess)[0]];
        toast.error(errMess);
        EndTimeLoading();
      });
  },
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("getAllPersonnelMutation", payload);
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
        context.commit("getAllPersonnelMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async getPersonnelDetailAction(
    context,
    { id, EndTimeLoading, assignDetail, shiftsAssign, index }
  ) {
    GetShowDetailPersonnelApi(id)
      .then((payload) => {
        context.commit("getPersonnelDetailMutation", payload.data);
        if (assignDetail != undefined) {
          assignDetail.value.details[index].personnel_code =
            payload.data.data.code;
          assignDetail.value.details[index].position_id =
            payload.data.data.position_id;
          assignDetail.value.details[index].department_id =
            payload.data.data.department_id;
          assignDetail.value.details[index].personnel_id = payload.data.data.ID;
          assignDetail.value.details[index].department_title =
            payload.data.data.department.title;
          assignDetail.value.details[index].position_title =
            payload.data.data.position.title;
          assignDetail.value.details[index].name = payload.data.data.name;
        }
        if (shiftsAssign != undefined) {
          shiftsAssign.details[index].personnel_code = payload.data.data.code;
          shiftsAssign.details[index].position_id =
            payload.data.data.position_id;
          shiftsAssign.details[index].department_id =
            payload.data.data.department_id;
          shiftsAssign.details[index].personnel_id = payload.data.data.ID;
        }

        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Cập nhật trạng thái hợp đồng
  async UpdateStatusContractDetailAction(context, { id, EndTimeLoading }) {
    GetShowDetailPersonnelApi(id)
      .then((payload) => {
        context.commit("UpdateStatusContractDetailMuation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Gọi chi tiết nhân sự trong danh sách
  async getPersonnelDetailInListAction(
    context,
    { id, EndTimeLoading, showModal }
  ) {
    GetShowDetailPersonnelApi(id)
      .then((payload) => {
        context.commit("getPersonnelDetailMutation", payload.data);
        EndTimeLoading();
        showModal();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  //
  async SearchPersonnelAction(context, data) {
    SearchPersonnelInputApi(data)
      .then((payload) =>
        context.commit("SearchPersonnelMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },
  async GetPersonnelAction(context, data) {
    SearchPersonnelApi(data)
      .then((payload) => context.commit("GetPersonnelMutation", payload.data))
      .catch((err) => console.log(err));
  },
  async SearchPersonnelsAction(context, { data, EndTimeLoading }) {
    SearchPersonnelApi(data)
      .then((payload) => {
        context.commit("getAllPersonnelMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Create account
  async createAccountAction(
    context,
    {
      data,
      toast,
      router,
      route,
      store,
      handleCloseAccount,
      key,
      EndTimeLoading,
    }
  ) {
    CreateAccountApi(data)
      .then((res) => {
        if (res.data.status != "success") {
          toast.error(res.data.messages);
        } else {
          if (route.params.key == "INACTIVE") {
            store.dispatch("getAllUsersEndTimeLoadingAction", {
              EndTimeLoading,
            });
            store.dispatch("getAllAccountInactiveEndTimeLoadingAction", {
              EndTimeLoading,
            });
            router.push("/page-user/type=ACTIVE");
          } else if (route.name == "Nhân sự") {
            context.dispatch("getAllPersonnelEndTimeLoadingAction", {
              key,
              EndTimeLoading,
            });
          }
          toast.success("Tạo mới thành công");
          handleCloseAccount();
        }
      })
      .catch((err) => {
        // if (err.response.data.error.group_id) {
        //   toast.error("Vui lòng chọn nhóm người dùng");
        // }
        if (err.response.data.messages.username[0]) {
          toast.error("Tài khoản đã tồn tại");
        }
      });
  },
  // End account
  // async SearchPersonnelsWorkingAction(context, search) {
  //   const token = localStorage.getItem("TOKEN");
  //   SearchPersonnelsWorkingApi(token, search)
  //     .then((payload) =>
  //       context.commit("getAllPersonnelWorkingMutation", payload.data)
  //     )
  //     .catch((err) => console.log(err));
  // },
  // async SearchPersonnelsStopWorkingAction(context, search) {
  //   const token = localStorage.getItem("TOKEN");
  //   SearchPersonnelsStopWorkingApi(token, search)
  //     .then((payload) =>
  //       context.commit("getAllPersonnelStopWorkingMutation", payload.data)
  //     )
  //     .catch((err) => console.log(err));
  // },
  async GetLastCodePersonnelAction(context, code) {
    GetLastCodePersonnelApi(code)
      .then((payload) =>
        context.commit("GetLastCodePersonnelMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },
  // Tìm nhân sự tạo đơn hộ
  async SearchPersonnelCreateApprovalAction(context, { search, loading }) {
    SearchPersonnelsApprovalApi(search)
      .then((payload) => {
        context.commit("SearchPersonnelCreateApprovalMutation", payload.data);
        loading(false);
      })
      .catch((err) => {
        console.log(err);
        loading(false);
      });
  },
  // import Hồ sơ nhân sự
  async ImportPersonnelAction(context, { data, toast, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    ImportPersonnelApi(data, token)
      .then((payload) => {
        context.commit("getAllPersonnelMutation", payload);
        console.log(data);
        toast.success("Import thành công");
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Import thất bại");
        EndTimeLoading();
      });
  },
  // Danh sách lịch sử công việc
  async GetAllHistoryWorkAction(context, id) {
    GetAllHistoryWorkApi(id)
      .then((payload) =>
        context.commit("GetAllHistoryWorkMutation", payload.data.data)
      )
      .catch((err) => console.log(err));
  },
  async UpdatePersonnelWorkDay(context, { data, props, toast }) {
    UpdatePersonnelWorkDayApi(data).then(() => {
      props.closeEdit();
      toast.success("Cập nhật thành công");
    });
  },
  async DeleteManualPersonnelWorkDay(context, { data, props, toast }) {
    DeleteManualPersonnelWorkDayApi(data).then(() => {
      props.closeEdit();
      toast.success("Xóa dữ liệu thành công");
    });
  },
  async UpdateHistoryWorkAction(
    context,
    { data, route, id, toast, handleCloseWork, EndTimeLoading }
  ) {
    UpdateHistoryWorkApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          context.dispatch("GetAllHistoryWorkAction", id);
          context.dispatch("getAllPersonnelEndTimeLoadingAction", {
            key: route.params.key,
            EndTimeLoading,
          });
          toast.success("Cập nhật thành công");
          handleCloseWork();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
        handleCloseWork();
      });
  },
  // Cập nhật kiêm nhiệm
  async UpdateConcurrentlyAction(
    context,
    { data, toast, handleCloseConcurrently }
  ) {
    UpdateConcurrentlyApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("Cập nhật thành công");
          handleCloseConcurrently();
        } else {
          toast.error(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
        handleCloseConcurrently();
      });
  },
  // Thanh lys hợp đồng tại HSNS
  async ChangeStatusToliquidationAction(
    context,
    { idContract, idPersonnel, toast, EndTimeLoading }
  ) {
    ChangeStatusToliquidationApi(idContract)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
          EndTimeLoading();
        } else {
          context.dispatch("UpdateStatusContractDetailAction", {
            id: idPersonnel,
            EndTimeLoading,
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      })
      .catch((res) => {
        CatchError({ res, toast, EndTimeLoading });
      });
  },
  // Chuyển trạng thái hợp đồng sang có hiệu lực tai HSNS
  async ChangeStatusToIsvalidAction(
    context,
    { idContract, idPersonnel, toast, EndTimeLoading }
  ) {
    ChangeStatusToIsvalidApi(idContract)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          context.dispatch("UpdateStatusContractDetailAction", {
            id: idPersonnel,
            EndTimeLoading,
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      })
      .catch((res) => {
        CatchError({ res, toast, EndTimeLoading });
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
