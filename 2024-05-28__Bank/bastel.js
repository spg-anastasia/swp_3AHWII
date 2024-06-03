const { fakerDE } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const bankCountTarget = 3;
const customerCountTarget = 20;
const accountCountTarget = 25;
const transactionCountTarget = 50;

async function seed() {
/*await prisma.transaction.deleteMany();
await prisma.account.deleteMany();
await prisma.customer.deleteMany();
await prisma.bank.deleteMany();*/


    // Banken erstellen
    const bankCountActual = await prisma.bank.count();
    for (let i = 1; i <= bankCountTarget - bankCountActual; i++) {
        const bank = {
            bic: fakerDE.number.int({ min: 100, max: 999 }),
        };
        await prisma.bank.create({
            data: bank,
        });
    }
    console.log(
        ` ${
            bankCountTarget - bankCountActual
        } Banken erstellt, insgesamt ${await prisma.bank.count()} Banken in DB`
    );

    // Kunden erstellen
    const customerCountActual = await prisma.customer.count();
    for (let i = 1; i <= customerCountTarget - customerCountActual; i++) {
        const customer = {
            name: fakerDE.person.fullName(),
            email: fakerDE.internet.email(),
            bankId: (await prisma.bank.findMany({ select: { id: true } }))[Math.floor(Math.random() * bankCountTarget)].id
        };
        await prisma.customer.create({
            data: customer,
        });
    }
    console.log(
        ` ${
            customerCountTarget - customerCountActual
        } Kunden erstellt, insgesamt ${await prisma.customer.count()} Kunden in DB`
    );

    // Accounts erstellen
    const accountCountActual = await prisma.account.count();
    for (let i = 1; i <= accountCountTarget - accountCountActual; i++) {
        const customer = await prisma.customer.findMany({ select: { id: true, bankId: true } });
        const randomCustomer = customer[Math.floor(Math.random() * customer.length)];
        const account = {
            iban: fakerDE.finance.iban(),
            customerId: randomCustomer.id,
            bankId: randomCustomer.bankId,
        };
        await prisma.account.create({
            data: account,
        });
    }
    console.log(
        `${
            accountCountTarget - accountCountActual
        } Accounts erstellt, insgesamt ${await prisma.account.count()} Accounts in DB`
    );

    // Transaktionen erstellen
    const allAccounts = await prisma.account.findMany({ select: { id: true } });
    for (let i = 0; i < transactionCountTarget; i++) {
        const fromAccount = allAccounts[Math.floor(Math.random() * allAccounts.length)];
        const toAccount = allAccounts[Math.floor(Math.random() * allAccounts.length)];

        await prisma.transaction.create({
            data: {
                verwendungszweck: fakerDE.lorem.sentence(),
                date: fakerDE.date.recent(),
                amount: fakerDE.number.int({ min: 10, max: 1000 }),
                fromAcct: {
                    connect: { id: fromAccount.id },
                },
                toAcct: toAccount.id,
            },
        });
    }
    console.log("Transaktionen erstellt");
}

function handleError(e) {
    console.error(`FEHLER: ${e.message}`);
}

seed()
    .then(() => console.log('done seeding'))
    .catch(handleError)
    .finally(async () => {
        await prisma.$disconnect();
    });
