import { useEffect, useState } from "react";
import API from "../API";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Edit state
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("user");

  // 🔹 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
     if (import.meta.env.DEV) {
        console.error("Error fetching users:", err);
      }
     setError("Failed to load users");
    } finally {
        setLoading(false);
      }};
    fetchUsers();
  }, []);

  // 🔹 Start editing
  const startEdit = (user) => {
    setEditingUser(user._id);
    setEditName(user.name || "");
    setEditRole(user.role || "user");
  };

  // 🔹 Cancel editing
  const cancelEdit = () => {
    setEditingUser(null);
    setEditName("");
    setEditRole("user");
  };

  // 🔹 Update user
  const handleUpdate = async (userId) => {
    try {
      await API.put(`/admin/users/${userId}`, {
        name: editName,
        role: editRole,
      });

      // ✅ Update UI immediately
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, name: editName, role: editRole } : u
        ));
      setEditingUser(null);
    } catch (err) {
      if (import.meta.env.DEV) {
      console.error("Update failed:", err);
      }
      alert("Failed to update user");
    }};

  // 🔥 Delete user
  const handleDelete = async (userId, userName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userName}?`
    );
    if (!confirmDelete) return;
    try {
      await API.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      if (import.meta.env.DEV) {
      console.error("Delete failed:", err);
    }
      alert("Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full bg-gray-100 border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {/* NAME */}
              <td className="border p-2">
                {editingUser === user._id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2 py-1 w-full"/>
                ) : (
                  user.name
                )}
              </td>

              {/* EMAIL (read-only) */}
              <td className="border p-2">{user.email}</td>

              {/* ROLE */}
              <td className="border p-2">
                {editingUser === user._id ? (
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="border px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>

              {/* ACTIONS */}
              <td className="border p-2 text-center">
                {editingUser === user._id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(user._id)}
                      style={{
                        marginRight: "6px",
                        padding: "4px 10px",
                        backgroundColor: "#16a34a",
                        color: "white",
                        borderRadius: "6px",
                      }}
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "#6b7280",
                        color: "white",
                        borderRadius: "6px",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{
                        marginRight: "8px",
                        padding: "4px 10px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        borderRadius: "6px",
                      }}
                      onClick={() => startEdit(user)} >
                      Edit
                    </button>

                    <button
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "#dc2626",
                        color: "white",
                        borderRadius: "6px",
                      }}
                      onClick={() =>
                        handleDelete(user._id, user.name)
                      }>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};
export default ViewUsers;

  


