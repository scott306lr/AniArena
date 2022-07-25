import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // adapter: FirestoreAdapter({
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  //   // Optional emulator config (see below for options)
  //   // emulator: {
  //   //   // Optional host, defaults to `localhost`
  //   //   host: 'localhost',
  //   //   // Optional port, defaults to `3001`
  //   //   port: 3000,
  //   // },
  // }),
  
  pages: {
    signIn: "/auth/signin"
  },

  // callbacks: {
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken

  //     session.user.id = token.sub;
  //     return session
  //   }
  // }
})