import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// styles
import "./index.scss";

import { persistor, store } from "./features";

// routes
import { createRouter } from "./routes";

const queryClient = new QueryClient();

const App = () => {
  const [router, setRouter] = useState(null);

  useEffect(() => {
    const appRouter = createRouter();

    setRouter(appRouter as any);
  }, []);

  if (!router) {
    return <div>Carregando...</div>;
  }

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
