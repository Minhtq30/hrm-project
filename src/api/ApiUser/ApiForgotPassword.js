import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const TestEmailApi = async (data) => {
  const res = await axios({
    method: "POST",
    data: data,
    url: `${API_URL}/auth/forgot-password`,
  });
  return res.data;
};
export const ChangePasswordApi = async (data) => {
  const res = await axios({
    method: "POST",
    data: data,
    url: `${API_URL}/auth/reset-password`,
  });
  return res.data;
};
