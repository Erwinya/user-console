import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import App from "./App.jsx";

vi.mock("./api/users.js", () => ({
  listUsers: vi.fn(async () => []),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders console branding and create form", async () => {
    render(<App />);
    expect(screen.getByText("User Console")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /manage users against user-api/i })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: /create user/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("haluk@example.com")).toBeInTheDocument();
  });
});
