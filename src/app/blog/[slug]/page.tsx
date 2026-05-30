import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { LinkButton } from "@/components/Button";
import { getPost, listSlugs } from "@/lib/posts";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Params) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <PageHead
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { label: post.title },
        ]}
        title={post.title}
        intro={`By ${post.author}${post.date ? ` · ${post.date}` : " · Coming soon"}`}
      />
      <section className="py-16 md:py-20">
        <Container>
          <article className="prose-apex">
            <MDXRemote source={post.content} />
            <div className="mt-10">
              <Link href="/blog" className="text-cyan-deep">
                ← Back to the blog
              </Link>
            </div>
          </article>
          <div className="mx-auto mt-12 max-w-prose rounded-xl border border-ink-200 bg-ink-50 p-6 text-center">
            <p className="mb-4 text-lg text-ink-700">
              Want to know if any of this applies to your business?
            </p>
            <LinkButton href="/screening" size="lg" variant="primary">
              Take the 60-second screening
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
