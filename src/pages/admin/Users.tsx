import "./Users.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";
import { useAuth } from "../../context/AuthContext";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
}

export default function Users() {
  const { user, refreshUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    void fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users ❌");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id: string, role: string) => {
    try {
      await axios.patch(
        `/admin/user/${id}/role`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Role updated ✅");
      void fetchUsers();
      // Refresh user context to update current user's role if they changed their own role
      if (id === user?.id) {
        await refreshUser();
      }
    } catch {
      toast.error("Failed to update role ❌");
    }
  };

  return (
    <div className="admin-users">
      {loading && <Loader />}

      <h2>Manage Users</h2>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td className={`role ${u.role}`}>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) =>
                    changeRole(u.id, e.target.value)
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
