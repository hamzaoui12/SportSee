import { endpoints } from "@/web/endpoints";
import { api } from "@/web/helper/axiosClient";

export const getUserInfo = async () => {
  try {
    const response = await api.get(endpoints.userInfo);
    return { data: response.data };
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
};
