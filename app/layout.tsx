import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "Jellyfish",
  description: "AI Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <link rel="stylesheet" href="https://use.typekit.net/agj7gnk.css" />
        <link rel="stylesheet" href="https://use.typekit.net/aon3rzv.css"></link>
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
