console.log('here is my query:');
// TODO
// Nicht verwendbar
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getWatchlistNamesByUser(userId) {
    const userWatchlists = await prisma.benutzer.findUnique({
        where: { id: userId },
        select: { Watchlist: { select: { name: true } } }
    });
    return userWatchlists.Watchlist.map(watchlist => watchlist.name);
}

async function getTracksFromWatchlist(watchlistId) {
    const watchlistTracks = await prisma.watchlist.findUnique({
        where: { id: watchlistId },
        select: { Track: { select: { name: true, duration: true, genre: true, artist: true } } }
    });
    return watchlistTracks.Track;
}
module.exports = { getWatchlistNamesByUser, getTracksFromWatchlist };