import httpClient from "../Repository";
const GetAllAllowancesApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/allowance-type/list?per_page=${perPage}`
  );
};
const GetAllAllowancesEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/allowance-type/list`);
};
const CreateAllowancesApi = (allowance) => {
  return httpClient.post(`/setting/personnel/allowance-type/create`, allowance);
};
const UpdateAllowanceApi = (allowance) => {
  return httpClient.post(
    `/setting/personnel/allowance-type/update/${allowance.ID}`,
    allowance
  );
};
const DeleteAllowanceApi = (allowance) => {
  return httpClient.post(
    `/setting/personnel/allowance-type/delete/${allowance.dataID}`
  );
};
const SearchAllowancesApi = (search) => {
  return httpClient.get(`/setting/personnel/allowance-type/list?s=${search}`);
};
export {
  GetAllAllowancesApi,
  GetAllAllowancesEndTimeLoadingApi,
  CreateAllowancesApi,
  UpdateAllowanceApi,
  DeleteAllowanceApi,
  SearchAllowancesApi,
};
