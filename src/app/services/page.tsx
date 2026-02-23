import {
  Header,
  Services,
  Insurance,
  Contact,
  Footer,
  Background3D,
} from "@/components";

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
