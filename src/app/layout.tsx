import type { Metadata } from "next";

import "./globals.css";
import Header from "@/component/Header";
import SideBar from "@/component/SideBar";
import Footer from "@/component/Footer";
import RecoilProvider from "./providers/recoilProvider";

export const metadata: Metadata = {
  title: "글림 디자인",
  description:
    "글림 솔루션이 제공하는 솔루션으로 원하는 목표를 이루시길 바랍니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RecoilProvider>
          <Header />
          <main className="flex flex-1">
            <SideBar />
            <div className="w-full">{children}</div>
          </main>
          <Footer />
        </RecoilProvider>
      </body>
    </html>
  );
}
