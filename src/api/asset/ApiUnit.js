import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllUnitsApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/system/asset-unit/list?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateUnitApi = async (unit, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/system/asset-unit/create`,
    data: unit,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteUnitApi = async (unit, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/system/asset-unit/delete/${unit}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateUnitApi = async (unit, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/system/asset-unit/update/${unit.ID}`,
    data: unit,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
