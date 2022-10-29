import { ApiResponseCity } from './../interfaces/user';
import { api } from "../services/apiAmazon";

const getAllCity = (): Promise<ApiResponseCity[]> =>
  api.get("/city").then((response) => response.data);
export { getAllCity };
