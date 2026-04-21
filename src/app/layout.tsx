import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Friendr - Connect with those around you",
  description: "A safe space to connect with people around you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
