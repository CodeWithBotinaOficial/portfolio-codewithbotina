import type { HTMLAttributes } from 'react';

/**
 * Props for the Section component.
 */
interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Optional section title */
  title?: string;
  /** Optional section subtitle/description */
  subtitle?: string;
  /** Whether to center the title and subtitle */
  centered?: boolean;
}

/**
 * Standard layout section with consistent padding and container width.
 * Optionally renders a title and subtitle.
 */
const Section = ({
  children,
  title,
  subtitle,
  centered = false,
  className = '',
  id,
  ...props
}: SectionProps) => {
  return (
    <section
      id={id}
      className={`section-padding ${className}`}
      {...props}
    >
      <div className="container-custom">
        {(title || subtitle) && (
          <div
            className={`mb-16 ${
              centered ? 'text-center max-w-3xl mx-auto' : ''
            }`}
          >
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight font-heading">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-text-muted font-light leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
