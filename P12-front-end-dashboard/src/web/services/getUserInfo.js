import { endpoints } from "@/web/endpoints";
import { api } from "@/web/helper/axiosClient";

export const getUserInfo = async () => {
  try {
    const response = await api.get(endpoints.userInfo);
    return response.data;
  } catch (error) {
    return { error: error.response.data };
  }
};
