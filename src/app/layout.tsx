import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "@/shared/libs/provider/styled-components-registry";
import UIThemeProvider from "@/shared/libs/provider/ui-theme-provider";
import { QueryProvider } from "@/shared/libs/provider/tanstack-query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Template",
  description: "Next.js 15 + React 19 + TanStack Query + Zustand + Ant Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <UIThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </UIThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
