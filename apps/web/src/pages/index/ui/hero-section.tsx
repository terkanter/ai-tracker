import { Code } from "@workspace/ui/code";
import { Snippet } from "@workspace/ui/snippet";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  cta?: {
    text: string;
    href: string;
  };
}

export function HeroSection({
  title: heroTitle,
  subtitle: heroSubtitle,
  description,
  cta,
}: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {cta && (
        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              {cta.text} <Code color="primary">{cta.href}</Code>
            </span>
          </Snippet>
        </div>
      )}
    </section>
  );
}
