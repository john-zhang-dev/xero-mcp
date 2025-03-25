export const parseArrayValues = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "string") {
    // Try to parse string that looks like an array
    if (obj.startsWith("[") && obj.endsWith("]")) {
      try {
        const parsed = JSON.parse(obj);
        // Recursively parse any array strings within the parsed result
        return parseArrayValues(parsed);
      } catch {
        return obj;
      }
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => parseArrayValues(item));
  }

  if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, parseArrayValues(value)])
    );
  }

  return obj;
};
