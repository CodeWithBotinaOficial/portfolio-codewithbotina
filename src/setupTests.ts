import React from 'react';
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

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
