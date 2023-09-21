import httpClient from "../Repository";
const OldSettingCompensatoryApi = () => {
  return httpClient.get(`/setting/compensatory/get-old-data-compensatory`);
};
const UpdateSettingCompensatoryApi = (data) => {
  return httpClient.post(`/setting/compensatory`, data);
};
const OldSettingFurloughApi = () => {
  return httpClient.get(`/setting/furlough/get-old-data-furlough`);
};
const UpdateSettingFurloughApi = (data) => {
  return httpClient.post(`/setting/furlough`, data);
};
export {
  OldSettingCompensatoryApi,
  UpdateSettingCompensatoryApi,
  OldSettingFurloughApi,
  UpdateSettingFurloughApi,
};
