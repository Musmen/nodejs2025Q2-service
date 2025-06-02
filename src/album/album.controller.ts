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

import { AlbumService } from './album.service';

import { isValidAlbumDto } from './common/album.helpers';

import type { Album } from 'src/interfaces/album.interface';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Controller('/Album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAlbumById(@Param('id') id: string): Promise<Album | null> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId (not UUID)');
    }

    const currentAlbum = await this.albumService.getAlbumById(id);
    if (!currentAlbum) {
      throw new NotFoundException(`Album with albumId doesn't exist`);
    }

    return currentAlbum;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() newAlbumDto: Omit<Album, 'id'>): Promise<Album> {
    if (!isValidAlbumDto(newAlbumDto)) {
      throw new BadRequestException(
        'Invalid new album request body, does not contain valid required fields (name, year, artistId)',
      );
    }

    return this.albumService.createAlbum(newAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: Omit<Album, 'id'>,
  ): Promise<Album> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId (not UUID)');
    }

    if (!isValidAlbumDto(updateAlbumDto)) {
      throw new BadRequestException(
        'Invalid album update data (name, year, artistId)',
      );
    }

    const currentAlbum = await this.albumService.getAlbumById(id);
    if (!currentAlbum) {
      throw new NotFoundException(`Album with albumId doesn't exist`);
    }

    return this.albumService.updateAlbum(currentAlbum, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumById(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId (not UUID)');
    }

    const currentAlbum = await this.albumService.getAlbumById(id);
    if (!currentAlbum) {
      throw new NotFoundException(`Album with albumId doesn't exist`);
    }

    (await this.trackService.getAllTracks())
      .filter((track) => track.albumId === id)
      .forEach((track) => {
        track.albumId = null;
      });

    await this.favoritesService.deleteAlbumById(id);

    return this.albumService.deleteAlbum(currentAlbum);
  }
}
