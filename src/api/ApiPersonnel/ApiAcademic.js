import httpClient from "../Repository";
const GetAllAcademicsApi = () => {
  return httpClient.get(`/setting/level-academic`);
};
export { GetAllAcademicsApi };
