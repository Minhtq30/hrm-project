import { SHIFTREGISTER_APPROVAL } from "@/constants/ApiUrl";
import { FormatTypeApiApproval } from "@/constants/FormatAll";
import httpClient from "../Repository";
const GetAllApprovalShiftresgisterApi = (type, menu) => {
  if (menu == "ALL") {
    menu = "";
  }
  type = FormatTypeApiApproval(type);
  return httpClient.get(
    `/${type}?app_approval_type=${SHIFTREGISTER_APPROVAL}&app_approval_current_status=${menu}`
  );
};
const CreateApprovalShiftresgisterApi = (shiftresgister) => {
  return httpClient.post(
    `/approval/personnel-shift-register/create`,
    shiftresgister
  );
};
const UpdateApprovalShiftresgisterApi = (shiftresgister) => {
  return httpClient.post(
    `/approval/personnel-shift-register/update/${shiftresgister.ID}`,
    shiftresgister
  );
};
const DeleteApprovalShiftresgisterApi = (shiftresgister) => {
  return httpClient.post(
    `/approval/personnel-shift-register/delete/${shiftresgister}`,
    shiftresgister
  );
};
export {
  GetAllApprovalShiftresgisterApi,
  CreateApprovalShiftresgisterApi,
  UpdateApprovalShiftresgisterApi,
  DeleteApprovalShiftresgisterApi,
};
