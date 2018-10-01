import { numberToString } from './utils';

describe('numberToString', () => {
    test('undefined', () => {
        const s = numberToString(undefined);
        expect(s).not.toBeUndefined();
        expect(s).toBe('-');
    });

    test('42 schould be 42,00', () => {
        const n = numberToString(42);
        expect(n).toBe('42,00');
    });

    test('1042 schould be 1.042,00', () => {
        const n = numberToString(1042);
        expect(n).toBe('1.042,00');
    });

    test('9991042 schould be 9.991.042,00', () => {
        const n = numberToString(9991042);
        expect(n).toBe('9.991.042,00');
    });

    test('9991042 schould be 9.991.042', () => {
        const n = numberToString(9991042);
        expect(n).toBe('9.991.042,00');
    });

    test('9991042 schould be 9.991.042 (with 0 decimalDigits)', () => {
        const n = numberToString(9991042, 0);
        expect(n).toBe('9.991.042');
    });

    test('42 schould be 42,0 (with 1 decimalDigits)', () => {
        const n = numberToString(42, 1);
        expect(n).toBe('42,0');
    });

    test('42 schould be 42,00 (with 2 decimalDigits)', () => {
        const n = numberToString(42, 2);
        expect(n).toBe('42,00');
    });

    test('42 schould be 42,000 (with 3 decimalDigits)', () => {
        const n = numberToString(42, 3);
        expect(n).toBe('42,000');
    });

    test('42 schould be 42,0000000000000 (with 13 decimalDigits)', () => {
        const n = numberToString(42, 13);
        expect(n).toBe('42,0000000000000');
    });

    test('42.1 schould be 42,1 (with 1 decimalDigits)', () => {
        const n = numberToString(42.1, 1);
        expect(n).toBe('42,1');
    });

    test('42.15 schould be 42,15 (with 2 decimalDigits)', () => {
        const n = numberToString(42.15, 2);
        expect(n).toBe('42,15');
    });

    test('42.15 schould be 42,1 (with 2 decimalDigits)', () => {
        const n = numberToString(42.15, 1);
        expect(n).toBe('42,1');
    });

    test('42.1 schould be 42,100 (with 3 decimalDigits)', () => {
        const n = numberToString(42.1, 3);
        expect(n).toBe('42,100');
    });
});

