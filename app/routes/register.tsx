import { data, Link, redirect } from "react-router";
import { Logo } from "~/components/custom/logo";
import { RegisterForm } from "~/components/custom/register-form";
import { backendApiUrl } from "~/env";
import type {
  AuthRegisterRequestBody,
  AuthRegisterResponseFailedBody,
} from "~/modules/auth/type";
import type { Route } from "./+types/register";
import { commitSession, getSession } from "~/sessions.server";
import type { ZodError } from "zod";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register for a new Bakeologic account" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    return redirect("/dashboard");
  }

  return data(
    { error: session.get("error") },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

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
    const registerResultFailed: AuthRegisterResponseFailedBody =
      await response.json();

    console.log(registerResultFailed);
    if ((registerResultFailed.error as ZodError)?.name === "ZodError") {
      const errorMessage = (registerResultFailed.error as ZodError).issues
        .map((issue) => issue.message)
        .join(", ");

      session.flash("error", errorMessage);
    } else {
      console.log(registerResultFailed.message);
      session.flash("error", registerResultFailed.message);
    }

    return redirect("/register", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  return redirect("/login");
}

export default function Register({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;
  return (
    <div className="flex w-full min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <section className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
        </Link>

        <RegisterForm errorMessage={error} />
      </section>
    </div>
  );
}
