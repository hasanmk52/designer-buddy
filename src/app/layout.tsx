import { ThemeProvider } from "@/components/theme-provider";
import { CreditsProvider } from "@/contexts/credits-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Designer Buddy - AI-Powered Interior Design",
  description:
    "Transform your space with AI-powered interior design. Upload a photo of your room and let AI redesign it in seconds. Get started with 30 free credits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CreditsProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <Toaster />
          </CreditsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
