import {
  Header,
  Hero,
  ServicesTeaser,
  StatsSection,
  HowWeWorkSection,
  FeaturedWorkSection,
  TestimonialsSection,
  TechStackSection,
  CTABlock,
  Footer,
  Background3D,
} from "@/components";

export default function Home() {
  return (
    <>
      <Background3D />
      <Header />
      <main>
        <Hero />
        <ServicesTeaser />
        <StatsSection />
        <HowWeWorkSection />
        <FeaturedWorkSection />
        <TestimonialsSection />
        <TechStackSection />
        <CTABlock />
      </main>
      <Footer />
    </>
  );
}
