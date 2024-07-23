-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersMoney" (
    "id" SERIAL NOT NULL,
    "Salary" INTEGER NOT NULL,
    "expenses" INTEGER NOT NULL,
    "savings" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "UsersMoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "categories" TEXT NOT NULL,
    "catogorisedBy" INTEGER NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "UsersMoney" ADD CONSTRAINT "UsersMoney_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_catogorisedBy_fkey" FOREIGN KEY ("catogorisedBy") REFERENCES "UsersMoney"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
