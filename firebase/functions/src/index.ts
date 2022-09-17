import * as functions from "firebase-functions";
import { db } from "./init";

const REGION = "asia-northeast1";

export const createParentProfile = functions
  .region(REGION)
  .auth.user()
  .onCreate((user) => {
    db.collection("parents").doc(user.uid).set({
      email: user.email,
      displayName: user.displayName,
      userId: user.uid,
    });
  });
