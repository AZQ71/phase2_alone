/*
  Warnings:

  - You are about to drop the column `counrty` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `country` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "purchaseNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" DECIMAL NOT NULL,
    "customerId" INTEGER,
    CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("amount", "customerId", "date", "itemId", "purchaseNo", "quantity") SELECT "amount", "customerId", "date", "itemId", "purchaseNo", "quantity" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
