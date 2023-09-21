import axios from "axios";
import { API_URL } from "@/constants/ApiUrl";
export const getAllSuppliersApi = async (perPage, token) => {
  const res = await axios({
    method: "GET",
    url: `${API_URL}/assets/supplier?per_page = ${perPage}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateSupplierApi = async (supplier, token) => {
  const res = await axios({
    method: "POST",
    url: `${API_URL}/assets/supplier`,
    data: supplier,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteSupplierApi = async (supplierId, token) => {
  const res = await axios({
    method: "DELETE",
    url: `${API_URL}/assets/supplier/${supplierId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const UpdateSupplierApi = async (supplier, token) => {
  const res = await axios({
    method: "PUT",
    url: `${API_URL}/assets/supplier/${supplier.id}`,
    data: supplier,
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
