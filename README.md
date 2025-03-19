# Xero MCP Server

This MCP server allows Clients to interact with [Xero Accounting Software](https://www.xero.com).

## Get Started

1. Make sure [node](https://nodejs.org) and [Claude Desktop](https://claude.ai/download) are installed.

2. Create an OAuth 2.0 app in Xero to get a *CLIENT_ID* and *CLIENT_SECRET*.

* Create a free Xero user account (if you don't have one) 
* Login to Xero Developer center https://developer.xero.com/app/manage/
* Click New app
* Enter a name for your app
* Select Web app
* Provide a valid URL (can be anything valid eg. https://www.myapp.com)
* Enter redirect URI: `http://localhost:5000/callback`
* Tick to Accept the Terms & Conditions and click Create app
* On the left-hand side of the screen select Configuration
* Click Generate a secret

3. Modify `claude_desktop_config.json` file

    ```json
    {
        "mcpServers": {
            "xero-mcp": {
                "command": "npx",
                "args": ["-y", "@john-zhang-dev/xero-mcp"],
                "env": {
                    "XERO_CLIENT_ID": "YOUR_CLIENT_ID",
                    "XERO_CLIENT_SECRET": "YOUR_CLIENT_SECRET",
                    "XERO_REDIRECT_URI": "http://localhost:5000/callback"
                }
            }
        }
    }
    ```

4. Restart Claude Desktop

## Tools

- authenticate

    Authenticate with Xero using OAuth2

- list_accounts

    List all accounts

- list_bank_transactions

    List all bank transactions

- list_contacts

    List all contacts

- list_invoices

    List all invoices

- list_journals

    List all journals

- list_organisations

    List all organisations

- list_payments

    List all payments

- list_quotes

    List all quotes

## WIP Features

- Tools that allow new transactions to be added to Xero
- Docker support

If you have additional requirements, please open an issue on this github repository.

## License

MIT