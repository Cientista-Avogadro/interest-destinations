import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { SystemProvider } from "./Context/SystemContext";
import "./style/index.css";
const theme = createTheme();
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SystemProvider>
        <App />
      </SystemProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
