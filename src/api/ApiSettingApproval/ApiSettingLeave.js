import httpClient from "../Repository";
const GetAllLeavesApi = () => {
  return httpClient.get(`/approval/personnel-leave-type/list`);
};
const SearchLeavesApi = (search) => {
  return httpClient.get(`/approval/personnel-leave-type/list?s=${search}`);
};
const CreateLeaveApi = (leave) => {
  return httpClient.post(`/approval/personnel-leave-type/create`, leave);
};
const UpdateLeaveApi = (leave) => {
  return httpClient.post(
    `/approval/personnel-leave-type/update/${leave.ID}`,
    leave
  );
};
const DeleteLeaveApi = (leave) => {
  return httpClient.post(`/approval/personnel-leave-type/delete/${leave}`);
};
export {
  GetAllLeavesApi,
  SearchLeavesApi,
  CreateLeaveApi,
  UpdateLeaveApi,
  DeleteLeaveApi,
};
