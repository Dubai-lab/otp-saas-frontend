import { Navigate } from "react-router-dom";
import Loader from "../components/UI/Loader";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  if (!token) return <Loader />;

  return children;
}
