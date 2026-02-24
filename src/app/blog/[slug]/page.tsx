import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer, Background3D } from "@/components";
import { getPostBySlug, getAllSlugs } from "../lib/posts";
import { ArrowLeft, Calendar, User } from "lucide-react";

const siteUrl = "https://itdorservices.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  const url = `${siteUrl}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | IT Dor Services Blog`,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      ...(post.image && {
        images: [{ url: post.image, width: 800, height: 420, alt: post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | IT Dor Services Blog`,
      description: post.excerpt,
      ...(post.image && { images: [post.image] }),
    },
  };
}

function renderInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={j} className="text-foreground font-medium">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function renderBody(body: string) {
  const blocks = body.split(/\n\n+/).filter(Boolean);
  const elements: React.ReactNode[] = [];

  blocks.forEach((block, blockIndex) => {
    const trimmed = block.trim();
    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

    // Standalone heading: single line, **Heading**
    if (
      lines.length === 1 &&
      lines[0].startsWith("**") &&
      lines[0].endsWith("**") &&
      !lines[0].slice(2, -2).includes("**")
    ) {
      elements.push(
        <h3
          key={`${blockIndex}-h`}
          className="text-lg font-semibold mt-8 mb-3 text-foreground first:mt-0"
        >
          {lines[0].replace(/\*\*/g, "")}
        </h3>
      );
      return;
    }

    // Unordered list: all lines start with "- "
    if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
      elements.push(
        <ul key={`${blockIndex}-ul`} className="list-none space-y-2 mb-6 pl-0">
          {lines.map((line, i) => {
            const content = line.slice(2).trim(); // remove "- "
            return (
              <li
                key={i}
                className="flex gap-2 text-muted leading-relaxed before:content-['–'] before:text-accent before:shrink-0"
              >
                <span>{renderInlineBold(content)}</span>
              </li>
            );
          })}
        </ul>
      );
      return;
    }

    // Ordered list: lines start with "1. ", "2. ", etc.
    if (lines.length > 0 && /^\d+\.\s/.test(lines[0])) {
      elements.push(
        <ol key={`${blockIndex}-ol`} className="list-decimal list-inside space-y-2 mb-6 pl-2 text-muted leading-relaxed">
          {lines.map((line, i) => {
            const content = line.replace(/^\d+\.\s*/, "");
            return (
              <li key={i} className="pl-1">
                {renderInlineBold(content)}
              </li>
            );
          })}
        </ol>
      );
      return;
    }

    // Paragraph(s)
    const paragraphText = lines.join(" ");
    elements.push(
      <p key={`${blockIndex}-p`} className="text-muted leading-relaxed mb-6">
        {renderInlineBold(paragraphText)}
      </p>
    );
  });

  return elements;
}

function ArticleJsonLd({
  post,
  slug,
}: {
  post: { title: string; excerpt: string; date: string; author: string; image?: string };
  slug: string;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "IT Dor Services",
      logo: { "@type": "ImageObject", url: `${siteUrl}/assets/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${slug}` },
    ...(post.image && { image: post.image }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <ArticleJsonLd post={post} slug={slug} />
      <Background3D />
      <Header />
      <main className="min-h-screen pt-28 md:pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </header>

          {post.image && (
            <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 mb-10">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-muted">
            {renderBody(post.body)}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
