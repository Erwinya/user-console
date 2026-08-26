import { useCallback, useEffect, useState } from "react";
import { createUser, deleteUser, listUsers, updateUser } from "./api/users.js";
import UserForm from "./components/UserForm.jsx";
import UserTable from "./components/UserTable.jsx";
import "./App.css";

const emptyForm = { name: "", email: "" };

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Loading users…");
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const data = await listUsers();
      setUsers(Array.isArray(data) ? data : []);
      setStatus(`Loaded ${Array.isArray(data) ? data.length : 0} user(s)`);
    } catch (err) {
      setError(err.message || String(err));
      setStatus("API unavailable");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
    };
    try {
      if (editingId) {
        await updateUser(editingId, payload);
        setStatus(`Updated user #${editingId}`);
      } else {
        const created = await createUser(payload);
        setStatus(`Created user #${created.id}`);
      }
      resetForm();
      await refresh();
    } catch (err) {
      setError(err.message || String(err));
      setBusy(false);
    }
  }

  function onEdit(user) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email });
    setError("");
  }

  async function onDelete(user) {
    const ok = window.confirm(`Delete user #${user.id} (${user.email})?`);
    if (!ok) return;
    setBusy(true);
    setError("");
    try {
      await deleteUser(user.id);
      if (editingId === user.id) resetForm();
      setStatus(`Deleted user #${user.id}`);
      await refresh();
    } catch (err) {
      setError(err.message || String(err));
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <header className="top">
        <div>
          <p className="kicker">User Console</p>
          <h1>Manage users against user-api</h1>
          <p className="lede">
            Create, list, update, and delete users. Local dev proxies{" "}
            <code className="mono">/api</code> to{" "}
            <code className="mono">http://localhost:8080</code>.
          </p>
        </div>
        <button type="button" className="btn subtle" onClick={refresh} disabled={busy}>
          Refresh
        </button>
      </header>

      <div className="status-row">
        <span className="mono muted">{status}</span>
        {error ? <span className="error">{error}</span> : null}
      </div>

      <main className="layout">
        <UserForm
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={resetForm}
          editingId={editingId}
          busy={busy}
        />
        <UserTable users={users} onEdit={onEdit} onDelete={onDelete} busy={busy} />
      </main>
    </div>
  );
}
