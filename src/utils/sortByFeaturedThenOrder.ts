/**
 * Sorts an array of items by a boolean featured property and then by an numeric order property.
 * Featured items come first, and then within each group, items are sorted by order ascending.
 * 
 * @param items The items to sort
 * @param featuredKey The key of the boolean property indicating if the item is featured
 * @returns A new sorted array
 */
export const sortByFeaturedThenOrder = <T extends { orden?: number }>(
  items: T[],
  featuredKey: keyof T
): T[] => {
  return [...items].sort((a, b) => {
    const aFeatured = Boolean(a[featuredKey]);
    const bFeatured = Boolean(b[featuredKey]);
    
    // Featured items come first
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    
    // Within the same featured group, sort by orden ascending (undefined orden goes last)
    const ordenA = a.orden ?? Infinity;
    const ordenB = b.orden ?? Infinity;
    
    return ordenA - ordenB;
  });
};
