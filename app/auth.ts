import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getSession } from "next-auth/react";
export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
      async profile(profile) {
        console.log("User's Profile =", profile);
        return { ...profile }
      },
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/photoslibrary.readonly ',   
        },
      },
    }),
    
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Implement any custom logic before signing in
      console.log("signIn was Invoked");
      return true;
    },
    async account(account) {
      // https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens#refreshing-a-user-access-token-with-a-refresh-token
      console.log("account callback Invoked with access_token=",account.access_token)
      return {
        access_token: account.access_token,
        expires_at: account.expires_at,
        refresh_token: account.refresh_token,
      }
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect was Invoked");
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    jwt({ token, user, account }) {
      console.log("jwt was Invoked for account=",account);
      if (account) { // User is available during sign-in
        token.id = user.id
        token.access_token = account.access_token;
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.access_token = token.access_token
      console.log("session was Invoked for session=",session, "token=", token);
      
      return session
    },
  },
 
  secret: process.env.AUTH_SECRET, // Ensure this is set for security
  debug: true,
};

export const {  signIn, signOut, auth, handlers  } = NextAuth(authOptions);
