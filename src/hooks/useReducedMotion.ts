import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Custom hook to detect if the user has requested reduced motion at the system level.
 * 
 * @returns boolean - true if reduced motion is preferred, false otherwise
 */
export function useReducedMotion() {
  const shouldReduceMotion = useFramerReducedMotion();
  return shouldReduceMotion ?? false;
}
