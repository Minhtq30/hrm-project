import httpClient from "../Repository";
const GetAllSalaryRangeApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel-quantum-detail/list?per_page=${perPage}`
  );
};
const GetAllSalaryRangeEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel-quantum-detail/list`);
};
const CreateSalaryRangeApi = (salary) => {
  return httpClient.post(`/setting/personnel-quantum-detail/create`, salary);
};
const UpdateSalaryRangeApi = (salary) => {
  return httpClient.post(
    `/setting/personnel-quantum-detail/update/${salary.ID}`,
    salary
  );
};
const DeleteSalaryRangeApi = (salary) => {
  return httpClient.post(`/setting/personnel-quantum-detail/delete/${salary}`);
};
const SearchSalaryRangeApi = (search) => {
  return httpClient.get(`/setting/personnel-quantum-detail/list?s=${search}`);
};
export {
  GetAllSalaryRangeApi,
  GetAllSalaryRangeEndTimeLoadingApi,
  CreateSalaryRangeApi,
  UpdateSalaryRangeApi,
  DeleteSalaryRangeApi,
  SearchSalaryRangeApi,
};
