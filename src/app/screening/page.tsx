import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { Screening } from "@/components/Screening";

export const metadata: Metadata = {
  title: "CPPA/CCPA Compliance Check",
  description:
    "60-second screening to see if your business needs a CPPA/CCPA audit, based on the actual qualifying criteria from the draft cybersecurity audit regulations.",
};

export default function ScreeningPage() {
  return (
    <>
      <PageHead
        crumbs={[
          { href: "/", label: "Home" },
          { label: "CPPA/CCPA Compliance Check" },
        ]}
        title="Do you need a CPPA/CCPA audit?"
        intro="A short screening based on the actual qualifying criteria from the draft California Privacy Protection Agency cybersecurity audit regulations. Takes about a minute."
      />
      <section className="py-16 md:py-20">
        <Container>
          <Screening />
        </Container>
      </section>
    </>
  );
}
