import httpClient from "../Repository";
// Danh sách nghỉ bù theo tháng
const GetAllTimekeepCompensatoryMonthApi = (data) => {
  return httpClient.get(
    `/timekeep/compensatory/month?month=${data.month}&year=${data.year}`
  );
};
// Danh sách nghỉ bù theo năm
const GetAllTimekeepCompensatoryYearApi = (data) => {
  return httpClient.get(`/timekeep/compensatory/year?year=${data.year}`);
};
// Chi tiết nghỉ bù của nhân sự
const ShowDetailPersonnelCompensatoryApi = (id) => {
  return httpClient.get(`/timekeep/compensatory/${id}`);
};
// Cập nhật nghỉ bù
const UpdateCompensatoryPersonnelApi = (data) => {
  return httpClient.post(`/timekeep/compensatory/manual`, data);
};
const SearchTimekeepFurloughApi = (data) => {
  return httpClient.get(
    `/timekeep/compensatory/year?year=${data.year}&s=${data.search}&department_id=${data.idDepartment}&position_id=${data.idPosition}`
  );
};
//export bảng nghỉ bù
const getDataExportAllCompensatoryYearApi = (year) => {
  return httpClient.get(`/timekeep/compensatory/export?year=${year}`);
};
export {
  GetAllTimekeepCompensatoryMonthApi,
  GetAllTimekeepCompensatoryYearApi,
  ShowDetailPersonnelCompensatoryApi,
  UpdateCompensatoryPersonnelApi,
  SearchTimekeepFurloughApi,
  getDataExportAllCompensatoryYearApi,
};
