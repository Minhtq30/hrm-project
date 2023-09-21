import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
import httpClient from "../Repository";
const GetAllPersonnelsNoPaginateApi = () => {
  return httpClient.get(`/personnel/get-all-no-paginate`);
};
const GetAllPersonnelsApi = () => {
  return httpClient.get(`/personnel/list`);
};
const GetCustomPersonnelExportApi = (perPage, fieldArr) => {
  return httpClient.get(
    `/personnel/list?per_page=${perPage}&fields=${fieldArr}`
  );
};
const GetAllPersonnelExportApi = (perPage) => {
  return httpClient.get(`/personnel/list?per_page=${perPage}`);
};
const ExportAllPersonnelApi = () => {
  return httpClient.get(`/personnel/export`);
};
const GetAllPersonnelsEndTimeLoadingApi = (key) => {
  return httpClient.get(`/personnel/list?job_status=${key}`);
};
const CreatePersonnelsApi = (personnel) => {
  return httpClient.post(`/personnel/create`, personnel);
};
const UpdatePersonnelApi = (personnel) => {
  return httpClient.post(`/personnel/update/${personnel.ID}`, personnel);
};
const DeletePersonnelApi = (id) => {
  return httpClient.post(`/personnel/delete/${id}`);
};
const GetShowDetailPersonnelApi = (id) => {
  return httpClient.get(`/personnel/show/${id}`);
};
const SearchPersonnelApi = (data) => {
  return httpClient.get(
    `/personnel/list?job_status=${data.key}&s=${data.search}&department_ids=[${data.department_ids}]&position_ids=[${data.position_ids}]`
  );
};
const CreateAccountApi = (account) => {
  return httpClient.post(`/user/${account.ID}/create`, account);
};
const SearchPersonnelInputApi = (search) => {
  return httpClient.get(`/personnel/search?s=${search}`);
};
// Nhận mã nhân viên tiếp theo
const GetLastCodePersonnelApi = (code) => {
  return httpClient.get(`/personnel/last-code?key_code=${code}`);
};
//IMPORT hồ sơ nhân sự
export const ImportPersonnelApi = async (data, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/personnel/import`,
    data: data.value,
    headers: TOKEN(token),
  });
  return res;
};
// Danh sách nhân sự nhận đơn từ
const SearchPersonnelsApprovalApi = (search) => {
  return httpClient.get(`/personnel/list-approval-create-for?s=${search}`);
};
// Lây danh sách lịch sử công việc
const GetAllHistoryWorkApi = (id) => {
  return httpClient.get(
    `/personnel/work-history/get-old-data?personnel_id=${id}`
  );
};

// Cập nhật lịch sử công việc
const UpdateHistoryWorkApi = (data) => {
  return httpClient.post(`/personnel/work-history/create`, data);
};

// Cập nhật công trong ngày
const UpdatePersonnelWorkDayApi = (data) => {
  return httpClient.post(`/personnel/check-attendance/manual-create`, data);
};
const DeleteManualPersonnelWorkDayApi = (data) => {
  console.log("Data: ", data);
  return httpClient.post(`/personnel/check-attendance/manual-delete`, data);
};

// Cập nhật kiêm nhiệm
const UpdateConcurrentlyApi = (data) => {
  return httpClient.post(`/personnel/concurrent/create`, data);
};

export {
  GetAllPersonnelsApi,
  GetAllPersonnelsNoPaginateApi,
  GetAllPersonnelsEndTimeLoadingApi,
  CreatePersonnelsApi,
  UpdatePersonnelApi,
  DeletePersonnelApi,
  GetShowDetailPersonnelApi,
  SearchPersonnelApi,
  CreateAccountApi,
  SearchPersonnelInputApi,
  GetLastCodePersonnelApi,
  SearchPersonnelsApprovalApi,
  GetAllHistoryWorkApi,
  UpdateHistoryWorkApi,
  UpdateConcurrentlyApi,
  GetCustomPersonnelExportApi,
  GetAllPersonnelExportApi,
  ExportAllPersonnelApi,
  UpdatePersonnelWorkDayApi,
  DeleteManualPersonnelWorkDayApi,
};
