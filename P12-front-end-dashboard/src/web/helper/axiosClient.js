import axios from "axios";

import { config } from "@/web/config";

export const api = axios.create({
  baseURL: config.apiUrl,
});
