import httpClient from "../Repository";
const GetAllShiftsApi = () => {
  return httpClient.get(`/personnel/shift/list`);
};
const SearchShiftsApi = (search) => {
  return httpClient.get(`/personnel/shift/list?s=${search}`);
};
const CreateShiftApi = (shift) => {
  return httpClient.post(`/personnel/shift/create`, shift);
};
const UpdateShiftApi = (shift) => {
  return httpClient.post(`/personnel/shift/update/${shift.ID}`, shift);
};
const DeleteShiftApi = (shift) => {
  return httpClient.post(`/personnel/shift/delete/${shift}`);
};
const ReplicationShiftApi = (id) => {
  return httpClient.post(`/personnel/shift/copy/${id}`);
};
export {
  GetAllShiftsApi,
  SearchShiftsApi,
  CreateShiftApi,
  UpdateShiftApi,
  DeleteShiftApi,
  ReplicationShiftApi,
};
