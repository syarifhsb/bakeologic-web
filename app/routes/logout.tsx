import { Form, Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/logout";
import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
export default function LogoutRoute() {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Form action="/">
              <Button variant="secondary">Cancel</Button>
            </Form>
          </DialogClose>
          <DialogClose asChild>
            <Form method="post" action="/logout">
              <Button type="submit">Logout</Button>
            </Form>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
