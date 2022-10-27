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
      <label htmlFor="firstName">Primeiro Nome</label>
      <input
        type="text"
        required
        autoFocus
        name="firstName"
        value={firstName}
        onChange={(e) => updatedFields({ firstName: e.target.value })}
      />
      <label htmlFor="lastName">Último Nome</label>
      <input
        type="text"
        required
        name="lastName"
        value={lastName}
        onChange={(e) => updatedFields({ lastName: e.target.value })}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        required
        name="email"
        value={email}
        onChange={(e) => updatedFields({ email: e.target.value })}
      />
      <label htmlFor="phoneNumber">Telefone</label>
      <input
        type="text"
        required
        name="phoneNumber"
        value={phoneNumber}
        onChange={(e) => updatedFields({ phoneNumber: e.target.value })}
      />
      <label htmlFor="cpf">CPF</label>
      <input
        type="text"
        required
        name="cpf"
        value={cpf}
        onChange={(e) => updatedFields({ cpf: e.target.value })}
      />
    </FormWrapper>
  );
};
