const siteUrl = "https://itdorservices.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IT Dor Services",
  url: siteUrl,
  logo: `${siteUrl}/assets/logo.png`,
  description:
    "Professional IT support, network setup, cybersecurity, cloud solutions, and software development delivered remotely to clients worldwide.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-617-712-9076",
    contactType: "sales",
    email: "sales@itdorservices.com",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/itdorservices",
    "https://www.youtube.com/channel/UCxs816FBY3ma1bjTFqz2QXg",
    "https://www.instagram.com/itdorservices",
    "https://x.com/itdorservices",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IT Dor Services",
  url: siteUrl,
  description:
    "IT consulting, network setup, cybersecurity, cloud solutions, and software development delivered remotely worldwide.",
  publisher: {
    "@type": "Organization",
    name: "IT Dor Services",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/assets/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function JsonLd() {
  const jsonLd = [organizationSchema, websiteSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
