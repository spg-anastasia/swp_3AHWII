console.log("funktioniert");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function getWatchlists(userId) {
    const user = await prisma.benutzer.findUnique({
        where: {
            id: userId,
        },
        include: {
            Watchlists: {
                select: {
                    name: true,
                    createdAt: true,

                },
            },
        },
    });

    return user ? user.Watchlists.map(watchlist => watchlist.name) : [];
}

async function getTracks(watchlistId) {
    const watchlist = await prisma.watchlist.findUnique({
        where: {
            id: watchlistId,
        },
        include: {
            Tracks: {
                select: {
                    name: true,
                    duration: true,
                    genre: true,
                    artist: true,
                },
            },
        },
    });

    return watchlist ? watchlist.Tracks : [];
}

module.exports = { getWatchlists, getTracks };


async function main() {

    const userId = 2;
    const watchlists = await getWatchlists(userId);
    console.log(`Watchlists für Benutzer mit ID ${userId}:`, watchlists);

 
    const watchlistId = 1;
    const tracks = await getTracks(watchlistId);
    console.log(`Tracks von der Watchlist mit ID ${watchlistId}:`, tracks);
}

main()