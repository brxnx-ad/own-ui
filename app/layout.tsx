import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/assets/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "own-ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
