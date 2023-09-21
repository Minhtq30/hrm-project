import httpClient from "../Repository";
const GetTimekeepWorkStandardApi = () => {
  return httpClient.post(`/timekeep-attendance/data-setting-work-standard`);
};
const UpdateTimekeepWorkStandardApi = (data) => {
  return httpClient.post(`/timekeep-attendance/setting-work-standard`, data);
};
export { GetTimekeepWorkStandardApi, UpdateTimekeepWorkStandardApi };
