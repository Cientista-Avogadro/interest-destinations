import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div
        style={{
          display: "grid",
          gap: "1rem .5rem",
          justifyContent: "normal",
          gridTemplateColumns: "auto auto",
          width: "100%",
        }}
      >
        {children}
      </div>
    </>
  );
};
