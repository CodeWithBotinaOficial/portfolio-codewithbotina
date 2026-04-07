import React from 'react';
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

// Basic IntersectionObserver mock for framer-motion's useInView in Jest/jsdom.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe = (_target: Element) => {
    // Immediately mark as intersecting in tests.
    this.callback(
      [
        {
          isIntersecting: true,
          target: _target,
          intersectionRatio: 1,
          boundingClientRect: _target.getBoundingClientRect(),
          intersectionRect: _target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      this
    );
  };

  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

global.IntersectionObserver = MockIntersectionObserver;

const mockI18n = {
  language: 'es',
  changeLanguage: jest.fn().mockResolvedValue(true),
};

const mockT = (key: string) => key;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: mockI18n,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  m: {
    div: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  LazyMotion: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  domAnimation: {},
}));

export { mockI18n };
