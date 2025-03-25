// JSON schema generated from source yaml:
// https://raw.githubusercontent.com/XeroAPI/Xero-OpenAPI/master/xero_accounting.yaml
export const XeroAccountingApiSchema = {
  openapi: "3.0.0",
  info: {
    title: "Xero Accounting API",
    version: "7.0.0",
    termsOfService:
      "https://developer.xero.com/xero-developer-platform-terms-conditions/",
  },
  servers: [
    {
      description:
        "The Xero Accounting API exposes accounting and related functions of the main Xero application and can be used for a variety of purposes such as creating transactions like invoices and credit notes, right through to extracting accounting data via our reports endpoint.",
      url: "https://api.xero.com/api.xro/2.0",
    },
  ],
  paths: {
    "/Accounts": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
          type: "string",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.settings", "accounting.settings.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getAccounts",
        summary: "Retrieves the full chart of accounts",
        parameters: [
          {
            $ref: "#/components/parameters/ifModifiedSince",
          },
          {
            in: "query",
            name: "where",
            description: "Filter by an any element",
            example: "Status==&quot;ACTIVE&quot; AND Type==&quot;BANK&quot;",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "order",
            description: "Order by an any element",
            example: "Name ASC",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Accounts array with 0 to n Account",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Accounts",
                },
                example:
                  '{ "Accounts": [{ "AccountID": "ebd06280-af70-4bed-97c6-7451a454ad85", "Code": "091", "Name": "Business Savings Account", "Type": "BANK", "TaxType": "NONE", "EnablePaymentsToAccount": false, "BankAccountNumber": "0209087654321050", "BankAccountType": "BANK", "CurrencyCode": "NZD" },{ "AccountID": "7d05a53d-613d-4eb2-a2fc-dcb6adb80b80", "Code": "200", "Name": "Sales", "Type": "REVENUE", "TaxType": "OUTPUT2", "Description": "Income from any normal business activity", "EnablePaymentsToAccount": false }] }',
              },
            },
          },
        },
      },
      put: {
        security: [
          {
            OAuth2: ["accounting.settings"],
          },
        ],
        tags: ["Accounting"],
        operationId: "createAccount",
        summary: "Creates a new chart of accounts",
        parameters: [
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            object: null,
            is_object: true,
            key: "account",
            keyPascal: "Account",
          },
          {
            code: null,
            key: "code",
            keyPascal: "Code",
            default: 123456,
            object: "account",
          },
          {
            name: null,
            key: "name",
            keyPascal: "Name",
            default: "FooBar",
            object: "account",
          },
          {
            type: null,
            key: "type",
            keyPascal: "Type",
            default: "EXPENSE",
            nonString: true,
            node: "AccountType.EXPENSE",
            object: "account",
          },
          {
            description: null,
            is_last: true,
            key: "description",
            keyPascal: "Description",
            default: "Hello World",
            object: "account",
          },
        ],
        responses: {
          200: {
            description:
              "Success - created new Account and return response of type Accounts array with new Account",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Accounts",
                },
                example:
                  '{ "Id": "11814c9d-3b5e-492e-93b0-fad16bf3244f", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1550793549392)\\/", "Accounts": [ { "AccountID": "66b262e2-561e-423e-8937-47d558f13442", "Code": "123456", "Name": "Foobar", "Status": "ACTIVE", "Type": "EXPENSE", "TaxType": "INPUT", "Description": "Hello World", "Class": "EXPENSE", "EnablePaymentsToAccount": false, "ShowInExpenseClaims": false, "ReportingCode": "EXP", "ReportingCodeName": "Expense", "UpdatedDateUTC": "\\/Date(1550793549320+0000)\\/" } ] }',
              },
            },
          },
          400: {
            description:
              "Validation Error - some data was incorrect returns response of type Error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example:
                  '{ "ErrorNumber": 10, "Type": "ValidationException", "Message": "A validation exception occurred", "Elements": [ { "AccountID": "00000000-0000-0000-0000-000000000000", "Code": "123456", "Name": "Foobar", "Type": "EXPENSE", "Description": "Hello World", "ValidationErrors": [ { "Message": "Please enter a unique Name." } ] } ] }',
              },
            },
          },
        },
        requestBody: {
          required: true,
          description: "Account object in body of request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Account",
              },
              example:
                '{ "Code":"123456", "Name":"Foobar", "Type":"EXPENSE", "Description":"Hello World" }',
            },
          },
        },
      },
    },
    "/BankTransactions": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.transactions", "accounting.transactions.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getBankTransactions",
        summary: "Retrieves any spent or received money transactions",
        parameters: [
          {
            $ref: "#/components/parameters/ifModifiedSince",
          },
          {
            in: "query",
            name: "where",
            description: "Filter by an any element",
            example: 'Status=="AUTHORISED"',
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "order",
            description: "Order by an any element",
            example: "Type ASC",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "page",
            description:
              "Up to 100 bank transactions will be returned in a single API call with line items details",
            example: 1,
            schema: {
              type: "integer",
            },
          },
          {
            $ref: "#/components/parameters/unitdp",
          },
          {
            $ref: "#/components/parameters/pageSize",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type BankTransactions array with 0 to n BankTransaction",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BankTransactions",
                },
                example:
                  '{ "Id": "18e7e80c-5dca-4a57-974e-8b572cc5efe8", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "/Date(1551212901659)/", "pagination": { "page": 1, "pageSize": 100, "pageCount": 1, "itemCount": 3 }, "BankTransactions": [ { "BankTransactionID": "db54aab0-ad40-4ced-bcff-0940ba20db2c", "BankAccount": { "AccountID": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Code": "088", "Name": "Business Wells Fargo" }, "BatchPayment": { "Account": { "AccountID": "6f7594f2-f059-4d56-9e67-47ac9733bfe9" }, "BatchPaymentID": "b54aa50c-794c-461b-89d1-846e1b84d9c0", "Date": "/Date(1476316800000+0000)/", "Type": "RECBATCH", "Status": "AUTHORISED", "TotalAmount": "12.00", "UpdatedDateUTC": "/Date(1476392487037+0000)/", "IsReconciled": "false" }, "Type": "RECEIVE", "IsReconciled": false, "PrepaymentID": "cb62750f-b49c-464b-a45b-e2e2c514c8a9", "HasAttachments": true, "Contact": { "ContactID": "9c2c64de-12c9-4167-b503-e2c0e1aa1f49", "Name": "sam", "Addresses": [], "Phones": [], "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2016-10-13T00:00:00", "Date": "/Date(1476316800000+0000)/", "Status": "AUTHORISED", "LineAmountTypes": "Exclusive", "LineItems": [], "SubTotal": 10, "TotalTax": 0, "Total": 10, "UpdatedDateUTC": "/Date(1476389616437+0000)/", "CurrencyCode": "USD" }, { "BankTransactionID": "29a69c45-64ca-4805-a1cc-34990de837b3", "BankAccount": { "AccountID": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Code": "088", "Name": "Business Wells Fargo" }, "Type": "SPEND-OVERPAYMENT", "IsReconciled": false, "OverpaymentID": "7d457db3-3b0a-47e9-8b79-81252a7bcdcb", "HasAttachments": false, "Contact": { "ContactID": "9c2c64de-12c9-4167-b503-e2c0e1aa1f49", "Name": "sam", "Addresses": [], "Phones": [], "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2016-10-13T00:00:00", "Date": "/Date(1476316800000+0000)/", "Status": "AUTHORISED", "LineAmountTypes": "NoTax", "LineItems": [], "SubTotal": 9, "TotalTax": 0, "Total": 9, "UpdatedDateUTC": "/Date(1476389930500+0000)/", "CurrencyCode": "USD" }, { "BankTransactionID": "0b89bf5c-d40b-4514-96be-36a739fb0188", "BankAccount": { "AccountID": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Code": "088", "Name": "Business Wells Fargo" }, "Type": "SPEND-OVERPAYMENT", "IsReconciled": false, "OverpaymentID": "bf9b5f33-c0d6-4182-84a2-40848023e5a1", "HasAttachments": false, "Contact": { "ContactID": "9c2c64de-12c9-4167-b503-e2c0e1aa1f49", "Name": "sam", "Addresses": [], "Phones": [], "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2016-10-13T00:00:00", "Date": "/Date(1476316800000+0000)/", "Status": "AUTHORISED", "LineAmountTypes": "NoTax", "LineItems": [], "SubTotal": 8, "TotalTax": 0, "Total": 8, "UpdatedDateUTC": "/Date(1476392487037+0000)/", "CurrencyCode": "USD" } ] }',
              },
            },
          },
        },
      },
      put: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "createBankTransactions",
        summary: "Creates one or more spent or received money transaction",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            contactID: null,
            is_uuid: true,
            is_last: true,
            key: "contactID",
            keyPascal: "ContactID",
            keySnake: "contact_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "contact",
          },
          {
            lineItem: null,
            is_object: true,
            key: "lineItem",
            keyPascal: "LineItem",
            keySnake: "line_item",
          },
          {
            description: null,
            key: "description",
            keyPascal: "Description",
            default: "Foobar",
            object: "lineItem",
          },
          {
            quantity: null,
            nonString: true,
            key: "quantity",
            keyPascal: "Quantity",
            default: 1,
            is_money: true,
            object: "lineItem",
          },
          {
            unitAmount: null,
            nonString: true,
            key: "unitAmount",
            keyPascal: "UnitAmount",
            keySnake: "unit_amount",
            default: 20,
            is_money: true,
            object: "lineItem",
          },
          {
            accountCode: null,
            is_last: true,
            key: "accountCode",
            keyPascal: "AccountCode",
            keySnake: "account_code",
            default: "000",
            object: "lineItem",
          },
          {
            line_items: null,
            is_list: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            csharp: "LineItem",
            java: "LineItem",
          },
          {
            add_lineitems: null,
            is_last: true,
            is_list_add: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            java: "LineItems",
            python: "line_item",
            ruby: "line_item",
            csharp: "LineItem",
            object: "lineItem",
          },
          {
            bankAccount: null,
            is_object: true,
            key: "bankAccount",
            keyPascal: "Account",
            keySnake: "bank_account",
          },
          {
            accountID: null,
            is_last: true,
            is_uuid: true,
            key: "accountID",
            keyPascal: "AccountID",
            keySnake: "account_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "bankAccount",
          },
          {
            bankTransaction: null,
            is_object: true,
            key: "bankTransaction",
            keyPascal: "BankTransaction",
            keySnake: "bank_transaction",
          },
          {
            type: null,
            nonString: true,
            key: "type",
            keyPascal: "Type",
            default: "RECEIVE",
            node: "BankTransaction.TypeEnum.RECEIVE",
            object: "bankTransaction",
          },
          {
            set_contact: null,
            is_variable: true,
            nonString: true,
            key: "contact",
            keyPascal: "Contact",
            default: "contact",
            object: "bankTransaction",
          },
          {
            set_lineitems: null,
            is_variable: true,
            nonString: true,
            key: "lineItems",
            keyPascal: "LineItems",
            object: "bankTransaction",
            default: "lineItems",
          },
          {
            set_bankaccount: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "bankAccount",
            keyPascal: "BankAccount",
            keySnake: "bank_account",
            python: "bank_account",
            ruby: "bank_account",
            default: "bankAccount",
            object: "bankTransaction",
          },
          {
            bankTransactions: null,
            is_object: true,
            key: "bankTransactions",
            keyPascal: "BankTransactions",
          },
          {
            add_bankTransaction: null,
            is_last: true,
            is_array_add: true,
            key: "bankTransactions",
            keyPascal: "BankTransactions",
            keySnake: "bank_transactions",
            java: "BankTransactions",
            python: "bank_transaction",
            ruby: "bank_transaction",
            csharp: "BankTransaction",
            object: "bankTransaction",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/unitdp",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type BankTransactions array with new BankTransaction",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BankTransactions",
                },
                example:
                  '{ "Id": "5bc1d776-3c7f-4fe8-9b2d-09e747077a88", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1551213568047)\\/", "BankTransactions": [ { "BankTransactionID": "1289c190-e46d-434b-9628-463ffdb52f00", "BankAccount": { "AccountID": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Code": "088", "Name": "Business Wells Fargo" }, "Type": "SPEND", "Reference": "", "IsReconciled": false, "CurrencyRate": 1.000000, "Contact": { "ContactID": "5cc8cf28-567e-4d43-b287-687cfcaec47c", "ContactStatus": "ACTIVE", "Name": "Katherine Warren", "FirstName": "Katherine", "LastName": "Warren", "EmailAddress": "kat.warren@clampett.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "AddressLine1": "", "AddressLine2": "", "AddressLine3": "", "AddressLine4": "", "City": "Palo Alto", "Region": "CA", "PostalCode": "94020", "Country": "United States" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "847-1294", "PhoneAreaCode": "(626)", "PhoneCountryCode": "" }, { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1503348544227+0000)\\/", "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2019-02-26T00:00:00", "Date": "\\/Date(1551139200000+0000)\\/", "Status": "AUTHORISED", "LineAmountTypes": "Inclusive", "LineItems": [ { "Description": "Foobar", "UnitAmount": 20.00, "TaxType": "TAX001", "TaxAmount": 1.74, "LineAmount": 20.00, "AccountCode": "400", "Tracking": [], "Quantity": 1.0000, "LineItemID": "d2a06879-da49-4d6c-83b5-72a93a523ec6", "AccountID": "ebd06280-af70-4bed-97c6-7451a454ad85", "ValidationErrors": [] } ], "SubTotal": 18.26, "TotalTax": 1.74, "Total": 20.00, "UpdatedDateUTC": "\\/Date(1551213567813+0000)\\/", "CurrencyCode": "USD", "StatusAttributeString": "ERROR", "ValidationErrors": [ { "Message": "The Contact must contain at least 1 of the following elements to identify the contact: Name, ContactID, ContactNumber" } ] } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          description:
            "BankTransactions with an array of BankTransaction objects in body of request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/BankTransactions",
              },
              example:
                '{ bankTransactions: [{ type: BankTransaction.TypeEnum.SPEND, contact: { contactID: "00000000-0000-0000-0000-000000000000" }, lineItems: [{ description: "Foobar", quantity: 1.0, unitAmount: 20.0, accountCode: "000" } ], bankAccount: { code: "000" }}]}',
            },
          },
        },
      },
      post: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "updateOrCreateBankTransactions",
        summary:
          "Updates or creates one or more spent or received money transaction",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            contactID: null,
            is_uuid: true,
            is_last: true,
            key: "contactID",
            keyPascal: "ContactID",
            keySnake: "contact_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "contact",
          },
          {
            lineItem: null,
            is_object: true,
            key: "lineItem",
            keyPascal: "LineItem",
            keySnake: "line_item",
          },
          {
            description: null,
            key: "description",
            keyPascal: "Description",
            default: "Foobar",
            object: "lineItem",
          },
          {
            quantity: null,
            nonString: true,
            key: "quantity",
            keyPascal: "Quantity",
            default: 1,
            is_money: true,
            object: "lineItem",
          },
          {
            unitAmount: null,
            nonString: true,
            key: "unitAmount",
            keyPascal: "UnitAmount",
            keySnake: "unit_amount",
            default: 20,
            is_money: true,
            object: "lineItem",
          },
          {
            accountCode: null,
            is_last: true,
            key: "accountCode",
            keyPascal: "AccountCode",
            keySnake: "account_code",
            default: "000",
            object: "lineItem",
          },
          {
            line_items: null,
            is_list: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            csharp: "LineItem",
            java: "LineItem",
          },
          {
            add_lineitems: null,
            is_last: true,
            is_list_add: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            java: "LineItems",
            python: "line_item",
            ruby: "line_item",
            csharp: "LineItem",
            object: "lineItem",
          },
          {
            bankAccount: null,
            is_object: true,
            key: "bankAccount",
            keyPascal: "Account",
            keySnake: "bank_account",
          },
          {
            accountID: null,
            is_last: true,
            is_uuid: true,
            key: "accountID",
            keyPascal: "AccountID",
            keySnake: "account_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "bankAccount",
          },
          {
            bankTransaction: null,
            is_object: true,
            key: "bankTransaction",
            keyPascal: "BankTransaction",
            keySnake: "bank_transaction",
          },
          {
            type: null,
            nonString: true,
            key: "type",
            keyPascal: "Type",
            default: "RECEIVE",
            node: "BankTransaction.TypeEnum.RECEIVE",
            object: "bankTransaction",
          },
          {
            set_contact: null,
            is_variable: true,
            nonString: true,
            key: "contact",
            keyPascal: "Contact",
            default: "contact",
            object: "bankTransaction",
          },
          {
            set_lineitems: null,
            is_variable: true,
            nonString: true,
            key: "lineItems",
            keyPascal: "LineItems",
            object: "bankTransaction",
            default: "lineItems",
          },
          {
            set_bankaccount: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "bankAccount",
            keyPascal: "BankAccount",
            keySnake: "bank_account",
            python: "bank_account",
            ruby: "bank_account",
            default: "bankAccount",
            object: "bankTransaction",
          },
          {
            bankTransactions: null,
            is_object: true,
            key: "bankTransactions",
            keyPascal: "BankTransactions",
          },
          {
            add_bankTransaction: null,
            is_last: true,
            is_array_add: true,
            key: "bankTransactions",
            keyPascal: "BankTransactions",
            keySnake: "bank_transactions",
            java: "BankTransactions",
            python: "bank_transaction",
            ruby: "bank_transaction",
            csharp: "BankTransaction",
            object: "bankTransaction",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/unitdp",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type BankTransactions array with new BankTransaction",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BankTransactions",
                },
                example:
                  '{ "Id": "5bc1d776-3c7f-4fe8-9b2d-09e747077a88", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1551213568047)\\/", "BankTransactions": [ { "BankTransactionID": "1289c190-e46d-434b-9628-463ffdb52f00", "BankAccount": { "AccountID": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Code": "088", "Name": "Business Wells Fargo" }, "Type": "SPEND", "Reference": "", "IsReconciled": false, "CurrencyRate": 1.000000, "Contact": { "ContactID": "5cc8cf28-567e-4d43-b287-687cfcaec47c", "ContactStatus": "ACTIVE", "Name": "Katherine Warren", "FirstName": "Katherine", "LastName": "Warren", "EmailAddress": "kat.warren@clampett.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "AddressLine1": "", "AddressLine2": "", "AddressLine3": "", "AddressLine4": "", "City": "Palo Alto", "Region": "CA", "PostalCode": "94020", "Country": "United States" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "847-1294", "PhoneAreaCode": "(626)", "PhoneCountryCode": "" }, { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1503348544227+0000)\\/", "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2019-02-26T00:00:00", "Date": "\\/Date(1551139200000+0000)\\/", "Status": "AUTHORISED", "LineAmountTypes": "Inclusive", "LineItems": [ { "Description": "Foobar", "UnitAmount": 20.00, "TaxType": "TAX001", "TaxAmount": 1.74, "LineAmount": 20.00, "AccountCode": "400", "Tracking": [], "Quantity": 1.0000, "LineItemID": "d2a06879-da49-4d6c-83b5-72a93a523ec6", "AccountID": "ebd06280-af70-4bed-97c6-7451a454ad85", "ValidationErrors": [] } ], "SubTotal": 18.26, "TotalTax": 1.74, "Total": 20.00, "UpdatedDateUTC": "\\/Date(1551213567813+0000)\\/", "CurrencyCode": "USD", "StatusAttributeString": "ERROR", "ValidationErrors": [ { "Message": "The Contact must contain at least 1 of the following elements to identify the contact: Name, ContactID, ContactNumber" } ] } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/BankTransactions",
              },
              example:
                '{ "BankTransactions": [ { "Type": "SPEND", "Contact": { "ContactID": "00000000-0000-0000-0000-000000000000" }, "Lineitems": [ { "Description": "Foobar", "Quantity": 1, "UnitAmount": 20, "AccountCode": "400" } ], "BankAccount": { "Code": "088" } } ] }',
            },
          },
        },
      },
    },
    "/Contacts": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.contacts", "accounting.contacts.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getContacts",
        summary: "Retrieves all contacts in a Xero organisation",
        parameters: [
          {
            $ref: "#/components/parameters/ifModifiedSince",
          },
          {
            in: "query",
            name: "where",
            description: "Filter by an any element",
            example: "ContactStatus==&quot;ACTIVE&quot;",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "order",
            description: "Order by an any element",
            example: "Name ASC",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "IDs",
            "x-snake": "ids",
            description:
              "Filter by a comma separated list of ContactIDs. Allows you to retrieve a specific set of contacts in a single call.",
            style: "form",
            explode: false,
            example: "&quot;00000000-0000-0000-0000-000000000000&quot;",
            schema: {
              type: "array",
              items: {
                type: "string",
                format: "uuid",
              },
            },
          },
          {
            in: "query",
            name: "page",
            description:
              "e.g. page=1 - Up to 100 contacts will be returned in a single API call.",
            example: 1,
            schema: {
              type: "integer",
            },
          },
          {
            in: "query",
            name: "includeArchived",
            "x-snake": "include_archived",
            description:
              "e.g. includeArchived=true - Contacts with a status of ARCHIVED will be included in the response",
            example: true,
            "x-example-python": "True",
            schema: {
              type: "boolean",
            },
          },
          {
            $ref: "#/components/parameters/summaryOnly",
          },
          {
            in: "query",
            name: "searchTerm",
            "x-snake": "search_term",
            description:
              "Search parameter that performs a case-insensitive text search across the Name, FirstName, LastName, ContactNumber and EmailAddress fields.",
            example: "Joe Bloggs",
            schema: {
              type: "string",
            },
          },
          {
            $ref: "#/components/parameters/pageSize",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Contacts array with 0 to N Contact",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contacts",
                },
                example:
                  '{ "Id": "04e93d48-e72f-4775-b7dd-15a041fab972", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1551399323399)\\/", "pagination": { "page": 1, "pageSize": 100, "pageCount": 1, "itemCount": 2 }, "Contacts": [ { "ContactID": "5cc8cf28-567e-4d43-b287-687cfcaec47c", "ContactStatus": "ACTIVE", "Name": "Katherine Warren", "FirstName": "Katherine", "LastName": "Warren", "CompanyNumber": "NumberBusiness1234", "EmailAddress": "kat.warren@clampett.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "AddressLine1": "", "AddressLine2": "", "AddressLine3": "", "AddressLine4": "", "City": "Palo Alto", "Region": "CA", "PostalCode": "94020", "Country": "United States" } ], "Phones": [ { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "DEFAULT", "PhoneNumber": "847-1294", "PhoneAreaCode": "(626)", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1503348544227+0000)\\/", "ContactGroups": [], "IsSupplier": true, "IsCustomer": true, "SalesDefaultLineAmountType": "INCLUSIVE", "PurchasesDefaultLineAmountType": "INCLUSIVE", "Balances": { "AccountsReceivable": { "Outstanding": 760.00, "Overdue": 920.00 }, "AccountsPayable": { "Outstanding": 231.60, "Overdue": 360.00 } }, "ContactPersons": [], "HasAttachments": false, "HasValidationErrors": false }, { "ContactID": "3ec601ad-eddc-4ccb-a8ac-736e88293b1b", "ContactStatus": "ACTIVE", "Name": "Lisa Parker", "FirstName": "Lisa", "LastName": "Parker", "EmailAddress": "lparker@parkerandco.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "AddressLine1": "", "AddressLine2": "", "AddressLine3": "", "AddressLine4": "", "City": "Anchorage", "Region": "AK", "PostalCode": "99501", "Country": "United States" } ], "Phones": [ { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "DEFAULT", "PhoneNumber": "266-3583", "PhoneAreaCode": "(510)", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1503348546760+0000)\\/", "ContactGroups": [], "IsSupplier": false, "IsCustomer": false, "ContactPersons": [], "HasAttachments": false, "HasValidationErrors": false } ] }',
              },
            },
          },
        },
      },
      put: {
        security: [
          {
            OAuth2: ["accounting.contacts"],
          },
        ],
        tags: ["Accounting"],
        operationId: "createContacts",
        summary: "Creates multiple contacts (bulk) in a Xero organisation",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            phone: null,
            is_object: true,
            key: "phone",
            keyPascal: "Phone",
          },
          {
            phoneNumber: null,
            key: "phoneNumber",
            keyPascal: "PhoneNumber",
            keySnake: "phone_number",
            default: "555-1212",
            object: "phone",
          },
          {
            phoneType: null,
            is_last: true,
            nonString: true,
            key: "phoneType",
            keyPascal: "PhoneType",
            keySnake: "phone_type",
            default: "MOBILE",
            node: "Phone.PhoneTypeEnum.MOBILE",
            object: "phone",
          },
          {
            phones: null,
            is_list: true,
            key: "phones",
            keyPascal: "Phone",
          },
          {
            add_phone: null,
            is_last: true,
            is_list_add: true,
            key: "phones",
            keyPascal: "Phones",
            object: "phone",
          },
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            name: null,
            key: "name",
            keyPascal: "Name",
            default: "Bruce Banner",
            object: "contact",
          },
          {
            emailAddress: null,
            key: "emailAddress",
            keyPascal: "EmailAddress",
            keySnake: "email_address",
            default: "hulk@avengers.com",
            object: "contact",
          },
          {
            set_phones: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "phones",
            keyPascal: "Phones",
            default: "phones",
            object: "contact",
          },
          {
            contacts: null,
            is_object: true,
            key: "contacts",
            keyPascal: "Contacts",
          },
          {
            add_contact: null,
            is_last: true,
            is_array_add: true,
            key: "contacts",
            keyPascal: "Contacts",
            java: "Contacts",
            csharp: "Contact",
            object: "contact",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Contacts array with newly created Contact",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contacts",
                },
                example:
                  '{ "Id": "e997d6d7-6dad-4458-beb8-d9c1bf7f2edf", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1551399321121)\\/", "Contacts": [ { "ContactID": "3ff6d40c-af9a-40a3-89ce-3c1556a25591", "ContactStatus": "ACTIVE", "CompanyNumber": "NumberBusiness1234", "Name": "Foo9987", "EmailAddress": "sid32476@blah.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "City": "", "Region": "", "PostalCode": "", "Country": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "555-1212", "PhoneAreaCode": "415", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1551399321043+0000)\\/", "ContactGroups": [], "IsSupplier": false, "IsCustomer": false, "SalesDefaultLineAmountType": "INCLUSIVE", "PurchasesDefaultLineAmountType": "INCLUSIVE", "SalesTrackingCategories": [], "PurchasesTrackingCategories": [], "PaymentTerms": { "Bills": { "Day": 15, "Type": "OFCURRENTMONTH" }, "Sales": { "Day": 10, "Type": "DAYSAFTERBILLMONTH" } }, "ContactPersons": [], "HasValidationErrors": false } ] }',
              },
            },
          },
          400: {
            description:
              "Validation Error - some data was incorrect returns response of type Error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example:
                  '{ "ErrorNumber": 10, "Type": "ValidationException", "Message": "A validation exception occurred", "Elements": [ { "ContactID": "00000000-0000-0000-0000-000000000000", "AccountNumber": "12345-ABCD", "Name": "Buzz Lightyear", "EmailAddress": "buzzlightyear@email.com", "AccountsReceivableTaxType": "NONE", "AccountsPayableTaxType": "INPUT", "Addresses": [ { "AddressType": "STREET", "AddressLine1": "101 Green St", "AddressLine2": "5th floor", "City": "San Francisco", "Region": "CA", "PostalCode": "94041", "Country": "US", "AttentionTo": "Rod Drury", "ValidationErrors": [] } ], "Phones": [ { "PhoneType": "MOBILE", "PhoneNumber": "555-1212", "PhoneAreaCode": "415", "ValidationErrors": [] } ], "ContactGroups": [], "PaymentTerms": { "Bills": { "Day": 15, "Type": "OFCURRENTMONTH", "ValidationErrors": [] }, "Sales": { "Day": 10, "Type": "DAYSAFTERBILLMONTH", "ValidationErrors": [] } }, "ContactPersons": [], "HasValidationErrors": true, "ValidationErrors": [ { "Message": "The contact name Buzz Lightyear is already assigned to another contact. The contact name must be unique across all active contacts." } ] } ] }',
              },
            },
          },
        },
        requestBody: {
          required: true,
          description:
            "Contacts with an array of Contact objects to create in body of request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Contacts",
              },
              example:
                '{ "Contacts": [ { "ContactID": "3ff6d40c-af9a-40a3-89ce-3c1556a25591", "ContactStatus": "ACTIVE", "Name": "Foo9987", "EmailAddress": "sid32476@blah.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "City": "", "Region": "", "PostalCode": "", "Country": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "555-1212", "PhoneAreaCode": "415", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "/Date(1551399321043+0000)/", "ContactGroups": [], "IsSupplier": false, "IsCustomer": false, "SalesTrackingCategories": [], "PurchasesTrackingCategories": [], "PaymentTerms": { "Bills": { "Day": 15, "Type": "OFCURRENTMONTH" }, "Sales": { "Day": 10, "Type": "DAYSAFTERBILLMONTH" } }, "ContactPersons": [] } ] }',
            },
          },
        },
      },
      post: {
        security: [
          {
            OAuth2: ["accounting.contacts"],
          },
        ],
        tags: ["Accounting"],
        operationId: "updateOrCreateContacts",
        summary:
          "Updates or creates one or more contacts in a Xero organisation",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            phone: null,
            is_object: true,
            key: "phone",
            keyPascal: "Phone",
          },
          {
            phoneNumber: null,
            key: "phoneNumber",
            keyPascal: "PhoneNumber",
            keySnake: "phone_number",
            default: "555-1212",
            object: "phone",
          },
          {
            phoneType: null,
            is_last: true,
            nonString: true,
            key: "phoneType",
            keyPascal: "PhoneType",
            keySnake: "phone_type",
            default: "MOBILE",
            node: "Phone.PhoneTypeEnum.MOBILE",
            object: "phone",
          },
          {
            phones: null,
            is_list: true,
            key: "phones",
            keyPascal: "Phone",
          },
          {
            add_phone: null,
            is_last: true,
            is_list_add: true,
            key: "phones",
            keyPascal: "Phones",
            object: "phone",
          },
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            name: null,
            key: "name",
            keyPascal: "Name",
            default: "Bruce Banner",
            object: "contact",
          },
          {
            emailAddress: null,
            key: "emailAddress",
            keyPascal: "EmailAddress",
            keySnake: "email_address",
            default: "hulk@avengers.com",
            object: "contact",
          },
          {
            set_phones: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "phones",
            keyPascal: "Phones",
            default: "phones",
            object: "contact",
          },
          {
            contacts: null,
            is_object: true,
            key: "contacts",
            keyPascal: "Contacts",
          },
          {
            add_contact: null,
            is_last: true,
            is_array_add: true,
            key: "contacts",
            keyPascal: "Contacts",
            java: "Contacts",
            csharp: "Contact",
            object: "contact",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Contacts array with newly created Contact",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contacts",
                },
                example:
                  '{ "Id": "e997d6d7-6dad-4458-beb8-d9c1bf7f2edf", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1551399321121)\\/", "Contacts": [ { "ContactID": "00000000-0000-0000-0000-000000000000", "ContactStatus": "ACTIVE", "Name": "Bruce Banner", "CompanyNumber": "NumberBusiness1234", "EmailAddress": "bruce@banner.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "City": "", "Region": "", "PostalCode": "", "Country": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "555-1212", "PhoneAreaCode": "415", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1551399321043+0000)\\/", "ContactGroups": [], "IsSupplier": false, "IsCustomer": false, "SalesDefaultLineAmountType": "INCLUSIVE", "PurchasesDefaultLineAmountType": "INCLUSIVE", "SalesTrackingCategories": [], "PurchasesTrackingCategories": [], "PaymentTerms": { "Bills": { "Day": 15, "Type": "OFCURRENTMONTH" }, "Sales": { "Day": 10, "Type": "DAYSAFTERBILLMONTH" } }, "ContactPersons": [], "HasValidationErrors": false } ] }',
              },
            },
          },
          400: {
            description:
              "Validation Error - some data was incorrect returns response of type Error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example:
                  '{ "ErrorNumber": 10, "Type": "ValidationException", "Message": "A validation exception occurred", "Elements": [ { "ContactID": "00000000-0000-0000-0000-000000000000", "AccountNumber": "12345-ABCD", "Name": "Buzz Lightyear", "EmailAddress": "buzzlightyear@email.com", "AccountsReceivableTaxType": "NONE", "AccountsPayableTaxType": "INPUT", "Addresses": [ { "AddressType": "STREET", "AddressLine1": "101 Green St", "AddressLine2": "5th floor", "City": "San Francisco", "Region": "CA", "PostalCode": "94041", "Country": "US", "AttentionTo": "Rod Drury", "ValidationErrors": [] } ], "Phones": [ { "PhoneType": "MOBILE", "PhoneNumber": "555-1212", "PhoneAreaCode": "415", "ValidationErrors": [] } ], "ContactGroups": [], "PaymentTerms": { "Bills": { "Day": 15, "Type": "OFCURRENTMONTH", "ValidationErrors": [] }, "Sales": { "Day": 10, "Type": "DAYSAFTERBILLMONTH", "ValidationErrors": [] } }, "ContactPersons": [], "HasValidationErrors": true, "ValidationErrors": [ { "Message": "The contact name Buzz Lightyear is already assigned to another contact. The contact name must be unique across all active contacts." } ] } ] }',
              },
            },
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Contacts",
              },
              example:
                '{ "Contacts": [ { "Name": "Bruce Banner", "EmailAddress": "hulk@avengers.com", "Phones": [ { "PhoneType": "MOBILE", "PhoneNumber": "555-1212", "PhoneAreaCode": "415" } ], "PaymentTerms": { "Bills": { "Day": 15, "Type": "OFCURRENTMONTH" }, "Sales": { "Day": 10, "Type": "DAYSAFTERBILLMONTH" } } } ] }',
            },
          },
        },
      },
    },
    "/Payments": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.transactions", "accounting.transactions.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getPayments",
        summary: "Retrieves payments for invoices and credit notes",
        parameters: [
          {
            $ref: "#/components/parameters/ifModifiedSince",
          },
          {
            in: "query",
            name: "where",
            description: "Filter by an any element",
            example: 'Status=="AUTHORISED"',
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "order",
            description: "Order by an any element",
            example: "Amount ASC",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "page",
            description:
              "Up to 100 payments will be returned in a single API call",
            example: 1,
            schema: {
              type: "integer",
            },
          },
          {
            $ref: "#/components/parameters/pageSize",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Payments array for all Payments",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Payments",
                },
                example:
                  '{ "Id": "9f310473-e1b5-4704-a25c-eec653deb596", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1552431874205)\\/", "pagination": { "page": 1, "pageSize": 100, "pageCount": 1, "itemCount": 2 }, "Payments": [ { "PaymentID": "99ea7f6b-c513-4066-bc27-b7c65dcd76c2", "BatchPaymentID": "b54aa50c-794c-461b-89d1-846e1b84d9c0", "BatchPayment": { "Account": { "AccountID": "5690f1e8-1d02-4893-90c2-ee1a69eff942" }, "BatchPaymentID": "b54aa50c-794c-461b-89d1-846e1b84d9c0", "Date": "\\/Date(1552521600000+0000)\\/", "Type": "RECBATCH", "Status": "AUTHORISED", "TotalAmount": "50.00", "UpdatedDateUTC": "\\/Date(1541176592690+0000)\\/", "IsReconciled": "false" }, "Date": "\\/Date(1543449600000+0000)\\/", "BankAmount": 46.00, "Amount": 46.00, "Reference": "", "CurrencyRate": 1.000000, "PaymentType": "ACCRECPAYMENT", "Status": "AUTHORISED", "UpdatedDateUTC": "\\/Date(1541176592690+0000)\\/", "HasAccount": true, "IsReconciled": false, "Account": { "AccountID": "5690f1e8-1d02-4893-90c2-ee1a69eff942", "Code": "970" }, "Invoice": { "Type": "ACCREC", "InvoiceID": "046d8a6d-1ae1-4b4d-9340-5601bdf41b87", "InvoiceNumber": "INV-0002", "Payments": [], "CreditNotes": [], "Prepayments": [], "Overpayments": [], "HasErrors": false, "IsDiscounted": false, "Contact": { "ContactID": "a3675fc4-f8dd-4f03-ba5b-f1870566bcd7", "ContactNumber": "", "Name": "Barney Rubble-83203", "Addresses": [], "Phones": [], "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "LineItems": [], "CurrencyCode": "NZD" }, "HasValidationErrors": false }, { "PaymentID": "6b037c9b-2e5d-4905-84d3-eabfb3438242", "Date": "\\/Date(1552521600000+0000)\\/", "BankAmount": 2.00, "Amount": 2.00, "Reference": "Too much", "CurrencyRate": 1.000000, "PaymentType": "ARCREDITPAYMENT", "Status": "AUTHORISED", "UpdatedDateUTC": "\\/Date(1551812346173+0000)\\/", "HasAccount": true, "IsReconciled": false, "Account": { "AccountID": "136ebd08-60ea-4592-8982-be92c153b53a", "Code": "980" }, "Invoice": { "Type": "ACCRECCREDIT", "InvoiceID": "249f15fa-f2a7-4acc-8769-0984103f2225", "InvoiceNumber": "CN-0005", "Payments": [], "CreditNotes": [], "Prepayments": [], "Overpayments": [], "HasErrors": false, "IsDiscounted": false, "Contact": { "ContactID": "430fa14a-f945-44d3-9f97-5df5e28441b8", "ContactNumber": "", "Name": "Liam Gallagher", "Addresses": [], "Phones": [], "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "LineItems": [], "CurrencyCode": "NZD" }, "HasValidationErrors": false } ] }',
              },
            },
          },
        },
      },
      put: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "createPayments",
        summary: "Creates multiple payments for invoices or credit notes",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            dateValue: null,
            is_date: true,
            key: "dateValue",
            keyPascal: "Date",
            keySnake: "date_value",
            java_datatype: "LocalDate",
            default: "LocalDate.of(2020, Month.OCTOBER, 10)",
            node: "'2020-10-10'",
          },
          {
            invoice: null,
            is_object: true,
            key: "invoice",
            keyPascal: "Invoice",
          },
          {
            invoiceID: null,
            is_last: true,
            is_uuid: true,
            key: "invoiceID",
            keyPascal: "InvoiceID",
            keySnake: "invoice_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "invoice",
          },
          {
            account: null,
            is_object: true,
            key: "account",
            keyPascal: "Account",
          },
          {
            accountID: null,
            is_last: true,
            is_uuid: true,
            key: "accountID",
            keyPascal: "AccountID",
            keySnake: "account_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "account",
          },
          {
            payment: null,
            is_object: true,
            key: "payment",
            keyPascal: "Payment",
          },
          {
            set_invoice: null,
            is_variable: true,
            nonString: true,
            key: "invoice",
            keyPascal: "Invoice",
            default: "invoice",
            object: "payment",
          },
          {
            set_account: null,
            is_variable: true,
            nonString: true,
            key: "account",
            keyPascal: "Account",
            default: "account",
            object: "payment",
          },
          {
            amount: null,
            nonString: true,
            key: "amount",
            keyPascal: "Amount",
            default: 1,
            is_money: true,
            object: "payment",
          },
          {
            date: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "date",
            keyPascal: "Date",
            default: "dateValue",
            python: "date_value",
            ruby: "date_value",
            object: "payment",
          },
          {
            payments: null,
            is_object: true,
            key: "payments",
            keyPascal: "Payments",
          },
          {
            add_payment: null,
            is_last: true,
            is_array_add: true,
            key: "payments",
            keyPascal: "Payments",
            java: "Payments",
            csharp: "Payment",
            object: "payment",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Payments array for newly created Payment",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Payments",
                },
                example:
                  '{ "Id": "83b5715a-6a77-4c16-b5b8-2da08b5fde44", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1552432238716)\\/", "Payments": [ { "PaymentID": "61ed71fc-01bf-4eb8-8419-8a18789ff45f", "Date": "\\/Date(1552348800000+0000)\\/", "BankAmount": 1.00, "Amount": 1.00, "CurrencyRate": 1.000000, "PaymentType": "ACCRECPAYMENT", "Status": "AUTHORISED", "UpdatedDateUTC": "\\/Date(1552432238623+0000)\\/", "HasAccount": true, "IsReconciled": false, "Account": { "AccountID": "5690f1e8-1d02-4893-90c2-ee1a69eff942", "Code": "970", "Name": "Owner A Funds Introduced" }, "Invoice": { "Type": "ACCREC", "InvoiceID": "c7c37b83-ac95-45ea-88ba-8ad83a5f22fe", "InvoiceNumber": "INV-0004", "Reference": "", "Prepayments": [], "Overpayments": [], "AmountDue": 229.00, "AmountPaid": 1.00, "SentToContact": false, "CurrencyRate": 1.000000, "HasErrors": false, "IsDiscounted": false, "Contact": { "ContactID": "a3675fc4-f8dd-4f03-ba5b-f1870566bcd7", "Name": "Barney Rubble-83203", "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2018-10-10T00:00:00", "Date": "\\/Date(1539129600000+0000)\\/", "DueDateString": "2018-10-18T00:00:00", "DueDate": "\\/Date(1539820800000+0000)\\/", "Status": "AUTHORISED", "LineAmountTypes": "Exclusive", "LineItems": [ { "Description": "boo", "UnitAmount": 200.00, "TaxType": "OUTPUT2", "TaxAmount": 30.00, "LineAmount": 200.00, "AccountCode": "200", "Tracking": [], "Quantity": 1.0000, "LineItemID": "173dfdb9-43b5-4bd2-ae25-9419e662a3a7", "ValidationErrors": [] } ], "SubTotal": 200.00, "TotalTax": 30.00, "Total": 230.00, "UpdatedDateUTC": "\\/Date(1552432238623+0000)\\/", "CurrencyCode": "NZD" }, "HasValidationErrors": true, "ValidationErrors": [ { "Message": "Payment amount exceeds the amount outstanding on this document" } ] } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          description: "Payments array with Payment object in body of request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Payments",
              },
              example:
                '{ "Payments": [ { "Invoice": { "LineItems": [], "InvoiceID": "00000000-0000-0000-0000-000000000000" }, "Account": { "Code": "970" }, "Date": "2019-03-12", "Amount": 1 } ] }',
            },
          },
        },
      },
      post: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "createPayment",
        summary: "Creates a single payment for invoice or credit notes",
        parameters: [
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            dateValue: null,
            is_date: true,
            key: "dateValue",
            keyPascal: "Date",
            keySnake: "date_value",
            java_datatype: "LocalDate",
            default: "LocalDate.of(2020, Month.OCTOBER, 10)",
            node: "'2020-10-10'",
          },
          {
            invoice: null,
            is_object: true,
            key: "invoice",
            keyPascal: "Invoice",
          },
          {
            invoiceID: null,
            is_last: true,
            is_uuid: true,
            key: "invoiceID",
            keyPascal: "InvoiceID",
            keySnake: "invoice_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "invoice",
          },
          {
            account: null,
            is_object: true,
            key: "account",
            keyPascal: "Account",
          },
          {
            accountID: null,
            is_last: true,
            is_uuid: true,
            key: "accountID",
            keyPascal: "AccountID",
            keySnake: "account_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "account",
          },
          {
            payment: null,
            is_object: true,
            key: "payment",
            keyPascal: "Payment",
          },
          {
            set_invoice: null,
            is_variable: true,
            nonString: true,
            key: "invoice",
            keyPascal: "Invoice",
            default: "invoice",
            object: "payment",
          },
          {
            set_account: null,
            is_variable: true,
            nonString: true,
            key: "account",
            keyPascal: "Account",
            default: "account",
            object: "payment",
          },
          {
            amount: null,
            nonString: true,
            key: "amount",
            keyPascal: "Amount",
            default: 1,
            is_money: true,
            object: "payment",
          },
          {
            date: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "date",
            keyPascal: "Date",
            default: "dateValue",
            python: "date_value",
            ruby: "date_value",
            object: "payment",
          },
          {
            payments: null,
            is_object: true,
            key: "payments",
            keyPascal: "Payments",
          },
          {
            add_payment: null,
            is_last: true,
            is_array_add: true,
            key: "payments",
            keyPascal: "Payments",
            java: "Payments",
            csharp: "Payment",
            object: "payment",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Payments array for newly created Payment",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Payments",
                },
                example:
                  '{ "Id": "83b5715a-6a77-4c16-b5b8-2da08b5fde44", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1552432238716)\\/", "Payments": [ { "PaymentID": "61ed71fc-01bf-4eb8-8419-8a18789ff45f", "Date": "\\/Date(1552348800000+0000)\\/", "BankAmount": 1.00, "Amount": 1.00, "CurrencyRate": 1.000000, "PaymentType": "ACCRECPAYMENT", "Status": "AUTHORISED", "UpdatedDateUTC": "\\/Date(1552432238623+0000)\\/", "HasAccount": true, "IsReconciled": false, "Account": { "AccountID": "5690f1e8-1d02-4893-90c2-ee1a69eff942", "Code": "970", "Name": "Owner A Funds Introduced" }, "Invoice": { "Type": "ACCREC", "InvoiceID": "c7c37b83-ac95-45ea-88ba-8ad83a5f22fe", "InvoiceNumber": "INV-0004", "Reference": "", "Prepayments": [], "Overpayments": [], "AmountDue": 229.00, "AmountPaid": 1.00, "SentToContact": false, "CurrencyRate": 1.000000, "HasErrors": false, "IsDiscounted": false, "Contact": { "ContactID": "a3675fc4-f8dd-4f03-ba5b-f1870566bcd7", "Name": "Barney Rubble-83203", "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2018-10-10T00:00:00", "Date": "\\/Date(1539129600000+0000)\\/", "DueDateString": "2018-10-18T00:00:00", "DueDate": "\\/Date(1539820800000+0000)\\/", "Status": "AUTHORISED", "LineAmountTypes": "Exclusive", "LineItems": [ { "Description": "boo", "UnitAmount": 200.00, "TaxType": "OUTPUT2", "TaxAmount": 30.00, "LineAmount": 200.00, "AccountCode": "200", "Tracking": [], "Quantity": 1.0000, "LineItemID": "173dfdb9-43b5-4bd2-ae25-9419e662a3a7", "ValidationErrors": [] } ], "SubTotal": 200.00, "TotalTax": 30.00, "Total": 230.00, "UpdatedDateUTC": "\\/Date(1552432238623+0000)\\/", "CurrencyCode": "NZD" }, "HasValidationErrors": true, "ValidationErrors": [ { "Message": "Payment amount exceeds the amount outstanding on this document" } ] } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          description: "Request body with a single Payment object",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Payment",
              },
              example:
                '{ "Payments": [ { "Invoice": { "LineItems": [], "InvoiceID": "00000000-0000-0000-0000-000000000000" }, "Account": { "Code": "970" }, "Date": "2019-03-12", "Amount": 1 } ] }',
            },
          },
        },
      },
    },
    "/Prepayments": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.transactions", "accounting.transactions.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getPrepayments",
        summary: "Retrieves prepayments",
        parameters: [
          {
            $ref: "#/components/parameters/ifModifiedSince",
          },
          {
            in: "query",
            name: "where",
            description: "Filter by an any element",
            example: 'Status=="AUTHORISED"',
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "order",
            description: "Order by an any element",
            example: "Reference ASC",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "page",
            description:
              "e.g. page=1 – Up to 100 prepayments will be returned in a single API call with line items shown for each overpayment",
            example: 1,
            schema: {
              type: "integer",
            },
          },
          {
            $ref: "#/components/parameters/unitdp",
          },
          {
            $ref: "#/components/parameters/pageSize",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Prepayments array for all Prepayment",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Prepayments",
                },
                example:
                  '{ "Id": "d7a9ca0c-6159-4c26-ad2e-715440c50b7d", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1552489227595)\\/", "pagination": { "page": 1, "pageSize": 100, "pageCount": 1, "itemCount": 1 }, "Prepayments": [ { "PrepaymentID": "ce0cddef-cf5a-4e59-b638-f225679115a7", "ID": "ce0cddef-cf5a-4e59-b638-f225679115a7", "Type": "RECEIVE-PREPAYMENT", "Reference": "INV-0011", "RemainingCredit": 3450.00, "Allocations": [], "Payments": [], "HasAttachments": true, "Contact": { "ContactID": "be392c72-c121-4f83-9512-03ac71e54c20", "Name": "Luke Skywalker", "Addresses": [], "Phones": [], "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "DateString": "2019-03-13T00:00:00", "Date": "\\/Date(1552435200000+0000)\\/", "Status": "AUTHORISED", "LineAmountTypes": "Exclusive", "LineItems": [], "SubTotal": 3000.00, "TotalTax": 450.00, "Total": 3450.00, "UpdatedDateUTC": "\\/Date(1552489187730+0000)\\/", "CurrencyCode": "NZD" } ] }',
              },
            },
          },
        },
      },
    },
    "/PurchaseOrders": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.transactions", "accounting.transactions.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getPurchaseOrders",
        summary: "Retrieves purchase orders",
        parameters: [
          {
            $ref: "#/components/parameters/ifModifiedSince",
          },
          {
            in: "query",
            name: "Status",
            "x-snake": "status",
            description: "Filter by purchase order status",
            example: "SUBMITTED",
            schema: {
              type: "string",
              enum: ["DRAFT", "SUBMITTED", "AUTHORISED", "BILLED", "DELETED"],
            },
          },
          {
            in: "query",
            name: "DateFrom",
            "x-snake": "date_from",
            description:
              "Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31",
            example: "2019-12-01",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "DateTo",
            "x-snake": "date_to",
            description:
              "Filter by purchase order date (e.g. GET https://.../PurchaseOrders?DateFrom=2015-12-01&DateTo=2015-12-31",
            example: "2019-12-31",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "order",
            description: "Order by an any element",
            example: "PurchaseOrderNumber ASC",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "page",
            description:
              "To specify a page, append the page parameter to the URL e.g. ?page=1. If there are 100 records in the response you will need to check if there is any more data by fetching the next page e.g ?page=2 and continuing this process until no more results are returned.",
            example: 1,
            schema: {
              type: "integer",
            },
          },
          {
            $ref: "#/components/parameters/pageSize",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type PurchaseOrder array of all PurchaseOrder",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PurchaseOrders",
                },
                example:
                  '{ "Id": "66910bfc-15cc-4692-bd4c-cc8f671e653c", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1552523977238)\\/", "pagination": { "page": 1, "pageSize": 100, "pageCount": 1, "itemCount": 2 }, "PurchaseOrders": [ { "PurchaseOrderID": "f9627f0d-b715-4039-bb6a-96dc3eae5ec5", "PurchaseOrderNumber": "PO-0001", "DateString": "2019-03-12T00:00:00", "Date": "\\/Date(1552348800000+0000)\\/", "AttentionTo": "Jimmy", "HasErrors": false, "IsDiscounted": false, "Type": "PURCHASEORDER", "CurrencyRate": 1.000000, "CurrencyCode": "NZD", "Contact": { "ContactID": "430fa14a-f945-44d3-9f97-5df5e28441b8", "ContactStatus": "ACTIVE", "Name": "Liam Gallagher", "FirstName": "Liam", "LastName": "Gallagher", "Addresses": [ { "AddressType": "POBOX", "City": "Anytown", "Region": "NY", "PostalCode": "10101", "Country": "USA", "AttentionTo": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "222-2222", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "333-2233", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "444-3433", "PhoneAreaCode": "212", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1551747281053+0000)\\/", "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "Status": "DELETED", "LineAmountTypes": "Exclusive", "LineItems": [ { "Description": "Foobar", "UnitAmount": 20.0000, "TaxAmount": 0.00, "LineAmount": 20.00, "Tracking": [], "Quantity": 1.0000, "LineItemID": "0f7b54b8-bfa4-4c5d-9c22-73dbd5796e54" } ], "SubTotal": 20.00, "TotalTax": 0.00, "Total": 20.00, "UpdatedDateUTC": "\\/Date(1552522703443+0000)\\/", "HasAttachments": false }, { "PurchaseOrderID": "6afa2e02-c514-4964-ab89-b5c0179b8c50", "PurchaseOrderNumber": "PO-0002", "DateString": "2019-03-12T00:00:00", "Date": "\\/Date(1552348800000+0000)\\/", "AttentionTo": "Jimmy", "HasErrors": false, "IsDiscounted": false, "Type": "PURCHASEORDER", "CurrencyRate": 1.000000, "CurrencyCode": "NZD", "Contact": { "ContactID": "430fa14a-f945-44d3-9f97-5df5e28441b8", "ContactStatus": "ACTIVE", "Name": "Liam Gallagher", "FirstName": "Liam", "LastName": "Gallagher", "Addresses": [ { "AddressType": "POBOX", "City": "Anytown", "Region": "NY", "PostalCode": "10101", "Country": "USA", "AttentionTo": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "222-2222", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "333-2233", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "444-3433", "PhoneAreaCode": "212", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1551747281053+0000)\\/", "ContactGroups": [], "ContactPersons": [], "HasValidationErrors": false }, "Status": "DELETED", "LineAmountTypes": "Exclusive", "LineItems": [ { "Description": "Foobar", "UnitAmount": 20.0000, "TaxAmount": 0.00, "LineAmount": 20.00, "Tracking": [], "Quantity": 1.0000, "LineItemID": "3e4ec232-32b9-491b-84dd-48fb9aa8916f" } ], "SubTotal": 20.00, "TotalTax": 0.00, "Total": 20.00, "UpdatedDateUTC": "\\/Date(1552522834733+0000)\\/", "HasAttachments": false } ] }',
              },
            },
          },
        },
      },
      put: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "createPurchaseOrders",
        summary: "Creates one or more purchase orders",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            dateValue: null,
            is_date: true,
            key: "dateValue",
            keyPascal: "Date",
            keySnake: "date_value",
            java_datatype: "LocalDate",
            default: "LocalDate.of(2020, Month.OCTOBER, 10)",
            node: "'2020-10-10'",
          },
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            contactID: null,
            is_last: true,
            is_uuid: true,
            key: "contactID",
            keyPascal: "ContactID",
            keySnake: "contact_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "contact",
          },
          {
            lineItem: null,
            is_object: true,
            key: "lineItem",
            keyPascal: "LineItem",
            keySnake: "line_item",
          },
          {
            description: null,
            key: "description",
            keyPascal: "Description",
            default: "Foobar",
            object: "lineItem",
          },
          {
            quantity: null,
            nonString: true,
            key: "quantity",
            keyPascal: "Quantity",
            default: 1,
            is_money: true,
            object: "lineItem",
          },
          {
            unitAmount: null,
            nonString: true,
            key: "unitAmount",
            keyPascal: "UnitAmount",
            keySnake: "unit_amount",
            default: 20,
            is_money: true,
            object: "lineItem",
          },
          {
            accountCode: null,
            is_last: true,
            key: "accountCode",
            keyPascal: "AccountCode",
            keySnake: "account_code",
            default: "000",
            object: "lineItem",
          },
          {
            line_items: null,
            is_list: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            csharp: "LineItem",
            java: "LineItem",
          },
          {
            add_lineitems: null,
            is_last: true,
            is_list_add: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            java: "LineItems",
            python: "line_item",
            ruby: "line_item",
            csharp: "LineItem",
            object: "lineItem",
          },
          {
            purchaseOrder: null,
            is_object: true,
            key: "purchaseOrder",
            keyPascal: "PurchaseOrder",
            keySnake: "purchase_order",
          },
          {
            set_contact: null,
            is_variable: true,
            nonString: true,
            key: "contact",
            keyPascal: "Contact",
            default: "contact",
            object: "purchaseOrder",
          },
          {
            set_lineitem: null,
            is_variable: true,
            nonString: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            default: "lineItems",
            python: "line_items",
            ruby: "line_items",
            object: "purchaseOrder",
          },
          {
            date: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "date",
            keyPascal: "Date",
            default: "dateValue",
            python: "date_value",
            ruby: "date_value",
            object: "purchaseOrder",
          },
          {
            purchaseOrders: null,
            is_object: true,
            key: "purchaseOrders",
            keyPascal: "PurchaseOrders",
          },
          {
            add_purchaseOrder: null,
            is_last: true,
            is_array_add: true,
            key: "purchaseOrders",
            keyPascal: "PurchaseOrders",
            keySnake: "purchase_orders",
            java: "PurchaseOrders",
            python: "purchase_order",
            ruby: "purchase_order",
            csharp: "PurchaseOrder",
            object: "purchaseOrder",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type PurchaseOrder array for specified PurchaseOrder",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PurchaseOrders",
                },
                example:
                  ' { "Id": "aa2f9d23-fd76-4bee-9600-30c0f0f34036", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1552522946173)\\/", "PurchaseOrders": [ { "PurchaseOrderID": "56204648-8fbe-46f8-b09c-2125f7939533", "PurchaseOrderNumber": "PO-0004", "DateString": "2019-03-13T00:00:00", "Date": "\\/Date(1552435200000+0000)\\/", "HasErrors": false, "IsDiscounted": false, "TotalDiscount": 0.00, "SentToContact": false, "Type": "PURCHASEORDER", "CurrencyRate": 1.000000, "CurrencyCode": "NZD", "Contact": { "ContactID": "430fa14a-f945-44d3-9f97-5df5e28441b8", "ContactStatus": "ACTIVE", "Name": "Liam Gallagher", "FirstName": "Liam", "LastName": "Gallagher", "EmailAddress": "liam@rockstar.com", "BankAccountDetails": "", "Addresses": [ null, { "AddressType": "POBOX", "City": "Anytown", "Region": "NY", "PostalCode": "10101", "Country": "USA", "AttentionTo": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "222-2222", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, null, { "PhoneType": "FAX", "PhoneNumber": "333-2233", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "444-3433", "PhoneAreaCode": "212", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1551747281053+0000)\\/", "ContactGroups": [ { "ContactGroupID": "17b44ed7-4389-4162-91cb-3dd5766e4e22", "Name": "Oasis", "Status": "ACTIVE", "Contacts": [], "HasValidationErrors": false } ], "IsSupplier": true, "IsCustomer": true, "SalesTrackingCategories": [], "PurchasesTrackingCategories": [], "ContactPersons": [], "HasValidationErrors": false }, "Status": "DRAFT", "LineAmountTypes": "Exclusive", "LineItems": [ { "Description": "Foobar", "UnitAmount": 20.0000, "TaxType": "INPUT2", "TaxAmount": 3.00, "LineAmount": 20.00, "AccountCode": "710", "Tracking": [], "Quantity": 1.0000, "LineItemID": "792b7e40-b9f2-47f0-8624-b09f4b0166dd" } ], "SubTotal": 20.00, "TotalTax": 3.00, "Total": 23.00, "UpdatedDateUTC": "\\/Date(1552522946077+0000)\\/", "StatusAttributeString": "ERROR", "Warnings": [ { "Message": "Only AUTHORISED and BILLED purchase orders may have SentToContact updated." } ], "ValidationErrors": [ { "Message": "Order number must be unique" } ] } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          description:
            "PurchaseOrders with an array of PurchaseOrder object in body of request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PurchaseOrders",
              },
              example:
                '{ "PurchaseOrders": [ { "Contact": { "ContactID": "00000000-0000-0000-0000-000000000000" }, "LineItems": [ { "Description": "Foobar", "Quantity": 1, "UnitAmount": 20, "AccountCode": "710" } ], "Date": "2019-03-13" } ] }',
            },
          },
        },
      },
      post: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "updateOrCreatePurchaseOrders",
        summary: "Updates or creates one or more purchase orders",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            dateValue: null,
            is_date: true,
            key: "dateValue",
            keyPascal: "Date",
            keySnake: "date_value",
            java_datatype: "LocalDate",
            default: "LocalDate.of(2020, Month.OCTOBER, 10)",
            node: "'2020-10-10'",
          },
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            contactID: null,
            is_last: true,
            is_uuid: true,
            key: "contactID",
            keyPascal: "ContactID",
            keySnake: "contact_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "contact",
          },
          {
            lineItem: null,
            is_object: true,
            key: "lineItem",
            keyPascal: "LineItem",
            keySnake: "line_item",
          },
          {
            description: null,
            key: "description",
            keyPascal: "Description",
            default: "Foobar",
            object: "lineItem",
          },
          {
            quantity: null,
            nonString: true,
            key: "quantity",
            keyPascal: "Quantity",
            default: 1,
            is_money: true,
            object: "lineItem",
          },
          {
            unitAmount: null,
            nonString: true,
            key: "unitAmount",
            keyPascal: "UnitAmount",
            keySnake: "unit_amount",
            default: 20,
            is_money: true,
            object: "lineItem",
          },
          {
            accountCode: null,
            is_last: true,
            key: "accountCode",
            keyPascal: "AccountCode",
            keySnake: "account_code",
            default: "000",
            object: "lineItem",
          },
          {
            line_items: null,
            is_list: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            csharp: "LineItem",
            java: "LineItem",
          },
          {
            add_lineitems: null,
            is_last: true,
            is_list_add: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            java: "LineItems",
            python: "line_item",
            ruby: "line_item",
            csharp: "LineItem",
            object: "lineItem",
          },
          {
            purchaseOrder: null,
            is_object: true,
            key: "purchaseOrder",
            keyPascal: "PurchaseOrder",
            keySnake: "purchase_order",
          },
          {
            set_contact: null,
            is_variable: true,
            nonString: true,
            key: "contact",
            keyPascal: "Contact",
            default: "contact",
            object: "purchaseOrder",
          },
          {
            set_lineitem: null,
            is_variable: true,
            nonString: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            default: "lineItems",
            python: "line_items",
            ruby: "line_items",
            object: "purchaseOrder",
          },
          {
            date: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "date",
            keyPascal: "Date",
            default: "dateValue",
            python: "date_value",
            ruby: "date_value",
            object: "purchaseOrder",
          },
          {
            purchaseOrders: null,
            is_object: true,
            key: "purchaseOrders",
            keyPascal: "PurchaseOrders",
          },
          {
            add_purchaseOrder: null,
            is_last: true,
            is_array_add: true,
            key: "purchaseOrders",
            keyPascal: "PurchaseOrders",
            keySnake: "purchase_orders",
            java: "PurchaseOrders",
            python: "purchase_order",
            ruby: "purchase_order",
            csharp: "PurchaseOrder",
            object: "purchaseOrder",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type PurchaseOrder array for specified PurchaseOrder",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PurchaseOrders",
                },
                example:
                  ' { "Id": "aa2f9d23-fd76-4bee-9600-30c0f0f34036", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1552522946173)\\/", "PurchaseOrders": [ { "PurchaseOrderID": "56204648-8fbe-46f8-b09c-2125f7939533", "PurchaseOrderNumber": "PO-0004", "DateString": "2019-03-13T00:00:00", "Date": "\\/Date(1552435200000+0000)\\/", "HasErrors": false, "IsDiscounted": false, "TotalDiscount": 0.00, "SentToContact": false, "Type": "PURCHASEORDER", "CurrencyRate": 1.000000, "CurrencyCode": "NZD", "Contact": { "ContactID": "430fa14a-f945-44d3-9f97-5df5e28441b8", "ContactStatus": "ACTIVE", "Name": "Liam Gallagher", "FirstName": "Liam", "LastName": "Gallagher", "EmailAddress": "liam@rockstar.com", "BankAccountDetails": "", "Addresses": [ null, { "AddressType": "POBOX", "City": "Anytown", "Region": "NY", "PostalCode": "10101", "Country": "USA", "AttentionTo": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "222-2222", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, null, { "PhoneType": "FAX", "PhoneNumber": "333-2233", "PhoneAreaCode": "212", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "444-3433", "PhoneAreaCode": "212", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "\\/Date(1551747281053+0000)\\/", "ContactGroups": [ { "ContactGroupID": "17b44ed7-4389-4162-91cb-3dd5766e4e22", "Name": "Oasis", "Status": "ACTIVE", "Contacts": [], "HasValidationErrors": false } ], "IsSupplier": true, "IsCustomer": true, "SalesTrackingCategories": [], "PurchasesTrackingCategories": [], "ContactPersons": [], "HasValidationErrors": false }, "Status": "DRAFT", "LineAmountTypes": "Exclusive", "LineItems": [ { "Description": "Foobar", "UnitAmount": 20.0000, "TaxType": "INPUT2", "TaxAmount": 3.00, "LineAmount": 20.00, "AccountCode": "710", "Tracking": [], "Quantity": 1.0000, "LineItemID": "792b7e40-b9f2-47f0-8624-b09f4b0166dd" } ], "SubTotal": 20.00, "TotalTax": 3.00, "Total": 23.00, "UpdatedDateUTC": "\\/Date(1552522946077+0000)\\/", "StatusAttributeString": "ERROR", "Warnings": [ { "Message": "Only AUTHORISED and BILLED purchase orders may have SentToContact updated." } ], "ValidationErrors": [ { "Message": "Order number must be unique" } ] } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PurchaseOrders",
              },
              example:
                '{ "PurchaseOrders": [ { "Contact": { "ContactID": "00000000-0000-0000-0000-000000000000" }, "LineItems": [ { "Description": "Foobar", "Quantity": 1, "UnitAmount": 20, "AccountCode": "710" } ], "Date": "2019-03-13" } ] }',
            },
          },
        },
      },
    },
    "/Quotes": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.transactions", "accounting.transactions.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getQuotes",
        summary: "Retrieves sales quotes",
        parameters: [
          {
            $ref: "#/components/parameters/ifModifiedSince",
          },
          {
            in: "query",
            name: "DateFrom",
            "x-snake": "date_from",
            description: "Filter for quotes after a particular date",
            example: "2019-10-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            in: "query",
            name: "DateTo",
            "x-snake": "date_to",
            description: "Filter for quotes before a particular date",
            example: "2019-10-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            in: "query",
            name: "ExpiryDateFrom",
            "x-snake": "expiry_date_from",
            description: "Filter for quotes expiring after a particular date",
            example: "2019-10-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            in: "query",
            name: "ExpiryDateTo",
            "x-snake": "expiry_date_to",
            description: "Filter for quotes before a particular date",
            example: "2019-10-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            in: "query",
            name: "ContactID",
            "x-snake": "contact_id",
            description: "Filter for quotes belonging to a particular contact",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
              format: "uuid",
            },
          },
          {
            in: "query",
            name: "Status",
            "x-snake": "status",
            description: "Filter for quotes of a particular Status",
            example: "DRAFT",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "page",
            description:
              "e.g. page=1 – Up to 100 Quotes will be returned in a single API call with line items shown for each quote",
            example: 1,
            schema: {
              type: "integer",
            },
          },
          {
            in: "query",
            name: "order",
            description: "Order by an any element",
            example: "Status ASC",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "QuoteNumber",
            "x-snake": "quote_number",
            description:
              "Filter by quote number (e.g. GET https://.../Quotes?QuoteNumber=QU-0001)",
            example: "QU-0001",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type quotes array with all quotes",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Quotes",
                },
                example:
                  '{ "Id": "bb583e7e-9b6b-471e-88da-4cbfcfad7a57", "Status": "OK", "ProviderName": "Adams OAuth2 App", "DateTimeUTC": "/Date(1571876635477)/", "Quotes": [ { "QuoteID": "be59294f-2a9c-4cee-8c64-0f0ddbc1883a", "QuoteNumber": "QU-0001", "Reference": "REF-123", "Terms": "Not valid after the expiry date", "Contact": { "ContactID": "060816db-0ed7-44de-ab58-8fee9316fcd5", "Name": "Adam" }, "LineItems": [ { "LineItemID": "ccf5e45c-73b6-4659-83e8-520f4c6126fd", "AccountCode": "200", "Description": "Fish out of Water", "UnitAmount": 19.9500, "DiscountRate": 10.00, "LineAmount": 17.96, "ItemCode": "BOOK", "Quantity": 1.0000, "TaxAmount": 2.69, "TaxType": "OUTPUT2", "Tracking": [ { "TrackingCategoryID": "351953c4-8127-4009-88c3-f9cd8c9cbe9f", "TrackingOptionID": "ce205173-7387-4651-9726-2cf4c5405ba2", "Name": "Region", "Option": "Eastside" } ] } ], "Date": "/Date(1571875200000)/", "DateString": "2019-10-24T00:00:00", "ExpiryDate": "/Date(1571961600000)/", "ExpiryDateString": "2019-10-25T00:00:00", "Status": "ACCEPTED", "CurrencyRate": 0.937053, "CurrencyCode": "AUD", "SubTotal": 17.96, "TotalTax": 2.69, "Total": 20.65, "TotalDiscount": 1.99, "Title": "Your Quote", "Summary": "Please buy this", "BrandingThemeID": "4c82c365-35cb-467f-bb11-dce1f2f2f67c", "UpdatedDateUTC": "/Date(1571869373890)/", "LineAmountTypes": "EXCLUSIVE" } ] }',
              },
            },
          },
        },
      },
      put: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "createQuotes",
        summary: "Create one or more quotes",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            dateValue: null,
            is_date: true,
            key: "dateValue",
            keyPascal: "Date",
            keySnake: "date_value",
            java_datatype: "LocalDate",
            default: "LocalDate.of(2020, Month.OCTOBER, 10)",
            node: "'2020-10-10'",
          },
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            contactID: null,
            is_last: true,
            is_uuid: true,
            key: "contactID",
            keyPascal: "ContactID",
            keySnake: "contact_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "contact",
          },
          {
            lineItem: null,
            is_object: true,
            key: "lineItem",
            keyPascal: "LineItem",
            keySnake: "line_item",
          },
          {
            description: null,
            key: "description",
            keyPascal: "Description",
            default: "Foobar",
            object: "lineItem",
          },
          {
            quantity: null,
            nonString: true,
            key: "quantity",
            keyPascal: "Quantity",
            default: 1,
            is_money: true,
            object: "lineItem",
          },
          {
            unitAmount: null,
            nonString: true,
            key: "unitAmount",
            keyPascal: "UnitAmount",
            keySnake: "unit_amount",
            default: 20,
            is_money: true,
            object: "lineItem",
          },
          {
            accountCode: null,
            is_last: true,
            key: "accountCode",
            keyPascal: "AccountCode",
            keySnake: "account_code",
            default: "000",
            object: "lineItem",
          },
          {
            line_items: null,
            is_list: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            csharp: "LineItem",
            java: "LineItem",
          },
          {
            add_lineitems: null,
            is_last: true,
            is_list_add: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            java: "LineItems",
            python: "line_item",
            ruby: "line_item",
            csharp: "LineItem",
            object: "lineItem",
          },
          {
            quote: null,
            is_object: true,
            key: "quote",
            keyPascal: "Quote",
          },
          {
            set_contact: null,
            is_variable: true,
            nonString: true,
            key: "contact",
            keyPascal: "Contact",
            default: "contact",
            object: "quote",
          },
          {
            set_lineitem: null,
            is_variable: true,
            nonString: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            default: "lineItems",
            python: "line_items",
            ruby: "line_items",
            object: "quote",
          },
          {
            date: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "date",
            keyPascal: "Date",
            default: "dateValue",
            python: "date_value",
            ruby: "date_value",
            object: "quote",
          },
          {
            quotes: null,
            is_object: true,
            key: "quotes",
            keyPascal: "Quotes",
          },
          {
            add_quote: null,
            is_last: true,
            is_array_add: true,
            key: "quotes",
            keyPascal: "Quotes",
            java: "Quotes",
            csharp: "Quote",
            object: "quote",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Quotes with array with newly created Quote",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Quotes",
                },
                example:
                  '{  "SummarizeErrors":false, "Id":"29571f5a-bf73-4bb6-9de5-86be44e6bf2e", "Status":"OK", "ProviderName":"provider-name", "DateTimeUTC":"\\/Date(1580607782916)\\/", "Quotes":[  {  "QuoteID":"60031d53-6488-4321-9cbd-c1db6dbf9ba4", "QuoteNumber":"QU-0008", "Terms":"", "Contact":{  "ContactID":"6a65f055-b0e0-471a-a933-d1ffdd89393f", "Name":"John Smith-82160", "EmailAddress":"" }, "LineItems":[  {  "LineItemID":"26995857-0eea-45fb-b46c-f8ea896ec46e", "AccountCode":"12775", "Description":"Foobar", "UnitAmount":20.0000, "LineAmount":20.00, "ItemCode":"", "Quantity":1.0000, "TaxAmount":0.00, "Tracking":[ \n] } ], "Date":"\\/Date(1580515200000)\\/", "DateString":"2020-02-01T00:00:00", "Status":"DRAFT", "CurrencyRate":1.000000, "CurrencyCode":"USD", "SubTotal":20.00, "TotalTax":0.00, "Total":20.00, "UpdatedDateUTC":"\\/Date(1580607782913)\\/", "LineAmountTypes":"EXCLUSIVE", "StatusAttributeString":"OK" } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          description:
            "Quotes with an array of Quote object in body of request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Quotes",
              },
              example:
                '{ "Quotes": [ { "Contact": { "ContactID": "00000000-0000-0000-0000-000000000000" }, "LineItems": [ { "Description": "Foobar", "Quantity": 1, "UnitAmount": 20, "AccountCode": "12775" } ], "Date": "2020-02-01" } ] }',
            },
          },
        },
      },
      post: {
        security: [
          {
            OAuth2: ["accounting.transactions"],
          },
        ],
        tags: ["Accounting"],
        operationId: "updateOrCreateQuotes",
        summary: "Updates or creates one or more quotes",
        "x-hasAccountingValidationError": true,
        "x-example": [
          {
            dateValue: null,
            is_date: true,
            key: "dateValue",
            keyPascal: "Date",
            keySnake: "date_value",
            java_datatype: "LocalDate",
            default: "LocalDate.of(2020, Month.OCTOBER, 10)",
            node: "'2020-10-10'",
          },
          {
            contact: null,
            is_object: true,
            key: "contact",
            keyPascal: "Contact",
          },
          {
            contactID: null,
            is_last: true,
            is_uuid: true,
            key: "contactID",
            keyPascal: "ContactID",
            keySnake: "contact_id",
            default: "00000000-0000-0000-0000-000000000000",
            object: "contact",
          },
          {
            lineItem: null,
            is_object: true,
            key: "lineItem",
            keyPascal: "LineItem",
            keySnake: "line_item",
          },
          {
            description: null,
            key: "description",
            keyPascal: "Description",
            default: "Foobar",
            object: "lineItem",
          },
          {
            quantity: null,
            nonString: true,
            key: "quantity",
            keyPascal: "Quantity",
            default: 1,
            is_money: true,
            object: "lineItem",
          },
          {
            unitAmount: null,
            nonString: true,
            key: "unitAmount",
            keyPascal: "UnitAmount",
            keySnake: "unit_amount",
            default: 20,
            is_money: true,
            object: "lineItem",
          },
          {
            accountCode: null,
            is_last: true,
            key: "accountCode",
            keyPascal: "AccountCode",
            keySnake: "account_code",
            default: "000",
            object: "lineItem",
          },
          {
            line_items: null,
            is_list: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            csharp: "LineItem",
            java: "LineItem",
          },
          {
            add_lineitems: null,
            is_last: true,
            is_list_add: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            java: "LineItems",
            python: "line_item",
            ruby: "line_item",
            csharp: "LineItem",
            object: "lineItem",
          },
          {
            quote: null,
            is_object: true,
            key: "quote",
            keyPascal: "Quote",
          },
          {
            set_contact: null,
            is_variable: true,
            nonString: true,
            key: "contact",
            keyPascal: "Contact",
            default: "contact",
            object: "quote",
          },
          {
            set_lineitem: null,
            is_variable: true,
            nonString: true,
            key: "lineItems",
            keyPascal: "LineItems",
            keySnake: "line_items",
            default: "lineItems",
            python: "line_items",
            ruby: "line_items",
            object: "quote",
          },
          {
            date: null,
            is_last: true,
            is_variable: true,
            nonString: true,
            key: "date",
            keyPascal: "Date",
            default: "dateValue",
            python: "date_value",
            ruby: "date_value",
            object: "quote",
          },
          {
            quotes: null,
            is_object: true,
            key: "quotes",
            keyPascal: "Quotes",
          },
          {
            add_quote: null,
            is_last: true,
            is_array_add: true,
            key: "quotes",
            keyPascal: "Quotes",
            java: "Quotes",
            csharp: "Quote",
            object: "quote",
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/summarizeErrors",
          },
          {
            $ref: "#/components/parameters/idempotencyKey",
          },
        ],
        responses: {
          200: {
            description:
              "Success - return response of type Quotes array with updated or created Quote",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Quotes",
                },
                example:
                  '{  "SummarizeErrors":false, "Id":"b425754f-0512-481d-827b-c8958db7667e", "Status":"OK", "ProviderName":"provider-name", "DateTimeUTC":"\\/Date(1580607783833)\\/", "Quotes":[  {  "QuoteID":"fd53e0b7-4d24-4c20-be85-043a62ea5847", "QuoteNumber":"QU-0009", "Terms":"", "Contact":{  "ContactID":"6a65f055-b0e0-471a-a933-d1ffdd89393f", "Name":"John Smith-82160", "EmailAddress":"" }, "LineItems":[  {  "LineItemID":"898c7fd6-0d94-4ac0-ace8-87e350a042de", "AccountCode":"12775", "Description":"Foobar", "UnitAmount":20.0000, "LineAmount":20.00, "ItemCode":"", "Quantity":1.0000, "TaxAmount":0.00, "Tracking":[ \n] } ], "Date":"\\/Date(1580515200000)\\/", "DateString":"2020-02-01T00:00:00", "Status":"DRAFT", "CurrencyRate":1.000000, "CurrencyCode":"USD", "SubTotal":20.00, "TotalTax":0.00, "Total":20.00, "UpdatedDateUTC":"\\/Date(1580607783467)\\/", "LineAmountTypes":"EXCLUSIVE", "StatusAttributeString":"OK" } ] }',
              },
            },
          },
          400: {
            $ref: "#/components/responses/400Error",
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Quotes",
              },
              example:
                '{ "Quotes": [ { "Contact": { "ContactID": "00000000-0000-0000-0000-000000000000" }, "LineItems": [ { "Description": "Foobar", "Quantity": 1, "UnitAmount": 20, "AccountCode": "12775" } ], "Date": "2020-02-01" } ] }',
            },
          },
        },
      },
    },
    "/Reports/AgedPayablesByContact": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportAgedPayablesByContact",
        summary: "Retrieves report for aged payables by contact",
        parameters: [
          {
            in: "query",
            required: true,
            name: "contactId",
            "x-snake": "contact_id",
            description: "Unique identifier for a Contact",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
              format: "uuid",
            },
          },
          {
            in: "query",
            name: "date",
            description: "The date of the Aged Payables By Contact report",
            example: "2019-10-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            $ref: "#/components/parameters/FromDate",
          },
          {
            $ref: "#/components/parameters/ToDate",
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
                example:
                  '{ "Id": "5a33f9d4-44a6-4467-a812-4f025506ee35", "Status": "OK", "ProviderName": "Java Public Example", "DateTimeUTC": "\\/Date(1555971088085)\\/", "Reports": [ { "ReportName": "Aged Payables By Contact", "ReportType": "AgedPayablesByContact", "ReportTitles": [ "Invoices", "ABC", "From 10 October 2017 to 22 April 2019", "Showing payments to 22 April 2019" ], "ReportDate": "22 April 2019", "UpdatedDateUTC": "\\/Date(1555971088085)\\/", "Fields": [], "Rows": [ { "RowType": "Header", "Cells": [ { "Value": "Date" }, { "Value": "Reference" }, { "Value": "Due Date" }, { "Value": "" }, { "Value": "Total" }, { "Value": "Paid" }, { "Value": "Credited" }, { "Value": "Due" } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "2017-10-10T00:00:00" }, { "Value": "Opening Balance" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "0.00" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "2018-10-09T00:00:00", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] }, { "Value": "", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] }, { "Value": "2018-10-23T00:00:00", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] }, { "Value": "181 days overdue", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] }, { "Value": "250.00", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] }, { "Value": "250.00", "Attributes": [ { "Value": "1f3960ae-0537-4438-a4dd-76d785e6d7d8", "Id": "invoiceID" } ] } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "250.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "250.00" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Closing Balance" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "250.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "250.00" } ] } ] } ] } ] }',
              },
            },
          },
        },
      },
    },
    "/Reports/AgedReceivablesByContact": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportAgedReceivablesByContact",
        summary: "Retrieves report for aged receivables by contact",
        parameters: [
          {
            in: "query",
            required: true,
            name: "contactId",
            "x-snake": "contact_id",
            description: "Unique identifier for a Contact",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
              format: "uuid",
            },
          },
          {
            in: "query",
            name: "date",
            description: "The date of the Aged Receivables By Contact report",
            example: "2019-10-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            $ref: "#/components/parameters/FromDate",
          },
          {
            $ref: "#/components/parameters/ToDate",
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
                example:
                  '{ "Id": "b977b607-955d-47cb-92fd-7c29b3dd755c", "Status": "OK", "ProviderName": "Java Public Example", "DateTimeUTC": "\\/Date(1556032862815)\\/", "Reports": [ { "ReportName": "Aged Receivables By Contact", "ReportType": "AgedReceivablesByContact", "ReportTitles": [ "Invoices", "ABC", "From 10 October 2017 to 23 April 2019", "Showing payments to 23 April 2019" ], "ReportDate": "23 April 2019", "UpdatedDateUTC": "\\/Date(1556032862815)\\/", "Fields": [], "Rows": [ { "RowType": "Header", "Cells": [ { "Value": "Date" }, { "Value": "Number" }, { "Value": "Due Date" }, { "Value": "" }, { "Value": "Total" }, { "Value": "Paid" }, { "Value": "Credited" }, { "Value": "Due" } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "2017-10-10T00:00:00" }, { "Value": "Opening Balance" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "0.00" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "2018-05-13T00:00:00", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] }, { "Value": "IV1242016", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] }, { "Value": "2018-06-22T00:00:00", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] }, { "Value": "305 days overdue", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] }, { "Value": "100.00", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] }, { "Value": "100.00", "Attributes": [ { "Value": "40ebad47-24e2-4dc9-a5f5-579df427671b", "Id": "invoiceID" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "2019-04-23T00:00:00", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] }, { "Value": "INV-0086", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] }, { "Value": "2019-05-07T00:00:00", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] }, { "Value": "", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] }, { "Value": "50.00", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] }, { "Value": "50.00", "Attributes": [ { "Value": "ca0483ce-fa43-4335-8512-751e655337b8", "Id": "invoiceID" } ] } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "150.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "150.00" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Closing Balance" }, { "Value": "" }, { "Value": "" }, { "Value": "" }, { "Value": "150.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "150.00" } ] } ] } ] } ] }',
              },
            },
          },
        },
      },
    },
    "/Reports/BalanceSheet": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportBalanceSheet",
        summary: "Retrieves report for balancesheet",
        parameters: [
          {
            in: "query",
            name: "date",
            description: "The date of the Balance Sheet report",
            example: "2019-11-01",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            in: "query",
            name: "periods",
            description: "The number of periods for the Balance Sheet report",
            example: 3,
            schema: {
              type: "integer",
            },
          },
          {
            in: "query",
            name: "timeframe",
            description: "The period size to compare to (MONTH, QUARTER, YEAR)",
            example: "MONTH",
            schema: {
              type: "string",
              enum: ["MONTH", "QUARTER", "YEAR"],
            },
          },
          {
            in: "query",
            name: "trackingOptionID1",
            "x-snake": "tracking_option_id_1",
            description: "The tracking option 1 for the Balance Sheet report",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "trackingOptionID2",
            "x-snake": "tracking_option_id_2",
            description: "The tracking option 2 for the Balance Sheet report",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "standardLayout",
            "x-snake": "standard_layout",
            description:
              "The standard layout boolean for the Balance Sheet report",
            example: true,
            "x-example-python": "True",
            schema: {
              type: "boolean",
            },
          },
          {
            in: "query",
            name: "paymentsOnly",
            "x-snake": "payments_only",
            description: "return a cash basis for the Balance Sheet report",
            example: false,
            "x-example-python": "False",
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
                example:
                  '{ "Id": "2ddba304-6ed3-4da4-b185-3b6289699653", "Status": "OK", "ProviderName": "Provider Name Example", "DateTimeUTC": "\\/Date(1555099412778)\\/", "Reports": [ { "ReportName": "Balance Sheet", "ReportType": "BalanceSheet", "ReportTitles": [ "Balance Sheet", "Dev Evangelist - Sid Test 3 (NZ-2016-02)", "As at 30 April 2019" ], "ReportDate": "12 April 2019", "UpdatedDateUTC": "\\/Date(1555099412778)\\/", "Fields": [], "Rows": [ { "RowType": "Header", "Cells": [ { "Value": "" }, { "Value": "30 Apr 2019" }, { "Value": "31 Mar 2019" }, { "Value": "28 Feb 2019" } ] }, { "RowType": "Section", "Title": "Assets", "Rows": [] }, { "RowType": "Section", "Title": "Bank", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Country Savings", "Attributes": [ { "Value": "041207d2-3d61-4e5d-8c1a-b9236955a71c", "Id": "account" } ] }, { "Value": "-1850.00", "Attributes": [ { "Value": "041207d2-3d61-4e5d-8c1a-b9236955a71c", "Id": "account" } ] }, { "Value": "-1850.00", "Attributes": [ { "Value": "041207d2-3d61-4e5d-8c1a-b9236955a71c", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "041207d2-3d61-4e5d-8c1a-b9236955a71c", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "My Big Bank", "Attributes": [ { "Value": "300f3bde-3a5c-4035-9ec5-45b09777679a", "Id": "account" } ] }, { "Value": "2146.37", "Attributes": [ { "Value": "300f3bde-3a5c-4035-9ec5-45b09777679a", "Id": "account" } ] }, { "Value": "2020.00", "Attributes": [ { "Value": "300f3bde-3a5c-4035-9ec5-45b09777679a", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "300f3bde-3a5c-4035-9ec5-45b09777679a", "Id": "account" } ] } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Bank" }, { "Value": "296.37" }, { "Value": "170.00" }, { "Value": "0.00" } ] } ] }, { "RowType": "Section", "Title": "Current Assets", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Accounts Receivable", "Attributes": [ { "Value": "b94495d0-44ab-4199-a1d0-427a4877e100", "Id": "account" } ] }, { "Value": "154355.72", "Attributes": [ { "Value": "b94495d0-44ab-4199-a1d0-427a4877e100", "Id": "account" } ] }, { "Value": "154351.78", "Attributes": [ { "Value": "b94495d0-44ab-4199-a1d0-427a4877e100", "Id": "account" } ] }, { "Value": "356.50", "Attributes": [ { "Value": "b94495d0-44ab-4199-a1d0-427a4877e100", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Inventory", "Attributes": [ { "Value": "53a12a15-7e9b-4a31-85f4-a7cee6d04215", "Id": "account" } ] }, { "Value": "25000.00", "Attributes": [ { "Value": "53a12a15-7e9b-4a31-85f4-a7cee6d04215", "Id": "account" } ] }, { "Value": "25000.00", "Attributes": [ { "Value": "53a12a15-7e9b-4a31-85f4-a7cee6d04215", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "53a12a15-7e9b-4a31-85f4-a7cee6d04215", "Id": "account" } ] } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Current Assets" }, { "Value": "179355.72" }, { "Value": "179351.78" }, { "Value": "356.50" } ] } ] }, { "RowType": "Section", "Title": "Fixed Assets", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Office Equipment", "Attributes": [ { "Value": "7132cab3-ce56-4389-8e47-8f60d4c137f8", "Id": "account" } ] }, { "Value": "-119.00", "Attributes": [ { "Value": "7132cab3-ce56-4389-8e47-8f60d4c137f8", "Id": "account" } ] }, { "Value": "-119.00", "Attributes": [ { "Value": "7132cab3-ce56-4389-8e47-8f60d4c137f8", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "7132cab3-ce56-4389-8e47-8f60d4c137f8", "Id": "account" } ] } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Fixed Assets" }, { "Value": "-119.00" }, { "Value": "-119.00" }, { "Value": "0.00" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Assets" }, { "Value": "179533.09" }, { "Value": "179402.78" }, { "Value": "356.50" } ] } ] }, { "RowType": "Section", "Title": "Liabilities", "Rows": [] }, { "RowType": "Section", "Title": "Current Liabilities", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Accounts Payable", "Attributes": [ { "Value": "a2a4795b-a01f-40eb-afa6-a34b4514875d", "Id": "account" } ] }, { "Value": "-3469.00", "Attributes": [ { "Value": "a2a4795b-a01f-40eb-afa6-a34b4514875d", "Id": "account" } ] }, { "Value": "-3469.00", "Attributes": [ { "Value": "a2a4795b-a01f-40eb-afa6-a34b4514875d", "Id": "account" } ] }, { "Value": "-184.00", "Attributes": [ { "Value": "a2a4795b-a01f-40eb-afa6-a34b4514875d", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "GST", "Attributes": [ { "Value": "17d9a4a0-3181-4803-a96b-f0dbe589091b", "Id": "account" } ] }, { "Value": "-2446.21", "Attributes": [ { "Value": "17d9a4a0-3181-4803-a96b-f0dbe589091b", "Id": "account" } ] }, { "Value": "-2461.89", "Attributes": [ { "Value": "17d9a4a0-3181-4803-a96b-f0dbe589091b", "Id": "account" } ] }, { "Value": "76.50", "Attributes": [ { "Value": "17d9a4a0-3181-4803-a96b-f0dbe589091b", "Id": "account" } ] } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Current Liabilities" }, { "Value": "-5915.21" }, { "Value": "-5930.89" }, { "Value": "-107.50" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Liabilities" }, { "Value": "-5915.21" }, { "Value": "-5930.89" }, { "Value": "-107.50" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Net Assets" }, { "Value": "185448.30" }, { "Value": "185333.67" }, { "Value": "464.00" } ] } ] }, { "RowType": "Section", "Title": "Equity", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Current Year Earnings", "Attributes": [ { "Value": "00000000-0000-0000-0000-000000000000", "Id": "account" } ] }, { "Value": "114.62", "Attributes": [ { "Value": "00000000-0000-0000-0000-000000000000", "Id": "account" }, { "Value": "4/1/2019", "Id": "fromDate" }, { "Value": "4/30/2019", "Id": "toDate" } ] }, { "Value": "156621.67", "Attributes": [ { "Value": "00000000-0000-0000-0000-000000000000", "Id": "account" }, { "Value": "4/1/2018", "Id": "fromDate" }, { "Value": "3/31/2019", "Id": "toDate" } ] }, { "Value": "500.00", "Attributes": [ { "Value": "00000000-0000-0000-0000-000000000000", "Id": "account" }, { "Value": "4/1/2018", "Id": "fromDate" }, { "Value": "2/28/2019", "Id": "toDate" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Owner A Drawings", "Attributes": [ { "Value": "136ebd08-60ea-4592-8982-be92c153b53a", "Id": "account" } ] }, { "Value": "28752.00", "Attributes": [ { "Value": "136ebd08-60ea-4592-8982-be92c153b53a", "Id": "account" } ] }, { "Value": "28752.00", "Attributes": [ { "Value": "136ebd08-60ea-4592-8982-be92c153b53a", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "136ebd08-60ea-4592-8982-be92c153b53a", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Owner A Funds Introduced", "Attributes": [ { "Value": "5690f1e8-1d02-4893-90c2-ee1a69eff942", "Id": "account" } ] }, { "Value": "-50.00", "Attributes": [ { "Value": "5690f1e8-1d02-4893-90c2-ee1a69eff942", "Id": "account" } ] }, { "Value": "-50.00", "Attributes": [ { "Value": "5690f1e8-1d02-4893-90c2-ee1a69eff942", "Id": "account" } ] }, { "Value": "-46.00", "Attributes": [ { "Value": "5690f1e8-1d02-4893-90c2-ee1a69eff942", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Retained Earnings", "Attributes": [ { "Value": "7fc16c06-c342-4f32-995f-889b5f9996fd", "Id": "account" } ] }, { "Value": "156631.67", "Attributes": [ { "Value": "7fc16c06-c342-4f32-995f-889b5f9996fd", "Id": "account" }, { "Value": "", "Id": "fromDate" }, { "Value": "4/30/2019", "Id": "toDate" } ] }, { "Value": "10.00", "Attributes": [ { "Value": "7fc16c06-c342-4f32-995f-889b5f9996fd", "Id": "account" }, { "Value": "", "Id": "fromDate" }, { "Value": "3/31/2019", "Id": "toDate" } ] }, { "Value": "10.00", "Attributes": [ { "Value": "7fc16c06-c342-4f32-995f-889b5f9996fd", "Id": "account" }, { "Value": "", "Id": "fromDate" }, { "Value": "2/28/2019", "Id": "toDate" } ] } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Equity" }, { "Value": "185448.29" }, { "Value": "185333.67" }, { "Value": "464.00" } ] } ] } ] } ] }',
              },
            },
          },
        },
      },
    },
    "/Reports/BankSummary": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportBankSummary",
        summary: "Retrieves report for bank summary",
        parameters: [
          {
            $ref: "#/components/parameters/FromDate",
          },
          {
            $ref: "#/components/parameters/ToDate",
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
                example:
                  '{ "Id": "ae58d0ec-9c5c-455f-b96e-690107579257", "Status": "OK", "ProviderName": "Java Public Example", "DateTimeUTC": "\\/Date(1556035526223)\\/", "Reports": [ { "ReportName": "Bank Summary", "ReportType": "BankSummary", "ReportTitles": [ "Bank Summary", "MindBody Test 10 (AU-2016-02)", "From 1 April 2019 to 30 April 2019" ], "ReportDate": "23 April 2019", "UpdatedDateUTC": "\\/Date(1556035526223)\\/", "Fields": [], "Rows": [ { "RowType": "Header", "Cells": [ { "Value": "Bank Accounts" }, { "Value": "Opening Balance" }, { "Value": "Cash Received" }, { "Value": "Cash Spent" }, { "Value": "Closing Balance" } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Big City Bank", "Attributes": [ { "Value": "03f9cf1e-2deb-4bf1-b0a8-b57f08672eb8", "Id": "accountID" } ] }, { "Value": "0.00" }, { "Value": "110.00", "Attributes": [ { "Value": "03f9cf1e-2deb-4bf1-b0a8-b57f08672eb8", "Id": "account" } ] }, { "Value": "100.00", "Attributes": [ { "Value": "03f9cf1e-2deb-4bf1-b0a8-b57f08672eb8", "Id": "account" } ] }, { "Value": "10.00" } ] }, { "RowType": "SummaryRow", "Cells": [ { "Value": "Total" }, { "Value": "0.00" }, { "Value": "110.00" }, { "Value": "100.00" }, { "Value": "10.00" } ] } ] } ] } ] }',
              },
            },
          },
        },
      },
    },
    "/Reports/{ReportID}": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportFromId",
        summary: "Retrieves a specific report using a unique ReportID",
        parameters: [
          {
            in: "path",
            required: true,
            name: "ReportID",
            "x-snake": "report_id",
            description: "Unique identifier for a Report",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
              },
            },
          },
        },
      },
    },
    "/Reports/BudgetSummary": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportBudgetSummary",
        summary: "Retrieves report for budget summary",
        parameters: [
          {
            in: "query",
            name: "date",
            description: "The date for the Bank Summary report e.g. 2018-03-31",
            example: "2019-03-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            in: "query",
            name: "periods",
            description:
              "The number of periods to compare (integer between 1 and 12)",
            example: 2,
            schema: {
              type: "integer",
            },
          },
          {
            in: "query",
            name: "timeframe",
            description:
              "The period size to compare to (1=month, 3=quarter, 12=year)",
            example: 3,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "success- return a Report with Rows object",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
                example:
                  '{ "Id": "9f1e2722-0d98-4669-890f-f8f4217c968b", "Status": "OK", "ProviderName": "provider-name", "DateTimeUTC": "\\/Date(1573755037865)\\/", "Reports": [ { "ReportName": "Budget Summary", "ReportType": "BudgetSummary", "ReportTitles": [ "Overall Budget", "Budget Summary", "Online Test 11", "November 2019 to October 2022" ], "ReportDate": "14 November 2019", "UpdatedDateUTC": "\\/Date(1573755037865)\\/", "Fields": [], "Rows": [ { "RowType": "Header", "Cells": [ { "Value": "Account" }, { "Value": "Jan-20" }, { "Value": "Apr-20" }, { "Value": "Jul-20" }, { "Value": "Oct-20" }, { "Value": "Jan-21" }, { "Value": "Apr-21" }, { "Value": "Jul-21" }, { "Value": "Oct-21" }, { "Value": "Jan-22" }, { "Value": "Apr-22" }, { "Value": "Jul-22" }, { "Value": "Oct-22" } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Gross Profit" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Total Expenses" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Net Profit" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.00" } ] } ] } ] } ] }',
              },
            },
          },
        },
      },
    },
    "/Reports/ExecutiveSummary": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportExecutiveSummary",
        summary: "Retrieves report for executive summary",
        parameters: [
          {
            in: "query",
            name: "date",
            description: "The date for the Bank Summary report e.g. 2018-03-31",
            example: "2019-03-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
                example:
                  '{ "Id": "068d3505-ac37-43f3-8135-f912a5963d8a", "Status": "OK", "ProviderName": "provider-name", "DateTimeUTC": "/Date(1573755038314)/", "Reports": [ { "ReportName": "Executive Summary", "ReportType": "ExecutiveSummary", "ReportTitles": [ "Executive Summary", "Online Test 11", "For the month of November 2019" ], "ReportDate": "14 November 2019", "UpdatedDateUTC": "/Date(1573755038314)/", "Fields": [], "Rows": [ { "RowType": "Header", "Cells": [ { "Value": "" }, { "Value": "Nov 2019" }, { "Value": "Oct 2019" }, { "Value": "Variance" } ] }, { "RowType": "Section", "Title": "Cash", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Cash received" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Cash spent" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Cash surplus (deficit)" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Closing bank balance" }, { "Value": "79.01" }, { "Value": "79.01" }, { "Value": "0.0%" } ] } ] }, { "RowType": "Section", "Title": "Profitability", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Income" }, { "Value": "40.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Direct costs" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Gross profit (loss)" }, { "Value": "40.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Other Income" }, { "Value": "0.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Expenses" }, { "Value": "205.40" }, { "Value": "0.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Profit (loss)" }, { "Value": "-165.40" }, { "Value": "0.00" }, { "Value": "0.0%" } ] } ] }, { "RowType": "Section", "Title": "Balance Sheet", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Debtors" }, { "Value": "590.00" }, { "Value": "550.00" }, { "Value": "7.3%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Creditors" }, { "Value": "-44.00" }, { "Value": "-44.00" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Net assets" }, { "Value": "594.16" }, { "Value": "759.56" }, { "Value": "-21.8%" } ] } ] }, { "RowType": "Section", "Title": "Income", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Number of invoices issued" }, { "Value": "1" }, { "Value": "0" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Average value of invoices" }, { "Value": "40.00" }, { "Value": "0.00" }, { "Value": "0.0%" } ] } ] }, { "RowType": "Section", "Title": "Performance", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Gross profit margin" }, { "Value": "100.0%" }, { "Value": "" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Net profit margin" }, { "Value": "-413.5%" }, { "Value": "" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Return on investment (p.a.)" }, { "Value": "-334.1%" }, { "Value": "0.0%" }, { "Value": "0.0%" } ] } ] }, { "RowType": "Section", "Title": "Position", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Average debtors days" }, { "Value": "442.50" }, { "Value": "0" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Average creditors days" }, { "Value": "-6.426484907497565725413826680" }, { "Value": "0" }, { "Value": "0.0%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Short term cash forecast" }, { "Value": "634.00" }, { "Value": "594.00" }, { "Value": "6.7%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Current assets to liabilities" }, { "Value": "4.0729764675459012154124644427" }, { "Value": "-62.034024896265560165975103734" }, { "Value": "106.6%" } ] }, { "RowType": "Row", "Cells": [ { "Value": "Term assets to liabilities" }, { "Value": "" }, { "Value": "" }, { "Value": "0.0%" } ] } ] } ] } ] }',
              },
            },
          },
        },
      },
    },
    "/Reports": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportsList",
        summary:
          "Retrieves a list of the organistaions unique reports that require a uuid to fetch",
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
              },
            },
          },
        },
      },
    },
    "/Reports/ProfitAndLoss": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportProfitAndLoss",
        summary: "Retrieves report for profit and loss",
        parameters: [
          {
            $ref: "#/components/parameters/FromDate",
          },
          {
            $ref: "#/components/parameters/ToDate",
          },
          {
            in: "query",
            name: "periods",
            description:
              "The number of periods to compare (integer between 1 and 12)",
            example: 3,
            schema: {
              type: "integer",
            },
          },
          {
            in: "query",
            name: "timeframe",
            description: "The period size to compare to (MONTH, QUARTER, YEAR)",
            example: "MONTH",
            schema: {
              type: "string",
              enum: ["MONTH", "QUARTER", "YEAR"],
            },
          },
          {
            in: "query",
            name: "trackingCategoryID",
            "x-snake": "tracking_category_id",
            description: "The trackingCategory 1 for the ProfitAndLoss report",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "trackingCategoryID2",
            "x-snake": "tracking_category_id_2",
            description: "The trackingCategory 2 for the ProfitAndLoss report",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "trackingOptionID",
            "x-snake": "tracking_option_id",
            description: "The tracking option 1 for the ProfitAndLoss report",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "trackingOptionID2",
            "x-snake": "tracking_option_id_2",
            description: "The tracking option 2 for the ProfitAndLoss report",
            example: "00000000-0000-0000-0000-000000000000",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "standardLayout",
            "x-snake": "standard_layout",
            description:
              "Return the standard layout for the ProfitAndLoss report",
            example: "true",
            "x-example-python": "True",
            schema: {
              type: "boolean",
            },
          },
          {
            in: "query",
            name: "paymentsOnly",
            "x-snake": "payments_only",
            description: "Return cash only basis for the ProfitAndLoss report",
            example: "false",
            "x-example-python": "False",
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
              },
            },
          },
        },
      },
    },
    "/Reports/TrialBalance": {
      parameters: [
        {
          $ref: "#/components/parameters/requiredHeader",
        },
      ],
      get: {
        security: [
          {
            OAuth2: ["accounting.reports.read"],
          },
        ],
        tags: ["Accounting"],
        operationId: "getReportTrialBalance",
        summary: "Retrieves report for trial balance",
        parameters: [
          {
            in: "query",
            name: "date",
            description:
              "The date for the Trial Balance report e.g. 2018-03-31",
            example: "2019-10-31",
            schema: {
              type: "string",
              format: "date",
            },
          },
          {
            in: "query",
            name: "paymentsOnly",
            "x-snake": "payments_only",
            description: "Return cash only basis for the Trial Balance report",
            example: "true",
            "x-example-python": "True",
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          200: {
            description: "Success - return response of type ReportWithRows",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReportWithRows",
                },
                example:
                  '{ "Id": "0b3ee35e-b97c-4b3c-b7e2-9a465233e329", "Status": "OK", "ProviderName": "Java Public Example", "DateTimeUTC": "\\/Date(1556129558740)\\/", "Reports": [ { "ReportName": "Trial Balance", "ReportType": "TrialBalance", "ReportTitles": [ "Trial Balance", "Dev Evangelist - Sid Test 1 (US-2016-06)", "As at 24 April 2019" ], "ReportDate": "24 April 2019", "UpdatedDateUTC": "\\/Date(1556129558724)\\/", "Fields": [], "Rows": [ { "RowType": "Header", "Cells": [ { "Value": "Account" }, { "Value": "Debit" }, { "Value": "Credit" }, { "Value": "YTD Debit" }, { "Value": "YTD Credit" } ] }, { "RowType": "Section", "Title": "Revenue", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Big Expense (002)", "Attributes": [ { "Value": "da962997-a8bd-4dff-9616-01cdc199283f", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "da962997-a8bd-4dff-9616-01cdc199283f", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "da962997-a8bd-4dff-9616-01cdc199283f", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "da962997-a8bd-4dff-9616-01cdc199283f", "Id": "account" } ] }, { "Value": "80.00", "Attributes": [ { "Value": "da962997-a8bd-4dff-9616-01cdc199283f", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Sales (400)", "Attributes": [ { "Value": "02439bca-5fdc-4b62-b281-0bdf9f16fd5b", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "02439bca-5fdc-4b62-b281-0bdf9f16fd5b", "Id": "account" } ] }, { "Value": "200.00", "Attributes": [ { "Value": "02439bca-5fdc-4b62-b281-0bdf9f16fd5b", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "02439bca-5fdc-4b62-b281-0bdf9f16fd5b", "Id": "account" } ] }, { "Value": "1020.22", "Attributes": [ { "Value": "02439bca-5fdc-4b62-b281-0bdf9f16fd5b", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Sales-35325 (1302)", "Attributes": [ { "Value": "3f50db14-1fe6-450b-bfe8-b2d894f18c62", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "3f50db14-1fe6-450b-bfe8-b2d894f18c62", "Id": "account" } ] }, { "Value": "1000.00", "Attributes": [ { "Value": "3f50db14-1fe6-450b-bfe8-b2d894f18c62", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "3f50db14-1fe6-450b-bfe8-b2d894f18c62", "Id": "account" } ] }, { "Value": "1000.00", "Attributes": [ { "Value": "3f50db14-1fe6-450b-bfe8-b2d894f18c62", "Id": "account" } ] } ] } ] }, { "RowType": "Section", "Title": "Expenses", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Foobar14043 (123)", "Attributes": [ { "Value": "d1602f69-f900-4616-8d34-90af393fa368", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "d1602f69-f900-4616-8d34-90af393fa368", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "d1602f69-f900-4616-8d34-90af393fa368", "Id": "account" } ] }, { "Value": "40.00", "Attributes": [ { "Value": "d1602f69-f900-4616-8d34-90af393fa368", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "d1602f69-f900-4616-8d34-90af393fa368", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "MyExp51937 (1231239)", "Attributes": [ { "Value": "90f10e0a-a043-46fe-b87e-630e9a951dae", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "90f10e0a-a043-46fe-b87e-630e9a951dae", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "90f10e0a-a043-46fe-b87e-630e9a951dae", "Id": "account" } ] }, { "Value": "80.00", "Attributes": [ { "Value": "90f10e0a-a043-46fe-b87e-630e9a951dae", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "90f10e0a-a043-46fe-b87e-630e9a951dae", "Id": "account" } ] } ] } ] }, { "RowType": "Section", "Title": "Assets", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Accounts Receivable (120)", "Attributes": [ { "Value": "31ae5bb4-611c-4f89-a369-86e4d56e90b6", "Id": "account" } ] }, { "Value": "1190.00", "Attributes": [ { "Value": "31ae5bb4-611c-4f89-a369-86e4d56e90b6", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "31ae5bb4-611c-4f89-a369-86e4d56e90b6", "Id": "account" } ] }, { "Value": "36555.04", "Attributes": [ { "Value": "31ae5bb4-611c-4f89-a369-86e4d56e90b6", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "31ae5bb4-611c-4f89-a369-86e4d56e90b6", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Business Wells Fargo (088)", "Attributes": [ { "Value": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Id": "account" } ] }, { "Value": "7639.04", "Attributes": [ { "Value": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Generic Cash Clearing (8003)", "Attributes": [ { "Value": "f4be973a-25fc-48d0-a7df-7f719f239729", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "f4be973a-25fc-48d0-a7df-7f719f239729", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "f4be973a-25fc-48d0-a7df-7f719f239729", "Id": "account" } ] }, { "Value": "1443.00", "Attributes": [ { "Value": "f4be973a-25fc-48d0-a7df-7f719f239729", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "f4be973a-25fc-48d0-a7df-7f719f239729", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Generic Credit Card Clearing (8002)", "Attributes": [ { "Value": "a10867ac-0bc4-4aa5-af00-b9e5b207c6c3", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "a10867ac-0bc4-4aa5-af00-b9e5b207c6c3", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "a10867ac-0bc4-4aa5-af00-b9e5b207c6c3", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "a10867ac-0bc4-4aa5-af00-b9e5b207c6c3", "Id": "account" } ] }, { "Value": "96.49", "Attributes": [ { "Value": "a10867ac-0bc4-4aa5-af00-b9e5b207c6c3", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Generic Inventory (1400)", "Attributes": [ { "Value": "7422f1b6-619f-488c-89e1-91bdde20216c", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "7422f1b6-619f-488c-89e1-91bdde20216c", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "7422f1b6-619f-488c-89e1-91bdde20216c", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "7422f1b6-619f-488c-89e1-91bdde20216c", "Id": "account" } ] }, { "Value": "160.00", "Attributes": [ { "Value": "7422f1b6-619f-488c-89e1-91bdde20216c", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "My Savings (090)", "Attributes": [ { "Value": "7e5e243b-9fcd-4aef-8e3a-c70be1e39bfa", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "7e5e243b-9fcd-4aef-8e3a-c70be1e39bfa", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "7e5e243b-9fcd-4aef-8e3a-c70be1e39bfa", "Id": "account" } ] }, { "Value": "219.92", "Attributes": [ { "Value": "7e5e243b-9fcd-4aef-8e3a-c70be1e39bfa", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "7e5e243b-9fcd-4aef-8e3a-c70be1e39bfa", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Payment Wall Clearing Account (8001)", "Attributes": [ { "Value": "bc06840c-12c5-4e22-bb57-fef4d64bac10", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "bc06840c-12c5-4e22-bb57-fef4d64bac10", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "bc06840c-12c5-4e22-bb57-fef4d64bac10", "Id": "account" } ] }, { "Value": "1.00", "Attributes": [ { "Value": "bc06840c-12c5-4e22-bb57-fef4d64bac10", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "bc06840c-12c5-4e22-bb57-fef4d64bac10", "Id": "account" } ] } ] } ] }, { "RowType": "Section", "Title": "Liabilities", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Accounts Payable (200)", "Attributes": [ { "Value": "e9132ee7-4dcf-4fad-b76c-86e212af645a", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "e9132ee7-4dcf-4fad-b76c-86e212af645a", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "e9132ee7-4dcf-4fad-b76c-86e212af645a", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "e9132ee7-4dcf-4fad-b76c-86e212af645a", "Id": "account" } ] }, { "Value": "9223.00", "Attributes": [ { "Value": "e9132ee7-4dcf-4fad-b76c-86e212af645a", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Deferred Revenue (2300)", "Attributes": [ { "Value": "f22cd74e-f59d-4f38-a08d-07e14df28c24", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "f22cd74e-f59d-4f38-a08d-07e14df28c24", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "f22cd74e-f59d-4f38-a08d-07e14df28c24", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "f22cd74e-f59d-4f38-a08d-07e14df28c24", "Id": "account" } ] }, { "Value": "1854.24", "Attributes": [ { "Value": "f22cd74e-f59d-4f38-a08d-07e14df28c24", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Rounding (260)", "Attributes": [ { "Value": "f0072999-8f7c-4b01-bce9-bd9352f98e02", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "f0072999-8f7c-4b01-bce9-bd9352f98e02", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "f0072999-8f7c-4b01-bce9-bd9352f98e02", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "f0072999-8f7c-4b01-bce9-bd9352f98e02", "Id": "account" } ] }, { "Value": "0.01", "Attributes": [ { "Value": "f0072999-8f7c-4b01-bce9-bd9352f98e02", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Sales Tax (220)", "Attributes": [ { "Value": "af0be362-45fe-4730-a8af-634c2fb93f4d", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "af0be362-45fe-4730-a8af-634c2fb93f4d", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "af0be362-45fe-4730-a8af-634c2fb93f4d", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "af0be362-45fe-4730-a8af-634c2fb93f4d", "Id": "account" } ] }, { "Value": "1578.35", "Attributes": [ { "Value": "af0be362-45fe-4730-a8af-634c2fb93f4d", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Suspense (250)", "Attributes": [ { "Value": "5ec2f302-cd60-4f8b-a915-9229dd45e6fa", "Id": "account" } ] }, { "Value": "10.00", "Attributes": [ { "Value": "5ec2f302-cd60-4f8b-a915-9229dd45e6fa", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "5ec2f302-cd60-4f8b-a915-9229dd45e6fa", "Id": "account" } ] }, { "Value": "41.00", "Attributes": [ { "Value": "5ec2f302-cd60-4f8b-a915-9229dd45e6fa", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "5ec2f302-cd60-4f8b-a915-9229dd45e6fa", "Id": "account" } ] } ] }, { "RowType": "Row", "Cells": [ { "Value": "Unpaid Expense Claims (210)", "Attributes": [ { "Value": "38e6967d-4da1-4a93-85f1-ea3c93b61041", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "38e6967d-4da1-4a93-85f1-ea3c93b61041", "Id": "account" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "38e6967d-4da1-4a93-85f1-ea3c93b61041", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "38e6967d-4da1-4a93-85f1-ea3c93b61041", "Id": "account" } ] }, { "Value": "135.00", "Attributes": [ { "Value": "38e6967d-4da1-4a93-85f1-ea3c93b61041", "Id": "account" } ] } ] } ] }, { "RowType": "Section", "Title": "Equity", "Rows": [ { "RowType": "Row", "Cells": [ { "Value": "Retained Earnings (320)", "Attributes": [ { "Value": "6ef53919-b47d-4341-b11a-735a3f8a6515", "Id": "account" } ] }, { "Value": "", "Attributes": [ { "Value": "6ef53919-b47d-4341-b11a-735a3f8a6515", "Id": "account" }, { "Value": "", "Id": "fromDate" }, { "Value": "12/31/2018", "Id": "toDate" } ] }, { "Value": "0.00", "Attributes": [ { "Value": "6ef53919-b47d-4341-b11a-735a3f8a6515", "Id": "account" }, { "Value": "", "Id": "fromDate" }, { "Value": "12/31/2018", "Id": "toDate" } ] }, { "Value": "", "Attributes": [ { "Value": "6ef53919-b47d-4341-b11a-735a3f8a6515", "Id": "account" }, { "Value": "", "Id": "fromDate" }, { "Value": "12/31/2018", "Id": "toDate" } ] }, { "Value": "30871.69", "Attributes": [ { "Value": "6ef53919-b47d-4341-b11a-735a3f8a6515", "Id": "account" }, { "Value": "", "Id": "fromDate" }, { "Value": "12/31/2018", "Id": "toDate" } ] } ] } ] }, { "RowType": "Section", "Title": "", "Rows": [ { "RowType": "SummaryRow", "Cells": [ { "Value": "Total" }, { "Value": "1200.00" }, { "Value": "1200.00" }, { "Value": "46019.00" }, { "Value": "46019.00" } ] } ] } ] } ] }',
              },
            },
          },
        },
      },
    },
  },
  components: {
    requestBodies: {
      historyRecords: {
        required: true,
        description:
          "HistoryRecords containing an array of HistoryRecord objects in body of request",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/HistoryRecords",
            },
            example:
              '{   "HistoryRecords": [   {   "Details": "Hello World" } ] }',
          },
        },
      },
    },
    parameters: {
      requiredHeader: {
        in: "header",
        name: "xero-tenant-id",
        "x-snake": "xero_tenant_id",
        description: "Xero identifier for Tenant",
        example: "YOUR_XERO_TENANT_ID",
        schema: {
          type: "string",
        },
        required: true,
      },
      summarizeErrors: {
        in: "query",
        name: "summarizeErrors",
        "x-snake": "summarize_errors",
        description:
          "If false return 200 OK and mix of successfully created objects and any with validation errors",
        example: true,
        "x-example-python": "True",
        schema: {
          type: "boolean",
          default: false,
        },
      },
      unitdp: {
        in: "query",
        name: "unitdp",
        description:
          "e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts",
        example: 4,
        schema: {
          type: "integer",
        },
      },
      ifModifiedSince: {
        in: "header",
        name: "If-Modified-Since",
        "x-snake": "if_modified_since",
        description:
          "Only records created or modified since this timestamp will be returned",
        example: "2020-02-06T12:17:43.202-08:00",
        schema: {
          type: "string",
          format: "date-time",
        },
      },
      idempotencyKey: {
        in: "header",
        name: "Idempotency-Key",
        "x-snake": "idempotency_key",
        description:
          "This allows you to safely retry requests without the risk of duplicate processing. 128 character max.",
        example: "KEY_VALUE",
        schema: {
          type: "string",
        },
      },
      includeOnline: {
        in: "query",
        name: "IncludeOnline",
        "x-snake": "include_online",
        description:
          "Allows an attachment to be seen by the end customer within their online invoice",
        example: true,
        "x-example-python": "True",
        schema: {
          type: "boolean",
          default: false,
        },
      },
      summaryOnly: {
        in: "query",
        name: "summaryOnly",
        "x-snake": "summary_only",
        description:
          "Use summaryOnly=true in GET Contacts and Invoices endpoint to retrieve a smaller version of the response object. This returns only lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient.",
        example: true,
        "x-example-python": "True",
        schema: {
          type: "boolean",
          default: false,
        },
      },
      searchTerm: {
        in: "query",
        name: "searchTerm",
        "x-snake": "search_term",
        description:
          "Search parameter that performs a case-insensitive text search across the fields e.g. InvoiceNumber, Reference.",
        example: "SearchTerm=REF12",
        "x-example-python": "True",
        schema: {
          type: "string",
        },
      },
      FromDate: {
        in: "query",
        name: "fromDate",
        "x-snake": "from_date",
        description: "filter by the from date of the report e.g. 2021-02-01",
        example: "2019-10-31",
        schema: {
          type: "string",
          format: "date",
        },
      },
      ToDate: {
        in: "query",
        name: "toDate",
        "x-snake": "to_date",
        description: "filter by the to date of the report e.g. 2021-02-28",
        example: "2019-10-31",
        schema: {
          type: "string",
          format: "date",
        },
      },
      pageSize: {
        in: "query",
        name: "pageSize",
        description: "Number of records to retrieve per page",
        example: 100,
        schema: {
          type: "integer",
        },
      },
      AccountID: {
        required: true,
        in: "path",
        name: "AccountID",
        "x-snake": "account_id",
        description: "Unique identifier for Account object",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      AllocationID: {
        required: true,
        in: "path",
        name: "AllocationID",
        "x-snake": "allocation_id",
        description: "Unique identifier for Allocation object",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      AttachmentID: {
        required: true,
        in: "path",
        name: "AttachmentID",
        "x-snake": "attachment_id",
        description: "Unique identifier for Attachment object",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      ContentType: {
        required: true,
        in: "header",
        name: "contentType",
        "x-snake": "content_type",
        description:
          "The mime type of the attachment file you are retrieving i.e image/jpg, application/pdf",
        example: "image/jpg",
        schema: {
          type: "string",
        },
      },
      FileName: {
        required: true,
        in: "path",
        name: "FileName",
        "x-snake": "file_name",
        description: "Name of the attachment",
        example: "xero-dev.jpg",
        schema: {
          type: "string",
        },
      },
      BatchPaymentID: {
        required: true,
        in: "path",
        name: "BatchPaymentID",
        "x-snake": "batch_payment_id",
        description: "Unique identifier for BatchPayment",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      BankTransactionID: {
        required: true,
        in: "path",
        name: "BankTransactionID",
        "x-snake": "bank_transaction_id",
        description: "Xero generated unique identifier for a bank transaction",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      BankTransferID: {
        required: true,
        in: "path",
        name: "BankTransferID",
        "x-snake": "bank_transfer_id",
        description: "Xero generated unique identifier for a bank transfer",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      BrandingThemeID: {
        required: true,
        in: "path",
        name: "BrandingThemeID",
        "x-snake": "branding_theme_id",
        description: "Unique identifier for a Branding Theme",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      BudgetID: {
        required: true,
        in: "path",
        name: "BudgetID",
        "x-snake": "budget_id",
        description: "Unique identifier for Budgets",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      ContactID: {
        required: true,
        in: "path",
        name: "ContactID",
        "x-snake": "contact_id",
        description: "Unique identifier for a Contact",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      ContactGroupID: {
        required: true,
        in: "path",
        name: "ContactGroupID",
        "x-snake": "contact_group_id",
        description: "Unique identifier for a Contact Group",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      CreditNoteID: {
        required: true,
        in: "path",
        name: "CreditNoteID",
        "x-snake": "credit_note_id",
        description: "Unique identifier for a Credit Note",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      EmployeeID: {
        required: true,
        in: "path",
        name: "EmployeeID",
        "x-snake": "employee_id",
        description: "Unique identifier for a Employee",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      ExpenseClaimID: {
        required: true,
        in: "path",
        name: "ExpenseClaimID",
        "x-snake": "expense_claim_id",
        description: "Unique identifier for a ExpenseClaim",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      InvoiceID: {
        required: true,
        in: "path",
        name: "InvoiceID",
        "x-snake": "invoice_id",
        description: "Unique identifier for an Invoice",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      ItemID: {
        required: true,
        in: "path",
        name: "ItemID",
        "x-snake": "item_id",
        description: "Unique identifier for an Item",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      JournalID: {
        required: true,
        in: "path",
        name: "JournalID",
        "x-snake": "journal_id",
        description: "Unique identifier for a Journal",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      JournalNumber: {
        required: true,
        in: "path",
        name: "JournalNumber",
        "x-snake": "journal_number",
        description: "Number of a Journal",
        example: 1000,
        schema: {
          type: "integer",
        },
      },
      LinkedTransactionID: {
        required: true,
        in: "path",
        name: "LinkedTransactionID",
        "x-snake": "linked_transaction_id",
        description: "Unique identifier for a LinkedTransaction",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      ManualJournalID: {
        required: true,
        in: "path",
        name: "ManualJournalID",
        "x-snake": "manual_journal_id",
        description: "Unique identifier for a ManualJournal",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      OrganisationID: {
        required: true,
        in: "path",
        name: "OrganisationID",
        "x-snake": "organisation_id",
        description: "The unique Xero identifier for an organisation",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      OverpaymentID: {
        required: true,
        in: "path",
        name: "OverpaymentID",
        "x-snake": "overpayment_id",
        description: "Unique identifier for a Overpayment",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      PaymentID: {
        required: true,
        in: "path",
        name: "PaymentID",
        "x-snake": "payment_id",
        description: "Unique identifier for a Payment",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      PrepaymentID: {
        required: true,
        in: "path",
        name: "PrepaymentID",
        "x-snake": "prepayment_id",
        description: "Unique identifier for a PrePayment",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      PurchaseOrderID: {
        required: true,
        in: "path",
        name: "PurchaseOrderID",
        "x-snake": "purchase_order_id",
        description: "Unique identifier for an Purchase Order",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      QuoteID: {
        required: true,
        in: "path",
        name: "QuoteID",
        "x-snake": "quote_id",
        description: "Unique identifier for an Quote",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      ReceiptID: {
        required: true,
        in: "path",
        name: "ReceiptID",
        "x-snake": "receipt_id",
        description: "Unique identifier for a Receipt",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      RepeatingInvoiceID: {
        required: true,
        in: "path",
        name: "RepeatingInvoiceID",
        "x-snake": "repeating_invoice_id",
        description: "Unique identifier for a Repeating Invoice",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      TrackingCategoryID: {
        required: true,
        in: "path",
        name: "TrackingCategoryID",
        "x-snake": "tracking_category_id",
        description: "Unique identifier for a TrackingCategory",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      TrackingOptionID: {
        required: true,
        in: "path",
        name: "TrackingOptionID",
        "x-snake": "tracking_option_id",
        description: "Unique identifier for a Tracking Option",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      UserID: {
        required: true,
        in: "path",
        name: "UserID",
        "x-snake": "user_id",
        description: "Unique identifier for a User",
        example: "00000000-0000-0000-0000-000000000000",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
      TaxType: {
        required: true,
        in: "path",
        name: "TaxType",
        description: "A valid TaxType code",
        example: "INPUT2",
        schema: {
          type: "string",
        },
      },
    },
    responses: {
      "400Error": {
        description: "A failed request due to validation error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      HistoryRecordCreated: {
        description:
          "Success - return response of type HistoryRecords array of HistoryRecord objects",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/HistoryRecords",
            },
            example:
              '{ "Id": "d7525479-3392-44c0-bb37-ff4a0b5df5bd", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1550899400362)\\/", "HistoryRecords": [ { "DateUTCString": "2019-02-23T05:23:20", "DateUTC": "\\/Date(1550899400362)\\/", "Details": "Hello World", "ValidationErrors": [] } ] }',
          },
        },
      },
      HistoryRetrieved: {
        description:
          "Success - return response of HistoryRecords array of 0 to N HistoryRecord",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/HistoryRecords",
            },
            example:
              '{ "Id": "cd54cc7b-b721-4207-b11d-7d13c7902f91", "Status": "OK", "ProviderName": "Xero API Partner", "DateTimeUTC": "\\/Date(1551311321819)\\/", "HistoryRecords": [ { "Changes": "Attached a file", "DateUTCString": "2018-11-08T15:01:21", "DateUTC": "\\/Date(1541689281470+0000)\\/", "User": "System Generated", "Details": "Attached the file sample2.jpg through the Xero API using Xero API Partner" }, { "Changes": "Credit Applied", "DateUTCString": "2016-10-17T20:46:01", "DateUTC": "\\/Date(1476737161173+0000)\\/", "User": "System Generated", "Details": "Bank transfer from Business Wells Fargo to My Savings on November 12, 2016 for 20.00." } ] }',
          },
        },
      },
    },
    schemas: {
      AddressForOrganisation: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/types",
        },
        properties: {
          AddressType: {
            description: "define the type of address",
            type: "string",
            enum: ["POBOX", "STREET", "DELIVERY"],
          },
          AddressLine1: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          AddressLine2: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          AddressLine3: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          AddressLine4: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          City: {
            description: "max length = 255",
            maxLength: 255,
            type: "string",
          },
          Region: {
            description: "max length = 255",
            maxLength: 255,
            type: "string",
          },
          PostalCode: {
            description: "max length = 50",
            maxLength: 50,
            type: "string",
          },
          Country: {
            description: "max length = 50, [A-Z], [a-z] only",
            maxLength: 50,
            type: "string",
          },
          AttentionTo: {
            description: "max length = 255",
            maxLength: 255,
            type: "string",
          },
        },
        type: "object",
      },
      Address: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/types",
        },
        properties: {
          AddressType: {
            description: "define the type of address",
            type: "string",
            enum: ["POBOX", "STREET"],
          },
          AddressLine1: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          AddressLine2: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          AddressLine3: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          AddressLine4: {
            description: "max length = 500",
            maxLength: 500,
            type: "string",
          },
          City: {
            description: "max length = 255",
            maxLength: 255,
            type: "string",
          },
          Region: {
            description: "max length = 255",
            maxLength: 255,
            type: "string",
          },
          PostalCode: {
            description: "max length = 50",
            maxLength: 50,
            type: "string",
          },
          Country: {
            description: "max length = 50, [A-Z], [a-z] only",
            maxLength: 50,
            type: "string",
          },
          AttentionTo: {
            description: "max length = 255",
            maxLength: 255,
            type: "string",
          },
        },
        type: "object",
      },
      Phone: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/types",
        },
        properties: {
          PhoneType: {
            type: "string",
            enum: ["DEFAULT", "DDI", "MOBILE", "FAX", "OFFICE"],
          },
          PhoneNumber: {
            description: "max length = 50",
            maxLength: 50,
            type: "string",
          },
          PhoneAreaCode: {
            description: "max length = 10",
            maxLength: 10,
            type: "string",
          },
          PhoneCountryCode: {
            description: "max length = 20",
            maxLength: 20,
            type: "string",
          },
        },
        type: "object",
      },
      Accounts: {
        type: "object",
        "x-objectArrayKey": "accounts",
        properties: {
          Accounts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Account",
            },
          },
        },
      },
      Account: {
        type: "object",
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/accounts/",
        },
        properties: {
          Code: {
            description:
              "Customer defined alpha numeric account code e.g 200 or SALES (max length = 10)",
            type: "string",
            example: 4400,
          },
          Name: {
            description: "Name of account (max length = 150)",
            maxLength: 150,
            type: "string",
            example: "Food Sales",
          },
          AccountID: {
            description:
              "The Xero identifier for an account – specified as a string following  the endpoint name   e.g. /297c2dc5-cc47-4afd-8ec8-74990b8761e9",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          Type: {
            $ref: "#/components/schemas/AccountType",
            type: "string",
          },
          BankAccountNumber: {
            description: "For bank accounts only (Account Type BANK)",
            type: "string",
          },
          Status: {
            description:
              "Accounts with a status of ACTIVE can be updated to ARCHIVED. See Account Status Codes",
            type: "string",
            enum: ["ACTIVE", "ARCHIVED", "DELETED"],
          },
          Description: {
            description:
              "Description of the Account. Valid for all types of accounts except bank accounts (max length = 4000)",
            type: "string",
          },
          BankAccountType: {
            description: "For bank accounts only. See Bank Account types",
            type: "string",
            enum: ["BANK", "CREDITCARD", "PAYPAL", "NONE", ""],
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          TaxType: {
            description: "The tax type from taxRates",
            type: "string",
          },
          EnablePaymentsToAccount: {
            description:
              "Boolean – describes whether account can have payments applied to it",
            type: "boolean",
          },
          ShowInExpenseClaims: {
            description:
              "Boolean – describes whether account code is available for use with expense claims",
            type: "boolean",
          },
          Class: {
            description: "See Account Class Types",
            readOnly: true,
            type: "string",
            enum: ["ASSET", "EQUITY", "EXPENSE", "LIABILITY", "REVENUE"],
          },
          SystemAccount: {
            description:
              "If this is a system account then this element is returned. See System Account types. Note that non-system accounts may have this element set as either “” or null.",
            readOnly: true,
            type: "string",
            enum: [
              "DEBTORS",
              "CREDITORS",
              "BANKCURRENCYGAIN",
              "GST",
              "GSTONIMPORTS",
              "HISTORICAL",
              "REALISEDCURRENCYGAIN",
              "RETAINEDEARNINGS",
              "ROUNDING",
              "TRACKINGTRANSFERS",
              "UNPAIDEXPCLM",
              "UNREALISEDCURRENCYGAIN",
              "WAGEPAYABLES",
              "CISASSETS",
              "CISASSET",
              "CISLABOUR",
              "CISLABOUREXPENSE",
              "CISLABOURINCOME",
              "CISLIABILITY",
              "CISMATERIALS",
              "",
            ],
          },
          ReportingCode: {
            description: "Shown if set",
            type: "string",
          },
          ReportingCodeName: {
            description: "Shown if set",
            readOnly: true,
            type: "string",
          },
          HasAttachments: {
            description:
              "boolean to indicate if an account has an attachment (read only)",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          AddToWatchlist: {
            description:
              "Boolean – describes whether the account is shown in the watchlist widget on the dashboard",
            type: "boolean",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
      },
      AccountType: {
        description: "See Account Types",
        type: "string",
        enum: [
          "BANK",
          "CURRENT",
          "CURRLIAB",
          "DEPRECIATN",
          "DIRECTCOSTS",
          "EQUITY",
          "EXPENSE",
          "FIXED",
          "INVENTORY",
          "LIABILITY",
          "NONCURRENT",
          "OTHERINCOME",
          "OVERHEADS",
          "PREPAYMENT",
          "REVENUE",
          "SALES",
          "TERMLIAB",
          "PAYG",
        ],
      },
      Attachments: {
        type: "object",
        "x-objectArrayKey": "attachments",
        properties: {
          Attachments: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
        },
      },
      Attachment: {
        type: "object",
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/attachments/",
        },
        properties: {
          AttachmentID: {
            description: "Unique ID for the file",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          FileName: {
            description: "Name of the file",
            type: "string",
            example: "xero-dev.jpg",
          },
          Url: {
            description: "URL to the file on xero.com",
            type: "string",
            example:
              "https://api.xero.com/api.xro/2.0/Accounts/da962997-a8bd-4dff-9616-01cdc199283f/Attachments/sample5.jpg",
          },
          MimeType: {
            description: "Type of file",
            type: "string",
            example: "image/jpg",
          },
          ContentLength: {
            description: "Length of the file content",
            type: "integer",
          },
          IncludeOnline: {
            description: "Include the file with the online invoice",
            type: "boolean",
          },
        },
      },
      BankTransactions: {
        type: "object",
        "x-objectArrayKey": "bank_transactions",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          BankTransactions: {
            type: "array",
            items: {
              $ref: "#/components/schemas/BankTransaction",
            },
          },
        },
      },
      BankTransaction: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/banktransactions/",
        },
        properties: {
          Type: {
            description: "See Bank Transaction Types",
            type: "string",
            enum: [
              "RECEIVE",
              "RECEIVE-OVERPAYMENT",
              "RECEIVE-PREPAYMENT",
              "SPEND",
              "SPEND-OVERPAYMENT",
              "SPEND-PREPAYMENT",
              "RECEIVE-TRANSFER",
              "SPEND-TRANSFER",
            ],
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          LineItems: {
            description: "See LineItems",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          BankAccount: {
            $ref: "#/components/schemas/Account",
          },
          IsReconciled: {
            description: "Boolean to show if transaction is reconciled",
            type: "boolean",
          },
          Date: {
            description: "Date of transaction – YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          Reference: {
            description:
              "Reference for the transaction. Only supported for SPEND and RECEIVE transactions.",
            type: "string",
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          CurrencyRate: {
            description:
              "Exchange rate to base currency when money is spent or received. e.g.0.7500 Only used for bank transactions in non base currency. If this isn’t specified for non base currency accounts then either the user-defined rate (preference) or the XE.com day rate will be used. Setting currency is only supported on overpayments.",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Url: {
            description:
              "URL link to a source document – shown as “Go to App Name”",
            type: "string",
          },
          Status: {
            description: "See Bank Transaction Status Codes",
            type: "string",
            enum: ["AUTHORISED", "DELETED", "VOIDED"],
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          SubTotal: {
            description: "Total of bank transaction excluding taxes",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "Total tax on bank transaction",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description: "Total of bank transaction tax inclusive",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          BankTransactionID: {
            description:
              "Xero generated unique identifier for bank transaction",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          PrepaymentID: {
            description:
              "Xero generated unique identifier for a Prepayment. This will be returned on BankTransactions with a Type of SPEND-PREPAYMENT or RECEIVE-PREPAYMENT",
            readOnly: true,
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          OverpaymentID: {
            description:
              "Xero generated unique identifier for an Overpayment. This will be returned on BankTransactions with a Type of SPEND-OVERPAYMENT or RECEIVE-OVERPAYMENT",
            readOnly: true,
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          HasAttachments: {
            description:
              "Boolean to indicate if a bank transaction has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        required: ["Type", "LineItems", "BankAccount"],
        type: "object",
      },
      LineAmountTypes: {
        description:
          "Line amounts are exclusive of tax by default if you don’t specify this element. See Line Amount Types",
        type: "string",
        enum: ["Exclusive", "Inclusive", "NoTax"],
      },
      LineItem: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/invoices#post",
        },
        properties: {
          LineItemID: {
            description: "LineItem unique ID",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          Description: {
            description:
              "Description needs to be at least 1 char long. A line item with just a description (i.e no unit amount or quantity) can be created by specifying just a <Description> element that contains at least 1 character",
            type: "string",
          },
          Quantity: {
            description: "LineItem Quantity",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          UnitAmount: {
            description: "LineItem Unit Amount",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          ItemCode: {
            description: "See Items",
            type: "string",
          },
          AccountCode: {
            description: "See Accounts",
            type: "string",
          },
          AccountID: {
            description: "The associated account ID related to this line item",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          TaxType: {
            description: "The tax type from TaxRates",
            type: "string",
          },
          TaxAmount: {
            description:
              "The tax amount is auto calculated as a percentage of the line amount (see below) based on the tax rate. This value can be overriden if the calculated <TaxAmount> is not correct.",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Item: {
            $ref: "#/components/schemas/LineItemItem",
          },
          LineAmount: {
            description:
              "If you wish to omit either the Quantity or UnitAmount you can provide a LineAmount and Xero will calculate the missing amount for you. The line amount reflects the discounted price if either a DiscountRate or DiscountAmount has been used i.e. LineAmount = Quantity * Unit Amount * ((100 - DiscountRate)/100) or LineAmount = (Quantity * UnitAmount) - DiscountAmount",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Tracking: {
            description:
              "Optional Tracking Category – see Tracking.  Any LineItem can have a  maximum of 2 <TrackingCategory> elements.",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItemTracking",
            },
          },
          DiscountRate: {
            description:
              "Percentage discount being applied to a line item (only supported on  ACCREC invoices – ACC PAY invoices and credit notes in Xero do not support discounts",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          DiscountAmount: {
            description:
              "Discount amount being applied to a line item. Only supported on ACCREC invoices and quotes. ACCPAY invoices and credit notes in Xero do not support discounts.",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          RepeatingInvoiceID: {
            description: "The Xero identifier for a Repeating Invoice",
            example: "00000000-0000-0000-0000-000000000000",
            type: "string",
            format: "uuid",
          },
          Taxability: {
            description: "The type of taxability",
            type: "string",
            enum: [
              "TAXABLE",
              "NON_TAXABLE",
              "EXEMPT",
              "PART_TAXABLE",
              "NOT_APPLICABLE",
            ],
          },
          SalesTaxCodeId: {
            description: "The ID of the sales tax code",
            type: "number",
          },
          TaxBreakdown: {
            description:
              "An array of tax components defined for this line item",
            type: "array",
            items: {
              $ref: "#/components/schemas/TaxBreakdownComponent",
            },
          },
        },
        type: "object",
      },
      LineItemItem: {
        properties: {
          Code: {
            description: "User defined item code (max length = 30)",
            maxLength: 30,
            type: "string",
          },
          Name: {
            description: "The name of the item (max length = 50)",
            maxLength: 50,
            type: "string",
          },
          ItemID: {
            description: "The Xero identifier for an Item",
            type: "string",
            format: "uuid",
          },
        },
      },
      LineItemTracking: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/invoices#post",
        },
        properties: {
          TrackingCategoryID: {
            description: "The Xero identifier for a tracking category",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          TrackingOptionID: {
            description: "The Xero identifier for a tracking category option",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          Name: {
            description: "The name of the tracking category",
            maxLength: 100,
            type: "string",
            example: "Region",
          },
          Option: {
            description: "See Tracking Options",
            type: "string",
            example: "North",
          },
        },
        type: "object",
      },
      BankTransfers: {
        type: "object",
        "x-objectArrayKey": "bank_transfers",
        properties: {
          BankTransfers: {
            type: "array",
            items: {
              $ref: "#/components/schemas/BankTransfer",
            },
          },
        },
      },
      BankTransfer: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/bank-transfers/",
        },
        properties: {
          FromBankAccount: {
            $ref: "#/components/schemas/Account",
          },
          ToBankAccount: {
            $ref: "#/components/schemas/Account",
          },
          Amount: {
            description: "amount of the transaction",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Date: {
            description: "The date of the Transfer YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          BankTransferID: {
            description: "The identifier of the Bank Transfer",
            readOnly: true,
            type: "string",
            format: "uuid",
          },
          CurrencyRate: {
            description: "The currency rate",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          FromBankTransactionID: {
            description: "The Bank Transaction ID for the source account",
            readOnly: true,
            type: "string",
            format: "uuid",
          },
          ToBankTransactionID: {
            description: "The Bank Transaction ID for the destination account",
            readOnly: true,
            type: "string",
            format: "uuid",
          },
          FromIsReconciled: {
            description:
              "The Bank Transaction boolean to show if it is reconciled for the source account",
            type: "boolean",
            default: "false",
            example: "false",
          },
          ToIsReconciled: {
            description:
              "The Bank Transaction boolean to show if it is reconciled for the destination account",
            type: "boolean",
            default: "false",
            example: "false",
          },
          Reference: {
            description: "Reference for the transactions.",
            type: "string",
          },
          HasAttachments: {
            description:
              "Boolean to indicate if a Bank Transfer has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          CreatedDateUTC: {
            description: "UTC timestamp of creation date of bank transfer",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        required: ["FromBankAccount", "ToBankAccount", "Amount"],
        type: "object",
      },
      BatchPayments: {
        type: "object",
        "x-objectArrayKey": "batch_payments",
        properties: {
          BatchPayments: {
            type: "array",
            items: {
              $ref: "#/components/schemas/BatchPayment",
            },
          },
        },
      },
      BatchPayment: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/BatchPayments/",
        },
        properties: {
          Account: {
            $ref: "#/components/schemas/Account",
          },
          Reference: {
            description:
              "(NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.",
            type: "string",
            maxLength: 255,
          },
          Particulars: {
            description:
              "(NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.",
            type: "string",
            maxLength: 12,
          },
          Code: {
            description:
              "(NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.",
            type: "string",
            maxLength: 12,
          },
          Details: {
            description:
              "(Non-NZ Only) These details are sent to the org’s bank as a reference for the batch payment transaction. They will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement imported into Xero. Maximum field length = 18",
            type: "string",
          },
          Narrative: {
            description:
              "(UK Only) Only shows on the statement line in Xero. Max length =18",
            type: "string",
            maxLength: 18,
          },
          BatchPaymentID: {
            description:
              "The Xero generated unique identifier for the bank transaction (read-only)",
            readOnly: true,
            type: "string",
            format: "uuid",
          },
          DateString: {
            description:
              "Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06",
            type: "string",
          },
          Date: {
            description:
              "Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06",
            type: "string",
            "x-is-msdate": true,
          },
          Amount: {
            description:
              "The amount of the payment. Must be less than or equal to the outstanding amount owing on the invoice e.g. 200.00",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Payments: {
            description: "An array of payments",
            type: "array",
            items: {
              $ref: "#/components/schemas/Payment",
            },
          },
          Type: {
            description:
              "PAYBATCH for bill payments or RECBATCH for sales invoice payments (read-only)",
            readOnly: true,
            type: "string",
            enum: ["PAYBATCH", "RECBATCH"],
          },
          Status: {
            description:
              "AUTHORISED or DELETED (read-only). New batch payments will have a status of AUTHORISED. It is not possible to delete batch payments via the API.",
            readOnly: true,
            type: "string",
            enum: ["AUTHORISED", "DELETED"],
          },
          TotalAmount: {
            description:
              "The total of the payments that make up the batch (read-only)",
            type: "number",
            format: "double",
            "x-is-money": true,
            readOnly: true,
          },
          UpdatedDateUTC: {
            description: "UTC timestamp of last update to the payment",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          IsReconciled: {
            description:
              "Booelan that tells you if the batch payment has been reconciled (read-only)",
            readOnly: true,
            type: "boolean",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        type: "object",
      },
      BatchPaymentDetails: {
        description:
          "Bank details for use on a batch payment stored with each contact",
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/Contact/",
        },
        properties: {
          BankAccountNumber: {
            description: "Bank account number for use with Batch Payments",
            type: "string",
            example: "123-456-1111111",
          },
          BankAccountName: {
            description: "Name of bank for use with Batch Payments",
            type: "string",
            example: "ACME Bank",
          },
          Details: {
            description:
              "(Non-NZ Only) These details are sent to the org’s bank as a reference for the batch payment transaction. They will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement imported into Xero. Maximum field length = 18",
            type: "string",
            example: "Hello World",
          },
          Code: {
            description:
              "(NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.",
            type: "string",
            maxLength: 12,
            example: "ABC",
          },
          Reference: {
            description:
              "(NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.",
            type: "string",
            maxLength: 12,
            example: "Foobar",
          },
        },
      },
      BatchPaymentDelete: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/accounting/batchpayments",
        },
        properties: {
          BatchPaymentID: {
            description:
              "The Xero generated unique identifier for the bank transaction (read-only)",
            type: "string",
            format: "uuid",
          },
          Status: {
            description: "The status of the batch payment.",
            type: "string",
            default: "DELETED",
          },
        },
        required: ["Status", "BatchPaymentID"],
        type: "object",
      },
      BatchPaymentDeleteByUrlParam: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/accounting/batchpayments",
        },
        properties: {
          Status: {
            description: "The status of the batch payment.",
            type: "string",
            default: "DELETED",
          },
        },
        required: ["Status"],
        type: "object",
      },
      BrandingThemes: {
        type: "object",
        "x-objectArrayKey": "branding_themes",
        properties: {
          BrandingThemes: {
            type: "array",
            items: {
              $ref: "#/components/schemas/BrandingTheme",
            },
          },
        },
      },
      BrandingTheme: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/branding-themes/",
        },
        properties: {
          BrandingThemeID: {
            description: "Xero identifier",
            type: "string",
            format: "uuid",
          },
          Name: {
            description: "Name of branding theme",
            type: "string",
          },
          LogoUrl: {
            description:
              "The location of the image file used as the logo on this branding theme",
            type: "string",
          },
          Type: {
            description: "Always INVOICE",
            type: "string",
            enum: ["INVOICE"],
          },
          SortOrder: {
            description:
              "Integer – ranked order of branding theme. The default branding theme has a value of 0",
            type: "integer",
          },
          CreatedDateUTC: {
            description: "UTC timestamp of creation date of branding theme",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
        },
        type: "object",
      },
      PaymentServices: {
        type: "object",
        "x-objectArrayKey": "payment_services",
        properties: {
          PaymentServices: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PaymentService",
            },
          },
        },
      },
      PaymentService: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/branding-themes/",
        },
        properties: {
          PaymentServiceID: {
            description: "Xero identifier",
            type: "string",
            format: "uuid",
          },
          PaymentServiceName: {
            description: "Name of payment service",
            type: "string",
          },
          PaymentServiceUrl: {
            description: "The custom payment URL",
            type: "string",
          },
          PayNowText: {
            description:
              "The text displayed on the Pay Now button in Xero Online Invoicing. If this is not set it will default to Pay by credit card",
            type: "string",
          },
          PaymentServiceType: {
            description:
              "This will always be CUSTOM for payment services created via the API.",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
      },
      Contacts: {
        type: "object",
        "x-objectArrayKey": "contacts",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Contacts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Contact",
            },
          },
        },
      },
      Contact: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/contacts/",
        },
        properties: {
          ContactID: {
            description: "Xero identifier",
            type: "string",
            format: "uuid",
          },
          MergedToContactID: {
            description:
              "ID for the destination of a merged contact. Only returned when using paging or when fetching a contact by ContactId or ContactNumber.",
            type: "string",
            format: "uuid",
          },
          ContactNumber: {
            description:
              "This can be updated via the API only i.e. This field is read only on the Xero contact screen, used to identify contacts in external systems (max length = 50). If the Contact Number is used, this is displayed as Contact Code in the Contacts UI in Xero.",
            maxLength: 50,
            type: "string",
          },
          AccountNumber: {
            description:
              "A user defined account number. This can be updated via the API and the Xero UI (max length = 50)",
            maxLength: 50,
            type: "string",
          },
          ContactStatus: {
            description:
              "Current status of a contact – see contact status types",
            type: "string",
            enum: ["ACTIVE", "ARCHIVED", "GDPRREQUEST"],
          },
          Name: {
            description: "Full name of contact/organisation (max length = 255)",
            maxLength: 255,
            type: "string",
          },
          FirstName: {
            description: "First name of contact person (max length = 255)",
            maxLength: 255,
            type: "string",
          },
          LastName: {
            description: "Last name of contact person (max length = 255)",
            maxLength: 255,
            type: "string",
          },
          CompanyNumber: {
            description: "Company registration number (max length = 50)",
            maxLength: 50,
            type: "string",
          },
          EmailAddress: {
            description:
              "Email address of contact person (umlauts not supported) (max length  = 255)",
            maxLength: 255,
            type: "string",
          },
          ContactPersons: {
            description: "See contact persons",
            type: "array",
            items: {
              $ref: "#/components/schemas/ContactPerson",
            },
          },
          BankAccountDetails: {
            description: "Bank account number of contact",
            type: "string",
          },
          TaxNumber: {
            description:
              "Tax number of contact – this is also known as the ABN (Australia), GST Number (New Zealand), VAT Number (UK) or Tax ID Number (US and global) in the Xero UI depending on which regionalized version of Xero you are using (max length = 50)",
            maxLength: 50,
            type: "string",
          },
          AccountsReceivableTaxType: {
            description: "The tax type from TaxRates",
            type: "string",
          },
          AccountsPayableTaxType: {
            description: "The tax type from TaxRates",
            type: "string",
          },
          Addresses: {
            description:
              "Store certain address types for a contact – see address types",
            type: "array",
            items: {
              $ref: "#/components/schemas/Address",
            },
          },
          Phones: {
            description:
              "Store certain phone types for a contact – see phone types",
            type: "array",
            items: {
              $ref: "#/components/schemas/Phone",
            },
          },
          IsSupplier: {
            description:
              "true or false – Boolean that describes if a contact that has any AP  invoices entered against them. Cannot be set via PUT or POST – it is automatically set when an accounts payable invoice is generated against this contact.",
            type: "boolean",
          },
          IsCustomer: {
            description:
              "true or false – Boolean that describes if a contact has any AR invoices entered against them. Cannot be set via PUT or POST – it is automatically set when an accounts receivable invoice is generated against this contact.",
            type: "boolean",
          },
          SalesDefaultLineAmountType: {
            description:
              "The default sales line amount type for a contact. Only available when summaryOnly parameter or paging is used, or when fetch by ContactId or ContactNumber.",
            type: "string",
            enum: ["INCLUSIVE", "EXCLUSIVE", "NONE"],
          },
          PurchasesDefaultLineAmountType: {
            description:
              "The default purchases line amount type for a contact Only available when summaryOnly parameter or paging is used, or when fetch by ContactId or ContactNumber.",
            type: "string",
            enum: ["INCLUSIVE", "EXCLUSIVE", "NONE"],
          },
          DefaultCurrency: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          XeroNetworkKey: {
            description: "Store XeroNetworkKey for contacts.",
            type: "string",
          },
          SalesDefaultAccountCode: {
            description: "The default sales account code for contacts",
            type: "string",
          },
          PurchasesDefaultAccountCode: {
            description: "The default purchases account code for contacts",
            type: "string",
          },
          SalesTrackingCategories: {
            description: "The default sales tracking categories for contacts",
            type: "array",
            items: {
              $ref: "#/components/schemas/SalesTrackingCategory",
            },
          },
          PurchasesTrackingCategories: {
            description:
              "The default purchases tracking categories for contacts",
            type: "array",
            items: {
              $ref: "#/components/schemas/SalesTrackingCategory",
            },
          },
          TrackingCategoryName: {
            description:
              "The name of the Tracking Category assigned to the contact under SalesTrackingCategories and PurchasesTrackingCategories",
            type: "string",
          },
          TrackingCategoryOption: {
            description:
              "The name of the Tracking Option assigned to the contact under SalesTrackingCategories and PurchasesTrackingCategories",
            type: "string",
          },
          PaymentTerms: {
            $ref: "#/components/schemas/PaymentTerm",
          },
          UpdatedDateUTC: {
            description: "UTC timestamp of last update to contact",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          ContactGroups: {
            description:
              "Displays which contact groups a contact is included in",
            type: "array",
            items: {
              $ref: "#/components/schemas/ContactGroup",
            },
          },
          Website: {
            description: "Website address for contact (read only)",
            readOnly: true,
            type: "string",
          },
          BrandingTheme: {
            $ref: "#/components/schemas/BrandingTheme",
          },
          BatchPayments: {
            $ref: "#/components/schemas/BatchPaymentDetails",
          },
          Discount: {
            description:
              "The default discount rate for the contact (read only)",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Balances: {
            $ref: "#/components/schemas/Balances",
          },
          Attachments: {
            description: "Displays array of attachments from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
          HasAttachments: {
            description: "A boolean to indicate if a contact has an attachment",
            type: "boolean",
            default: "false",
            example: "false",
          },
          ValidationErrors: {
            description: "Displays validation errors returned from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          HasValidationErrors: {
            description:
              "A boolean to indicate if a contact has an validation errors",
            type: "boolean",
            default: "false",
            example: "false",
          },
          StatusAttributeString: {
            description: "Status of object",
            type: "string",
          },
        },
        type: "object",
      },
      Budgets: {
        type: "object",
        "x-objectArrayKey": "budgets",
        properties: {
          Budgets: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Budget",
            },
          },
        },
      },
      Budget: {
        type: "object",
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/budgets/",
        },
        properties: {
          BudgetID: {
            description: "Xero identifier",
            type: "string",
            format: "uuid",
          },
          Type: {
            description: "Type of Budget. OVERALL or TRACKING",
            type: "string",
            enum: ["OVERALL", "TRACKING"],
          },
          Description: {
            description: "The Budget description",
            maxLength: 255,
            type: "string",
          },
          UpdatedDateUTC: {
            description: "UTC timestamp of last update to budget",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          BudgetLines: {
            type: "array",
            items: {
              $ref: "#/components/schemas/BudgetLine",
            },
          },
          Tracking: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TrackingCategory",
            },
          },
        },
      },
      BudgetLine: {
        type: "object",
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/budgets/",
        },
        properties: {
          AccountID: {
            description: "See Accounts",
            type: "string",
            format: "uuid",
          },
          AccountCode: {
            description: "See Accounts",
            type: "string",
            example: 90,
          },
          BudgetBalances: {
            type: "array",
            items: {
              $ref: "#/components/schemas/BudgetBalance",
            },
          },
        },
      },
      BudgetBalance: {
        type: "object",
        properties: {
          Period: {
            description: "Period the amount applies to (e.g. “2019-08”)",
            type: "string",
            "x-is-msdate": true,
          },
          Amount: {
            description: "LineItem Quantity",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          UnitAmount: {
            description: "Budgeted amount",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Notes: {
            description: "Any footnotes associated with this balance",
            maxLength: 255,
            type: "string",
          },
        },
      },
      Balances: {
        type: "object",
        description:
          "The raw AccountsReceivable(sales invoices) and AccountsPayable(bills) outstanding and overdue amounts, not converted to base currency (read only)",
        properties: {
          AccountsReceivable: {
            $ref: "#/components/schemas/AccountsReceivable",
          },
          AccountsPayable: {
            $ref: "#/components/schemas/AccountsPayable",
          },
        },
      },
      AccountsReceivable: {
        type: "object",
        properties: {
          Outstanding: {
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Overdue: {
            type: "number",
            format: "double",
            "x-is-money": true,
          },
        },
      },
      AccountsPayable: {
        type: "object",
        properties: {
          Outstanding: {
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Overdue: {
            type: "number",
            format: "double",
            "x-is-money": true,
          },
        },
      },
      CISSettings: {
        type: "object",
        "x-objectArrayKey": "cis_settings",
        properties: {
          CISSettings: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CISSetting",
            },
          },
        },
      },
      CISSetting: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/contacts/",
        },
        properties: {
          CISEnabled: {
            description:
              "Boolean that describes if the contact is a CIS Subcontractor",
            type: "boolean",
          },
          Rate: {
            description:
              "CIS Deduction rate for the contact if he is a subcontractor. If the contact is not CISEnabled, then the rate is not returned",
            type: "number",
            format: "double",
            readOnly: true,
            "x-is-money": true,
          },
        },
      },
      CISOrgSettings: {
        type: "object",
        "x-objectArrayKey": "cis_settings",
        properties: {
          CISSettings: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CISOrgSetting",
            },
          },
        },
      },
      CISOrgSetting: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/organisation",
        },
        properties: {
          CISContractorEnabled: {
            description:
              "true or false - Boolean that describes if the organisation is a CIS Contractor",
            type: "boolean",
          },
          CISSubContractorEnabled: {
            description:
              "true or false - Boolean that describes if the organisation is a CIS SubContractor",
            type: "boolean",
          },
          Rate: {
            description: "CIS Deduction rate for the organisation",
            type: "number",
            format: "double",
            readOnly: true,
            "x-is-money": true,
          },
        },
      },
      ContactPerson: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/contacts/",
        },
        properties: {
          FirstName: {
            description: "First name of person",
            type: "string",
          },
          LastName: {
            description: "Last name of person",
            type: "string",
          },
          EmailAddress: {
            description: "Email address of person",
            type: "string",
          },
          IncludeInEmails: {
            description:
              "boolean to indicate whether contact should be included on emails with invoices etc.",
            type: "boolean",
          },
        },
        type: "object",
      },
      ContactGroups: {
        type: "object",
        "x-objectArrayKey": "contact_groups",
        properties: {
          ContactGroups: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ContactGroup",
            },
          },
        },
      },
      ContactGroup: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/contactgroups/",
        },
        properties: {
          Name: {
            description:
              "The Name of the contact group. Required when creating a new contact  group",
            type: "string",
          },
          Status: {
            description:
              "The Status of a contact group. To delete a contact group update the status to DELETED. Only contact groups with a status of ACTIVE are returned on GETs.",
            type: "string",
            enum: ["ACTIVE", "DELETED"],
          },
          ContactGroupID: {
            description:
              "The Xero identifier for an contact group – specified as a string following the endpoint name. e.g. /297c2dc5-cc47-4afd-8ec8-74990b8761e9",
            type: "string",
            format: "uuid",
          },
          Contacts: {
            description:
              "The ContactID and Name of Contacts in a contact group. Returned on GETs when the ContactGroupID is supplied in the URL.",
            type: "array",
            items: {
              $ref: "#/components/schemas/Contact",
            },
          },
        },
        type: "object",
      },
      RequestEmpty: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/invoice/",
        },
        properties: {
          Status: {
            description:
              "Need at least one field to create an empty JSON payload",
            type: "string",
          },
        },
        type: "object",
      },
      CreditNotes: {
        type: "object",
        "x-objectArrayKey": "credit_notes",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          CreditNotes: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CreditNote",
            },
          },
        },
      },
      CreditNote: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/credit-notes/",
        },
        properties: {
          Type: {
            description: "See Credit Note Types",
            type: "string",
            enum: ["ACCPAYCREDIT", "ACCRECCREDIT"],
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          Date: {
            description:
              "The date the credit note is issued YYYY-MM-DD. If the Date element is not specified then it will default to the current date based on the timezone setting of the organisation",
            type: "string",
            "x-is-msdate": true,
          },
          DueDate: {
            description: "Date invoice is due – YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          Status: {
            description: "See Credit Note Status Codes",
            type: "string",
            enum: [
              "DRAFT",
              "SUBMITTED",
              "DELETED",
              "AUTHORISED",
              "PAID",
              "VOIDED",
            ],
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          LineItems: {
            description: "See Invoice Line Items",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          SubTotal: {
            description: "The subtotal of the credit note excluding taxes",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "The total tax on the credit note",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description: "The total of the Credit Note(subtotal + total tax)",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          CISDeduction: {
            description: "CIS deduction for UK contractors",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          CISRate: {
            description: "CIS Deduction rate for the organisation",
            type: "number",
            format: "double",
            readOnly: true,
            "x-is-money": true,
          },
          UpdatedDateUTC: {
            description: "UTC timestamp of last update to the credit note",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          CurrencyCode: {
            description: "The specified currency code",
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          FullyPaidOnDate: {
            description: "Date when credit note was fully paid(UTC format)",
            type: "string",
            "x-is-msdate": true,
          },
          CreditNoteID: {
            description: "Xero generated unique identifier",
            type: "string",
            format: "uuid",
          },
          CreditNoteNumber: {
            description:
              "ACCRECCREDIT – Unique alpha numeric code identifying credit note (when missing will auto-generate from your Organisation Invoice Settings)",
            type: "string",
          },
          Reference: {
            description: "ACCRECCREDIT only – additional reference number",
            type: "string",
          },
          SentToContact: {
            description:
              "Boolean to set whether the credit note in the Xero app should be marked as “sent”. This can be set only on credit notes that have been approved",
            readOnly: true,
            type: "boolean",
          },
          CurrencyRate: {
            description:
              "The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          RemainingCredit: {
            description: "The remaining credit balance on the Credit Note",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Allocations: {
            description: "See Allocations",
            type: "array",
            items: {
              $ref: "#/components/schemas/Allocation",
            },
          },
          AppliedAmount: {
            description: "The amount of applied to an invoice",
            type: "number",
            format: "double",
            example: 2,
            "x-is-money": true,
          },
          Payments: {
            description: "See Payments",
            type: "array",
            items: {
              $ref: "#/components/schemas/Payment",
            },
          },
          BrandingThemeID: {
            description: "See BrandingThemes",
            type: "string",
            format: "uuid",
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
          },
          HasAttachments: {
            description:
              "boolean to indicate if a credit note has an attachment",
            type: "boolean",
            default: "false",
            example: "false",
          },
          HasErrors: {
            description:
              "A boolean to indicate if a credit note has an validation errors",
            type: "boolean",
            default: "false",
            example: "false",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          InvoiceAddresses: {
            description:
              "An array of addresses used to auto calculate sales tax",
            type: "array",
            items: {
              $ref: "#/components/schemas/InvoiceAddress",
            },
          },
        },
        type: "object",
      },
      Allocations: {
        type: "object",
        "x-objectArrayKey": "allocations",
        properties: {
          Allocations: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Allocation",
            },
          },
        },
      },
      Allocation: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/prepayments/",
        },
        properties: {
          AllocationID: {
            description: "Xero generated unique identifier",
            type: "string",
            format: "uuid",
          },
          Invoice: {
            $ref: "#/components/schemas/Invoice",
          },
          Overpayment: {
            $ref: "#/components/schemas/Overpayment",
          },
          Prepayment: {
            $ref: "#/components/schemas/Prepayment",
          },
          CreditNote: {
            $ref: "#/components/schemas/CreditNote",
          },
          Amount: {
            description: "the amount being applied to the invoice",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Date: {
            description: "the date the allocation is applied YYYY-MM-DD.",
            type: "string",
            "x-is-msdate": true,
          },
          IsDeleted: {
            description:
              "A flag that returns true when the allocation is succesfully deleted",
            type: "boolean",
            readOnly: true,
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        required: ["Amount", "Invoice", "Date"],
        type: "object",
      },
      Currencies: {
        type: "object",
        "x-objectArrayKey": "currencies",
        properties: {
          Currencies: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Currency",
            },
          },
        },
      },
      Currency: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/currencies/",
        },
        properties: {
          Code: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          Description: {
            description: "Name of Currency",
            type: "string",
          },
        },
        type: "object",
      },
      CurrencyCode: {
        description:
          "3 letter alpha code for the currency – see list of currency codes",
        type: "string",
        "x-enum-varnames": [
          "AED",
          "AFN",
          "ALL",
          "AMD",
          "ANG",
          "AOA",
          "ARS",
          "AUD",
          "AWG",
          "AZN",
          "BAM",
          "BBD",
          "BDT",
          "BGN",
          "BHD",
          "BIF",
          "BMD",
          "BND",
          "BOB",
          "BRL",
          "BSD",
          "BTN",
          "BWP",
          "BYN",
          "BYR",
          "BZD",
          "CAD",
          "CDF",
          "CHF",
          "CLF",
          "CLP",
          "CNY",
          "COP",
          "CRC",
          "CUC",
          "CUP",
          "CVE",
          "CZK",
          "DJF",
          "DKK",
          "DOP",
          "DZD",
          "EEK",
          "EGP",
          "ERN",
          "ETB",
          "EUR",
          "FJD",
          "FKP",
          "GBP",
          "GEL",
          "GHS",
          "GIP",
          "GMD",
          "GNF",
          "GTQ",
          "GYD",
          "HKD",
          "HNL",
          "HRK",
          "HTG",
          "HUF",
          "IDR",
          "ILS",
          "INR",
          "IQD",
          "IRR",
          "ISK",
          "JMD",
          "JOD",
          "JPY",
          "KES",
          "KGS",
          "KHR",
          "KMF",
          "KPW",
          "KRW",
          "KWD",
          "KYD",
          "KZT",
          "LAK",
          "LBP",
          "LKR",
          "LRD",
          "LSL",
          "LTL",
          "LVL",
          "LYD",
          "MAD",
          "MDL",
          "MGA",
          "MKD",
          "MMK",
          "MNT",
          "MOP",
          "MRO",
          "MRU",
          "MUR",
          "MVR",
          "MWK",
          "MXN",
          "MXV",
          "MYR",
          "MZN",
          "NAD",
          "NGN",
          "NIO",
          "NOK",
          "NPR",
          "NZD",
          "OMR",
          "PAB",
          "PEN",
          "PGK",
          "PHP",
          "PKR",
          "PLN",
          "PYG",
          "QAR",
          "RON",
          "RSD",
          "RUB",
          "RWF",
          "SAR",
          "SBD",
          "SCR",
          "SDG",
          "SEK",
          "SGD",
          "SHP",
          "SKK",
          "SLE",
          "SLL",
          "SOS",
          "SRD",
          "STN",
          "STD",
          "SVC",
          "SYP",
          "SZL",
          "THB",
          "TJS",
          "TMT",
          "TND",
          "TOP",
          "TRY_LIRA",
          "TTD",
          "TWD",
          "TZS",
          "UAH",
          "UGX",
          "USD",
          "UYU",
          "UZS",
          "VEF",
          "VES",
          "VND",
          "VUV",
          "WST",
          "XAF",
          "XCD",
          "XOF",
          "XPF",
          "YER",
          "ZAR",
          "ZMW",
          "ZMK",
          "ZWD",
          "EMPTY_CURRENCY",
        ],
        enum: [
          "AED",
          "AFN",
          "ALL",
          "AMD",
          "ANG",
          "AOA",
          "ARS",
          "AUD",
          "AWG",
          "AZN",
          "BAM",
          "BBD",
          "BDT",
          "BGN",
          "BHD",
          "BIF",
          "BMD",
          "BND",
          "BOB",
          "BRL",
          "BSD",
          "BTN",
          "BWP",
          "BYN",
          "BYR",
          "BZD",
          "CAD",
          "CDF",
          "CHF",
          "CLF",
          "CLP",
          "CNY",
          "COP",
          "CRC",
          "CUC",
          "CUP",
          "CVE",
          "CZK",
          "DJF",
          "DKK",
          "DOP",
          "DZD",
          "EEK",
          "EGP",
          "ERN",
          "ETB",
          "EUR",
          "FJD",
          "FKP",
          "GBP",
          "GEL",
          "GHS",
          "GIP",
          "GMD",
          "GNF",
          "GTQ",
          "GYD",
          "HKD",
          "HNL",
          "HRK",
          "HTG",
          "HUF",
          "IDR",
          "ILS",
          "INR",
          "IQD",
          "IRR",
          "ISK",
          "JMD",
          "JOD",
          "JPY",
          "KES",
          "KGS",
          "KHR",
          "KMF",
          "KPW",
          "KRW",
          "KWD",
          "KYD",
          "KZT",
          "LAK",
          "LBP",
          "LKR",
          "LRD",
          "LSL",
          "LTL",
          "LVL",
          "LYD",
          "MAD",
          "MDL",
          "MGA",
          "MKD",
          "MMK",
          "MNT",
          "MOP",
          "MRO",
          "MRU",
          "MUR",
          "MVR",
          "MWK",
          "MXN",
          "MXV",
          "MYR",
          "MZN",
          "NAD",
          "NGN",
          "NIO",
          "NOK",
          "NPR",
          "NZD",
          "OMR",
          "PAB",
          "PEN",
          "PGK",
          "PHP",
          "PKR",
          "PLN",
          "PYG",
          "QAR",
          "RON",
          "RSD",
          "RUB",
          "RWF",
          "SAR",
          "SBD",
          "SCR",
          "SDG",
          "SEK",
          "SGD",
          "SHP",
          "SKK",
          "SLE",
          "SLL",
          "SOS",
          "SRD",
          "STD",
          "STN",
          "SVC",
          "SYP",
          "SZL",
          "THB",
          "TJS",
          "TMT",
          "TND",
          "TOP",
          "TRY",
          "TTD",
          "TWD",
          "TZS",
          "UAH",
          "UGX",
          "USD",
          "UYU",
          "UZS",
          "VEF",
          "VES",
          "VND",
          "VUV",
          "WST",
          "XAF",
          "XCD",
          "XOF",
          "XPF",
          "YER",
          "ZAR",
          "ZMW",
          "ZMK",
          "ZWD",
        ],
      },
      Employees: {
        type: "object",
        "x-objectArrayKey": "employees",
        properties: {
          Employees: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Employee",
            },
          },
        },
      },
      Employee: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/employees/",
        },
        properties: {
          EmployeeID: {
            description:
              "The Xero identifier for an employee e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9",
            type: "string",
            format: "uuid",
          },
          Status: {
            description:
              "Current status of an employee – see contact status types",
            type: "string",
            enum: ["ACTIVE", "ARCHIVED", "GDPRREQUEST", "DELETED"],
          },
          FirstName: {
            description: "First name of an employee (max length = 255)",
            maxLength: 255,
            type: "string",
          },
          LastName: {
            description: "Last name of an employee (max length = 255)",
            maxLength: 255,
            type: "string",
          },
          ExternalLink: {
            $ref: "#/components/schemas/ExternalLink",
          },
          UpdatedDateUTC: {
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
            example: "ERROR",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        type: "object",
      },
      ExpenseClaims: {
        type: "object",
        "x-objectArrayKey": "expense_claims",
        properties: {
          ExpenseClaims: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ExpenseClaim",
            },
          },
        },
      },
      ExpenseClaim: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/expense-claims/",
        },
        properties: {
          ExpenseClaimID: {
            description:
              "Xero generated unique identifier for an expense claim",
            type: "string",
            format: "uuid",
          },
          Status: {
            description:
              "Current status of an expense claim – see status types",
            type: "string",
            enum: ["SUBMITTED", "AUTHORISED", "PAID", "VOIDED", "DELETED"],
          },
          Payments: {
            description: "See Payments",
            type: "array",
            items: {
              $ref: "#/components/schemas/Payment",
            },
          },
          User: {
            $ref: "#/components/schemas/User",
          },
          Receipts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Receipt",
            },
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          Total: {
            description: "The total of an expense claim being paid",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          AmountDue: {
            description: "The amount due to be paid for an expense claim",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          AmountPaid: {
            description: "The amount still to pay for an expense claim",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          PaymentDueDate: {
            description:
              "The date when the expense claim is due to be paid YYYY-MM-DD",
            readOnly: true,
            type: "string",
            "x-is-msdate": true,
          },
          ReportingDate: {
            description:
              "The date the expense claim will be reported in Xero YYYY-MM-DD",
            readOnly: true,
            type: "string",
            "x-is-msdate": true,
          },
          ReceiptID: {
            description:
              "The Xero identifier for the Receipt e.g. e59a2c7f-1306-4078-a0f3-73537afcbba9",
            type: "string",
            format: "uuid",
          },
        },
        type: "object",
      },
      HistoryRecords: {
        type: "object",
        "x-objectArrayKey": "history_records",
        properties: {
          HistoryRecords: {
            type: "array",
            items: {
              $ref: "#/components/schemas/HistoryRecord",
            },
          },
        },
      },
      HistoryRecord: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/history-and-notes",
        },
        properties: {
          Details: {
            description: "details",
            type: "string",
          },
          Changes: {
            description: "Name of branding theme",
            type: "string",
          },
          User: {
            description: "has a value of 0",
            type: "string",
          },
          DateUTC: {
            description: "UTC timestamp of creation date of branding theme",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
        },
        type: "object",
      },
      Invoices: {
        type: "object",
        "x-objectArrayKey": "invoices",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Invoices: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Invoice",
            },
          },
        },
      },
      Invoice: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/invoices/",
        },
        properties: {
          Type: {
            description: "See Invoice Types",
            type: "string",
            enum: [
              "ACCPAY",
              "ACCPAYCREDIT",
              "APOVERPAYMENT",
              "APPREPAYMENT",
              "ACCREC",
              "ACCRECCREDIT",
              "AROVERPAYMENT",
              "ARPREPAYMENT",
            ],
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          LineItems: {
            description: "See LineItems",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          Date: {
            description:
              "Date invoice was issued – YYYY-MM-DD. If the Date element is not specified it will default to the current date based on the timezone setting of the organisation",
            type: "string",
            "x-is-msdate": true,
          },
          DueDate: {
            description: "Date invoice is due – YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          InvoiceNumber: {
            description:
              "ACCREC – Unique alpha numeric code identifying invoice (when missing will auto-generate from your Organisation Invoice Settings) (max length = 255)",
            maxLength: 255,
            type: "string",
          },
          Reference: {
            description: "ACCREC only – additional reference number",
            type: "string",
          },
          BrandingThemeID: {
            description: "See BrandingThemes",
            type: "string",
            format: "uuid",
          },
          Url: {
            description:
              "URL link to a source document – shown as “Go to [appName]” in the Xero app",
            type: "string",
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          CurrencyRate: {
            description:
              "The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used. (max length = [18].[6])",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Status: {
            description: "See Invoice Status Codes",
            type: "string",
            enum: [
              "DRAFT",
              "SUBMITTED",
              "DELETED",
              "AUTHORISED",
              "PAID",
              "VOIDED",
            ],
          },
          SentToContact: {
            description:
              "Boolean to set whether the invoice in the Xero app should be marked as “sent”. This can be set only on invoices that have been approved",
            type: "boolean",
          },
          ExpectedPaymentDate: {
            description:
              "Shown on sales invoices (Accounts Receivable) when this has been set",
            type: "string",
            "x-is-msdate": true,
          },
          PlannedPaymentDate: {
            description:
              "Shown on bills (Accounts Payable) when this has been set",
            type: "string",
            "x-is-msdate": true,
          },
          CISDeduction: {
            description: "CIS deduction for UK contractors",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          CISRate: {
            description: "CIS Deduction rate for the organisation",
            type: "number",
            format: "double",
            readOnly: true,
            "x-is-money": true,
          },
          SubTotal: {
            description: "Total of invoice excluding taxes",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "Total tax on invoice",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description:
              "Total of Invoice tax inclusive (i.e. SubTotal + TotalTax). This will be ignored if it doesn’t equal the sum of the LineAmounts",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalDiscount: {
            description: "Total of discounts applied on the invoice line items",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          InvoiceID: {
            description: "Xero generated unique identifier for invoice",
            type: "string",
            format: "uuid",
          },
          RepeatingInvoiceID: {
            description:
              "Xero generated unique identifier for repeating invoices",
            type: "string",
            format: "uuid",
          },
          HasAttachments: {
            description: "boolean to indicate if an invoice has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          IsDiscounted: {
            description: "boolean to indicate if an invoice has a discount",
            readOnly: true,
            type: "boolean",
          },
          Payments: {
            description: "See Payments",
            readOnly: true,
            type: "array",
            items: {
              $ref: "#/components/schemas/Payment",
            },
          },
          Prepayments: {
            description: "See Prepayments",
            readOnly: true,
            type: "array",
            items: {
              $ref: "#/components/schemas/Prepayment",
            },
          },
          Overpayments: {
            description: "See Overpayments",
            readOnly: true,
            type: "array",
            items: {
              $ref: "#/components/schemas/Overpayment",
            },
          },
          AmountDue: {
            description: "Amount remaining to be paid on invoice",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          AmountPaid: {
            description: "Sum of payments received for invoice",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          FullyPaidOnDate: {
            description:
              "The date the invoice was fully paid. Only returned on fully paid invoices",
            readOnly: true,
            type: "string",
            "x-is-msdate": true,
          },
          AmountCredited: {
            description:
              "Sum of all credit notes, over-payments and pre-payments applied to invoice",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          CreditNotes: {
            description:
              "Details of credit notes that have been applied to an invoice",
            readOnly: true,
            type: "array",
            items: {
              $ref: "#/components/schemas/CreditNote",
            },
          },
          Attachments: {
            description: "Displays array of attachments from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
          HasErrors: {
            description:
              "A boolean to indicate if a invoice has an validation errors",
            type: "boolean",
            default: "false",
            example: "false",
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          InvoiceAddresses: {
            description:
              "An array of addresses used to auto calculate sales tax",
            type: "array",
            items: {
              $ref: "#/components/schemas/InvoiceAddress",
            },
          },
        },
        type: "object",
      },
      OnlineInvoices: {
        type: "object",
        "x-objectArrayKey": "online_invoices",
        properties: {
          OnlineInvoices: {
            type: "array",
            items: {
              $ref: "#/components/schemas/OnlineInvoice",
            },
          },
        },
      },
      OnlineInvoice: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/invoices/",
        },
        properties: {
          OnlineInvoiceUrl: {
            description: "the URL to an online invoice",
            type: "string",
          },
        },
        type: "object",
      },
      InvoiceReminders: {
        type: "object",
        "x-objectArrayKey": "invoice_reminders",
        properties: {
          InvoiceReminders: {
            type: "array",
            items: {
              $ref: "#/components/schemas/InvoiceReminder",
            },
          },
        },
      },
      InvoiceReminder: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/invoice-reminders/",
        },
        properties: {
          Enabled: {
            description: "setting for on or off",
            type: "boolean",
          },
        },
        type: "object",
      },
      Items: {
        type: "object",
        "x-objectArrayKey": "items",
        properties: {
          Items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Item",
            },
          },
        },
      },
      Item: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/items/",
        },
        properties: {
          Code: {
            description: "User defined item code (max length = 30)",
            maxLength: 30,
            type: "string",
          },
          InventoryAssetAccountCode: {
            description:
              "The inventory asset account for the item. The account must be of type INVENTORY. The  COGSAccountCode in PurchaseDetails is also required to create a tracked item",
            type: "string",
          },
          Name: {
            description: "The name of the item (max length = 50)",
            maxLength: 50,
            type: "string",
          },
          IsSold: {
            description:
              "Boolean value, defaults to true. When IsSold is true the item will be available on sales transactions in the Xero UI. If IsSold is updated to false then Description and SalesDetails values will be nulled.",
            type: "boolean",
          },
          IsPurchased: {
            description:
              "Boolean value, defaults to true. When IsPurchased is true the item is available for purchase transactions in the Xero UI. If IsPurchased is updated to false then PurchaseDescription and PurchaseDetails values will be nulled.",
            type: "boolean",
          },
          Description: {
            description:
              "The sales description of the item (max length = 4000)",
            maxLength: 4000,
            type: "string",
          },
          PurchaseDescription: {
            description:
              "The purchase description of the item (max length = 4000)",
            maxLength: 4000,
            type: "string",
          },
          PurchaseDetails: {
            $ref: "#/components/schemas/Purchase",
          },
          SalesDetails: {
            $ref: "#/components/schemas/Purchase",
          },
          IsTrackedAsInventory: {
            description:
              "True for items that are tracked as inventory. An item will be tracked as inventory if the InventoryAssetAccountCode and COGSAccountCode are set.",
            type: "boolean",
          },
          TotalCostPool: {
            description:
              "The value of the item on hand. Calculated using average cost accounting.",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          QuantityOnHand: {
            description: "The quantity of the item on hand",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          UpdatedDateUTC: {
            description: "Last modified date in UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          ItemID: {
            description: "The Xero identifier for an Item",
            type: "string",
            format: "uuid",
          },
          StatusAttributeString: {
            description: "Status of object",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        required: ["Code"],
        type: "object",
      },
      Purchase: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/items/",
        },
        properties: {
          UnitPrice: {
            description:
              "Unit Price of the item. By default UnitPrice is rounded to two decimal places. You can use 4 decimal places by adding the unitdp=4 querystring parameter to your request.",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          AccountCode: {
            description:
              "Default account code to be used for purchased/sale. Not applicable to the purchase details of tracked items",
            type: "string",
          },
          COGSAccountCode: {
            description:
              "Cost of goods sold account. Only applicable to the purchase details of tracked items.",
            type: "string",
          },
          TaxType: {
            description: "The tax type from TaxRates",
            type: "string",
          },
        },
        type: "object",
      },
      Journals: {
        type: "object",
        "x-objectArrayKey": "journals",
        properties: {
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Journals: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Journal",
            },
          },
        },
      },
      Journal: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/journals/",
        },
        properties: {
          JournalID: {
            description: "Xero identifier",
            type: "string",
            format: "uuid",
          },
          JournalDate: {
            description: "Date the journal was posted",
            type: "string",
            "x-is-msdate": true,
          },
          JournalNumber: {
            description: "Xero generated journal number",
            type: "integer",
          },
          CreatedDateUTC: {
            description: "Created date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          Reference: {
            description:
              "reference field for additional indetifying information",
            type: "string",
          },
          SourceID: {
            description:
              "The identifier for the source transaction (e.g. InvoiceID)",
            type: "string",
            format: "uuid",
          },
          SourceType: {
            description:
              "The journal source type. The type of transaction that created the journal",
            type: "string",
            enum: [
              "ACCREC",
              "ACCPAY",
              "ACCRECCREDIT",
              "ACCPAYCREDIT",
              "ACCRECPAYMENT",
              "ACCPAYPAYMENT",
              "ARCREDITPAYMENT",
              "APCREDITPAYMENT",
              "CASHREC",
              "CASHPAID",
              "TRANSFER",
              "ARPREPAYMENT",
              "APPREPAYMENT",
              "AROVERPAYMENT",
              "APOVERPAYMENT",
              "EXPCLAIM",
              "EXPPAYMENT",
              "MANJOURNAL",
              "PAYSLIP",
              "WAGEPAYABLE",
              "INTEGRATEDPAYROLLPE",
              "INTEGRATEDPAYROLLPT",
              "EXTERNALSPENDMONEY",
              "INTEGRATEDPAYROLLPTPAYMENT",
              "INTEGRATEDPAYROLLCN",
            ],
          },
          JournalLines: {
            description: "See JournalLines",
            type: "array",
            items: {
              $ref: "#/components/schemas/JournalLine",
            },
          },
        },
        type: "object",
      },
      JournalLine: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/journals#JournalLines",
        },
        properties: {
          JournalLineID: {
            description: "Xero identifier for Journal",
            type: "string",
            format: "uuid",
            example: "7be9db36-3598-4755-ba5c-c2dbc8c4a7a2",
          },
          AccountID: {
            description: "See Accounts",
            type: "string",
            format: "uuid",
            example: "ceef66a5-a545-413b-9312-78a53caadbc4",
          },
          AccountCode: {
            description: "See Accounts",
            type: "string",
            example: 90,
          },
          AccountType: {
            $ref: "#/components/schemas/AccountType",
            type: "string",
          },
          AccountName: {
            description: "See AccountCodes",
            type: "string",
            example: "Checking Account",
          },
          Description: {
            description:
              "The description from the source transaction line item. Only returned if populated.",
            type: "string",
            example: "My business checking account",
          },
          NetAmount: {
            description:
              "Net amount of journal line. This will be a positive value for a debit and negative for a credit",
            type: "number",
            format: "double",
            "x-is-money": true,
            example: 4130.98,
          },
          GrossAmount: {
            description:
              "Gross amount of journal line (NetAmount + TaxAmount).",
            type: "number",
            format: "double",
            "x-is-money": true,
            example: 4130.98,
          },
          TaxAmount: {
            description: "Total tax on a journal line",
            type: "number",
            format: "double",
            "x-is-money": true,
            readOnly: true,
            example: 0,
          },
          TaxType: {
            description: "The tax type from taxRates",
            type: "string",
          },
          TaxName: {
            description: "see TaxRates",
            type: "string",
            example: "Tax Exempt",
          },
          TrackingCategories: {
            description:
              "Optional Tracking Category – see Tracking. Any JournalLine can have a maximum of 2 <TrackingCategory> elements.",
            type: "array",
            items: {
              $ref: "#/components/schemas/TrackingCategory",
            },
          },
        },
        type: "object",
      },
      LinkedTransactions: {
        type: "object",
        "x-objectArrayKey": "linked_transactions",
        properties: {
          LinkedTransactions: {
            type: "array",
            items: {
              $ref: "#/components/schemas/LinkedTransaction",
            },
          },
        },
      },
      LinkedTransaction: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/linked-transactions/",
        },
        properties: {
          SourceTransactionID: {
            description:
              "Filter by the SourceTransactionID. Get all the linked transactions created from a particular ACCPAY invoice",
            type: "string",
            format: "uuid",
          },
          SourceLineItemID: {
            description:
              "The line item identifier from the source transaction.",
            type: "string",
            format: "uuid",
          },
          ContactID: {
            description:
              "Filter by the combination of ContactID and Status. Get all the linked transactions that have been assigned to a particular customer and have a particular status e.g. GET /LinkedTransactions?ContactID=4bb34b03-3378-4bb2-a0ed-6345abf3224e&Status=APPROVED.",
            type: "string",
            format: "uuid",
          },
          TargetTransactionID: {
            description:
              "Filter by the TargetTransactionID. Get all the linked transactions  allocated to a particular ACCREC invoice",
            type: "string",
            format: "uuid",
          },
          TargetLineItemID: {
            description:
              "The line item identifier from the target transaction. It is possible  to link multiple billable expenses to the same TargetLineItemID.",
            type: "string",
            format: "uuid",
          },
          LinkedTransactionID: {
            description:
              "The Xero identifier for an Linked Transaction e.g./LinkedTransactions/297c2dc5-cc47-4afd-8ec8-74990b8761e9",
            type: "string",
            format: "uuid",
          },
          Status: {
            description:
              "Filter by the combination of ContactID and Status. Get all the linked transactions that have been assigned to a particular customer and have a particular status e.g. GET /LinkedTransactions?ContactID=4bb34b03-3378-4bb2-a0ed-6345abf3224e&Status=APPROVED.",
            type: "string",
            enum: ["APPROVED", "DRAFT", "ONDRAFT", "BILLED", "VOIDED"],
          },
          Type: {
            description:
              "This will always be BILLABLEEXPENSE. More types may be added in future.",
            type: "string",
            enum: ["BILLABLEEXPENSE"],
          },
          UpdatedDateUTC: {
            description: "The last modified date in UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          SourceTransactionTypeCode: {
            description:
              "The Type of the source tranasction. This will be ACCPAY if the linked transaction was created from an invoice and SPEND if it was created from a bank transaction.",
            type: "string",
            enum: ["ACCPAY", "SPEND"],
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        type: "object",
      },
      ManualJournals: {
        type: "object",
        "x-objectArrayKey": "manual_journals",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          ManualJournals: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ManualJournal",
            },
          },
        },
      },
      ManualJournal: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/manual-journals/",
        },
        properties: {
          Narration: {
            description: "Description of journal being posted",
            type: "string",
          },
          JournalLines: {
            description: "See JournalLines",
            type: "array",
            items: {
              $ref: "#/components/schemas/ManualJournalLine",
            },
          },
          Date: {
            description: "Date journal was posted – YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          Status: {
            description: "See Manual Journal Status Codes",
            type: "string",
            enum: ["DRAFT", "POSTED", "DELETED", "VOIDED", "ARCHIVED"],
          },
          Url: {
            description:
              "Url link to a source document – shown as “Go to [appName]” in the Xero app",
            type: "string",
          },
          ShowOnCashBasisReports: {
            description: "Boolean – default is true if not specified",
            type: "boolean",
          },
          HasAttachments: {
            description:
              "Boolean to indicate if a manual journal has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          ManualJournalID: {
            description: "The Xero identifier for a Manual Journal",
            type: "string",
            format: "uuid",
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
            example: "ERROR",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Attachments: {
            description: "Displays array of attachments from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
        },
        required: ["Narration"],
        type: "object",
      },
      ManualJournalLine: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/manual-journals/",
        },
        properties: {
          LineAmount: {
            description:
              "total for line. Debits are positive, credits are negative value",
            type: "number",
            format: "double",
            "x-is-money": true,
            example: -2569,
          },
          AccountCode: {
            description: "See Accounts",
            type: "string",
            example: 720,
          },
          AccountID: {
            description: "See Accounts",
            type: "string",
            format: "uuid",
          },
          Description: {
            description: "Description for journal line",
            type: "string",
            example:
              "Coded incorrectly Office Equipment should be Computer Equipment",
          },
          TaxType: {
            description: "The tax type from TaxRates",
            type: "string",
          },
          Tracking: {
            description:
              "Optional Tracking Category – see Tracking. Any JournalLine can have a maximum of 2 <TrackingCategory> elements.",
            type: "array",
            items: {
              $ref: "#/components/schemas/TrackingCategory",
            },
          },
          TaxAmount: {
            description:
              "The calculated tax amount based on the TaxType and LineAmount",
            type: "number",
            format: "double",
            "x-is-money": true,
            example: 0,
          },
          IsBlank: {
            description: "is the line blank",
            type: "boolean",
            example: false,
          },
        },
        type: "object",
      },
      Actions: {
        type: "object",
        "x-objectArrayKey": "actions",
        properties: {
          Actions: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Action",
            },
          },
        },
      },
      Action: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/organisation/",
        },
        properties: {
          Name: {
            description: "Name of the actions for this organisation",
            type: "string",
            example: "UseMulticurrency",
          },
          Status: {
            description: "Status of the action for this organisation",
            type: "string",
            enum: ["ALLOWED", "NOT-ALLOWED"],
          },
        },
      },
      Organisations: {
        type: "object",
        "x-objectArrayKey": "organisations",
        properties: {
          Organisations: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Organisation",
            },
          },
        },
      },
      Organisation: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/organisation/",
        },
        properties: {
          OrganisationID: {
            description: "Unique Xero identifier",
            type: "string",
            format: "uuid",
            example: "8be9db36-3598-4755-ba5c-c2dbc8c4a7a2",
          },
          APIKey: {
            description:
              "Display a unique key used for Xero-to-Xero transactions",
            type: "string",
          },
          Name: {
            description: "Display name of organisation shown in Xero",
            type: "string",
          },
          LegalName: {
            description: "Organisation name shown on Reports",
            type: "string",
          },
          PaysTax: {
            description:
              "Boolean to describe if organisation is registered with a local tax authority i.e. true, false",
            type: "boolean",
          },
          Version: {
            description: "See Version Types",
            type: "string",
            enum: [
              "AU",
              "NZ",
              "GLOBAL",
              "UK",
              "US",
              "AUONRAMP",
              "NZONRAMP",
              "GLOBALONRAMP",
              "UKONRAMP",
              "USONRAMP",
            ],
          },
          OrganisationType: {
            description: "Organisation Type",
            type: "string",
            enum: [
              "ACCOUNTING_PRACTICE",
              "COMPANY",
              "CHARITY",
              "CLUB_OR_SOCIETY",
              "INDIVIDUAL",
              "LOOK_THROUGH_COMPANY",
              "NOT_FOR_PROFIT",
              "PARTNERSHIP",
              "S_CORPORATION",
              "SELF_MANAGED_SUPERANNUATION_FUND",
              "SOLE_TRADER",
              "SUPERANNUATION_FUND",
              "TRUST",
            ],
          },
          BaseCurrency: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          CountryCode: {
            $ref: "#/components/schemas/CountryCode",
            type: "string",
          },
          IsDemoCompany: {
            description:
              "Boolean to describe if organisation is a demo company.",
            type: "boolean",
          },
          OrganisationStatus: {
            description:
              "Will be set to ACTIVE if you can connect to organisation via the Xero API",
            type: "string",
          },
          RegistrationNumber: {
            description:
              "Shows for New Zealand, Australian and UK organisations",
            type: "string",
          },
          EmployerIdentificationNumber: {
            description: "Shown if set. US Only.",
            type: "string",
          },
          TaxNumber: {
            description:
              "Shown if set. Displays in the Xero UI as Tax File Number (AU), GST Number (NZ), VAT Number (UK) and Tax ID Number (US & Global).",
            type: "string",
          },
          FinancialYearEndDay: {
            description: "Calendar day e.g. 0-31",
            type: "integer",
          },
          FinancialYearEndMonth: {
            description: "Calendar Month e.g. 1-12",
            type: "integer",
          },
          SalesTaxBasis: {
            description:
              "The accounting basis used for tax returns. See Sales Tax Basis",
            type: "string",
            enum: [
              "PAYMENTS",
              "INVOICE",
              "NONE",
              "CASH",
              "ACCRUAL",
              "FLATRATECASH",
              "FLATRATEACCRUAL",
              "ACCRUALS",
            ],
          },
          SalesTaxPeriod: {
            description:
              "The frequency with which tax returns are processed. See Sales Tax Period",
            type: "string",
            enum: [
              "MONTHLY",
              "QUARTERLY1",
              "QUARTERLY2",
              "QUARTERLY3",
              "ANNUALLY",
              "ONEMONTHS",
              "TWOMONTHS",
              "SIXMONTHS",
              "1MONTHLY",
              "2MONTHLY",
              "3MONTHLY",
              "6MONTHLY",
              "QUARTERLY",
              "YEARLY",
              "NONE",
            ],
          },
          DefaultSalesTax: {
            description:
              "The default for LineAmountTypes on sales transactions",
            type: "string",
          },
          DefaultPurchasesTax: {
            description:
              "The default for LineAmountTypes on purchase transactions",
            type: "string",
          },
          PeriodLockDate: {
            description: "Shown if set. See lock dates",
            type: "string",
            "x-is-msdate": true,
          },
          EndOfYearLockDate: {
            description: "Shown if set. See lock dates",
            type: "string",
            "x-is-msdate": true,
          },
          CreatedDateUTC: {
            description: "Timestamp when the organisation was created in Xero",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          Timezone: {
            $ref: "#/components/schemas/TimeZone",
            type: "string",
          },
          OrganisationEntityType: {
            description: "Organisation Entity Type",
            type: "string",
            enum: [
              "ACCOUNTING_PRACTICE",
              "COMPANY",
              "CHARITY",
              "CLUB_OR_SOCIETY",
              "INDIVIDUAL",
              "LOOK_THROUGH_COMPANY",
              "NOT_FOR_PROFIT",
              "PARTNERSHIP",
              "S_CORPORATION",
              "SELF_MANAGED_SUPERANNUATION_FUND",
              "SOLE_TRADER",
              "SUPERANNUATION_FUND",
              "TRUST",
            ],
          },
          ShortCode: {
            description:
              "A unique identifier for the organisation. Potential uses.",
            type: "string",
          },
          Class: {
            description:
              "Organisation Classes describe which plan the Xero organisation is on (e.g. DEMO, TRIAL, PREMIUM)",
            type: "string",
            enum: [
              "DEMO",
              "TRIAL",
              "STARTER",
              "STANDARD",
              "PREMIUM",
              "PREMIUM_20",
              "PREMIUM_50",
              "PREMIUM_100",
              "LEDGER",
              "GST_CASHBOOK",
              "NON_GST_CASHBOOK",
              "ULTIMATE",
              "LITE",
              "ULTIMATE_10",
              "ULTIMATE_20",
              "ULTIMATE_50",
              "ULTIMATE_100",
              "IGNITE",
              "GROW",
              "COMPREHENSIVE",
            ],
          },
          Edition: {
            description:
              "BUSINESS or PARTNER. Partner edition organisations are sold exclusively through accounting partners and have restricted functionality (e.g. no access to invoicing)",
            type: "string",
            enum: ["BUSINESS", "PARTNER"],
          },
          LineOfBusiness: {
            description:
              "Description of business type as defined in Organisation settings",
            type: "string",
          },
          Addresses: {
            description: "Address details for organisation – see Addresses",
            type: "array",
            items: {
              $ref: "#/components/schemas/AddressForOrganisation",
            },
          },
          Phones: {
            description: "Phones details for organisation – see Phones",
            type: "array",
            items: {
              $ref: "#/components/schemas/Phone",
            },
          },
          ExternalLinks: {
            description:
              "Organisation profile links for popular services such as Facebook,Twitter, GooglePlus and LinkedIn. You can also add link to your website here. Shown if Organisation settings  is updated in Xero. See ExternalLinks below",
            type: "array",
            items: {
              $ref: "#/components/schemas/ExternalLink",
            },
          },
          PaymentTerms: {
            $ref: "#/components/schemas/PaymentTerm",
          },
        },
        type: "object",
      },
      CountryCode: {
        type: "string",
        enum: [
          "AD",
          "AE",
          "AF",
          "AG",
          "AI",
          "AL",
          "AM",
          "AN",
          "AO",
          "AQ",
          "AR",
          "AS",
          "AT",
          "AU",
          "AW",
          "AZ",
          "BA",
          "BB",
          "BD",
          "BE",
          "BF",
          "BG",
          "BH",
          "BI",
          "BJ",
          "BL",
          "BM",
          "BN",
          "BO",
          "BR",
          "BS",
          "BT",
          "BW",
          "BY",
          "BZ",
          "CA",
          "CC",
          "CD",
          "CF",
          "CG",
          "CH",
          "CI",
          "CK",
          "CL",
          "CM",
          "CN",
          "CO",
          "CR",
          "CU",
          "CV",
          "CW",
          "CX",
          "CY",
          "CZ",
          "DE",
          "DJ",
          "DK",
          "DM",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "EH",
          "ER",
          "ES",
          "ET",
          "FI",
          "FJ",
          "FK",
          "FM",
          "FO",
          "FR",
          "GA",
          "GB",
          "GD",
          "GE",
          "GG",
          "GH",
          "GI",
          "GL",
          "GM",
          "GN",
          "GQ",
          "GR",
          "GT",
          "GU",
          "GW",
          "GY",
          "HK",
          "HN",
          "HR",
          "HT",
          "HU",
          "ID",
          "IE",
          "IL",
          "IM",
          "IN",
          "IO",
          "IQ",
          "IR",
          "IS",
          "IT",
          "JE",
          "JM",
          "JO",
          "JP",
          "KE",
          "KG",
          "KH",
          "KI",
          "KM",
          "KN",
          "KP",
          "KR",
          "KW",
          "KY",
          "KZ",
          "LA",
          "LB",
          "LC",
          "LI",
          "LK",
          "LR",
          "LS",
          "LT",
          "LU",
          "LV",
          "LY",
          "MA",
          "MC",
          "MD",
          "ME",
          "MF",
          "MG",
          "MH",
          "MK",
          "ML",
          "MM",
          "MN",
          "MO",
          "MP",
          "MR",
          "MS",
          "MT",
          "MU",
          "MV",
          "MW",
          "MX",
          "MY",
          "MZ",
          "NA",
          "NC",
          "NE",
          "NG",
          "NI",
          "NL",
          "NO",
          "NP",
          "NR",
          "NU",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PF",
          "PG",
          "PH",
          "PK",
          "PL",
          "PM",
          "PN",
          "PR",
          "PS",
          "PT",
          "PW",
          "PY",
          "QA",
          "RE",
          "RO",
          "RS",
          "RU",
          "RW",
          "SA",
          "SB",
          "SC",
          "SD",
          "SE",
          "SG",
          "SH",
          "SI",
          "SJ",
          "SK",
          "SL",
          "SM",
          "SN",
          "SO",
          "SR",
          "SS",
          "ST",
          "SV",
          "SX",
          "SY",
          "SZ",
          "TC",
          "TD",
          "TG",
          "TH",
          "TJ",
          "TK",
          "TL",
          "TM",
          "TN",
          "TO",
          "TR",
          "TT",
          "TV",
          "TW",
          "TZ",
          "UA",
          "UG",
          "US",
          "UY",
          "UZ",
          "VA",
          "VC",
          "VE",
          "VG",
          "VI",
          "VN",
          "VU",
          "WF",
          "WS",
          "XK",
          "YE",
          "YT",
          "ZA",
          "ZM",
          "ZW",
        ],
      },
      TimeZone: {
        description: "Timezone specifications",
        type: "string",
        enum: [
          "AFGHANISTANSTANDARDTIME",
          "ALASKANSTANDARDTIME",
          "ALEUTIANSTANDARDTIME",
          "ALTAISTANDARDTIME",
          "ARABIANSTANDARDTIME",
          "ARABICSTANDARDTIME",
          "ARABSTANDARDTIME",
          "ARGENTINASTANDARDTIME",
          "ASTRAKHANSTANDARDTIME",
          "ATLANTICSTANDARDTIME",
          "AUSCENTRALSTANDARDTIME",
          "AUSCENTRALWSTANDARDTIME",
          "AUSEASTERNSTANDARDTIME",
          "AZERBAIJANSTANDARDTIME",
          "AZORESSTANDARDTIME",
          "BAHIASTANDARDTIME",
          "BANGLADESHSTANDARDTIME",
          "BELARUSSTANDARDTIME",
          "BOUGAINVILLESTANDARDTIME",
          "CANADACENTRALSTANDARDTIME",
          "CAPEVERDESTANDARDTIME",
          "CAUCASUSSTANDARDTIME",
          "CENAUSTRALIASTANDARDTIME",
          "CENTRALAMERICASTANDARDTIME",
          "CENTRALASIASTANDARDTIME",
          "CENTRALBRAZILIANSTANDARDTIME",
          "CENTRALEUROPEANSTANDARDTIME",
          "CENTRALEUROPESTANDARDTIME",
          "CENTRALPACIFICSTANDARDTIME",
          "CENTRALSTANDARDTIME",
          "CENTRALSTANDARDTIME(MEXICO)",
          "CHATHAMISLANDSSTANDARDTIME",
          "CHINASTANDARDTIME",
          "CUBASTANDARDTIME",
          "DATELINESTANDARDTIME",
          "EAFRICASTANDARDTIME",
          "EASTERISLANDSTANDARDTIME",
          "EASTERNSTANDARDTIME",
          "EASTERNSTANDARDTIME(MEXICO)",
          "EAUSTRALIASTANDARDTIME",
          "EEUROPESTANDARDTIME",
          "EGYPTSTANDARDTIME",
          "EKATERINBURGSTANDARDTIME",
          "ESOUTHAMERICASTANDARDTIME",
          "FIJISTANDARDTIME",
          "FLESTANDARDTIME",
          "GEORGIANSTANDARDTIME",
          "GMTSTANDARDTIME",
          "GREENLANDSTANDARDTIME",
          "GREENWICHSTANDARDTIME",
          "GTBSTANDARDTIME",
          "HAITISTANDARDTIME",
          "HAWAIIANSTANDARDTIME",
          "INDIASTANDARDTIME",
          "IRANSTANDARDTIME",
          "ISRAELSTANDARDTIME",
          "JORDANSTANDARDTIME",
          "KALININGRADSTANDARDTIME",
          "KAMCHATKASTANDARDTIME",
          "KOREASTANDARDTIME",
          "LIBYASTANDARDTIME",
          "LINEISLANDSSTANDARDTIME",
          "LORDHOWESTANDARDTIME",
          "MAGADANSTANDARDTIME",
          "MAGALLANESSTANDARDTIME",
          "MARQUESASSTANDARDTIME",
          "MAURITIUSSTANDARDTIME",
          "MIDATLANTICSTANDARDTIME",
          "MIDDLEEASTSTANDARDTIME",
          "MONTEVIDEOSTANDARDTIME",
          "MOROCCOSTANDARDTIME",
          "MOUNTAINSTANDARDTIME",
          "MOUNTAINSTANDARDTIME(MEXICO)",
          "MYANMARSTANDARDTIME",
          "NAMIBIASTANDARDTIME",
          "NCENTRALASIASTANDARDTIME",
          "NEPALSTANDARDTIME",
          "NEWFOUNDLANDSTANDARDTIME",
          "NEWZEALANDSTANDARDTIME",
          "NORFOLKSTANDARDTIME",
          "NORTHASIAEASTSTANDARDTIME",
          "NORTHASIASTANDARDTIME",
          "NORTHKOREASTANDARDTIME",
          "OMSKSTANDARDTIME",
          "PACIFICSASTANDARDTIME",
          "PACIFICSTANDARDTIME",
          "PACIFICSTANDARDTIME(MEXICO)",
          "PAKISTANSTANDARDTIME",
          "PARAGUAYSTANDARDTIME",
          "QYZYLORDASTANDARDTIME",
          "ROMANCESTANDARDTIME",
          "RUSSIANSTANDARDTIME",
          "RUSSIATIMEZONE10",
          "RUSSIATIMEZONE11",
          "RUSSIATIMEZONE3",
          "SAEASTERNSTANDARDTIME",
          "SAINTPIERRESTANDARDTIME",
          "SAKHALINSTANDARDTIME",
          "SAMOASTANDARDTIME",
          "SAOTOMESTANDARDTIME",
          "SAPACIFICSTANDARDTIME",
          "SARATOVSTANDARDTIME",
          "SAWESTERNSTANDARDTIME",
          "SEASIASTANDARDTIME",
          "SINGAPORESTANDARDTIME",
          "SOUTHAFRICASTANDARDTIME",
          "SOUTHSUDANSTANDARDTIME",
          "SRILANKASTANDARDTIME",
          "SUDANSTANDARDTIME",
          "SYRIASTANDARDTIME",
          "TAIPEISTANDARDTIME",
          "TASMANIASTANDARDTIME",
          "TOCANTINSSTANDARDTIME",
          "TOKYOSTANDARDTIME",
          "TOMSKSTANDARDTIME",
          "TONGASTANDARDTIME",
          "TRANSBAIKALSTANDARDTIME",
          "TURKEYSTANDARDTIME",
          "TURKSANDCAICOSSTANDARDTIME",
          "ULAANBAATARSTANDARDTIME",
          "USEASTERNSTANDARDTIME",
          "USMOUNTAINSTANDARDTIME",
          "UTC",
          "UTC+12",
          "UTC+13",
          "UTC02",
          "UTC08",
          "UTC09",
          "UTC11",
          "VENEZUELASTANDARDTIME",
          "VLADIVOSTOKSTANDARDTIME",
          "VOLGOGRADSTANDARDTIME",
          "WAUSTRALIASTANDARDTIME",
          "WCENTRALAFRICASTANDARDTIME",
          "WESTASIASTANDARDTIME",
          "WESTBANKSTANDARDTIME",
          "WESTPACIFICSTANDARDTIME",
          "WEUROPESTANDARDTIME",
          "WMONGOLIASTANDARDTIME",
          "YAKUTSKSTANDARDTIME",
          "YUKONSTANDARDTIME",
        ],
      },
      PaymentTerm: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/organisation/",
        },
        properties: {
          Bills: {
            $ref: "#/components/schemas/Bill",
          },
          Sales: {
            $ref: "#/components/schemas/Bill",
          },
        },
        type: "object",
      },
      PaymentTermType: {
        type: "string",
        enum: [
          "DAYSAFTERBILLDATE",
          "DAYSAFTERBILLMONTH",
          "OFCURRENTMONTH",
          "OFFOLLOWINGMONTH",
        ],
      },
      ExternalLink: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/organisation/",
        },
        properties: {
          LinkType: {
            description: "See External link types",
            type: "string",
            enum: ["Facebook", "GooglePlus", "LinkedIn", "Twitter", "Website"],
          },
          Url: {
            description: "URL for service e.g. http://twitter.com/xeroapi",
            type: "string",
          },
          Description: {
            type: "string",
          },
        },
        type: "object",
      },
      Bill: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/organisation/",
        },
        properties: {
          Day: {
            description: "Day of Month (0-31)",
            type: "integer",
          },
          Type: {
            $ref: "#/components/schemas/PaymentTermType",
          },
        },
        type: "object",
      },
      Overpayments: {
        type: "object",
        "x-objectArrayKey": "overpayments",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Overpayments: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Overpayment",
            },
          },
        },
      },
      Overpayment: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/overpayments/",
        },
        properties: {
          Type: {
            description: "See Overpayment Types",
            type: "string",
            enum: ["RECEIVE-OVERPAYMENT", "SPEND-OVERPAYMENT", "AROVERPAYMENT"],
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          Date: {
            description: "The date the overpayment is created YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          Status: {
            description: "See Overpayment Status Codes",
            type: "string",
            enum: ["AUTHORISED", "PAID", "VOIDED"],
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          LineItems: {
            description: "See Overpayment Line Items",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          SubTotal: {
            description: "The subtotal of the overpayment excluding taxes",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "The total tax on the overpayment",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description: "The total of the overpayment (subtotal + total tax)",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          UpdatedDateUTC: {
            description: "UTC timestamp of last update to the overpayment",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          OverpaymentID: {
            description: "Xero generated unique identifier",
            type: "string",
            format: "uuid",
          },
          CurrencyRate: {
            description:
              "The currency rate for a multicurrency overpayment. If no rate is specified, the XE.com day rate is used",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          RemainingCredit: {
            description: "The remaining credit balance on the overpayment",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Allocations: {
            description: "See Allocations",
            type: "array",
            items: {
              $ref: "#/components/schemas/Allocation",
            },
          },
          AppliedAmount: {
            description: "The amount of applied to an invoice",
            type: "number",
            format: "double",
            example: 2,
          },
          Payments: {
            description: "See Payments",
            type: "array",
            items: {
              $ref: "#/components/schemas/Payment",
            },
          },
          HasAttachments: {
            description:
              "boolean to indicate if a overpayment has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          Attachments: {
            description: "See Attachments",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
        },
        type: "object",
      },
      Payments: {
        type: "object",
        "x-objectArrayKey": "payments",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Payments: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Payment",
            },
          },
        },
      },
      PaymentDelete: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/payments/",
        },
        properties: {
          Status: {
            description: "The status of the payment.",
            type: "string",
            default: "DELETED",
          },
        },
        required: ["Status"],
        type: "object",
      },
      Payment: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/payments/",
        },
        properties: {
          Invoice: {
            $ref: "#/components/schemas/Invoice",
          },
          CreditNote: {
            $ref: "#/components/schemas/CreditNote",
          },
          Prepayment: {
            $ref: "#/components/schemas/Prepayment",
          },
          Overpayment: {
            $ref: "#/components/schemas/Overpayment",
          },
          InvoiceNumber: {
            description:
              "Number of invoice or credit note you are applying payment to e.g.INV-4003",
            type: "string",
          },
          CreditNoteNumber: {
            description:
              "Number of invoice or credit note you are applying payment to e.g. INV-4003",
            type: "string",
          },
          BatchPayment: {
            $ref: "#/components/schemas/BatchPayment",
          },
          Account: {
            $ref: "#/components/schemas/Account",
          },
          Code: {
            description:
              "Code of account you are using to make the payment e.g. 001 (note- not all accounts have a code value)",
            type: "string",
          },
          Date: {
            description:
              "Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06",
            type: "string",
            "x-is-msdate": true,
          },
          CurrencyRate: {
            description:
              "Exchange rate when payment is received. Only used for non base currency invoices and credit notes e.g. 0.7500",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Amount: {
            description:
              "The amount of the payment. Must be less than or equal to the outstanding amount owing on the invoice e.g. 200.00",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          BankAmount: {
            description:
              "The amount of the payment in the currency of the bank account.",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Reference: {
            description:
              "An optional description for the payment e.g. Direct Debit",
            type: "string",
          },
          IsReconciled: {
            description:
              "An optional parameter for the payment. A boolean indicating whether you would like the payment to be created as reconciled when using PUT, or whether a payment has been reconciled when using GET",
            type: "boolean",
          },
          Status: {
            description: "The status of the payment.",
            type: "string",
            enum: ["AUTHORISED", "DELETED"],
          },
          PaymentType: {
            description: "See Payment Types.",
            readOnly: true,
            type: "string",
            enum: [
              "ACCRECPAYMENT",
              "ACCPAYPAYMENT",
              "ARCREDITPAYMENT",
              "APCREDITPAYMENT",
              "AROVERPAYMENTPAYMENT",
              "ARPREPAYMENTPAYMENT",
              "APPREPAYMENTPAYMENT",
              "APOVERPAYMENTPAYMENT",
            ],
          },
          UpdatedDateUTC: {
            description: "UTC timestamp of last update to the payment",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          PaymentID: {
            description:
              "The Xero identifier for an Payment e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          BatchPaymentID: {
            description:
              "Present if the payment was created as part of a batch.",
            type: "string",
            format: "uuid",
            example: "00000000-0000-0000-0000-000000000000",
          },
          BankAccountNumber: {
            description:
              "The suppliers bank account number the payment is being made to",
            type: "string",
          },
          Particulars: {
            description:
              "The suppliers bank account number the payment is being made to",
            type: "string",
          },
          Details: {
            description:
              "The information to appear on the supplier's bank account",
            type: "string",
          },
          HasAccount: {
            description:
              "A boolean to indicate if a contact has an validation errors",
            type: "boolean",
            default: "false",
            example: "false",
          },
          HasValidationErrors: {
            description:
              "A boolean to indicate if a contact has an validation errors",
            type: "boolean",
            default: "false",
            example: "false",
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        type: "object",
      },
      Prepayments: {
        type: "object",
        "x-objectArrayKey": "prepayments",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Prepayments: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Prepayment",
            },
          },
        },
      },
      Prepayment: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/prepayments/",
        },
        properties: {
          Type: {
            description: "See Prepayment Types",
            type: "string",
            enum: [
              "RECEIVE-PREPAYMENT",
              "SPEND-PREPAYMENT",
              "ARPREPAYMENT",
              "APPREPAYMENT",
            ],
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          Date: {
            description: "The date the prepayment is created YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          Status: {
            description: "See Prepayment Status Codes",
            type: "string",
            enum: ["AUTHORISED", "PAID", "VOIDED"],
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          LineItems: {
            description: "See Prepayment Line Items",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          SubTotal: {
            description: "The subtotal of the prepayment excluding taxes",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "The total tax on the prepayment",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description: "The total of the prepayment(subtotal + total tax)",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Reference: {
            description:
              "Returns Invoice number field. Reference field isn't available.",
            type: "string",
            readOnly: true,
          },
          UpdatedDateUTC: {
            description: "UTC timestamp of last update to the prepayment",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          PrepaymentID: {
            description: "Xero generated unique identifier",
            type: "string",
            format: "uuid",
          },
          CurrencyRate: {
            description:
              "The currency rate for a multicurrency prepayment. If no rate is specified, the XE.com day rate is used",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          RemainingCredit: {
            description: "The remaining credit balance on the prepayment",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Allocations: {
            description: "See Allocations",
            type: "array",
            items: {
              $ref: "#/components/schemas/Allocation",
            },
          },
          Payments: {
            description: "See Payments",
            type: "array",
            items: {
              $ref: "#/components/schemas/Payment",
            },
          },
          AppliedAmount: {
            description: "The amount of applied to an invoice",
            type: "number",
            format: "double",
            example: 2,
          },
          HasAttachments: {
            description:
              "boolean to indicate if a prepayment has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          Attachments: {
            description: "See Attachments",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
        },
        type: "object",
      },
      PurchaseOrders: {
        type: "object",
        "x-objectArrayKey": "purchase_orders",
        properties: {
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          PurchaseOrders: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PurchaseOrder",
            },
          },
        },
      },
      PurchaseOrder: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/purchase-orders/",
        },
        properties: {
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          LineItems: {
            description: "See LineItems",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          Date: {
            description:
              "Date purchase order was issued – YYYY-MM-DD. If the Date element is not specified then it will default to the current date based on the timezone setting of the organisation",
            type: "string",
            "x-is-msdate": true,
          },
          DeliveryDate: {
            description: "Date the goods are to be delivered – YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          PurchaseOrderNumber: {
            description:
              "Unique alpha numeric code identifying purchase order (when missing will auto-generate from your Organisation Invoice Settings)",
            type: "string",
          },
          Reference: {
            description: "Additional reference number",
            type: "string",
          },
          BrandingThemeID: {
            description: "See BrandingThemes",
            type: "string",
            format: "uuid",
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          Status: {
            description: "See Purchase Order Status Codes",
            type: "string",
            enum: ["DRAFT", "SUBMITTED", "AUTHORISED", "BILLED", "DELETED"],
          },
          SentToContact: {
            description:
              "Boolean to set whether the purchase order should be marked as “sent”. This can be set only on purchase orders that have been approved or billed",
            type: "boolean",
          },
          DeliveryAddress: {
            description: "The address the goods are to be delivered to",
            type: "string",
          },
          AttentionTo: {
            description: "The person that the delivery is going to",
            type: "string",
          },
          Telephone: {
            description:
              "The phone number for the person accepting the delivery",
            type: "string",
          },
          DeliveryInstructions: {
            description:
              "A free text feild for instructions (500 characters max)",
            type: "string",
          },
          ExpectedArrivalDate: {
            description: "The date the goods are expected to arrive.",
            type: "string",
            "x-is-msdate": true,
          },
          PurchaseOrderID: {
            description: "Xero generated unique identifier for purchase order",
            type: "string",
            format: "uuid",
          },
          CurrencyRate: {
            description:
              "The currency rate for a multicurrency purchase order. If no rate is specified, the XE.com day rate is used.",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          SubTotal: {
            description: "Total of purchase order excluding taxes",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "Total tax on purchase order",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description:
              "Total of Purchase Order tax inclusive (i.e. SubTotal + TotalTax)",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalDiscount: {
            description:
              "Total of discounts applied on the purchase order line items",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          HasAttachments: {
            description:
              "boolean to indicate if a purchase order has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Attachments: {
            description: "Displays array of attachments from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
        },
        type: "object",
      },
      Pagination: {
        type: "object",
        properties: {
          page: {
            type: "integer",
          },
          pageSize: {
            type: "integer",
          },
          pageCount: {
            type: "integer",
          },
          itemCount: {
            type: "integer",
          },
        },
      },
      Quotes: {
        type: "object",
        "x-objectArrayKey": "quotes",
        properties: {
          Quotes: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Quote",
            },
          },
        },
      },
      Quote: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/Quotes/",
        },
        properties: {
          QuoteID: {
            description:
              "QuoteID GUID is automatically generated and is returned after create or GET.",
            type: "string",
            format: "uuid",
          },
          QuoteNumber: {
            description:
              "Unique alpha numeric code identifying a quote (Max Length = 255)",
            maxLength: 255,
            type: "string",
          },
          Reference: {
            description: "Additional reference number",
            maxLength: 4000,
            type: "string",
          },
          Terms: {
            description: "Terms of the quote",
            maxLength: 4000,
            type: "string",
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
            type: "string",
          },
          LineItems: {
            description: "See LineItems",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          Date: {
            description:
              "Date quote was issued – YYYY-MM-DD. If the Date element is not specified it will default to the current date based on the timezone setting of the organisation",
            type: "string",
            "x-is-msdate": true,
          },
          DateString: {
            description: "Date the quote was issued (YYYY-MM-DD)",
            type: "string",
          },
          ExpiryDate: {
            description: "Date the quote expires – YYYY-MM-DD.",
            type: "string",
            "x-is-msdate": true,
          },
          ExpiryDateString: {
            description: "Date the quote expires – YYYY-MM-DD.",
            type: "string",
          },
          Status: {
            $ref: "#/components/schemas/QuoteStatusCodes",
            type: "string",
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          CurrencyRate: {
            description: "The currency rate for a multicurrency quote",
            type: "number",
            format: "double",
          },
          SubTotal: {
            description: "Total of quote excluding taxes.",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "Total tax on quote",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description:
              "Total of Quote tax inclusive (i.e. SubTotal + TotalTax). This will be ignored if it doesn’t equal the sum of the LineAmounts",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalDiscount: {
            description: "Total of discounts applied on the quote line items",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Title: {
            description: "Title text for the quote",
            type: "string",
            maxLength: 100,
          },
          Summary: {
            description: "Summary text for the quote",
            type: "string",
            maxLength: 3000,
          },
          BrandingThemeID: {
            description: "See BrandingThemes",
            type: "string",
            format: "uuid",
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/QuoteLineAmountTypes",
            type: "string",
            description: "See Quote Line Amount Types",
          },
          StatusAttributeString: {
            description: "A string to indicate if a invoice status",
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
        },
        type: "object",
      },
      QuoteLineAmountTypes: {
        description:
          "Line amounts are exclusive of tax by default if you don’t specify this element. See Line Amount Types",
        type: "string",
        enum: ["EXCLUSIVE", "INCLUSIVE", "NOTAX"],
      },
      QuoteStatusCodes: {
        description: "The status of the quote.",
        type: "string",
        enum: ["DRAFT", "SENT", "DECLINED", "ACCEPTED", "INVOICED", "DELETED"],
      },
      Receipts: {
        type: "object",
        "x-objectArrayKey": "receipts",
        properties: {
          Receipts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Receipt",
            },
          },
        },
      },
      Receipt: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/receipts/",
        },
        properties: {
          Date: {
            description: "Date of receipt – YYYY-MM-DD",
            type: "string",
            "x-is-msdate": true,
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          LineItems: {
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          User: {
            $ref: "#/components/schemas/User",
          },
          Reference: {
            description: "Additional reference number",
            type: "string",
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          SubTotal: {
            description: "Total of receipt excluding taxes",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "Total tax on receipt",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description:
              "Total of receipt tax inclusive (i.e. SubTotal + TotalTax)",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          ReceiptID: {
            description: "Xero generated unique identifier for receipt",
            type: "string",
            format: "uuid",
          },
          Status: {
            description: "Current status of receipt – see status types",
            type: "string",
            enum: ["DRAFT", "SUBMITTED", "AUTHORISED", "DECLINED", "VOIDED"],
          },
          ReceiptNumber: {
            description:
              "Xero generated sequence number for receipt in current claim for a given user",
            readOnly: true,
            type: "string",
          },
          UpdatedDateUTC: {
            description: "Last modified date UTC format",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          HasAttachments: {
            description: "boolean to indicate if a receipt has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          Url: {
            description:
              "URL link to a source document – shown as “Go to [appName]” in the Xero app",
            readOnly: true,
            type: "string",
          },
          ValidationErrors: {
            description:
              "Displays array of validation error messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Warnings: {
            description: "Displays array of warning messages from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          Attachments: {
            description: "Displays array of attachments from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
        },
        type: "object",
      },
      RepeatingInvoices: {
        type: "object",
        "x-objectArrayKey": "repeating_invoices",
        properties: {
          RepeatingInvoices: {
            type: "array",
            items: {
              $ref: "#/components/schemas/RepeatingInvoice",
            },
          },
        },
      },
      RepeatingInvoice: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/repeating-invoices/",
        },
        properties: {
          Type: {
            description: "See Invoice Types",
            type: "string",
            enum: ["ACCPAY", "ACCREC"],
          },
          Contact: {
            $ref: "#/components/schemas/Contact",
          },
          Schedule: {
            $ref: "#/components/schemas/Schedule",
          },
          LineItems: {
            description: "See LineItems",
            type: "array",
            items: {
              $ref: "#/components/schemas/LineItem",
            },
          },
          LineAmountTypes: {
            $ref: "#/components/schemas/LineAmountTypes",
            type: "string",
          },
          Reference: {
            description: "ACCREC only – additional reference number",
            type: "string",
          },
          BrandingThemeID: {
            description: "See BrandingThemes",
            type: "string",
            format: "uuid",
          },
          CurrencyCode: {
            $ref: "#/components/schemas/CurrencyCode",
            type: "string",
          },
          Status: {
            description:
              "One of the following - DRAFT or AUTHORISED – See Invoice Status Codes",
            type: "string",
            enum: ["DRAFT", "AUTHORISED", "DELETED"],
          },
          SubTotal: {
            description: "Total of invoice excluding taxes",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          TotalTax: {
            description: "Total tax on invoice",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Total: {
            description:
              "Total of Invoice tax inclusive (i.e. SubTotal + TotalTax)",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          RepeatingInvoiceID: {
            description:
              "Xero generated unique identifier for repeating invoice template",
            type: "string",
            format: "uuid",
          },
          ID: {
            description:
              "Xero generated unique identifier for repeating invoice template",
            type: "string",
            format: "uuid",
          },
          HasAttachments: {
            description: "Boolean to indicate if an invoice has an attachment",
            readOnly: true,
            type: "boolean",
            default: "false",
            example: "false",
          },
          Attachments: {
            description: "Displays array of attachments from the API",
            type: "array",
            items: {
              $ref: "#/components/schemas/Attachment",
            },
          },
          ApprovedForSending: {
            description:
              "Boolean to indicate whether the invoice has been approved for sending",
            type: "boolean",
            default: "false",
            example: "false",
          },
          SendCopy: {
            description:
              "Boolean to indicate whether a copy is sent to sender's email",
            type: "boolean",
            default: "false",
            example: "false",
          },
          MarkAsSent: {
            description:
              'Boolean to indicate whether the invoice in the Xero app displays as "sent"',
            type: "boolean",
            default: "false",
            example: "false",
          },
          IncludePDF: {
            description:
              "Boolean to indicate whether to include PDF attachment",
            type: "boolean",
            default: "false",
            example: "false",
          },
        },
        type: "object",
      },
      ReportWithRows: {
        type: "object",
        properties: {
          Reports: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ReportWithRow",
            },
          },
        },
      },
      ReportWithRow: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/reports/",
        },
        properties: {
          ReportID: {
            description: "ID of the Report",
            type: "string",
          },
          ReportName: {
            description: "Name of the report",
            type: "string",
          },
          ReportTitle: {
            description: "Title of the report",
            type: "string",
          },
          ReportType: {
            description: "The type of report (BalanceSheet,ProfitLoss, etc)",
            type: "string",
          },
          ReportTitles: {
            description:
              "Report titles array (3 to 4 strings with the report name, orgnisation name and time frame of report)",
            type: "array",
            items: {
              type: "string",
            },
          },
          ReportDate: {
            description: "Date of report",
            type: "string",
          },
          Rows: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ReportRows",
            },
          },
          UpdatedDateUTC: {
            description: "Updated Date",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          Fields: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ReportFields",
            },
          },
        },
      },
      ReportRows: {
        type: "object",
        properties: {
          RowType: {
            $ref: "#/components/schemas/RowType",
          },
          Title: {
            type: "string",
          },
          Cells: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ReportCell",
            },
          },
          Rows: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ReportRow",
            },
          },
        },
      },
      RowType: {
        type: "string",
        enum: ["Header", "Section", "Row", "SummaryRow"],
      },
      ReportRow: {
        type: "object",
        properties: {
          RowType: {
            $ref: "#/components/schemas/RowType",
          },
          Title: {
            type: "string",
          },
          Cells: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ReportCell",
            },
          },
        },
      },
      ReportCell: {
        type: "object",
        properties: {
          Value: {
            type: "string",
          },
          Attributes: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ReportAttribute",
            },
          },
        },
      },
      ReportAttribute: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/reports/",
        },
        properties: {
          Id: {
            type: "string",
          },
          Value: {
            type: "string",
          },
        },
      },
      ReportFields: {
        type: "object",
        properties: {
          FieldID: {
            type: "string",
          },
          Description: {
            type: "string",
          },
          Value: {
            type: "string",
          },
        },
      },
      Reports: {
        type: "object",
        "x-objectArrayKey": "reports",
        properties: {
          Reports: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Report",
            },
          },
        },
      },
      Report: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/reports/",
        },
        properties: {
          ReportName: {
            description: "See Prepayment Types",
            type: "string",
          },
          ReportType: {
            description: "See Prepayment Types",
            type: "string",
            enum: ["AgedPayablesByContact"],
          },
          ReportTitle: {
            description: "See Prepayment Types",
            type: "string",
          },
          ReportDate: {
            description: "Date of report",
            type: "string",
          },
          UpdatedDateUTC: {
            description: "Updated Date",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          Contacts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TenNinetyNineContact",
            },
          },
        },
      },
      TenNinetyNineContact: {
        properties: {
          Box1: {
            description: "Box 1 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box2: {
            description: "Box 2 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box3: {
            description: "Box 3 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box4: {
            description: "Box 4 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box5: {
            description: "Box 5 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box6: {
            description: "Box 6 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box7: {
            description: "Box 7 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box8: {
            description: "Box 8 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box9: {
            description: "Box 9 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box10: {
            description: "Box 10 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box11: {
            description: "Box 11 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box13: {
            description: "Box 13 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Box14: {
            description: "Box 14 on 1099 Form",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          Name: {
            description: "Contact name on 1099 Form",
            type: "string",
          },
          FederalTaxIDType: {
            description: "Contact Fed Tax ID type",
            type: "string",
          },
          City: {
            description: "Contact city on 1099 Form",
            type: "string",
          },
          Zip: {
            description: "Contact zip on 1099 Form",
            type: "string",
          },
          State: {
            description: "Contact State on 1099 Form",
            type: "string",
          },
          Email: {
            description: "Contact email on 1099 Form",
            type: "string",
          },
          StreetAddress: {
            description: "Contact address on 1099 Form",
            type: "string",
          },
          TaxID: {
            description: "Contact tax id on 1099 Form",
            type: "string",
          },
          ContactId: {
            description: "Contact contact id",
            type: "string",
            format: "uuid",
          },
          LegalName: {
            description: "Contact legal name",
            type: "string",
          },
          BusinessName: {
            description: "Contact business name",
            type: "string",
          },
          FederalTaxClassification: {
            description: "Contact federal tax classification",
            type: "string",
            enum: [
              "SOLE_PROPRIETOR",
              "PARTNERSHIP",
              "TRUST_OR_ESTATE",
              "NONPROFIT",
              "C_CORP",
              "S_CORP",
              "OTHER",
            ],
          },
        },
      },
      Schedule: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/repeating-invoices/",
        },
        properties: {
          Period: {
            description:
              "Integer used with the unit e.g. 1 (every 1 week), 2 (every 2 months)",
            type: "integer",
          },
          Unit: {
            description: "One of the following - WEEKLY or MONTHLY",
            type: "string",
            enum: ["WEEKLY", "MONTHLY"],
          },
          DueDate: {
            description:
              "Integer used with due date type e.g 20 (of following month), 31 (of current month)",
            type: "integer",
          },
          DueDateType: {
            description: "the payment terms",
            type: "string",
            enum: [
              "DAYSAFTERBILLDATE",
              "DAYSAFTERBILLMONTH",
              "DAYSAFTERINVOICEDATE",
              "DAYSAFTERINVOICEMONTH",
              "OFCURRENTMONTH",
              "OFFOLLOWINGMONTH",
            ],
          },
          StartDate: {
            description:
              "Date the first invoice of the current version of the repeating schedule was generated (changes when repeating invoice is edited)",
            type: "string",
            "x-is-msdate": true,
          },
          NextScheduledDate: {
            description:
              "The calendar date of the next invoice in the schedule to be generated",
            type: "string",
            "x-is-msdate": true,
          },
          EndDate: {
            description:
              "Invoice end date – only returned if the template has an end date set",
            type: "string",
            "x-is-msdate": true,
          },
        },
        type: "object",
      },
      TaxRates: {
        type: "object",
        "x-objectArrayKey": "tax_rates",
        properties: {
          TaxRates: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TaxRate",
            },
          },
        },
      },
      TaxType: {
        description: "See Tax Types – can only be used on update calls",
        type: "string",
        enum: [
          "OUTPUT",
          "INPUT",
          "CAPEXINPUT",
          "EXEMPTEXPORT",
          "EXEMPTEXPENSES",
          "EXEMPTCAPITAL",
          "EXEMPTOUTPUT",
          "INPUTTAXED",
          "BASEXCLUDED",
          "GSTONCAPIMPORTS",
          "GSTONIMPORTS",
          "NONE",
          "INPUT2",
          "ZERORATED",
          "OUTPUT2",
          "CAPEXINPUT2",
          "CAPEXOUTPUT",
          "CAPEXOUTPUT2",
          "CAPEXSRINPUT",
          "CAPEXSROUTPUT",
          "ECACQUISITIONS",
          "ECZRINPUT",
          "ECZROUTPUT",
          "ECZROUTPUTSERVICES",
          "EXEMPTINPUT",
          "REVERSECHARGES",
          "RRINPUT",
          "RROUTPUT",
          "SRINPUT",
          "SROUTPUT",
          "ZERORATEDINPUT",
          "ZERORATEDOUTPUT",
          "BLINPUT",
          "DSOUTPUT",
          "EPINPUT",
          "ES33OUTPUT",
          "ESN33OUTPUT",
          "IGDSINPUT2",
          "IMINPUT2",
          "MEINPUT",
          "NRINPUT",
          "OPINPUT",
          "OSOUTPUT",
          "TXESSINPUT",
          "TXN33INPUT",
          "TXPETINPUT",
          "TXREINPUT",
          "INPUT3",
          "INPUT4",
          "OUTPUT3",
          "OUTPUT4",
          "SROUTPUT2",
          "TXCA",
          "SRCAS",
          "BLINPUT2",
          "DRCHARGESUPPLY20",
          "DRCHARGE20",
          "DRCHARGESUPPLY5",
          "DRCHARGE5",
          "BADDEBTRELIEF",
          "IGDSINPUT3",
          "SROVR",
          "TOURISTREFUND",
          "TXRCN33",
          "TXRCRE",
          "TXRCESS",
          "TXRCTS",
          "OUTPUTY23",
          "DSOUTPUTY23",
          "INPUTY23",
          "IMINPUT2Y23",
          "IGDSINPUT2Y23",
          "TXPETINPUTY23",
          "TXESSINPUTY23",
          "TXN33INPUTY23",
          "TXREINPUTY23",
          "TXCAY23",
          "BADDEBTRELIEFY23",
          "IGDSINPUT3Y23",
          "SROVRRSY23",
          "SROVRLVGY23",
          "SRLVGY23",
          "TXRCN33Y23",
          "TXRCREY23",
          "TXRCESSY23",
          "TXRCTSY23",
          "IM",
          "IMY23",
          "IMESS",
          "IMESSY23",
          "IMN33",
          "IMN33Y23",
          "IMRE",
          "IMREY23",
          "BADDEBTRECOVERY",
          "BADDEBTRECOVERYY23",
          "OUTPUTY24",
          "DSOUTPUTY24",
          "INPUTY24",
          "IGDSINPUT2Y24",
          "TXPETINPUTY24",
          "TXESSINPUTY24",
          "TXN33INPUTY24",
          "TXREINPUTY24",
          "TXCAY24",
          "BADDEBTRELIEFY24",
          "IGDSINPUT3Y24",
          "SROVRRSY24",
          "SROVRLVGY24",
          "SRLVGY24",
          "TXRCTSY24",
          "TXRCESSY24",
          "TXRCN33Y24",
          "TXRCREY24",
          "IMY24",
          "IMESSY24",
          "IMN33Y24",
          "IMREY24",
          "BADDEBTRECOVERYY24",
          "OSOUTPUT2",
          "BLINPUT3",
          "BLINPUT3Y23",
          "BLINPUT3Y24",
        ],
      },
      Setup: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api-guides/conversions",
        },
        properties: {
          ConversionDate: {
            $ref: "#/components/schemas/ConversionDate",
          },
          ConversionBalances: {
            description:
              "Balance supplied for each account that has a value as at the conversion date.",
            type: "array",
            items: {
              $ref: "#/components/schemas/ConversionBalances",
            },
          },
          Accounts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Account",
            },
          },
        },
      },
      ConversionDate: {
        description: "The date when the organisation starts using Xero",
        type: "object",
        properties: {
          Month: {
            description:
              "The month the organisation starts using Xero. Value is an integer between 1 and 12",
            type: "integer",
            example: 1,
          },
          Year: {
            description:
              "The year the organisation starts using Xero. Value is an integer greater than 2006",
            type: "integer",
            example: 2020,
          },
        },
      },
      ConversionBalances: {
        description:
          "Balance supplied for each account that has a value as at the conversion date.",
        properties: {
          AccountCode: {
            description: "The account code for a account",
            type: "string",
          },
          Balance: {
            description:
              "The opening balances of the account. Debits are positive, credits are negative values",
            type: "number",
            format: "double",
          },
          BalanceDetails: {
            type: "array",
            items: {
              $ref: "#/components/schemas/BalanceDetails",
            },
          },
        },
        type: "object",
      },
      BalanceDetails: {
        description:
          "An array to specify multiple currency balances of an account",
        properties: {
          Balance: {
            description:
              "The opening balances of the account. Debits are positive, credits are negative values",
            type: "number",
            format: "double",
          },
          CurrencyCode: {
            description:
              "The currency of the balance (Not required for base currency)",
            type: "string",
          },
          CurrencyRate: {
            description:
              "(Optional) Exchange rate to base currency when money is spent or received. If not specified, XE rate for the day is applied",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
        },
        type: "object",
      },
      ImportSummaryObject: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api-guides/conversions",
        },
        properties: {
          ImportSummary: {
            $ref: "#/components/schemas/ImportSummary",
          },
        },
      },
      ImportSummary: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api-guides/conversions",
        },
        description: "A summary of the import from setup endpoint",
        type: "object",
        properties: {
          Accounts: {
            $ref: "#/components/schemas/ImportSummaryAccounts",
          },
          Organisation: {
            $ref: "#/components/schemas/ImportSummaryOrganisation",
          },
        },
      },
      ImportSummaryAccounts: {
        description: "A summary of the accounts changes",
        type: "object",
        properties: {
          Total: {
            description: "The total number of accounts in the org",
            type: "integer",
            format: "int32",
          },
          New: {
            description: "The number of new accounts created",
            type: "integer",
            format: "int32",
          },
          Updated: {
            description: "The number of accounts updated",
            type: "integer",
            format: "int32",
          },
          Deleted: {
            description: "The number of accounts deleted",
            type: "integer",
            format: "int32",
          },
          Locked: {
            description: "The number of locked accounts",
            type: "integer",
            format: "int32",
          },
          System: {
            description: "The number of system accounts",
            type: "integer",
            format: "int32",
          },
          Errored: {
            description: "The number of accounts that had an error",
            type: "integer",
            format: "int32",
          },
          Present: {
            type: "boolean",
          },
          NewOrUpdated: {
            description: "The number of new or updated accounts",
            type: "integer",
            format: "int32",
          },
        },
      },
      ImportSummaryOrganisation: {
        type: "object",
        properties: {
          Present: {
            type: "boolean",
          },
        },
      },
      TaxRate: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/tax-rates/",
        },
        properties: {
          Name: {
            description: "Name of tax rate",
            type: "string",
          },
          TaxType: {
            description: "The tax type",
            type: "string",
          },
          TaxComponents: {
            description: "See TaxComponents",
            type: "array",
            items: {
              $ref: "#/components/schemas/TaxComponent",
            },
          },
          Status: {
            description: "See Status Codes",
            type: "string",
            enum: ["ACTIVE", "DELETED", "ARCHIVED", "PENDING"],
          },
          ReportTaxType: {
            description: "See ReportTaxTypes",
            type: "string",
            enum: [
              "AVALARA",
              "BASEXCLUDED",
              "CAPITALSALESOUTPUT",
              "CAPITALEXPENSESINPUT",
              "ECOUTPUT",
              "ECOUTPUTSERVICES",
              "ECINPUT",
              "ECACQUISITIONS",
              "EXEMPTEXPENSES",
              "EXEMPTINPUT",
              "EXEMPTOUTPUT",
              "GSTONIMPORTS",
              "INPUT",
              "INPUTTAXED",
              "MOSSSALES",
              "NONE",
              "NONEOUTPUT",
              "OUTPUT",
              "PURCHASESINPUT",
              "SALESOUTPUT",
              "EXEMPTCAPITAL",
              "EXEMPTEXPORT",
              "CAPITALEXINPUT",
              "GSTONCAPIMPORTS",
              "GSTONCAPITALIMPORTS",
              "REVERSECHARGES",
              "PAYMENTS",
              "INVOICE",
              "CASH",
              "ACCRUAL",
              "FLATRATECASH",
              "FLATRATEACCRUAL",
              "ACCRUALS",
              "TXCA",
              "SRCAS",
              "DSOUTPUT",
              "BLINPUT2",
              "EPINPUT",
              "IMINPUT2",
              "MEINPUT",
              "IGDSINPUT2",
              "ESN33OUTPUT",
              "OPINPUT",
              "OSOUTPUT",
              "TXN33INPUT",
              "TXESSINPUT",
              "TXREINPUT",
              "TXPETINPUT",
              "NRINPUT",
              "ES33OUTPUT",
              "ZERORATEDINPUT",
              "ZERORATEDOUTPUT",
              "DRCHARGESUPPLY",
              "DRCHARGE",
              "CAPINPUT",
              "CAPIMPORTS",
              "IMINPUT",
              "INPUT2",
              "CIUINPUT",
              "SRINPUT",
              "OUTPUT2",
              "SROUTPUT",
              "CAPOUTPUT",
              "SROUTPUT2",
              "CIUOUTPUT",
              "ZROUTPUT",
              "ZREXPORT",
              "ACC28PLUS",
              "ACCUPTO28",
              "OTHEROUTPUT",
              "SHOUTPUT",
              "ZRINPUT",
              "BADDEBT",
              "OTHERINPUT",
              "BADDEBTRELIEF",
              "IGDSINPUT3",
              "SROVR",
              "TOURISTREFUND",
              "TXRCN33",
              "TXRCRE",
              "TXRCESS",
              "TXRCTS",
              "CAPEXINPUT",
              "UNDEFINED",
              "CAPEXOUTPUT",
              "ZEROEXPOUTPUT",
              "GOODSIMPORT",
              "NONEINPUT",
              "NOTREPORTED",
              "SROVRRS",
              "SROVRLVG",
              "SRLVG",
              "IM",
              "IMESS",
              "IMN33",
              "IMRE",
              "BADDEBTRECOVERY",
              "USSALESTAX",
              "BLINPUT3",
            ],
          },
          CanApplyToAssets: {
            description:
              "Boolean to describe if tax rate can be used for asset accounts i.e.  true,false",
            readOnly: true,
            type: "boolean",
          },
          CanApplyToEquity: {
            description:
              "Boolean to describe if tax rate can be used for equity accounts i.e true,false",
            readOnly: true,
            type: "boolean",
          },
          CanApplyToExpenses: {
            description:
              "Boolean to describe if tax rate can be used for expense accounts  i.e. true,false",
            readOnly: true,
            type: "boolean",
          },
          CanApplyToLiabilities: {
            description:
              "Boolean to describe if tax rate can be used for liability accounts  i.e. true,false",
            readOnly: true,
            type: "boolean",
          },
          CanApplyToRevenue: {
            description:
              "Boolean to describe if tax rate can be used for revenue accounts i.e. true,false",
            readOnly: true,
            type: "boolean",
          },
          DisplayTaxRate: {
            description: "Tax Rate (decimal to 4dp) e.g 12.5000",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          EffectiveRate: {
            description: "Effective Tax Rate (decimal to 4dp) e.g 12.5000",
            readOnly: true,
            type: "number",
            format: "double",
            "x-is-money": true,
          },
        },
        type: "object",
      },
      TaxComponent: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/tax-rates/",
        },
        properties: {
          Name: {
            description: "Name of Tax Component",
            type: "string",
          },
          Rate: {
            description: "Tax Rate (up to 4dp)",
            type: "number",
            format: "double",
            "x-is-money": true,
          },
          IsCompound: {
            description: "Boolean to describe if Tax rate is compounded.",
            type: "boolean",
          },
          IsNonRecoverable: {
            description:
              "Boolean to describe if tax rate is non-recoverable. Non-recoverable rates are only applicable to Canadian organisations",
            type: "boolean",
          },
        },
        type: "object",
      },
      TrackingCategories: {
        type: "object",
        "x-objectArrayKey": "tracking_categories",
        properties: {
          TrackingCategories: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TrackingCategory",
            },
          },
        },
      },
      TrackingCategory: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/tracking-categories/",
        },
        properties: {
          TrackingCategoryID: {
            description:
              "The Xero identifier for a tracking category e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9",
            type: "string",
            format: "uuid",
          },
          TrackingOptionID: {
            description:
              "The Xero identifier for a tracking option e.g. dc54c220-0140-495a-b925-3246adc0075f",
            type: "string",
            format: "uuid",
          },
          Name: {
            description:
              "The name of the tracking category e.g. Department, Region (max length = 100)",
            maxLength: 100,
            type: "string",
          },
          Option: {
            description:
              "The option name of the tracking option e.g. East, West (max length = 100)",
            maxLength: 100,
            type: "string",
          },
          Status: {
            description: "The status of a tracking category",
            type: "string",
            enum: ["ACTIVE", "ARCHIVED", "DELETED"],
          },
          Options: {
            description: "See Tracking Options",
            type: "array",
            items: {
              $ref: "#/components/schemas/TrackingOption",
            },
          },
        },
        type: "object",
      },
      TrackingOptions: {
        type: "object",
        "x-objectArrayKey": "options",
        properties: {
          Options: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TrackingOption",
            },
          },
        },
      },
      TrackingOption: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/tracking-categories/",
        },
        properties: {
          TrackingOptionID: {
            description:
              "The Xero identifier for a tracking option e.g. ae777a87-5ef3-4fa0-a4f0-d10e1f13073a",
            type: "string",
            format: "uuid",
          },
          Name: {
            description:
              "The name of the tracking option e.g. Marketing, East (max length = 100)",
            maxLength: 100,
            type: "string",
          },
          Status: {
            description: "The status of a tracking option",
            type: "string",
            enum: ["ACTIVE", "ARCHIVED", "DELETED"],
          },
          TrackingCategoryID: {
            description:
              "Filter by a tracking category e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9",
            type: "string",
            format: "uuid",
          },
        },
        type: "object",
      },
      SalesTrackingCategory: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/tracking-categories/",
        },
        properties: {
          TrackingCategoryName: {
            description:
              "The default sales tracking category name for contacts",
            type: "string",
          },
          TrackingOptionName: {
            description:
              "The default purchase tracking category name for contacts",
            type: "string",
          },
        },
        type: "object",
      },
      Users: {
        type: "object",
        "x-objectArrayKey": "users",
        properties: {
          Users: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      User: {
        externalDocs: {
          url: "http://developer.xero.com/documentation/api/users/",
        },
        properties: {
          UserID: {
            description: "Xero identifier",
            type: "string",
            format: "uuid",
          },
          EmailAddress: {
            description: "Email address of user",
            type: "string",
          },
          FirstName: {
            description: "First name of user",
            type: "string",
          },
          LastName: {
            description: "Last name of user",
            type: "string",
          },
          UpdatedDateUTC: {
            description: "Timestamp of last change to user",
            type: "string",
            "x-is-msdate-time": true,
            example: "/Date(1573755038314)/",
            readOnly: true,
          },
          IsSubscriber: {
            description: "Boolean to indicate if user is the subscriber",
            type: "boolean",
          },
          OrganisationRole: {
            description:
              "User role that defines permissions in Xero and via API (READONLY, INVOICEONLY, STANDARD, FINANCIALADVISER, etc)",
            type: "string",
            enum: [
              "READONLY",
              "INVOICEONLY",
              "STANDARD",
              "FINANCIALADVISER",
              "MANAGEDCLIENT",
              "CASHBOOKCLIENT",
              "UNKNOWN",
            ],
          },
        },
        type: "object",
      },
      Error: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/http-response-codes",
        },
        properties: {
          ErrorNumber: {
            description: "Exception number",
            type: "integer",
          },
          Type: {
            description: "Exception type",
            type: "string",
          },
          Message: {
            description: "Exception message",
            type: "string",
          },
          Elements: {
            description: "Array of Elements of validation Errors",
            type: "array",
            items: {
              $ref: "#/components/schemas/Element",
            },
          },
        },
        type: "object",
      },
      Element: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/http-response-codes",
        },
        properties: {
          ValidationErrors: {
            description: "Array of Validation Error message",
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationError",
            },
          },
          BatchPaymentID: {
            description:
              "Unique ID for batch payment object with validation error",
            type: "string",
            format: "uuid",
          },
          BankTransactionID: {
            type: "string",
            format: "uuid",
          },
          CreditNoteID: {
            type: "string",
            format: "uuid",
          },
          ContactID: {
            type: "string",
            format: "uuid",
          },
          InvoiceID: {
            type: "string",
            format: "uuid",
          },
          ItemID: {
            type: "string",
            format: "uuid",
          },
          PurchaseOrderID: {
            type: "string",
            format: "uuid",
          },
        },
        type: "object",
      },
      ValidationError: {
        externalDocs: {
          url: "https://developer.xero.com/documentation/api/http-response-codes",
        },
        properties: {
          Message: {
            description: "Validation error message",
            type: "string",
          },
        },
        type: "object",
      },
      InvoiceAddress: {
        properties: {
          InvoiceAddressType: {
            description:
              "Indicates whether the address is defined as origin (FROM) or destination (TO)",
            type: "string",
            enum: ["FROM", "TO"],
          },
          AddressLine1: {
            description: "First line of a physical address",
            type: "string",
          },
          AddressLine2: {
            description: "Second line of a physical address",
            type: "string",
          },
          AddressLine3: {
            description: "Third line of a physical address",
            type: "string",
          },
          AddressLine4: {
            description: "Fourth line of a physical address",
            type: "string",
          },
          City: {
            description: "City of a physical address",
            type: "string",
          },
          Region: {
            description: "Region or state of a physical address",
            type: "string",
          },
          PostalCode: {
            description: "Postal code of a physical address",
            type: "string",
          },
          Country: {
            description: "Country of a physical address",
            type: "string",
          },
        },
        type: "object",
      },
      TaxBreakdownComponent: {
        properties: {
          TaxComponentId: {
            description: "The unique ID number of this component",
            type: "string",
            format: "uuid",
          },
          Type: {
            description: "The type of the jurisdiction",
            type: "string",
            enum: [
              "SYSGST/USCOUNTRY",
              "SYSGST/USSTATE",
              "SYSGST/USCOUNTY",
              "SYSGST/USCITY",
              "SYSGST/USSPECIAL",
            ],
          },
          Name: {
            description: "The name of the jurisdiction",
            type: "string",
          },
          TaxPercentage: {
            description: "The percentage of the tax",
            type: "number",
          },
          TaxAmount: {
            description: "The amount of the tax",
            type: "number",
          },
          TaxableAmount: {
            description: "The amount that is taxable",
            type: "number",
          },
          NonTaxableAmount: {
            description: "The amount that is not taxable",
            type: "number",
          },
          ExemptAmount: {
            description: "The amount that is exempt",
            type: "number",
          },
          StateAssignedNo: {
            description: "The state assigned number of the jurisdiction",
            type: "string",
          },
          JurisdictionRegion: {
            description: "Name identifying the region within the country",
            type: "string",
          },
        },
        type: "object",
      },
    },
  },
};
