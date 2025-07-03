import api from "../axios";

export async function loginApi(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
}

export async function validateCredentialsApi(email: string, password: string) {
  const response = await api.post("/auth/validate-credentials", {
    email,
    password,
  });
  return response.data;
}

export async function getActiveSessionsByEmailApi(
  email: string,
  password: string
) {
  const response = await api.post("/auth/active-sessions-by-email", {
    email,
    password,
  });
  return response.data;
}

export async function removeSessionByIdWithCredentialsApi(
  sessionId: string,
  email: string,
  password: string
) {
  const response = await api.post(
    `/auth/remove-session-by-email/${sessionId}`,
    {
      email,
      password,
    }
  );
  return response.data;
}

export async function getActiveSessionsApi() {
  const response = await api.get("/auth/active-sessions");
  return response.data;
}

export async function getSessionConfigApi() {
  const response = await api.get("/auth/session-config");
  return response.data;
}

export async function logoutApi() {
  const response = await api.post("/auth/logout");
  return response.data;
}

export async function removeSessionApi() {
  const response = await api.post("/auth/remove-session");
  return response.data;
}

export async function removeSessionByIdApi(sessionId: string) {
  const response = await api.post(`/auth/remove-session/${sessionId}`);
  return response.data;
}
