import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App';
import React from 'react';

describe('Eight Queens Puzzle App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should accept player name and start the game', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter your name');
    const button = screen.getByText('Submit');
    fireEvent.change(input, { target: { value: 'TestPlayer' } });
    fireEvent.click(button);
    expect(screen.getByText('Welcome, TestPlayer!')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Enter your name')).not.toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  test('should accept valid queen placements and save solution', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'TestPlayer' } });
    fireEvent.click(screen.getByText('Submit'));
    // Valid solution: one queen per row/col/diagonal
    const validPositions = [
      { row: 0, col: 0 }, { row: 1, col: 4 }, { row: 2, col: 7 },
      { row: 3, col: 5 }, { row: 4, col: 2 }, { row: 5, col: 6 },
      { row: 6, col: 1 }, { row: 7, col: 3 }
    ];
    validPositions.forEach(pos => {
      const cell = screen.getAllByRole('cell')[pos.row * 8 + pos.col];
      fireEvent.click(cell);
    });
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Correct! Solution saved.");
    });
    expect(screen.getByText('TestPlayer')).toBeInTheDocument();
    alertMock.mockRestore();
  });

  test('should reject invalid queen placements', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'TestPlayer' } });
    fireEvent.click(screen.getByText('Submit'));
    const firstCell = screen.getAllByRole('cell')[0];
    fireEvent.click(firstCell);
    expect(screen.getByText('♛')).toBeInTheDocument();
    // Same row
    const sameRowCell = screen.getAllByRole('cell')[1];
    fireEvent.click(sameRowCell);
    expect(screen.getAllByText('♛').length).toBe(1);
    // Same column
    const sameColCell = screen.getAllByRole('cell')[8];
    fireEvent.click(sameColCell);
    expect(screen.getAllByText('♛').length).toBe(1);
    // Diagonal
    const diagonalCell = screen.getAllByRole('cell')[9];
    fireEvent.click(diagonalCell);
    expect(screen.getAllByText('♛').length).toBe(1);
  });

  test('should reset game when terminate is clicked', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'TestPlayer' } });
    fireEvent.click(screen.getByText('Submit'));
    fireEvent.click(screen.getAllByRole('cell')[0]);
    fireEvent.click(screen.getByText('Terminate'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
      expect(screen.queryByText('♛')).not.toBeInTheDocument();
      expect(screen.getByText('Session is over')).toBeInTheDocument();
    });
  });
});