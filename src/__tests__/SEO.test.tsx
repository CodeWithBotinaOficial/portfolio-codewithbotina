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
          locale="es"
          path="/es"
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('Test Title');
    });
  });
});
