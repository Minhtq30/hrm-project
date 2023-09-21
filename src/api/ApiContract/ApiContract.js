import httpClient from "../Repository";
const GetAllContractApi = (type) => {
  if (type == "ALL") {
    type = "";
  }
  return httpClient.get(`/personnel/contract/list?contract_type=${type}`);
};
const ShowContractDetailApi = (id) => {
  return httpClient.get(`/personnel/contract/show/${id}`);
};
const CreateContractApi = (contract) => {
  return httpClient.post(`/personnel/contract/create`, contract);
};
const UpdateContractApi = (contract) => {
  return httpClient.post(`/personnel/contract/update/${contract.ID}`, contract);
};
const DeleteContractApi = (id) => {
  return httpClient.post(`/personnel/contract/delete/${id}`);
};
const SearchContractApi = (id) => {
  return httpClient.get(`/personnel/contract/list?ID=${id}`);
};
const SearchContractsApi = (search, type) => {
  return httpClient.get(
    `/personnel/contract/list?contract_type=${type}&s=${search}`
  );
};
const ChangeStatusToliquidationApi = (contractID) => {
  return httpClient.post(
    `/personnel/contract/change-liquidation/${contractID}`
  );
};
const ChangeStatusToIsvalidApi = (contractID) => {
  return httpClient.post(`/personnel/contract/change-isvalid/${contractID}`);
};
//IMPORT hợp đồng
const ImportContractApi = (data) => {
  return httpClient.post(`/personnel/contract/import`, data.value);
};

export {
  GetAllContractApi,
  ShowContractDetailApi,
  CreateContractApi,
  UpdateContractApi,
  DeleteContractApi,
  SearchContractApi,
  SearchContractsApi,
  ChangeStatusToliquidationApi,
  ChangeStatusToIsvalidApi,
  ImportContractApi,
};
