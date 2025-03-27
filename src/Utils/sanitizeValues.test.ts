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

  it('prevents SQL injection', () => {
    // Basic SQL injection patterns
    expect(sanitizeValue("O'Connor")).toBe("O''Connor");
    expect(sanitizeValue("' OR '1'='1")).toBe("'' OR ''1''=''1");
    expect(sanitizeValue("'; DROP TABLE users; --")).toBe("''; DROP TABLE users; --");
    
    // More complex SQL injection patterns
    expect(sanitizeValue("' UNION SELECT username, password FROM users --")).toBe("'' UNION SELECT username, password FROM users --");
    expect(sanitizeValue("' OR 1=1; UPDATE users SET password='hacked' WHERE username='admin'; --")).toBe(
      "'' OR 1=1; UPDATE users SET password=''hacked'' WHERE username=''admin''; --"
    );
    expect(sanitizeValue("admin' --")).toBe("admin'' --");
    expect(sanitizeValue("1' OR '1' = '1")).toBe("1'' OR ''1'' = ''1");
    
    // Double quotes should remain unchanged (handled by parameterized queries)
    expect(sanitizeValue('User "Admin"')).toBe('User "Admin"');
  });

  it('trims whitespace', () => {
    expect(sanitizeValue('  hello  ')).toBe('hello');
    expect(sanitizeValue('\n\t\r  hello  \n\t\r')).toBe('hello');
  });

  it('handles multiple sanitization requirements', () => {
    expect(sanitizeValue('  javascript:alert("<script>")  ')).toBe('alert("")');
    expect(sanitizeValue('<div>Hello & World</div>')).toBe('Hello &amp; World');
    expect(sanitizeValue("  <script>alert('DROP TABLE users');</script>  ")).toBe("alert(''DROP TABLE users'');");
    expect(sanitizeValue("  <img src='x' onerror='alert(\"1\")'>admin' OR '1'='1  ")).toBe("admin'' OR ''1''=''1");
  });
});

describe('sanitizeObject', () => {
  it('handles primitive values', () => {
    expect(sanitizeObject('  <script>alert("xss")</script>  ')).toBe('alert("xss")');
    expect(sanitizeObject("O'Connor")).toBe("O''Connor");
    expect(sanitizeObject(123)).toBe(123);
    expect(sanitizeObject(true)).toBe(true);
    expect(sanitizeObject(null)).toBe(null);
    expect(sanitizeObject(undefined)).toBe(undefined);
  });

  it('handles arrays', () => {
    const input = [
      '  <script>alert("xss")</script>  ',
      'javascript:alert("xss")',
      'Hello & World',
      "admin' OR '1'='1",
      "'; DROP TABLE users; --"
    ];
    const expected = [
      'alert("xss")',
      'alert("xss")',
      'Hello &amp; World',
      "admin'' OR ''1''=''1",
      "''; DROP TABLE users; --"
    ];
    expect(sanitizeObject(input)).toEqual(expected);
  });

  it('handles nested objects', () => {
    const input = {
      name: '  <script>alert("xss")</script>  ',
      address: {
        street: 'javascript:alert("xss")',
        city: 'Hello & World',
        country: "O'Connor",
        postalCode: "123' OR '1'='1"
      },
      credentials: {
        username: "admin' --",
        password: "'; UPDATE users SET password='hacked'; --"
      }
    };
    const expected = {
      name: 'alert("xss")',
      address: {
        street: 'alert("xss")',
        city: 'Hello &amp; World',
        country: "O''Connor",
        postalCode: "123'' OR ''1''=''1"
      },
      credentials: {
        username: "admin'' --",
        password: "''; UPDATE users SET password=''hacked''; --"
      }
    };
    expect(sanitizeObject(input)).toEqual(expected);
  });

  it('handles arrays of objects', () => {
    const input = [
      { name: '<script>alert("xss")</script>' },
      { address: 'javascript:alert("xss")' },
      { 
        username: "admin' OR '1'='1",
        query: "'; DROP TABLE users; --"
      }
    ];
    const expected = [
      { name: 'alert("xss")' },
      { address: 'alert("xss")' },
      { 
        username: "admin'' OR ''1''=''1",
        query: "''; DROP TABLE users; --"
      }
    ];
    expect(sanitizeObject(input)).toEqual(expected);
  });

  it('handles deeply nested structures', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            value: '<script>alert("xss")</script>',
            sqlInjection: {
              query: "'; DROP TABLE users; --",
              condition: "admin' OR '1'='1",
              update: "'; UPDATE users SET password='hacked'; --"
            }
          }
        }
      }
    };
    const expected = {
      level1: {
        level2: {
          level3: {
            value: 'alert("xss")',
            sqlInjection: {
              query: "''; DROP TABLE users; --",
              condition: "admin'' OR ''1''=''1",
              update: "''; UPDATE users SET password=''hacked''; --"
            }
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
        false,
        "admin' OR '1'='1"
      ],
      object: {
        string: 'Hello & World',
        number: 789,
        boolean: false,
        sqlInjection: {
          query: "'; DROP TABLE users; --",
          username: "admin' --"
        }
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
        false,
        "admin'' OR ''1''=''1"
      ],
      object: {
        string: 'Hello &amp; World',
        number: 789,
        boolean: false,
        sqlInjection: {
          query: "''; DROP TABLE users; --",
          username: "admin'' --"
        }
      }
    };
    expect(sanitizeObject(input)).toEqual(expected);
  });
});
