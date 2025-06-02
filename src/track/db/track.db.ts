import { isDefined } from 'class-validator';
import type { Track } from 'src/interfaces/track.interface';

class TrackDB {
  private _tracks: Track[] = [];

  getAllTracks = async (): Promise<Track[]> => this._tracks;

  getTrackById = async (id: string): Promise<Track | null> =>
    this._tracks.find((track) => track.id === id) || null;

  createTrack = async (newTrackDto: Omit<Track, 'id'>) => {
    const { name, duration, artistId, albumId } = newTrackDto;

    const newTrack = {
      id: crypto.randomUUID(),
      name,
      duration,
      artistId: isDefined(artistId) ? artistId : null,
      albumId: isDefined(albumId) ? albumId : null,
    };
    this._tracks.push(newTrack);

    return newTrack;
  };

  updateTrack = async (
    currentTrack: Track,
    updateTrackDto: Omit<Track, 'id'>,
  ) => {
    if (isDefined(updateTrackDto.name)) currentTrack.name = updateTrackDto.name;
    if (isDefined(updateTrackDto.duration))
      currentTrack.duration = updateTrackDto.duration;
    if (updateTrackDto.albumId !== undefined)
      currentTrack.albumId = updateTrackDto.albumId;
    if (updateTrackDto.artistId !== undefined)
      currentTrack.artistId = updateTrackDto.artistId;

    return currentTrack;
  };

  deleteTrack = async (currentTrack: Track) => {
    this._tracks = this._tracks.filter((track) => track !== currentTrack);
  };
}

export const trackDB = new TrackDB();
