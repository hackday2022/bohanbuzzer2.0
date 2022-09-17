import {CommonFirestore} from "../../../commonTypes/types";
import {
  DocumentData,
  DocumentReference,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import * as t from "io-ts";

const TimestampIots = new t.Type<Timestamp, Timestamp, unknown>(
    "Timestamp",
    (u): u is Timestamp => u instanceof Timestamp,
    (u, c) => (u instanceof Timestamp ? t.success(u) : t.failure(u, c)),
    (a) => a
);

const DocumentReferenceIoto = new t.Type<
  DocumentReference,
  DocumentReference,
  unknown
>(
    "DocumentReference",
    (u): u is DocumentReference => u instanceof DocumentReference,
    (u, c) => (u instanceof DocumentReference ? t.success(u) : t.failure(u, c)),
    (a) => a
);

export namespace Firestore {
  export const converter = <A extends DocumentData, O, I>(
    type: t.Type<A, O, I>
  ) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toFirestore: (data: any): DocumentData => {
        if (!type.is(data)) {
          console.error(data);
          throw new Error("Invalid data type.");
        }
        return data;
      },
      fromFirestore: (snapshot: QueryDocumentSnapshot): A => {
        const data = snapshot.data();
        if (!type.is(data)) {
          console.error(data);
          throw new Error("Invalid data type.");
        }
        return data;
      },
    });

  export const Child = CommonFirestore.getChild(DocumentReferenceIoto);

  export const Device = CommonFirestore.getDevice(TimestampIots);
}
