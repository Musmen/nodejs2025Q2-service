import { isDefined } from 'class-validator';
import type { Album } from 'src/interfaces/album.interface';

class AlbumDB {
  private _albums: Album[] = [];

  getAllAlbums = async (): Promise<Album[]> => this._albums;

  getAlbumById = async (id: string): Promise<Album | null> =>
    this._albums.find((Album) => Album.id === id) || null;

  createAlbum = async (newAlbumDto: Omit<Album, 'id'>) => {
    const { name, year, artistId } = newAlbumDto;

    const newAlbum = {
      id: crypto.randomUUID(),
      name,
      year,
      artistId: isDefined(artistId) ? artistId : null,
    };
    this._albums.push(newAlbum);

    return newAlbum;
  };

  updateAlbum = async (
    currentAlbum: Album,
    updateAlbumDto: Omit<Album, 'id'>,
  ) => {
    if (isDefined(updateAlbumDto.name)) currentAlbum.name = updateAlbumDto.name;
    if (isDefined(updateAlbumDto.year)) currentAlbum.year = updateAlbumDto.year;
    if (updateAlbumDto.artistId !== undefined)
      currentAlbum.artistId = updateAlbumDto.artistId;

    return currentAlbum;
  };

  deleteAlbum = async (currentAlbum: Album) => {
    this._albums = this._albums.filter((Album) => Album !== currentAlbum);
  };
}

export const albumDB = new AlbumDB();
