import httpClient from "../Repository";
const GetAllPersonnelCodeApi = () => {
  return httpClient.get(`/setting/option/list-header-code-personnel`);
};
const ChangePersonnelCodeApi = (id) => {
  return httpClient.post(`/setting/option/update-header-code-personnel/${id}`);
};
const GetPersonnelCodeApi = () => {
  return httpClient.get(`/setting/option/get-header-code-personnel`);
};
const HideShowPersonnelCodeApi = (data) => {
  return httpClient.post(`/setting/option/setting-header-code-personnel`, data);
};
export {
  GetAllPersonnelCodeApi,
  ChangePersonnelCodeApi,
  GetPersonnelCodeApi,
  HideShowPersonnelCodeApi,
};
