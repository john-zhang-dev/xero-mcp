import { XeroMcpServer } from "./XeroMcpServer.js";

const server = new XeroMcpServer();
server.start().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});