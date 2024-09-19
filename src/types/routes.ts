export enum ApiRoutes {
  GetAuth = "/v1/auth",
  GetSpacesList = "/v1/parking/spaces/list",
  GetSessionsList = "/v1/parking/sessions/list",
  PostAuth = "/v1/auth/password",
  PostStartSession = "/v1/parking/session/start",
  PostEndSession = "/v1/parking/session/end",
}

export enum InternalRoutes {
  Login = "/api/auth",
  SessionsList = "/api/sessions/list",
  SessionsEnd = "/api/sessions/end",
}
