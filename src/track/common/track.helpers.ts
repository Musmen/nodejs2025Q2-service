import { isUUID } from 'class-validator';
import type { CreateTrackDto, Track } from 'src/interfaces/track.interface';

export const isValidNewTrackDto = (newTrackDto: CreateTrackDto) => {
  const { name, duration } = newTrackDto;
  if (
    !name ||
    !duration ||
    typeof name !== 'string' ||
    typeof duration !== 'number'
  )
    return false;

  return true;
};

export const isValidUpdateTrackDto = (updateTrackDto: Omit<Track, 'id'>) => {
  const { name, duration, artistId, albumId } = updateTrackDto;
  if (
    (name && typeof name !== 'string') ||
    (duration && typeof duration !== 'number') ||
    (artistId && !isUUID(artistId)) ||
    (albumId && !isUUID(albumId))
  )
    return false;

  return true;
};
