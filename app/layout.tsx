import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { StickyBanner } from "@/components/ui/sticky-banner";
import FooterDesk from "@/components/FooterDesk";
const monument = localFont({
  src: [
    {
      path: "../public/fonts/MonumentExtended-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MonumentExtended-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-monument",
});

const poppins = localFont({
  src: [
    { path: "../public/fonts/Poppins-Thin.ttf", weight: "100" },
    { path: "../public/fonts/Poppins-ExtraLight.ttf", weight: "200" },
    { path: "../public/fonts/Poppins-Light.ttf", weight: "300" },
    { path: "../public/fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "../public/fonts/Poppins-Medium.ttf", weight: "500" },
    { path: "../public/fonts/Poppins-SemiBold.ttf", weight: "600" },
    { path: "../public/fonts/Poppins-Bold.ttf", weight: "700" },
    { path: "../public/fonts/Poppins-ExtraBold.ttf", weight: "800" },
    { path: "../public/fonts/Poppins-Black.ttf", weight: "900" },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your site description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monument.variable} ${poppins.variable}`}>
        {/* App wrapper */}
        <div className="relative min-h-screen bg-background overflow-x-hidden">
          {/* 🔒 Background texture layer */}
          <div
            className="absolute inset-0 z-0 opacity-7 pointer-events-none"
            style={{
              backgroundImage: "url('/images/Logo.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "1200px",
              backgroundPosition: "center top",
            }}
          />

          {/* 🔝 UI layer */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Navbar must always win */}
            <div className="relative z-50">
              <Navbar />
              <StickyBanner>
                Relevent 2025 – Register Now – Gateway to Leadership and
                Innovation
              </StickyBanner>
              <MobileMenu />
            </div>

            {/* Page content */}
            <main className="flex-1">{children}</main>

            <div className="md:hidden sm:hidden mt-5">
              <Footer />
            </div>
            <div className="hidden md:block sm:block sm:mx-15 lg:mx-0">
              <FooterDesk />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
