import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import topGradient from "@public/topGradient.svg";
import { inter, poppins } from "@app/fonts";
import ThemeProvider from "@app/(Ui)/contex/ThemeContex";
import AuthProvider from "@components/AuthProvider";
import Button from "@components/Button";

export const metadata: Metadata = {
  metadataBase: new URL("https://rafiulaanam.vercel.app"),
  title: "Anam - Full Stack Developer",
  description:
    "As a full-stack developer, I assist emerging businesses in achieving their digital aspirations. I specialize in developing modern web applications",
  keywords:
    "Anam Rafiul, Anam,Portfolio, rafiulaanam, Anam Portfolio, web developer Portfolio",
  authors: [
    { name: "Rafiul Anam", url: "https://linkedin.com/in/rafiulaanam" },
  ],
  verification: {
    google: "fXdwObHVbw1lHf43nqKlsB7ZwhohZGTglPx2CY4RAVg",
  },
  openGraph: {
    images: "/logo.webp",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AuthProvider>
          <body className={inter.className}>
            <main className=" relative">
              <div className="w-full h-[500px] absolute top-0 right-0 -z-10">
                <Image
                  src={topGradient}
                  alt="gradient"
                  quality={100}
                  fill
                  sizes="100vw"
                  priority
                  className="w-full object-cover blur-2xl"
                />
              </div>
              {/* show logo on mobile */}
              <div className="w-full relative text-center block mb-20 sm:hidden">
                <Button
                  link="/"
                  variant="icon"
                  title="rafiulaanam"
                  className={`!text-4xl dark:text-white !p-0 !font-bold ${poppins.className}`}
                >
                  {"<Anam/>"}
                </Button>
              </div>
      
              {children}
            </main>
    
          </body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
