import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Props for the Layout component.
 */
interface LayoutProps {
  /** The content to be rendered inside the layout */
  children: ReactNode;
}

/**
 * Main layout component that wraps the application content.
 * Provides the consistent Header and Footer structure.
 * 
 * @param children - The page content
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-text-main">
      <Header />
      {/* 
        pt-20 compensates for the fixed header height to prevent content overlap.
        flex-grow ensures the footer stays at the bottom even on short pages.
      */}
      <main className="flex-grow pt-20 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
