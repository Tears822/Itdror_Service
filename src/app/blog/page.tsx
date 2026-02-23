import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer, Background3D } from "@/components";
import { getAllPosts } from "./lib/posts";
import { ArrowRight, Calendar } from "lucide-react";

const siteUrl = "https://itdorservices.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on software development, application support, and building products that last. From the IT Dor Services team.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog | IT Dor Services",
    description: "Insights on software development and application support.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Background3D />
      <Header />
      <main className="min-h-screen pt-28 md:pt-32 pb-16">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-4 block">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Insights & <span className="gradient-text">Updates</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted">
              Thoughts on software development, application support, and building products that last.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-accent/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                {post.image ? (
                  <div className="aspect-video relative bg-white/5">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <span className="text-4xl text-accent/50 font-bold">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
