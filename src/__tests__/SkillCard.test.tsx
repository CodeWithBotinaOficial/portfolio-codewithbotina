import { render, screen } from '@testing-library/react';
import SkillCard from '../components/sections/skills/SkillCard';

describe('SkillCard', () => {
  it('renders nombre and progress bar with correct aria attributes', () => {
    render(
      <SkillCard
        skill={{
          id: '1',
          nombre: 'React',
          categoria: ['Frontend'],
          nivel: 80,
        }}
      />
    );

    expect(screen.getByText('React')).toBeInTheDocument();

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '80');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-label', 'skills.levelLabel: React');
  });
});

