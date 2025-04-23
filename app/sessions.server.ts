import { createCookieSessionStorage } from "react-router";
import { sessionSecretKey } from "~/env";

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecretKey],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
