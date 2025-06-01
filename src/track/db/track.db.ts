import type { CreateTrackDto, Track } from 'src/interfaces/track.interface';

class TrackDB {
  private _tracks: Track[] = [];

  getAllTracks = async (): Promise<Track[]> => this._tracks;

  getTrackById = async (id: string): Promise<Track | null> =>
    this._tracks.find((track) => track.id === id) || null;

  createTrack = async (newTrackDto: CreateTrackDto) => {
    const newTrack = {
      id: crypto.randomUUID(),
      name: newTrackDto.name,
      duration: newTrackDto.duration,
      artistId: null,
      albumId: null,
    };
    this._tracks.push(newTrack);

    return newTrack;
  };

  updateTrack = async (
    currentTrack: Track,
    updateTrackDto: Omit<Track, 'id'>,
  ) => {
    currentTrack = { ...updateTrackDto, id: currentTrack.id };
  };

  deleteTrack = async (currentTrack: Track) => {
    this._tracks = this._tracks.filter((track) => track !== currentTrack);
  };
}

export const trackDB = new TrackDB();
