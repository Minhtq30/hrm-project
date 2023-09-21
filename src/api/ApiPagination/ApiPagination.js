import { TOKEN } from "@/constants/ApiUrl";
import axios from "axios";

export const NextPageApi = async (dataUrl, token) => {
  const res = await axios({
    method: "GET",
    url: dataUrl.url,
    headers: TOKEN(token),
  });
  return res.data;
};
export const PrevPageApi = async (dataUrl, token) => {
  const res = await axios({
    method: "GET",
    url: dataUrl.url,
    headers: TOKEN(token),
  });
  return res.data;
};
