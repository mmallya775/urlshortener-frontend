import {Navigate, Outlet, useLocation} from "react-router";
import { useAuth } from "./AuthContext";

import type {Role} from "../types/auth";

interface ProtectedRouteProps {
  requiredRole?: Role;
}

export default function ProtectedRoute({requiredRole}: ProtectedRouteProps) {

  const {user, loading, hasRole} = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location.pathname
        }}
      />
    );
  }


  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <Navigate to="/unauthorized" replace/>
    );
  }

  return <Outlet />;
}