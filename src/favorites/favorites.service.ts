import { Injectable } from '@nestjs/common';

import { favoritesDB } from './db/favorites.db';

import type { Track } from 'src/interfaces/track.interface';
import type { Album } from 'src/interfaces/album.interface';
import type { Artist } from 'src/interfaces/artist.interface';

@Injectable()
export class FavoritesService {
  getAllFavorites = async () => favoritesDB.getAllFavorites();

  addTrack = async (trackId: Track['id']) => favoritesDB.addTrack(trackId);

  getTrackById = async (trackId: Track['id']) =>
    favoritesDB.getTrackById(trackId);

  deleteTrackById = async (trackId: Track['id']) =>
    favoritesDB.deleteTrack(trackId);

  addAlbum = async (albumId: Album['id']) => favoritesDB.addAlbum(albumId);

  getAlbumById = async (albumId: Album['id']) =>
    favoritesDB.getAlbumById(albumId);

  deleteAlbumById = async (albumId: Album['id']) =>
    favoritesDB.deleteAlbum(albumId);

  addArtist = async (artistId: Artist['id']) => favoritesDB.addArtist(artistId);

  getArtistById = async (artistId: Artist['id']) =>
    favoritesDB.getArtistById(artistId);

  deleteArtistById = async (artistId: Artist['id']) =>
    favoritesDB.deleteArtist(artistId);
}
