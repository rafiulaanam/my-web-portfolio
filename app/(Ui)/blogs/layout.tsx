import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Anam - Full Stack Developer",
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
