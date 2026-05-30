import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your environment and what you need. ApexShield reaches out to talk through next steps.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        title="Tell us what you need."
        intro="We'll review your message and reach out to talk through next steps. Most replies go out within one business day."
      />
      <section className="py-16 md:py-20">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
