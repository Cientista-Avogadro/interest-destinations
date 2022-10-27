export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  country: string[];
  city: string[];
  createdAt: Date;
}

export interface ApiResponse {
  code: string;
  name: string;
  name_ptbr: string;
}
