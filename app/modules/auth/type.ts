import type { paths } from "~/schema";

export type AuthRegisterRequestBody = NonNullable<
  paths["/auth/register"]["post"]["requestBody"]
>["content"]["application/json"];

export type AuthRegisterResponseBody =
  paths["/auth/register"]["post"]["responses"][200]["content"]["application/json"];
