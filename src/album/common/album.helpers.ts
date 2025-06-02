import { isDefined, isUUID } from 'class-validator';
import type { Album } from 'src/interfaces/album.interface';

export const isValidAlbumDto = (newAlbumDto: Omit<Album, 'id'>) => {
  const { name, year, artistId } = newAlbumDto;
  if (
    !name ||
    !year ||
    typeof name !== 'string' ||
    typeof year !== 'number' ||
    (artistId && !isUUID(artistId))
  )
    return false;

  return true;
};

export const isValidUpdateAlbumDto = (updateAlbumDto: Omit<Album, 'id'>) => {
  const { name, year, artistId } = updateAlbumDto;
  if (
    (name && typeof name !== 'string') ||
    (year && typeof name !== 'number') ||
    (artistId && !isUUID(artistId)) ||
    (!isDefined(name) && !isDefined(year) && !isDefined(artistId))
  )
    return false;

  return true;
};
