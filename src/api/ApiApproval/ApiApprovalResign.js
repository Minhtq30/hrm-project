import { RESIGN_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalResignApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${RESIGN_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalResignApi = (resign) => {
  return httpClient.post(
    `/approval/personnel-leave-application/create`,
    resign
  );
};
const UpdateApprovalResignApi = (resign) => {
  return httpClient.post(
    `/approval/personnel-leave-application/update/${resign.ID}`,
    resign
  );
};
const DeleteApprovalResignApi = (resign) => {
  return httpClient.post(
    `/approval/personnel-leave-application/delete/${resign}`
  );
};
// Danh sách lý do xin thôi việc
const GetAllReasonLeaveApi = () => {
  return httpClient.get(`/setting/leave-application-type/list`);
};
export {
  GetAllApprovalResignApi,
  CreateApprovalResignApi,
  UpdateApprovalResignApi,
  DeleteApprovalResignApi,
  GetAllReasonLeaveApi,
};
