import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ConvexClientProvider from "@/provider/convex-client-provider";
import { Toaster } from "@/components/ui/sonner"

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";

const interFont = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Poneglyph Docs",
  description: "A powerful editor for the Poneglyph platform",
  authors: [{ name: "Poneglyph Team" }],
  keywords: ["poneglyph", "editor", "code editor", "platform", "documentation"],
  openGraph: {
    title: "Poneglyph Editor",
    description: "Create and edit content with the Poneglyph Editor",
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
    <html lang="en">
      <body className={interFont.className}>
        <NuqsAdapter>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
