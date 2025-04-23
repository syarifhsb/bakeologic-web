import { Outlet } from "react-router";
import type { Route } from "./+types/auth";

export default function Layout({}: Route.ComponentProps) {
  return <Outlet />;
}
