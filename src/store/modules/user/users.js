import { NextPageApi, PrevPageApi } from "@/api/ApiPagination/ApiPagination";
import {
  BlockAccountApi,
  ConfirmDeviceApi,
  GetAllDeviceAuthenticationApi,
  GetAllDevicesApi,
  GetAllUserAccountApi,
  GetAllUserApi,
  GetAllUserDevicesApi,
  SearchUserApi,
  SearchUserIDApi,
  SearchUserListApi,
  ShowUserDetailApi,
  UnconfirmDeviceApi,
  UnlockAccountApi,
  ChangePassAdminApi,
  UpdateGroupPermissionAccountApi,
  UpdateUserApi,
  SearchAllDevicesApi,
} from "@/api/ApiUser/ApiUser";

const state = () => {
  return {
    listUsers: [],
    listUserAccount: [],
    listPagination: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    userDetail: {},
    listMembers: [],
    listManagers: [],
    listDeviceAuthentication: [],
    listDevices: [],
    listUserDevices: [],
    listSearchUser: [],
    listPaginationDevices: {
      current_page: 0,
      last_page: 0,
      next_page_url: "",
      prev_page_url: "",
      total: 0,
      from: 0,
      to: 0,
    },
    groupUserDetail: [],
    listUserCount: null,
  };
};

const mutations = {
  getAllUserMutation(state, payload) {
    state.listUsers = payload.user.data;
    state.listPagination.current_page = payload.user.current_page;
    state.listPagination.last_page = payload.user.last_page;
    state.listPagination.next_page_url = payload.user.next_page_url;
    state.listPagination.prev_page_url = payload.user.prev_page_url;
    state.listPagination.total = payload.user.total;
    state.listPagination.from = payload.user.from;
    state.listPagination.to = payload.user.to;
  },
  GetAllUserAccountMutation(state, payload) {
    state.listUserCount = payload.detail_count;
    state.listUserAccount = payload.user.data;
    state.listPagination.current_page = payload.user.current_page;
    state.listPagination.last_page = payload.user.last_page;
    state.listPagination.next_page_url = payload.user.next_page_url;
    state.listPagination.prev_page_url = payload.user.prev_page_url;
    state.listPagination.total = payload.user.total;
    state.listPagination.from = payload.user.from;
    state.listPagination.to = payload.user.to;
  },
  SearchDeviceMutation(state, payload) {
    state.listDevices = payload.data;
  },
  ShowUserDetailMutation(state, payload) {
    state.userDetail = payload.data;
    if (payload.data.groups != null) {
      state.groupUserDetail = JSON.parse(payload.data.groups?.string_roles);
    } else {
      state.groupUserDetail = [];
    }
  },
  SearchMembersMutation(state, payload) {
    state.listMembers = payload.data;
  },
  SearchManagersMutation(state, payload) {
    state.listManagers = payload.data;
  },
  GetAllDeviceAuthenticationMutation(state, payload) {
    state.listDeviceAuthentication = payload.data;
  },
  GetAllDevicesMutation(state, payload) {
    state.listDevices = payload.data;
    state.listPaginationDevices.current_page = payload.data.current_page;
    state.listPaginationDevices.last_page = payload.data.last_page;
    state.listPaginationDevices.next_page_url = payload.data.next_page_url;
    state.listPaginationDevices.prev_page_url = payload.data.prev_page_url;
    state.listPaginationDevices.total = payload.data.total;
    state.listPaginationDevices.from = payload.data.from;
    state.listPaginationDevices.to = payload.data.to;
  },
  GetAllUserDevicesMutation(state, payload) {
    state.listUserDevices = payload;
  },
  SetDefaultListUserMutation(state) {
    state.listSearchUser = [];
  },
  SearchUserIDMutation(state, { id, arr }) {
    const key = arr.find((item) => item.ID == id);
    if (key) {
      state.listSearchUser.push(key);
    }
  },
};

const actions = {
  async GetAllUserAccountAction(context, { key, EndTimeLoading }) {
    GetAllUserAccountApi(key)
      .then((payload) => {
        context.commit("GetAllUserAccountMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  ShowUserDetailAction(context, { id, EndTimeLoading }) {
    ShowUserDetailApi(id)
      .then((payload) => {
        context.commit("ShowUserDetailMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Start Pagination User
  async GetNextPageAction(context, { data, EndTimeLoading }) {
    const token = localStorage.getItem("TOKEN");
    NextPageApi(data, token)
      .then((payload) => {
        context.commit("GetAllUserAccountMutation", payload);
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
        context.commit("GetAllUserAccountMutation", payload);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // End Pagination User
  async BlockAccountAction(context, { id, key, route, toast, EndTimeLoading }) {
    BlockAccountApi(id)
      .then((res) => {
        if (res.data.data.status == "failed") {
          toast.error(res.data.data.messages);
        } else {
          if (route.name == "Chi tiết tài khoản") {
            context.dispatch("ShowUserDetailAction", {
              id: id,
              EndTimeLoading,
            });
          } else {
            context.dispatch("GetAllUserAccountAction", {
              key,
              EndTimeLoading,
            });
          }
          toast.success("Đã khóa tài khoản");
        }
      })
      .catch((err) => console.log(err));
  },
  // Khóa tài khoản tại chi tiết HSNS
  async BlockAccountDetailAction(context, { id, toast, EndTimeLoading }) {
    BlockAccountApi(id)
      .then((res) => {
        if (res.data?.status == "failed") {
          toast.error(res.data?.messages);
        } else {
          toast.success("Đã khóa tài khoản");
        }
        EndTimeLoading();
      })
      .catch((err) => console.log(err));
  },
  async UnLockAccountAction(
    context,
    { id, key, route, toast, EndTimeLoading }
  ) {
    UnlockAccountApi(id)
      .then((res) => {
        if (res.data.data.status == "failed") {
          toast.error(res.data.data.messages);
        } else {
          if (route.name == "Chi tiết tài khoản") {
            context.dispatch("ShowUserDetailAction", {
              id: id,
              EndTimeLoading,
            });
          } else {
            context.dispatch("GetAllUserAccountAction", {
              key,
              EndTimeLoading,
            });
          }
          toast.success("Mở khóa thành công");
        }
      })
      .catch((err) => console.log(err));
  },
  async ChangePassAdminAction(
    context,
    { id, password, toast, closeModalChangePass, EndTimeLoading }
  ) {
    ChangePassAdminApi(id, password)
      .then((payload) => {
        toast.success(payload.data.messages);
        closeModalChangePass();
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  },
  async UpdateGroupPermissionAccountAction(
    context,
    { dataUrl, key, toast, route, closeModal, EndTimeLoading }
  ) {
    UpdateGroupPermissionAccountApi(dataUrl)
      .then((res) => {
        if (res.data.status == "failed") {
          toast.error(res.data.messages);
        } else {
          if (route.name != "Chi tiết tài khoản") {
            context.dispatch("GetAllUserAccountAction", {
              key,
              EndTimeLoading,
            });
            closeModal();
          } else {
            context.dispatch("ShowUserDetailAction", {
              id: dataUrl.data?.ID,
              EndTimeLoading,
            });
            closeModal();
          }
          toast.success("Cập nhật nhóm thành công");
        }
      })
      .catch((err) => console.log(err));
  },
  checkAuthenticated(context, { to, router }) {
    const authenticated = localStorage.getItem("authenticated");
    if (to.name === "Login") {
      if (authenticated === null) {
        router.push("/login");
      } else {
        router.push("/social");
      }
    } else if (to.name === "Social" && authenticated === null) {
      router.push("/login");
    }
  },
  SearchUsersListAction(context, { key, search, EndTimeLoading }) {
    SearchUserListApi(search, key)
      .then((payload) => {
        context.commit("GetAllUserAccountMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  SearchDevicesListAction(context, { key, search, EndTimeLoading }) {
    SearchAllDevicesApi(search, key)
      .then((payload) => {
        context.commit("SearchDeviceMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  SearchMembersAction(context, search) {
    SearchUserApi(search)
      .then((payload) => context.commit("SearchMembersMutation", payload.data))
      .catch((err) => console.log(err));
  },
  SearchManagersAction(context, { search, loading }) {
    SearchUserApi(search)
      .then((payload) => {
        context.commit("SearchManagersMutation", payload.data);
        loading(false);
      })
      .catch((err) => {
        console.log(err);
        loading(false);
      });
  },
  SearchUserIDAction(context, id) {
    SearchUserIDApi(id)
      .then((payload) => {
        context.commit("SearchUserIDMutation", {
          id,
          arr: payload.data.user.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  SetDefaultListUserAction(context) {
    context.commit("SetDefaultListUserMutation");
  },
  getAllManagersAction(context, perPage) {
    GetAllUserApi(perPage)
      .then((payload) =>
        context.commit("SearchManagersMutation", payload.data.user)
      )
      .catch((err) => console.log(err));
  },
  // Danh sách xác thực thiết bị
  async GetAllDeviceAuthenticationAction(context, data) {
    GetAllDeviceAuthenticationApi(data)
      .then((payload) =>
        context.commit("GetAllDeviceAuthenticationMutation", payload.data)
      )
      .catch((err) => console.log(err));
  },
  async GetAllDevicesAction(context, { EndTimeLoading }) {
    GetAllDevicesApi()
      .then((payload) => {
        context.commit("GetAllDevicesMutation", payload.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async GetAllUserDevicesAction(context, { EndTimeLoading }) {
    GetAllUserDevicesApi()
      .then((payload) => {
        context.commit("GetAllUserDevicesMutation", payload.data.data);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Đống ý xác thực thiết bị
  async ConfirmDeviceAction(context, { data, toast, EndTimeLoading }) {
    ConfirmDeviceApi(data.id)
      .then(() => {
        context.dispatch("GetAllDeviceAuthenticationAction", data.dataID);
        toast.success("Xác thực thành công");
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async ConfirmDeviceInListAction(context, { id, toast, EndTimeLoading }) {
    ConfirmDeviceApi(id)
      .then(() => {
        context.dispatch("GetAllDevicesAction", { EndTimeLoading });
        toast.success("Xác thực thành công");
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  // Không đồng ý xác thực thiết bị
  async UnconfirmDeviceAction(context, { data, EndTimeLoading }) {
    UnconfirmDeviceApi(data.id)
      .then(() => {
        context.dispatch("GetAllDeviceAuthenticationAction", data.dataID);
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async UnconfirmDeviceInListAction(context, { id, toast, EndTimeLoading }) {
    UnconfirmDeviceApi(id)
      .then(() => {
        context.dispatch("GetAllDevicesAction", { EndTimeLoading });
        toast.success("Không xác thực");
        EndTimeLoading();
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
  async UpdateUserAction(context, { data, router, toast, EndTimeLoading }) {
    UpdateUserApi(data)
      .then((res) => {
        if (res.data.status == "success") {
          router.push(`/page-user/detail/${data.id}`);
          toast.success("Cập nhật thành công");
          EndTimeLoading();
        } else {
          toast.error(res.messages);
        }
      })
      .catch((err) => {
        console.log(err);
        EndTimeLoading();
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
