import { render, waitFor } from '@testing-library/react';
import { SEO } from '../components/SEO';
import { HelmetProvider } from 'react-helmet-async';

describe('SEO component', () => {
  it('renders correct title', async () => {
    const helmetContext = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SEO 
          title="Test Title"
          description="Test Description"
          locale="en"
          path="/en"
          keywords="test, keywords"
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('Test Title');
    });
  });

  it('renders correct meta description', async () => {
    const helmetContext = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SEO 
          title="Test Title"
          description="Test Description"
          locale="en"
          path="/en"
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe('Test Description');
    });
  });
});
