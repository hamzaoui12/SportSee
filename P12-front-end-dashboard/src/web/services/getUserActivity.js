import { endpoints } from "@/web/endpoints";
import { api } from "@/web/helper/axiosClient";

export const getUserActivity = async () => {
  try {
    const response = await api.get(endpoints.userActivity);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
};
