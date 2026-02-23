import type { Metadata } from "next";
import { Header, Footer, Background3D } from "@/components";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const baseUrl = "https://itdorservices.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for IT Dor Services. Read our terms and conditions for using our IT consulting, development, and technology services.",
  alternates: {
    canonical: `${baseUrl}/terms-of-service`,
  },
  openGraph: {
    title: "Terms of Service | IT Dor Services",
    description:
      "Terms and conditions for using IT Dor Services' IT consulting and development services.",
    url: `${baseUrl}/terms-of-service`,
    type: "website",
  },
};

export default function TermsOfService() {
  return (
    <>
      <Background3D />
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted leading-relaxed">
                By accessing or using ITDor Services' website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Services Description</h2>
              <p className="text-muted leading-relaxed mb-4">
                ITDor Services provides IT consulting, network setup, cybersecurity, cloud solutions, software development, and related technology services. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
              <p className="text-muted leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on ITDor Services' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Service Agreements</h2>
              <p className="text-muted leading-relaxed mb-4">
                When you engage our services, a separate service agreement will be executed that outlines:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>Scope of work and deliverables</li>
                <li>Pricing and payment terms</li>
                <li>Timeline and milestones</li>
                <li>Intellectual property rights</li>
                <li>Warranties and limitations of liability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
              <p className="text-muted leading-relaxed mb-4">
                Payment terms will be specified in your service agreement. Generally:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>Invoices are due within the timeframe specified in the agreement</li>
                <li>Late payments may incur interest charges</li>
                <li>We reserve the right to suspend services for non-payment</li>
                <li>All fees are non-refundable unless otherwise stated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-muted leading-relaxed">
                All content, materials, and intellectual property on our website and in our services are owned by ITDor Services or our licensors. Unless otherwise specified in a service agreement, all custom-developed software and solutions remain the property of ITDor Services until full payment is received, at which point ownership may transfer as specified in the agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Client Responsibilities</h2>
              <p className="text-muted leading-relaxed mb-4">
                Clients are responsible for:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>Providing accurate and complete information</li>
                <li>Granting necessary access to systems and data</li>
                <li>Backing up data before service commencement</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Maintaining confidentiality of any credentials or access provided</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Warranties and Disclaimers</h2>
              <p className="text-muted leading-relaxed mb-4">
                Our services are provided "as is" and "as available." We make no warranties, expressed or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>Warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property rights</li>
                <li>Uninterrupted or error-free service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted leading-relaxed">
                To the maximum extent permitted by law, ITDor Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Confidentiality</h2>
              <p className="text-muted leading-relaxed">
                Both parties agree to maintain the confidentiality of any proprietary or confidential information shared during the course of providing services. This obligation survives termination of the service agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
              <p className="text-muted leading-relaxed mb-4">
                Either party may terminate a service agreement:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>Upon written notice if the other party breaches a material term</li>
                <li>As specified in the service agreement</li>
                <li>For convenience with appropriate notice and payment terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
              <p className="text-muted leading-relaxed">
                You agree to indemnify and hold harmless ITDor Services, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
              <p className="text-muted leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
              <p className="text-muted leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 space-y-2 text-muted">
                <p>Email: <a href="mailto:sales@itdorservices.com" className="text-accent hover:underline">sales@itdorservices.com</a></p>
                <p>Phone: <a href="tel:+16177129076" className="text-accent hover:underline">+1 (617) 712-9076</a></p>
                <p>Services delivered remotely worldwide. Contact: Boston, MA, USA.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
