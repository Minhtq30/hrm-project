import httpClient from "../Repository";
const GetAllAttendanceMonthApi = (data) => {
  return httpClient.get(
    `/personnel/shifts-detail/list?month=${data.month}&year=${data.year}&page=${data.page}`
  );
};
const SearchAttendanceMonthApi = (data) => {
  return httpClient.get(
    `/personnel/shifts-detail/list?month=${data.month}&year=${data.year}&s=${data.search}`
  );
};
export { GetAllAttendanceMonthApi, SearchAttendanceMonthApi };
