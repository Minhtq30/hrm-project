import httpClient from "../Repository";
const getAllAdminGroupsApi = (perPage) => {
  return httpClient.get(`/setting/group/list?per_page=${perPage}`);
};
// EndTimeLoading
const getAllAdminGroupsEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/group/list`);
};
//
const getAllModulesApi = () => {
  return httpClient.get(`/system/permission/list`);
};
const ShowDetailGroupApi = (id) => {
  return httpClient.get(`/setting/group/show/${id}`);
};
const CreateAdminGroupApi = (data) => {
  return httpClient.post(`/setting/group/create`, data);
};
const DeleteAdminGroupApi = (data) => {
  return httpClient.post(`/setting/group/delete/${data}`);
};
const UpdateAdminGroupApi = (data) => {
  return httpClient.post(`/setting/group/update/${data.ID}`, data);
};
export {
  getAllAdminGroupsApi,
  getAllAdminGroupsEndTimeLoadingApi,
  getAllModulesApi,
  ShowDetailGroupApi,
  CreateAdminGroupApi,
  DeleteAdminGroupApi,
  UpdateAdminGroupApi,
};
