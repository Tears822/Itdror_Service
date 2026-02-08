import { Header, Hero, Services, About, Contact, Footer, OrbBackground, CursorEffect, FloatingLines, Insurance } from "@/components";

export default function Home() {
  return (
    <>
      <OrbBackground />
      <FloatingLines 
        lineCount={60}
        colors={["#2da0ff", "#00d4ff", "#0066cc", "#4dc9ff", "#0080d0", "#1a8fff", "#66ccff", "#99ddff"]}
        speed={1}
        opacity={0.5}
      />
      <CursorEffect />
      <Header />
      <main>
        <Hero />
        <Services />
        <Insurance />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
