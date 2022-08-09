import { DocumentData, getDocs, Query, QueryDocumentSnapshot } from "firebase/firestore";

export async function findOne(q: Query<DocumentData>): Promise<QueryDocumentSnapshot<DocumentData>|null> {
  const querySnap = await getDocs(q);
  let result = null;
  querySnap.forEach(doc => result = doc);
  
  return result;
}

export async function findMany(q: Query<DocumentData>): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  const querySnap = await getDocs(q);
  const docs: QueryDocumentSnapshot<DocumentData>[] = [];
  querySnap.forEach(doc => docs.push(doc));
  
  return docs;
}

export function from<T = Record<string, unknown>>(object: Record<string, any>): T {
  const newObject: Record<string, unknown> = {}
  for (const key in object) {
    const value = object[key]
    if (key === "expires") {
      newObject.expires = value.toDate();
    } else {
      newObject[key] = value
    }
  }
  return newObject as T
}