import { ApiResponse } from "../interfaces/user";
import { api } from "../services/apiAmazon";

const getAllCountry = async () => {
  try {
    const resGet = (await api.get("/country")).data as ApiResponse[];
    return resGet;
  } catch (error) {
    console.log(error);
  }
  return;
};

export { getAllCountry };
