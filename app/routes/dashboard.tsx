import { getSession } from "~/sessions.server";
import type { Route } from "./+types/dashboard";
import { Form, redirect } from "react-router";
import { backendApiUrl } from "~/env";
import type { AuthMeResponseBody } from "~/modules/auth/type";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - Bakeologic" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`${backendApiUrl}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const user: AuthMeResponseBody = await response.json();

  return user;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData;

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Form method="post" action="/logout">
        <Button type="submit">Logout</Button>
      </Form>
    </div>
  );
}
