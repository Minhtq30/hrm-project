import axios from "axios";
import { API_URL, TOKEN } from "@/constants/ApiUrl";
export const getAllAssetOriginsApi = async (token, perPage) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventory/source?fields=${fields}`,
    url: `${API_URL}/assets/origin?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const CreateAssetOriginApi = async (assetOrigin, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/origin`,
    data: assetOrigin,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const DeleteAssetOriginApi = async (assetOrigin, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/assets/origin/${assetOrigin}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateAssetOriginApi = async (assetOrigin, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/origin/${assetOrigin.id}`,
    data: assetOrigin,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export const SearchAssetOriginsApi = async (token, search) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/origin?s=${search}`,
    headers: TOKEN(token),
  });
  return res.data;
};
