import { Injectable } from '@nestjs/common';

import { prisma } from 'prisma/prisma';

import type { Track } from 'src/interfaces/track.interface';

@Injectable()
export class TrackService {
  getAllTracks = async (): Promise<Track[]> => await prisma.track.findMany();

  getTrackById = async (id: string): Promise<Track | null> =>
    await prisma.track.findUnique({ where: { id } });

  createTrack = async (newTrackDto: Omit<Track, 'id'>): Promise<Track> =>
    await prisma.track.create({ data: newTrackDto });

  updateTrack = async (
    { id }: Track,
    updateTrackDto: Omit<Track, 'id'>,
  ): Promise<Track> =>
    await prisma.track.update({ where: { id }, data: updateTrackDto });

  deleteTrack = async ({ id }: Track): Promise<void> => {
    await prisma.track.delete({ where: { id } });
  };
}
