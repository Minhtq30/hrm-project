import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllAssetGroupsApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventory/source?fields=${fields}`,
    url: `${API_URL}/assets/group?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAllAssetGroupsApi1 = async (token) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventory/source?fields=${fields}`,
    url: `${API_URL}/assets/group/all-childs`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
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

export const CreateAssetGroupApi = async (assetGroup, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/group`,
    data: assetGroup,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteAssetGroupApi = async (assetGroup, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/assets/group/${assetGroup}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateAssetGroupApi = async (assetGroup, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/group/${assetGroup.id}`,
    data: assetGroup,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
