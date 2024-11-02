// src/components/CustomButton/CustomButton.test.tsx
import { render, screen } from '@testing-library/react';
import CustomButton from './CustomButton';
import { describe, expect, it } from 'vitest';

describe('CustomButton', () => {
    it('renders with custom label', () => {
        render(<CustomButton customLabel="Test Button" />);
        expect(screen.getByText('Test Button'));
    });
});