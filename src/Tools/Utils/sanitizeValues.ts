/**
 * Sanitizes a string value by:
 * 1. Removing javascript protocol
 * 2. Removing HTML tags
 * 3. Escaping special characters
 * 4. Trimming whitespace
 */
export function sanitizeValue(value: string): string {
  return value
    // Remove javascript protocol
    .replace(/javascript:/gi, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Escape special characters (excluding quotes)
    .replace(/[&<>]/g, char => {
      const escapeMap: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
      };
      return escapeMap[char];
    })
    // Trim whitespace
    .trim();
}

/**
 * Sanitizes all string values in an object recursively
 * @param obj - The object to sanitize
 * @returns A new object with all string values sanitized
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return sanitizeValue(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const result = {} as T;
    for (const [key, value] of Object.entries(obj)) {
      (result as any)[key] = sanitizeObject(value);
    }
    return result;
  }

  return obj;
}
