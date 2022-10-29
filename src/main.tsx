import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { SystemProvider } from "./Context/SystemContext";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./style/index.css";
import Interest from "./pages/Interest";

const theme = createTheme();
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "interest",
    element: <Interest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SystemProvider>
        <RouterProvider router={router} />
      </SystemProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
