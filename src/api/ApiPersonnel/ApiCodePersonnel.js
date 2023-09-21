import httpClient from "../Repository";
const GetAllCodePersonnelApi = () => {
  return httpClient.get(`/setting/option/list-header-code-personnel`);
};
const GetCodePersonnelActiveApi = () => {
  return httpClient.get(`/setting/option/get-header-code-personnel`);
};
export { GetAllCodePersonnelApi, GetCodePersonnelActiveApi };
