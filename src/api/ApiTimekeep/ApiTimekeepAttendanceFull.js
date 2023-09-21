import httpClient from "../Repository";
const GetAllTimekeepAttendanceFullApi = () => {
  return httpClient.get(`/personnel/full-attendance/list`);
};
const CreateAttendanceFullApi = (data) => {
  return httpClient.post(`/personnel/full-attendance/create`, data);
};
const DeleteAttendanceFullApi = (id) => {
  return httpClient.post(`personnel/full-attendance/delete/${id}`);
};
const UpdateAttendanceFullApi = (data) => {
  return httpClient.post(
    `personnel/full-attendance/update/${data.ID}`,
    data.data
  );
};
export {
  GetAllTimekeepAttendanceFullApi,
  CreateAttendanceFullApi,
  DeleteAttendanceFullApi,
  UpdateAttendanceFullApi,
};
