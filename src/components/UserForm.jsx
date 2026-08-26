export default function UserForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  editingId,
  busy,
}) {
  return (
    <form className="panel form" onSubmit={onSubmit}>
      <div className="panel-head">
        <h2>{editingId ? "Edit user" : "Create user"}</h2>
        <p className="muted">
          {editingId ? `Updating #${editingId}` : "POST /api/v1/users"}
        </p>
      </div>

      <label>
        Name
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Haluk Kilincer"
          required
          minLength={2}
          maxLength={80}
          disabled={busy}
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="haluk@example.com"
          required
          maxLength={120}
          disabled={busy}
        />
      </label>

      <div className="actions">
        <button type="submit" className="btn" disabled={busy}>
          {editingId ? "Save changes" : "Create user"}
        </button>
        {editingId ? (
          <button type="button" className="btn subtle" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
