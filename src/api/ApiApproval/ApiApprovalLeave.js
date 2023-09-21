import { LEAVE_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalLeaveApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${LEAVE_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalLeaveApi = (leave) => {
  return httpClient.post(`/approval/personnel-leave/create`, leave);
};
const UpdateApprovalLeaveApi = (leave) => {
  return httpClient.post(`/approval/personnel-leave/update/${leave.ID}`, leave);
};
const DeleteApprovalLeaveApi = (leave) => {
  return httpClient.post(`/approval/personnel-leave/delete/${leave}`);
};
// Lấy dữ liệu phép năm của nhân viên
const GetFurloughDetailUserApi = (data) => {
  return httpClient.post(`/personnel/furlough-year/user-detail`, data);
};
export {
  GetAllApprovalLeaveApi,
  CreateApprovalLeaveApi,
  UpdateApprovalLeaveApi,
  DeleteApprovalLeaveApi,
  GetFurloughDetailUserApi,
};
