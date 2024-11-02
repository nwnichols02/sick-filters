// src/hooks/useCounter/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useCounter from './useCounter';

describe('useCounter', () => {
    it('should increment and decrement', () => {
        const { result } = renderHook(() => useCounter({ initial: 0 }));

        act(() => {
            result.current.increment();
        });
        expect(result.current.count).toBe(1);

        act(() => {
            result.current.decrement();
        });
        expect(result.current.count).toBe(0);
    });
});