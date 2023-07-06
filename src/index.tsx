import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={lightTheme}> */}
      <App />
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
