import { Injectable } from '@nestjs/common';

import { prisma } from 'prisma/prisma';

import type { Track } from 'src/interfaces/track.interface';
import type { Album } from 'src/interfaces/album.interface';
import type { Artist } from 'src/interfaces/artist.interface';
import type { Favorites } from 'src/interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  getAllFavorites = async (): Promise<Favorites> => {
    const albums: Album[] = await prisma.album.findMany({
      where: { favorites: { some: {} } },
    });
    const tracks: Track[] = await prisma.track.findMany({
      where: { favorites: { some: {} } },
    });
    const artists: Artist[] = await prisma.artist.findMany({
      where: { favorites: { some: {} } },
    });

    return { albums, tracks, artists };
  };

  addTrack = async (trackId: Track['id']): Promise<void> => {
    await prisma.favoriteTrack.create({
      data: { trackId },
    });
  };

  deleteTrackById = async (trackId: Track['id']): Promise<void> => {
    await prisma.favoriteTrack.delete({
      where: { id: trackId },
    });
  };

  getTrackById = async (trackId: Track['id']) =>
    await prisma.favoriteTrack.findUnique({
      where: { id: trackId },
      include: { track: true },
    });

  addArtist = async (artistId: Artist['id']): Promise<void> => {
    await prisma.favoriteArtist.create({
      data: { artistId },
    });
  };

  deleteArtistById = async (artistId: Artist['id']): Promise<void> => {
    await prisma.favoriteTrack.delete({
      where: { id: artistId },
    });
  };

  getArtistById = async (artistId: Artist['id']) =>
    await prisma.favoriteArtist.findUnique({
      where: { id: artistId },
      include: { artist: true },
    });

  addAlbum = async (albumId: Album['id']): Promise<void> => {
    await prisma.favoriteAlbum.create({
      data: { albumId },
    });
  };

  deleteAlbumById = async (albumId: Album['id']): Promise<void> => {
    await prisma.favoriteAlbum.delete({
      where: { id: albumId },
    });
  };

  getAlbumById = async (albumId: Album['id']) =>
    await prisma.favoriteAlbum.findUnique({
      where: { id: albumId },
      include: { album: true },
    });
}
