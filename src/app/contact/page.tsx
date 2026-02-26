import type { Metadata } from "next";
import {
  Header,
  Contact,
  Footer,
  Background3D,
} from "@/components";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Get a free consultation for software development and application support. Same day response. We build your applications and support them after launch.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Background3D />
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
