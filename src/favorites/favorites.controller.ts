import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

import { FavoritesService } from './favorites.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

import type { FavoritesResponse } from 'src/interfaces/favorites.interface';

@Controller('/favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFavorites(): Promise<FavoritesResponse> {
    const { tracks, albums, artists } =
      await this.favoritesService.getAllFavorites();

    const records = {
      tracks: await Promise.all(
        tracks.map((trackId) => this.trackService.getTrackById(trackId)),
      ),
      albums: await Promise.all(
        albums.map((albumId) => this.albumService.getAlbumById(albumId)),
      ),
      artists: await Promise.all(
        artists.map((artistId) => this.artistService.getArtistById(artistId)),
      ),
    };

    return records;
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string): Promise<{ message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId (not UUID)');
    }

    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with trackId doesn't exist`,
      );
    }

    await this.favoritesService.addTrack(id);
    return { message: 'Track successfully added to favorites' };
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackById(@Param('id') id: string): Promise<{ message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId (not UUID)');
    }

    const trackIdFromFavorites = await this.favoritesService.getTrackById(id);
    if (!trackIdFromFavorites) {
      throw new NotFoundException(
        `Track with trackId doesn't exist in favorites`,
      );
    }

    await this.favoritesService.deleteTrackById(id);
    return { message: 'Track successfully removed from favorites' };
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') id: string): Promise<{ message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId (not UUID)');
    }

    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with albumId doesn't exist`,
      );
    }

    await this.favoritesService.addAlbum(id);
    return { message: 'Album successfully added to favorites' };
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumById(@Param('id') id: string): Promise<{ message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId (not UUID)');
    }

    const albumIdFromFavorites = await this.favoritesService.getAlbumById(id);
    if (!albumIdFromFavorites) {
      throw new NotFoundException(
        `Album with albumId doesn't exist in favorites`,
      );
    }

    await this.favoritesService.deleteAlbumById(id);
    return { message: 'Album successfully removed from favorites' };
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') id: string): Promise<{ message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId (not UUID)');
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with artistId doesn't exist`,
      );
    }

    await this.favoritesService.addArtist(id);
    return { message: 'Artist successfully added to favorites' };
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistById(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId (not UUID)');
    }

    const artistIdFromFavorites = await this.favoritesService.getArtistById(id);
    if (!artistIdFromFavorites) {
      throw new NotFoundException(
        `Artist with artistId doesn't exist in favorites`,
      );
    }

    await this.favoritesService.deleteArtistById(id);
    return { message: 'Artist successfully removed from favorites' };
  }
}
