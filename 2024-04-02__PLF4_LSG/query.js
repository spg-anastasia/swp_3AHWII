console.log('here is my query:');
// TODO

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
