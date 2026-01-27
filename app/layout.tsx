import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/shared/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VEEX Admin Portal",
  description: "Industrial IoT Platform Administration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="wrapper min-h-screen bg-background relative flex">
          <Sidebar />
          <div className="content-wrapper flex flex-col flex-1 pl-[250px] min-h-screen">
            {children}

            {/* Main Footer */}
            <footer className="main-footer bg-white border-t border-slate-200 px-8 py-4 text-xs">
              <div className="float-right hidden sm:inline text-slate-500">
                <b>Version</b> 1.3.0
              </div>
              <strong className="text-slate-700">Copyright &copy; 2026 <a href="https://veexplatform.com" className="text-primary hover:underline">VEEX Platform</a>.</strong> All rights reserved.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
