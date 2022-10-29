import { ApiResponse } from "../interfaces/user";
import { api } from "../services/apiAmazon";

const getAllCountry = (): Promise<ApiResponse[]> =>
  api.get("/country").then((response) => response.data);
export { getAllCountry };
