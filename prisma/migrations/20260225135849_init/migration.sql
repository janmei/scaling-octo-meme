-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "eta" TEXT,
    "courier" TEXT,
    "progress" INTEGER NOT NULL,
    "color" TEXT NOT NULL
);
