import { OVERTIME_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalOvertimeApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${OVERTIME_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalOvertimeApi = (overtime) => {
  return httpClient.post(
    `/approval/personnel-overtime-application/create`,
    overtime
  );
};
const UpdateApprovalOvertimeApi = (overtime) => {
  return httpClient.post(
    `/approval/personnel-overtime-application/update/${overtime.ID}`,
    overtime
  );
};
const DeleteApprovalOvertimeApi = (absence) => {
  return httpClient.post(
    `/approval/personnel-overtime-application/delete/${absence}`
  );
};
export {
  GetAllApprovalOvertimeApi,
  CreateApprovalOvertimeApi,
  UpdateApprovalOvertimeApi,
  DeleteApprovalOvertimeApi,
};
