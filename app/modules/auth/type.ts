import type { paths } from "~/schema";

export type AuthRegisterRequestBody = NonNullable<
  paths["/auth/register"]["post"]["requestBody"]
>["content"]["application/json"];

export type AuthRegisterResponseBody =
  paths["/auth/register"]["post"]["responses"][200]["content"]["application/json"];

export type AuthLoginRequestBody = NonNullable<
  paths["/auth/login"]["post"]["requestBody"]
>["content"]["application/json"];

export type AuthLoginResponseSuccessBody =
  paths["/auth/login"]["post"]["responses"][200]["content"]["application/json"];

export type AuthLoginResponseFailedBody =
  paths["/auth/login"]["post"]["responses"][400]["content"]["application/json"];

export type AuthMeResponseSuccessBody =
  paths["/auth/me"]["get"]["responses"][200]["content"]["application/json"];
