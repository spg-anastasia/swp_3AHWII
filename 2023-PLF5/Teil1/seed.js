const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');

async function main() {
  // Erstellen von 5 Zoos
  const zoos = [];
  for (let i = 0; i < 5; i++) {
    const zoo = await prisma.zoo.create({
      data: {
        land: fakerDE.location.country(),
        stadt: fakerDE.location.city(),
        adresse: fakerDE.location.streetAddress(),
        baujahr: fakerDE.number.int({ min: 1900, max: 2023 })
      }
    });

    // Erstellen von Abteilungen für jeden Zoo
    const anzahl_abteilungen = Math.floor(Math.random() * 6) + 2; // Zufällige Anzahl von Abteilungen zwischen 2 und 7
    for (let j = 0; j < anzahl_abteilungen; j++) {
      const abteilung = await prisma.abteilung.create({
        data: {
          name: fakerDE.animal.type(),
          zooId: zoo.id
        }
      });

      // Erstellen von Mitarbeitern für jede Abteilung
      const anzahlMitarbeiter = Math.floor(Math.random() * 4) + 1; // Zufällige Anzahl von Mitarbeitern zwischen 1 und 4
      for (let k = 0; k < anzahlMitarbeiter; k++) {
        const mitarbeiter = await prisma.mitarbeiter.create({
          data: {
            name: fakerDE.person.firstName(),
            //abteilungId: abteilung.id
            abteilung: {
              connect: { id: abteilung.id }
            }
          }
        });
      }

      // Erstellen von Tieren für jede Abteilung
      const anzahlTiere = Math.floor(Math.random() * 16) + 5; // Zufällige Anzahl von Tieren zwischen 5 und 20
      for (let l = 0; l < anzahlTiere; l++) {
        await prisma.tier.create({
          data: {
            name: fakerDE.animal.dog(), // Assuming you want animal names; adjust as needed
            art: fakerDE.animal.type(),
            abteilungId: abteilung.id
          }
        });
      }
    }

    zoos.push(zoo);
  }

  console.log('Daten erfolgreich erstellt!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
