import httpClient from "../Repository";
// Danh sách đơn từ của bạn
const GetAllApprovalTotalApi = (key) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/private-list?app_approval_current_status=${key}`
  );
};
const ShowDetailApprovalApi = (id) => {
  return httpClient.get(`/approval/show/${id}`);
};
// Danh sách đơn từ phòng ban
const GetAllApprovalDepartmentApi = (key, search) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/list-department?app_approval_current_status=${key}&s=${search}`
  );
};
// Danh sách tất cả đơn từ
const GetListAllApprovalApi = (key) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/list-all?app_approval_current_status=${key}`
  );
};
//Tìm tất cả đơn từ
const SearchAllApprovalApi = (key, search, department_ids, position_ids) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/list-all?app_approval_current_status=${key}&s=${search}&department_ids=[${department_ids}]&position_ids=[${position_ids}]`
  );
};
// Xóa đơn từ
const DeleteApprovalApi = (id) => {
  return httpClient.post(`/approval/delete/${id}`);
};
// Lấy thông tin ca làm việc của nhân sự
const GetShitUserByDayApi = (data) => {
  return httpClient.post(`/personnel/shifts-final/get-by-date`, data);
};
// Danh sách đơn từ tạo hộ
const GetAllApprovalCreatedApi = (key) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/list-approval-create-for?app_approval_current_status=${key}`
  );
};
//Tìm kiếm đơn tạo hộ
const SearchApprovalCreatedApi = (
  key,
  search,
  department_ids,
  position_ids
) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/list-approval-create-for?app_approval_current_status=${key}&s=${search}&department_ids=[${department_ids}]&position_ids=[${position_ids}]`
  );
};
// Danh sách đơn khác
const GetAllOtherApprovalApi = (id) => {
  return httpClient.get(`/approval/list-orther?personnel_id=${id}`);
};
const ExportAllApprovalApi = () => {
  return httpClient.get(`/approval/export`);
};
export {
  GetAllApprovalTotalApi,
  SearchAllApprovalApi,
  GetAllApprovalDepartmentApi,
  GetListAllApprovalApi,
  GetAllApprovalCreatedApi,
  SearchApprovalCreatedApi,
  ShowDetailApprovalApi,
  GetAllOtherApprovalApi,
  GetShitUserByDayApi,
  DeleteApprovalApi,
  ExportAllApprovalApi,
};
