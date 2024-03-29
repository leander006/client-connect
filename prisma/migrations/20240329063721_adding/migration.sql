/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `UserConversationRelation` table. All the data in the column will be lost.
  - You are about to drop the `ConversationMessageRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMessageRelation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConversationMessageRelation" DROP CONSTRAINT "ConversationMessageRelation_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationMessageRelation" DROP CONSTRAINT "ConversationMessageRelation_messageId_fkey";

-- DropForeignKey
ALTER TABLE "UserMessageRelation" DROP CONSTRAINT "UserMessageRelation_messageId_fkey";

-- DropForeignKey
ALTER TABLE "UserMessageRelation" DROP CONSTRAINT "UserMessageRelation_userId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "messagesIds" TEXT[];

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "conversationId" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "name" TEXT,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserConversationRelation" DROP COLUMN "assignedBy";

-- DropTable
DROP TABLE "ConversationMessageRelation";

-- DropTable
DROP TABLE "UserMessageRelation";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
