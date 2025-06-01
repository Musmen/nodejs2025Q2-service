import type { Artist } from 'src/interfaces/artist.interface';

class ArtistDB {
  private _artists: Artist[] = [];

  getAllArtists = async (): Promise<Artist[]> => this._artists;

  getArtistById = async (id: string): Promise<Artist | null> =>
    this._artists.find((artist) => artist.id === id) || null;

  createArtist = async (newArtistDto: Omit<Artist, 'id'>) => {
    const newArtist = {
      id: crypto.randomUUID(),
      name: newArtistDto.name,
      grammy: newArtistDto.grammy,
    };
    this._artists.push(newArtist);

    return newArtist;
  };

  updateArtist = async (
    currentArtist: Artist,
    updateArtistDto: Omit<Artist, 'id'>,
  ) => {
    currentArtist.name = updateArtistDto.name;
    currentArtist.grammy = updateArtistDto.grammy;

    return currentArtist;
  };

  deleteArtist = async (currentArtist: Artist) => {
    this._artists = this._artists.filter((artist) => artist !== currentArtist);
  };
}

export const artistDB = new ArtistDB();
