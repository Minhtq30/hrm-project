import httpClient from "../Repository";
const SettingInsuranceApi = () => {
  return httpClient.get(`/setting/insurance/get-old-data-insurance`);
};
const UpdateSettingInsuranceApi = (data) => {
  return httpClient.post(`/setting/insurance`, data);
};
export { SettingInsuranceApi, UpdateSettingInsuranceApi };
