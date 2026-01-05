import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useState } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  isFlippable?: boolean;
  cardBack?: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      hover = true,
      className = '',
      isFlippable = false,
      cardBack,
      ...props
    },
    ref
  ) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const baseStyles = 'bg-white rounded-xl shadow-lg overflow-hidden';
    const hoverStyles =
      hover && !isFlippable
        ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300'
        : '';

    const handleFlip = () => {
      if (isFlippable) {
        setIsFlipped(!isFlipped);
      }
    };

    if (isFlippable) {
      return (
        <div
          ref={ref}
          className={`flip-card ${isFlipped ? 'flipped' : ''} ${className}`}
          onClick={handleFlip}
          {...props}
        >
          <div className="flip-card-inner h-full">
            <div className="flip-card-front">
              <div className={`${baseStyles} h-full`}>{children}</div>
            </div>
            <div className="flip-card-back">
              <div className={`${baseStyles} h-full`}>{cardBack}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;