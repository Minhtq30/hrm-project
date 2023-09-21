import httpClient from "../Repository";
const GetAllInoutApi = () => {
  return httpClient.get(`/approval/personnel-inout-type/list`);
};
const SearchInoutApi = (search) => {
  return httpClient.get(`/approval/personnel-inout-type/list?s=${search}`);
};
const CreateInoutApi = (inout) => {
  return httpClient.post(`/approval/personnel-inout-type/create`, inout);
};
const UpdateInoutApi = (inout) => {
  return httpClient.post(
    `/approval/personnel-inout-type/update/${inout.ID}`,
    inout
  );
};
const DeleteInoutApi = (inout) => {
  return httpClient.post(`/approval/personnel-inout-type/delete/${inout}`);
};
export {
  GetAllInoutApi,
  SearchInoutApi,
  CreateInoutApi,
  UpdateInoutApi,
  DeleteInoutApi,
};
