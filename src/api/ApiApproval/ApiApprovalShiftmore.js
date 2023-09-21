import { SHIFTMORE_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalShiftmoreApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${SHIFTMORE_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalShiftmoreApi = (shiftmore) => {
  return httpClient.post(`/approval/personnel-shiftmore/create`, shiftmore);
};
const UpdateApprovalShiftmoreApi = (shiftmore) => {
  return httpClient.post(
    `/approval/personnel-shiftmore/update/${shiftmore.ID}`,
    shiftmore
  );
};
const DeleteApprovalShiftmoreApi = (shiftmore) => {
  return httpClient.post(`/approval/personnel-shiftmore/delete/${shiftmore}`);
};
export {
  GetAllApprovalShiftmoreApi,
  CreateApprovalShiftmoreApi,
  UpdateApprovalShiftmoreApi,
  DeleteApprovalShiftmoreApi,
};
