import httpClient from "../Repository";
const GetAllUserAccountApi = (key) => {
  if (key == "ACTIVE") {
    key = "user/list?status=ACTIVE";
  } else if (key == "BLOCK") {
    key = "user/list?status=BLOCK";
  } else if (key == "INACTIVE") {
    key = "personnel/account-inactive";
  }
  return httpClient.get(`/${key}`);
};
const GetAllUserApi = (perPage) => {
  return httpClient.get(`/user/list?status=ACTIVE&per_page=${perPage}`);
};
const BlockAccountApi = (id) => {
  return httpClient.post(`/user/block-account/${id}`);
};
const ShowUserDetailApi = (idUser) => {
  return httpClient.get(`/user/show/${idUser}`);
};
const UnlockAccountApi = (id) => {
  return httpClient.post(`/user/open-account/${id}`);
};
const ChangePassAdminApi = (id, password) => {
  return httpClient.post(`/user/reset-password/${id}`, password);
};
const UpdateGroupPermissionAccountApi = (group) => {
  return httpClient.post(`/user/change-group/${group.ID}`, group.data);
};
const SearchUserApi = (search) => {
  return httpClient.get(`/user/search?s=${search}`);
};
const SearchUserListApi = (search, key) => {
  if (key == "ACTIVE") {
    key = "user/list?status=ACTIVE";
    return httpClient.get(`/${key}&s=${search}`);
  } else if (key == "BLOCK") {
    key = "user/list?status=BLOCK";
    return httpClient.get(`/${key}&s=${search}`);
  } else if (key == "INACTIVE") {
    key = "personnel/account-inactive";
    return httpClient.get(`/${key}?s=${search}`);
  }
};
const SearchUserIDApi = (id) => {
  return httpClient.get(`/user/list?status=ACTIVE&ID=${id}`);
};
const GetAllDeviceAuthenticationApi = (data) => {
  return httpClient.post(`/user/token/show`, data);
};
const GetAllDevicesApi = () => {
  return httpClient.get(`/user/token/list-all`);
};
const SearchAllDevicesApi = (search) => {
  return httpClient.get(`/user/token/list-all?s=${search}`);
};
const ConfirmDeviceApi = (id) => {
  return httpClient.post(`/user/token/approval/${id}`);
};
const UnconfirmDeviceApi = (id) => {
  return httpClient.post(`/user/token/no-approval/${id}`);
};
const GetAllUserDevicesApi = () => {
  return httpClient.get(`/user/token/auth/list`);
};
const UpdateUserApi = (data) => {
  return httpClient.post(`/user/update/${data.id}`, data.data);
};
export {
  GetAllUserAccountApi,
  GetAllUserApi,
  BlockAccountApi,
  ShowUserDetailApi,
  UnlockAccountApi,
  ChangePassAdminApi,
  UpdateGroupPermissionAccountApi,
  SearchUserApi,
  SearchUserListApi,
  SearchUserIDApi,
  GetAllDeviceAuthenticationApi,
  GetAllDevicesApi,
  ConfirmDeviceApi,
  UnconfirmDeviceApi,
  GetAllUserDevicesApi,
  UpdateUserApi,
  SearchAllDevicesApi,
};
// Danh sách xác thực thiết bị

// Đống ý xác thực thiết bị

// Không đồng ý xác thực thiết bị

// Danh sách thiết bị của user đang đăng nhập
