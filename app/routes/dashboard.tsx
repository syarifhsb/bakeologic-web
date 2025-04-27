import { getSession } from "~/sessions.server";
import type { Route } from "./+types/dashboard";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { backendApiUrl } from "~/env";
import type { AuthMeResponseSuccessBody } from "~/modules/auth/type";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";

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
  const user: AuthMeResponseSuccessBody = await response.json();

  return user;
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const updatedUser = {
    username: formData.get("username"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    avatarUrl: formData.get("avatarUrl"),
  };
  console.log(updatedUser);

  try {
    const response = await fetch(`${backendApiUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      return { success: false, message: "Failed to update profile" };
    }

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  const actionData = useActionData<{ success?: boolean; message?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setEditMode(false);
    }
  }, [actionData]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>
              {editMode
                ? "Edit your profile information"
                : "View your profile information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-24 h-24 mb-4 border">
                <AvatarImage
                  src={
                    // TODO: change to placeholder avatar
                    user.avatarUrl ||
                    `https://api.dicebear.com/9.x/open-peeps/svg?seed=${user.username}`
                  }
                />
                <AvatarFallback>
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>

            {editMode ? (
              <Form method="post" className="space-y-4">
                <Input
                  id="avatarUrl"
                  name="avatarUrl"
                  defaultValue={user.avatarUrl || ""}
                  type="hidden"
                />

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={user.username}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      defaultValue={user.firstName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      defaultValue={user.lastName}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={user.phoneNumber}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>

                {actionData?.message && (
                  <p
                    className={`text-sm ${
                      actionData.success ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {actionData.message}
                  </p>
                )}
              </Form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p>{user.username}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">First Name</p>
                    <p>{user.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Name</p>
                    <p>{user.lastName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p>{user.phoneNumber}</p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t flex justify-center">
            <Form method="post" action="/logout">
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </Form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
