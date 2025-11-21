import { Injectable } from '@nestjs/common';

import { albumDB } from 'src/album/db/album.db';

import type { Album } from 'src/interfaces/album.interface';

@Injectable()
export class AlbumService {
  getAllAlbums = async () => albumDB.getAllAlbums();

  getAlbumById = async (id: string): Promise<Album | null> =>
    albumDB.getAlbumById(id);

  createAlbum = async (newAlbumDto: Omit<Album, 'id'>) =>
    albumDB.createAlbum(newAlbumDto);

  updateAlbum = async (
    currentAlbum: Album,
    updateAlbumDto: Omit<Album, 'id'>,
  ) => albumDB.updateAlbum(currentAlbum, updateAlbumDto);

  deleteAlbum = async (currentAlbum: Album) =>
    albumDB.deleteAlbum(currentAlbum);
}
