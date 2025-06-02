import { Injectable } from '@nestjs/common';

import { artistDB } from './db/Artist.db';

import type { Artist } from 'src/interfaces/Artist.interface';

@Injectable()
export class ArtistService {
  getAllArtists = async () => artistDB.getAllArtists();

  getArtistById = async (id: string): Promise<Artist | null> =>
    artistDB.getArtistById(id);

  createArtist = async (newArtistDto: Omit<Artist, 'id'>) =>
    artistDB.createArtist(newArtistDto);

  updateArtist = async (
    currentArtist: Artist,
    updateArtistDto: Omit<Artist, 'id'>,
  ) => artistDB.updateArtist(currentArtist, updateArtistDto);

  deleteArtist = async (currentArtist: Artist) =>
    artistDB.deleteArtist(currentArtist);
}
