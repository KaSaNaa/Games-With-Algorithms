import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

test('renders Eight Queens Puzzle title', () => {
  render(<App />);
  expect(screen.getByText(/Eight Queens Puzzle/i)).toBeInTheDocument();
});
