#!/usr/bin/env node
import { XeroMcpServer } from "./XeroMcpServer.js";
import { XeroClientSession } from "./XeroApiClient.js";

async function main() {
  await XeroClientSession.bootstrapFromDisk();
  const server = new XeroMcpServer();
  await server.start();
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
