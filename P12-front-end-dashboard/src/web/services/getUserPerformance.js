import { endpoints } from "@/web/endpoints";
import { api } from "@/web/helper/axiosClient";

export const getUserPerformance = async () => {
  try {
    const response = await api.get(endpoints.userPerformance);
    return response.data;
  } catch (error) {
    return { error: error.response.data };
  }
};
