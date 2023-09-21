import httpClient from "../Repository";
const GetAllInsuranceApi = (data) => {
  return httpClient.get(
    `/personnel/insurance-updown/list?month=${data.month}&year=${data.year}`
  );
};
const GetAllInsuranceIncreaseApi = (data) => {
  return httpClient.get(
    `/personnel/insurance-updown/list-up-new?month=${data.month}&year=${data.year}`
  );
};
const GetAllInsuranceReducedApi = (data) => {
  return httpClient.get(
    `/personnel/insurance-updown/list-down-month?month=${data.month}&year=${data.year}`
  );
};
const UpdateInsuranceApi = (data) => {
  return httpClient.post(`/personnel/insurance-updown/create`, data);
};
// Mã vùng đăng ki BHXH
const GetAllPremiumCodeApi = () => {
  return httpClient.get(`/setting/personnel/premium-code/list`);
};
// Địa chỉ đăng kí khám bệnh
const GetAllPremiumPlaceApi = (id) => {
  return httpClient.get(
    `/setting/personnel/premium-place/list?insurance_registration_place_id=${id}`
  );
};
export {
  GetAllInsuranceApi,
  GetAllInsuranceIncreaseApi,
  GetAllInsuranceReducedApi,
  UpdateInsuranceApi,
  GetAllPremiumCodeApi,
  GetAllPremiumPlaceApi,
};
