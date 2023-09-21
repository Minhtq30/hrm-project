import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllInventoryGroupsApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventoryGroup/source?fields=${fields}`,
    url: `${API_URL}/inventory/group?per_page=${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateInventoryGroupApi = async (inventoryGroup, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/inventory/group`,
    data: inventoryGroup,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const DeleteInventoryGroupApi = async (inventoryGroup, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/inventory/group/${inventoryGroup}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export const UpdateInventoryGroupApi = async (inventoryGroup, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/inventory/group/${inventoryGroup.ID}`,
    data: inventoryGroup,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export const SearchInventoryGroupApi = async (inventoryGroup, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/inventory/group?term=${inventoryGroup}`,
    data: inventoryGroup,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
