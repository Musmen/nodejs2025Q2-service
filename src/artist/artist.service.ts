import { Injectable } from '@nestjs/common';

import { prisma } from 'prisma/prisma';

import type { Artist } from 'src/interfaces/artist.interface';

@Injectable()
export class ArtistService {
  getAllArtists = async (): Promise<Artist[]> => await prisma.artist.findMany();

  getArtistById = async (id: string): Promise<Artist | null> =>
    await prisma.artist.findUnique({ where: { id } });

  createArtist = async (newArtistDto: Omit<Artist, 'id'>): Promise<Artist> =>
    await prisma.artist.create({ data: newArtistDto });

  updateArtist = async (
    { id }: Artist,
    updateArtistDto: Omit<Artist, 'id'>,
  ): Promise<Artist> =>
    await prisma.artist.update({ where: { id }, data: updateArtistDto });

  deleteArtist = async ({ id }: Artist): Promise<void> => {
    await prisma.artist.delete({ where: { id } });
  };
}
