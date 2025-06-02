import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

import { TrackService } from './track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

import {
  isValidNewTrackDto,
  isValidUpdateTrackDto,
} from './common/track.helpers';

import type { Track } from 'src/interfaces/track.interface';

@Controller('/track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTracks(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrackById(@Param('id') id: string): Promise<Track | null> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId (not UUID)');
    }

    const currentTrack = await this.trackService.getTrackById(id);
    if (!currentTrack) {
      throw new NotFoundException(`Track with trackId doesn't exist`);
    }

    return currentTrack;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() newTrackDto: Omit<Track, 'id'>): Promise<Track> {
    if (!isValidNewTrackDto(newTrackDto)) {
      throw new BadRequestException(
        'Invalid new track request body, does not contain valid required fields (name, duration)',
      );
    }

    return this.trackService.createTrack(newTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: Omit<Track, 'id'>,
  ): Promise<Track> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId (not UUID)');
    }

    if (!isValidUpdateTrackDto(updateTrackDto)) {
      throw new BadRequestException(
        'Invalid track update data (name, duration, albumId, artistId)',
      );
    }

    const currentTrack = await this.trackService.getTrackById(id);
    if (!currentTrack) {
      throw new NotFoundException(`Track with trackId doesn't exist`);
    }

    return this.trackService.updateTrack(currentTrack, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackById(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId (not UUID)');
    }

    const currentTrack = await this.trackService.getTrackById(id);
    if (!currentTrack) {
      throw new NotFoundException(`Track with trackId doesn't exist`);
    }

    await this.favoritesService.deleteTrackById(id);

    return this.trackService.deleteTrack(currentTrack);
  }
}
