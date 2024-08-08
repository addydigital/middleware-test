// app/page.tsx
'use client'
import { useSession } from "next-auth/react";

export default function HomePage() {
  //const session = useSession();
  const { data: session } = useSession();
  return (
    <>
        {session ? (
        <p>Welcome, {session.user.name}</p>
      ) : (
        <p>Please sign in</p>
      )}
        </>
  );
}
