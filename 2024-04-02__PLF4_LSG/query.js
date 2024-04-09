console.log('here is my query:');
// TODO

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getWatchlistNames(userId) {
    try {
        const user = await prisma.benutzer.findUnique({
            where: {
                id: userId,
            },
            include: {
                Watchlist: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return user.Watchlist.map(watchlist => watchlist.name);
    } catch (error) {
        console.error('Fehler beim Abrufen der Watchlist-Namen:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    getWatchlistNames,
};

