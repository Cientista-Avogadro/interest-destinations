import { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  country: ApiResponse[];
  city: ApiResponseCity[];
  createdAt: Date;
}

export interface ApiResponse {
  code: string;
  name: string;
  name_ptbr: string;
}

export interface ApiResponseCity {
  id: number;
  code: string;
  name: string;
  country_code: string;
  created_at: string;
  updated_at: string;
  name_ptbr: string;
  lat: string;
  log: string;
  url1: null | string;
  url2: null | string;
}

export interface SystemContextProps {
  getCurrentData: () => User;
  postCurrentData(data: User): void;
  INITIAL_DATA: User;
}
