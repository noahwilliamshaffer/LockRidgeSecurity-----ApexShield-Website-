import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { listPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "ApexShield's blog covering California privacy (CPPA/CCPA) compliance for small and mid-sized businesses.",
};

export default async function BlogPage() {
  const posts = await listPosts();
  return (
    <>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "Blog" }]}
        title="Blog"
        intro="Plain-language writing on California privacy law, the CPPA cybersecurity audit, and what it means for small and mid-sized businesses."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="group rounded-xl border border-ink-200 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-cyan hover:shadow-card"
              >
                <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500">
                  {p.category ?? "CPPA"} · {p.date || "Coming soon"}
                </div>
                <h3 className="text-xl font-bold text-navy-900 transition-colors group-hover:text-cyan-deep">
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="mt-2 text-ink-600">{p.excerpt}</p>
                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-deep"
                >
                  Read
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
