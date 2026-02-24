import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve } from "path";

function normalizePrivateKey(key: string): string {
  return key.trim().replace(/\\n/g, "\n");
}

function getFirebaseConfig() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      const serviceAccount = JSON.parse(json) as Record<string, string>;
      return { credential: cert(serviceAccount) };
    } catch {
      // fall through
    }
  }

  const jsonPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (jsonPath) {
    try {
      const fullPath = resolve(process.cwd(), jsonPath);
      const serviceAccount = JSON.parse(
        readFileSync(fullPath, "utf-8")
      ) as Record<string, string>;
      return { credential: cert(serviceAccount) };
    } catch {
      // fall through
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  const privateKey = rawKey ? normalizePrivateKey(rawKey) : undefined;

  if (projectId && clientEmail && privateKey) {
    return {
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    };
  }

  throw new Error(
    "Firebase yapılandırması bulunamadı. FIREBASE_SERVICE_ACCOUNT_JSON, FIREBASE_SERVICE_ACCOUNT_PATH veya FIREBASE_PROJECT_ID+FIREBASE_CLIENT_EMAIL+FIREBASE_PRIVATE_KEY ayarlayın."
  );
}

let app: App;

export function getFirebaseApp(): App {
  if (!app) {
    const existing = getApps();
    if (existing.length > 0) {
      app = existing[0];
    } else {
      app = initializeApp(getFirebaseConfig());
    }
  }
  return app;
}

export function getFirebaseFirestore() {
  return getFirestore(getFirebaseApp());
}
