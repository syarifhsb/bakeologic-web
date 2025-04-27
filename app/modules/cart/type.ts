import type { paths } from "~/schema";

export type CartJSON =
  paths["/cart"]["get"]["responses"][200]["content"]["application/json"];

export type CartItemJSON =
  paths["/cart"]["get"]["responses"][200]["content"]["application/json"]["items"][number];
