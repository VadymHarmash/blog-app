import { JSX } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Layout } from "../layout";
import { ErrorPage } from "../pages/ErrorPage";
import { BlogsPage } from "../pages/BlogsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { useAppSelector } from "../hooks/redux";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAppSelector((state) => state.userReducer);
  return isAuthenticated ? children : <LoginPage />;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <BlogsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
