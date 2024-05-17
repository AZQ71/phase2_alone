/*
  Warnings:

  - Made the column `customerId` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

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
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("amount", "country", "customerId", "date", "itemId", "purchaseNo", "quantity") SELECT "amount", "country", "customerId", "date", "itemId", "purchaseNo", "quantity" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "description" TEXT NOT NULL,
    "owner_username" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("category", "description", "id", "name", "owner_username", "price", "quantity", "sellerId", "url") SELECT "category", "description", "id", "name", "owner_username", "price", "quantity", "sellerId", "url" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
