import { addDoc, doc, collection, Firestore, getDoc, query, where, limit, setDoc, deleteDoc  } from "firebase/firestore";
import { Adapter, AdapterSession, AdapterUser, VerificationToken } from "next-auth/adapters";
import { findOne, from } from "./utils";
import { Account } from "next-auth";

export type FirebaseAdapterProps = {
  adapterCollectionName?: string;
}

export default function FirebaseAdapter(
  db: Firestore,
  options: FirebaseAdapterProps = {},
): Adapter {  
  const userCollectionRef = collection(db, 'users');
  const accountCollectionRef = collection(db, 'accounts');
  const sessionCollectionRef = collection(db, 'sessions');

  const userDocRef = (id: string) => doc(userCollectionRef, id);
  const accountDocRef = (id: string) => doc(accountCollectionRef, id);
  const sessionDocRef = (id: string) => doc(sessionCollectionRef, id);

  return {
    async createUser(data) {
      const userData: Omit<AdapterUser, "id"> = {
        name: data.name ?? null,
        email: data.email ?? null,
        image: data.image ?? null,
        emailVerified: data.emailVerified ?? null,
      };
      
      const userRef = await addDoc(userCollectionRef, userData);
      const user = {
        id: userRef.id,
        ...userData,
      } as AdapterUser;
      return user;
    },

    async getUser(id) {
      const userSnap = await getDoc(userDocRef(id));
      if (!userSnap.exists()) return null;
      const userData = userSnap.data();

      const user = {
        id: userSnap.id,
        ...userData,
      } as AdapterUser;
      console.log("user:", user);
      return user;
    },

    async getUserByEmail(email) {      
      const q = query(userCollectionRef, where('email', '==', email), limit(1));
      const userSnap = await findOne(q);
      if (!userSnap) return null;
      const userData = userSnap.data();

      const user = {
        id: userSnap.id,
        ...userData,
      } as AdapterUser;
      return user;
    },

    async getUserByAccount({providerAccountId, provider}) {
      const q = query(accountCollectionRef, where('provider', '==', provider), where('providerAccountId', '==', providerAccountId), limit(1));
      const accountSnap = await findOne(q);
      if (!accountSnap) return null;
      const accountData = accountSnap.data();
      
      const account = {
        id: accountSnap.id,
        ...accountData,
      } as unknown as Account;

      const userSnap = await getDoc(userDocRef(account.userId as string))
      if (!userSnap.exists()) return null
      const userData = userSnap.data();

      const user = {
        id: userSnap.id,
        ...userData,
      } as AdapterUser;
      return user;
    },

    async updateUser(data) {
      const { id, ...userData } = data;
      await setDoc(userDocRef(id as string), userData);
      const user = data as AdapterUser;
      return user;
    },
    async deleteUser(id) {
      await deleteDoc(userDocRef(id));
    },
    async linkAccount(data) {
      const accountData = data;
      const accountRef = await addDoc(accountCollectionRef, accountData);

      const account = {
        id: accountRef.id,
        ...accountData,
      } as Account;

      return account;
    },

    async unlinkAccount({ provider, providerAccountId }) {
      const q = query(accountCollectionRef, where('provider', '==', provider), where('providerAccountId', '==', providerAccountId), limit(1));
      const accountSnap = await findOne(q);
      if (!accountSnap) return;

      await deleteDoc(accountDocRef(accountSnap.id))
    },

    async getSessionAndUser(sessionToken) {
      const q = query(sessionCollectionRef, where('sessionToken', '==', sessionToken), limit(1));
      const sessionSnap = await findOne(q);
      if (!sessionSnap) return null;

      const sessionData: Partial<AdapterSession> = sessionSnap.data();
      const userSnap = await getDoc(userDocRef(sessionData.userId as string));
      if (!userSnap.exists()) return null

      const userData = userSnap.data();
      const user = {
        id: userSnap.id,
        ...userData,
      } as AdapterUser;
      const session = {
        id: sessionSnap.id,
        ...sessionData,
      } as AdapterSession;

      return {
        user: user,
        session: from(session),
      };
    },

    async createSession(data) {
      const sessionData = {
        sessionToken: data.sessionToken ?? null,
        userId: data.userId ?? null,
        expires: data.expires ?? null,
      };
      const sessionRef = await addDoc(sessionCollectionRef, sessionData);
      const session = {
        id: sessionRef.id,
        ...sessionData,
      } as AdapterSession;

      return session;
    },

    async updateSession(data) {
      const { sessionToken, ...sessionData } = data;
      const q = query(sessionCollectionRef, where('sessionToken', '==', sessionToken), limit(1));
      const sessionSnap = await findOne(q);
      if (!sessionSnap) return;
      await setDoc(sessionDocRef(sessionSnap.id), sessionData);
      return data as AdapterSession;
    },

    async deleteSession(sessionToken) {
      const q = query(sessionCollectionRef, where('sessionToken', '==', sessionToken), limit(1));
      const sessionSnap = await findOne(q);
      if (!sessionSnap) return;
      await deleteDoc(sessionDocRef(sessionSnap.id))
    },
  }
}