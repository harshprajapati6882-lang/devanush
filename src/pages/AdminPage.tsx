import { useEffect, useState } from "react";

const BACKEND_URL = "https://backend-new-6tzb.onrender.com";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        headers: {
          Authorization: token || "",
        },
      });

      const data = await res.json();
      setUsers(data.users || []);
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Users</h2>

      {users.map((u) => (
        <div key={u._id} style={{ marginBottom: 10 }}>
          <strong>{u.email}</strong> — {u.role}
        </div>
      ))}
    </div>
  );
}
