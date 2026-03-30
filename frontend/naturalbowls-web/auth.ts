import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { loginWithGoogle } from "@/lib/api/auth";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
    backendRefreshToken?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    backendToken?: string;
    backendRefreshToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // On initial sign-in, send Google idToken to our backend
      if (account?.id_token) {
        try {
          const backendAuth = await loginWithGoogle(account.id_token);
          token.backendToken = backendAuth.accessToken;
          token.backendRefreshToken = backendAuth.refreshToken;
        } catch (error) {
          console.error("[auth] Backend login failed:", error);
        }
      }
      return token;
    },
    session({ session, token }) {
      session.backendToken = token.backendToken;
      session.backendRefreshToken = token.backendRefreshToken;
      return session;
    },
  },
});
