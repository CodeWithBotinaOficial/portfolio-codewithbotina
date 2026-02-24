import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useState } from 'react';

/**
 * Props for the Card component.
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to apply hover effects (lift and shadow) */
  hover?: boolean;
  /** Whether the card has a flip animation */
  isFlippable?: boolean;
  /** Content to display on the back of the card (required if isFlippable is true) */
  cardBack?: ReactNode;
}

/**
 * Versatile Card component that supports hover effects and 3D flip animations.
 */
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

    // Base styles including rounded corners and background
    const baseStyles = 'card relative bg-surface border border-beige-200 rounded-2xl';
    
    const hoverStyles =
      hover && !isFlippable
        ? 'hover:-translate-y-1 hover:shadow-medium transition-all duration-300' 
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
              <div className={`${baseStyles} h-full overflow-hidden`}>{children}</div>
            </div>
            <div className="flip-card-back">
              <div className={`${baseStyles} h-full overflow-hidden`}>{cardBack}</div>
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
