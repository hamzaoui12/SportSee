import { endpoints } from "@/web/endpoints";
import { api } from "@/web/helper/axiosClient";

export const getUserAverageSessions = async () => {
  try {
    const response = await api.get(endpoints.userAverageSessions);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
};
