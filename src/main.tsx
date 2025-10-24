import ReactDOM from "react-dom/client";
import App from "./App";
import ToastProvider from "./context/ToastProvider";
import { AuthProvider } from "./context/AuthContext";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ToastProvider />
    <AuthProvider>
      <App />
    </AuthProvider>
  </>
);
