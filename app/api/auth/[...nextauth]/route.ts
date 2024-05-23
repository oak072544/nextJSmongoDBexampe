import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "ICIT Account" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch(
          "https://api.account.kmutnb.ac.th/api/account-api/user-authen",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
              scopes: "personel,student,templecturer",
            }),
          }
        );
        const user = await res.json();

        if ((user.api_message = "Authentication success")) {
          console.log(user.userInfo.username);
          let permisssion: any = await fetch(
            "http://localhost:3000/api/getUser?username=" +
            user.userInfo.username
          );
          permisssion = await permisssion.json();
          console.log(permisssion.username);
          if (permisssion.username == user.userInfo.username) {
            return user.userInfo;
          } else {
            return null;
          }
        }
        else {
          return null;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV == "development",
  callbacks: {
    async jwt({ token, user, session }) {
      //console.log("jwt callback", { token, user, session });
      if (user) {
        return {
          ...token,
          name: user.username
        };

      }
      return token;
    },
    async session({ session, token, user }) {

      /*  if (user) {
         return {
           ...session,
           user: {
             ...user,
             name: user.username,
           },
         };
       } */
      return session;
    },
  },
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }