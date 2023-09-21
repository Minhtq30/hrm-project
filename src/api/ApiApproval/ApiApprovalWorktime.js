import { WORKTIME_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalWorktimeApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${WORKTIME_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalWorktimeApi = (worktime) => {
  return httpClient.post(
    `/approval/personnel-privilege-application/create`,
    worktime
  );
};
const UpdateApprovalWorktimeApi = (worktime) => {
  return httpClient.post(
    `/approval/personnel-privilege-application/update/${worktime.ID}`,
    worktime
  );
};
const DeleteApprovalWorktimeApi = (worktime) => {
  return httpClient.post(
    `/approval/personnel-privilege-application/delete/${worktime}`
  );
};

export {
  GetAllApprovalWorktimeApi,
  CreateApprovalWorktimeApi,
  UpdateApprovalWorktimeApi,
  DeleteApprovalWorktimeApi,
};
