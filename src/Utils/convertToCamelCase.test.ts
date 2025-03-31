import { convertToCamelCase } from "./convertToCamelCase.js";

describe("convertToCamelCase", () => {
  it("should handle null and undefined values", () => {
    expect(convertToCamelCase(null)).toBeNull();
    expect(convertToCamelCase(undefined)).toBeUndefined();
  });

  it("should convert PascalCase to camelCase", () => {
    const input = {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "1234567890",
    };
    const expected = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
    };
    expect(convertToCamelCase(input)).toEqual(expected);
  });

  it("should handle nested objects", () => {
    const input = {
      PersonalInfo: {
        FirstName: "John",
        LastName: "Doe",
        ContactDetails: {
          PhoneNumber: "1234567890",
          EmailAddress: "john@example.com",
        },
      },
    };
    const expected = {
      personalInfo: {
        firstName: "John",
        lastName: "Doe",
        contactDetails: {
          phoneNumber: "1234567890",
          emailAddress: "john@example.com",
        },
      },
    };
    expect(convertToCamelCase(input)).toEqual(expected);
  });

  it("should handle arrays of objects", () => {
    const input = {
      Contacts: [
        { FirstName: "John", LastName: "Doe" },
        { FirstName: "Jane", LastName: "Smith" },
      ],
    };
    const expected = {
      contacts: [
        { firstName: "John", lastName: "Doe" },
        { firstName: "Jane", lastName: "Smith" },
      ],
    };
    expect(convertToCamelCase(input)).toEqual(expected);
  });

  it("should preserve already camelCase properties", () => {
    const input = {
      firstName: "John",
      LastName: "Doe",
      phoneNumber: "1234567890",
    };
    const expected = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
    };
    expect(convertToCamelCase(input)).toEqual(expected);
  });

  it("should handle primitive values", () => {
    expect(convertToCamelCase("Hello")).toBe("Hello");
    expect(convertToCamelCase(42)).toBe(42);
    expect(convertToCamelCase(true)).toBe(true);
  });

  it("should handle empty objects and arrays", () => {
    expect(convertToCamelCase({})).toEqual({});
    expect(convertToCamelCase([])).toEqual([]);
    expect(convertToCamelCase({ EmptyArray: [] })).toEqual({ emptyArray: [] });
    expect(convertToCamelCase({ EmptyObject: {} })).toEqual({
      emptyObject: {},
    });
  });

  it("should handle complex nested structures", () => {
    const input = {
      UserProfile: {
        BasicInfo: {
          FirstName: "John",
          LastName: "Doe",
        },
        Addresses: [
          {
            StreetName: "Main St",
            PostalCode: "12345",
            ContactInfo: {
              PhoneNumbers: [{ PhoneType: "Home", Number: "1234567890" }],
            },
          },
        ],
      },
    };
    const expected = {
      userProfile: {
        basicInfo: {
          firstName: "John",
          lastName: "Doe",
        },
        addresses: [
          {
            streetName: "Main St",
            postalCode: "12345",
            contactInfo: {
              phoneNumbers: [{ phoneType: "Home", number: "1234567890" }],
            },
          },
        ],
      },
    };
    expect(convertToCamelCase(input)).toEqual(expected);
  });

  it("should handle mixed case properties", () => {
    const input = {
      USER_ID: "123",
      user_name: "john",
      UserEmail: "john@example.com",
      userPhone: "1234567890",
    };
    const expected = {
      userId: "123",
      userName: "john",
      userEmail: "john@example.com",
      userPhone: "1234567890",
    };
    expect(convertToCamelCase(input)).toEqual(expected);
  });
});
