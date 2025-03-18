import { Accounts, AccountType } from "xero-node";

export async function getAccounts(): Promise<Accounts> {
  return Promise.resolve({
    accounts: [
      {
        name: "Income",
        description: "income revenue account",
        code: "201",
        type: AccountType.REVENUE,
      },
      {
        name: "Expenses",
        description: "Expenses account",
        code: "401",
        type: AccountType.EXPENSE,
      },
    ],
  });
}
