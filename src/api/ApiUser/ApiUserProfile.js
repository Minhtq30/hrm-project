import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
import httpClient from "../Repository";
export const GetUserProfileApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/auth/profile`,
    headers: TOKEN(token),
  });
  return res.data;
};
const ShowDetailUserApi = (id) => {
  return httpClient.get(`/personnel/show/${id}`);
};
const ChangeColorApi = (style) => {
  return httpClient.post(`/user/change-style`, style);
};
const ChangeAvatarApi = (avatar) => {
  return httpClient.post(`/auth/change-avatar`, avatar);
};
const ChangeBackgroundApi = (avatar) => {
  return httpClient.post(`/auth/change-banner`, avatar);
};
const ChangePasswordApi = (data) => {
  return httpClient.post(`/user/change-password`, data);
};
// Thông tin phép năm
const UserFurloughApi = (id) => {
  return httpClient.post(`/timekeep/furlough/${id}`, id);
};
// Thông tin nghỉ bù
const UserCompensatoryApi = (id) => {
  return httpClient.get(`/timekeep/compensatory/${id}`);
};
// Chấm công
const UserAttendanceApi = (data) => {
  return httpClient.get(
    `/timekeep-attendance/private?year=${data.year}&month=${data.month}`
  );
};
export {
  ShowDetailUserApi,
  ChangeColorApi,
  ChangeAvatarApi,
  ChangeBackgroundApi,
  ChangePasswordApi,
  UserFurloughApi,
  UserCompensatoryApi,
  UserAttendanceApi,
};
export const UserLoginApi = async (user) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/login`,
    data: user,
  });
  return res.data;
};
export const UserLogoutApi = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/auth/logout`,
    headers: TOKEN(token),
  });
  return res.data;
};
