import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/cn';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  title?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

/**
 * Marketing FAQ block built on the Accordion primitive.
 */
export function FaqSection({
  title = 'Frequently asked questions',
  description,
  items,
  className,
}: FaqSectionProps) {
  return (
    <section className={cn('px-6 py-16 md:py-20', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-h2">{title}</h2>
          {description ? (
            <p className="mt-3 text-body text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
