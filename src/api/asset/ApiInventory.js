import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllInventoriesApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    // url: `${API_URL}/inventory/source?fields=${fields}`,
    url: `${API_URL}/inventory/source?per_page = ${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateInventoryApi = async (inventory, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/inventory/source`,
    data: inventory,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteInventoryApi = async (inventory, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/inventory/source/${inventory}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateInventoryApi = async (inventory, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/inventory/source/${inventory.ID}`,
    data: inventory,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export const SearchInventoryApi = async (inventory, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/inventory/source?term=${inventory}`,
    data: inventory,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
