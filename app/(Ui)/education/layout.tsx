import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | Anam - Full Stack Developer",
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
