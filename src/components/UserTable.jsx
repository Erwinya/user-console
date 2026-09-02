function formatTime(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function UserTable({ users, onEdit, onDelete, busy, apiError }) {
  if (!users.length) {
    const message = apiError
      ? "Could not load users. Start user-api on :8080 and click Refresh."
      : "No users yet. Create one with the form.";
    return (
      <div className="panel empty">
        <h2>Users</h2>
        <p className="muted">{message}</p>
      </div>
    );
  }

  return (
    <section className="panel table-panel">
      <div className="panel-head">
        <h2>Users</h2>
        <p className="muted mono">{users.length} record{users.length === 1 ? "" : "s"}</p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Updated</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="mono">{user.id}</td>
                <td>{user.name}</td>
                <td className="mono">{user.email}</td>
                <td className="muted">{formatTime(user.updatedAt)}</td>
                <td className="row-actions">
                  <button
                    type="button"
                    className="btn subtle"
                    onClick={() => onEdit(user)}
                    disabled={busy}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn danger"
                    onClick={() => onDelete(user)}
                    disabled={busy}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
