-- DropForeignKey
ALTER TABLE "users_tokens" DROP CONSTRAINT "users_tokens_userId_fkey";

-- AddForeignKey
ALTER TABLE "users_tokens" ADD CONSTRAINT "users_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
