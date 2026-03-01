import type { HTMLAttributes, ReactNode, MouseEventHandler, KeyboardEventHandler } from 'react';
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
      onClick,
      onKeyDown,
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
        setIsFlipped((prev) => !prev);
      }
    };

    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented) {
        handleFlip();
      }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !isFlippable) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleFlip();
      }
    };

    if (isFlippable) {
      return (
        <div
          ref={ref}
          className={`flip-card ${isFlipped ? 'flipped' : ''} ${className}`}
          {...props}
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
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
