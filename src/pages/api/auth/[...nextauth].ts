import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../../../env/server.mjs";
import FirestoreAdapter from "../../../server/adapter/firebase-adapter"
import { db } from "../../../utils/firebase.js";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  // adapter: FirestoreAdapter({
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // }),
  adapter: FirestoreAdapter(db),
  //debug: true,
  
  pages: {
    signIn: "/auth/signin"
  },
};

export default NextAuth(authOptions);
