import { sortByFeaturedThenOrder } from '../utils/sortByFeaturedThenOrder';

describe('sortByFeaturedThenOrder', () => {
  interface TestItem {
    id: number;
    destacado?: boolean;
    destacada?: boolean;
    orden?: number;
  }

  test('Featured items always appear before non-featured ones', () => {
    const items: TestItem[] = [
      { id: 1, destacado: false, orden: 1 },
      { id: 2, destacado: true, orden: 2 },
      { id: 3, destacado: false, orden: 3 },
      { id: 4, destacado: true, orden: 4 },
    ];

    const sorted = sortByFeaturedThenOrder(items, 'destacado');

    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(4);
    expect(sorted[2].id).toBe(1);
    expect(sorted[3].id).toBe(3);
  });

  test('Within featured group, lower orden appears first', () => {
    const items: TestItem[] = [
      { id: 1, destacado: true, orden: 2 },
      { id: 2, destacado: true, orden: 1 },
    ];

    const sorted = sortByFeaturedThenOrder(items, 'destacado');

    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(1);
  });

  test('Within non-featured group, lower orden appears first', () => {
    const items: TestItem[] = [
      { id: 1, destacado: false, orden: 2 },
      { id: 2, destacado: false, orden: 1 },
    ];

    const sorted = sortByFeaturedThenOrder(items, 'destacado');

    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(1);
  });

  test('Items with undefined orden appear last within their group', () => {
    const items: TestItem[] = [
      { id: 1, destacado: true, orden: 1 },
      { id: 2, destacado: true, orden: undefined },
      { id: 3, destacado: false, orden: 1 },
      { id: 4, destacado: false, orden: undefined },
    ];

    const sorted = sortByFeaturedThenOrder(items, 'destacado');

    expect(sorted[0].id).toBe(1);
    expect(sorted[1].id).toBe(2);
    expect(sorted[2].id).toBe(3);
    expect(sorted[3].id).toBe(4);
  });

  test('Items with destacado: false and items with destacado: undefined are both treated as non-featured', () => {
    const items: TestItem[] = [
      { id: 1, destacado: undefined, orden: 1 },
      { id: 2, destacado: true, orden: 1 },
      { id: 3, destacado: false, orden: 2 },
    ];

    const sorted = sortByFeaturedThenOrder(items, 'destacado');

    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(1);
    expect(sorted[2].id).toBe(3);
  });

  test('An empty array returns an empty array', () => {
    const items: TestItem[] = [];
    const sorted = sortByFeaturedThenOrder(items, 'destacado');
    expect(sorted).toEqual([]);
  });

  test('A single item array returns the same item', () => {
    const items: TestItem[] = [{ id: 1, destacado: true, orden: 1 }];
    const sorted = sortByFeaturedThenOrder(items, 'destacado');
    expect(sorted).toEqual(items);
  });

  test('Works with different featured key (destacada)', () => {
    const items: TestItem[] = [
      { id: 1, destacada: false, orden: 1 },
      { id: 2, destacada: true, orden: 1 },
    ];

    const sorted = sortByFeaturedThenOrder(items, 'destacada');

    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(1);
  });
});
