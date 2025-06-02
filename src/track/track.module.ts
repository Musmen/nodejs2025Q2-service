import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';

import { TrackService } from './track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FavoritesService],
})
export class TrackModule {}
