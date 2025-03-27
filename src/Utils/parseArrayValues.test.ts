import { parseArrayValues } from './parseArrayValues.js';

describe('parseArrayValues', () => {
  it('should handle null and undefined values', () => {
    expect(parseArrayValues(null)).toBeNull();
    expect(parseArrayValues(undefined)).toBeUndefined();
  });

  it('should parse string arrays', () => {
    expect(parseArrayValues('["a", "b", "c"]')).toEqual(['a', 'b', 'c']);
    expect(parseArrayValues('[1, 2, 3]')).toEqual([1, 2, 3]);
  });

  it('should handle invalid array strings', () => {
    const invalidArray = '[1, 2, invalid]';
    expect(parseArrayValues(invalidArray)).toBe(invalidArray);
  });

  it('should handle regular strings', () => {
    expect(parseArrayValues('not an array')).toBe('not an array');
    expect(parseArrayValues('[partial bracket')).toBe('[partial bracket');
  });

  it('should parse nested arrays in objects', () => {
    const input = {
      names: '["john", "doe"]',
      numbers: '[1, 2, 3]',
      nested: {
        array: '["nested", "value"]'
      }
    };
    const expected = {
      names: ['john', 'doe'],
      numbers: [1, 2, 3],
      nested: {
        array: ['nested', 'value']
      }
    };
    expect(parseArrayValues(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = {
      contacts: '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
    };
    const expected = {
      contacts: [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 }
      ]
    };
    expect(parseArrayValues(input)).toEqual(expected);
  });

  it('should preserve non-array values', () => {
    const input = {
      string: 'hello',
      number: 42,
      boolean: true,
      object: { key: 'value' }
    };
    expect(parseArrayValues(input)).toEqual(input);
  });

  it('should handle already parsed arrays', () => {
    const input = {
      parsed: ['already', 'an', 'array'],
      nested: {
        also: ['parsed', 'array']
      }
    };
    expect(parseArrayValues(input)).toEqual(input);
  });

  it('should handle empty arrays', () => {
    expect(parseArrayValues('[]')).toEqual([]);
    expect(parseArrayValues({ empty: '[]' })).toEqual({ empty: [] });
  });

  it('should handle complex nested structures', () => {
    const input = {
      level1: '[{"arr": "[1, 2]", "nested": {"deepArr": "[3, 4]"}}]'
    };
    const expected = {
      level1: [{
        arr: [1, 2],
        nested: {
          deepArr: [3, 4]
        }
      }]
    };
    expect(parseArrayValues(input)).toEqual(expected);
  });
});
