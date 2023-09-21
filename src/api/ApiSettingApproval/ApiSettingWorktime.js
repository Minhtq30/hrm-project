import httpClient from "../Repository";
const GetAllWorktimeApi = () => {
  return httpClient.get(`/approval/personnel-privilege-reason/list`);
};
const CreateWorktimeApi = (worktime) => {
  return httpClient.post(
    `/approval/personnel-privilege-reason/create`,
    worktime
  );
};
const UpdateWorktimeApi = (worktime) => {
  return httpClient.post(
    `/approval/personnel-privilege-reason/update/${worktime.ID}`,
    worktime
  );
};
const DeleteWorktimeApi = (worktime) => {
  return httpClient.post(
    `/approval/personnel-privilege-reason/delete/${worktime}`
  );
};
export {
  GetAllWorktimeApi,
  CreateWorktimeApi,
  UpdateWorktimeApi,
  DeleteWorktimeApi,
};
