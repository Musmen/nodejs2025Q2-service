import { Injectable } from '@nestjs/common';

import { prisma } from 'prisma/prisma';

import type { Album } from 'src/interfaces/album.interface';

@Injectable()
export class AlbumService {
  getAllAlbums = async (): Promise<Album[]> => await prisma.album.findMany();

  getAlbumById = async (id: string): Promise<Album | null> =>
    await prisma.album.findUnique({ where: { id } });

  createAlbum = async (newAlbumDto: Omit<Album, 'id'>): Promise<Album> =>
    await prisma.album.create({ data: newAlbumDto });

  updateAlbum = async (
    { id }: Album,
    updateAlbumDto: Omit<Album, 'id'>,
  ): Promise<Album> =>
    await prisma.album.update({ where: { id }, data: updateAlbumDto });

  deleteAlbum = async ({ id }: Album): Promise<void> => {
    await prisma.album.delete({ where: { id } });
  };
}
