import type { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

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
            className={`mb-12 ${
              centered ? 'text-center max-w-3xl mx-auto' : ''
            }`}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-600">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;