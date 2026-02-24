/**
 * Firestore seed script – örnek blog yazısı ve ana sayfa içeriği ekler
 * Çalıştırmak için: npm run db:seed
 * Önce .env dosyasında Firebase bilgilerini ayarlayın.
 */
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

// firebase-admin modül yolu
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  DEFAULT_HERO,
  DEFAULT_STATS,
  DEFAULT_FEATURES,
  DEFAULT_WHY_US,
  DEFAULT_PACKAGES,
  DEFAULT_TESTIMONIALS,
} from "../lib/constants/default-content";

function getConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return { credential: cert({ projectId, clientEmail, privateKey }) };
  }

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    return { credential: cert(JSON.parse(json) as Record<string, string>) };
  }

  throw new Error("Firebase yapılandırması bulunamadı. .env dosyasını kontrol edin.");
}

async function main() {
  initializeApp(getConfig());
  const db = getFirestore();

  // Örnek blog yazısı
  const postsRef = db.collection("posts");
  const slug = "memur-jargonuna-hosgeldiniz";
  const existingPost = await postsRef.where("slug", "==", slug).limit(1).get();

  if (existingPost.empty) {
    await postsRef.add({
      title: "Memur Jargonu'na Hoş Geldiniz",
      slug,
      excerpt: "KPSS ve AGS hazırlığında yanınızdayız.",
      body: "Memur Jargonu ile sınavlara daha verimli hazırlanın.",
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Örnek blog yazısı eklendi.");
  } else {
    console.log("Örnek yazı zaten mevcut.");
  }

  // Ana sayfa içeriği
  const homepageRef = db.collection("homepageContent").doc("main");
  const homepageDoc = await homepageRef.get();

  if (!homepageDoc.exists) {
    await homepageRef.set({
      hero: DEFAULT_HERO,
      stats: {
        title: "Rakamlarla Memur Jargonu",
        subtitle: "Her gün daha fazla içerik ve kullanıcı",
        items: DEFAULT_STATS,
      },
      features: { title: "Özellikler", items: DEFAULT_FEATURES },
      whyUs: DEFAULT_WHY_US,
      packages: {
        title: "Abonelik Paketleri",
        subtitle: "İhtiyacınıza uygun paketi seçin, sınavlara en iyi şekilde hazırlanın.",
        items: DEFAULT_PACKAGES,
      },
      testimonials: {
        title: "Kullanıcılarımız Hakkımızda Neler Söylüyor?",
        items: DEFAULT_TESTIMONIALS,
      },
      updatedAt: new Date(),
    });
    console.log("Ana sayfa içeriği eklendi.");
  } else {
    console.log("Ana sayfa içeriği zaten mevcut.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
