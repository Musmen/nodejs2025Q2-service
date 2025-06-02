import type { Favorites } from 'src/interfaces/favorites.interface';
import type { Track } from 'src/interfaces/track.interface';
import type { Album } from 'src/interfaces/Album.interface';
import type { Artist } from 'src/interfaces/artist.interface';

class FavoritesDB {
  private _favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAllFavorites = async (): Promise<Favorites> => this._favorites;

  getTrackById = async (trackId: Track['id']) =>
    this._favorites.tracks.find(
      (trackIdInFavorites) => trackIdInFavorites === trackId,
    );

  addTrack = async (trackId: Track['id']) =>
    this._favorites.tracks.push(trackId);

  deleteTrack = async (trackId: Track['id']) => {
    this._favorites.tracks = this._favorites.tracks.filter(
      (trackIdInFavorites) => trackIdInFavorites !== trackId,
    );
  };

  getAlbumById = async (albumId: Album['id']) =>
    this._favorites.albums.find(
      (albumIdInFavorites) => albumIdInFavorites === albumId,
    );

  addAlbum = async (albumId: Album['id']) =>
    this._favorites.albums.push(albumId);

  deleteAlbum = async (albumId: Album['id']) => {
    this._favorites.albums = this._favorites.albums.filter(
      (albumIdInFavorites) => albumIdInFavorites !== albumId,
    );
  };

  getArtistById = async (artistId: Artist['id']) =>
    this._favorites.artists.find(
      (artistIdInFavorites) => artistIdInFavorites === artistId,
    );

  addArtist = async (artistId: Artist['id']) =>
    this._favorites.artists.push(artistId);

  deleteArtist = async (artistId: Artist['id']) => {
    this._favorites.artists = this._favorites.artists.filter(
      (artistIdInFavorites) => artistIdInFavorites !== artistId,
    );
  };
}

export const favoritesDB = new FavoritesDB();
