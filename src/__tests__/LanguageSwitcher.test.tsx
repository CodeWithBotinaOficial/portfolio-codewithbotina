import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/es' }),
}));

describe('LanguageSwitcher', () => {
  it('renders all language buttons', () => {
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('PT')).toBeInTheDocument();
    expect(screen.getByText('FR')).toBeInTheDocument();
  });

  it('calls changeLanguage and navigate when a language is clicked', () => {
    const { i18n } = useTranslation();
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('EN'));
    
    expect(i18n.changeLanguage).toHaveBeenCalledWith('en');
    expect(mockNavigate).toHaveBeenCalledWith('/en');
  });

  it('navigates to pt when PT is clicked', () => {
    const { i18n } = useTranslation();
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('PT'));
    
    expect(i18n.changeLanguage).toHaveBeenCalledWith('pt');
    expect(mockNavigate).toHaveBeenCalledWith('/pt');
  });

  it('navigates to fr when FR is clicked', () => {
    const { i18n } = useTranslation();
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('FR'));
    
    expect(i18n.changeLanguage).toHaveBeenCalledWith('fr');
    expect(mockNavigate).toHaveBeenCalledWith('/fr');
  });
});
