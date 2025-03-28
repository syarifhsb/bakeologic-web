import type { paths } from "~/schema";

export type CategoriesJSON =
  paths["/categories"]["get"]["responses"][200]["content"]["application/json"];
