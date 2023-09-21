import httpClient from "../Repository";
const GetAllViolation = () => {
  return httpClient.get(`/administrative/5s-violation/list`);
};
const Create5sViolationApi = (data) => {
  return httpClient.post(`/administrative/5s-violation/create`, data);
};
const Update5sViolationApi = (data, id) => {
  return httpClient.post(`/administrative/5s-violation/update/${id}`, data);
};
const Detail5sViolationApi = (id) => {
  return httpClient.post(`/administrative/5s-violation/show/${id}`);
};
// Lấy dữ liệu phép năm của nhân viên
// const GetFurloughDetailUserApi = (data) => {
//   return httpClient.post(`/personnel/furlough-year/user-detail`, data);
// };

//Danh sách trạng thái theo phòng ban(cho map)
const GetAllStatusPersonnelOffice = () => {
  return httpClient.get(`/administrative/list-status-personnel-office`);
};
//Tạo phòng ban trên map
const CreateDepartmentOnMapApi = (data) => {
  return httpClient.post(`/administrative/office-map/create`, data);
};
//Chi tiết phòng ban trên map
const GetDetailMapDepartmentApi = (id) => {
  return httpClient.get(`/administrative/office-map/show/${id}`);
};
//Sửa phòng ban trên map
const UpdateDepartmentOnMapApi = (data, id) => {
  return httpClient.post(`/administrative/office-map/update/${id}`, data);
};
//Xóa phòng ban trên map
const DeleteDepartmentOnMapApi = (id) => {
  return httpClient.post(`/administrative/office-map/delete/${id}`);
};
// Danh sách nhân sựu theo phòng ban
const ListPersonnelByDepartmentMapApi = (arr_id) => {
  let str_id = arr_id.toString();
  return httpClient.get(`personnel/list-by-department_id?department=${str_id}`);
};
export {
  GetAllViolation,
  Create5sViolationApi,
  Update5sViolationApi,
  Detail5sViolationApi,
  GetAllStatusPersonnelOffice,
  ListPersonnelByDepartmentMapApi,
  CreateDepartmentOnMapApi,
  UpdateDepartmentOnMapApi,
  DeleteDepartmentOnMapApi,
  GetDetailMapDepartmentApi,
  //   GetFurloughDetailUserApi,
};
