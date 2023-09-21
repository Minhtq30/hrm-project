import httpClient from "../Repository";
const ConfirmApprovalApi = (data) => {
  return httpClient.post(`/approval/approved-approval/${data.id}`, data.data);
};
const RevertApprovalApi = (data) => {
  return httpClient.post(
    `/approval/revert-approved-approval/${data.id}`,
    data.data
  );
};
// Danh sách đơn từ bạn duyệt
const GetAllApprovalApi = (key) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/private-list-need-approval?app_approval_current_status=${key}`
  );
};
//tìm kiếm đơn bạn duyệt
const SearchAllApprovalApi = (key, search, department_ids, position_ids) => {
  if (key == "ALL") {
    key = "";
  }
  return httpClient.get(
    `/approval/private-list-need-approval?app_approval_current_status=${key}&s=${search}&department_ids=[${department_ids}]&position_ids=[${position_ids}]`
  );
};
// Danh sách người có quyền duyệt đơn
const getAllPersonnelApproveApi = (search, index) => {
  return httpClient.get(
    `/user/has-role-approval?list_user=list_user_role_approval_leve_${index}&s=${search}`
  );
};

export {
  ConfirmApprovalApi,
  RevertApprovalApi,
  GetAllApprovalApi,
  SearchAllApprovalApi,
  getAllPersonnelApproveApi,
};
