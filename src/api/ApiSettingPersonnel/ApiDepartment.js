import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
import httpClient from "../Repository";
const getAllDepartmentsApi = () => {
  return httpClient.get(`/system/department/list`);
};
const CreateDepartmentApi = (department) => {
  return httpClient.post(`/system/department/create`, department);
};
const DeleteDepartmentApi = (department) => {
  return httpClient.post(`/system/department/delete/${department}`);
};
const UpdateDepartmentApi = (department) => {
  return httpClient.post(
    `/system/department/update/${department.ID}`,
    department.data
  );
};
const ShowDepartmentDetailApi = (data) => {
  return httpClient.get(`/system/department/show/${data}`);
};
const SearchDepartmentsApi = (search) => {
  return httpClient.get(`/system/department/list?s=${search}`);
};
const ChangeStatusDepartmentApi = (dataID) => {
  return httpClient.post(
    `/system/department/change-status/${dataID.id}?status=${dataID.status}`
  );
};
//IMPORT DATA DEPARTMENT
export const ImportDepartmentApi = async (data, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/system/department/import`,
    data: data.value,
    headers: TOKEN(token),
  });
  return res;
};
export {
  getAllDepartmentsApi,
  CreateDepartmentApi,
  DeleteDepartmentApi,
  UpdateDepartmentApi,
  ShowDepartmentDetailApi,
  SearchDepartmentsApi,
  ChangeStatusDepartmentApi,
};
