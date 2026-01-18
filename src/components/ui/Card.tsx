import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useState } from 'react';
import HeartIcon from './HeartIcon';

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

    // Use the global 'card' class from index.css for consistent styling (shadows, rounded, bg, etc.)
    const baseStyles = 'card relative';
    
    const hoverStyles =
      hover && !isFlippable
        ? 'hover:-translate-y-1' // shadow and transition are handled by .card class
        : '';

    const handleFlip = () => {
      if (isFlippable) {
        setIsFlipped(!isFlipped);
      }
    };

    const cardContent = (
      <>
        <div className="absolute top-2 right-2 z-10">
          <HeartIcon className="w-6 h-6 text-valentine-crimson/50" />
        </div>
        {children}
      </>
    );

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
              <div className={`${baseStyles} h-full`}>{cardContent}</div>
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
        {cardContent}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;