import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: { background: "#10b981", color: "white" }
        },
        error: {
          style: { background: "#ef4444", color: "white" }
        }
      }}
    />
  );
}
