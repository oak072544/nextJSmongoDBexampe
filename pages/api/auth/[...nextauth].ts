import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch("https://api.account.kmutnb.ac.th/api/account-api/user-authen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${process.env.ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
            scopes: "personel,student,templecturer",
          }),
        });
        const user = await res.json();

        if (user.api_message = "Authentication success") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

});