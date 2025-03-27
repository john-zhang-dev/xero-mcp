/**
 * Sanitizes a string value by:
 * 1. Removing javascript protocol
 * 2. Removing HTML tags
 * 3. Escaping special characters
 * 4. Preventing SQL injections
 * 5. Trimming whitespace
 */
export function sanitizeValue(value: string): string {
  if (typeof value !== 'string') {
    return value;
  }
  
  let result = value;
  
  // Remove javascript protocol
  result = result.replace(/javascript:/gi, '');
  
  // Remove HTML tags
  result = result.replace(/<[^>]*>/g, '');
  
  // Escape HTML special characters
  result = result.replace(/[&<>]/g, char => {
    const escapeMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    };
    return escapeMap[char];
  });
  
  // Prevent SQL injection - escape single quotes
  result = result.replace(/(['"])/g, match => {
    return match === "'" ? "''" : match;
  });
  
  // Trim whitespace
  return result.trim();
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
