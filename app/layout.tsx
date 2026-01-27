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
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-background overflow-hidden`}>
        <div className="flex h-screen w-screen bg-background text-foreground">
          {/* Fixed Sidebar */}
          <Sidebar />

          {/* Main Container */}
          <div className="flex flex-col flex-1 min-h-0 relative">
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {children}
            </main>

            {/* Industrial Minimal Footer */}
            <footer className="h-10 border-t border-white/5 bg-[#0a0b10] flex items-center justify-between px-6 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
              <div className="flex items-center gap-4">
                <span>&copy; 2026 VEEX PLATFORM</span>
                <span className="text-white/10">|</span>
                <span>INDUSTRIAL GRADE CORE v1.3.0</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                  <span>SYSTEM STABLE</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
