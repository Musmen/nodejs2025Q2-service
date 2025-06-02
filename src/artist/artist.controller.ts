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

import { ArtistService } from './artist.service';

import { isValidArtistDto } from './common/artist.helpers';

import type { Artist } from 'src/interfaces/artist.interface';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Controller('/artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArtistById(@Param('id') id: string): Promise<Artist | null> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId (not UUID)');
    }

    const currentArtist = await this.artistService.getArtistById(id);
    if (!currentArtist) {
      throw new NotFoundException(`Artist with artistId doesn't exist`);
    }

    return currentArtist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body() newArtistDto: Omit<Artist, 'id'>,
  ): Promise<Artist> {
    if (!isValidArtistDto(newArtistDto)) {
      throw new BadRequestException(
        'Invalid new Artist request body, does not contain valid required fields (name, grammy)',
      );
    }

    return this.artistService.createArtist(newArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: Omit<Artist, 'id'>,
  ): Promise<Artist> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId (not UUID)');
    }

    if (!isValidArtistDto(updateArtistDto)) {
      throw new BadRequestException(
        'Invalid artist update data (name, grammy)',
      );
    }

    const currentArtist = await this.artistService.getArtistById(id);
    if (!currentArtist) {
      throw new NotFoundException(`Artist with artistId doesn't exist`);
    }

    return this.artistService.updateArtist(currentArtist, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistById(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId (not UUID)');
    }

    const currentArtist = await this.artistService.getArtistById(id);
    if (!currentArtist) {
      throw new NotFoundException(`Artist with artistId doesn't exist`);
    }

    (await this.albumService.getAllAlbums())
      .filter((album) => album.artistId === id)
      .forEach((album) => {
        album.artistId = null;
      });

    (await this.trackService.getAllTracks())
      .filter((track) => track.artistId === id)
      .forEach((track) => {
        track.artistId = null;
      });

    await this.favoritesService.deleteArtistById(id);

    return this.artistService.deleteArtist(currentArtist);
  }
}
