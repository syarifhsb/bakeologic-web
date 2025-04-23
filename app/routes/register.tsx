import { Link, redirect } from "react-router";
import { Logo } from "~/components/custom/logo";
import { RegisterForm } from "~/components/custom/register-form";
import { backendApiUrl } from "~/env";
import type {
  AuthRegisterRequestBody,
  AuthRegisterResponseBody,
} from "~/modules/auth/type";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register for a new Bakeologic account" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const registerData: AuthRegisterRequestBody = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    firstName: formData.get("first-name") as string,
    lastName: formData.get("last-name") as string,
    phoneNumber: formData.get("phone-number") as string,
    password: formData.get("password") as string,
  };

  const response = await fetch(`${backendApiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
  });
  if (!response.ok) {
    return redirect("/register");
  }

  const registerResult: AuthRegisterResponseBody = await response.json();
  if (!registerResult) {
    return redirect("/register");
  }

  return redirect("/login");
}

export default function Register() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
        </Link>

        <RegisterForm />
      </div>
    </div>
  );
}
