import httpClient from "../Repository";
const GetAllAttendanceAssignApi = (key) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(`/personnel/shifts-assign/list?type=${key}`);
};
const SearchAllAttendanceAssignApi = (data) => {
  return httpClient.get(
    `/personnel/shifts-assign/list?type=${data.key}&s=${data.search}`
  );
};
const CreateAttendanceAssignApi = (assign) => {
  return httpClient.post(`/personnel/shifts-assign/create`, assign);
};
const UpdateAttendanceAssignApi = (assign) => {
  return httpClient.post(
    `/personnel/shifts-assign/update/${assign.ID}`,
    assign
  );
};
const DeleteAttendanceAssignApi = (assign) => {
  return httpClient.post(`/personnel/shifts-assign/delete/${assign}`);
};
const ShowDetailAttendanceAssignApi = (id) => {
  return httpClient.get(`/personnel/shifts-assign/show/${id}`);
};
// Duyệt/Không phân ca
const ConfirmAttendanceAssignApi = (dataAssign) => {
  return httpClient.post(
    `/personnel/shifts-assign/change-approval-status/${dataAssign.id}`,
    dataAssign.data
  );
};
// Hoàn duyệt phân ca
const ReturnAttendanceAssignApi = (dataAssign) => {
  return httpClient.post(
    `/personnel/shifts-assign/revert-shift-assign/${dataAssign.id}`,
    dataAssign.data
  );
};
// Danh sách người theo phòng ban
const ListPersonnelByDepartmentApi = (arr_id) => {
  let str_id = arr_id.toString();
  return httpClient.get(`personnel/list-by-department_id?department=${str_id}`);
};
export {
  GetAllAttendanceAssignApi,
  SearchAllAttendanceAssignApi,
  CreateAttendanceAssignApi,
  UpdateAttendanceAssignApi,
  DeleteAttendanceAssignApi,
  ShowDetailAttendanceAssignApi,
  ConfirmAttendanceAssignApi,
  ReturnAttendanceAssignApi,
  ListPersonnelByDepartmentApi,
};
