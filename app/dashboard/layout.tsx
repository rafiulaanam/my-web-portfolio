
import { Metadata } from "next";
import Sidebar from "./Sidebar";


export const metadata: Metadata = {
  title: "Dashboard | Anam - Full Stack Developer",
};
 
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>
}
