import { User } from "../interfaces/user";
import { FormWrapper } from "./FormWrapper";

interface InterestDestinationProps {
  country: string[];
  city: string[];
  updatedFields(fields: Partial<User>): void;
}

export const InterestDestinationForm = ({
  city,
  country,
  updatedFields,
}: InterestDestinationProps) => {
  return (
    <FormWrapper title="Destinos de Interesse">
      <label htmlFor="country">País</label>
      <input type="text" required autoFocus name="country" />
      <label htmlFor="city">Cidade</label>
      <input type="text" required name="city" />
    </FormWrapper>
  );
};
