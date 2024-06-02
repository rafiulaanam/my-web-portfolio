
import Navbar from "@components/Navbar";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Ui | Anam - Full Stack Developer",
};
const Footer = dynamic(() => import("@components/Footer"), { ssr: false });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container">
<Navbar/>
      {children}
      <Footer/>
  </div>
}
