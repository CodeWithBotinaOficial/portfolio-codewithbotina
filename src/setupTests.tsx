import React from 'react';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'es',
      changeLanguage: jest.fn(),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  m: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  LazyMotion: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  domAnimation: {},
}));
