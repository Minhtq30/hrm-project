import httpClient from "../Repository";
const GetAllWorkTypeApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/work-type/list?per_page=${perPage}`
  );
};
const GetAllWorkTypeEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/work-type/list`);
};
const CreateWorkTypeApi = (workType) => {
  return httpClient.post(`/setting/personnel/work-type/create`, workType);
};
const UpdateWorkTypeApi = (workType) => {
  return httpClient.post(
    `/setting/personnel/work-type/update/${workType.ID}`,
    workType
  );
};
const DeleteWorkTypeApi = (workType) => {
  return httpClient.post(`/setting/personnel/work-type/delete/${workType}`);
};
const SearchWorkTypeApi = (search) => {
  return httpClient.get(`/setting/personnel/work-type/list?s=${search}`);
};
export {
  GetAllWorkTypeApi,
  GetAllWorkTypeEndTimeLoadingApi,
  CreateWorkTypeApi,
  UpdateWorkTypeApi,
  DeleteWorkTypeApi,
  SearchWorkTypeApi,
};
