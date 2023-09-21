import httpClient from "../Repository";
const GetAllBanksApi = () => {
  return httpClient.get(`/system/bank/list`);
};
export { GetAllBanksApi };
