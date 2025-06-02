import { isDefined } from 'class-validator';
import type { Artist } from 'src/interfaces/artist.interface';

export const isValidArtistDto = (newArtistDto: Omit<Artist, 'id'>) => {
  const { name, grammy } = newArtistDto;
  if (
    !name ||
    !isDefined(grammy) ||
    typeof name !== 'string' ||
    typeof grammy !== 'boolean'
  )
    return false;

  return true;
};

export const isValidUpdateArtistDto = (updateArtistDto: Omit<Artist, 'id'>) => {
  const { name, grammy } = updateArtistDto;
  if (
    (name && typeof name !== 'string') ||
    (isDefined(grammy) && typeof name !== 'boolean') ||
    (!isDefined(name) && !isDefined(grammy))
  )
    return false;

  return true;
};
