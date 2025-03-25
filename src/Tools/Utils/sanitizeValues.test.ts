import { sanitizeValue, sanitizeObject } from './sanitizeValues.js';

describe('sanitizeValue', () => {
  it('removes javascript protocol', () => {
    expect(sanitizeValue('javascript:alert("xss")')).toBe('alert("xss")');
    expect(sanitizeValue('JAVASCRIPT:alert("xss")')).toBe('alert("xss")');
  });

  it('removes HTML tags', () => {
    expect(sanitizeValue('<script>alert("xss")</script>')).toBe('alert("xss")');
    expect(sanitizeValue('<div>Hello</div>')).toBe('Hello');
    expect(sanitizeValue('<p>Text with <span>nested</span> tags</p>')).toBe('Text with nested tags');
  });

  it('escapes special characters', () => {
    expect(sanitizeValue('&')).toBe('&amp;');
    expect(sanitizeValue('<')).toBe('&lt;');
    expect(sanitizeValue('>')).toBe('&gt;');
  });

  it('trims whitespace', () => {
    expect(sanitizeValue('  hello  ')).toBe('hello');
    expect(sanitizeValue('\n\t\r  hello  \n\t\r')).toBe('hello');
  });

  it('handles multiple sanitization requirements', () => {
    expect(sanitizeValue('  javascript:alert("<script>")  ')).toBe('alert("")');
    expect(sanitizeValue('<div>Hello & World</div>')).toBe('Hello &amp; World');
  });
});

describe('sanitizeObject', () => {
  it('handles primitive values', () => {
    expect(sanitizeObject('  <script>alert("xss")</script>  ')).toBe('alert("xss")');
    expect(sanitizeObject(123)).toBe(123);
    expect(sanitizeObject(true)).toBe(true);
    expect(sanitizeObject(null)).toBe(null);
    expect(sanitizeObject(undefined)).toBe(undefined);
  });

  it('handles arrays', () => {
    const input = [
      '  <script>alert("xss")</script>  ',
      'javascript:alert("xss")',
      'Hello & World'
    ];
    const expected = [
      'alert("xss")',
      'alert("xss")',
      'Hello &amp; World'
    ];
    expect(sanitizeObject(input)).toEqual(expected);
  });

  it('handles nested objects', () => {
    const input = {
      name: '  <script>alert("xss")</script>  ',
      address: {
        street: 'javascript:alert("xss")',
        city: 'Hello & World'
      }
    };
    const expected = {
      name: 'alert("xss")',
      address: {
        street: 'alert("xss")',
        city: 'Hello &amp; World'
      }
    };
    expect(sanitizeObject(input)).toEqual(expected);
  });

  it('handles arrays of objects', () => {
    const input = [
      { name: '<script>alert("xss")</script>' },
      { address: 'javascript:alert("xss")' }
    ];
    const expected = [
      { name: 'alert("xss")' },
      { address: 'alert("xss")' }
    ];
    expect(sanitizeObject(input)).toEqual(expected);
  });

  it('handles deeply nested structures', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            value: '<script>alert("xss")</script>'
          }
        }
      }
    };
    const expected = {
      level1: {
        level2: {
          level3: {
            value: 'alert("xss")'
          }
        }
      }
    };
    expect(sanitizeObject(input)).toEqual(expected);
  });

  it('handles empty objects and arrays', () => {
    expect(sanitizeObject({})).toEqual({});
    expect(sanitizeObject([])).toEqual([]);
  });

  it('handles mixed data types', () => {
    const input = {
      string: '  <script>alert("xss")</script>  ',
      number: 123,
      boolean: true,
      null: null,
      undefined: undefined,
      array: [
        'javascript:alert("xss")',
        456,
        false
      ],
      object: {
        string: 'Hello & World',
        number: 789,
        boolean: false
      }
    };
    const expected = {
      string: 'alert("xss")',
      number: 123,
      boolean: true,
      null: null,
      undefined: undefined,
      array: [
        'alert("xss")',
        456,
        false
      ],
      object: {
        string: 'Hello &amp; World',
        number: 789,
        boolean: false
      }
    };
    expect(sanitizeObject(input)).toEqual(expected);
  });
});
