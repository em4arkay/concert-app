// frontend/components/ConcertCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Adds matchers like .toBeInTheDocument()
import { ConcertCard } from './ConcertCard';

describe('ConcertCard', () => {
    // Create mock functions for the props
    const mockOnDelete = jest.fn();
    const mockOnReserve = jest.fn();
    const mockOnCancel = jest.fn();

    it('renders admin card correctly', () => {
        // 1. Arrange
        render(
            <ConcertCard
                id="c1"
                name="Admin Concert"
                description="A test."
                totalSeats={100}
                role="admin"
                onDelete={mockOnDelete}
            />,
        );

        // 2. Act
        // (No action needed, just checking render)

        // 3. Assert
        // Check that the name is on the screen
        expect(screen.getByText('Admin Concert')).toBeInTheDocument();

        // Check that the "Delete" button is there
        const deleteButton = screen.getByRole('button', { name: /Delete/i });
        expect(deleteButton).toBeInTheDocument();

        // Check that the "Reserve" button is NOT there
        const reserveButton = screen.queryByRole('button', { name: /Reserve/i });
        expect(reserveButton).not.toBeInTheDocument();

        // Bonus: Check that clicking the button calls our mock function
        fireEvent.click(deleteButton);
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    // You would also write another 'it' block for the 'user' role
});