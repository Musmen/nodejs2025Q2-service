import { Module } from '@nestjs/common';

import { AlbumController } from './album.controller';

import { AlbumService } from './album.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  controllers: [AlbumController],
  providers: [TrackService, AlbumService, FavoritesService],
})
export class AlbumModule {}
