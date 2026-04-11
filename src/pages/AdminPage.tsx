import { useEffect, useState } from "react";

const BACKEND_URL = "https://backend-new-6tzb.onrender.com";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  // users
  fetch(`${BACKEND_URL}/api/admin/users`, {
    headers: { Authorization: token || "" },
  })
    .then(res => res.json())
    .then(data => setUsers(data.users || []));

  // orders
  fetch(`${BACKEND_URL}/api/admin/orders`, {
    headers: { Authorization: token || "" },
  })
    .then(res => res.json())
    .then(data => setOrders(data.orders || []));
}, []);

  return (
  <div style={{ padding: 20 }}>
    <h2>Admin Panel</h2>

    <h3>Users</h3>
    {users.map((u) => (
      <div key={u._id} style={{ marginBottom: 10 }}>
        <strong>{u.email}</strong> — {u.role}
      </div>
    ))}

    <hr style={{ margin: "20px 0" }} />

    <h3>Orders</h3>
    {orders.map((o) => (
      <div key={o._id} style={{ marginBottom: 10 }}>
        <div><strong>Name:</strong> {o.name}</div>
        <div><strong>User ID:</strong> {o.userId}</div>
        <div><strong>Link:</strong> {o.link}</div>
      </div>
    ))}
  </div>
);
}
