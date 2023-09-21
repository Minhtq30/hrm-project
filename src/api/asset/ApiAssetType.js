import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
export const getAllAssetTypesApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventory/source?fields=${fields}`,
    url: `${API_URL}/assets/type?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateAssetTypeApi = async (data, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/type`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteAssetTypeApi = async (assetType, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/assets/type/${assetType}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateAssetTypeApi = async (assetType, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/type/${assetType.id}`,
    data: assetType,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export const SearchAssetTypesApi = async (token, search) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventory/source?fields=${fields}`,
    url: `${API_URL}/assets/type?s=${search}`,
    headers: TOKEN(token),
  });
  return res.data;
};
