import { createBrowserRouter, redirect, Navigate } from "react-router";

// store
import { store } from "./features";

// pages
import { LoginIndex } from "./pages/Login";
import { ReportsIndex } from "./pages/Reports/Index";
import { ReportsDetails } from "./pages/Reports/Details";
import { ReportsForm } from "./pages/Reports/Form";

const authLoader = () => {
  const token = store.getState().user.auth.token;

  if (!token) {
    return redirect("/login");
  }

  return null;
};

const loginLoader = () => {
  const token = store.getState().user.auth.token;

  if (token) {
    return redirect("/reports");
  }

  return null;
};

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/login",
      Component: LoginIndex,
      loader: loginLoader,
    },
    {
      path: "/reports",
      children: [
        {
          index: true,
          Component: ReportsIndex,
          loader: authLoader,
        },
        {
          path: "/reports/:month",
          Component: ReportsDetails,
          loader: authLoader,
        },
        {
          path: "/reports/form",
          Component: ReportsForm,
          loader: authLoader,
        },
        {
          path: "/reports/form/:id",
          Component: ReportsForm,
          loader: authLoader,
        },
      ],
    },
    // fallback
    {
      path: "*",
      Component: () => <Navigate to="/login" />,
    },
  ]);
};
