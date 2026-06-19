import Button from './Button';
import Container from './Container';

interface Props {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  dark?: boolean;
}

export default function CtaBlock({ title, body, ctaLabel, ctaHref, dark = false }: Props) {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: dark ? 'var(--primary-deep)' : 'var(--accent)', color: 'white' }}
    >
      <Container narrow>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">{title}</h2>
          <p className="text-lg mb-8 opacity-90 font-body">{body}</p>
          <Button
            href={ctaHref}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/15"
          >
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
