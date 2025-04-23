import { Link, redirect } from "react-router";
import { LoginForm } from "~/components/custom/login-form";
import { Logo } from "~/components/custom/logo";
import type { Route } from "./+types/login";
import type {
  AuthLoginRequestBody,
  AuthLoginResponseBody,
} from "~/modules/auth/type";
import { backendApiUrl } from "~/env";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login to Bakeologic" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const loginData: AuthLoginRequestBody = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  const response = await fetch(`${backendApiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  if (!response.ok) {
    return redirect("/login");
  }

  const loginResult: AuthLoginResponseBody = await response.json();
  if (!loginResult) {
    return redirect("/login");
  }

  return redirect("/dashboard");
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
