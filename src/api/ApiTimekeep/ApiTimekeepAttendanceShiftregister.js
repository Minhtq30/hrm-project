import httpClient from "../Repository";
const GetAllAttendanceShiftregisterApi = (data) => {
  return httpClient.get(
    `/personnel/shifts-register/list?month=${data.month}&year=${data.year}&page=${data.page}`
  );
};
const SearchAttendanceShiftregisterApi = (data) => {
  return httpClient.get(
    `/personnel/shifts-register/list?month=${data.month}&year=${data.year}&s=${data.search}`
  );
};
export { GetAllAttendanceShiftregisterApi, SearchAttendanceShiftregisterApi };
