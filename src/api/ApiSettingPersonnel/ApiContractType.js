import httpClient from "../Repository";
const GetAllContractTypeApi = (perPage) => {
  return httpClient.get(
    `/setting/personnel/contract-type/list?per_page=${perPage}`
  );
};
const GetAllContractTypeEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/personnel/contract-type/list`);
};
const CreateContractTypeApi = (contractType) => {
  return httpClient.post(
    `/setting/personnel/contract-type/create`,
    contractType
  );
};
const UpdateContractTypeApi = (contractType) => {
  return httpClient.post(
    `/setting/personnel/contract-type/update/${contractType.ID}`,
    contractType
  );
};
const DeleteContractTypeApi = (contractType) => {
  return httpClient.post(
    `/setting/personnel/contract-type/delete/${contractType}`
  );
};
const GetShowContractTypeApi = (id) => {
  return httpClient.get(`/setting/personnel/contract-type/show/${id}`);
};
const SearchContractTypeApi = (search) => {
  return httpClient.get(`/setting/personnel/contract-type/list?s=${search}`);
};
export {
  GetAllContractTypeApi,
  GetAllContractTypeEndTimeLoadingApi,
  CreateContractTypeApi,
  UpdateContractTypeApi,
  DeleteContractTypeApi,
  GetShowContractTypeApi,
  SearchContractTypeApi,
};
