import type { Metadata } from "next";
import {
  Header,
  Services,
  Insurance,
  Contact,
  Footer,
  Background3D,
} from "@/components";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Software development and application support in one team. Custom web, mobile, AI, and cloud solutions. Application Support Specialist, SaaS, FinTech, Health, Education, and more by domain.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Background3D />
      <Header />
      <main>
        <Services />
        <Insurance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
