import httpClient from "../Repository";
const GetAllEthnicsApi = () => {
  return httpClient.get(`/system/people/list`);
};
const GetAllReligionApi = () => {
  return httpClient.get(`/system/religion/list`);
};
export { GetAllEthnicsApi, GetAllReligionApi };
