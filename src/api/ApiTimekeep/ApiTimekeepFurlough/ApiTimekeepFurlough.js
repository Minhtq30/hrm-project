import httpClient from "../../Repository";
// Month
const GetAllTimekeepFurloughMonthApi = (data) => {
  return httpClient.get(
    `/timekeep/furlough/month?month=${data.month}&year=${data.year}`
  );
};
const SearchTimekeepFurloughMonthApi = (data) => {
  return httpClient.get(
    `/timekeep/furlough/month?month=${data.month}&year=${data.year}&s=${data.search}&department_id=${data.idDepartment}&position_id=${data.idPosition}`
  );
};
// Year
const GetAllTimekeepFurloughYearApi = (data) => {
  return httpClient.get(`/timekeep/furlough/year?year=${data.year}`);
};
const SearchTimekeepFurloughYearApi = (data) => {
  return httpClient.get(
    `/timekeep/furlough/year?year=${data.year}&s=${data.search}&department_id=${data.idDepartment}&position_id=${data.idPosition}`
  );
};
const SearchTimekeepFurloughDepartmentApi = (data) => {
  return httpClient.get(
    `/timekeep/furlough/month?month=${data.month}&year=${data.year}&department_id=${data.id}`
  );
};
const SearchTimekeepFurloughYearDepartmentApi = (data) => {
  return httpClient.get(
    `/timekeep/furlough/year?year=${data.year}&department_id=${data.id}`
  );
};
// Chi tiết
const ShowDetailPersonnelFurloughApi = (id) => {
  return httpClient.post(`/timekeep/furlough/${id}`);
};
//import quản lý phép.
const ImportTimekeepFurloughApi = (data) => {
  return httpClient.post(`/personnel/furlough-year/import`, data.value);
};
const RecalcFurloughMonthApi = (data) => {
  return httpClient.post(`/timekeep/furlough/recalc-furlough-month`, data);
};
//export bảng phép
const getDataExportAllFurloughYearApi = (year) => {
  return httpClient.get(`/personnel/furlough-year/export?year=${year}`);
};
export {
  GetAllTimekeepFurloughMonthApi,
  SearchTimekeepFurloughMonthApi,
  GetAllTimekeepFurloughYearApi,
  SearchTimekeepFurloughYearApi,
  SearchTimekeepFurloughDepartmentApi,
  SearchTimekeepFurloughYearDepartmentApi,
  ShowDetailPersonnelFurloughApi,
  ImportTimekeepFurloughApi,
  RecalcFurloughMonthApi,
  getDataExportAllFurloughYearApi,
};
