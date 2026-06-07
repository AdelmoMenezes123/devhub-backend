/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `users_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_tokens_refreshToken_key" ON "users_tokens"("refreshToken");
