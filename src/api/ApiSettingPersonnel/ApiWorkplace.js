import httpClient from "../Repository";
const getAllWorkplacesApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/work-place/list?per_page=${perPage}`
  );
};
const getAllWorkplacesEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/work-place/list`);
};
const CreateWorkplaceApi = (workplace) => {
  return httpClient.post(`/setting/personnel/work-place/create`, workplace);
};
const DeleteWorkplaceApi = (workplace) => {
  return httpClient.post(`/setting/personnel/work-place/delete/${workplace}`);
};
const UpdateWorkplaceApi = (workplace) => {
  return httpClient.post(
    `/setting/personnel/work-place/update/${workplace.ID}`,
    workplace
  );
};
const SearchWorkplacesApi = (search) => {
  return httpClient.get(`/setting/personnel/work-place/list?s=${search}`);
};
export {
  getAllWorkplacesApi,
  getAllWorkplacesEndTimeLoadingApi,
  CreateWorkplaceApi,
  DeleteWorkplaceApi,
  UpdateWorkplaceApi,
  SearchWorkplacesApi,
};
