import type { Route } from "./+types/home";

import { Header } from "~/routes/header";
import { Footer } from "~/routes/footer";

import MainImage from "~/assets/home.jpeg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bakeologic" },
    { name: "description", content: "Baking with logic, love and magic." },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow flex flex-col items-center">
        <img src={MainImage} height="" />
        <h1 className="justify-center">FEATURED</h1>
      </div>
      <Footer />
    </div>
  );
}
