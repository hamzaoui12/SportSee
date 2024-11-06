import { endpoints } from "@/web/endpoints";
import { api } from "@/web/helper/axiosClient";

export const getUserPerformance = async () => {
  try {
    const response = await api.get(endpoints.userPerformance);
    return { data: response.data };
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
};
