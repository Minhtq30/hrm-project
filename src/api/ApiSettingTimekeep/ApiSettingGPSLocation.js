import httpClient from "../Repository";
const GetAllGPSLocationApi = () => {
  return httpClient.get(`/personnel/gps-location/list`);
};
const CreateGPSLocationApi = (location) => {
  return httpClient.post(`/personnel/gps-location/create`, location);
};
const UpdateGPSLocationApi = (location) => {
  return httpClient.post(
    `/personnel/gps-location/update/${location.ID}`,
    location
  );
};
const DeleteGPSLocationApi = (location) => {
  return httpClient.post(`/personnel/gps-location/delete/${location}`);
};
const SearchGPSLocationApi = (search) => {
  return httpClient.get(`/personnel/gps-location/list?s=${search}`);
};
export {
  GetAllGPSLocationApi,
  CreateGPSLocationApi,
  UpdateGPSLocationApi,
  DeleteGPSLocationApi,
  SearchGPSLocationApi,
};
