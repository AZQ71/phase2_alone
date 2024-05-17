-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seller" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bank_account" TEXT NOT NULL,
    "money_balance" DECIMAL NOT NULL
);
INSERT INTO "new_Seller" ("bank_account", "company_name", "id", "money_balance", "password", "username") SELECT "bank_account", "company_name", "id", "money_balance", "password", "username" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");
CREATE UNIQUE INDEX "Seller_bank_account_key" ON "Seller"("bank_account");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
