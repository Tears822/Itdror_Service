import type { Metadata } from "next";
import { Header, About, Footer, Background3D } from "@/components";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Meet the IT Dor Services team. We combine custom software development with dedicated application support—one team for build and support, remote delivery worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Background3D />
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
