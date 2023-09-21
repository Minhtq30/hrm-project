import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
import httpClient from "../Repository";
const GetAllPostCompanyApi = (count) => {
  return httpClient.get(`/social/post/list-company?count=${count}`);
};
export const GetAllNoticesCompanyApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/social/post/list-notices`,
    headers: TOKEN(token),
  });
  return res;
};
// const GetAllNoticesCompanyApi = () => {
//   return httpClient.get(`/social/post/list-notices`);
// };
export { GetAllPostCompanyApi };
