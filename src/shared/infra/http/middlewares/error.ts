import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../errors/AppError";

export function errorMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
  console.error("=== ERROR DETAILS ===");
  console.error("Error message:", err.message);

  err?.name && console.error("Error name:", err.name);

  // Extrair informações do stack trace
  if (err?.stack) {
    const stackLines = err.stack?.split("\n");
    console.error("Error location:", stackLines[1]?.trim()); // Primeira linha do stack trace

    // Se quiser ver todas as linhas
    console.error("Full stack trace:");
    stackLines.forEach((line) => console.error("  ", line?.trim()));
  }

  console.error("====================");

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    message: "Internal server error",
  });
}
