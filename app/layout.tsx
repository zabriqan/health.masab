import type { Metadata, Viewport } from "next";
import { I18nProvider } from "./components/i18n-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masab — Home nursing, done right",
  icons: { icon: "/favicon.svg" },
  description:
    "Meet Masab: a simpler way to arrange home nursing, follow a visit and stay in touch with your nurse.",
  openGraph: {
    title: "Masab — Home nursing, done right",
    description:
      "Book and manage home nursing through one thoughtful app experience.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7faf9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><I18nProvider>{children}</I18nProvider></body>
    </html>
  );
}
