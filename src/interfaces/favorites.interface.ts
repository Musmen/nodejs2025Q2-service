import type { Album } from './album.interface';
import type { Artist } from './artist.interface';
import type { Track } from './track.interface';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
