import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import { FormEvent, useContext, useEffect, useState } from "react";
import SystemContext from "../Context/SystemContext";
import { useMultipleStepForm } from "../hook/useMultipleStepForm";
import { ApiResponse, User } from "../interfaces/user";
import { Copyright } from "./CopyRight";
import { InterestDestinationForm } from "./InterestDestinationForm";
import { ReviewDate } from "./ReviewDate";
import { UserForm } from "./UserForm";

export const App = () => {
  const { INITIAL_DATA, postCurrentData, getCurrentData } =
    useContext(SystemContext);
  const steps = [
    "Dados Pessoais",
    "Destinos de Interesses",
    "Reveja Os Seus Dados",
  ];
  const [data, setData] = useState<User>(INITIAL_DATA);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const updatedFields = (fields: Partial<User>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <UserForm {...data} updatedFields={updatedFields} />;
      case 1:
        return (
          <InterestDestinationForm {...data} updatedFields={updatedFields} />
        );
      case 2:
        return <ReviewDate />;
      default:
        throw new Error("Desconhecido");
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleNext();
    postCurrentData(data);
  };

  return (
    <main>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Ally Hub
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        component="form"
        onSubmit={handleSubmit}
        maxWidth="md"
        autoComplete="none"
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Sistema de Marcações de Interesses
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Obrigado pelo seu pedido.
              </Typography>
              <Typography variant="subtitle1">
                Enviamos a confirmação do seu pedido por e-mail e enviaremos uma
                atualização quando seu pedido for enviado.
              </Typography>
              <Button
                onClick={() => {
                  setData(INITIAL_DATA);
                  postCurrentData(INITIAL_DATA);
                  setActiveStep(0);
                }}
                sx={{ mt: 3, ml: 1 }}
              >
                Novo Registo
              </Button>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Voltar
                  </Button>
                )}
                <Button variant="contained" sx={{ mt: 3, ml: 1 }} type="submit">
                  {activeStep === steps.length - 1
                    ? "Salvar Marcações"
                    : "Próximo Passo"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
        <Copyright />
      </Container>
    </main>
  );
};
