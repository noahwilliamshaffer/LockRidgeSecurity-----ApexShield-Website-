import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-cyan-deep">
          404
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <LinkButton href="/" size="lg" variant="primary">
            Back to home
          </LinkButton>
          <LinkButton href="/screening" size="lg" variant="outline">
            Take the screening
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
