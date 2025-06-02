import { Injectable } from '@nestjs/common';

import { trackDB } from './db/track.db';

import type { Track } from 'src/interfaces/track.interface';

@Injectable()
export class TrackService {
  getAllTracks = async () => trackDB.getAllTracks();

  getTrackById = async (id: string): Promise<Track | null> =>
    trackDB.getTrackById(id);

  createTrack = async (newTrackDto: Omit<Track, 'id'>) =>
    trackDB.createTrack(newTrackDto);

  updateTrack = async (
    currentTrack: Track,
    updateTrackDto: Omit<Track, 'id'>,
  ) => trackDB.updateTrack(currentTrack, updateTrackDto);

  deleteTrack = async (currentTrack: Track) =>
    trackDB.deleteTrack(currentTrack);
}
