/*
  Warnings:

  - You are about to alter the column `liked` on the `liked` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_liked" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "liked" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "liked_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts" ("postId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_liked" ("id", "liked", "postId", "userId") SELECT "id", "liked", "postId", "userId" FROM "liked";
DROP TABLE "liked";
ALTER TABLE "new_liked" RENAME TO "liked";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
