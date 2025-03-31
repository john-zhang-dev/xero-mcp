export const convertToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertToCamelCase(item));
  }
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        convertKeyToCamelCase(key),
        convertToCamelCase(value),
      ])
    );
  }
  return obj;
};

const convertKeyToCamelCase = (key: string): string => {
  // If the key is already in camelCase, return it as is
  if (/^[a-z][a-zA-Z0-9]*$/.test(key)) {
    return key;
  }

  // Handle snake_case
  if (key.includes('_')) {
    return key
      .toLowerCase()
      .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  // Handle PascalCase and UPPERCASE
  return key.charAt(0).toLowerCase() + key.slice(1);
};
