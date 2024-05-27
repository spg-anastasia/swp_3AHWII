const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ausgabe der Namen aller Zoos
  async function getAllZooNames() {
    const zoos = await prisma.zoo.findMany({
      select: {
        name: true,
      },
    });
    console.log('Namen aller Zoos:', zoos.map(zoo => zoo.name));
  }

  // Anhand einer Zoo-Id alle Infos über den Zoo ausgeben
  async function getZooById(zooId) {
    const zoo = await prisma.zoo.findUnique({
      where: { id: zooId },
      include: {
        abteilungen: true,
      },
    });
    console.log(`Infos über den Zoo mit ID ${zooId}:`, zoo);
  }

  // Alle Abteilungen des Zoos ausgeben
  async function getAllAbteilungenByZooId(zooId) {
    const abteilungen = await prisma.abteilung.findMany({
      where: { zooId },
      select: {
        id: true,
        name: true,
      },
    });
    console.log(`Alle Abteilungen des Zoos mit ID ${zooId}:`, abteilungen);
  }

  // Wie oben und zusätzlich: wie viele Tiere in jeder Abteilung
  async function getAbteilungenAndAnimalCountByZooId(zooId) {
    const abteilungen = await prisma.abteilung.findMany({
      where: { zooId },
      include: {
        tiere: true,
      },
    });
    const result = abteilungen.map(abteilung => ({
      id: abteilung.id,
      name: abteilung.name,
      tierCount: abteilung.tiere.length,
    }));
    console.log(`Abteilungen und Tieranzahl des Zoos mit ID ${zooId}:`, result);
  }

  // Alle Mitarbeiter in einem bestimmten Zoo ausgeben
  async function getAllMitarbeiterByZooId(zooId) {
    const mitarbeiter = await prisma.mitarbeiter.findMany({
      where: {
        abteilungen: {
          some: {
            zooId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    console.log(`Alle Mitarbeiter des Zoos mit ID ${zooId}:`, mitarbeiter);
  }

  // Wie oben und zusätzlich: in welchen Abteilungen sie arbeiten
  async function getAllMitarbeiterAndAbteilungenByZooId(zooId) {
    const mitarbeiter = await prisma.mitarbeiter.findMany({
      where: {
        abteilungen: {
          some: {
            zooId,
          },
        },
      },
      include: {
        abteilungen: true,
      },
    });
    const result = mitarbeiter.map(m => ({
      id: m.id,
      name: m.name,
      abteilungen: m.abteilungen.map(a => ({
        id: a.id,
        name: a.name,
      })),
    }));
    console.log(`Mitarbeiter und ihre Abteilungen im Zoo mit ID ${zooId}:`, result);
  }

  // Example Usage
  await getAllZooNames();
  const exampleZooId = 'some-zoo-id'; // Replace with actual zoo id
  await getZooById(exampleZooId);
  await getAllAbteilungenByZooId(exampleZooId);
  await getAbteilungenAndAnimalCountByZooId(exampleZooId);
  await getAllMitarbeiterByZooId(exampleZooId);
  await getAllMitarbeiterAndAbteilungenByZooId(exampleZooId);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
