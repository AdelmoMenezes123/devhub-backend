import "reflect-metadata";
import "./shared/container";

import { app } from "./app";

// Captura global de erros
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Não derrube o servidor, apenas logue
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Faça um graceful shutdown se necessário
});

app.listen(3333, () => {
  console.log("🚀 Server running on port 3333");
});
