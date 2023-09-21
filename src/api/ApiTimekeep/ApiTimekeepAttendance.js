import httpClient from "../Repository";
import { API_URL } from "@/constants/ApiUrl";
const GetAllTimekeepAttendanceApi = (data) => {
  let date = new Date();
  const urlSearch = new URLSearchParams(window.location.search);
  if (!(data.year > 0)) {
    data.year = date.getFullYear();
  }

  urlSearch.set("year", data.year);

  if (!(data.month > 0)) {
    data.month = date.getMonth() + 1;
  }
  urlSearch.set("month", data.month);

  if (urlSearch.has("search")) {
    urlSearch.set("s", urlSearch.get("search"));
  }

  return httpClient.get(
    `/personnel/check-attendance/list?${urlSearch}`
    // `/personnel/check-attendance/list?month=${data.month}&year=${data.year}&page=${data.page}`
  );
};
const GetAllTimekeepAttendanceExportApi = (data) => {
  let date = new Date();
  // const urlSearch = new URLSearchParams(window.location.search);
  if (!(data.year > 0)) {
    data.year = date.getFullYear();
  }

  if (!(data.month > 0)) {
    data.month = date.getMonth() + 1;
  }

  // if (urlSearch.has("search")) {
  // }

  return httpClient.get(
    // `/personnel/check-attendance/list?${urlSearch}`
    `/personnel/check-attendance/list?month=${data.month}&year=${data.year}&per_page=${data.page}`
  );
};
const ExportLogAttendanceApi = (data) => {
  return httpClient.post(`/attendance-logtime/export`, data);
};
const SearchTimekeepAttendanceApi = (data) => {
  const searchURL = new URL(window.location);

  // window.history.pushState({}, "", searchURL);
  let date = new Date();

  let lsUrl = new URL(`${API_URL}/personnel/check-attendance/list`);
  if (data.year > 0) {
    lsUrl.searchParams.set("year", data.year);
    searchURL.searchParams.set("year", data.year);
  } else {
    lsUrl.searchParams.set("year", date.getFullYear());
  }

  if (data.month > 0) {
    lsUrl.searchParams.set("month", data.month);
    searchURL.searchParams.set("month", data.month);
  } else {
    lsUrl.searchParams.set("month", date.getMonth() + 1);
  }

  if (data.search != "") {
    lsUrl.searchParams.set("s", data.search);
    searchURL.searchParams.set("search", data.search);
  }

  window.history.pushState({}, "", searchURL);

  return httpClient.get(
    // `/personnel/check-attendance/list?month=${data.month}&year=${data.year}&s=${data.search}`
    lsUrl
  );
};
const ShowDetailTimekeepAttendanceApi = (data) => {
  return httpClient.get(
    `/timekeep-attendance/all-time-checkinout?person_id=${data.id}&date=${data.date}`
  );
};
const ShowDetailApprovalTimekeepApi = (data) => {
  return httpClient.get(
    `/approval/list-by-person-and-date?person_id=${data.id}&date=${data.date}`
  );
};
// Tính toán lại công ca
const RecalculateMeritAndPenaltyApi = (data) => {
  return httpClient.post(
    `/personnel/check-attendance/reload-data-by-personnel-id`,
    data
  );
};
//thêm log chấm công
const AddLogManualApi = (attendance_data) => {
  return httpClient.post(`/timekeep-attendance/manual-create`, attendance_data);
};
//lấy log chấm thủ công đã thêm
const GetLogManualApi = (id) => {
  return httpClient.get(`/timekeep-attendance/old-manual-created/${id}`);
};
//Khóa bảng chấm công, đơn
const LockAttendanceApi = (data) => {
  return httpClient.post(`/personnel/attendance/cottar`, data);
};
//Mở khóa bảng chấm công, đơn
const UnlockAttendanceApi = (data) => {
  return httpClient.post(`/personnel/attendance/revert-cottar`, data);
};
export {
  GetAllTimekeepAttendanceApi,
  SearchTimekeepAttendanceApi,
  ShowDetailTimekeepAttendanceApi,
  ShowDetailApprovalTimekeepApi,
  RecalculateMeritAndPenaltyApi,
  GetAllTimekeepAttendanceExportApi,
  ExportLogAttendanceApi,
  AddLogManualApi,
  GetLogManualApi,
  LockAttendanceApi,
  UnlockAttendanceApi,
};
