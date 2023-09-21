import httpClient from "../Repository";
const GetAllApproveApi = () => {
  return httpClient.get(`/setting/user-role-approval/list`);
};
const ShowDetailApproveApi = (id) => {
  return httpClient.get(`/setting/user-role-approval/show/${id}`);
};
const CreateApproveApi = (approve) => {
  return httpClient.post(`/setting/user-role-approval/create`, approve);
};
const UpdateApproveApi = (id, data) => {
  return httpClient.post(`/setting/user-role-approval/update/${id}`, data);
};
const DeleteApproveApi = (approve) => {
  return httpClient.post(`/setting/user-role-approval/delete/${approve}`);
};
export {
  GetAllApproveApi,
  ShowDetailApproveApi,
  CreateApproveApi,
  UpdateApproveApi,
  DeleteApproveApi,
};
