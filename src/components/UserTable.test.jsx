import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserTable from "./UserTable.jsx";

describe("UserTable", () => {
  it("shows API guidance when the list is empty due to an error", () => {
    render(
      <UserTable users={[]} onEdit={vi.fn()} onDelete={vi.fn()} busy={false} apiError />,
    );
    expect(screen.getByText(/user-api on :8080/i)).toBeInTheDocument();
  });

  it("shows create guidance when the list is empty and healthy", () => {
    render(
      <UserTable users={[]} onEdit={vi.fn()} onDelete={vi.fn()} busy={false} apiError={false} />,
    );
    expect(screen.getByText(/No users yet/i)).toBeInTheDocument();
  });
});
