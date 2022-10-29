import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  useFormControl,
} from "@mui/material";
import { User } from "../interfaces/user";
import { FormWrapper } from "./FormWrapper";

interface UserProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  updatedFields(fields: Partial<User>): void;
}

export const UserForm = ({
  firstName,
  lastName,
  cpf,
  email,
  phoneNumber,
  updatedFields,
}: UserProps) => {
  return (
    <FormWrapper title="Dados Pessoais">
      <TextField
        name="firstName"
        label="Primeiro Nome"
        required
        autoFocus
        variant="outlined"
        id="firstName"
        value={firstName}
        onChange={(e) => updatedFields({ firstName: e.target.value })}
        aria-describedby="firstName"
        /*    helperText={required ? "preencha este campo" : "campo preenchidpo"}
        error={required} */
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Último Nome"
        required
        variant="outlined"
        value={lastName}
        onChange={(e) => updatedFields({ lastName: e.target.value })}
        aria-describedby="lastName"
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        type={"email"}
        required
        variant="outlined"
        value={email}
        onChange={(e) => updatedFields({ email: e.target.value })}
        aria-describedby="email"
      />

      <TextField
        id="cpf"
        name="cpf"
        label="CPF"
        required
        variant="outlined"
        value={cpf}
        onChange={(e) => updatedFields({ cpf: e.target.value })}
        aria-describedby="cpf"
      />

      <TextField
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        label="Telefone"
        required
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => updatedFields({ phoneNumber: e.target.value })}
        aria-describedby="phoneNumber"
      />
    </FormWrapper>
  );
};
