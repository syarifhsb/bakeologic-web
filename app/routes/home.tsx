import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bakeologic" },
    { name: "description", content: "Baking with logic, love and magic." },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
