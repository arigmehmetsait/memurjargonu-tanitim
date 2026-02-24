import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { SITE_NAME, SITE_DESCRIPTION, LOGO_PATH, SITE_URL } from "@/lib/constants/navigation";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  icons: {
    icon: LOGO_PATH,
    shortcut: LOGO_PATH,
    apple: LOGO_PATH,
  },
  title: {
    default: `${SITE_NAME} - KPSS ve AGS Hazırlık`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} d-flex flex-column min-vh-100`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
