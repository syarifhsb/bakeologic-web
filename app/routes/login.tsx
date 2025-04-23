import { Link } from "react-router";
import { LoginForm } from "~/components/custom/login-form";
import { Logo } from "~/components/custom/logo";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login to Bakeologic" }];
}

export default function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
