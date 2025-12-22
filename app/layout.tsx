import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond, Afacad } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dirtyline = localFont({
  src: "./fonts/Dirtyline-2022.woff2",
  variable: "--font-dirtyline",
  weight: "400", // The font-weight found in your CSS file
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
})

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "For Otter",
  description: "Happy birthday, love ❤️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dirtyline.variable} ${afacad.variable} ${garamond.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
