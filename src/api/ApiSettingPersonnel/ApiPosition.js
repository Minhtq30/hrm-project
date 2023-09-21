import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
import httpClient from "../Repository";
const GetAllPositionsApi = (perPage) => {
  return httpClient.get(`/setting/position/list?per_page=${perPage}`);
};
const GetAllPositionsEndTimeLoadingApi = () => {
  return httpClient.get(`/setting/position/list`);
};
const CreatePositionApi = (position) => {
  return httpClient.post(`/setting/position/create`, position);
};
const UpdatePositionApi = (position) => {
  return httpClient.post(`/setting/position/update/${position.ID}`, position);
};
const DeletePositionApi = (position) => {
  return httpClient.post(`/setting/position/delete/${position}`);
};
const SearchPositionsApi = (search) => {
  return httpClient.get(`/setting/position/list?s=${search}`);
};
//IMPORT DATA POSITION
export const ImportPositionIDApi = async (data, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/setting/position/import`,
    data: data.value,
    headers: TOKEN(token),
  });
  return res;
};
export {
  GetAllPositionsApi,
  GetAllPositionsEndTimeLoadingApi,
  CreatePositionApi,
  UpdatePositionApi,
  DeletePositionApi,
  SearchPositionsApi,
};
