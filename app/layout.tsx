import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./nav"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NBA 2022 Season Database",
  description: "Explore the analytics of the NBA 2022 Season!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-90 xl:mx-120 inter.className`}>
        <Nav />
        {children}
        </body>
    </html>
  );
}
