import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Dashboard/Home";
import SMTP from "./pages/Dashboard/SMTP";
import Templates from "./pages/Dashboard/Templates";
import ApiKeys from "./pages/Dashboard/ApiKeys";
import TestOtp from "./pages/Dashboard/TestOtp";
import Logs from "./pages/Dashboard/Logs";
import AdminRoute from "./routes/AdminRoute";
import Users from "./pages/admin/Users";
import AdminLogs from "./pages/admin/AdminLogs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
  path="/dashboard/smtp"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <SMTP />
      </DashboardLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/dashboard/apikeys"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <ApiKeys />
      </DashboardLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/dashboard/test-otp"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <TestOtp />
      </DashboardLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/dashboard/templates"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <Templates />
      </DashboardLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/dashboard/logs"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <Logs />
      </DashboardLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/dashboard/admin/users"
  element={
    <AdminRoute>
      <DashboardLayout>
        <Users />
      </DashboardLayout>
    </AdminRoute>
  }
/>

<Route
  path="/dashboard/admin/logs"
  element={
    <AdminRoute>
      <DashboardLayout>
        <AdminLogs />
      </DashboardLayout>
    </AdminRoute>
  }
/>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
