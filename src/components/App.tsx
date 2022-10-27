import { FormEvent, useEffect, useState } from "react";
import { getAllCountry } from "../helpers/country";
import { useMultipleStepForm } from "../hook/useMultipleStepForm";
import { ApiResponse, User } from "../interfaces/user";
import { InterestDestinationForm } from "./InterestDestinationForm";
import { UserForm } from "./UserForm";

export const App = () => {
  const INITIAL_DATA: User = {
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cpf: "",
    email: "",
    city: [],
    country: [],
    createdAt: new Date(),
  };
  const [data, setData] = useState<User>(INITIAL_DATA);
  const [countryList, setCountryList] = useState<ApiResponse[]>(
    [] as ApiResponse[]
  );

  const updatedFields = (fields: Partial<User>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { steps, currentStepIndex, step, isFirstStep, next, prev, isLastStep } =
    useMultipleStepForm([
      <UserForm {...data} updatedFields={updatedFields} />,
      <InterestDestinationForm {...data} updatedFields={updatedFields} />,
    ]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
  };

  useEffect(() => {
    getAllCountry().then((res) => res && setCountryList(res));
  }, []);

  console.log(countryList[0]);
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        width: "50%",
        alignSelf: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            position: "absolute",
            top: ".5rem",
            right: ".5rem",
          }}
        >
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={prev}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};
