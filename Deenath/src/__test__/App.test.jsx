import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App'; // Adjust the import path as necessa
import React from 'react';

describe('Eight Queens Puzzle App', () => {
  // Test Case 1: Player Name Submission
  test('should accept player name and start the game', () => {
    render(<App />);
    
    // Find input and button
    const input = screen.getByPlaceholderText('Enter your name');
    const button = screen.getByText('Submit');
    
    // Enter name and submit
    fireEvent.change(input, { target: { value: 'TestPlayer' } });
    fireEvent.click(button);
    
    // Verify welcome message appears
    expect(screen.getByText('Welcome, TestPlayer!')).toBeInTheDocument();
    
    // Verify input and button are gone
    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  // Test Case 2: Valid Queen Placement
  test('should accept valid queen placements and save solution', async () => {
    render(<App />);
    
    // Set up player
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), 
      { target: { value: 'TestPlayer' } });
    fireEvent.click(screen.getByText('Submit'));
    
    // Mock a valid solution (positions where queens don't attack each other)
    const validPositions = [
      { row: 0, col: 0 }, { row: 1, col: 4 }, { row: 2, col: 7 },
      { row: 3, col: 5 }, { row: 4, col: 2 }, { row: 5, col: 6 },
      { row: 6, col: 1 }, { row: 7, col: 3 }
    ];
    
    // Place queens
    validPositions.forEach(pos => {
      const cell = screen.getAllByRole('cell')[pos.row * 8 + pos.col];
      fireEvent.click(cell);
    });
    
    // Verify success message
    await waitFor(() => {
      expect(screen.getByText(/Correct! Solution saved./i)).toBeInTheDocument();
    });
    
    // Verify solution appears in table
    expect(screen.getByText('TestPlayer')).toBeInTheDocument();
  });

  // Test Case 3: Invalid Queen Placement
  test('should reject invalid queen placements', () => {
    render(<App />);
    
    // Set up player
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), 
      { target: { value: 'TestPlayer' } });
    fireEvent.click(screen.getByText('Submit'));
    
    // Place first queen
    const firstCell = screen.getAllByRole('cell')[0]; // row 0, col 0
    fireEvent.click(firstCell);
    expect(screen.getByText('♛')).toBeInTheDocument();
    
    // Try to place attacking queen in same row
    const sameRowCell = screen.getAllByRole('cell')[1]; // row 0, col 1
    fireEvent.click(sameRowCell);
    expect(screen.getAllByText('♛').length).toBe(1); // Still only 1 queen
    
    // Try to place attacking queen in same column
    const sameColCell = screen.getAllByRole('cell')[8]; // row 1, col 0
    fireEvent.click(sameColCell);
    expect(screen.getAllByText('♛').length).toBe(1);
    
    // Try to place attacking queen in diagonal
    const diagonalCell = screen.getAllByRole('cell')[9]; // row 1, col 1
    fireEvent.click(diagonalCell);
    expect(screen.getAllByText('♛').length).toBe(1);
  });

  // Additional Test: Terminate Button
  test('should reset game when terminate is clicked', async () => {
    render(<App />);
    
    // Set up player and place some queens
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), 
      { target: { value: 'TestPlayer' } });
    fireEvent.click(screen.getByText('Submit'));
    fireEvent.click(screen.getAllByRole('cell')[0]);
    
    // Click terminate
    fireEvent.click(screen.getByText('Terminate'));
    
    // Verify reset
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
      expect(screen.queryByText('♛')).not.toBeInTheDocument();
      expect(screen.getByText('Session is over')).toBeInTheDocument();
    });
  });
});