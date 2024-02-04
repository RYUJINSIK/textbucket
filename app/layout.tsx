import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/shared/contexts/AuthContext";

export const metadata: Metadata = {
  title: "텍스트버킷, 좋은 글을 내 것으로.",
  description:
    "텍스트버킷에서 필사를 통해 지속가능한 마인드와 목표를 만들어 보세요",
  icons: {
    icon: "/icons/favicon_16.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <div id="global-modal">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
