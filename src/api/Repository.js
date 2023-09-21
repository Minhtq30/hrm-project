import { API_URL } from "@/constants/ApiUrl";
import axios from "axios";
const token = localStorage.getItem("TOKEN");
const httpClient = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${token}` },
});
export default httpClient;
