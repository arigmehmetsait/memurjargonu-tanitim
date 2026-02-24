# Memur Jargonu Tanıtım Sitesi

KPSS ve AGS sınavlarına hazırlanan adaylar için Memur Jargonu mobil uygulamasının tanıtım sitesi.

## Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Ortam değişkenlerini ayarlayın:
   ```bash
   cp .env.example .env
   ```
   `.env` dosyasında:
   - `ADMIN_USERNAME` ve `ADMIN_PASSWORD` değerlerini güncelleyin
   - Firebase bilgilerini ekleyin (aşağıya bakın)

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Firebase Kurulumu

1. [Firebase Console](https://console.firebase.google.com) → Proje oluşturun veya mevcut projeyi seçin
2. **Project Settings** → **Service accounts** → **Generate new private key**
3. İndirilen JSON dosyasından aşağıdaki değerleri alın:

   **Seçenek A – Ayrı değişkenler:** `.env` dosyasına ekleyin:
   ```
   FIREBASE_PROJECT_ID=proje_id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@proje.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
   (`FIREBASE_PRIVATE_KEY` değerinde `\n` karakterlerini olduğu gibi bırakın)

   **Seçenek B – Tek JSON:** Tüm service account JSON'unu minify edip tek satır olarak:
   ```
   FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key":"...",...}
   ```

4. Firestore’u etkinleştirin: **Firestore Database** → **Create database** → Test/Production seçin

5. İsteğe bağlı seed (örnek blog yazısı):
   ```bash
   npm run db:seed
   ```

## Sayfalar

- **Ana sayfa** (`/`): Hero, özellikler, neden biz, CTA
- **Neden Biz** (`/neden-biz`)
- **Özellikler** (`/ozellikler`)
- **Paketler** (`/paketler`): Mağaza yönlendirmesi (magaza.memurjargonu.com)
- **Blog** (`/blog`): Liste ve tekil yazılar
- **SSS** (`/sikca-sorulan-sorular`)
- **İletişim** (`/iletisim`)
- **Yasal sayfalar**: Gizlilik, Çerez, Kullanım Koşulları

## Admin Panel

- Adres: `/admin`
- Giriş: `.env` içindeki `ADMIN_USERNAME` ve `ADMIN_PASSWORD` ile
- Blog yazıları ekleme/düzenleme
- Sayfa içeriği yönetimi (yakında)

## Vercel Deploy

1. Projeyi Vercel’e bağlayın
2. **Settings** → **Environment Variables** bölümünde:
   - `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (veya `FIREBASE_SERVICE_ACCOUNT_JSON`)

3. `FIREBASE_PRIVATE_KEY` için: Değeri çift tırnak içinde girin; `\n` karakterleri string içinde kalmalı.

## Teknoloji

- Next.js 16 (App Router)
- React 19
- Bootstrap 5, react-bootstrap
- Framer Motion
- Firebase (Firestore)
- TypeScript
