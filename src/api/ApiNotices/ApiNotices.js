import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
import httpClient from "../Repository";
export const GetAllNoticesApi = async (token, count) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/notice/list?count=${count}`,
    headers: TOKEN(token),
  });
  return res;
};
// const GetAllNoticesApi = (count) => {
//   return httpClient.get(`/notice/list?count=${count}`);
// };
const ReadedNoticesApi = (id) => {
  return httpClient.post(`/notice/read/${id}`);
};
export { ReadedNoticesApi };
