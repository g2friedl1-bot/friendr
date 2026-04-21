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
    <html lang="en" className="dark">
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('friendr_theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}})();` }} />
      </head>
      <body className="antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
