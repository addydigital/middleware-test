import { redirect } from "next/navigation"
import {  signIn, auth  } from "@/app/auth"
import { AuthError } from "next-auth"
import React from "react"

export default async function SignInPage() {

  return (
    <div className="flex flex-col gap-2">
        <form key={1}
          action={async () => {
            "use server"
            try {
              await signIn("google")
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`/error?error=${error.type}`)
              }
 
              // Otherwise if a redirects happens NextJS can handle it
              // so you can just re-thrown the error and let NextJS handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {"google"}</span>
          </button>
        </form>
    </div>
  )
}
