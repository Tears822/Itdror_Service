const siteUrl = "https://itdorservices.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IT Dor Services",
  url: siteUrl,
  logo: `${siteUrl}/assets/logo.png`,
  description:
    "Software development and application support in one team. Custom applications plus dedicated support after launch. Delivered remotely worldwide.",
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
    "Software development and application support delivered remotely worldwide. Build and support your applications with one integrated team.",
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

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "IT Dor Services",
  url: siteUrl,
  description:
    "Custom software development and application support. We build your applications and support them after launch—web, mobile, AI, cloud, and dedicated application support.",
  image: `${siteUrl}/assets/logo.png`,
  logo: `${siteUrl}/assets/logo.png`,
  areaServed: "Worldwide",
  serviceType: [
    "Software Development",
    "Application Support",
    "Web Development",
    "Mobile App Development",
    "Cloud & DevOps",
    "UI/UX Design",
  ],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-617-712-9076",
    contactType: "sales",
    email: "sales@itdorservices.com",
    areaServed: "Worldwide",
    availableLanguage: "English",
    url: `${siteUrl}/contact`,
  },
};

export function JsonLd() {
  const jsonLd = [organizationSchema, websiteSchema, professionalServiceSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
