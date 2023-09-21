import httpClient from "../Repository";
const GetAllCityApi = () => {
  return httpClient.get(`/system/location/list?type=2`);
};
const GetAllDistrictsApi = (id) => {
  return httpClient.get(`/system/location/list?parent_id=${id}`);
};
const GetAllWardsApi = (id) => {
  return httpClient.get(`/system/location/list?parent_id=${id}`);
};
const GetAllCountryApi = () => {
  return httpClient.get(`/system/location/list?type=1`);
};
const GetAllLocationApi = () => {
  return httpClient.get(`/system/location/list`);
};
export {
  GetAllCityApi,
  GetAllDistrictsApi,
  GetAllWardsApi,
  GetAllCountryApi,
  GetAllLocationApi,
};
