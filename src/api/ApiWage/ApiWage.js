import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
export const GetAllWagesApi = async (token, data) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/personnel/wage/detail-list?month=${data.month}&year=${data.year}`,
    headers: TOKEN(token),
  });
  return res.data;
};
