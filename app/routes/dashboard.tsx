import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - Bakeologic" }];
}

export default function Dashboard() {
  return <div>Dashboard</div>;
}
