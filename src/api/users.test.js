import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_BASE, createUser, deleteUser, listUsers, updateUser } from "./users.js";

describe("users api", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("defaults to same-origin base for Vite proxy", () => {
    expect(API_BASE).toBe("");
  });

  it("lists users without forcing JSON content-type", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify([{ id: 1, name: "Ada" }]),
    });

    const users = await listUsers();
    expect(users).toEqual([{ id: 1, name: "Ada" }]);
    expect(fetch).toHaveBeenCalledWith("/api/v1/users", expect.objectContaining({ headers: {} }));
  });

  it("creates and updates with JSON body headers", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ id: 2, name: "Grace" }),
    });

    await createUser({ name: "Grace", email: "g@example.com" });
    expect(fetch).toHaveBeenCalledWith(
      "/api/v1/users",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Grace", email: "g@example.com" }),
      })
    );

    await updateUser(2, { name: "Grace H", email: "g@example.com" });
    expect(fetch).toHaveBeenCalledWith(
      "/api/v1/users/2",
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("treats 204 as null and surfaces JSON/text errors", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      text: async () => "",
    });
    await expect(deleteUser(9)).resolves.toBeNull();

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => JSON.stringify({ message: "bad email" }),
    });
    await expect(createUser({})).rejects.toThrow("bad email");

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "boom",
    });
    await expect(listUsers()).rejects.toThrow("boom");
  });
});
