import Sidebar from "../components/Sidebar/Sidebar";
import "./Layout.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}
