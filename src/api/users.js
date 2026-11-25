const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const { headers: extraHeaders, body, ...rest } = options;
  const headers = { ...(extraHeaders || {}) };
  if (body !== undefined && body !== null) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers,
    body,
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  let bodyJson = null;
  if (text) {
    try {
      bodyJson = JSON.parse(text);
    } catch {
      bodyJson = text;
    }
  }

  if (!response.ok) {
    const message =
      (bodyJson && typeof bodyJson === "object" && bodyJson.message) ||
      (typeof bodyJson === "string" && bodyJson) ||
      `Request failed (${response.status})`;
    throw new Error(message);
  }

  return bodyJson;
}

export function listUsers() {
  return request("/api/v1/users");
}

export function createUser(payload) {
  return request("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateUser(id, payload) {
  return request(`/api/v1/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteUser(id) {
  return request(`/api/v1/users/${id}`, {
    method: "DELETE",
  });
}

export { API_BASE };
